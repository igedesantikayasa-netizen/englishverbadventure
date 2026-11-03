// ENGLISH VERB ADVENTURE - STORAGE & LEVEL / REWARD MANAGER
// Menyimpan progress siswa, XP, level, penghargaan, riwayat kuis, dan pengaturan guru

const STORAGE_KEYS = {
  USER_DATA: 'eva_user_data_v1',
  TEACHER_SETTINGS: 'eva_teacher_settings_v1',
  QUIZ_HISTORY: 'eva_quiz_history_v1',
  TEAM_BATTLE_LOGS: 'eva_team_battle_v1'
};

const DEFAULT_USER_DATA = {
  name: 'Petualang Verb',
  xp: 0,
  level: 1, // 1: Beginner, 2: Verb Explorer, 3: Verb Master, 4: English Champion
  rewards: {
    bronzeStar: false,
    silverStar: false,
    goldStar: false,
    verbMasterTrophy: false
  },
  gamesPlayed: 0,
  quizzesCompleted: 0,
  highScores: {
    match: 0,
    complete: 0,
    hunter: 0,
    sentence: 0,
    memory: 0
  }
};

const DEFAULT_TEACHER_SETTINGS = {
  quizQuestionCount: 15, // 5, 10, 15, 20
  quizTimerSeconds: 30, // 0 (off), 15, 30, 45, 60
  gameDifficulty: 'all', // 'all', 'regular', 'irregular'
  soundEnabled: true,
  bgmEnabled: false,
  teamCount: 2,
  teamNames: ['Tim Rajawali 🦅', 'Tim Harimau 🐯', 'Tim Garuda 🌟', 'Tim Singa 🦁']
};

export const LEVEL_CONFIG = [
  { level: 1, name: 'Beginner', minXp: 0, icon: '🌱', badge: 'Pemula Kata Kerja' },
  { level: 2, name: 'Verb Explorer', minXp: 300, icon: '🧭', badge: 'Penjelajah Verb' },
  { level: 3, name: 'Verb Master', minXp: 800, icon: '⭐', badge: 'Master Verb' },
  { level: 4, name: 'English Champion', minXp: 1500, icon: '🏆', badge: 'Juara Bahasa Inggris' }
];

class StorageManager {
  constructor() {
    this.userData = this.load(STORAGE_KEYS.USER_DATA, DEFAULT_USER_DATA);
    this.teacherSettings = this.load(STORAGE_KEYS.TEACHER_SETTINGS, DEFAULT_TEACHER_SETTINGS);
    this.quizHistory = this.load(STORAGE_KEYS.QUIZ_HISTORY, []);
    this.teamHistory = this.load(STORAGE_KEYS.TEAM_BATTLE_LOGS, []);
  }

  load(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? { ...fallback, ...JSON.parse(data) } : JSON.parse(JSON.stringify(fallback));
    } catch (e) {
      console.warn('Gagal memuat dari LocalStorage:', e);
      return JSON.parse(JSON.stringify(fallback));
    }
  }

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Gagal menyimpan ke LocalStorage:', e);
    }
  }

  // --- XP & SISTEM LEVEL ---
  addXP(amount, onLevelUp = null, onRewardUnlock = null) {
    const oldLevel = this.getCurrentLevel().level;
    this.userData.xp += amount;

    // Cek Level baru
    const newLevelObj = this.calculateLevel(this.userData.xp);
    this.userData.level = newLevelObj.level;

    // Cek Rewards
    const unlockedRewards = [];
    if (this.userData.xp >= 300 && !this.userData.rewards.bronzeStar) {
      this.userData.rewards.bronzeStar = true;
      unlockedRewards.push({ name: 'Bronze Star', icon: '🥉' });
    }
    if (this.userData.xp >= 800 && !this.userData.rewards.silverStar) {
      this.userData.rewards.silverStar = true;
      unlockedRewards.push({ name: 'Silver Star', icon: '🥈' });
    }
    if (this.userData.xp >= 1500 && !this.userData.rewards.goldStar) {
      this.userData.rewards.goldStar = true;
      unlockedRewards.push({ name: 'Gold Star', icon: '🥇' });
    }
    if (this.userData.quizzesCompleted >= 3 && this.userData.xp >= 2000 && !this.userData.rewards.verbMasterTrophy) {
      this.userData.rewards.verbMasterTrophy = true;
      unlockedRewards.push({ name: 'Verb Master Trophy', icon: '🏆' });
    }

    this.save(STORAGE_KEYS.USER_DATA, this.userData);

    if (newLevelObj.level > oldLevel && onLevelUp) {
      onLevelUp(newLevelObj);
    }

    if (unlockedRewards.length > 0 && onRewardUnlock) {
      unlockedRewards.forEach(r => onRewardUnlock(r));
    }

    return {
      xp: this.userData.xp,
      level: newLevelObj,
      unlockedRewards
    };
  }

  calculateLevel(xp) {
    for (let i = LEVEL_CONFIG.length - 1; i >= 0; i--) {
      if (xp >= LEVEL_CONFIG[i].minXp) {
        return LEVEL_CONFIG[i];
      }
    }
    return LEVEL_CONFIG[0];
  }

  getCurrentLevel() {
    return this.calculateLevel(this.userData.xp);
  }

  getNextLevelInfo() {
    const current = this.getCurrentLevel();
    const next = LEVEL_CONFIG.find(l => l.level === current.level + 1);
    if (!next) {
      return { isMax: true, progress: 100, remainingXp: 0 };
    }
    const xpInLevel = this.userData.xp - current.minXp;
    const levelRange = next.minXp - current.minXp;
    const progress = Math.min(100, Math.round((xpInLevel / levelRange) * 100));
    return {
      isMax: false,
      progress,
      remainingXp: next.minXp - this.userData.xp,
      nextLevelName: next.name
    };
  }

  // --- RIWAYAT KUIS ---
  saveQuizResult(result) {
    // result: { studentName, score, correctCount, wrongCount, totalQuestions, percentage, predicate, date }
    this.quizHistory.unshift({
      ...result,
      id: Date.now(),
      date: new Date().toLocaleString('id-ID')
    });

    if (this.quizHistory.length > 50) {
      this.quizHistory.pop();
    }

    this.userData.quizzesCompleted += 1;
    this.save(STORAGE_KEYS.QUIZ_HISTORY, this.quizHistory);
    this.save(STORAGE_KEYS.USER_DATA, this.userData);
  }

  // --- RIWAYAT TEAM BATTLE ---
  saveTeamBattleResult(teams, winner) {
    this.teamHistory.unshift({
      id: Date.now(),
      date: new Date().toLocaleString('id-ID'),
      winner,
      teams: teams.map(t => ({ name: t.name, score: t.score }))
    });

    if (this.teamHistory.length > 30) {
      this.teamHistory.pop();
    }
    this.save(STORAGE_KEYS.TEAM_BATTLE_LOGS, this.teamHistory);
  }

  // --- PENGATURAN GURU ---
  updateTeacherSettings(newSettings) {
    this.teacherSettings = { ...this.teacherSettings, ...newSettings };
    this.save(STORAGE_KEYS.TEACHER_SETTINGS, this.teacherSettings);
  }

  // Reset semua data
  resetAllData() {
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.QUIZ_HISTORY);
    localStorage.removeItem(STORAGE_KEYS.TEAM_BATTLE_LOGS);
    this.userData = JSON.parse(JSON.stringify(DEFAULT_USER_DATA));
    this.quizHistory = [];
    this.teamHistory = [];
  }

  // Ekspor hasil kuis ke CSV
  exportQuizToCSV() {
    if (this.quizHistory.length === 0) return null;

    const headers = ['No', 'Tanggal', 'Nama Siswa', 'Skor', 'Benar', 'Salah', 'Total Soal', 'Persentase', 'Predikat'];
    const rows = this.quizHistory.map((item, idx) => [
      idx + 1,
      `"${item.date}"`,
      `"${item.studentName || 'Anonim'}"`,
      item.score,
      item.correctCount,
      item.wrongCount,
      item.totalQuestions,
      `"${item.percentage}%"`,
      `"${item.predicate}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    return csvContent;
  }
}

export const storage = new StorageManager();
