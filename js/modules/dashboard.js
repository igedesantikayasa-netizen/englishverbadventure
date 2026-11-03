// ENGLISH VERB ADVENTURE - DASHBOARD GURU & PENGATURAN
// Memungkinkan guru mengonfigurasi parameter pembelajaran, melihat rekap skor siswa, dan mengekspor hasil ke CSV

import { storage } from './storage.js';
import { sound } from './audio.js';

export class DashboardModule {
  constructor(containerId, onHome) {
    this.container = document.getElementById(containerId);
    this.onHome = onHome;
    this.activeTab = 'settings'; // 'settings', 'quiz_logs', 'team_logs'
  }

  render() {
    const settings = storage.teacherSettings;
    const quizHistory = storage.quizHistory;
    const teamHistory = storage.teamHistory;

    this.container.innerHTML = `
      <div class="dashboard-container animate-fade-in">
        <!-- Header Dashboard -->
        <div class="dashboard-header">
          <div class="dash-title-group">
            <span class="materi-badge">⚙️ Pusat Kontrol Pendidik</span>
            <h2 class="section-title">Dashboard Guru & Pengaturan Kelas</h2>
            <p class="section-subtitle">Sesuaikan konfigurasi soal, durasi waktu IFP, dan pantau hasil evaluasi belajar siswa.</p>
          </div>
          <button id="btn-dash-back" class="btn-game-nav">🏠 Kembali ke Menu</button>
        </div>

        <!-- Tab Navigasi Dashboard -->
        <div class="dash-tabs-nav">
          <button class="dash-tab-btn ${this.activeTab === 'settings' ? 'active' : ''}" data-tab="settings">
            ⚙️ Pengaturan Pembelajaran
          </button>
          <button class="dash-tab-btn ${this.activeTab === 'quiz_logs' ? 'active' : ''}" data-tab="quiz_logs">
            📊 Rekap Hasil Kuis (${quizHistory.length})
          </button>
          <button class="dash-tab-btn ${this.activeTab === 'team_logs' ? 'active' : ''}" data-tab="team_logs">
            ⚔️ Riwayat Team Battle (${teamHistory.length})
          </button>
        </div>

        <!-- Konten Tab -->
        <div class="dash-tab-content">
          ${this.activeTab === 'settings' ? this.renderSettingsTab(settings) :
            this.activeTab === 'quiz_logs' ? this.renderQuizLogsTab(quizHistory) :
            this.renderTeamLogsTab(teamHistory)}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderSettingsTab(settings) {
    return `
      <div class="settings-card animate-fade-in">
        <h3 class="card-section-title">📋 1. Konfigurasi Kuis & Evaluasi</h3>
        <div class="settings-grid">
          <div class="setting-item">
            <label class="setting-label">Jumlah Soal Kuis:</label>
            <select id="setting-quiz-count" class="setting-select">
              <option value="5" ${settings.quizQuestionCount === 5 ? 'selected' : ''}>5 Soal (Kuis Singkat)</option>
              <option value="10" ${settings.quizQuestionCount === 10 ? 'selected' : ''}>10 Soal (Standar)</option>
              <option value="15" ${settings.quizQuestionCount === 15 ? 'selected' : ''}>15 Soal (Menengah)</option>
              <option value="20" ${settings.quizQuestionCount === 20 ? 'selected' : ''}>20 Soal (Komprehensif)</option>
            </select>
          </div>

          <div class="setting-item">
            <label class="setting-label">Batas Waktu per Soal:</label>
            <select id="setting-quiz-timer" class="setting-select">
              <option value="0" ${settings.quizTimerSeconds === 0 ? 'selected' : ''}>Tanpa Waktu (Santai)</option>
              <option value="15" ${settings.quizTimerSeconds === 15 ? 'selected' : ''}>15 Detik (Cepat / Cerdas Cermat)</option>
              <option value="30" ${settings.quizTimerSeconds === 30 ? 'selected' : ''}>30 Detik (Standar Rekomendasi)</option>
              <option value="45" ${settings.quizTimerSeconds === 45 ? 'selected' : ''}>45 Detik (Cukup Luang)</option>
              <option value="60" ${settings.quizTimerSeconds === 60 ? 'selected' : ''}>60 Detik (Untuk Pemula/SMPLB)</option>
            </select>
          </div>

          <div class="setting-item">
            <label class="setting-label">Fokus Materi Kata Kerja:</label>
            <select id="setting-difficulty" class="setting-select">
              <option value="all" ${settings.gameDifficulty === 'all' ? 'selected' : ''}>Semua Kata Kerja (Campuran Regular & Irregular)</option>
              <option value="regular" ${settings.gameDifficulty === 'regular' ? 'selected' : ''}>Fokus Regular Verb Saja</option>
              <option value="irregular" ${settings.gameDifficulty === 'irregular' ? 'selected' : ''}>Fokus Irregular Verb Saja</option>
            </select>
          </div>
        </div>

        <h3 class="card-section-title mt-6">🔊 2. Pengaturan Audio & Pelafalan (Voice)</h3>
        <div class="settings-grid">
          <div class="setting-item">
            <label class="setting-label">Efek Suara (SFX):</label>
            <button id="btn-toggle-sfx-dash" class="btn-toggle-switch ${sound.sfxEnabled ? 'active' : ''}">
              ${sound.sfxEnabled ? '✅ Efek Suara Aktif' : '❌ Efek Suara Nonaktif'}
            </button>
          </div>

          <div class="setting-item">
            <label class="setting-label">Musik Latar (BGM):</label>
            <button id="btn-toggle-bgm-dash" class="btn-toggle-switch ${sound.bgmEnabled ? 'active' : ''}">
              ${sound.bgmEnabled ? '🎵 Musik Latar Berputar' : '🔇 Musik Latar Mati'}
            </button>
          </div>

          <div class="setting-item">
            <label class="setting-label">Uji Pelafalan Kata (Web Speech):</label>
            <button id="btn-test-speech" class="btn-secondary-action">
              🔊 Uji Suara Native Speaker
            </button>
          </div>
        </div>

        <h3 class="card-section-title mt-6">🗑️ 3. Manajemen Data & Reset</h3>
        <div class="danger-zone-box">
          <p>Jika ingin memulai tahun ajaran baru atau menghapus seluruh riwayat skor siswa yang tersimpan di browser ini:</p>
          <button id="btn-reset-all-storage" class="btn-danger-action">
            ⚠️ Hapus Seluruh Riwayat & Reset Data
          </button>
        </div>
      </div>
    `;
  }

  renderQuizLogsTab(logs) {
    if (logs.length === 0) {
      return `
        <div class="empty-state">
          <span class="empty-emoji">📝</span>
          <h4>Belum Ada Riwayat Kuis</h4>
          <p>Siswa belum menyelesaikan kuis pada perangkat ini. Nilai kuis akan otomatis tercatat di sini setelah kuis selesai!</p>
        </div>
      `;
    }

    return `
      <div class="logs-container animate-fade-in">
        <div class="logs-toolbar">
          <span>Menampilkan <strong>${logs.length}</strong> catatan pengerjaan kuis siswa</span>
          <button id="btn-export-csv" class="btn-primary-action">
            📥 Unduh Rekap Nilai (Format CSV / Excel)
          </button>
        </div>

        <div class="logs-table-wrapper">
          <table class="logs-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Waktu</th>
                <th>Nama Siswa</th>
                <th>Nilai (0-100)</th>
                <th>Benar</th>
                <th>Salah</th>
                <th>Persentase</th>
                <th>Predikat</th>
              </tr>
            </thead>
            <tbody>
              ${logs.map((item, idx) => `
                <tr>
                  <td>${idx + 1}</td>
                  <td>${item.date}</td>
                  <td><strong>${item.studentName || 'Petualang Verb'}</strong></td>
                  <td><span class="score-badge-table ${item.score >= 80 ? 'bg-green' : item.score >= 60 ? 'bg-orange' : 'bg-red'}">${item.score}</span></td>
                  <td><span class="text-green font-bold">${item.correctCount}</span> / ${item.totalQuestions}</td>
                  <td><span class="text-orange font-bold">${item.wrongCount}</span></td>
                  <td>${item.percentage}%</td>
                  <td><small class="pred-text">${item.predicate}</small></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  renderTeamLogsTab(logs) {
    if (logs.length === 0) {
      return `
        <div class="empty-state">
          <span class="empty-emoji">⚔️</span>
          <h4>Belum Ada Riwayat Team Battle</h4>
          <p>Mainkan mode Team Battle di papan interaktif untuk melihat catatan rekap skor pertandingan kelompok di sini.</p>
        </div>
      `;
    }

    return `
      <div class="logs-container animate-fade-in">
        <div class="team-logs-list">
          ${logs.map((item, idx) => `
            <div class="team-battle-log-card">
              <div class="log-card-header">
                <span class="battle-num">Pertandingan #${idx + 1}</span>
                <span class="battle-date">🕒 ${item.date}</span>
                <span class="battle-champ">👑 Juara: <strong>${item.winner}</strong></span>
              </div>
              <div class="log-teams-chips">
                ${item.teams.map(t => `
                  <div class="team-chip ${t.name === item.winner ? 'winner' : ''}">
                    <span class="chip-tname">${t.name}</span>
                    <strong class="chip-tscore">${t.score} Poin</strong>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Tombol Kembali
    const backBtn = this.container.querySelector('#btn-dash-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        sound.playClick();
        if (this.onHome) this.onHome();
      });
    }

    // Tab Navigasi
    const tabBtns = this.container.querySelectorAll('.dash-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.activeTab = btn.getAttribute('data-tab');
        this.render();
      });
    });

    // Perubahan Setting Kuis Count
    const countSelect = this.container.querySelector('#setting-quiz-count');
    if (countSelect) {
      countSelect.addEventListener('change', (e) => {
        sound.playClick();
        storage.updateTeacherSettings({ quizQuestionCount: parseInt(e.target.value, 10) });
      });
    }

    // Perubahan Setting Timer
    const timerSelect = this.container.querySelector('#setting-quiz-timer');
    if (timerSelect) {
      timerSelect.addEventListener('change', (e) => {
        sound.playClick();
        storage.updateTeacherSettings({ quizTimerSeconds: parseInt(e.target.value, 10) });
      });
    }

    // Perubahan Setting Kesulitan
    const diffSelect = this.container.querySelector('#setting-difficulty');
    if (diffSelect) {
      diffSelect.addEventListener('change', (e) => {
        sound.playClick();
        storage.updateTeacherSettings({ gameDifficulty: e.target.value });
      });
    }

    // Toggle SFX
    const toggleSfxBtn = this.container.querySelector('#btn-toggle-sfx-dash');
    if (toggleSfxBtn) {
      toggleSfxBtn.addEventListener('click', () => {
        sound.playClick();
        const state = sound.toggleSFX();
        this.render();
      });
    }

    // Toggle BGM
    const toggleBgmBtn = this.container.querySelector('#btn-toggle-bgm-dash');
    if (toggleBgmBtn) {
      toggleBgmBtn.addEventListener('click', () => {
        sound.playClick();
        const state = sound.toggleBGM();
        this.render();
      });
    }

    // Test Speech
    const testSpeechBtn = this.container.querySelector('#btn-test-speech');
    if (testSpeechBtn) {
      testSpeechBtn.addEventListener('click', () => {
        sound.playClick();
        sound.speak("Welcome to English Verb Adventure! Let's learn Verb 1, Verb 2, and Verb 3!");
      });
    }

    // Reset Data
    const resetBtn = this.container.querySelector('#btn-reset-all-storage');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('PERINGATAN: Apakah Anda yakin ingin menghapus seluruh riwayat kuis, XP, dan pencapaian siswa? Tindakan ini tidak dapat dibatalkan.')) {
          sound.playClick();
          storage.resetAllData();
          alert('Seluruh data berhasil di-reset!');
          this.render();
        }
      });
    }

    // Ekspor CSV
    const exportBtn = this.container.querySelector('#btn-export-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        sound.playClick();
        const csv = storage.exportQuizToCSV();
        if (csv) {
          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `rekap_nilai_english_verb_adventure_${Date.now()}.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } else {
          alert('Belum ada data nilai kuis untuk diekspor!');
        }
      });
    }
  }
}
