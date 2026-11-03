// ENGLISH VERB ADVENTURE - MODUL KUIS INTERAKTIF
// Kuis lengkap dengan umpan balik langsung, pengatur waktu, progress bar, skor akhir skala 100, dan predikat

import { QUIZ_QUESTIONS } from '../data/quiz-questions.js';
import { sound } from './audio.js';
import { confetti } from './confetti.js';
import { storage } from './storage.js';

export class QuizModule {
  constructor(containerId, onHome) {
    this.container = document.getElementById(containerId);
    this.onHome = onHome;
    this.questions = [];
    this.currentIndex = 0;
    this.studentName = storage.userData.name || 'Petualang Verb';
    this.correctCount = 0;
    this.wrongCount = 0;
    this.userAnswers = []; // { question, selectedOption, isCorrect }
    this.timerSeconds = 30;
    this.timeLeft = 30;
    this.timerInterval = null;
    this.isAnswered = false;
  }

  start() {
    const settings = storage.teacherSettings;
    const targetCount = settings.quizQuestionCount || 15;
    this.timerSeconds = settings.quizTimerSeconds !== undefined ? settings.quizTimerSeconds : 30;

    // Acak soal dari bank soal
    const shuffledBank = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    this.questions = shuffledBank.slice(0, Math.min(targetCount, shuffledBank.length));

    this.currentIndex = 0;
    this.correctCount = 0;
    this.wrongCount = 0;
    this.userAnswers = [];

    this.loadQuestion();
  }

  loadQuestion() {
    this.isAnswered = false;
    this.timeLeft = this.timerSeconds;
    this.renderQuestionScreen();

    if (this.timerSeconds > 0) {
      this.startTimer();
    }
  }

  startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      const timerDisplay = this.container.querySelector('#quiz-timer-text');
      const timerBar = this.container.querySelector('#quiz-timer-bar');

      if (timerDisplay) timerDisplay.textContent = `${this.timeLeft}s`;
      if (timerBar) {
        const pct = (this.timeLeft / this.timerSeconds) * 100;
        timerBar.style.width = `${pct}%`;
        if (this.timeLeft <= 5) {
          timerBar.classList.add('danger');
        }
      }

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.handleTimeout();
      }
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  handleTimeout() {
    if (this.isAnswered) return;
    this.handleAnswer(-1, null);
  }

  renderQuestionScreen() {
    const q = this.questions[this.currentIndex];
    const progressPercent = Math.round(((this.currentIndex) / this.questions.length) * 100);

    this.container.innerHTML = `
      <div class="quiz-container animate-fade-in">
        <!-- Top Bar -->
        <div class="quiz-top-bar">
          <button id="btn-quiz-exit" class="btn-game-nav">⬅️ Keluar</button>

          <div class="quiz-progress-wrapper">
            <div class="quiz-progress-labels">
              <span>Pertanyaan <strong>${this.currentIndex + 1}</strong> dari <strong>${this.questions.length}</strong></span>
              <span>Benar: <strong class="text-green">${this.correctCount}</strong> | Salah: <strong class="text-orange">${this.wrongCount}</strong></span>
            </div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>

          ${this.timerSeconds > 0 ? `
            <div class="quiz-timer-badge">
              <span class="timer-icon">⏱️</span>
              <span id="quiz-timer-text" class="timer-text">${this.timeLeft}s</span>
            </div>
          ` : ''}
        </div>

        ${this.timerSeconds > 0 ? `
          <div class="quiz-timer-progress-track">
            <div id="quiz-timer-bar" class="quiz-timer-progress-fill" style="width: 100%;"></div>
          </div>
        ` : ''}

        <!-- Kotak Pertanyaan -->
        <div class="quiz-question-card">
          <div class="quiz-category-pill">
            ${this.getCategoryLabel(q.category)}
          </div>

          <h3 class="quiz-question-text">${q.question}</h3>
          
          <button class="btn-read-question" data-speak="${q.question}">
            🔊 Dengarkan Soal
          </button>

          <!-- Pilihan Jawaban -->
          <div class="quiz-options-list">
            ${q.options.map((option, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              return `
                <button class="btn-quiz-option" data-idx="${idx}">
                  <span class="option-badge">${letter}</span>
                  <span class="option-label">${option}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Kotak Feedback Umpan Balik -->
          <div id="quiz-feedback-box" class="quiz-feedback-box hidden">
            <div class="fb-title-row">
              <span id="quiz-fb-icon" class="fb-icon"></span>
              <h4 id="quiz-fb-title" class="fb-title"></h4>
            </div>
            <p id="quiz-fb-explanation" class="fb-explanation-text"></p>
            <button id="btn-quiz-next" class="btn-next-action">
              ${this.currentIndex + 1 === this.questions.length ? 'Lihat Hasil Akhir 🏆' : 'Soal Berikutnya ➔'}
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindQuestionEvents();
  }

  getCategoryLabel(category) {
    switch (category) {
      case 'v2_form': return '🟠 Verb 2 (Past Simple)';
      case 'v3_form': return '🟣 Verb 3 (Past Participle)';
      case 'concept': return '💡 Konsep Regular / Irregular';
      case 'grammar': return '📚 Tata Bahasa & Tenses';
      case 'sentence_completion': return '✍️ Melengkapi Kalimat';
      case 'error_check': return '🔍 Identifikasi Kesalahan';
      default: return '📝 Kuis Kata Kerja';
    }
  }

  handleAnswer(selectedIdx, clickedButton) {
    if (this.isAnswered) return;
    this.isAnswered = true;
    this.stopTimer();

    const q = this.questions[this.currentIndex];
    const isCorrect = selectedIdx === q.correctIndex;

    this.userAnswers.push({
      question: q.question,
      selected: selectedIdx >= 0 ? q.options[selectedIdx] : '(Waktu Habis)',
      correct: q.options[q.correctIndex],
      isCorrect,
      explanation: q.explanation
    });

    // Tandai tombol
    const allButtons = this.container.querySelectorAll('.btn-quiz-option');
    allButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    const fbBox = this.container.querySelector('#quiz-feedback-box');
    const fbIcon = this.container.querySelector('#quiz-fb-icon');
    const fbTitle = this.container.querySelector('#quiz-fb-title');
    const fbText = this.container.querySelector('#quiz-fb-explanation');

    if (isCorrect) {
      sound.playCorrect();
      confetti.burst(40);
      this.correctCount++;
      storage.addXP(25);

      fbIcon.textContent = '🎉';
      fbTitle.textContent = 'Jawaban Kamu Tepat!';
      fbTitle.className = 'fb-title text-green';
    } else {
      sound.playWrong();
      this.wrongCount++;

      fbIcon.textContent = selectedIdx === -1 ? '⏱️' : '💡';
      fbTitle.textContent = selectedIdx === -1 ? 'Waktu Habis!' : 'Jawaban Belum Tepat!';
      fbTitle.className = 'fb-title text-orange';
    }

    fbText.innerHTML = q.explanation;
    fbBox.classList.remove('hidden');
    fbBox.classList.add('animate-slide-up');
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.loadQuestion();
    } else {
      this.renderResultScreen();
    }
  }

  renderResultScreen() {
    sound.playWin();
    confetti.burst(120);

    const total = this.questions.length;
    const finalScore = Math.round((this.correctCount / total) * 100);
    const percentage = finalScore;

    // Tentukan Predikat dan Pesan Motivasi
    let predicate = '';
    let motivationMessage = '';
    let badgeIcon = '';

    if (finalScore === 100) {
      predicate = 'Sempurna! (Master Verb)';
      motivationMessage = 'Luar biasa! Kamu menguasai semua materi Verb 1, 2, dan 3 tanpa cela! Pertahankan prestasimu!';
      badgeIcon = '👑';
    } else if (finalScore >= 80) {
      predicate = 'Sangat Hebat! (Verb Explorer)';
      motivationMessage = 'Keren sekali! Pengetahuan kata kerjamu sangat mantap. Teruslah berlatih!';
      badgeIcon = '🥇';
    } else if (finalScore >= 60) {
      predicate = 'Bagus! (Verb Learner)';
      motivationMessage = 'Usaha yang bagus! Pelajari kembali beberapa kata kerja yang keliru dan coba lagi ya!';
      badgeIcon = '🥈';
    } else {
      predicate = 'Perlu Latihan (Keep Fighting)';
      motivationMessage = 'Jangan berkecil hati! Buka menu Materi dan Kamus untuk memperkuat pemahamanmu, lalu ulangi kuis ini!';
      badgeIcon = '🌱';
    }

    // Simpan ke storage
    storage.saveQuizResult({
      studentName: this.studentName,
      score: finalScore,
      correctCount: this.correctCount,
      wrongCount: this.wrongCount,
      totalQuestions: total,
      percentage,
      predicate
    });

    storage.addXP(finalScore);

    this.container.innerHTML = `
      <div class="quiz-result-container animate-scale-up">
        <div class="result-celebration-banner">
          <div class="badge-huge">${badgeIcon}</div>
          <h2 class="result-greeting">Hasil Kuis: ${this.studentName}</h2>
          <span class="predicate-tag">${predicate}</span>
          <p class="motivation-quote">"${motivationMessage}"</p>
        </div>

        <!-- Kartu Skor Detail -->
        <div class="score-summary-grid">
          <div class="summary-card card-final-score">
            <span class="card-label">Nilai Akhir</span>
            <span class="card-big-value">${finalScore}</span>
            <small class="card-subtext">Skala 0 - 100</small>
          </div>
          <div class="summary-card card-correct">
            <span class="card-label">Jawaban Benar</span>
            <span class="card-big-value text-green">${this.correctCount}</span>
            <small class="card-subtext">dari ${total} soal</small>
          </div>
          <div class="summary-card card-wrong">
            <span class="card-label">Jawaban Salah</span>
            <span class="card-big-value text-orange">${this.wrongCount}</span>
            <small class="card-subtext">dari ${total} soal</small>
          </div>
          <div class="summary-card card-percent">
            <span class="card-label">Persentase</span>
            <span class="card-big-value text-blue">${percentage}%</span>
            <small class="card-subtext">Tingkat Keberhasilan</small>
          </div>
        </div>

        <!-- Tombol Aksi -->
        <div class="result-action-buttons">
          <button id="btn-replay-quiz" class="btn-primary-action">🔄 Ulangi Kuis</button>
          <button id="btn-review-answers" class="btn-secondary-action">📋 Review Jawaban</button>
          <button id="btn-home-from-quiz" class="btn-tertiary-action">🏠 Kembali ke Menu Utama</button>
        </div>

        <!-- Review Jawaban (Expandable) -->
        <div id="review-section" class="review-section hidden">
          <h3 class="review-title">Pembahasan Seluruh Soal:</h3>
          <div class="review-list">
            ${this.userAnswers.map((item, idx) => `
              <div class="review-item ${item.isCorrect ? 'item-correct' : 'item-wrong'}">
                <div class="review-item-header">
                  <span class="item-num">Soal ${idx + 1}</span>
                  <span class="item-status">${item.isCorrect ? '✅ Benar' : '❌ Salah'}</span>
                </div>
                <p class="item-question">${item.question}</p>
                <div class="item-answers-row">
                  <div>Jawabanmu: <strong class="${item.isCorrect ? 'text-green' : 'text-orange'}">${item.selected}</strong></div>
                  ${!item.isCorrect ? `<div>Kunci Jawaban: <strong class="text-green">${item.correct}</strong></div>` : ''}
                </div>
                <div class="item-explanation">
                  💡 <strong>Penjelasan:</strong> ${item.explanation}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindResultEvents();
  }

  bindQuestionEvents() {
    // Tombol Keluar
    const exitBtn = this.container.querySelector('#btn-quiz-exit');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        sound.playClick();
        this.stopTimer();
        if (confirm('Yakin ingin keluar dari kuis ini?')) {
          if (this.onHome) this.onHome();
        } else if (this.timerSeconds > 0) {
          this.startTimer();
        }
      });
    }

    // Pilihan Jawaban
    const optionBtns = this.container.querySelectorAll('.btn-quiz-option');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        this.handleAnswer(idx, btn);
      });
    });

    // Dengar Soal
    const speakBtn = this.container.querySelector('.btn-read-question');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        sound.playClick();
        const text = speakBtn.getAttribute('data-speak');
        sound.speak(text);
      });
    }

    // Tombol Lanjut Soal Berikutnya
    const nextBtn = this.container.querySelector('#btn-quiz-next');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sound.playClick();
        this.nextQuestion();
      });
    }
  }

  bindResultEvents() {
    // Tombol Ulangi Kuis
    const replayBtn = this.container.querySelector('#btn-replay-quiz');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        sound.playClick();
        this.start();
      });
    }

    // Tombol Review
    const reviewBtn = this.container.querySelector('#btn-review-answers');
    if (reviewBtn) {
      reviewBtn.addEventListener('click', () => {
        sound.playClick();
        const reviewSec = this.container.querySelector('#review-section');
        if (reviewSec) {
          reviewSec.classList.toggle('hidden');
          reviewSec.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Tombol Kembali ke Menu
    const homeBtn = this.container.querySelector('#btn-home-from-quiz');
    if (homeBtn) {
      homeBtn.addEventListener('click', () => {
        sound.playClick();
        if (this.onHome) this.onHome();
      });
    }
  }
}
