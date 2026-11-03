// ENGLISH VERB ADVENTURE - GAME 3: PEMBURU KATA KERJA (VERB HUNTER)
// Target kata kerja bergerak / mengapung di layar, siswa menyentuh jawaban yang benar secepat mungkin

import { VERBS_DATA } from '../../data/verbs.js';
import { sound } from '../audio.js';
import { confetti } from '../confetti.js';
import { storage } from '../storage.js';

export class GameHunterModule {
  constructor(containerId, onBack) {
    this.container = document.getElementById(containerId);
    this.onBack = onBack;
    this.gameDuration = 45; // detik
    this.timeLeft = 45;
    this.timerInterval = null;
    this.spawnInterval = null;
    this.score = 0;
    this.streak = 0;
    this.multiplier = 1;
    this.currentTarget = null; // { verb, targetForm: 'v2'/'v3', targetWord, promptText }
    this.activeBubbles = [];
    this.isRunning = false;
  }

  start() {
    this.score = 0;
    this.streak = 0;
    this.multiplier = 1;
    this.timeLeft = this.gameDuration;
    this.activeBubbles = [];
    this.isRunning = true;

    this.render();
    this.newRoundTarget();
    this.startTimers();
  }

  stop() {
    this.isRunning = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.spawnInterval) clearInterval(this.spawnInterval);
    this.timerInterval = null;
    this.spawnInterval = null;
  }

  newRoundTarget() {
    if (!this.isRunning) return;

    // Pilih kata kerja acak dan bentuk target (V2 atau V3)
    const randomVerb = VERBS_DATA[Math.floor(Math.random() * VERBS_DATA.length)];
    const formType = Math.random() > 0.5 ? 'v2' : 'v3';
    const formLabel = formType === 'v2' ? 'Verb 2 (Past Simple)' : 'Verb 3 (Past Participle)';
    const targetWord = randomVerb[formType];

    this.currentTarget = {
      verb: randomVerb,
      formType,
      targetWord,
      promptText: `Tangkap <strong>${formLabel}</strong> dari: <span class="hunter-keyword">${randomVerb.v1}</span> (${randomVerb.meaning})`
    };

    // Update banner instruksi
    const promptElem = this.container.querySelector('#hunter-prompt');
    if (promptElem) {
      promptElem.innerHTML = this.currentTarget.promptText;
      promptElem.classList.remove('animate-pulse');
      void promptElem.offsetWidth; // trigger reflow
      promptElem.classList.add('animate-pulse');
    }

    // Munculkan gelembung-gelembung target baru di arena
    this.spawnBubbles();
  }

  spawnBubbles() {
    const arena = this.container.querySelector('#hunter-arena');
    if (!arena) return;

    arena.innerHTML = '';
    this.activeBubbles = [];

    // Siapkan 1 jawaban benar + 3-4 jawaban salah
    const correctWord = this.currentTarget.targetWord;
    const candidates = new Set([correctWord]);

    // Tambahkan distractor dari verb lain atau bentuk lain
    while (candidates.size < 5) {
      const v = VERBS_DATA[Math.floor(Math.random() * VERBS_DATA.length)];
      const f = Math.random() > 0.5 ? 'v2' : 'v3';
      const w = v[f];
      if (w.toLowerCase() !== correctWord.toLowerCase()) {
        candidates.add(w);
      }
    }

    const wordsList = Array.from(candidates).sort(() => Math.random() - 0.5);

    wordsList.forEach((word, idx) => {
      const isTarget = word.toLowerCase() === correctWord.toLowerCase();
      const bubble = document.createElement('div');
      bubble.className = `hunter-bubble color-${(idx % 5) + 1} animate-float`;
      bubble.setAttribute('data-word', word);
      bubble.setAttribute('data-correct', isTarget ? 'true' : 'false');

      // Posisi acak yang tersebar di arena
      const posX = 10 + (idx * 18) + (Math.random() * 8 - 4);
      const posY = 15 + ((idx % 2) * 40) + (Math.random() * 15 - 7);

      bubble.style.left = `${Math.min(85, Math.max(5, posX))}%`;
      bubble.style.top = `${Math.min(75, Math.max(10, posY))}%`;
      bubble.style.animationDelay = `${idx * 0.3}s`;

      bubble.innerHTML = `
        <span class="bubble-word">${word}</span>
        <span class="bubble-sparkle">✨</span>
      `;

      bubble.addEventListener('click', (e) => this.handleBubbleClick(bubble, isTarget, word, e));

      arena.appendChild(bubble);
      this.activeBubbles.push(bubble);
    });
  }

  handleBubbleClick(bubble, isTarget, word, event) {
    if (!this.isRunning) return;

    sound.playPop();

    if (isTarget) {
      // BENAR!
      sound.playCorrect();
      this.streak++;
      if (this.streak >= 3) this.multiplier = 2;
      if (this.streak >= 6) this.multiplier = 3;

      const gainedScore = 20 * this.multiplier;
      this.score += gainedScore;
      storage.addXP(15);

      // Tampilkan efek letusan dan floating score
      this.showFloatPoints(event.clientX, event.clientY, `+${gainedScore}`);
      bubble.classList.add('pop-burst');

      setTimeout(() => {
        this.newRoundTarget();
      }, 500);
    } else {
      // SALAH!
      sound.playWrong();
      this.streak = 0;
      this.multiplier = 1;
      bubble.classList.add('animate-shake', 'bubble-wrong');
      setTimeout(() => {
        bubble.classList.remove('animate-shake', 'bubble-wrong');
      }, 600);
    }

    this.updateHUD();
  }

  showFloatPoints(x, y, text) {
    const floatEl = document.createElement('div');
    floatEl.className = 'float-points-badge animate-float-up';
    floatEl.textContent = text;
    floatEl.style.left = `${x}px`;
    floatEl.style.top = `${y}px`;
    document.body.appendChild(floatEl);

    setTimeout(() => {
      floatEl.remove();
    }, 900);
  }

  startTimers() {
    this.timerInterval = setInterval(() => {
      if (!this.isRunning) return;
      this.timeLeft--;
      this.updateHUD();

      if (this.timeLeft <= 0) {
        this.stop();
        this.renderGameOver();
      }
    }, 1000);
  }

  updateHUD() {
    const timerElem = this.container.querySelector('#hunter-timer');
    const scoreElem = this.container.querySelector('#hunter-score');
    const comboElem = this.container.querySelector('#hunter-combo');

    if (timerElem) {
      timerElem.textContent = `${this.timeLeft}s`;
      if (this.timeLeft <= 10) {
        timerElem.classList.add('text-danger', 'animate-pulse');
      }
    }
    if (scoreElem) scoreElem.textContent = `${this.score} Poin`;
    if (comboElem) {
      comboElem.textContent = this.multiplier > 1 ? `x${this.multiplier} Combo!` : '';
    }
  }

  render() {
    this.container.innerHTML = `
      <div class="game-wrapper hunter-game-wrapper animate-fade-in">
        <!-- Header Game -->
        <div class="game-top-bar">
          <button id="btn-back-to-hub" class="btn-game-nav">⬅️ Menu Game</button>
          
          <div class="hunter-stats-group">
            <div class="stat-badge timer-badge">
              <span class="icon">⏱️</span>
              <span id="hunter-timer" class="stat-value">${this.timeLeft}s</span>
            </div>
            <div class="stat-badge score-badge">
              <span class="icon">🎯</span>
              <span id="hunter-score" class="stat-value">${this.score} Poin</span>
              <span id="hunter-combo" class="combo-badge"></span>
            </div>
          </div>
        </div>

        <!-- Target Mission Prompt -->
        <div class="hunter-mission-bar">
          <span class="mission-icon">🏹</span>
          <div id="hunter-prompt" class="mission-text">
            Mempersiapkan target...
          </div>
        </div>

        <!-- Arena Pemburu Kata Kerja -->
        <div id="hunter-arena" class="hunter-arena-field">
          <!-- Gelembung mengapung di sini -->
        </div>
      </div>
    `;

    const backBtn = this.container.querySelector('#btn-back-to-hub');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        sound.playClick();
        this.stop();
        if (this.onBack) this.onBack();
      });
    }
  }

  renderGameOver() {
    sound.playWin();
    confetti.burst(90);
    storage.addXP(80);

    this.container.innerHTML = `
      <div class="game-result-card animate-scale-up">
        <div class="result-trophy">🏹</div>
        <h2 class="result-title">Waktu Habis! Perburuan Selesai!</h2>
        <p class="result-subtitle">Refleks yang sangat cepat! Kamu adalah pemburu kata kerja yang hebat.</p>

        <div class="result-score-box">
          <div class="score-item">
            <span class="label">Total Skor</span>
            <span class="value text-gold">${this.score} Poin</span>
          </div>
          <div class="score-item">
            <span class="label">Kombo Tertinggi</span>
            <span class="value text-green">x${this.multiplier}</span>
          </div>
          <div class="score-item">
            <span class="label">Bonus XP</span>
            <span class="value text-purple">+80 XP</span>
          </div>
        </div>

        <div class="result-actions">
          <button id="btn-replay-hunter" class="btn-primary-action">🔄 Buru Lagi</button>
          <button id="btn-finish-hunter" class="btn-secondary-action">⬅️ Menu Game</button>
        </div>
      </div>
    `;

    const replayBtn = this.container.querySelector('#btn-replay-hunter');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        sound.playClick();
        this.start();
      });
    }

    const finishBtn = this.container.querySelector('#btn-finish-hunter');
    if (finishBtn) {
      finishBtn.addEventListener('click', () => {
        sound.playClick();
        if (this.onBack) this.onBack();
      });
    }
  }
}
