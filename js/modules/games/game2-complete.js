// ENGLISH VERB ADVENTURE - GAME 2: LENGKAPI KATA KERJANYA (COMPLETE THE VERB)
// Melengkapi bentuk Verb 1, Verb 2, atau Verb 3 yang kosong dengan 4 pilihan kartu

import { VERBS_DATA } from '../../data/verbs.js';
import { sound } from '../audio.js';
import { confetti } from '../confetti.js';
import { storage } from '../storage.js';

export class GameCompleteModule {
  constructor(containerId, onBack) {
    this.container = document.getElementById(containerId);
    this.onBack = onBack;
    this.totalQuestions = 10;
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.questions = [];
    this.answered = false;
  }

  start() {
    this.currentIndex = 0;
    this.score = 0;
    this.streak = 0;
    this.generateQuestions();
    this.loadQuestion();
  }

  generateQuestions() {
    // Ambil 10 kata kerja acak
    const shuffledVerbs = [...VERBS_DATA].sort(() => Math.random() - 0.5).slice(0, this.totalQuestions);

    this.questions = shuffledVerbs.map(verb => {
      // Tentukan bentuk mana yang hilang (v1, v2, atau v3)
      const missingTypes = ['v1', 'v2', 'v3'];
      const missing = missingTypes[Math.floor(Math.random() * missingTypes.length)];
      const correctAnswer = verb[missing];

      // Buat pilihan pengecoh yang cerdas dan realistis
      const distractors = this.generateDistractors(verb, missing);
      const options = [correctAnswer, ...distractors].sort(() => Math.random() - 0.5);

      return {
        verb,
        missing,
        correctAnswer,
        options,
        explanation: `Kata kerja '${verb.v1}' (${verb.meaning}) memiliki pola: <strong>${verb.v1}</strong> (V1) ➔ <strong>${verb.v2}</strong> (V2) ➔ <strong>${verb.v3}</strong> (V3). Bentuk yang tepat untuk melengkapi adalah <strong>${correctAnswer}</strong>.`
      };
    });
  }

  generateDistractors(verb, missing) {
    const pool = new Set();

    // 1. Pengecoh berakhiran -ed yang salah (contoh: eated, wented)
    if (verb.type === 'irregular') {
      pool.add(verb.v1 + 'ed');
      pool.add(verb.v1 + 'd');
    }

    // 2. Bentuk gerund (-ing)
    pool.add(verb.v1 + 'ing');

    // 3. Bentuk orang ketiga (-s/-es)
    pool.add(verb.v1 + 's');

    // 4. Kata dari bentuk verb lain yang tidak dicari
    if (missing !== 'v1') pool.add(verb.v1);
    if (missing !== 'v2') pool.add(verb.v2);
    if (missing !== 'v3') pool.add(verb.v3);

    // 5. Kata acak dari verb lain
    while (pool.size < 3) {
      const randomVerb = VERBS_DATA[Math.floor(Math.random() * VERBS_DATA.length)];
      const candidate = randomVerb[missing];
      if (candidate !== verb[missing]) {
        pool.add(candidate);
      }
    }

    // Ambil tepat 3 pengecoh yang berbeda dari jawaban benar
    const result = Array.from(pool).filter(w => w.toLowerCase() !== verb[missing].toLowerCase()).slice(0, 3);
    return result;
  }

  loadQuestion() {
    this.answered = false;
    this.render();
  }

  render() {
    const q = this.questions[this.currentIndex];
    const isV1Missing = q.missing === 'v1';
    const isV2Missing = q.missing === 'v2';
    const isV3Missing = q.missing === 'v3';

    this.container.innerHTML = `
      <div class="game-wrapper animate-fade-in">
        <!-- Header -->
        <div class="game-top-bar">
          <button id="btn-back-to-hub" class="btn-game-nav">⬅️ Menu Game</button>
          <div class="game-info-badge">
            <span class="badge-title">🧩 Lengkapi Kata Kerjanya</span>
            <span class="badge-round">Soal ${this.currentIndex + 1} / ${this.totalQuestions}</span>
          </div>
          <div class="game-score-badge">
            <span class="score-icon">⭐</span>
            <span class="score-num">${this.score} Poin</span>
          </div>
        </div>

        <!-- Kartu Soal Lengkapi -->
        <div class="complete-challenge-card">
          <div class="challenge-meaning-badge">
            Arti: <strong>${q.verb.meaning}</strong>
          </div>

          <div class="complete-triplet-display">
            <!-- Kotak V1 -->
            <div class="triplet-slot ${isV1Missing ? 'slot-missing' : 'slot-given'}">
              <span class="slot-type">Verb 1 (Base)</span>
              <span class="slot-word">${isV1Missing ? '❓' : q.verb.v1}</span>
            </div>

            <span class="triplet-arrow">➔</span>

            <!-- Kotak V2 -->
            <div class="triplet-slot ${isV2Missing ? 'slot-missing' : 'slot-given'}">
              <span class="slot-type">Verb 2 (Past)</span>
              <span class="slot-word">${isV2Missing ? '❓' : q.verb.v2}</span>
            </div>

            <span class="triplet-arrow">➔</span>

            <!-- Kotak V3 -->
            <div class="triplet-slot ${isV3Missing ? 'slot-missing' : 'slot-given'}">
              <span class="slot-type">Verb 3 (Participle)</span>
              <span class="slot-word">${isV3Missing ? '❓' : q.verb.v3}</span>
            </div>
          </div>

          <div class="challenge-prompt">
            Manakah bentuk yang tepat untuk mengisi tanda <strong>❓</strong> di atas?
          </div>

          <!-- Pilihan Jawaban 4 Kartu Besar -->
          <div class="complete-options-grid">
            ${q.options.map((opt, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              return `
                <button class="btn-complete-option" data-option="${opt}">
                  <span class="option-letter">${letter}</span>
                  <span class="option-text">${opt}</span>
                  <span class="option-speak" data-speak="${opt}">🔊</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Kotak Penjelasan (Muncul setelah dijawab) -->
          <div id="explanation-box" class="explanation-box hidden">
            <div class="exp-header">
              <span id="exp-icon" class="exp-icon"></span>
              <h4 id="exp-title" class="exp-title"></h4>
            </div>
            <p id="exp-text" class="exp-text"></p>
            <button id="btn-next-question" class="btn-next-action">
              Soal Selanjutnya ➔
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  handleAnswer(selectedOption, buttonElement) {
    if (this.answered) return;
    this.answered = true;

    const q = this.questions[this.currentIndex];
    const isCorrect = selectedOption.toLowerCase() === q.correctAnswer.toLowerCase();

    // Disable all options
    const allButtons = this.container.querySelectorAll('.btn-complete-option');
    allButtons.forEach(btn => {
      btn.disabled = true;
      const opt = btn.getAttribute('data-option');
      if (opt.toLowerCase() === q.correctAnswer.toLowerCase()) {
        btn.classList.add('correct');
      } else if (btn === buttonElement && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    const expBox = this.container.querySelector('#explanation-box');
    const expIcon = this.container.querySelector('#exp-icon');
    const expTitle = this.container.querySelector('#exp-title');
    const expText = this.container.querySelector('#exp-text');

    if (isCorrect) {
      sound.playCorrect();
      confetti.burst(40);
      this.score += 10;
      this.streak += 1;
      storage.addXP(20);

      expIcon.textContent = '🎉';
      expTitle.textContent = 'Jawaban Tepat Sekali!';
      expTitle.className = 'exp-title text-green';
    } else {
      sound.playWrong();
      this.streak = 0;

      expIcon.textContent = '💡';
      expTitle.textContent = 'Belum Tepat!';
      expTitle.className = 'exp-title text-orange';
    }

    expText.innerHTML = q.explanation;
    expBox.classList.remove('hidden');
    expBox.classList.add('animate-slide-up');

    // Ucapkan jawaban yang benar
    setTimeout(() => {
      sound.speak(q.correctAnswer);
    }, 400);
  }

  nextQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.totalQuestions) {
      this.loadQuestion();
    } else {
      this.renderGameOver();
    }
  }

  renderGameOver() {
    sound.playWin();
    confetti.burst(100);
    storage.addXP(100);

    const percentage = Math.round((this.score / (this.totalQuestions * 10)) * 100);

    this.container.innerHTML = `
      <div class="game-result-card animate-scale-up">
        <div class="result-trophy">🌟</div>
        <h2 class="result-title">Tantangan Selesai!</h2>
        <p class="result-subtitle">Hebat! Kamu telah menyelesaikan 10 tantangan melengkapi kata kerja.</p>

        <div class="result-score-box">
          <div class="score-item">
            <span class="label">Skor Kamu</span>
            <span class="value text-gold">${this.score} / ${this.totalQuestions * 10}</span>
          </div>
          <div class="score-item">
            <span class="label">Akurasi</span>
            <span class="value text-green">${percentage}%</span>
          </div>
          <div class="score-item">
            <span class="label">Bonus XP</span>
            <span class="value text-purple">+100 XP</span>
          </div>
        </div>

        <div class="result-actions">
          <button id="btn-replay-complete" class="btn-primary-action">🔄 Coba Lagi</button>
          <button id="btn-finish-complete" class="btn-secondary-action">⬅️ Menu Game</button>
        </div>
      </div>
    `;

    const replayBtn = this.container.querySelector('#btn-replay-complete');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        sound.playClick();
        this.start();
      });
    }

    const finishBtn = this.container.querySelector('#btn-finish-complete');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        sound.playClick();
        if (this.onBack) this.onBack();
      });
    }
  }

  bindEvents() {
    // Tombol Kembali
    const backBtn = this.container.querySelector('#btn-back-to-hub');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        sound.playClick();
        if (this.onBack) this.onBack();
      });
    }

    // Tombol Pilihan Jawaban
    const optionBtns = this.container.querySelectorAll('.btn-complete-option');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const opt = btn.getAttribute('data-option');
        this.handleAnswer(opt, btn);
      });
    });

    // Tombol Suara Opsi
    const speakBtns = this.container.querySelectorAll('.option-speak');
    speakBtns.forEach(spk => {
      spk.addEventListener('click', (e) => {
        e.stopPropagation();
        const word = spk.getAttribute('data-speak');
        sound.speak(word);
      });
    });

    // Tombol Soal Selanjutnya
    const nextBtn = this.container.querySelector('#btn-next-question');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sound.playClick();
        this.nextQuestion();
      });
    }
  }
}
