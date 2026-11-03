// ENGLISH VERB ADVENTURE - GAME 1: PASANGKAN KATA KERJA (MATCH THE VERBS)
// Memasangkan Verb 1, Verb 2, dan Verb 3 dengan Drag & Drop dan Tap-to-Select (IFP Friendly)

import { VERBS_DATA } from '../../data/verbs.js';
import { sound } from '../audio.js';
import { confetti } from '../confetti.js';
import { storage } from '../storage.js';

export class GameMatchModule {
  constructor(containerId, onBack) {
    this.container = document.getElementById(containerId);
    this.onBack = onBack;
    this.totalRounds = 10;
    this.currentRound = 1;
    this.score = 0;
    this.verbsPool = [];
    this.roundVerbs = []; // 3 verbs per round
    this.selectedCards = { v1: null, v2: null, v3: null };
    this.matchedPairs = []; // array of verb IDs matched in current round
  }

  start() {
    this.currentRound = 1;
    this.score = 0;
    this.matchedPairs = [];
    this.selectedCards = { v1: null, v2: null, v3: null };
    // Acak kata kerja untuk sesi ini
    this.verbsPool = [...VERBS_DATA].sort(() => Math.random() - 0.5);
    this.loadRound();
  }

  loadRound() {
    this.selectedCards = { v1: null, v2: null, v3: null };
    this.matchedPairs = [];

    // Ambil 3 kata kerja untuk ronde ini
    const startIdx = ((this.currentRound - 1) * 3) % (this.verbsPool.length - 3);
    this.roundVerbs = this.verbsPool.slice(startIdx, startIdx + 3);

    this.render();
  }

  render() {
    // Siapkan kartu V1, V2, V3 yang diacak posisinya masing-masing
    const v1List = [...this.roundVerbs].sort(() => Math.random() - 0.5);
    const v2List = [...this.roundVerbs].sort(() => Math.random() - 0.5);
    const v3List = [...this.roundVerbs].sort(() => Math.random() - 0.5);

    this.container.innerHTML = `
      <div class="game-wrapper animate-fade-in">
        <!-- Header Game -->
        <div class="game-top-bar">
          <button id="btn-back-to-hub" class="btn-game-nav">⬅️ Menu Game</button>
          <div class="game-info-badge">
            <span class="badge-title">🎮 Pasangkan Kata Kerja</span>
            <span class="badge-round">Ronde ${this.currentRound} / ${this.totalRounds}</span>
          </div>
          <div class="game-score-badge">
            <span class="score-icon">⭐</span>
            <span class="score-num">${this.score} Poin</span>
          </div>
        </div>

        <!-- Instruksi -->
        <div class="game-instruction-banner">
          <span class="banner-icon">💡</span>
          <p><strong>Cara Bermain:</strong> Pasangkan 3 kartu yang cocok (<strong>Verb 1 + Verb 2 + Verb 3</strong>). Sentuh atau geser (drag) kartu satu per satu!</p>
        </div>

        <!-- Tiga Kolom Kartu Interaktif -->
        <div class="match-game-board">
          <!-- Kolom 1: Verb 1 -->
          <div class="match-column col-v1">
            <div class="column-header head-v1">
              <span class="col-pill">🟢 Verb 1</span>
              <h4>Bentuk Dasar</h4>
            </div>
            <div class="column-cards" id="cards-v1-container">
              ${v1List.map(v => {
                const isMatched = this.matchedPairs.includes(v.id);
                const isSelected = this.selectedCards.v1 === v.id;
                return `
                  <div class="match-card card-v1 ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}"
                       draggable="${!isMatched}" 
                       data-type="v1" 
                       data-id="${v.id}"
                       data-word="${v.v1}">
                    <span class="card-word">${v.v1}</span>
                    <span class="card-meaning">${v.meaning}</span>
                    ${isMatched ? '<span class="check-mark">✅</span>' : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Kolom 2: Verb 2 -->
          <div class="match-column col-v2">
            <div class="column-header head-v2">
              <span class="col-pill">🟠 Verb 2</span>
              <h4>Past Simple</h4>
            </div>
            <div class="column-cards" id="cards-v2-container">
              ${v2List.map(v => {
                const isMatched = this.matchedPairs.includes(v.id);
                const isSelected = this.selectedCards.v2 === v.id;
                const isRead = v.v1.toLowerCase() === 'read';
                return `
                  <div class="match-card card-v2 ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}"
                       draggable="${!isMatched}" 
                       data-type="v2" 
                       data-id="${v.id}"
                       data-word="${isRead ? 'red' : v.v2}">
                    <span class="card-word">${v.v2}</span>
                    ${isRead ? '<small class="phonetic">/red/</small>' : ''}
                    ${isMatched ? '<span class="check-mark">✅</span>' : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Kolom 3: Verb 3 -->
          <div class="match-column col-v3">
            <div class="column-header head-v3">
              <span class="col-pill">🟣 Verb 3</span>
              <h4>Past Participle</h4>
            </div>
            <div class="column-cards" id="cards-v3-container">
              ${v3List.map(v => {
                const isMatched = this.matchedPairs.includes(v.id);
                const isSelected = this.selectedCards.v3 === v.id;
                const isRead = v.v1.toLowerCase() === 'read';
                return `
                  <div class="match-card card-v3 ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}"
                       draggable="${!isMatched}" 
                       data-type="v3" 
                       data-id="${v.id}"
                       data-word="${isRead ? 'red' : v.v3}">
                    <span class="card-word">${v.v3}</span>
                    ${isRead ? '<small class="phonetic">/red/</small>' : ''}
                    ${isMatched ? '<span class="check-mark">✅</span>' : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Status Pilihan Saat Ini -->
        <div class="selection-status-bar">
          <div class="status-slot ${this.selectedCards.v1 ? 'filled' : ''}">
            <span class="slot-label">V1:</span>
            <strong>${this.getWordById(this.selectedCards.v1, 'v1') || 'Pilih Verb 1'}</strong>
          </div>
          <span class="status-arrow">➔</span>
          <div class="status-slot ${this.selectedCards.v2 ? 'filled' : ''}">
            <span class="slot-label">V2:</span>
            <strong>${this.getWordById(this.selectedCards.v2, 'v2') || 'Pilih Verb 2'}</strong>
          </div>
          <span class="status-arrow">➔</span>
          <div class="status-slot ${this.selectedCards.v3 ? 'filled' : ''}">
            <span class="slot-label">V3:</span>
            <strong>${this.getWordById(this.selectedCards.v3, 'v3') || 'Pilih Verb 3'}</strong>
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  getWordById(id, form) {
    if (!id) return null;
    const v = this.roundVerbs.find(item => item.id === id);
    return v ? v[form] : null;
  }

  handleCardSelect(type, id, word) {
    sound.playClick();
    sound.speak(word);

    this.selectedCards[type] = id;
    this.updateCardSelections();

    // Jika ketiganya sudah dipilih, periksa kecocokan!
    if (this.selectedCards.v1 && this.selectedCards.v2 && this.selectedCards.v3) {
      this.checkMatch();
    }
  }

  updateCardSelections() {
    ['v1', 'v2', 'v3'].forEach(type => {
      const cards = this.container.querySelectorAll(`.card-${type}`);
      cards.forEach(card => {
        const cardId = parseInt(card.getAttribute('data-id'), 10);
        if (this.selectedCards[type] === cardId) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });
    });

    // Update status text
    const slots = this.container.querySelectorAll('.status-slot strong');
    if (slots[0]) slots[0].textContent = this.getWordById(this.selectedCards.v1, 'v1') || 'Pilih Verb 1';
    if (slots[1]) slots[1].textContent = this.getWordById(this.selectedCards.v2, 'v2') || 'Pilih Verb 2';
    if (slots[2]) slots[2].textContent = this.getWordById(this.selectedCards.v3, 'v3') || 'Pilih Verb 3';
  }

  checkMatch() {
    const { v1, v2, v3 } = this.selectedCards;

    if (v1 === v2 && v2 === v3) {
      // COCOK!
      sound.playCorrect();
      confetti.burst(40);
      this.score += 30;
      storage.addXP(30);

      const verbMatched = this.roundVerbs.find(v => v.id === v1);
      this.matchedPairs.push(v1);

      // Tandai kartu hijau
      ['v1', 'v2', 'v3'].forEach(type => {
        const card = this.container.querySelector(`.card-${type}[data-id="${v1}"]`);
        if (card) {
          card.classList.remove('selected');
          card.classList.add('matched', 'animate-pulse');
        }
      });

      this.selectedCards = { v1: null, v2: null, v3: null };

      // Cek apakah seluruh ronde selesai
      if (this.matchedPairs.length === this.roundVerbs.length) {
        setTimeout(() => {
          this.handleRoundComplete();
        }, 800);
      } else {
        this.updateCardSelections();
      }
    } else {
      // SALAH!
      sound.playWrong();
      // Efek goyang kartu salah
      const selectedElements = this.container.querySelectorAll('.match-card.selected');
      selectedElements.forEach(el => el.classList.add('animate-shake'));

      setTimeout(() => {
        selectedElements.forEach(el => el.classList.remove('animate-shake', 'selected'));
        this.selectedCards = { v1: null, v2: null, v3: null };
        this.updateCardSelections();
      }, 700);
    }
  }

  handleRoundComplete() {
    sound.playLevelUp();
    confetti.burst(70);

    if (this.currentRound < this.totalRounds) {
      this.currentRound++;
      this.loadRound();
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
        <div class="result-trophy">🏆</div>
        <h2 class="result-title">Luar Biasa, Petualang!</h2>
        <p class="result-subtitle">Kamu telah berhasil memasangkan seluruh kata kerja dengan sempurna!</p>

        <div class="result-score-box">
          <div class="score-item">
            <span class="label">Skor Akhir</span>
            <span class="value text-gold">${this.score} Poin</span>
          </div>
          <div class="score-item">
            <span class="label">Total Ronde</span>
            <span class="value">${this.totalRounds} Selesai</span>
          </div>
          <div class="score-item">
            <span class="label">Bonus XP</span>
            <span class="value text-green">+100 XP</span>
          </div>
        </div>

        <div class="result-actions">
          <button id="btn-replay-match" class="btn-primary-action">🔄 Main Lagi</button>
          <button id="btn-finish-match" class="btn-secondary-action">⬅️ Kembali ke Menu Game</button>
        </div>
      </div>
    `;

    const replayBtn = this.container.querySelector('#btn-replay-match');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        sound.playClick();
        this.start();
      });
    }

    const finishBtn = this.container.querySelector('#btn-finish-match');
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

    // Tap to select untuk setiap kartu
    const cards = this.container.querySelectorAll('.match-card:not(.matched)');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');
        const id = parseInt(card.getAttribute('data-id'), 10);
        const word = card.getAttribute('data-word');
        this.handleCardSelect(type, id, word);
      });
    });

    // Dukungan Drag & Drop
    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', JSON.stringify({
          type: card.getAttribute('data-type'),
          id: parseInt(card.getAttribute('data-id'), 10),
          word: card.getAttribute('data-word')
        }));
      });
    });

    // Drop targets (kolom lain)
    const columns = this.container.querySelectorAll('.match-column');
    columns.forEach(col => {
      col.addEventListener('dragover', (e) => e.preventDefault());
      col.addEventListener('drop', (e) => {
        e.preventDefault();
        try {
          const data = JSON.parse(e.dataTransfer.getData('text/plain'));
          if (data && data.type && data.id) {
            this.handleCardSelect(data.type, data.id, data.word);
          }
        } catch (err) {}
      });
    });
  }
}
