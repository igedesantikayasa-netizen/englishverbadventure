// ENGLISH VERB ADVENTURE - AUDIO & SPEECH SYNTHESIS ENGINE
// Menggunakan Web Audio API untuk efek suara prosedural & musik latar mandiri
// Menggunakan Web Speech API untuk pelafalan kata kerja Bahasa Inggris

class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.sfxEnabled = true;
    this.bgmEnabled = false;
    this.sfxVolume = 0.8;
    this.bgmVolume = 0.25;
    this.bgmNode = null;
    this.bgmInterval = null;
    this.speechRate = 0.85; // Sedikit lebih lambat agar jelas untuk siswa SMP
    this.preferredVoice = null;
    this.voicesLoaded = false;

    this.initSpeech();
  }

  // Inisialisasi AudioContext saat ada interaksi pengguna
  ensureAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Setup Web Speech API
  initSpeech() {
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        // Cari suara Bahasa Inggris (en-US atau en-GB) yang alami
        this.preferredVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha'))) ||
                              voices.find(v => v.lang.startsWith('en')) || null;
        this.voicesLoaded = true;
      };

      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  // Ucapkan teks Bahasa Inggris
  speak(text, phoneticOverride = null) {
    if (!('speechSynthesis' in window)) {
      console.warn('SpeechSynthesis tidak didukung browser ini.');
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Batalkan antrean suara sebelumnya
      const textToSpeak = phoneticOverride || text;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'en-US';
      utterance.rate = this.speechRate;
      utterance.pitch = 1.0;

      if (this.preferredVoice) {
        utterance.voice = this.preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Error saat melafalkan kata:', e);
    }
  }

  // --- EFEK SUARA PROSEDURAL (Web Audio API) ---

  playTone(freq, duration, type = 'sine', gainVal = 0.3, rampDown = true) {
    if (!this.sfxEnabled) return;
    try {
      this.ensureAudioContext();
      if (!this.audioCtx) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(gainVal * this.sfxVolume, this.audioCtx.currentTime);
      if (rampDown) {
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
      }

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  // Suara Sentuh / Tombol
  playClick() {
    this.playTone(600, 0.08, 'triangle', 0.2);
  }

  // Suara Benar (Melodi C Mayor ceria: C5 - E5 - G5 - C6)
  playCorrect() {
    if (!this.sfxEnabled) return;
    this.ensureAudioContext();
    if (!this.audioCtx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.18, 'triangle', 0.35);
      }, i * 90);
    });
  }

  // Suara Salah (Nada lembut ramah anak)
  playWrong() {
    if (!this.sfxEnabled) return;
    this.ensureAudioContext();
    if (!this.audioCtx) return;

    const notes = [311.13, 261.63];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.25, 'sawtooth', 0.2);
      }, i * 150);
    });
  }

  // Suara Pop (Untuk Game Verb Hunter & Bubble)
  playPop() {
    if (!this.sfxEnabled) return;
    this.ensureAudioContext();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.1);

    gain.gain.setValueAtTime(0.3 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  // Suara Buzzer Team Battle
  playBuzzer() {
    if (!this.sfxEnabled) return;
    this.playTone(440, 0.35, 'square', 0.25);
  }

  // Suara Naik Level & Pencapaian
  playLevelUp() {
    if (!this.sfxEnabled) return;
    this.ensureAudioContext();
    if (!this.audioCtx) return;

    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.3, 'sine', 0.4);
      }, i * 110);
    });
  }

  // Suara Kemenangan / Pemenang Kuis / Battle
  playWin() {
    if (!this.sfxEnabled) return;
    this.ensureAudioContext();
    if (!this.audioCtx) return;

    const chords = [
      { f: [523.25, 659.25, 783.99], t: 0 },
      { f: [587.33, 739.99, 880], t: 200 },
      { f: [659.25, 830.61, 987.77], t: 400 },
      { f: [783.99, 987.77, 1174.66, 1567.98], t: 650 }
    ];

    chords.forEach(c => {
      setTimeout(() => {
        c.f.forEach(freq => this.playTone(freq, 0.45, 'triangle', 0.2));
      }, c.t);
    });
  }

  // --- MUSIK LATAR PROSEDURAL CERIA (BGM) ---
  startBGM() {
    this.ensureAudioContext();
    if (!this.audioCtx || this.bgmInterval) return;

    this.bgmEnabled = true;

    // Melodi ceria berulang (Pentatonic C Mayor riang)
    const melody = [
      523.25, 659.25, 783.99, 659.25, 880.00, 783.99, 659.25, 523.25,
      587.33, 659.25, 587.33, 523.25, 659.25, 783.99, 1046.50, 783.99
    ];
    let noteIndex = 0;

    const tick = () => {
      if (!this.bgmEnabled || !this.audioCtx) return;
      const freq = melody[noteIndex % melody.length];
      noteIndex++;

      try {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, this.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.06 * this.bgmVolume, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.38);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.4);
      } catch (err) {
        // silent catch
      }
    };

    tick();
    this.bgmInterval = setInterval(tick, 420);
  }

  stopBGM() {
    this.bgmEnabled = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleBGM() {
    if (this.bgmEnabled) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return this.bgmEnabled;
  }

  toggleSFX() {
    this.sfxEnabled = !this.sfxEnabled;
    return this.sfxEnabled;
  }
}

export const sound = new AudioEngine();
