// ENGLISH VERB ADVENTURE - MODUL MATERI PEMBELAJARAN
// Penjelasan interaktif mengenai Verb, Verb 1, Verb 2, Verb 3, serta Regular & Irregular Verb

import { sound } from './audio.js';

export class MateriModule {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activeTab = 'pengertian';
  }

  render() {
    this.container.innerHTML = `
      <div class="materi-container">
        <!-- Header Materi -->
        <div class="materi-header">
          <div class="materi-title-group">
            <span class="materi-badge">📚 Ruang Belajar Mandiri</span>
            <h2 class="section-title">Petualangan Mengenal Kata Kerja (Verbs)</h2>
            <p class="section-subtitle">Pelajari konsep bentuk kata kerja dalam Bahasa Inggris dengan cara yang mudah dan menyenangkan!</p>
          </div>
        </div>

        <!-- Tab Navigasi Materi -->
        <div class="materi-tabs-nav" role="tablist">
          <button class="materi-tab-btn ${this.activeTab === 'pengertian' ? 'active' : ''}" data-tab="pengertian">
            <span class="tab-icon">💡</span>
            <span class="tab-label">1. Pengertian Verb</span>
          </button>
          <button class="materi-tab-btn ${this.activeTab === 'verb1' ? 'active' : ''}" data-tab="verb1">
            <span class="tab-icon">🟢</span>
            <span class="tab-label">2. Verb 1 (Base Form)</span>
          </button>
          <button class="materi-tab-btn ${this.activeTab === 'verb2' ? 'active' : ''}" data-tab="verb2">
            <span class="tab-icon">🟠</span>
            <span class="tab-label">3. Verb 2 (Past Simple)</span>
          </button>
          <button class="materi-tab-btn ${this.activeTab === 'verb3' ? 'active' : ''}" data-tab="verb3">
            <span class="tab-icon">🟣</span>
            <span class="tab-label">4. Verb 3 (Past Participle)</span>
          </button>
          <button class="materi-tab-btn ${this.activeTab === 'regular-irregular' ? 'active' : ''}" data-tab="regular-irregular">
            <span class="tab-icon">⚖️</span>
            <span class="tab-label">5. Regular vs Irregular</span>
          </button>
        </div>

        <!-- Isi Konten Materi -->
        <div class="materi-tab-content">
          ${this.renderTabContent()}
        </div>
      </div>
    `;

    this.bindEvents();
  }

  renderTabContent() {
    switch (this.activeTab) {
      case 'pengertian':
        return `
          <div class="materi-card animate-fade-in">
            <div class="card-hero-banner bg-blue-light">
              <div class="banner-text">
                <h3>Apa Itu Verb (Kata Kerja)?</h3>
                <p><strong>Verb</strong> adalah kata yang digunakan untuk menyatakan <em>suatu kegiatan, tindakan, atau keadaan</em> yang dilakukan oleh seseorang atau benda.</p>
              </div>
              <div class="banner-emoji">🏃‍♂️📖✍️</div>
            </div>

            <div class="materi-box mt-4">
              <h4 class="box-title">🌟 Mengapa Verb Sangat Penting?</h4>
              <p>Dalam Bahasa Inggris, <strong>setiap kalimat wajib memiliki Verb</strong>! Berbeda dengan Bahasa Indonesia di mana bentuk kata kerja tidak berubah saat terjadi di masa lampau, dalam Bahasa Inggris kata kerja berubah bentuk sesuai dengan waktu terjadinya peristiwa (Tenses).</p>
            </div>

            <h4 class="sub-heading mt-6">✨ Contoh Kata Kerja Populer:</h4>
            <div class="verb-examples-grid">
              ${this.createVerbAudioCard('Eat', 'Makan', 'I eat healthy food every day.')}
              ${this.createVerbAudioCard('Drink', 'Minum', 'We drink clean water.')}
              ${this.createVerbAudioCard('Sleep', 'Tidur', 'Cats sleep comfortably.')}
              ${this.createVerbAudioCard('Read', 'Membaca', 'Students read science books.', 'read')}
              ${this.createVerbAudioCard('Write', 'Menulis', 'She writes a nice letter.')}
            </div>

            <div class="info-callout mt-6">
              <div class="callout-icon">💡</div>
              <div class="callout-content">
                <strong>Tips Belajar:</strong> Sentuh tombol suara <span class="audio-badge">🔊 Dengarkan</span> pada setiap kartu untuk mendengarkan pelafalan asli bahasa Inggris dari native speaker!
              </div>
            </div>
          </div>
        `;

      case 'verb1':
        return `
          <div class="materi-card animate-fade-in">
            <div class="card-hero-banner bg-green-light">
              <div class="banner-text">
                <h3>Verb 1: Bentuk Dasar (Base Form / Infinitive)</h3>
                <p><strong>Verb 1</strong> adalah bentuk asli atau dasar dari kata kerja sebelum mengalami perubahan waktu. Verb 1 digunakan untuk:</p>
              </div>
              <div class="banner-emoji">🌱</div>
            </div>

            <div class="features-row mt-4">
              <div class="feature-item">
                <span class="feature-icon">⏰</span>
                <h5>1. Simple Present Tense</h5>
                <p>Menyatakan kegiatan sehari-hari, kebiasaan rutin, atau fakta ilmiah umum.</p>
              </div>
              <div class="feature-item">
                <span class="feature-icon">👉</span>
                <h5>2. Perintah / Instruksi</h5>
                <p>Kalimat imperatif seperti <em>"Open the door!"</em> atau <em>"Listen carefully!"</em>.</p>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🎯</span>
                <h5>3. Setelah Modal / To</h5>
                <p>Digunakan setelah kata modal seperti <em>can, will, must, should</em> atau <em>to</em>.</p>
              </div>
            </div>

            <h4 class="sub-heading mt-6">📖 Contoh Kata Kerja Verb 1 & Contoh Kalimat:</h4>
            <div class="example-sentences-list">
              <div class="sentence-item">
                <div class="verb-tag v1-tag">Eat = Makan</div>
                <div class="sentence-text">
                  <span class="en">"I <strong>eat</strong> rice every morning."</span>
                  <span class="id">Artinya: Saya makan nasi setiap pagi.</span>
                </div>
                <button class="btn-sound-mini" data-speak="I eat rice every morning.">🔊 Dengarkan</button>
              </div>

              <div class="sentence-item">
                <div class="verb-tag v1-tag">Go = Pergi</div>
                <div class="sentence-text">
                  <span class="en">"They <strong>go</strong> to school by bicycle."</span>
                  <span class="id">Artinya: Mereka pergi ke sekolah dengan sepeda.</span>
                </div>
                <button class="btn-sound-mini" data-speak="They go to school by bicycle.">🔊 Dengarkan</button>
              </div>

              <div class="sentence-item">
                <div class="verb-tag v1-tag">Play = Bermain</div>
                <div class="sentence-text">
                  <span class="en">"We <strong>play</strong> football in the afternoon."</span>
                  <span class="id">Artinya: Kami bermain sepak bola pada sore hari.</span>
                </div>
                <button class="btn-sound-mini" data-speak="We play football in the afternoon.">🔊 Dengarkan</button>
              </div>

              <div class="sentence-item">
                <div class="verb-tag v1-tag">Read = Membaca</div>
                <div class="sentence-text">
                  <span class="en">"Students <strong>read</strong> books in the library."</span>
                  <span class="id">Artinya: Siswa membaca buku di perpustakaan. (Pelafalan: /riːd/)</span>
                </div>
                <button class="btn-sound-mini" data-speak="Students read books in the library.">🔊 Dengarkan</button>
              </div>

              <div class="sentence-item">
                <div class="verb-tag v1-tag">Write = Menulis</div>
                <div class="sentence-text">
                  <span class="en">"I <strong>write</strong> notes with my blue pen."</span>
                  <span class="id">Artinya: Saya menulis catatan dengan pena biru saya.</span>
                </div>
                <button class="btn-sound-mini" data-speak="I write notes with my blue pen.">🔊 Dengarkan</button>
              </div>
            </div>
          </div>
        `;

      case 'verb2':
        return `
          <div class="materi-card animate-fade-in">
            <div class="card-hero-banner bg-orange-light">
              <div class="banner-text">
                <h3>Verb 2: Bentuk Lampau (Past Simple)</h3>
                <p><strong>Verb 2</strong> digunakan khusus dalam <strong>Simple Past Tense</strong> untuk menyatakan tindakan, kegiatan, atau peristiwa yang <strong>terjadi dan selesai di masa lampau</strong>.</p>
              </div>
              <div class="banner-emoji">⏳</div>
            </div>

            <div class="time-signals-bar mt-4">
              <span class="signal-title">🗓️ Keterangan Waktu Khas Verb 2:</span>
              <div class="signals-tags">
                <span class="tag">Yesterday (Kemarin)</span>
                <span class="tag">Last night (Tadi malam)</span>
                <span class="tag">Last week (Minggu lalu)</span>
                <span class="tag">Two days ago (2 hari lalu)</span>
                <span class="tag">In 2020 (Pada tahun 2020)</span>
              </div>
            </div>

            <h4 class="sub-heading mt-6">🔄 Perubahan Bentuk: Verb 1 → Verb 2:</h4>
            <div class="transformation-grid">
              <div class="transform-card">
                <span class="from-v1">Eat (V1)</span>
                <span class="arrow">➔</span>
                <span class="to-v2">Ate (V2)</span>
                <button class="btn-sound-micro" data-speak="Ate">🔊</button>
              </div>
              <div class="transform-card">
                <span class="from-v1">Go (V1)</span>
                <span class="arrow">➔</span>
                <span class="to-v2">Went (V2)</span>
                <button class="btn-sound-micro" data-speak="Went">🔊</button>
              </div>
              <div class="transform-card">
                <span class="from-v1">Play (V1)</span>
                <span class="arrow">➔</span>
                <span class="to-v2">Played (V2)</span>
                <button class="btn-sound-micro" data-speak="Played">🔊</button>
              </div>
              <div class="transform-card">
                <span class="from-v1">Read (V1)</span>
                <span class="arrow">➔</span>
                <span class="to-v2">Read (V2 - /red/)</span>
                <button class="btn-sound-micro" data-speak="red">🔊</button>
              </div>
              <div class="transform-card">
                <span class="from-v1">Write (V1)</span>
                <span class="arrow">➔</span>
                <span class="to-v2">Wrote (V2)</span>
                <button class="btn-sound-micro" data-speak="Wrote">🔊</button>
              </div>
            </div>

            <h4 class="sub-heading mt-6">📝 Contoh Kalimat Past Simple:</h4>
            <div class="example-sentences-list">
              <div class="sentence-item">
                <div class="verb-tag v2-tag">Ate</div>
                <div class="sentence-text">
                  <span class="en">"I <strong>ate</strong> delicious fried rice yesterday."</span>
                  <span class="id">Artinya: Saya makan nasi goreng lezat kemarin.</span>
                </div>
                <button class="btn-sound-mini" data-speak="I ate delicious fried rice yesterday.">🔊 Dengarkan</button>
              </div>

              <div class="sentence-item">
                <div class="verb-tag v2-tag">Went</div>
                <div class="sentence-text">
                  <span class="en">"She <strong>went</strong> to school yesterday morning."</span>
                  <span class="id">Artinya: Dia pergi ke sekolah kemarin pagi.</span>
                </div>
                <button class="btn-sound-mini" data-speak="She went to school yesterday morning.">🔊 Dengarkan</button>
              </div>

              <div class="sentence-item">
                <div class="verb-tag v2-tag">Played</div>
                <div class="sentence-text">
                  <span class="en">"They <strong>played</strong> football last Sunday."</span>
                  <span class="id">Artinya: Mereka bermain sepak bola Minggu lalu.</span>
                </div>
                <button class="btn-sound-mini" data-speak="They played football last Sunday.">🔊 Dengarkan</button>
              </div>
            </div>
          </div>
        `;

      case 'verb3':
        return `
          <div class="materi-card animate-fade-in">
            <div class="card-hero-banner bg-purple-light">
              <div class="banner-text">
                <h3>Verb 3: Bentuk Participle (Past Participle)</h3>
                <p><strong>Verb 3</strong> merupakan bentuk ketiga kata kerja. Verb 3 <em>tidak berdiri sendiri</em> melainkan selalu dipasangkan dengan kata kerja bantu (auxiliary verb) seperti <strong>have / has / had</strong> atau kata kerja bantu pasif <strong>(to be)</strong>.</p>
              </div>
              <div class="banner-emoji">🔮</div>
            </div>

            <div class="features-row mt-4">
              <div class="feature-item">
                <span class="feature-icon">✅</span>
                <h5>1. Present Perfect Tense</h5>
                <p>Menyatakan kegiatan yang <strong>sudah selesai</strong> dilakukan (sudah/telah).</p>
                <div class="formula-badge">Subject + have / has + <strong>Verb 3</strong></div>
              </div>
              <div class="feature-item">
                <span class="feature-icon">🛡️</span>
                <h5>2. Passive Voice (Kalimat Pasif)</h5>
                <p>Menyatakan tindakan yang <strong>dikenakan</strong> pada subjek (di- / ter-).</p>
                <div class="formula-badge">Subject + to be + <strong>Verb 3</strong></div>
              </div>
            </div>

            <h4 class="sub-heading mt-6">🔄 Perubahan Lengkap: Verb 1 → Verb 2 → Verb 3:</h4>
            <div class="triplet-table-wrapper">
              <table class="triplet-table">
                <thead>
                  <tr>
                    <th>Verb 1 (Base)</th>
                    <th>Verb 2 (Past Simple)</th>
                    <th>Verb 3 (Past Participle)</th>
                    <th>Arti</th>
                    <th>Audio V3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span class="pill pill-v1">Eat</span></td>
                    <td><span class="pill pill-v2">Ate</span></td>
                    <td><span class="pill pill-v3">Eaten</span></td>
                    <td>Makan</td>
                    <td><button class="btn-sound-micro" data-speak="Eaten">🔊</button></td>
                  </tr>
                  <tr>
                    <td><span class="pill pill-v1">Go</span></td>
                    <td><span class="pill pill-v2">Went</span></td>
                    <td><span class="pill pill-v3">Gone</span></td>
                    <td>Pergi</td>
                    <td><button class="btn-sound-micro" data-speak="Gone">🔊</button></td>
                  </tr>
                  <tr>
                    <td><span class="pill pill-v1">Play</span></td>
                    <td><span class="pill pill-v2">Played</span></td>
                    <td><span class="pill pill-v3">Played</span></td>
                    <td>Bermain</td>
                    <td><button class="btn-sound-micro" data-speak="Played">🔊</button></td>
                  </tr>
                  <tr>
                    <td><span class="pill pill-v1">Read (/riːd/)</span></td>
                    <td><span class="pill pill-v2">Read (/red/)</span></td>
                    <td><span class="pill pill-v3">Read (/red/)</span></td>
                    <td>Membaca</td>
                    <td><button class="btn-sound-micro" data-speak="red">🔊</button></td>
                  </tr>
                  <tr>
                    <td><span class="pill pill-v1">Write</span></td>
                    <td><span class="pill pill-v2">Wrote</span></td>
                    <td><span class="pill pill-v3">Written</span></td>
                    <td>Menulis</td>
                    <td><button class="btn-sound-micro" data-speak="Written">🔊</button></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h4 class="sub-heading mt-6">📝 Contoh Kalimat Penggunaan Verb 3:</h4>
            <div class="example-sentences-list">
              <div class="sentence-item">
                <div class="verb-tag v3-tag">have eaten</div>
                <div class="sentence-text">
                  <span class="en">"I <strong>have eaten</strong> rice this morning."</span>
                  <span class="id">Artinya: Saya sudah makan nasi pagi ini. (Present Perfect)</span>
                </div>
                <button class="btn-sound-mini" data-speak="I have eaten rice this morning.">🔊 Dengarkan</button>
              </div>

              <div class="sentence-item">
                <div class="verb-tag v3-tag">has gone</div>
                <div class="sentence-text">
                  <span class="en">"She <strong>has gone</strong> to school."</span>
                  <span class="id">Artinya: Dia sudah pergi ke sekolah. (Present Perfect)</span>
                </div>
                <button class="btn-sound-mini" data-speak="She has gone to school.">🔊 Dengarkan</button>
              </div>

              <div class="sentence-item">
                <div class="verb-tag v3-tag">was written</div>
                <div class="sentence-text">
                  <span class="en">"The letter <strong>was written</strong> by my mother."</span>
                  <span class="id">Artinya: Surat itu ditulis oleh ibu saya. (Kalimat Pasif)</span>
                </div>
                <button class="btn-sound-mini" data-speak="The letter was written by my mother.">🔊 Dengarkan</button>
              </div>
            </div>
          </div>
        `;

      case 'regular-irregular':
        return `
          <div class="materi-card animate-fade-in">
            <div class="card-hero-banner bg-yellow-light">
              <div class="banner-text">
                <h3>Perbedaan Regular Verb & Irregular Verb</h3>
                <p>Berdasarkan pola perubahannya dari Verb 1 ke Verb 2 dan Verb 3, kata kerja dibagi menjadi dua kelompok besar.</p>
              </div>
              <div class="banner-emoji">⚖️</div>
            </div>

            <div class="comparison-dual-grid mt-4">
              <!-- Regular Verb Card -->
              <div class="comparison-card border-green">
                <div class="comp-header bg-green-solid">
                  <h4>🟢 1. Regular Verb (Beraturan)</h4>
                </div>
                <div class="comp-body">
                  <p>Kata kerja yang perubahannya teratur dengan hanya menambahkan akhiran <strong>-ed</strong> atau <strong>-d</strong> pada Verb 2 dan Verb 3.</p>
                  
                  <ul class="rule-list">
                    <li>Umumnya ditambah <strong>-ed</strong>: Play → Played → Played</li>
                    <li>Jika berakhiran huruf 'e', cukup tambah <strong>-d</strong>: Dance → Danced → Danced</li>
                    <li>Jika berakhiran konsonan + 'y', ganti 'y' menjadi <strong>-ied</strong>: Study → Studied → Studied</li>
                  </ul>

                  <div class="comp-table-mini">
                    <div class="comp-row head">
                      <span>Verb 1</span>
                      <span>Verb 2</span>
                      <span>Verb 3</span>
                      <span>Audio</span>
                    </div>
                    <div class="comp-row">
                      <span>Play</span>
                      <span>Played</span>
                      <span>Played</span>
                      <button class="btn-sound-micro" data-speak="Play. Played. Played.">🔊</button>
                    </div>
                    <div class="comp-row">
                      <span>Work</span>
                      <span>Worked</span>
                      <span>Worked</span>
                      <button class="btn-sound-micro" data-speak="Work. Worked. Worked.">🔊</button>
                    </div>
                    <div class="comp-row">
                      <span>Clean</span>
                      <span>Cleaned</span>
                      <span>Cleaned</span>
                      <button class="btn-sound-micro" data-speak="Clean. Cleaned. Cleaned.">🔊</button>
                    </div>
                    <div class="comp-row">
                      <span>Watch</span>
                      <span>Watched</span>
                      <span>Watched</span>
                      <button class="btn-sound-micro" data-speak="Watch. Watched. Watched.">🔊</button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Irregular Verb Card -->
              <div class="comparison-card border-orange">
                <div class="comp-header bg-orange-solid">
                  <h4>🟠 2. Irregular Verb (Tidak Beraturan)</h4>
                </div>
                <div class="comp-body">
                  <p>Kata kerja yang perubahannya <strong>tidak berpola -ed</strong>. Bentuknya bisa berubah vokal, berubah total, atau bahkan sama persis!</p>
                  
                  <ul class="rule-list">
                    <li>Huruf vokal berubah: Sing → Sang → Sung</li>
                    <li>Bentuk berubah total: Go → Went → Gone</li>
                    <li>Bentuk sama persis: Read → Read → Read, Cut → Cut → Cut</li>
                  </ul>

                  <div class="comp-table-mini">
                    <div class="comp-row head">
                      <span>Verb 1</span>
                      <span>Verb 2</span>
                      <span>Verb 3</span>
                      <span>Audio</span>
                    </div>
                    <div class="comp-row">
                      <span>Eat</span>
                      <span>Ate</span>
                      <span>Eaten</span>
                      <button class="btn-sound-micro" data-speak="Eat. Ate. Eaten.">🔊</button>
                    </div>
                    <div class="comp-row">
                      <span>Go</span>
                      <span>Went</span>
                      <span>Gone</span>
                      <button class="btn-sound-micro" data-speak="Go. Went. Gone.">🔊</button>
                    </div>
                    <div class="comp-row">
                      <span>Write</span>
                      <span>Wrote</span>
                      <span>Written</span>
                      <button class="btn-sound-micro" data-speak="Write. Wrote. Written.">🔊</button>
                    </div>
                    <div class="comp-row">
                      <span>See</span>
                      <span>Saw</span>
                      <span>Seen</span>
                      <button class="btn-sound-micro" data-speak="See. Saw. Seen.">🔊</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Catatan Khusus Read -->
            <div class="special-note-box mt-6">
              <div class="note-icon">📢</div>
              <div class="note-text">
                <h5>Perhatian Khusus Kata "READ":</h5>
                <p>Kata kerja <strong>READ</strong> memiliki ejaan tulisan yang sama persis: <em>Read - Read - Read</em>. Namun, <strong>pelafalannya berbeda</strong>:</p>
                <ul>
                  <li><strong>Verb 1:</strong> Dilafalkan <span class="phonetic">/riːd/</span> (seperti kata 'reed'). <button class="btn-sound-micro" data-speak="read">🔊 Dengar V1</button></li>
                  <li><strong>Verb 2 & 3:</strong> Dilafalkan <span class="phonetic">/red/</span> (seperti kata warna merah 'red'). <button class="btn-sound-micro" data-speak="red">🔊 Dengar V2/V3</button></li>
                </ul>
              </div>
            </div>
          </div>
        `;
    }
  }

  createVerbAudioCard(verb, meaning, exampleSentence, phonetic = null) {
    return `
      <div class="verb-audio-card">
        <div class="card-top">
          <span class="verb-title">${verb}</span>
          <span class="verb-meaning">${meaning}</span>
        </div>
        <p class="verb-sample">"${exampleSentence}"</p>
        <button class="btn-card-audio" data-speak="${phonetic || verb}" data-sentence="${exampleSentence}">
          🔊 Dengarkan
        </button>
      </div>
    `;
  }

  bindEvents() {
    // Navigasi Tab
    const tabButtons = this.container.querySelectorAll('.materi-tab-btn');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        this.activeTab = btn.getAttribute('data-tab');
        this.render();
      });
    });

    // Tombol Audio Speak
    const speakButtons = this.container.querySelectorAll('[data-speak]');
    speakButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        sound.playClick();
        const text = btn.getAttribute('data-speak');
        sound.speak(text);
      });
    });
  }
}
