// ENGLISH VERB ADVENTURE - MODUL TEAM BATTLE (PERMAINAN KELOMPOK)
// Didesain khusus untuk pembelajaran kolaboratif di Papan Interaktif Digital (IFP)
// Mendukung 2-4 kelompok, papan skor langsung, mode bergantian & mode rebutan cepat (buzzer)

import { QUIZ_QUESTIONS } from '../data/quiz-questions.js';
import { sound } from './audio.js';
import { confetti } from './confetti.js';
import { storage } from './storage.js';

export class TeamBattleModule {
  constructor(containerId, onHome) {
    this.container = document.getElementById(containerId);
    this.onHome = onHome;
    this.stage = 'setup'; // 'setup', 'battle', 'result'
    this.teamCount = 2;
    this.mode = 'buzzer'; // 'buzzer' (rebutan cepat) atau 'turn' (bergantian)
    this.teams = [
      { id: 1, name: 'Tim Rajawali 🦅', score: 0, color: 'blue' },
      { id: 2, name: 'Tim Harimau 🐯', score: 0, color: 'orange' },
      { id: 3, name: 'Tim Garuda 🌟', score: 0, color: 'green' },
      { id: 4, name: 'Tim Singa 🦁', score: 0, color: 'red' }
    ];
    this.totalQuestions = 10;
    this.currentIndex = 0;
    this.questions = [];
    this.currentTurnTeamIdx = 0;
    this.activeBuzzerTeam = null; // Tim yang berhasil menekan bel rebutan
    this.buzzerTimer = 10;
    this.buzzerInterval = null;
    this.isAnswered = false;
  }

  start() {
    this.stage = 'setup';
    this.render();
  }

  initBattle() {
    this.stage = 'battle';
    this.currentIndex = 0;
    this.currentTurnTeamIdx = 0;
    this.activeBuzzerTeam = null;

    // Reset skor tim yang aktif
    for (let i = 0; i < this.teamCount; i++) {
      this.teams[i].score = 0;
    }

    // Acak soal
    this.questions = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, this.totalQuestions);
    this.loadQuestion();
  }

  loadQuestion() {
    this.isAnswered = false;
    this.activeBuzzerTeam = null;
    if (this.buzzerInterval) clearInterval(this.buzzerInterval);
    this.renderBattle();
  }

  render() {
    if (this.stage === 'setup') {
      this.renderSetup();
    } else if (this.stage === 'battle') {
      this.renderBattle();
    } else if (this.stage === 'result') {
      this.renderResult();
    }
  }

  renderSetup() {
    this.container.innerHTML = `
      <div class="team-setup-container animate-fade-in">
        <div class="setup-header">
          <span class="materi-badge">⚔️ Mode Papan Interaktif (IFP)</span>
          <h2 class="section-title">Team Battle: Cerdas Cermat Verb</h2>
          <p class="section-subtitle">Ajak seluruh kelas berkompetisi secara seru dan aktif di papan interaktif!</p>
        </div>

        <div class="setup-card">
          <!-- Pilih Jumlah Kelompok -->
          <div class="setup-form-group">
            <label class="form-label">1. Pilih Jumlah Kelompok:</label>
            <div class="team-count-selector">
              ${[2, 3, 4].map(num => `
                <button class="btn-team-count ${this.teamCount === num ? 'active' : ''}" data-count="${num}">
                  ${num} Kelompok
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Pilih Mode Permainan -->
          <div class="setup-form-group">
            <label class="form-label">2. Pilih Mode Permainan:</label>
            <div class="game-mode-selector">
              <button class="btn-mode-choice ${this.mode === 'buzzer' ? 'active' : ''}" data-mode="buzzer">
                <span class="mode-icon">⚡</span>
                <div class="mode-info">
                  <strong>Rebutan Cepat (Buzzer Bel)</strong>
                  <small>Tim menekan tombol bel di layar untuk menjawab tercepat!</small>
                </div>
              </button>
              <button class="btn-mode-choice ${this.mode === 'turn' ? 'active' : ''}" data-mode="turn">
                <span class="mode-icon">🔄</span>
                <div class="mode-info">
                  <strong>Bergantian (Turn-Based)</strong>
                  <small>Setiap tim mendapat giliran soal secara adil dan berurutan.</small>
                </div>
              </button>
            </div>
          </div>

          <!-- Input Nama Kelompok -->
          <div class="setup-form-group">
            <label class="form-label">3. Atur Nama Kelompok:</label>
            <div class="team-inputs-grid">
              ${this.teams.slice(0, this.teamCount).map((team, idx) => `
                <div class="team-input-card border-${team.color}">
                  <span class="team-color-indicator bg-${team.color}">Tim ${idx + 1}</span>
                  <input type="text" class="team-name-input" data-idx="${idx}" value="${team.name}" placeholder="Nama Kelompok ${idx + 1}">
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Tombol Mulai -->
          <div class="setup-action-row">
            <button id="btn-cancel-battle" class="btn-secondary-action">⬅️ Kembali</button>
            <button id="btn-start-battle" class="btn-primary-action">🚀 Mulai Pertandingan!</button>
          </div>
        </div>
      </div>
    `;

    this.bindSetupEvents();
  }

  renderBattle() {
    const q = this.questions[this.currentIndex];
    const activeTeams = this.teams.slice(0, this.teamCount);
    const turnTeam = activeTeams[this.currentTurnTeamIdx];

    this.container.innerHTML = `
      <div class="battle-arena-container animate-fade-in">
        <!-- Papan Skor Langsung (Live Scoreboard) -->
        <div class="battle-scoreboard-bar">
          <div class="scoreboard-teams-list">
            ${activeTeams.map((team, idx) => {
              const isCurrentTurn = this.mode === 'turn' && idx === this.currentTurnTeamIdx;
              const isBuzzerActive = this.mode === 'buzzer' && this.activeBuzzerTeam && this.activeBuzzerTeam.id === team.id;
              return `
                <div class="scoreboard-team-box box-${team.color} ${isCurrentTurn || isBuzzerActive ? 'active-highlight' : ''}">
                  <div class="team-header-row">
                    <span class="team-name">${team.name}</span>
                    ${isCurrentTurn ? '<span class="turn-indicator">Giliranmu!</span>' : ''}
                    ${isBuzzerActive ? '<span class="buzzer-indicator animate-pulse">Menjawab!</span>' : ''}
                  </div>
                  <div class="team-score-counter">${team.score}</div>
                  <span class="team-points-label">POIN</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Info Ronde Soal -->
        <div class="battle-question-tracker">
          <button id="btn-exit-battle" class="btn-game-nav">⬅️ Keluar</button>
          <div class="battle-round-badge">
            Soal Pertandingan ${this.currentIndex + 1} / ${this.totalQuestions}
          </div>
          <div class="battle-mode-badge">
            ${this.mode === 'buzzer' ? '⚡ Mode Rebutan Cepat' : `🔄 Giliran: ${turnTeam.name}`}
          </div>
        </div>

        <!-- Layar Utama Soal -->
        <div class="battle-question-card">
          <h3 class="battle-question-text">${q.question}</h3>

          <!-- JIKA MODE BUZZER DAN BEL BELUM DITEKAN: Tampilkan Tombol Buzzer Besar untuk setiap tim -->
          ${this.mode === 'buzzer' && !this.activeBuzzerTeam ? `
            <div class="buzzer-prompt-banner">
              <span class="bell-icon animate-bounce">🔔</span>
              <h4>Tekan Tombol Bel Tim Anda untuk Mengambil Kesempatan Menjawab!</h4>
            </div>

            <div class="buzzers-container">
              ${activeTeams.map(team => `
                <button class="btn-giant-buzzer buzzer-${team.color}" data-team-id="${team.id}">
                  <span class="buzzer-press-surface">
                    <span class="buzzer-team-title">${team.name}</span>
                    <span class="buzzer-cta">TEKAN BEL! 🛎️</span>
                  </span>
                </button>
              `).join('')}
            </div>
          ` : `
            <!-- Mode Menjawab (Soal Siap Dijawab oleh Tim) -->
            ${this.activeBuzzerTeam ? `
              <div class="active-answering-banner bg-${this.activeBuzzerTeam.color}">
                <span>🔔 Kesempatan Menjawab: <strong>${this.activeBuzzerTeam.name}</strong></span>
              </div>
            ` : ''}

            <div class="battle-options-grid">
              ${q.options.map((opt, idx) => {
                const letter = ['A', 'B', 'C', 'D'][idx];
                return `
                  <button class="btn-battle-option" data-idx="${idx}">
                    <span class="option-badge">${letter}</span>
                    <span class="option-text">${opt}</span>
                  </button>
                `;
              }).join('')}
            </div>
          `}

          <!-- Umpan Balik Jawaban Tim -->
          <div id="battle-feedback-box" class="quiz-feedback-box hidden">
            <div class="fb-title-row">
              <span id="battle-fb-icon" class="fb-icon"></span>
              <h4 id="battle-fb-title" class="fb-title"></h4>
            </div>
            <p id="battle-fb-text" class="fb-explanation-text"></p>
            <button id="btn-next-battle-question" class="btn-next-action">
              ${this.currentIndex + 1 === this.totalQuestions ? 'Lihat Pemenang 🏆' : 'Soal Berikutnya ➔'}
            </button>
          </div>
        </div>
      </div>
    `;

    this.bindBattleEvents();
  }

  handleBuzzerPress(teamId) {
    if (this.activeBuzzerTeam) return;

    sound.playBuzzer();
    this.activeBuzzerTeam = this.teams.find(t => t.id === teamId);
    this.renderBattle();
  }

  handleBattleAnswer(selectedIdx, clickedButton) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const q = this.questions[this.currentIndex];
    const isCorrect = selectedIdx === q.correctIndex;
    const activeTeam = this.mode === 'buzzer' 
      ? this.activeBuzzerTeam 
      : this.teams[this.currentTurnTeamIdx];

    // Highlight pilihan
    const allOptions = this.container.querySelectorAll('.btn-battle-option');
    allOptions.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correctIndex) {
        btn.classList.add('correct');
      } else if (idx === selectedIdx && !isCorrect) {
        btn.classList.add('wrong');
      }
    });

    const fbBox = this.container.querySelector('#battle-feedback-box');
    const fbIcon = this.container.querySelector('#battle-fb-icon');
    const fbTitle = this.container.querySelector('#battle-fb-title');
    const fbText = this.container.querySelector('#battle-fb-text');

    if (isCorrect) {
      sound.playCorrect();
      confetti.burst(60);
      activeTeam.score += 100;
      storage.addXP(30);

      fbIcon.textContent = '🎉';
      fbTitle.textContent = `BENAR! +100 Poin untuk ${activeTeam.name}!`;
      fbTitle.className = 'fb-title text-green';
    } else {
      sound.playWrong();
      fbIcon.textContent = '⚠️';
      fbTitle.textContent = `KURANG TEPAT! ${activeTeam.name} belum berhasil mendapat poin.`;
      fbTitle.className = 'fb-title text-orange';
    }

    fbText.innerHTML = `<strong>Kunci Jawaban:</strong> ${q.options[q.correctIndex]}<br>💡 ${q.explanation}`;
    fbBox.classList.remove('hidden');
    fbBox.classList.add('animate-slide-up');

    // Update tampilan skor langsung di bar
    this.updateLiveScores();
  }

  updateLiveScores() {
    const activeTeams = this.teams.slice(0, this.teamCount);
    const scoreCounters = this.container.querySelectorAll('.team-score-counter');
    scoreCounters.forEach((counter, idx) => {
      if (activeTeams[idx]) {
        counter.textContent = activeTeams[idx].score;
      }
    });
  }

  nextBattleQuestion() {
    this.currentIndex++;
    if (this.currentIndex < this.totalQuestions) {
      if (this.mode === 'turn') {
        this.currentTurnTeamIdx = (this.currentTurnTeamIdx + 1) % this.teamCount;
      }
      this.loadQuestion();
    } else {
      this.renderResult();
    }
  }

  renderResult() {
    sound.playWin();
    confetti.burst(150);

    const activeTeams = this.teams.slice(0, this.teamCount);
    // Urutkan peringkat berdasarkan skor
    const rankedTeams = [...activeTeams].sort((a, b) => b.score - a.score);
    const winner = rankedTeams[0];

    // Simpan riwayat
    storage.saveTeamBattleResult(activeTeams, winner.name);

    this.container.innerHTML = `
      <div class="team-result-container animate-scale-up">
        <div class="result-trophy">🏆</div>
        <h2 class="result-title">Selamat Kepada Pemenang!</h2>
        <div class="champion-banner bg-${winner.color}">
          <span class="crown">👑 JUARA 1:</span>
          <h3>${winner.name}</h3>
          <span class="champion-score">${winner.score} Poin</span>
        </div>

        <!-- Podium Peringkat Seluruh Tim -->
        <h4 class="podium-title mt-6">Klasemen Akhir Pertandingan:</h4>
        <div class="podium-grid">
          ${rankedTeams.map((team, idx) => `
            <div class="podium-card rank-${idx + 1}">
              <div class="rank-badge">${idx === 0 ? '🥇 Ke-1' : idx === 1 ? '🥈 Ke-2' : idx === 2 ? '🥉 Ke-3' : 'Ke-4'}</div>
              <h4 class="podium-team-name">${team.name}</h4>
              <div class="podium-score">${team.score} Poin</div>
            </div>
          `).join('')}
        </div>

        <div class="result-actions mt-6">
          <button id="btn-replay-battle" class="btn-primary-action">🔄 Tanding Ulang</button>
          <button id="btn-new-battle" class="btn-secondary-action">⚙️ Ganti Pengaturan Tim</button>
          <button id="btn-home-from-battle" class="btn-tertiary-action">🏠 Menu Utama</button>
        </div>
      </div>
    `;

    const replayBtn = this.container.querySelector('#btn-replay-battle');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        sound.playClick();
        this.initBattle();
      });
    }

    const newBattleBtn = this.container.querySelector('#btn-new-battle');
    if (newBattleBtn) {
      newBattleBtn.addEventListener('click', () => {
        sound.playClick();
        this.stage = 'setup';
        this.render();
      });
    }

    const homeBtn = this.container.querySelector('#btn-home-from-battle');
    if (homeBtn) {
      homeBtn.addEventListener('click', () => {
        sound.playClick();
        if (this.onHome) this.onHome();
      });
    }
  }

  bindSetupEvents() {
    // Pilihan Jumlah Tim (2, 3, 4)
    const countBtns = this.container.querySelectorAll('.btn-team-count');
    countBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.teamCount = parseInt(btn.getAttribute('data-count'), 10);
        this.renderSetup();
      });
    });

    // Pilihan Mode (Buzzer / Turn)
    const modeBtns = this.container.querySelectorAll('.btn-mode-choice');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.mode = btn.getAttribute('data-mode');
        this.renderSetup();
      });
    });

    // Input Nama Tim
    const nameInputs = this.container.querySelectorAll('.team-name-input');
    nameInputs.forEach(input => {
      input.addEventListener('input', () => {
        const idx = parseInt(input.getAttribute('data-idx'), 10);
        if (this.teams[idx]) {
          this.teams[idx].name = input.value.trim() || `Tim ${idx + 1}`;
        }
      });
    });

    // Tombol Mulai
    const startBtn = this.container.querySelector('#btn-start-battle');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        sound.playClick();
        this.initBattle();
      });
    }

    // Tombol Batal
    const cancelBtn = this.container.querySelector('#btn-cancel-battle');
    if (cancelBtn) {
      cancelBtn.addEventListener('click', () => {
        sound.playClick();
        if (this.onHome) this.onHome();
      });
    }
  }

  bindBattleEvents() {
    // Tombol Keluar
    const exitBtn = this.container.querySelector('#btn-exit-battle');
    if (exitBtn) {
      exitBtn.addEventListener('click', () => {
        sound.playClick();
        if (confirm('Keluar dari Team Battle? Skor saat ini akan hilang.')) {
          if (this.onHome) this.onHome();
        }
      });
    }

    // Tombol Bel Buzzer Rebutan
    const buzzerBtns = this.container.querySelectorAll('.btn-giant-buzzer');
    buzzerBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const teamId = parseInt(btn.getAttribute('data-team-id'), 10);
        this.handleBuzzerPress(teamId);
      });
    });

    // Tombol Pilihan Jawaban
    const optionBtns = this.container.querySelectorAll('.btn-battle-option');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        this.handleBattleAnswer(idx, btn);
      });
    });

    // Tombol Lanjut Soal Berikutnya
    const nextBtn = this.container.querySelector('#btn-next-battle-question');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        sound.playClick();
        this.nextBattleQuestion();
      });
    }
  }
}
