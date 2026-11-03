// ENGLISH VERB ADVENTURE - APLIKASI UTAMA (MAIN APP CONTROLLER)
// Mengatur navigasi halaman, state global, header interaktif, dan integrasi modul

import { sound } from './modules/audio.js';
import { confetti } from './modules/confetti.js';
import { storage, LEVEL_CONFIG } from './modules/storage.js';

// Modul-modul pembelajaran dan permainan
import { MateriModule } from './modules/materi.js';
import { DictionaryModule } from './modules/dictionary.js';
import { GameMatchModule } from './modules/games/game1-match.js';
import { GameCompleteModule } from './modules/games/game2-complete.js';
import { GameHunterModule } from './modules/games/game3-hunter.js';
import { GameSentenceModule } from './modules/games/game4-sentence.js';
import { GameMemoryModule } from './modules/games/game5-memory.js';
import { QuizModule } from './modules/quiz.js';
import { TeamBattleModule } from './modules/team-battle.js';
import { DashboardModule } from './modules/dashboard.js';

class App {
  constructor() {
    this.currentView = 'home';
    this.mainContainer = document.getElementById('app-main-content');
    
    // Inisialisasi modul-modul
    this.materiModule = new MateriModule('app-main-content');
    this.dictModule = new DictionaryModule('app-main-content');
    this.gameMatchModule = new GameMatchModule('app-main-content', () => this.showGameHub());
    this.gameCompleteModule = new GameCompleteModule('app-main-content', () => this.showGameHub());
    this.gameHunterModule = new GameHunterModule('app-main-content', () => this.showGameHub());
    this.gameSentenceModule = new GameSentenceModule('app-main-content', () => this.showGameHub());
    this.gameMemoryModule = new GameMemoryModule('app-main-content', () => this.showGameHub());
    this.quizModule = new QuizModule('app-main-content', () => this.navigate('home'));
    this.teamBattleModule = new TeamBattleModule('app-main-content', () => this.navigate('home'));
    this.dashboardModule = new DashboardModule('app-main-content', () => this.navigate('home'));

    this.init();
  }

  init() {
    this.renderHeader();
    this.navigate('home');
    this.registerPWA();
    this.setupGlobalShortcuts();
  }

  registerPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('PWA Service Worker registered:', reg.scope))
          .catch(err => console.log('Service Worker registration failed:', err));
      });
    }
  }

  setupGlobalShortcuts() {
    // Tombol F11 atau Escape untuk Fullscreen
    document.addEventListener('keydown', (e) => {
      if (e.key === 'F11') {
        e.preventDefault();
        this.toggleFullscreen();
      }
    });
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error saat mengaktifkan fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setTimeout(() => this.updateHeaderUI(), 200);
  }

  renderHeader() {
    const headerContainer = document.getElementById('app-header');
    if (!headerContainer) return;

    const currentLevel = storage.getCurrentLevel();
    const nextInfo = storage.getNextLevelInfo();

    headerContainer.innerHTML = `
      <div class="top-nav-bar">
        <!-- Logo & Brand -->
        <div class="nav-brand" id="brand-logo-btn">
          <span class="brand-mascot">🎒</span>
          <div class="brand-titles">
            <h1 class="brand-name">ENGLISH VERB ADVENTURE</h1>
            <span class="brand-tagline">Belajar Verb 1, 2, & 3 dengan Menyenangkan!</span>
          </div>
        </div>

        <!-- Status XP & Level Siswa -->
        <div class="nav-player-level-badge" id="player-level-badge" title="Klik untuk melihat pencapaian">
          <div class="level-icon-wrap">${currentLevel.icon}</div>
          <div class="level-info-col">
            <div class="level-name-row">
              <span class="level-title">Lv.${currentLevel.level} ${currentLevel.name}</span>
              <span class="xp-count">${storage.userData.xp} XP</span>
            </div>
            <div class="xp-mini-track">
              <div class="xp-mini-fill" style="width: ${nextInfo.progress}%;"></div>
            </div>
          </div>
        </div>

        <!-- Tombol Aksi Global (Home, Suara, BGM, Layar Penuh) -->
        <div class="nav-quick-actions">
          <button id="btn-global-home" class="btn-nav-action" title="Kembali ke Beranda">
            <span class="icon">🏠</span>
            <span class="btn-text">Beranda</span>
          </button>

          <button id="btn-global-bgm" class="btn-nav-action ${sound.bgmEnabled ? 'active' : ''}" title="Musik Latar">
            <span class="icon">${sound.bgmEnabled ? '🎵' : '🔇'}</span>
            <span class="btn-text">Musik</span>
          </button>

          <button id="btn-global-sfx" class="btn-nav-action ${sound.sfxEnabled ? 'active' : ''}" title="Efek Suara">
            <span class="icon">${sound.sfxEnabled ? '🔊' : '🔈'}</span>
            <span class="btn-text">Suara</span>
          </button>

          <button id="btn-global-fullscreen" class="btn-nav-action" title="Mode Layar Penuh (Cocok untuk IFP)">
            <span class="icon">${document.fullscreenElement ? '🗗' : '⛶'}</span>
            <span class="btn-text">Layar Penuh</span>
          </button>
        </div>
      </div>
    `;

    this.bindHeaderEvents();
  }

  updateHeaderUI() {
    this.renderHeader();
  }

  bindHeaderEvents() {
    const brandBtn = document.getElementById('brand-logo-btn');
    if (brandBtn) {
      brandBtn.addEventListener('click', () => {
        sound.playClick();
        this.navigate('home');
      });
    }

    const homeBtn = document.getElementById('btn-global-home');
    if (homeBtn) {
      homeBtn.addEventListener('click', () => {
        sound.playClick();
        this.navigate('home');
      });
    }

    const bgmBtn = document.getElementById('btn-global-bgm');
    if (bgmBtn) {
      bgmBtn.addEventListener('click', () => {
        sound.playClick();
        sound.toggleBGM();
        this.updateHeaderUI();
      });
    }

    const sfxBtn = document.getElementById('btn-global-sfx');
    if (sfxBtn) {
      sfxBtn.addEventListener('click', () => {
        sound.playClick();
        sound.toggleSFX();
        this.updateHeaderUI();
      });
    }

    const fsBtn = document.getElementById('btn-global-fullscreen');
    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        sound.playClick();
        this.toggleFullscreen();
      });
    }

    const levelBadge = document.getElementById('player-level-badge');
    if (levelBadge) {
      levelBadge.addEventListener('click', () => {
        sound.playClick();
        this.showLevelRewardModal();
      });
    }
  }

  showLevelRewardModal() {
    const current = storage.getCurrentLevel();
    const next = storage.getNextLevelInfo();
    const rewards = storage.userData.rewards;

    const modal = document.createElement('div');
    modal.className = 'custom-modal-overlay animate-fade-in';
    modal.innerHTML = `
      <div class="custom-modal-card animate-scale-up">
        <div class="modal-header">
          <span class="modal-icon">🏆</span>
          <h3>Status Level & Penghargaan Siswa</h3>
          <button class="modal-close-btn" id="modal-close">✕</button>
        </div>

        <div class="modal-body">
          <div class="current-level-box">
            <span class="huge-badge">${current.icon}</span>
            <h4>Level ${current.level}: ${current.name}</h4>
            <p class="badge-subtitle">${current.badge}</p>
            <div class="xp-detail-text">Total Pengalaman: <strong>${storage.userData.xp} XP</strong></div>

            ${!next.isMax ? `
              <div class="next-level-progress-box mt-3">
                <div class="progress-labels">
                  <span>Menuju <strong>${next.nextLevelName}</strong></span>
                  <span>Sisa: ${next.remainingXp} XP</span>
                </div>
                <div class="progress-bar-track">
                  <div class="progress-bar-fill" style="width: ${next.progress}%;"></div>
                </div>
              </div>
            ` : '<div class="max-level-badge mt-3">⭐ Level Maksimal Tercapai! ⭐</div>'}
          </div>

          <h5 class="reward-section-title mt-4">⭐ Bintang & Trofi Penghargaan:</h5>
          <div class="rewards-trophy-grid">
            <div class="reward-trophy-item ${rewards.bronzeStar ? 'unlocked' : 'locked'}">
              <span class="trophy-emoji">🥉</span>
              <span class="trophy-name">Bronze Star</span>
              <small class="trophy-cond">300 XP</small>
            </div>
            <div class="reward-trophy-item ${rewards.silverStar ? 'unlocked' : 'locked'}">
              <span class="trophy-emoji">🥈</span>
              <span class="trophy-name">Silver Star</span>
              <small class="trophy-cond">800 XP</small>
            </div>
            <div class="reward-trophy-item ${rewards.goldStar ? 'unlocked' : 'locked'}">
              <span class="trophy-emoji">🥇</span>
              <span class="trophy-name">Gold Star</span>
              <small class="trophy-cond">1500 XP</small>
            </div>
            <div class="reward-trophy-item ${rewards.verbMasterTrophy ? 'unlocked' : 'locked'}">
              <span class="trophy-emoji">🏆</span>
              <span class="trophy-name">Verb Master</span>
              <small class="trophy-cond">2000 XP & 3 Kuis</small>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('#modal-close');
    closeBtn.addEventListener('click', () => {
      sound.playClick();
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  navigate(viewName) {
    this.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (viewName) {
      case 'home':
        this.renderHome();
        break;
      case 'materi':
        this.materiModule.render();
        break;
      case 'dictionary':
        this.dictModule.render();
        break;
      case 'games-hub':
        this.showGameHub();
        break;
      case 'game-match':
        this.gameMatchModule.start();
        break;
      case 'game-complete':
        this.gameCompleteModule.start();
        break;
      case 'game-hunter':
        this.gameHunterModule.start();
        break;
      case 'game-sentence':
        this.gameSentenceModule.start();
        break;
      case 'game-memory':
        this.gameMemoryModule.start();
        break;
      case 'quiz':
        this.quizModule.start();
        break;
      case 'team-battle':
        this.teamBattleModule.start();
        break;
      case 'guide':
        this.renderGuide();
        break;
      case 'dashboard':
        this.dashboardModule.render();
        break;
      default:
        this.renderHome();
    }

    this.updateHeaderUI();
  }

  renderHome() {
    this.mainContainer.innerHTML = `
      <div class="home-screen-container animate-fade-in">
        <!-- Hero Banner Utama -->
        <div class="home-hero-card">
          <div class="hero-content">
            <span class="hero-tag">🌟 Petualangan Belajar Bahasa Inggris</span>
            <h2 class="hero-main-title">ENGLISH VERB ADVENTURE</h2>
            <p class="hero-description">
              Kuasai <strong>Verb 1</strong> (Bentuk Dasar), <strong>Verb 2</strong> (Bentuk Lampau), dan <strong>Verb 3</strong> (Past Participle) melalui permainan seru dan interaktif di layar sentuh!
            </p>
            <div class="hero-action-buttons">
              <button class="btn-hero-primary" id="btn-home-start-learning">
                <span class="icon">📘</span>
                <span>Mulai Belajar</span>
              </button>
              <button class="btn-hero-secondary" id="btn-home-play-game">
                <span class="icon">🎮</span>
                <span>Game Challenge</span>
              </button>
            </div>
          </div>

          <!-- Maskot Karakter Petualang -->
          <div class="hero-mascot-wrapper">
            <div class="mascot-figure animate-bounce-slow">
              <span class="mascot-emoji">🤠</span>
              <div class="mascot-badge">Halo, Petualang! 👋</div>
            </div>
          </div>
        </div>

        <!-- Menu Utama 6 Kotak Interaktif Besar (IFP Friendly) -->
        <div class="home-main-menu-grid">
          <!-- 1. Materi Pembelajaran -->
          <div class="menu-card card-materi" id="menu-btn-materi">
            <div class="card-icon-circle bg-blue">📘</div>
            <div class="card-info">
              <h3>Materi Pembelajaran</h3>
              <p>Pahami konsep Verb 1, 2, 3, dan Regular vs Irregular Verb secara tuntas.</p>
            </div>
            <span class="card-arrow-pill">Buka Modul ➔</span>
          </div>

          <!-- 2. Kamus Kata Kerja -->
          <div class="menu-card card-dictionary" id="menu-btn-dict">
            <div class="card-icon-circle bg-green">📖</div>
            <div class="card-info">
              <h3>Kamus Kata Kerja</h3>
              <p>Jelajahi 66+ kata kerja lengkap dengan arti, audio pengucapan, dan contoh.</p>
            </div>
            <span class="card-arrow-pill">Buka Kamus ➔</span>
          </div>

          <!-- 3. Game Challenge -->
          <div class="menu-card card-games" id="menu-btn-games">
            <div class="card-icon-circle bg-orange">🎮</div>
            <div class="card-info">
              <h3>Game Challenge</h3>
              <p>5 jenis permainan seru: Pasangkan Kata, Lengkapi Verb, Pemburu Kata, & Memori!</p>
            </div>
            <span class="card-arrow-pill">Pilih Game ➔</span>
          </div>

          <!-- 4. Kuis Interaktif -->
          <div class="menu-card card-quiz" id="menu-btn-quiz">
            <div class="card-icon-circle bg-purple">📝</div>
            <div class="card-info">
              <h3>Kuis Interaktif</h3>
              <p>Uji kemampuanmu dengan bank soal acak, skor instan, dan sertifikat prestasi.</p>
            </div>
            <span class="card-arrow-pill">Mulai Kuis ➔</span>
          </div>

          <!-- 5. Team Battle (Papan Interaktif) -->
          <div class="menu-card card-battle" id="menu-btn-battle">
            <div class="card-icon-circle bg-red">⚔️</div>
            <div class="card-info">
              <h3>Team Battle (Kelompok)</h3>
              <p>Mode cerdas cermat 2-4 kelompok dengan bel rebutan cepat (Quick Buzzer)!</p>
            </div>
            <span class="card-arrow-pill">Mulai Tanding ➔</span>
          </div>

          <!-- 6. Panduan & Petunjuk Bermain -->
          <div class="menu-card card-guide" id="menu-btn-guide">
            <div class="card-icon-circle bg-yellow">💡</div>
            <div class="card-info">
              <h3>Panduan Bermain</h3>
              <p>Petunjuk penggunaan aplikasi bagi guru dan siswa serta tips bermain.</p>
            </div>
            <span class="card-arrow-pill">Baca Panduan ➔</span>
          </div>
        </div>

        <!-- Tombol Dashboard Guru di Bawah -->
        <div class="home-bottom-bar">
          <button class="btn-dashboard-link" id="menu-btn-dashboard">
            <span class="icon">⚙️</span>
            <span>Pengaturan & Dashboard Guru</span>
          </button>
        </div>
      </div>
    `;

    this.bindHomeEvents();
  }

  bindHomeEvents() {
    const bindBtn = (id, targetView) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', () => {
          sound.playClick();
          this.navigate(targetView);
        });
      }
    };

    bindBtn('btn-home-start-learning', 'materi');
    bindBtn('btn-home-play-game', 'games-hub');
    bindBtn('menu-btn-materi', 'materi');
    bindBtn('menu-btn-dict', 'dictionary');
    bindBtn('menu-btn-games', 'games-hub');
    bindBtn('menu-btn-quiz', 'quiz');
    bindBtn('menu-btn-battle', 'team-battle');
    bindBtn('menu-btn-guide', 'guide');
    bindBtn('menu-btn-dashboard', 'dashboard');
  }

  showGameHub() {
    this.mainContainer.innerHTML = `
      <div class="games-hub-container animate-fade-in">
        <div class="hub-header">
          <span class="materi-badge">🎮 Arena Permainan Edukatif</span>
          <h2 class="section-title">Pilih Tantangan Game Kata Kerja</h2>
          <p class="section-subtitle">Pilih salah satu dari 5 permainan interaktif di bawah ini untuk melatih ketangkasanmu!</p>
        </div>

        <div class="games-catalog-grid">
          <!-- Game 1: Match The Verbs -->
          <div class="game-hub-card card-theme-blue" id="hub-btn-game1">
            <div class="game-badge">Game 1</div>
            <div class="hub-icon">🧩</div>
            <h3>Pasangkan Kata Kerja!</h3>
            <p>Pasangkan 3 kartu yang cocok: <strong>Verb 1, Verb 2, dan Verb 3</strong> melalui sentuhan atau drag & drop.</p>
            <button class="btn-play-game">Mainkan Sekarang ➔</button>
          </div>

          <!-- Game 2: Complete The Verb -->
          <div class="game-hub-card card-theme-green" id="hub-btn-game2">
            <div class="game-badge">Game 2</div>
            <div class="hub-icon">🔍</div>
            <h3>Lengkapi Kata Kerjanya!</h3>
            <p>Temukan bagian kata kerja yang hilang (V1, V2, atau V3) dari pilihan kartu bergambar.</p>
            <button class="btn-play-game">Mainkan Sekarang ➔</button>
          </div>

          <!-- Game 3: Verb Hunter -->
          <div class="game-hub-card card-theme-orange" id="hub-btn-game3">
            <div class="game-badge">Game 3</div>
            <div class="hub-icon">🏹</div>
            <h3>Pemburu Kata Kerja!</h3>
            <p>Tangkap kata kerja target yang mengapung di layar sebelum waktu habis! Dapatkan poin kombo!</p>
            <button class="btn-play-game">Mainkan Sekarang ➔</button>
          </div>

          <!-- Game 4: Sentence Builder -->
          <div class="game-hub-card card-theme-purple" id="hub-btn-game4">
            <div class="game-badge">Game 4</div>
            <div class="hub-icon">🧱</div>
            <h3>Susun Kalimat!</h3>
            <p>Susun potongan kata acak menjadi kalimat Bahasa Inggris yang utuh dengan Verb 1, 2, dan 3.</p>
            <button class="btn-play-game">Mainkan Sekarang ➔</button>
          </div>

          <!-- Game 5: Verb Memory Card -->
          <div class="game-hub-card card-theme-pink" id="hub-btn-game5">
            <div class="game-badge">Game 5</div>
            <div class="hub-icon">🃏</div>
            <h3>Kartu Memori Kata Kerja!</h3>
            <p>Uji daya ingatmu dengan membuka kartu tertutup dan menemukan pasangan Verb 1 dan Verb 2!</p>
            <button class="btn-play-game">Mainkan Sekarang ➔</button>
          </div>
        </div>

        <div class="hub-bottom-actions">
          <button id="btn-back-home-from-hub" class="btn-secondary-action">⬅️ Kembali ke Menu Utama</button>
        </div>
      </div>
    `;

    const bindGame = (id, targetView) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('click', () => {
          sound.playClick();
          this.navigate(targetView);
        });
      }
    };

    bindGame('hub-btn-game1', 'game-match');
    bindGame('hub-btn-game2', 'game-complete');
    bindGame('hub-btn-game3', 'game-hunter');
    bindGame('hub-btn-game4', 'game-sentence');
    bindGame('hub-btn-game5', 'game-memory');

    const backBtn = document.getElementById('btn-back-home-from-hub');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        sound.playClick();
        this.navigate('home');
      });
    }
  }

  renderGuide() {
    this.mainContainer.innerHTML = `
      <div class="guide-container animate-fade-in">
        <div class="guide-header">
          <span class="materi-badge">💡 Panduan Pembelajaran</span>
          <h2 class="section-title">Panduan Bermain & Penggunaan Aplikasi</h2>
          <p class="section-subtitle">Petunjuk lengkap bagi guru dan siswa untuk memaksimalkan pembelajaran menggunakan Interactive Flat Panel (IFP) atau komputer.</p>
        </div>

        <div class="guide-content-cards">
          <!-- Panduan 1: Penggunaan Papan Interaktif (IFP) -->
          <div class="guide-card">
            <div class="guide-card-icon">🖥️</div>
            <div class="guide-card-body">
              <h4>1. Optimalisasi pada Layar Sentuh & Papan Interaktif (IFP)</h4>
              <p>Seluruh tombol dan kartu dirancang dengan ukuran besar agar mudah disentuh langsung menggunakan jari atau stylus pen. Gunakan mode <strong>Layar Penuh (Fullscreen)</strong> di pojok kanan atas untuk menghilangkan toolbar browser agar fokus siswa maksimal.</p>
            </div>
          </div>

          <!-- Panduan 2: Audio & Native Speaker -->
          <div class="guide-card">
            <div class="guide-card-icon">🔊</div>
            <div class="guide-card-body">
              <h4>2. Fitur Audio Pengucapan (Pronunciation)</h4>
              <p>Aplikasi dilengkapi dengan Web Speech API yang dapat melafalkan setiap kata kerja dalam aksen bahasa Inggris yang jelas. Siswa dapat menekan tombol <strong>🔊 Dengar</strong> pada kamus atau materi untuk menirukan pelafalan yang benar. Khusus kata <em>Read</em>, sistem otomatis melafalkan /riːd/ untuk V1 dan /red/ untuk V2 dan V3.</p>
            </div>
          </div>

          <!-- Panduan 3: Strategi Pembelajaran di Kelas -->
          <div class="guide-card">
            <div class="guide-card-icon">👥</div>
            <div class="guide-card-body">
              <h4>3. Mode Team Battle untuk Kerja Sama Kelompok</h4>
              <p>Guru dapat membagi kelas menjadi 2 hingga 4 kelompok. Gunakan <strong>Mode Rebutan (Buzzer)</strong> untuk memicu antusiasme siswa maju ke depan papan interaktif dan menekan tombol bel kelompok untuk menjawab tercepat!</p>
            </div>
          </div>

          <!-- Panduan 4: Rekap Nilai Guru -->
          <div class="guide-card">
            <div class="guide-card-icon">📊</div>
            <div class="guide-card-body">
              <h4>4. Pemantauan & Rekap Nilai Otomatis</h4>
              <p>Setiap kuis yang diselesaikan siswa otomatis tersimpan di LocalStorage peramban. Guru dapat membuka <strong>Dashboard Guru</strong> untuk melihat statistik nilai, persentase kelulusan, serta mengekspor data ke format CSV (Excel) tanpa perlu koneksi internet.</p>
            </div>
          </div>
        </div>

        <div class="guide-action-row">
          <button id="btn-back-from-guide" class="btn-primary-action">🏠 Kembali ke Menu Utama</button>
        </div>
      </div>
    `;

    const backBtn = document.getElementById('btn-back-from-guide');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        sound.playClick();
        this.navigate('home');
      });
    }
  }
}

// Inisialisasi saat DOM siap
window.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
