// ENGLISH VERB ADVENTURE - KAMUS KATA KERJA INTERAKTIF
// Menampilkan 66 kata kerja lengkap dengan filter, pencarian, audio V1/V2/V3, dan mode kartu / tabel

import { VERBS_DATA } from '../data/verbs.js';
import { sound } from './audio.js';

export class DictionaryModule {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.verbs = [...VERBS_DATA];
    this.searchQuery = '';
    this.categoryFilter = 'all'; // 'all', 'regular', 'irregular'
    this.letterFilter = 'all'; // 'all' or 'A', 'B', etc.
    this.viewMode = 'card'; // 'card' or 'table'
  }

  getFilteredVerbs() {
    return this.verbs.filter(v => {
      // Filter Kategori
      if (this.categoryFilter !== 'all' && v.type !== this.categoryFilter) {
        return false;
      }

      // Filter Huruf Awal
      if (this.letterFilter !== 'all' && !v.v1.toUpperCase().startsWith(this.letterFilter)) {
        return false;
      }

      // Filter Pencarian
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase().trim();
        const matchesEnglish = v.v1.toLowerCase().includes(query) ||
                               v.v2.toLowerCase().includes(query) ||
                               v.v3.toLowerCase().includes(query);
        const matchesMeaning = v.meaning.toLowerCase().includes(query);
        return matchesEnglish || matchesMeaning;
      }

      return true;
    });
  }

  render() {
    const filtered = this.getFilteredVerbs();
    const alphabetList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

    this.container.innerHTML = `
      <div class="dict-container">
        <!-- Header Kamus -->
        <div class="dict-header">
          <div class="dict-title-group">
            <span class="materi-badge">📖 Kamus Interaktif</span>
            <h2 class="section-title">Kamus Kata Kerja (Verb Dictionary)</h2>
            <p class="section-subtitle">Jelajahi ${this.verbs.length} kata kerja bahasa Inggris lengkap dengan audio pelafalan asli!</p>
          </div>
          <div class="dict-view-toggle">
            <button class="btn-toggle-view ${this.viewMode === 'card' ? 'active' : ''}" data-view="card">
              🃏 Tampilan Kartu
            </button>
            <button class="btn-toggle-view ${this.viewMode === 'table' ? 'active' : ''}" data-view="table">
              📋 Tampilan Tabel
            </button>
          </div>
        </div>

        <!-- Toolbar Pencarian & Filter -->
        <div class="dict-toolbar">
          <div class="search-box-wrapper">
            <span class="search-icon">🔍</span>
            <input type="text" id="dict-search-input" class="dict-search-input" 
                   placeholder="Cari kata kerja atau arti (contoh: Eat, Went, Makan)..." 
                   value="${this.searchQuery}">
            ${this.searchQuery ? '<button id="btn-clear-search" class="btn-clear-search">✕</button>' : ''}
          </div>

          <div class="filter-type-group">
            <button class="btn-filter-type ${this.categoryFilter === 'all' ? 'active' : ''}" data-cat="all">
              Semua (${this.verbs.length})
            </button>
            <button class="btn-filter-type ${this.categoryFilter === 'regular' ? 'active' : ''}" data-cat="regular">
              🟢 Regular (${this.verbs.filter(v => v.type === 'regular').length})
            </button>
            <button class="btn-filter-type ${this.categoryFilter === 'irregular' ? 'active' : ''}" data-cat="irregular">
              🟠 Irregular (${this.verbs.filter(v => v.type === 'irregular').length})
            </button>
          </div>
        </div>

        <!-- Filter Huruf Alfabet -->
        <div class="alphabet-scroll-bar">
          <button class="alpha-chip ${this.letterFilter === 'all' ? 'active' : ''}" data-letter="all">Semua</button>
          ${alphabetList.map(letter => {
            const hasVerbs = this.verbs.some(v => v.v1.toUpperCase().startsWith(letter));
            return `
              <button class="alpha-chip ${this.letterFilter === letter ? 'active' : ''} ${!hasVerbs ? 'disabled' : ''}" 
                      data-letter="${letter}" ${!hasVerbs ? 'disabled' : ''}>
                ${letter}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Info Hasil -->
        <div class="dict-count-bar">
          <span>Menampilkan <strong>${filtered.length}</strong> kata kerja</span>
          ${this.searchQuery || this.categoryFilter !== 'all' || this.letterFilter !== 'all' ? `
            <button id="btn-reset-all-filters" class="btn-reset-filters">🔄 Reset Filter</button>
          ` : ''}
        </div>

        <!-- Daftar Kata Kerja -->
        <div class="dict-content-area">
          ${filtered.length === 0 ? `
            <div class="empty-state">
              <span class="empty-emoji">🔍</span>
              <h4>Kata kerja tidak ditemukan!</h4>
              <p>Coba gunakan kata kunci pencarian yang lain atau ubah filter Anda.</p>
            </div>
          ` : this.viewMode === 'card' ? this.renderCardView(filtered) : this.renderTableView(filtered)}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderCardView(verbList) {
    return `
      <div class="verb-cards-grid">
        ${verbList.map(verb => {
          const isRead = verb.v1.toLowerCase() === 'read';
          return `
            <div class="verb-card-item ${verb.type === 'regular' ? 'regular-theme' : 'irregular-theme'}">
              <div class="verb-card-top">
                <span class="type-pill ${verb.type === 'regular' ? 'pill-regular' : 'pill-irregular'}">
                  ${verb.type === 'regular' ? '🟢 Regular Verb' : '🟠 Irregular Verb'}
                </span>
                <span class="card-id">#${verb.id}</span>
              </div>

              <div class="verb-meaning-title">
                ${verb.meaning}
              </div>

              <!-- Tiga Bentuk Kata Kerja -->
              <div class="verb-forms-container">
                <div class="verb-form-box v1-box">
                  <span class="form-tag">V1 (Base)</span>
                  <span class="form-word">${verb.v1}</span>
                  ${isRead ? '<span class="phonetic-badge">/riːd/</span>' : ''}
                  <button class="btn-sound-pill" data-speak="${verb.v1}">
                    🔊 Dengar
                  </button>
                </div>

                <div class="verb-form-box v2-box">
                  <span class="form-tag">V2 (Past)</span>
                  <span class="form-word">${verb.v2}</span>
                  ${isRead ? '<span class="phonetic-badge">/red/</span>' : ''}
                  <button class="btn-sound-pill" data-speak="${isRead ? 'red' : verb.v2}">
                    🔊 Dengar
                  </button>
                </div>

                <div class="verb-form-box v3-box">
                  <span class="form-tag">V3 (Participle)</span>
                  <span class="form-word">${verb.v3}</span>
                  ${isRead ? '<span class="phonetic-badge">/red/</span>' : ''}
                  <button class="btn-sound-pill" data-speak="${isRead ? 'red' : verb.v3}">
                    🔊 Dengar
                  </button>
                </div>
              </div>

              ${verb.pronunciationNote ? `
                <div class="card-pronounce-note">
                  ℹ️ ${verb.pronunciationNote}
                </div>
              ` : ''}

              <!-- Contoh Kalimat -->
              <div class="card-examples-preview">
                <div class="example-line">
                  <span class="bullet">V1:</span> <em>${verb.exampleV1}</em>
                  <button class="btn-speak-sentence" data-speak="${verb.exampleV1}">🔊</button>
                </div>
                <div class="example-line">
                  <span class="bullet">V2:</span> <em>${verb.exampleV2}</em>
                  <button class="btn-speak-sentence" data-speak="${verb.exampleV2}">🔊</button>
                </div>
                <div class="example-line">
                  <span class="bullet">V3:</span> <em>${verb.exampleV3}</em>
                  <button class="btn-speak-sentence" data-speak="${verb.exampleV3}">🔊</button>
                </div>
              </div>

              <!-- Tombol Dengar Semua Trio -->
              <button class="btn-speak-all-trio" 
                      data-trio="${verb.v1}. ${isRead ? 'red' : verb.v2}. ${isRead ? 'red' : verb.v3}.">
                🎵 Dengarkan Rangkaian V1, V2, & V3
              </button>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  renderTableView(verbList) {
    return `
      <div class="dict-table-wrapper">
        <table class="dict-table">
          <thead>
            <tr>
              <th style="width: 50px;">No</th>
              <th>Verb 1 (Base)</th>
              <th>Verb 2 (Past Simple)</th>
              <th>Verb 3 (Past Participle)</th>
              <th>Arti Bahasa Indonesia</th>
              <th>Kategori</th>
              <th>Audio Lengkap</th>
            </tr>
          </thead>
          <tbody>
            ${verbList.map((verb, idx) => {
              const isRead = verb.v1.toLowerCase() === 'read';
              return `
                <tr>
                  <td>${idx + 1}</td>
                  <td>
                    <div class="table-word-cell">
                      <span class="word-v1">${verb.v1}</span>
                      ${isRead ? '<small class="text-muted">/riːd/</small>' : ''}
                      <button class="btn-table-sound" data-speak="${verb.v1}">🔊</button>
                    </div>
                  </td>
                  <td>
                    <div class="table-word-cell">
                      <span class="word-v2">${verb.v2}</span>
                      ${isRead ? '<small class="text-muted">/red/</small>' : ''}
                      <button class="btn-table-sound" data-speak="${isRead ? 'red' : verb.v2}">🔊</button>
                    </div>
                  </td>
                  <td>
                    <div class="table-word-cell">
                      <span class="word-v3">${verb.v3}</span>
                      ${isRead ? '<small class="text-muted">/red/</small>' : ''}
                      <button class="btn-table-sound" data-speak="${isRead ? 'red' : verb.v3}">🔊</button>
                    </div>
                  </td>
                  <td><strong class="meaning-text">${verb.meaning}</strong></td>
                  <td>
                    <span class="badge ${verb.type === 'regular' ? 'badge-reg' : 'badge-irreg'}">
                      ${verb.type === 'regular' ? 'Regular' : 'Irregular'}
                    </span>
                  </td>
                  <td>
                    <button class="btn-sound-mini" data-trio="${verb.v1}. ${isRead ? 'red' : verb.v2}. ${isRead ? 'red' : verb.v3}.">
                      🔊 Putar Trio
                    </button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  bindEvents() {
    // Input Pencarian
    const searchInput = this.container.querySelector('#dict-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.render();
        // Kembalikan fokus dan kursor di akhir
        const newSearchInput = this.container.querySelector('#dict-search-input');
        if (newSearchInput) {
          newSearchInput.focus();
          newSearchInput.setSelectionRange(newSearchInput.value.length, newSearchInput.value.length);
        }
      });
    }

    // Tombol Clear Search
    const clearBtn = this.container.querySelector('#btn-clear-search');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        sound.playClick();
        this.searchQuery = '';
        this.render();
      });
    }

    // Tombol Toggle Card / Table
    const viewButtons = this.container.querySelectorAll('.btn-toggle-view');
    viewButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.viewMode = btn.getAttribute('data-view');
        this.render();
      });
    });

    // Tombol Filter Kategori (All / Regular / Irregular)
    const catButtons = this.container.querySelectorAll('.btn-filter-type');
    catButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.categoryFilter = btn.getAttribute('data-cat');
        this.render();
      });
    });

    // Tombol Filter Alfabet
    const alphaButtons = this.container.querySelectorAll('.alpha-chip:not(.disabled)');
    alphaButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.letterFilter = btn.getAttribute('data-letter');
        this.render();
      });
    });

    // Reset All Filters
    const resetBtn = this.container.querySelector('#btn-reset-all-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        sound.playClick();
        this.searchQuery = '';
        this.categoryFilter = 'all';
        this.letterFilter = 'all';
        this.render();
      });
    }

    // Tombol Suara Satuan
    const speakBtns = this.container.querySelectorAll('[data-speak]');
    speakBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playClick();
        const word = btn.getAttribute('data-speak');
        sound.speak(word);
      });
    });

    // Tombol Suara Trio (V1, V2, V3 berurutan)
    const trioBtns = this.container.querySelectorAll('[data-trio]');
    trioBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playClick();
        const trio = btn.getAttribute('data-trio');
        sound.speak(trio);
      });
    });
  }
}
