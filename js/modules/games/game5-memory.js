// ENGLISH VERB ADVENTURE - GAME 5: KARTU MEMORI KATA KERJA (VERB MEMORY CARD)
// Membuka kartu tertutup dan menemukan pasangan Verb 1 dengan Verb 2 / Verb 3

import { VERBS_DATA } from '../../data/verbs.js';
import { sound } from '../audio.js';
import { confetti } from '../confetti.js';
import { storage } from '../storage.js';

export class GameMemoryModule {
  constructor(containerId, onBack) {
    this.container = document.getElementById(containerId);
    this.onBack = onBack;
    this.difficulty = 'medium'; // 'easy' (4 pairs), 'medium' (6 pairs), 'hard' (8 pairs)
    this.cards = [];
    this.flippedCards = [];
    this.matchedCardIds = [];
    this.movesCount = 0;
    this.score = 0;
    this.isLockBoard = false;
  }

  start(difficulty = 'medium') {
    this.difficulty = difficulty;
    this.movesCount = 0;
    this.score = 0;
    this.flippedCards = [];
    this.matchedCardIds = [];
    this.isLockBoard = false;

    this.setupCards();
    this.render();
  }

  setupCards() {
    const pairCount = this.difficulty === 'easy' ? 4 : this.difficulty === 'medium' ? 6 : 8;
    const selectedVerbs = [...VERBS_DATA].sort(() => Math.random() - 0.5).slice(0, pairCount);

    const cardList = [];
    selectedVerbs.forEach(v => {
      const isRead = v.v1.toLowerCase() === 'read';
      // Kartu 1: Verb 1
      cardList.push({
        uid: `${v.id}_v1`,
        verbId: v.id,
        form: 'v1',
        word: v.v1,
        speakWord: v.v1,
        meaning: v.meaning,
        label: 'Verb 1'
      });

      // Kartu 2: Verb 2 (atau Verb 3)
      cardList.push({
        uid: `${v.id}_v2`,
        verbId: v.id,
        form: 'v2',
        word: v.v2,
        speakWord: isRead ? 'red' : v.v2,
        meaning: v.meaning,
        label: 'Verb 2'
      });
    });

    // Acak seluruh kartu
    this.cards = cardList.sort(() => Math.random() - 0.5);
  }

  render() {
    const totalPairs = this.cards.length / 2;

    this.container.innerHTML = `
      <div class="game-wrapper animate-fade-in">
        <!-- Top Bar -->
        <div class="game-top-bar">
          <button id="btn-back-to-hub" class="btn-game-nav">⬅️ Menu Game</button>
          
          <div class="memory-meta-group">
            <div class="difficulty-picker">
              <button class="diff-btn ${this.difficulty === 'easy' ? 'active' : ''}" data-diff="easy">Mudah (4)</button>
              <button class="diff-btn ${this.difficulty === 'medium' ? 'active' : ''}" data-diff="medium">Sedang (6)</button>
              <button class="diff-btn ${this.difficulty === 'hard' ? 'active' : ''}" data-diff="hard">Sulit (8)</button>
            </div>

            <div class="stat-badge">
              <span>Langkah: <strong>${this.movesCount}</strong></span>
            </div>
            <div class="stat-badge">
              <span>Pasangan: <strong>${this.matchedCardIds.length / 2} / ${totalPairs}</strong></span>
            </div>
          </div>
        </div>

        <!-- Instruksi -->
        <div class="game-instruction-banner">
          <span class="banner-icon">🃏</span>
          <p>Buka 2 kartu dan temukan pasangan kata kerja yang sama (<strong>Verb 1</strong> dan <strong>Verb 2</strong>)!</p>
        </div>

        <!-- Grid Kartu Memori -->
        <div class="memory-grid grid-${this.difficulty}">
          ${this.cards.map((c, idx) => {
            const isFlipped = this.flippedCards.some(fc => fc.uid === c.uid);
            const isMatched = this.matchedCardIds.includes(c.uid);
            return `
              <div class="memory-card-wrap ${isFlipped || isMatched ? 'flipped' : ''} ${isMatched ? 'matched' : ''}" 
                   data-uid="${c.uid}" 
                   data-idx="${idx}">
                <div class="memory-card-inner">
                  <!-- Sisi Depan Kartu (Tertutup) -->
                  <div class="card-face card-back">
                    <span class="back-logo">❓</span>
                    <span class="back-title">VERB</span>
                  </div>
                  <!-- Sisi Belakang Kartu (Terbuka) -->
                  <div class="card-face card-front ${c.form === 'v1' ? 'front-v1' : 'front-v2'}">
                    <span class="face-tag">${c.label}</span>
                    <span class="face-word">${c.word}</span>
                    <span class="face-meaning">${c.meaning}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  handleCardClick(cardElement, cardData) {
    if (this.isLockBoard) return;
    if (this.flippedCards.some(c => c.uid === cardData.uid)) return;
    if (this.matchedCardIds.includes(cardData.uid)) return;

    sound.playClick();
    sound.speak(cardData.speakWord);

    cardElement.classList.add('flipped');
    this.flippedCards.push(cardData);

    if (this.flippedCards.length === 2) {
      this.movesCount++;
      this.isLockBoard = true;
      this.checkPair();
    }
  }

  checkPair() {
    const [card1, card2] = this.flippedCards;
    const isMatch = card1.verbId === card2.verbId;

    if (isMatch) {
      // COCOK!
      setTimeout(() => {
        sound.playCorrect();
        confetti.burst(35);
        this.score += 25;
        storage.addXP(25);

        this.matchedCardIds.push(card1.uid, card2.uid);

        // Berikan efek animasi matched
        const el1 = this.container.querySelector(`[data-uid="${card1.uid}"]`);
        const el2 = this.container.querySelector(`[data-uid="${card2.uid}"]`);
        if (el1) el1.classList.add('matched', 'animate-pulse');
        if (el2) el2.classList.add('matched', 'animate-pulse');

        this.flippedCards = [];
        this.isLockBoard = false;

        // Cek jika semua selesai
        if (this.matchedCardIds.length === this.cards.length) {
          setTimeout(() => {
            this.renderGameOver();
          }, 700);
        } else {
          this.updateHUD();
        }
      }, 500);
    } else {
      // TIDAK COCOK!
      setTimeout(() => {
        sound.playWrong();
        const el1 = this.container.querySelector(`[data-uid="${card1.uid}"]`);
        const el2 = this.container.querySelector(`[data-uid="${card2.uid}"]`);
        if (el1) el1.classList.add('animate-shake');
        if (el2) el2.classList.add('animate-shake');

        setTimeout(() => {
          if (el1) el1.classList.remove('flipped', 'animate-shake');
          if (el2) el2.classList.remove('flipped', 'animate-shake');
          this.flippedCards = [];
          this.isLockBoard = false;
          this.updateHUD();
        }, 600);
      }, 700);
    }
  }

  updateHUD() {
    const movesElem = this.container.querySelector('.memory-meta-group .stat-badge:nth-child(2) strong');
    const pairsElem = this.container.querySelector('.memory-meta-group .stat-badge:nth-child(3) strong');
    if (movesElem) movesElem.textContent = this.movesCount;
    if (pairsElem) pairsElem.textContent = `${this.matchedCardIds.length / 2} / ${this.cards.length / 2}`;
  }

  renderGameOver() {
    sound.playWin();
    confetti.burst(100);
    storage.addXP(100);

    this.container.innerHTML = `
      <div class="game-result-card animate-scale-up">
        <div class="result-trophy">🧠</div>
        <h2 class="result-title">Daya Ingat Hebat!</h2>
        <p class="result-subtitle">Kamu berhasil menemukan semua pasangan kata kerja dengan gemilang!</p>

        <div class="result-score-box">
          <div class="score-item">
            <span class="label">Total Langkah</span>
            <span class="value text-gold">${this.movesCount} Langkah</span>
          </div>
          <div class="score-item">
            <span class="label">Tingkat Kesulitan</span>
            <span class="value text-green">${this.difficulty.toUpperCase()}</span>
          </div>
          <div class="score-item">
            <span class="label">Bonus XP</span>
            <span class="value text-purple">+100 XP</span>
          </div>
        </div>

        <div class="result-actions">
          <button id="btn-replay-memory" class="btn-primary-action">🔄 Buka Kartu Lagi</button>
          <button id="btn-finish-memory" class="btn-secondary-action">⬅️ Menu Game</button>
        </div>
      </div>
    `;

    const replayBtn = this.container.querySelector('#btn-replay-memory');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        sound.playClick();
        this.start(this.difficulty);
      });
    }

    const finishBtn = this.container.querySelector('#btn-finish-memory');
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

    // Tombol Ganti Kesulitan
    const diffButtons = this.container.querySelectorAll('.diff-btn');
    diffButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const diff = btn.getAttribute('data-diff');
        this.start(diff);
      });
    });

    // Klik Kartu Memori
    const cardElements = this.container.querySelectorAll('.memory-card-wrap');
    cardElements.forEach(cardEl => {
      cardEl.addEventListener('click', () => {
        const idx = parseInt(cardEl.getAttribute('data-idx'), 10);
        const cardData = this.cards[idx];
        this.handleCardClick(cardEl, cardData);
      });
    });
  }
}
