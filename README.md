# ENGLISH VERB ADVENTURE
*Let's Learn and Play with Verbs!*

Aplikasi Web Game Interaktif Pembelajaran Bahasa Inggris (Materi: **Verb 1, Verb 2, dan Verb 3**) yang dirancang khusus untuk siswa **SMP/SMPLB** dan dioptimalkan untuk penggunaan pada **Papan Interaktif Digital (Interactive Flat Panel / IFP)**, Komputer/Laptop, serta Tablet.

---

## 🌟 Fitur-Fitur Utama

### 1. 📘 Ruang Belajar Mandiri (Materi Pembelajaran)
- **Pengertian Verb**: Penjelasan konsep kata kerja dengan contoh visual dan audio.
- **Verb 1 (Base Form)**: Penggunaan pada Simple Present Tense, kalimat perintah, dan modal.
- **Verb 2 (Past Simple)**: Penggunaan peristiwa lampau beserta penanda waktu khas (*yesterday, last night, two days ago*).
- **Verb 3 (Past Participle)**: Penggunaan pada Present Perfect Tense (*have/has + V3*) dan Passive Voice (*to be + V3*).
- **Perbedaan Regular vs Irregular Verb**: Kaidah akhiran *-ed/-d/-ied* vs bentuk khusus tidak beraturan.
- **Catatan Pelafalan Khusus Kata "Read"**: Perbedaan lafal bentuk V1 `/riːd/` dan bentuk V2 & V3 `/red/`.
- Tombol audio pengucapan native speaker pada setiap contoh kata dan kalimat.

### 2. 📖 Kamus Kata Kerja Interaktif (66+ Verbs)
- Menampilkan 66 kata kerja lengkap dengan bentuk V1, V2, V3, arti Bahasa Indonesia, contoh kalimat, dan audio.
- **Pencarian Cepat**: Cari berdasarkan kata bahasa Inggris atau arti bahasa Indonesia.
- **Filter Fleksibel**: Filter Regular Verb, Irregular Verb, atau Semua.
- **Navigasi Alfabet (A-Z)**: Akses cepat kata kerja berdasarkan abjad.
- **Mode Tampilan Ganda**: Tampilan Kartu Bergambar (Flashcard) dan Tampilan Tabel Ringkas.
- **Audio Trio**: Tombol untuk memutar pelafalan V1, V2, dan V3 secara berurutan.

### 3. 🎮 5 Jenis Game Interaktif (Game Challenge)
1. **Pasangkan Kata Kerja (Match the Verbs)**: Memasangkan kartu V1, V2, dan V3 yang cocok dalam 10 ronde dengan dukungan *touch tap-to-select* dan *drag & drop*.
2. **Lengkapi Kata Kerjanya (Complete the Verb)**: Melengkapi bentuk kata kerja yang hilang dengan 4 kartu pilihan berukuran besar dan pembahasan mendalam.
3. **Pemburu Kata Kerja (Verb Hunter)**: Menangkap gelembung target kata kerja yang bergerak sebelum waktu habis dengan poin kombo dan efek letusan.
4. **Susun Kalimat (Sentence Builder)**: Menyusun potongan kata acak menjadi kalimat Bahasa Inggris yang utuh dan mendengarkan kalimat lengkapnya.
5. **Kartu Memori Kata Kerja (Verb Memory Card)**: Membuka kartu tertutup dan mencocokkan pasangan kata kerja dengan 3 tingkat kesulitan (Mudah, Sedang, Sulit).

### 4. 📝 Kuis Interaktif
- 45+ Bank Soal acak dengan 4 pilihan ganda dan soal Benar/Salah.
- Umpan balik langsung disertai penjelasan tata bahasa setiap selesai menjawab.
- Pengatur waktu (Timer) yang fleksibel (dapat diatur atau dinonaktifkan).
- Skor akhir skala 100, persentase keberhasilan, predikat belajar, dan pesan motivasi.
- Fitur *Review Jawaban* untuk evaluasi pembelajaran bersama siswa.

### 5. ⚔️ Mode Kelompok (Team Battle untuk IFP)
- Mendukung 2, 3, atau 4 kelompok dengan nama tim yang dapat disesuaikan.
- **Mode Rebutan Cepat (Quick Buzzer)**: Tombol bel sentuh raksasa di layar papan interaktif untuk menjawab tercepat.
- **Mode Bergantian (Turn-Based)**: Giliran menjawab soal secara berurutan antar kelompok.
- Papan skor langsung (*Live Scoreboard*) dengan animasi penambahan poin.
- Perayaan pemenang lengkap dengan podium juara 1, 2, 3, dan piala emas.

### 6. ⭐ Sistem Level & Penghargaan
- Level 1: *Beginner* (Pemula)
- Level 2: *Verb Explorer* (Penjelajah)
- Level 3: *Verb Master* (Master Verb)
- Level 4: *English Champion* (Juara Bahasa Inggris)
- Bintang & Trofi: *Bronze Star*, *Silver Star*, *Gold Star*, dan *Verb Master Trophy*.
- Akumulasi XP tersimpan otomatis di browser (*LocalStorage*).

### 7. ⚙️ Dashboard Guru & Manajemen Nilai
- Pengaturan jumlah soal kuis (5, 10, 15, 20 soal).
- Pengaturan batas waktu (Tanpa Waktu, 15s, 30s, 45s, 60s).
- Filter tingkat kesulitan materi.
- Tabel riwayat nilai siswa otomatis.
- **Ekspor Nilai ke CSV (Excel)**: Mengunduh rekap nilai siswa dengan satu klik.
- Pengaturan volume SFX, BGM mandiri, dan reset data.

---

## 🚀 Petunjuk Menjalankan Aplikasi

Aplikasi ini dibangun menggunakan arsitektur **Pure Web Standards (HTML5, CSS3, ES6 JavaScript Modules, Web Audio API, Web Speech API)** tanpa memerlukan instalasi Node.js, Python, ataupun database eksternal.

### Cara 1: Membuka Langsung di Peramban (Paling Mudah)
1. Buka folder proyek `englishverbadventure`.
2. Klik ganda (double-click) file **`index.html`** menggunakan **Google Chrome** atau **Microsoft Edge**.
3. Aplikasi akan langsung berjalan secara instan!

### Cara 2: Menjalankan Menggunakan Web Server Lokal (Opsional)
Jika ingin mengaktifkan dukungan *Service Worker* (PWA) secara penuh:
- Menggunakan ekstensi **Live Server** di VS Code / Antigravity.
- Atau jika memiliki Python di komputer: `python -m http.server 8080`, lalu buka `http://localhost:8080`.

### Cara 3: Memasang sebagai Aplikasi PWA di Papan Interaktif (IFP) / Tablet
1. Buka aplikasi di peramban Google Chrome atau Microsoft Edge.
2. Klik ikon **Install Aplikasi (➕)** di ujung kanan address bar peramban, atau pilih menu peramban **"Install English Verb Adventure"**.
3. Aplikasi akan terpasang di desktop / app drawer IFP dan dapat dibuka dalam jendela mandiri tanpa address bar layaknya aplikasi native.

---

## 🖥️ Panduan Penggunaan pada Papan Interaktif Digital (IFP)
1. **Mode Layar Penuh (Fullscreen)**: Klik tombol **⛶ Layar Penuh** di pojok kanan atas untuk memperluas area permainan hingga memenuhi seluruh layar IFP 65" - 86".
2. **Operasi Sentuh (Touchscreen)**: Seluruh tombol dibuat dengan tinggi minimal 56px–72px untuk memudahkan sentuhan jari maupun stylus pen.
3. **Audio Pengucapan**: Pastikan volume speaker papan interaktif aktif agar siswa dapat mendengar pelafalan asli bahasa Inggris.

---

## 📁 Struktur Direktori Proyek

```
englishverbadventure/
├── index.html                     # Halaman utama aplikasi
├── manifest.json                  # Konfigurasi PWA (Web App Manifest)
├── sw.js                          # Service Worker untuk cache offline
├── README.md                      # Dokumentasi dan petunjuk penggunaan
├── css/
│   └── style.css                  # Stylesheet modern, IFP tactile buttons & responsif
└── js/
    ├── app.js                     # Main router, state global & controller aplikasi
    ├── data/
    │   ├── verbs.js               # Database 66 kata kerja (V1, V2, V3, arti, audio, contoh)
    │   ├── quiz-questions.js      # Bank 45 soal kuis & team battle dengan pembahasan
    │   └── sentences.js           # Bank kalimat puzzle untuk Game Sentence Builder
    └── modules/
        ├── audio.js               # Mesin Web Audio API (SFX, BGM prosedural) & Web Speech API
        ├── confetti.js            # Mesin partikel selebrasi Canvas Confetti 60 FPS mandiri
        ├── storage.js             # LocalStorage manager (XP, Level, Riwayat Skor, Pengaturan Guru)
        ├── materi.js              # Modul Ruang Belajar interaktif (5 topik utama)
        ├── dictionary.js          # Modul Kamus Kata Kerja (pencarian, filter alfabet & kategori)
        ├── quiz.js                # Modul Kuis interaktif skala 100 dengan timer & review
        ├── team-battle.js         # Modul Cerdas Cermat IFP (2-4 kelompok & buzzer rebutan)
        ├── dashboard.js           # Modul Pengaturan Guru, rekap nilai & ekspor CSV
        └── games/
            ├── game1-match.js     # Game 1: Pasangkan Kata Kerja (Match the Verbs)
            ├── game2-complete.js  # Game 2: Lengkapi Kata Kerjanya (Complete the Verb)
            ├── game3-hunter.js    # Game 3: Pemburu Kata Kerja (Verb Hunter)
            ├── game4-sentence.js  # Game 4: Susun Kalimat (Sentence Builder)
            └── game5-memory.js    # Game 5: Kartu Memori Kata Kerja (Verb Memory Card)
```

---

## 🎯 Kompatibilitas Sistem
- **Sistem Operasi**: Windows 10/11 (IFP OPS), Android (IFP Native OS), macOS, ChromeOS, iPadOS.
- **Peramban**: Google Chrome 80+, Microsoft Edge 80+, Mozilla Firefox 75+, Safari 14+.
- **Resolusi yang Didukung**: 3840×2160 (4K IFP), 1920×1080 (Full HD), 1366×768 (Laptop), Tablet 10"–12".

---
*Dibuat dengan ❤️ untuk kemajuan pendidikan Bahasa Inggris di Indonesia.*
