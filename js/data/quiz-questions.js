// ENGLISH VERB ADVENTURE - BANK SOAL KUIS & TEAM BATTLE
// Bank soal lengkap dan bervariasi (45 soal) dengan kunci jawaban dan penjelasan mendalam

export const QUIZ_QUESTIONS = [
  // --- Kategori 1: Menentukan Bentuk Verb 2 ---
  {
    id: 1,
    type: "multiple_choice",
    category: "v2_form",
    question: "Bentuk Verb 2 (Past Simple) dari kata kerja 'GO' adalah ....",
    options: ["Goes", "Went", "Gone", "Going"],
    correctIndex: 1,
    explanation: "'Go' adalah irregular verb. Bentuk perubahannya: Go (V1) → Went (V2) → Gone (V3)."
  },
  {
    id: 2,
    type: "multiple_choice",
    category: "v2_form",
    question: "Bentuk Verb 2 dari kata kerja 'WRITE' adalah ....",
    options: ["Written", "Writing", "Wrote", "Writes"],
    correctIndex: 2,
    explanation: "'Write' adalah irregular verb. Bentuknya: Write (V1) → Wrote (V2) → Written (V3)."
  },
  {
    id: 3,
    type: "multiple_choice",
    category: "v2_form",
    question: "Bentuk Verb 2 dari kata kerja 'BUY' adalah ....",
    options: ["Bought", "Buyed", "Buying", "Buys"],
    correctIndex: 0,
    explanation: "'Buy' adalah irregular verb. Bentuknya: Buy (V1) → Bought (V2) → Bought (V3)."
  },
  {
    id: 4,
    type: "multiple_choice",
    category: "v2_form",
    question: "Bentuk Verb 2 dari kata kerja 'DRINK' adalah ....",
    options: ["Drunk", "Drank", "Drinking", "Drinks"],
    correctIndex: 1,
    explanation: "'Drink' adalah irregular verb. Bentuknya: Drink (V1) → Drank (V2) → Drunk (V3)."
  },
  {
    id: 5,
    type: "multiple_choice",
    category: "v2_form",
    question: "Bentuk Verb 2 dari kata kerja 'TAKE' adalah ....",
    options: ["Taked", "Took", "Taken", "Taking"],
    correctIndex: 1,
    explanation: "'Take' adalah irregular verb. Bentuknya: Take (V1) → Took (V2) → Taken (V3)."
  },
  {
    id: 6,
    type: "multiple_choice",
    category: "v2_form",
    question: "Bentuk Verb 2 dari kata kerja 'SEE' adalah ....",
    options: ["Seen", "Saw", "Seed", "Seeing"],
    correctIndex: 1,
    explanation: "'See' adalah irregular verb. Bentuknya: See (V1) → Saw (V2) → Seen (V3)."
  },

  // --- Kategori 2: Menentukan Bentuk Verb 3 ---
  {
    id: 7,
    type: "multiple_choice",
    category: "v3_form",
    question: "Bentuk Verb 3 (Past Participle) dari kata kerja 'EAT' adalah ....",
    options: ["Ate", "Eating", "Eaten", "Eats"],
    correctIndex: 2,
    explanation: "'Eat' adalah irregular verb. Bentuknya: Eat (V1) → Ate (V2) → Eaten (V3)."
  },
  {
    id: 8,
    type: "multiple_choice",
    category: "v3_form",
    question: "Bentuk Verb 3 dari kata kerja 'SPEAK' adalah ....",
    options: ["Spoke", "Spoken", "Speaked", "Speaking"],
    correctIndex: 1,
    explanation: "'Speak' adalah irregular verb. Bentuknya: Speak (V1) → Spoke (V2) → Spoken (V3)."
  },
  {
    id: 9,
    type: "multiple_choice",
    category: "v3_form",
    question: "Bentuk Verb 3 dari kata kerja 'GIVE' adalah ....",
    options: ["Gave", "Given", "Gived", "Giving"],
    correctIndex: 1,
    explanation: "'Give' adalah irregular verb. Bentuknya: Give (V1) → Gave (V2) → Given (V3)."
  },
  {
    id: 10,
    type: "multiple_choice",
    category: "v3_form",
    question: "Bentuk Verb 3 dari kata kerja 'DO' adalah ....",
    options: ["Did", "Done", "Doing", "Does"],
    correctIndex: 1,
    explanation: "'Do' adalah irregular verb. Bentuknya: Do (V1) → Did (V2) → Done (V3)."
  },
  {
    id: 11,
    type: "multiple_choice",
    category: "v3_form",
    question: "Bentuk Verb 3 dari kata kerja 'SWIM' adalah ....",
    options: ["Swam", "Swum", "Swimmed", "Swimming"],
    correctIndex: 1,
    explanation: "'Swim' adalah irregular verb. Bentuknya: Swim (V1) → Swam (V2) → Swum (V3)."
  },

  // --- Kategori 3: Regular vs Irregular Verb ---
  {
    id: 12,
    type: "multiple_choice",
    category: "concept",
    question: "Bentuk Verb 2 dan Verb 3 dari kata kerja reguler 'PLAY' adalah ....",
    options: [
      "Played – Played",
      "Play – Playing",
      "Plays – Played",
      "Playing – Plays"
    ],
    correctIndex: 0,
    explanation: "'Play' adalah Regular Verb yang hanya ditambah akhiran '-ed': Play → Played → Played."
  },
  {
    id: 13,
    type: "multiple_choice",
    category: "concept",
    question: "Kata kerja berikut yang termasuk REGULAR VERB (kata kerja beraturan) adalah ....",
    options: ["Eat", "Go", "Clean", "Write"],
    correctIndex: 2,
    explanation: "'Clean' adalah Regular Verb (Clean → Cleaned → Cleaned). Sedangkan Eat, Go, dan Write adalah Irregular Verbs."
  },
  {
    id: 14,
    type: "multiple_choice",
    category: "concept",
    question: "Kata kerja berikut yang termasuk IRREGULAR VERB (tidak beraturan) adalah ....",
    options: ["Cook", "Help", "Dance", "Sing"],
    correctIndex: 3,
    explanation: "'Sing' adalah Irregular Verb (Sing → Sang → Sung). Cook, Help, dan Dance merupakan Regular Verbs."
  },
  {
    id: 15,
    type: "true_false",
    category: "concept",
    question: "Benar atau Salah: Kata kerja 'READ' memiliki tulisan yang sama persis untuk Verb 1, Verb 2, dan Verb 3.",
    options: ["Benar (True)", "Salah (False)"],
    correctIndex: 0,
    explanation: "Benar! 'Read' tulisannya sama untuk V1, V2, V3 (Read - Read - Read), tetapi pelafalan V2 dan V3 diucapkan /red/."
  },
  {
    id: 16,
    type: "true_false",
    category: "concept",
    question: "Benar atau Salah: Semua kata kerja bahasa Inggris berubah menjadi bentuk lampau hanya dengan menambahkan akhiran -ed.",
    options: ["Benar (True)", "Salah (False)"],
    correctIndex: 1,
    explanation: "Salah! Hanya Regular Verbs yang ditambah -ed/-d, sedangkan Irregular Verbs memiliki perubahan bentuk khusus."
  },

  // --- Kategori 4: Pengertian dan Penggunaan Tenses ---
  {
    id: 17,
    type: "multiple_choice",
    category: "grammar",
    question: "Verb 2 (Past Simple) digunakan untuk menyatakan kegiatan yang ....",
    options: [
      "Sedang berlangsung saat ini",
      "Terjadi di masa lampau (sudah lewat)",
      "Akan terjadi di masa depan",
      "Merupakan fakta umum sehari-hari"
    ],
    correctIndex: 1,
    explanation: "Verb 2 digunakan dalam Simple Past Tense untuk menyatakan kegiatan yang telah terjadi di masa lalu."
  },
  {
    id: 18,
    type: "multiple_choice",
    category: "grammar",
    question: "Verb 3 (Past Participle) biasanya digunakan setelah kata bantu (auxiliary verb) ....",
    options: ["Will / Shall", "Have / Has / Had", "Do / Does / Did", "Am / Is / Are (continuous)"],
    correctIndex: 1,
    explanation: "Verb 3 digunakan pada Present/Past Perfect Tense setelah 'have/has/had', serta pada kalimat pasif (to be + V3)."
  },

  // --- Kategori 5: Melengkapi Kalimat Sederhana ---
  {
    id: 19,
    type: "multiple_choice",
    category: "sentence_completion",
    question: "I have _____ breakfast before going to school.",
    options: ["Eat", "Ate", "Eaten", "Eating"],
    correctIndex: 2,
    explanation: "Setelah 'have' (Present Perfect Tense), kita menggunakan Verb 3 yaitu 'eaten'."
  },
  {
    id: 20,
    type: "multiple_choice",
    category: "sentence_completion",
    question: "She _____ to the market yesterday morning.",
    options: ["Go", "Went", "Gone", "Goes"],
    correctIndex: 1,
    explanation: "Keterangan waktu 'yesterday' menunjukkan masa lampau, sehingga menggunakan Verb 2 yaitu 'went'."
  },
  {
    id: 21,
    type: "multiple_choice",
    category: "sentence_completion",
    question: "They _____ football in the school yard last Sunday.",
    options: ["Play", "Played", "Playing", "Plays"],
    correctIndex: 1,
    explanation: "'Last Sunday' adalah penanda waktu lampau (Past Tense), sehingga menggunakan Verb 2 yaitu 'played'."
  },
  {
    id: 22,
    type: "multiple_choice",
    category: "sentence_completion",
    question: "The letter was _____ by my English teacher.",
    options: ["Write", "Wrote", "Written", "Writing"],
    correctIndex: 2,
    explanation: "Ini adalah kalimat pasif (was + Verb 3). Bentuk Verb 3 dari write adalah 'written'."
  },
  {
    id: 23,
    type: "multiple_choice",
    category: "sentence_completion",
    question: "Every day, my brother and I _____ fresh water.",
    options: ["Drink", "Drank", "Drunk", "Drinking"],
    correctIndex: 0,
    explanation: "'Every day' menunjukkan kebiasaan rutin (Simple Present Tense), sehingga menggunakan Verb 1 yaitu 'drink'."
  },
  {
    id: 24,
    type: "multiple_choice",
    category: "sentence_completion",
    question: "We have _____ this educational movie twice.",
    options: ["Watch", "Watched", "Watching", "Watches"],
    correctIndex: 1,
    explanation: "Setelah 'have' menggunakan Verb 3. Karena 'watch' adalah regular verb, bentuk Verb 3-nya adalah 'watched'."
  },
  {
    id: 25,
    type: "multiple_choice",
    category: "sentence_completion",
    question: "Father _____ a new bicycle for my birthday last week.",
    options: ["Buy", "Buyed", "Bought", "Buying"],
    correctIndex: 2,
    explanation: "'Last week' menandakan masa lampau. Bentuk Verb 2 dari buy adalah 'bought'."
  },
  {
    id: 26,
    type: "multiple_choice",
    category: "sentence_completion",
    question: "Has Budi _____ his English homework?",
    options: ["Do", "Did", "Done", "Doing"],
    correctIndex: 2,
    explanation: "Pertanyaan Present Perfect (Has + Subject + Verb 3) membutuhkan Verb 3, yaitu 'done'."
  },

  // --- Kategori 6: Mengidentifikasi Kesalahan & Pasangan ---
  {
    id: 27,
    type: "multiple_choice",
    category: "error_check",
    question: "Manakah kalimat berikut yang tata bahasanya SALAH?",
    options: [
      "I went to Bandung yesterday.",
      "She has drank three glasses of milk.",
      "We played basketball last Friday.",
      "They have eaten lunch together."
    ],
    correctIndex: 1,
    explanation: "Kalimat salah karena setelah 'has' harus Verb 3 ('drunk'), bukan Verb 2 ('drank'). Kalimat benar: 'She has drunk...'."
  },
  {
    id: 28,
    type: "multiple_choice",
    category: "error_check",
    question: "Manakah pasangan V1 - V2 - V3 yang BENAR di bawah ini?",
    options: [
      "Make – Maked – Maked",
      "Run – Ran – Run",
      "Sleep – Sleeped – Sleeped",
      "Swim – Swammed – Swum"
    ],
    correctIndex: 1,
    explanation: "Pasangan yang benar adalah Run → Ran → Run. (Make → Made → Made, Sleep → Slept → Slept, Swim → Swam → Swum)."
  },
  {
    id: 29,
    type: "multiple_choice",
    category: "error_check",
    question: "Manakah pasangan kata kerja reguler dengan perubahan ejaan yang BENAR?",
    options: [
      "Study – Studyed – Studyed",
      "Study – Studied – Studied",
      "Study – Studit – Studit",
      "Study – Stude – Stude"
    ],
    correctIndex: 1,
    explanation: "Kata kerja berakhiran konsonan + 'y' seperti study berubah menjadi '-ied': Study → Studied → Studied."
  },
  {
    id: 30,
    type: "true_false",
    category: "concept",
    question: "Benar atau Salah: Kalimat 'She cooked fried rice two hours ago' menggunakan Verb 2.",
    options: ["Benar (True)", "Salah (False)"],
    correctIndex: 0,
    explanation: "Benar! 'Cooked' di sini adalah Verb 2 yang menyatakan peristiwa dua jam yang lalu (masa lampau)."
  },

  // --- Soal Tambahan untuk Pengayaan (Total 45 Soal) ---
  {
    id: 31,
    type: "multiple_choice",
    category: "v2_form",
    question: "Bentuk Verb 2 dari kata kerja 'SLEEP' adalah ....",
    options: ["Sleeped", "Slept", "Slepted", "Sleeping"],
    correctIndex: 1,
    explanation: "'Sleep' adalah irregular verb: Sleep (V1) → Slept (V2) → Slept (V3)."
  },
  {
    id: 32,
    type: "multiple_choice",
    category: "v3_form",
    question: "Bentuk Verb 3 dari kata kerja 'SING' adalah ....",
    options: ["Sang", "Sung", "Singed", "Song"],
    correctIndex: 1,
    explanation: "Sing adalah irregular verb: Sing (V1) → Sang (V2) → Sung (V3)."
  },
  {
    id: 33,
    type: "multiple_choice",
    category: "v2_form",
    question: "Bentuk Verb 2 dari kata kerja 'MAKE' adalah ....",
    options: ["Maked", "Made", "Makes", "Making"],
    correctIndex: 1,
    explanation: "Make adalah irregular verb: Make (V1) → Made (V2) → Made (V3)."
  },
  {
    id: 34,
    type: "multiple_choice",
    category: "v3_form",
    question: "Bentuk Verb 3 dari kata kerja 'BRING' adalah ....",
    options: ["Brang", "Brung", "Brought", "Bringed"],
    correctIndex: 2,
    explanation: "Bring adalah irregular verb: Bring (V1) → Brought (V2) → Brought (V3)."
  },
  {
    id: 35,
    type: "multiple_choice",
    category: "sentence_completion",
    question: "Dina _____ a beautiful butterfly yesterday in her garden.",
    options: ["Draw", "Drew", "Drawn", "Drawing"],
    correctIndex: 1,
    explanation: "'Yesterday' membutuhkan Verb 2. Bentuk Verb 2 dari 'draw' adalah 'drew'."
  },
  {
    id: 36,
    type: "multiple_choice",
    category: "v2_form",
    question: "Bentuk Verb 2 dari kata kerja 'FIND' adalah ....",
    options: ["Found", "Finded", "Fond", "Finding"],
    correctIndex: 0,
    explanation: "Find adalah irregular verb: Find (V1) → Found (V2) → Found (V3)."
  },
  {
    id: 37,
    type: "multiple_choice",
    category: "v3_form",
    question: "Bentuk Verb 3 dari kata kerja 'CHOOSE' adalah ....",
    options: ["Chose", "Chosen", "Choosed", "Choosing"],
    correctIndex: 1,
    explanation: "Choose adalah irregular verb: Choose (V1) → Chose (V2) → Chosen (V3)."
  },
  {
    id: 38,
    type: "true_false",
    category: "concept",
    question: "Benar atau Salah: Kata kerja 'CUT' memiliki bentuk V1, V2, dan V3 yang semuanya sama: Cut - Cut - Cut.",
    options: ["Benar (True)", "Salah (False)"],
    correctIndex: 0,
    explanation: "Benar! 'Cut' adalah salah satu irregular verb yang bentuk V1, V2, dan V3-nya tidak berubah sama sekali."
  },
  {
    id: 39,
    type: "multiple_choice",
    category: "sentence_completion",
    question: "The teacher has _____ the classroom door.",
    options: ["Open", "Opened", "Opening", "Opens"],
    correctIndex: 1,
    explanation: "Setelah 'has' memerlukan Verb 3. Karena open adalah regular verb, bentuknya adalah 'opened'."
  },
  {
    id: 40,
    type: "multiple_choice",
    category: "v2_form",
    question: "Bentuk Verb 2 dari kata kerja 'TEACH' adalah ....",
    options: ["Teached", "Taught", "Tought", "Teaching"],
    correctIndex: 1,
    explanation: "Teach adalah irregular verb: Teach (V1) → Taught (V2) → Taught (V3)."
  },
  {
    id: 41,
    type: "multiple_choice",
    category: "sentence_completion",
    question: "Last holiday, we _____ our grandparents in Yogyakarta.",
    options: ["Visit", "Visited", "Visiting", "Visits"],
    correctIndex: 1,
    explanation: "'Last holiday' menunjukkan waktu lampau, gunakan Verb 2: 'visited'."
  },
  {
    id: 42,
    type: "multiple_choice",
    category: "v3_form",
    question: "Bentuk Verb 3 dari kata kerja 'FLY' adalah ....",
    options: ["Flew", "Flown", "Flyed", "Flying"],
    correctIndex: 1,
    explanation: "Fly adalah irregular verb: Fly (V1) → Flew (V2) → Flown (V3)."
  },
  {
    id: 43,
    type: "true_false",
    category: "concept",
    question: "Benar atau Salah: Kalimat 'I did my homework last night' menggunakan Verb 2 dari kata 'do'.",
    options: ["Benar (True)", "Salah (False)"],
    correctIndex: 0,
    explanation: "Benar! 'Did' adalah bentuk Verb 2 dari 'do'."
  },
  {
    id: 44,
    type: "multiple_choice",
    category: "error_check",
    question: "Manakah bentuk lampau (V2) yang TIDAK TEPAT di bawah ini?",
    options: [
      "Help → Helped",
      "Cook → Cooked",
      "Eat → Eated",
      "Work → Worked"
    ],
    correctIndex: 2,
    explanation: "Bentuk lampau dari 'Eat' adalah 'Ate' (irregular), bukan 'Eated'."
  },
  {
    id: 45,
    type: "multiple_choice",
    category: "sentence_completion",
    question: "Our football team has _____ three trophies this semester.",
    options: ["Win", "Won", "Winning", "Winned"],
    correctIndex: 1,
    explanation: "Setelah 'has' membutuhkan Verb 3. Bentuk Verb 3 dari 'win' adalah 'won'."
  }
];
