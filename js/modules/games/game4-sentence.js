// ENGLISH VERB ADVENTURE - GAME 4: SUSUN KALIMAT (SENTENCE BUILDER)
// Menyusun kata-kata acak menjadi kalimat Bahasa Inggris yang benar dengan V1, V2, dan V3

import { SENTENCE_PUZZLES } from '../../data/sentences.js';
import { sound } from '../audio.js';
import { confetti } from '../confetti.js';
import { storage } from '../storage.js';

export class GameSentenceModule {
  constructor(containerId, onBack) {
    this.container = document.getElementById(containerId);
    this.onBack = onBack;
    this.totalPuzzles = 8;
    this.currentIndex = 0;
    this.score = 0;
    this.puzzles = [];
    this.placedWords = [];
    this.availableWords = [];
    this.isEvaluated = false;
  }

  start() {
    this.currentIndex = 0;
    this.score = 0;
    this.isEvaluated = false;
    // Acak puzzle kalimat untuk sesi ini
    this.puzzles = [...SENTENCE_PUZZLES].sort(() => Math.random() - 0.5).slice(0, this.totalPuzzles);
    this.loadPuzzle();
  }

  loadPuzzle() {
    this.isEvaluated = false;
    const currentPuzzle = this.puzzles[this.currentIndex];
    this.placedWords = [];
    // Buat chip kata-kata yang tersedia dengan ID unik
    this.availableWords = currentPuzzle.scrambled.map((word, idx) => ({
      id: `${word}_${idx}`,
      text: word
    }));

    this.render();
  }

  render() {
    const puzzle = this.puzzles[this.currentIndex];

    this.container.innerHTML = `
      <div class="game-wrapper animate-fade-in">
        <!-- Top Bar -->
        <div class="game-top-bar">
          <button id="btn-back-to-hub" class="btn-game-nav">⬅️ Menu Game</button>
          <div class="game-info-badge">
            <span class="badge-title">🧱 Susun Kalimat (Sentence Builder)</span>
            <span class="badge-round">Tantangan ${this.currentIndex + 1} / ${this.totalPuzzles}</span>
          </div>
          <div class="game-score-badge">
            <span class="score-icon">⭐</span>
            <span class="score-num">${this.score} Poin</span>
          </div>
        </div>

        <!-- Target Info -->
        <div class="sentence-target-banner">
          <div class="target-meta">
            <span class="verb-form-tag">Materi: ${puzzle.verbForm}</span>
            <span class="meaning-label">Arti: "${puzzle.meaning}"</span>
          </div>
          <p class="target-instruction">Sentuh atau geser kata-kata di bawah untuk menyusun kalimat yang tepat!</p>
        </div>

        <!-- Area Kalimat Tersusun (Drop Zone / Sentence Builder Slots) -->
        <div class="sentence-drop-zone ${this.isEvaluated ? 'evaluated' : ''}" id="sentence-drop-zone">
          ${this.placedWords.length === 0 ? `
            <div class="drop-placeholder">Sentuh kata di bawah untuk meletakkannya di sini...</div>
          ` : `
            <div class="placed-words-list">
              ${this.placedWords.map((item, idx) => `
                <div class="word-chip placed-chip" data-id="${item.id}" data-idx="${idx}">
                  <span class="chip-text">${item.text}</span>
                  <span class="chip-remove">✕</span>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <!-- Pilihan Kata yang Tersedia (Scrambled Bank) -->
        <div class="scrambled-words-bank" id="scrambled-bank">
          ${this.availableWords.map(item => `
            <button class="word-chip bank-chip" data-id="${item.id}" data-word="${item.text}">
              ${item.text}
            </button>
          `).join('')}
        </div>

        <!-- Kontrol Aksi -->
        <div class="sentence-actions-row">
          <button id="btn-reset-sentence" class="btn-secondary-action" ${this.placedWords.length === 0 ? 'disabled' : ''}>
            🔄 Reset Kalimat
          </button>
          <button id="btn-check-sentence" class="btn-primary-action" ${this.availableWords.length > 0 || this.isEvaluated ? 'disabled' : ''}>
            ✅ Periksa Jawaban
          </button>
        </div>

        <!-- Feedback & Penjelasan -->
        <div id="sentence-feedback-card" class="sentence-feedback-card hidden">
          <div class="fb-header">
            <span id="fb-icon" class="fb-icon"></span>
            <h4 id="fb-title" class="fb-title"></h4>
          </div>
          <div class="fb-sentence-target">
            Kalimat Benar: <strong id="fb-correct-sentence"></strong>
            <button id="btn-speak-complete-sentence" class="btn-speak-sentence-audio">🔊 Dengar Kalimat</button>
          </div>
          <p id="fb-explanation" class="fb-explanation"></p>
          <button id="btn-next-puzzle" class="btn-next-action mt-3">Lanjut Tantangan Berikutnya ➔</button>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  handlePlaceWord(item) {
    if (this.isEvaluated) return;
    sound.playClick();
    this.placedWords.push(item);
    this.availableWords = this.availableWords.filter(w => w.id !== item.id);
    this.render();
  }

  handleRemovePlacedWord(idx) {
    if (this.isEvaluated) return;
    sound.playClick();
    const removedItem = this.placedWords.splice(idx, 1)[0];
    this.availableWords.push(removedItem);
    this.render();
  }

  handleResetSentence() {
    sound.playClick();
    this.loadPuzzle();
  }

  handleCheckSentence() {
    this.isEvaluated = true;
    const puzzle = this.puzzles[this.currentIndex];
    const userSentence = this.placedWords.map(w => w.text).join(' ');
    const isCorrect = userSentence.trim().toLowerCase() === puzzle.targetSentence.trim().toLowerCase();

    const fbCard = this.container.querySelector('#sentence-feedback-card');
    const fbIcon = this.container.querySelector('#fb-icon');
    const fbTitle = this.container.querySelector('#fb-title');
    const fbSentence = this.container.querySelector('#fb-correct-sentence');
    const fbExp = this.container.querySelector('#fb-explanation');

    if (isCorrect) {
      sound.playCorrect();
      confetti.burst(50);
      this.score += 25;
      storage.addXP(25);

      fbIcon.textContent = '🎉';
      fbTitle.textContent = 'Susunan Kalimat Sempurna!';
      fbTitle.className = 'fb-title text-green';
    } else {
      sound.playWrong();
      fbIcon.textContent = '⚠️';
      fbTitle.textContent = 'Susunan Kalimat Kurang Tepat';
      fbTitle.className = 'fb-title text-orange';
    }

    fbSentence.textContent = `"${puzzle.targetSentence}."`;
    fbExp.innerHTML = `
      <strong>Kata Kerja:</strong> ${puzzle.verbUsed}<br>
      <strong>Penjelasan Tata Bahasa:</strong> ${puzzle.explanation}
    `;

    fbCard.classList.remove('hidden');
    fbCard.classList.add('animate-slide-up');

    // Otomatis bacakan kalimat yang benar
    setTimeout(() => {
      sound.speak(puzzle.targetSentence);
    }, 400);

    this.render();
  }

  nextPuzzle() {
    this.currentIndex++;
    if (this.currentIndex < this.totalPuzzles) {
      this.loadPuzzle();
    } else {
      this.renderGameOver();
    }
  }

  renderGameOver() {
    sound.playWin();
    confetti.burst(100);
    storage.addXP(100);

    this.container.innerHTML = `
      <div class="game-result-card animate-scale-up">
        <div class="result-trophy">🧱</div>
        <h2 class="result-title">Pakar Kalimat Hebat!</h2>
        <p class="result-subtitle">Kamu telah menguasai penyusunan kalimat Verb 1, Verb 2, dan Verb 3!</p>

        <div class="result-score-box">
          <div class="score-item">
            <span class="label">Skor Kamu</span>
            <span class="value text-gold">${this.score} Poin</span>
          </div>
          <div class="score-item">
            <span class="label">Tantangan Diselesaikan</span>
            <span class="value text-green">${this.totalPuzzles} / ${this.totalPuzzles}</span>
          </div>
          <div class="score-item">
            <span class="label">Bonus XP</span>
            <span class="value text-purple">+100 XP</span>
          </div>
        </div>

        <div class="result-actions">
          <button id="btn-replay-sentence" class="btn-primary-action">🔄 Susun Kalimat Lagi</button>
          <button id="btn-finish-sentence" class="btn-secondary-action">⬅️ Menu Game</button>
        </div>
      </div>
    `;

    const replayBtn = this.container.querySelector('#btn-replay-sentence');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        sound.playClick();
        this.start();
      });
    }

    const finishBtn = this.container.querySelector('#btn-finish-sentence');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        sound.playClick();
        if (this.onBack) this.onBack();
      });
    }
  }

  bindEvents() {
    // Navigasi Kembali
    const backBtn = this.container.querySelector('#btn-back-to-hub');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        sound.playClick();
        if (this.onBack) this.onBack();
      });
    }

    // Klik kata di bank kata (Pindahkan ke slot kalimat)
    const bankChips = this.container.querySelectorAll('.bank-chip');
    bankChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.getAttribute('data-id');
        const text = chip.getAttribute('data-word');
        this.handlePlaceWord({ id, text });
      });
    });

    // Klik kata yang sudah ditempatkan (Kembalikan ke bank)
    const placedChips = this.container.querySelectorAll('.placed-chip');
    placedChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const idx = parseInt(chip.getAttribute('data-idx'), 10);
        this.handleRemovePlacedWord(idx);
      });
    });

    // Tombol Reset
    const resetBtn = this.container.querySelector('#btn-reset-sentence');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => this.handleResetSentence());
    }

    // Tombol Periksa
    const checkBtn = this.container.querySelector('#btn-check-sentence');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => this.handleCheckSentence());
    }

    // Tombol Dengar Kalimat di feedback
    const speakBtn = this.container.querySelector('#btn-speak-complete-sentence');
    if (speakBtn) {
      speakBtn.addEventListener('click', () => {
        sound.playClick();
        const currentPuzzle = this.puzzles[this.currentIndex];
        sound.speak(currentPuzzle.targetSentence);
      });
    }

    // Tombol Next
    const nextBtn = this.container.querySelector('#btn-next-puzzle');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sound.playClick();
        this.nextPuzzle();
      });
    }
  }
}
