// ENGLISH VERB ADVENTURE - UNIFIED PRODUCTION BUNDLE
// Memastikan aplikasi dapat dibuka langsung dengan Double-Click (file://) di semua browser (Chrome, Edge)
// tanpa kendala CORS policy ES6 module pada Interactive Flat Panel (IFP) sekolah.

(function() {
  'use strict';

  // ==========================================
  // 1. DATA KATA KERJA (66 KATA KERJA LENGKAP)
  // ==========================================
  const VERBS_DATA = [
    { id: 1, v1: "Eat", v2: "Ate", v3: "Eaten", meaning: "Makan", type: "irregular", exampleV1: "I eat rice every day.", exampleV2: "I ate rice yesterday.", exampleV3: "I have eaten breakfast." },
    { id: 2, v1: "Drink", v2: "Drank", v3: "Drunk", meaning: "Minum", type: "irregular", exampleV1: "They drink fresh milk.", exampleV2: "He drank water an hour ago.", exampleV3: "She has drunk two cups of tea." },
    { id: 3, v1: "Go", v2: "Went", v3: "Gone", meaning: "Pergi", type: "irregular", exampleV1: "We go to school together.", exampleV2: "She went to school yesterday.", exampleV3: "They have gone to the library." },
    { id: 4, v1: "Come", v2: "Came", v3: "Come", meaning: "Datang", type: "irregular", exampleV1: "You come early today.", exampleV2: "He came to my house last night.", exampleV3: "The teacher has come." },
    { id: 5, v1: "See", v2: "Saw", v3: "Seen", meaning: "Melihat", type: "irregular", exampleV1: "I see a blue bird on the tree.", exampleV2: "We saw a rainbow yesterday.", exampleV3: "Have you seen my pencil?" },
    { id: 6, v1: "Write", v2: "Wrote", v3: "Written", meaning: "Menulis", type: "irregular", exampleV1: "Students write in their notebooks.", exampleV2: "She wrote a letter yesterday.", exampleV3: "The letter was written by Sarah." },
    { id: 7, v1: "Read", v2: "Read", v3: "Read", meaning: "Membaca", type: "irregular", pronunciationNote: "V1 diucapkan /riːd/, V2 & V3 diucapkan /red/ (seperti warna merah).", phoneticV1: "read", phoneticV2: "red", phoneticV3: "red", exampleV1: "I read an English story book.", exampleV2: "He read the announcement yesterday.", exampleV3: "We have read that chapter." },
    { id: 8, v1: "Speak", v2: "Spoke", v3: "Spoken", meaning: "Berbicara", type: "irregular", exampleV1: "They speak English fluently.", exampleV2: "The teacher spoke to us yesterday.", exampleV3: "English is spoken all over the world." },
    { id: 9, v1: "Take", v2: "Took", v3: "Taken", meaning: "Mengambil", type: "irregular", exampleV1: "Please take your book.", exampleV2: "He took an apple from the table.", exampleV3: "Someone has taken my ruler." },
    { id: 10, v1: "Give", v2: "Gave", v3: "Given", meaning: "Memberi", type: "irregular", exampleV1: "I give food to the cat.", exampleV2: "Mother gave me pocket money.", exampleV3: "He was given a gold medal." },
    { id: 11, v1: "Buy", v2: "Bought", v3: "Bought", meaning: "Membeli", type: "irregular", exampleV1: "We buy snacks at the canteen.", exampleV2: "Father bought a new bicycle.", exampleV3: "I have bought new shoes." },
    { id: 12, v1: "Bring", v2: "Brought", v3: "Brought", meaning: "Membawa", type: "irregular", exampleV1: "Always bring your umbrella.", exampleV2: "Budi brought his guitar yesterday.", exampleV3: "She has brought lunch for us." },
    { id: 13, v1: "Make", v2: "Made", v3: "Made", meaning: "Membuat", type: "irregular", exampleV1: "They make paper airplanes.", exampleV2: "She made a delicious cake.", exampleV3: "This car was made in Japan." },
    { id: 14, v1: "Do", v2: "Did", v3: "Done", meaning: "Melakukan", type: "irregular", exampleV1: "I do my homework diligently.", exampleV2: "We did the science experiment.", exampleV3: "Have you done your homework?" },
    { id: 15, v1: "Have", v2: "Had", v3: "Had", meaning: "Memiliki", type: "irregular", exampleV1: "I have two cute kittens.", exampleV2: "They had a great vacation.", exampleV3: "We have had this car for five years." },
    { id: 16, v1: "Get", v2: "Got", v3: "Got", meaning: "Mendapatkan", type: "irregular", exampleV1: "Students get high scores.", exampleV2: "He got a special gift yesterday.", exampleV3: "She has got the highest score." },
    { id: 17, v1: "Sleep", v2: "Slept", v3: "Slept", meaning: "Tidur", type: "irregular", exampleV1: "Babies sleep twelve hours a day.", exampleV2: "I slept early last night.", exampleV3: "The baby has slept soundly." },
    { id: 18, v1: "Run", v2: "Ran", v3: "Run", meaning: "Berlari", type: "irregular", exampleV1: "Athletes run very fast.", exampleV2: "He ran around the field yesterday.", exampleV3: "They have run five kilometers." },
    { id: 19, v1: "Swim", v2: "Swam", v3: "Swum", meaning: "Berenang", type: "irregular", exampleV1: "Fishes swim in the pond.", exampleV2: "We swam in the pool last weekend.", exampleV3: "He has swum across the river." },
    { id: 20, v1: "Sing", v2: "Sang", v3: "Sung", meaning: "Bernyanyi", type: "irregular", exampleV1: "They sing the national anthem.", exampleV2: "Nina sang beautifully on stage.", exampleV3: "The song has been sung by many artists." },
    { id: 21, v1: "Dance", v2: "Danced", v3: "Danced", meaning: "Menari", type: "regular", exampleV1: "Traditional dancers dance gracefully.", exampleV2: "They danced at the cultural festival.", exampleV3: "She has danced since kindergarten." },
    { id: 22, v1: "Play", v2: "Played", v3: "Played", meaning: "Bermain", type: "regular", exampleV1: "Children play in the park.", exampleV2: "They played football last Sunday.", exampleV3: "We have played this game before." },
    { id: 23, v1: "Work", v2: "Worked", v3: "Worked", meaning: "Bekerja", type: "regular", exampleV1: "Engineers work hard on the bridge.", exampleV2: "Father worked overtime last night.", exampleV3: "She has worked here for ten years." },
    { id: 24, v1: "Study", v2: "Studied", v3: "Studied", meaning: "Belajar", type: "regular", pronunciationNote: "Huruf 'y' berubah menjadi 'ied'.", exampleV1: "We study English every Tuesday.", exampleV2: "He studied for the exam last night.", exampleV3: "They have studied grammar carefully." },
    { id: 25, v1: "Watch", v2: "Watched", v3: "Watched", meaning: "Menonton", type: "regular", exampleV1: "I watch educational videos.", exampleV2: "We watched a movie last Saturday.", exampleV3: "Have you watched that animation?" },
    { id: 26, v1: "Clean", v2: "Cleaned", v3: "Cleaned", meaning: "Membersihkan", type: "regular", exampleV1: "Students clean the classroom.", exampleV2: "Rian cleaned his bedroom this morning.", exampleV3: "The blackboard has been cleaned." },
    { id: 27, v1: "Open", v2: "Opened", v3: "Opened", meaning: "Membuka", type: "regular", exampleV1: "Open your English dictionary.", exampleV2: "The teacher opened the door.", exampleV3: "The shop has been opened since 8 AM." },
    { id: 28, v1: "Close", v2: "Closed", v3: "Closed", meaning: "Menutup", type: "regular", exampleV1: "Please close the window.", exampleV2: "He closed the book after reading.", exampleV3: "The gate has been closed." },
    { id: 29, v1: "Help", v2: "Helped", v3: "Helped", meaning: "Membantu", type: "regular", exampleV1: "Always help your friends.", exampleV2: "Siti helped her mother cook.", exampleV3: "They have helped many people." },
    { id: 30, v1: "Cook", v2: "Cooked", v3: "Cooked", meaning: "Memasak", type: "regular", exampleV1: "Mother cooks delicious soup.", exampleV2: "She cooked fried rice for breakfast.", exampleV3: "The meal has been cooked." },
    { id: 31, v1: "Teach", v2: "Taught", v3: "Taught", meaning: "Mengajar", type: "irregular", exampleV1: "Mr. Ahmad teaches English.", exampleV2: "She taught us mathematics last year.", exampleV3: "He has taught at this school for a decade." },
    { id: 32, v1: "Learn", v2: "Learned", v3: "Learned", meaning: "Mempelajari", type: "regular", exampleV1: "We learn new vocabulary every day.", exampleV2: "They learned to play guitar last summer.", exampleV3: "I have learned all the irregular verbs." },
    { id: 33, v1: "Think", v2: "Thought", v3: "Thought", meaning: "Berpikir / Mengira", type: "irregular", exampleV1: "I think English is very fun.", exampleV2: "He thought about the quiz question.", exampleV3: "We have thought of a great solution." },
    { id: 34, v1: "Know", v2: "Knew", v3: "Known", meaning: "Tahu / Mengenal", type: "irregular", exampleV1: "Do you know the answer?", exampleV2: "I knew the secret yesterday.", exampleV3: "She is known as a smart student." },
    { id: 35, v1: "Fly", v2: "Flew", v3: "Flown", meaning: "Terbang", type: "irregular", exampleV1: "Eagles fly high in the sky.", exampleV2: "The plane flew above the clouds.", exampleV3: "The kite has flown very high." },
    { id: 36, v1: "Drive", v2: "Drove", v3: "Driven", meaning: "Mengemudi", type: "irregular", exampleV1: "They drive carefully on the road.", exampleV2: "Uncle drove his car to Bandung.", exampleV3: "He has driven for five hours." },
    { id: 37, v1: "Ride", v2: "Rode", v3: "Ridden", meaning: "Mengendarai", type: "irregular", exampleV1: "Students ride bicycles to school.", exampleV2: "Deni rode his horse last holiday.", exampleV3: "She has ridden a roller coaster." },
    { id: 38, v1: "Walk", v2: "Walked", v3: "Walked", meaning: "Berjalan", type: "regular", exampleV1: "I walk to the park every morning.", exampleV2: "They walked together to the stadium.", exampleV3: "We have walked for two miles." },
    { id: 39, v1: "Talk", v2: "Talked", v3: "Talked", meaning: "Berbicara / Mengobrol", type: "regular", exampleV1: "Don't talk during the exam.", exampleV2: "They talked about their favorite games.", exampleV3: "I have talked to the principal." },
    { id: 40, v1: "Listen", v2: "Listened", v3: "Listened", meaning: "Mendengarkan", type: "regular", exampleV1: "Listen to the teacher's instructions.", exampleV2: "We listened to the radio yesterday.", exampleV3: "She has listened to the whole album." },
    { id: 41, v1: "Hear", v2: "Heard", v3: "Heard", meaning: "Mendengar", type: "irregular", exampleV1: "Can you hear the bell ringing?", exampleV2: "I heard a strange sound last night.", exampleV3: "Have you heard the good news?" },
    { id: 42, v1: "Ask", v2: "Asked", v3: "Asked", meaning: "Bertanya / Meminta", type: "regular", exampleV1: "Feel free to ask a question.", exampleV2: "The student asked about the homework.", exampleV3: "I have asked for permission." },
    { id: 43, v1: "Answer", v2: "Answered", v3: "Answered", meaning: "Menjawab", type: "regular", exampleV1: "Please answer all questions.", exampleV2: "She answered correctly on the quiz.", exampleV3: "All emails have been answered." },
    { id: 44, v1: "Find", v2: "Found", v3: "Found", meaning: "Menemukan", type: "irregular", exampleV1: "Can you find the hidden verb?", exampleV2: "Ali found a wallet on the street.", exampleV3: "The lost keys have been found." },
    { id: 45, v1: "Lose", v2: "Lost", v3: "Lost", meaning: "Kehilangan / Kalah", type: "irregular", exampleV1: "Never lose hope in studying.", exampleV2: "He lost his eraser in class.", exampleV3: "The team has lost only one match." },
    { id: 46, v1: "Win", v2: "Won", v3: "Won", meaning: "Menang", type: "irregular", pronunciationNote: "'Won' diucapkan /wʌn/ sama seperti angka satu 'one'.", exampleV1: "We hope to win the competition.", exampleV2: "Our school won the championship.", exampleV3: "They have won three gold medals." },
    { id: 47, v1: "Stand", v2: "Stood", v3: "Stood", meaning: "Berdiri", type: "irregular", exampleV1: "Stand up when greeting the teacher.", exampleV2: "He stood in line for twenty minutes.", exampleV3: "The statue has stood for centuries." },
    { id: 48, v1: "Sit", v2: "Sat", v3: "Sat", meaning: "Duduk", type: "irregular", exampleV1: "Please sit down on your chair.", exampleV2: "We sat under a shady tree.", exampleV3: "They have sat there since noon." },
    { id: 49, v1: "Tell", v2: "Told", v3: "Told", meaning: "Menceritakan / Memberitahu", type: "irregular", exampleV1: "Tell me an interesting story.", exampleV2: "Grandmother told us a folk tale.", exampleV3: "I have told him the truth." },
    { id: 50, v1: "Send", v2: "Sent", v3: "Sent", meaning: "Mengirim", type: "irregular", exampleV1: "I send greeting cards on holidays.", exampleV2: "Mother sent a package yesterday.", exampleV3: "The message has been sent." },
    { id: 51, v1: "Build", v2: "Built", v3: "Built", meaning: "Membangun", type: "irregular", exampleV1: "Beavers build dams across rivers.", exampleV2: "They built a new library last year.", exampleV3: "The bridge was built in 1995." },
    { id: 52, v1: "Break", v2: "Broke", v3: "Broken", meaning: "Mematahkan / Merusak", type: "irregular", exampleV1: "Don't break the rules.", exampleV2: "He broke his glasses accidentally.", exampleV3: "The glass window is broken." },
    { id: 53, v1: "Choose", v2: "Chose", v3: "Chosen", meaning: "Memilih", type: "irregular", exampleV1: "Choose the correct answer.", exampleV2: "She chose the blue dress.", exampleV3: "He was chosen as the class leader." },
    { id: 54, v1: "Draw", v2: "Drew", v3: "Drawn", meaning: "Menggambar", type: "irregular", exampleV1: "Artists draw realistic portraits.", exampleV2: "Dina drew a beautiful mountain.", exampleV3: "The poster was drawn by students." },
    { id: 55, v1: "Forget", v2: "Forgot", v3: "Forgotten", meaning: "Lupa", type: "irregular", exampleV1: "Don't forget to bring your pencil.", exampleV2: "I forgot my password yesterday.", exampleV3: "He has forgotten where he put his bag." },
    { id: 56, v1: "Grow", v2: "Grew", v3: "Grown", meaning: "Tumbuh / Menanam", type: "irregular", exampleV1: "Plants grow fast in the sunlight.", exampleV2: "The sunflower grew ten inches.", exampleV3: "The puppy has grown very big." },
    { id: 57, v1: "Keep", v2: "Kept", v3: "Kept", meaning: "Menjaga / Menyimpan", type: "irregular", exampleV1: "Keep your classroom clean.", exampleV2: "She kept all her drawings safely.", exampleV3: "The secret has been kept." },
    { id: 58, v1: "Leave", v2: "Left", v3: "Left", meaning: "Meninggalkan / Berangkat", type: "irregular", exampleV1: "Trains leave on schedule.", exampleV2: "We left the station at seven.", exampleV3: "He has left for Jakarta." },
    { id: 59, v1: "Meet", v2: "Met", v3: "Met", meaning: "Bertemu", type: "irregular", exampleV1: "I meet my friends after school.", exampleV2: "We met our teacher at the mall.", exampleV3: "Have you met our new classmate?" },
    { id: 60, v1: "Pay", v2: "Paid", v3: "Paid", meaning: "Membayar", type: "irregular", exampleV1: "We pay for our books at the cashier.", exampleV2: "Father paid the electric bill.", exampleV3: "The tuition has been paid." },
    { id: 61, v1: "Call", v2: "Called", v3: "Called", meaning: "Memanggil / Menelepon", type: "regular", exampleV1: "Call me when you arrive.", exampleV2: "Teacher called my name in class.", exampleV3: "He was called to the teacher's room." },
    { id: 62, v1: "Wash", v2: "Washed", v3: "Washed", meaning: "Mencuci", type: "regular", exampleV1: "Wash your hands with soap.", exampleV2: "Mother washed the dishes.", exampleV3: "The motorcycle has been washed." },
    { id: 63, v1: "Start", v2: "Started", v3: "Started", meaning: "Memulai", type: "regular", exampleV1: "The lesson starts at seven sharp.", exampleV2: "The football match started late.", exampleV3: "The competition has just started." },
    { id: 64, v1: "Finish", v2: "Finished", v3: "Finished", meaning: "Menyelesaikan", type: "regular", exampleV1: "Finish your breakfast now.", exampleV2: "We finished the project yesterday.", exampleV3: "She has finished reading the novel." },
    { id: 65, v1: "Jump", v2: "Jumped", v3: "Jumped", meaning: "Melompat", type: "regular", exampleV1: "Frogs jump in the garden.", exampleV2: "He jumped over the fence.", exampleV3: "The cat has jumped onto the table." },
    { id: 66, v1: "Visit", v2: "Visited", v3: "Visited", meaning: "Mengunjungi", type: "regular", exampleV1: "We visit our grandparents every holiday.", exampleV2: "Students visited the science museum.", exampleV3: "I have visited Bali three times." }
  ];

  // ==========================================
  // 2. DATA SOAL KUIS & TEAM BATTLE (45 SOAL)
  // ==========================================
  const QUIZ_QUESTIONS = [
    { id: 1, type: "multiple_choice", category: "v2_form", question: "Bentuk Verb 2 (Past Simple) dari kata kerja 'GO' adalah ....", options: ["Goes", "Went", "Gone", "Going"], correctIndex: 1, explanation: "'Go' adalah irregular verb: Go (V1) → Went (V2) → Gone (V3)." },
    { id: 2, type: "multiple_choice", category: "v2_form", question: "Bentuk Verb 2 dari kata kerja 'WRITE' adalah ....", options: ["Written", "Writing", "Wrote", "Writes"], correctIndex: 2, explanation: "'Write' adalah irregular verb: Write (V1) → Wrote (V2) → Written (V3)." },
    { id: 3, type: "multiple_choice", category: "v2_form", question: "Bentuk Verb 2 dari kata kerja 'BUY' adalah ....", options: ["Bought", "Buyed", "Buying", "Buys"], correctIndex: 0, explanation: "'Buy' adalah irregular verb: Buy (V1) → Bought (V2) → Bought (V3)." },
    { id: 4, type: "multiple_choice", category: "v2_form", question: "Bentuk Verb 2 dari kata kerja 'DRINK' adalah ....", options: ["Drunk", "Drank", "Drinking", "Drinks"], correctIndex: 1, explanation: "'Drink' adalah irregular verb: Drink (V1) → Drank (V2) → Drunk (V3)." },
    { id: 5, type: "multiple_choice", category: "v2_form", question: "Bentuk Verb 2 dari kata kerja 'TAKE' adalah ....", options: ["Taked", "Took", "Taken", "Taking"], correctIndex: 1, explanation: "'Take' adalah irregular verb: Take (V1) → Took (V2) → Taken (V3)." },
    { id: 6, type: "multiple_choice", category: "v2_form", question: "Bentuk Verb 2 dari kata kerja 'SEE' adalah ....", options: ["Seen", "Saw", "Seed", "Seeing"], correctIndex: 1, explanation: "'See' adalah irregular verb: See (V1) → Saw (V2) → Seen (V3)." },
    { id: 7, type: "multiple_choice", category: "v3_form", question: "Bentuk Verb 3 (Past Participle) dari kata kerja 'EAT' adalah ....", options: ["Ate", "Eating", "Eaten", "Eats"], correctIndex: 2, explanation: "'Eat' adalah irregular verb: Eat (V1) → Ate (V2) → Eaten (V3)." },
    { id: 8, type: "multiple_choice", category: "v3_form", question: "Bentuk Verb 3 dari kata kerja 'SPEAK' adalah ....", options: ["Spoke", "Spoken", "Speaked", "Speaking"], correctIndex: 1, explanation: "'Speak' adalah irregular verb: Speak (V1) → Spoke (V2) → Spoken (V3)." },
    { id: 9, type: "multiple_choice", category: "v3_form", question: "Bentuk Verb 3 dari kata kerja 'GIVE' adalah ....", options: ["Gave", "Given", "Gived", "Giving"], correctIndex: 1, explanation: "'Give' adalah irregular verb: Give (V1) → Gave (V2) → Given (V3)." },
    { id: 10, type: "multiple_choice", category: "v3_form", question: "Bentuk Verb 3 dari kata kerja 'DO' adalah ....", options: ["Did", "Done", "Doing", "Does"], correctIndex: 1, explanation: "'Do' adalah irregular verb: Do (V1) → Did (V2) → Done (V3)." },
    { id: 11, type: "multiple_choice", category: "v3_form", question: "Bentuk Verb 3 dari kata kerja 'SWIM' adalah ....", options: ["Swam", "Swum", "Swimmed", "Swimming"], correctIndex: 1, explanation: "'Swim' adalah irregular verb: Swim (V1) → Swam (V2) → Swum (V3)." },
    { id: 12, type: "multiple_choice", category: "concept", question: "Bentuk Verb 2 dan Verb 3 dari kata kerja reguler 'PLAY' adalah ....", options: ["Played – Played", "Play – Playing", "Plays – Played", "Playing – Plays"], correctIndex: 0, explanation: "'Play' adalah Regular Verb dengan akhiran -ed: Play → Played → Played." },
    { id: 13, type: "multiple_choice", category: "concept", question: "Kata kerja berikut yang termasuk REGULAR VERB adalah ....", options: ["Eat", "Go", "Clean", "Write"], correctIndex: 2, explanation: "'Clean' adalah Regular Verb (Cleaned - Cleaned). Eat, Go, dan Write adalah Irregular Verbs." },
    { id: 14, type: "multiple_choice", category: "concept", question: "Kata kerja berikut yang termasuk IRREGULAR VERB adalah ....", options: ["Cook", "Help", "Dance", "Sing"], correctIndex: 3, explanation: "'Sing' adalah Irregular Verb (Sing - Sang - Sung). Lainnya adalah Regular Verbs." },
    { id: 15, type: "true_false", category: "concept", question: "Benar atau Salah: Kata kerja 'READ' memiliki tulisan yang sama persis untuk Verb 1, Verb 2, dan Verb 3.", options: ["Benar (True)", "Salah (False)"], correctIndex: 0, explanation: "Benar! Tulisan tetap Read, namun lafal V2 & V3 diucapkan /red/." },
    { id: 16, type: "true_false", category: "concept", question: "Benar atau Salah: Semua kata kerja bahasa Inggris berubah ke bentuk lampau hanya ditambah -ed.", options: ["Benar (True)", "Salah (False)"], correctIndex: 1, explanation: "Salah! Irregular verb memiliki perubahan khusus." },
    { id: 17, type: "multiple_choice", category: "grammar", question: "Verb 2 (Past Simple) digunakan untuk menyatakan kegiatan yang ....", options: ["Sedang berlangsung saat ini", "Terjadi di masa lampau (sudah lewat)", "Akan terjadi di masa depan", "Merupakan fakta umum sehari-hari"], correctIndex: 1, explanation: "Verb 2 menyatakan kegiatan yang telah tuntas di masa lampau." },
    { id: 18, type: "multiple_choice", category: "grammar", question: "Verb 3 (Past Participle) biasanya digunakan setelah kata bantu ....", options: ["Will / Shall", "Have / Has / Had", "Do / Does / Did", "Am / Is / Are (continuous)"], correctIndex: 1, explanation: "Verb 3 digunakan pada Perfect Tense (have/has/had) dan kalimat pasif." },
    { id: 19, type: "multiple_choice", category: "sentence_completion", question: "I have _____ breakfast before going to school.", options: ["Eat", "Ate", "Eaten", "Eating"], correctIndex: 2, explanation: "Setelah 'have' (Present Perfect) wajib menggunakan Verb 3 'eaten'." },
    { id: 20, type: "multiple_choice", category: "sentence_completion", question: "She _____ to the market yesterday morning.", options: ["Go", "Went", "Gone", "Goes"], correctIndex: 1, explanation: "'Yesterday' penanda waktu lampau, gunakan Verb 2 'went'." },
    { id: 21, type: "multiple_choice", category: "sentence_completion", question: "They _____ football in the school yard last Sunday.", options: ["Play", "Played", "Playing", "Plays"], correctIndex: 1, explanation: "'Last Sunday' adalah masa lampau, gunakan Verb 2 'played'." },
    { id: 22, type: "multiple_choice", category: "sentence_completion", question: "The letter was _____ by my English teacher.", options: ["Write", "Wrote", "Written", "Writing"], correctIndex: 2, explanation: "Kalimat pasif (was + Verb 3): 'written'." },
    { id: 23, type: "multiple_choice", category: "sentence_completion", question: "Every day, my brother and I _____ fresh water.", options: ["Drink", "Drank", "Drunk", "Drinking"], correctIndex: 0, explanation: "'Every day' menyatakan rutinitas (Present Tense), gunakan Verb 1 'drink'." },
    { id: 24, type: "multiple_choice", category: "sentence_completion", question: "We have _____ this educational movie twice.", options: ["Watch", "Watched", "Watching", "Watches"], correctIndex: 1, explanation: "Setelah 'have' gunakan Verb 3 'watched'." },
    { id: 25, type: "multiple_choice", category: "sentence_completion", question: "Father _____ a new bicycle for my birthday last week.", options: ["Buy", "Buyed", "Bought", "Buying"], correctIndex: 2, explanation: "'Last week' menandakan waktu lampau. V2 dari buy adalah 'bought'." },
    { id: 26, type: "multiple_choice", category: "sentence_completion", question: "Has Budi _____ his English homework?", options: ["Do", "Did", "Done", "Doing"], correctIndex: 2, explanation: "Pertanyaan Present Perfect (Has + S + V3) memerlukan 'done'." },
    { id: 27, type: "multiple_choice", category: "error_check", question: "Manakah kalimat berikut yang tata bahasanya SALAH?", options: ["I went to Bandung yesterday.", "She has drank three glasses of milk.", "We played basketball last Friday.", "They have eaten lunch together."], correctIndex: 1, explanation: "Salah karena setelah 'has' harus Verb 3 'drunk', bukan Verb 2 'drank'." },
    { id: 28, type: "multiple_choice", category: "error_check", question: "Manakah pasangan V1 - V2 - V3 yang BENAR di bawah ini?", options: ["Make – Maked – Maked", "Run – Ran – Run", "Sleep – Sleeped – Sleeped", "Swim – Swammed – Swum"], correctIndex: 1, explanation: "Run → Ran → Run adalah pasangan yang benar." },
    { id: 29, type: "multiple_choice", category: "error_check", question: "Manakah pasangan kata kerja reguler dengan ejaan yang BENAR?", options: ["Study – Studyed – Studyed", "Study – Studied – Studied", "Study – Studit – Studit", "Study – Stude – Stude"], correctIndex: 1, explanation: "Konsonan + y berubah menjadi -ied: Study → Studied → Studied." },
    { id: 30, type: "true_false", category: "concept", question: "Benar atau Salah: Kalimat 'She cooked fried rice two hours ago' menggunakan Verb 2.", options: ["Benar (True)", "Salah (False)"], correctIndex: 0, explanation: "Benar! 'Cooked' adalah Verb 2 dari regular verb 'cook'." },
    { id: 31, type: "multiple_choice", category: "v2_form", question: "Bentuk Verb 2 dari kata kerja 'SLEEP' adalah ....", options: ["Sleeped", "Slept", "Slepted", "Sleeping"], correctIndex: 1, explanation: "Sleep (V1) → Slept (V2) → Slept (V3)." },
    { id: 32, type: "multiple_choice", category: "v3_form", question: "Bentuk Verb 3 dari kata kerja 'SING' adalah ....", options: ["Sang", "Sung", "Singed", "Song"], correctIndex: 1, explanation: "Sing (V1) → Sang (V2) → Sung (V3)." },
    { id: 33, type: "multiple_choice", category: "v2_form", question: "Bentuk Verb 2 dari kata kerja 'MAKE' adalah ....", options: ["Maked", "Made", "Makes", "Making"], correctIndex: 1, explanation: "Make (V1) → Made (V2) → Made (V3)." },
    { id: 34, type: "multiple_choice", category: "v3_form", question: "Bentuk Verb 3 dari kata kerja 'BRING' adalah ....", options: ["Brang", "Brung", "Brought", "Bringed"], correctIndex: 2, explanation: "Bring (V1) → Brought (V2) → Brought (V3)." },
    { id: 35, type: "multiple_choice", category: "sentence_completion", question: "Dina _____ a beautiful butterfly yesterday.", options: ["Draw", "Drew", "Drawn", "Drawing"], correctIndex: 1, explanation: "'Yesterday' membutuhkan Verb 2: 'drew'." },
    { id: 36, type: "multiple_choice", category: "v2_form", question: "Bentuk Verb 2 dari kata kerja 'FIND' adalah ....", options: ["Found", "Finded", "Fond", "Finding"], correctIndex: 0, explanation: "Find (V1) → Found (V2) → Found (V3)." },
    { id: 37, type: "multiple_choice", category: "v3_form", question: "Bentuk Verb 3 dari kata kerja 'CHOOSE' adalah ....", options: ["Chose", "Chosen", "Choosed", "Choosing"], correctIndex: 1, explanation: "Choose (V1) → Chose (V2) → Chosen (V3)." },
    { id: 38, type: "true_false", category: "concept", question: "Benar atau Salah: Kata kerja 'CUT' memiliki bentuk V1, V2, dan V3 yang semuanya sama persis.", options: ["Benar (True)", "Salah (False)"], correctIndex: 0, explanation: "Benar! Cut - Cut - Cut tidak berubah bentuk." },
    { id: 39, type: "multiple_choice", category: "sentence_completion", question: "The teacher has _____ the classroom door.", options: ["Open", "Opened", "Opening", "Opens"], correctIndex: 1, explanation: "Setelah 'has' gunakan Verb 3 'opened'." },
    { id: 40, type: "multiple_choice", category: "v2_form", question: "Bentuk Verb 2 dari kata kerja 'TEACH' adalah ....", options: ["Teached", "Taught", "Tought", "Teaching"], correctIndex: 1, explanation: "Teach (V1) → Taught (V2) → Taught (V3)." },
    { id: 41, type: "multiple_choice", category: "sentence_completion", question: "Last holiday, we _____ our grandparents in Yogyakarta.", options: ["Visit", "Visited", "Visiting", "Visits"], correctIndex: 1, explanation: "'Last holiday' memerlukan Verb 2 'visited'." },
    { id: 42, type: "multiple_choice", category: "v3_form", question: "Bentuk Verb 3 dari kata kerja 'FLY' adalah ....", options: ["Flew", "Flown", "Flyed", "Flying"], correctIndex: 1, explanation: "Fly (V1) → Flew (V2) → Flown (V3)." },
    { id: 43, type: "true_false", category: "concept", question: "Benar atau Salah: Kalimat 'I did my homework last night' menggunakan Verb 2.", options: ["Benar (True)", "Salah (False)"], correctIndex: 0, explanation: "Benar! 'Did' adalah Verb 2 dari 'do'." },
    { id: 44, type: "multiple_choice", category: "error_check", question: "Manakah bentuk lampau (V2) yang TIDAK TEPAT di bawah ini?", options: ["Help → Helped", "Cook → Cooked", "Eat → Eated", "Work → Worked"], correctIndex: 2, explanation: "Bentuk lampau dari 'Eat' adalah 'Ate', bukan 'Eated'." },
    { id: 45, type: "multiple_choice", category: "sentence_completion", question: "Our football team has _____ three trophies this semester.", options: ["Win", "Won", "Winning", "Winned"], correctIndex: 1, explanation: "Setelah 'has' membutuhkan Verb 3: 'won'." }
  ];

  // ==========================================
  // 3. DATA SENTENCE BUILDER PUZZLES
  // ==========================================
  const SENTENCE_PUZZLES = [
    { id: 1, verbForm: "Verb 2 (Past Simple)", targetSentence: "I ate rice yesterday", scrambled: ["rice", "yesterday", "I", "ate"], meaning: "Saya makan nasi kemarin.", verbUsed: "ate (Verb 2 dari 'eat')", explanation: "Menggunakan Verb 2 'ate' karena waktu lampau (yesterday)." },
    { id: 2, verbForm: "Verb 2 (Past Simple)", targetSentence: "She went to school yesterday", scrambled: ["school", "yesterday", "She", "went", "to"], meaning: "Dia pergi ke sekolah kemarin.", verbUsed: "went (Verb 2 dari 'go')", explanation: "Went adalah bentuk lampau Verb 2 dari 'go'." },
    { id: 3, verbForm: "Verb 1 (Base Form)", targetSentence: "They play football in the park", scrambled: ["in", "play", "football", "park", "the", "They"], meaning: "Mereka bermain sepak bola di taman.", verbUsed: "play (Verb 1)", explanation: "Menggunakan Verb 1 'play' untuk kegiatan sehari-hari." },
    { id: 4, verbForm: "Verb 3 (Present Perfect)", targetSentence: "I have eaten breakfast this morning", scrambled: ["morning", "have", "eaten", "I", "breakfast", "this"], meaning: "Saya sudah makan sarapan pagi ini.", verbUsed: "eaten (Verb 3 dari 'eat')", explanation: "Pola Present Perfect: have + Verb 3 ('eaten')." },
    { id: 5, verbForm: "Verb 2 (Past Simple)", targetSentence: "They played football last Sunday", scrambled: ["last", "played", "Sunday", "football", "They"], meaning: "Mereka bermain sepak bola Minggu lalu.", verbUsed: "played (Verb 2 reguler)", explanation: "Kata kerja reguler 'play' berakhiran -ed menjadi 'played'." },
    { id: 6, verbForm: "Verb 3 (Passive Voice)", targetSentence: "The letter was written by Sarah", scrambled: ["written", "Sarah", "was", "The", "by", "letter"], meaning: "Surat itu ditulis oleh Sarah.", verbUsed: "written (Verb 3 dari 'write')", explanation: "Kalimat pasif (was + Verb 3): 'written'." },
    { id: 7, verbForm: "Verb 2 (Past Simple)", targetSentence: "Father bought a new bicycle", scrambled: ["bicycle", "bought", "a", "Father", "new"], meaning: "Ayah membeli sepeda baru.", verbUsed: "bought (Verb 2 dari 'buy')", explanation: "Bought adalah irregular verb bentuk lampau dari 'buy'." },
    { id: 8, verbForm: "Verb 3 (Present Perfect)", targetSentence: "She has gone to the library", scrambled: ["library", "gone", "the", "She", "has", "to"], meaning: "Dia sudah pergi ke perpustakaan.", verbUsed: "gone (Verb 3 dari 'go')", explanation: "Setelah 'has' digunakan Verb 3 'gone'." },
    { id: 9, verbForm: "Verb 1 (Simple Present)", targetSentence: "We read English books together", scrambled: ["English", "books", "read", "We", "together"], meaning: "Kami membaca buku-buku bahasa Inggris bersama-sama.", verbUsed: "read (/riːd/ - Verb 1)", explanation: "Untuk kegiatan saat ini, gunakan Verb 1 'read' yang berlafal /riːd/." },
    { id: 10, verbForm: "Verb 2 (Past Simple)", targetSentence: "He drank fresh water an hour ago", scrambled: ["an", "drank", "hour", "He", "water", "fresh", "ago"], meaning: "Dia minum air segar satu jam yang lalu.", verbUsed: "drank (Verb 2 dari 'drink')", explanation: "Drank digunakan karena terjadi satu jam yang lalu." },
    { id: 11, verbForm: "Verb 3 (Present Perfect)", targetSentence: "We have done our English homework", scrambled: ["English", "have", "our", "done", "We", "homework"], meaning: "Kami sudah mengerjakan PR Bahasa Inggris kami.", verbUsed: "done (Verb 3 dari 'do')", explanation: "Present Perfect: have + Verb 3 ('done')." },
    { id: 12, verbForm: "Verb 2 (Past Simple)", targetSentence: "Budi cleaned his bedroom this morning", scrambled: ["cleaned", "his", "this", "Budi", "morning", "bedroom"], meaning: "Budi membersihkan kamarnya pagi ini.", verbUsed: "cleaned (Verb 2 reguler)", explanation: "Clean adalah regular verb ditambah akhiran -ed." }
  ];

  // ==========================================
  // 4. MESIN AUDIO & SPEECH SYNTHESIS
  // ==========================================
  class AudioEngine {
    constructor() {
      this.audioCtx = null;
      this.sfxEnabled = true;
      this.bgmEnabled = false;
      this.sfxVolume = 0.8;
      this.bgmVolume = 0.25;
      this.bgmInterval = null;
      this.speechRate = 0.85;
      this.preferredVoice = null;
      this.initSpeech();
    }

    ensureAudioContext() {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.audioCtx = new AudioContext();
      }
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }
    }

    initSpeech() {
      if ('speechSynthesis' in window) {
        const loadVoices = () => {
          const voices = window.speechSynthesis.getVoices();
          this.preferredVoice = voices.find(v => v.lang === 'en-US' && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha'))) ||
                                voices.find(v => v.lang.startsWith('en')) || null;
        };
        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = loadVoices;
        }
      }
    }

    speak(text, phoneticOverride = null) {
      if (!('speechSynthesis' in window)) return;
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(phoneticOverride || text);
        utterance.lang = 'en-US';
        utterance.rate = this.speechRate;
        utterance.pitch = 1.0;
        if (this.preferredVoice) utterance.voice = this.preferredVoice;
        window.speechSynthesis.speak(utterance);
      } catch (e) {}
    }

    playTone(freq, duration, type = 'sine', gainVal = 0.3) {
      if (!this.sfxEnabled) return;
      try {
        this.ensureAudioContext();
        if (!this.audioCtx) return;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
        gain.gain.setValueAtTime(gainVal * this.sfxVolume, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + duration);
      } catch (e) {}
    }

    playClick() { this.playTone(600, 0.08, 'triangle', 0.2); }

    playCorrect() {
      if (!this.sfxEnabled) return;
      this.ensureAudioContext();
      if (!this.audioCtx) return;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, 0.18, 'triangle', 0.35), i * 90);
      });
    }

    playWrong() {
      if (!this.sfxEnabled) return;
      this.ensureAudioContext();
      if (!this.audioCtx) return;
      [311.13, 261.63].forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, 0.25, 'sawtooth', 0.2), i * 150);
      });
    }

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

    playBuzzer() {
      if (!this.sfxEnabled) return;
      this.playTone(440, 0.35, 'square', 0.25);
    }

    playLevelUp() {
      if (!this.sfxEnabled) return;
      this.ensureAudioContext();
      if (!this.audioCtx) return;
      [440, 554.37, 659.25, 880, 1108.73].forEach((freq, i) => {
        setTimeout(() => this.playTone(freq, 0.3, 'sine', 0.4), i * 110);
      });
    }

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

    startBGM() {
      this.ensureAudioContext();
      if (!this.audioCtx || this.bgmInterval) return;
      this.bgmEnabled = true;
      const melody = [523.25, 659.25, 783.99, 659.25, 880.00, 783.99, 659.25, 523.25, 587.33, 659.25, 587.33, 523.25, 659.25, 783.99, 1046.50, 783.99];
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
        } catch (err) {}
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
      if (this.bgmEnabled) this.stopBGM();
      else this.startBGM();
      return this.bgmEnabled;
    }

    toggleSFX() {
      this.sfxEnabled = !this.sfxEnabled;
      return this.sfxEnabled;
    }
  }

  const sound = new AudioEngine();

  // ==========================================
  // 5. CANVAS CONFETTI ENGINE (MANDIRI)
  // ==========================================
  class ConfettiEngine {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.particles = [];
      this.animationId = null;
      this.colors = ['#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#F78C6B', '#9B5DE5', '#00BBF9'];
      this.init();
    }

    init() {
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'confetti-canvas';
      this.canvas.style.position = 'fixed';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.width = '100vw';
      this.canvas.style.height = '100vh';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '9999';
      document.body.appendChild(this.canvas);
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    burst(count = 70, originX = window.innerWidth / 2, originY = window.innerHeight / 2) {
      this.resize();
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 12 + 6;
        this.particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          size: Math.random() * 10 + 6,
          color: this.colors[Math.floor(Math.random() * this.colors.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 15,
          opacity: 1,
          life: 0,
          maxLife: Math.random() * 40 + 60,
          shape: Math.random() > 0.4 ? 'rect' : 'circle'
        });
      }
      if (!this.animationId) this.loop();
    }

    loop() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.28;
        p.vx *= 0.98;
        p.rotation += p.rotationSpeed;
        p.life++;
        p.opacity = Math.max(0, 1 - (p.life / p.maxLife));
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.globalAlpha = p.opacity;
        this.ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
        this.ctx.restore();
        if (p.life >= p.maxLife || p.y > this.canvas.height + 20) {
          this.particles.splice(i, 1);
        }
      }
      if (this.particles.length > 0) {
        this.animationId = requestAnimationFrame(() => this.loop());
      } else {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.animationId = null;
      }
    }
  }

  const confetti = new ConfettiEngine();

  // ==========================================
  // 6. STORAGE & REWARD MANAGER
  // ==========================================
  const LEVEL_CONFIG = [
    { level: 1, name: 'Beginner', minXp: 0, icon: '🌱', badge: 'Pemula Kata Kerja' },
    { level: 2, name: 'Verb Explorer', minXp: 300, icon: '🧭', badge: 'Penjelajah Verb' },
    { level: 3, name: 'Verb Master', minXp: 800, icon: '⭐', badge: 'Master Verb' },
    { level: 4, name: 'English Champion', minXp: 1500, icon: '🏆', badge: 'Juara Bahasa Inggris' }
  ];

  class StorageManager {
    constructor() {
      this.userData = this.load('eva_user_data_v1', {
        name: 'Petualang Verb',
        xp: 0,
        level: 1,
        rewards: { bronzeStar: false, silverStar: false, goldStar: false, verbMasterTrophy: false },
        gamesPlayed: 0,
        quizzesCompleted: 0
      });
      this.teacherSettings = this.load('eva_teacher_settings_v1', {
        quizQuestionCount: 15,
        quizTimerSeconds: 30,
        gameDifficulty: 'all',
        teamCount: 2,
        teamNames: ['Tim Rajawali 🦅', 'Tim Harimau 🐯', 'Tim Garuda 🌟', 'Tim Singa 🦁']
      });
      this.quizHistory = this.load('eva_quiz_history_v1', []);
      this.teamHistory = this.load('eva_team_battle_v1', []);
    }

    load(key, fallback) {
      try {
        const d = localStorage.getItem(key);
        return d ? { ...fallback, ...JSON.parse(d) } : JSON.parse(JSON.stringify(fallback));
      } catch (e) {
        return JSON.parse(JSON.stringify(fallback));
      }
    }

    save(key, data) {
      try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) {}
    }

    addXP(amount) {
      this.userData.xp += amount;
      const newLvl = this.calculateLevel(this.userData.xp);
      this.userData.level = newLvl.level;
      if (this.userData.xp >= 300) this.userData.rewards.bronzeStar = true;
      if (this.userData.xp >= 800) this.userData.rewards.silverStar = true;
      if (this.userData.xp >= 1500) this.userData.rewards.goldStar = true;
      if (this.userData.quizzesCompleted >= 3 && this.userData.xp >= 2000) this.userData.rewards.verbMasterTrophy = true;
      this.save('eva_user_data_v1', this.userData);
      return newLvl;
    }

    calculateLevel(xp) {
      for (let i = LEVEL_CONFIG.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_CONFIG[i].minXp) return LEVEL_CONFIG[i];
      }
      return LEVEL_CONFIG[0];
    }

    getCurrentLevel() { return this.calculateLevel(this.userData.xp); }

    getNextLevelInfo() {
      const cur = this.getCurrentLevel();
      const nxt = LEVEL_CONFIG.find(l => l.level === cur.level + 1);
      if (!nxt) return { isMax: true, progress: 100, remainingXp: 0 };
      const xpIn = this.userData.xp - cur.minXp;
      const range = nxt.minXp - cur.minXp;
      return {
        isMax: false,
        progress: Math.min(100, Math.round((xpIn / range) * 100)),
        remainingXp: nxt.minXp - this.userData.xp,
        nextLevelName: nxt.name
      };
    }

    saveQuizResult(res) {
      this.quizHistory.unshift({ ...res, id: Date.now(), date: new Date().toLocaleString('id-ID') });
      if (this.quizHistory.length > 50) this.quizHistory.pop();
      this.userData.quizzesCompleted += 1;
      this.save('eva_quiz_history_v1', this.quizHistory);
      this.save('eva_user_data_v1', this.userData);
    }

    saveTeamBattleResult(teams, winner) {
      this.teamHistory.unshift({ id: Date.now(), date: new Date().toLocaleString('id-ID'), winner, teams: teams.map(t => ({ name: t.name, score: t.score })) });
      if (this.teamHistory.length > 30) this.teamHistory.pop();
      this.save('eva_team_battle_v1', this.teamHistory);
    }

    updateTeacherSettings(newSettings) {
      this.teacherSettings = { ...this.teacherSettings, ...newSettings };
      this.save('eva_teacher_settings_v1', this.teacherSettings);
    }

    resetAllData() {
      localStorage.removeItem('eva_user_data_v1');
      localStorage.removeItem('eva_quiz_history_v1');
      localStorage.removeItem('eva_team_battle_v1');
      this.userData = { name: 'Petualang Verb', xp: 0, level: 1, rewards: { bronzeStar: false, silverStar: false, goldStar: false, verbMasterTrophy: false }, gamesPlayed: 0, quizzesCompleted: 0 };
      this.quizHistory = [];
      this.teamHistory = [];
    }

    exportQuizToCSV() {
      if (this.quizHistory.length === 0) return null;
      const headers = ['No', 'Tanggal', 'Nama Siswa', 'Skor', 'Benar', 'Salah', 'Total Soal', 'Persentase', 'Predikat'];
      const rows = this.quizHistory.map((item, idx) => [
        idx + 1, `"${item.date}"`, `"${item.studentName || 'Anonim'}"`, item.score, item.correctCount, item.wrongCount, item.totalQuestions, `"${item.percentage}%"`, `"${item.predicate}"`
      ]);
      return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    }
  }

  const storage = new StorageManager();

  // ==========================================
  // 7. MODUL MATERI PEMBELAJARAN
  // ==========================================
  class MateriModule {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.activeTab = 'pengertian';
    }

    render() {
      this.container.innerHTML = `
        <div class="materi-container">
          <div class="materi-header">
            <div class="materi-title-group">
              <span class="materi-badge">📚 Ruang Belajar Mandiri</span>
              <h2 class="section-title">Petualangan Mengenal Kata Kerja (Verbs)</h2>
              <p class="section-subtitle">Pelajari konsep bentuk kata kerja dalam Bahasa Inggris dengan cara yang mudah dan menyenangkan!</p>
            </div>
          </div>
          <div class="materi-tabs-nav" role="tablist">
            <button class="materi-tab-btn ${this.activeTab === 'pengertian' ? 'active' : ''}" data-tab="pengertian"><span class="tab-icon">💡</span> 1. Pengertian Verb</button>
            <button class="materi-tab-btn ${this.activeTab === 'verb1' ? 'active' : ''}" data-tab="verb1"><span class="tab-icon">🟢</span> 2. Verb 1 (Base)</button>
            <button class="materi-tab-btn ${this.activeTab === 'verb2' ? 'active' : ''}" data-tab="verb2"><span class="tab-icon">🟠</span> 3. Verb 2 (Past)</button>
            <button class="materi-tab-btn ${this.activeTab === 'verb3' ? 'active' : ''}" data-tab="verb3"><span class="tab-icon">🟣</span> 4. Verb 3 (Participle)</button>
            <button class="materi-tab-btn ${this.activeTab === 'regular-irregular' ? 'active' : ''}" data-tab="regular-irregular"><span class="tab-icon">⚖️</span> 5. Regular vs Irregular</button>
          </div>
          <div class="materi-tab-content">${this.renderTabContent()}</div>
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
                <p>Dalam Bahasa Inggris, <strong>setiap kalimat wajib memiliki Verb</strong>! Berbeda dengan Bahasa Indonesia, kata kerja bahasa Inggris berubah bentuk sesuai waktu peristiwa (Tenses).</p>
              </div>
              <h4 class="sub-heading mt-6">✨ Contoh Kata Kerja Populer:</h4>
              <div class="verb-examples-grid">
                ${this.createCard('Eat', 'Makan', 'I eat healthy food every day.')}
                ${this.createCard('Drink', 'Minum', 'We drink clean water.')}
                ${this.createCard('Sleep', 'Tidur', 'Cats sleep comfortably.')}
                ${this.createCard('Read', 'Membaca', 'Students read science books.', 'read')}
                ${this.createCard('Write', 'Menulis', 'She writes a nice letter.')}
              </div>
            </div>`;
        case 'verb1':
          return `
            <div class="materi-card animate-fade-in">
              <div class="card-hero-banner bg-green-light">
                <div class="banner-text">
                  <h3>Verb 1: Bentuk Dasar (Base Form / Infinitive)</h3>
                  <p><strong>Verb 1</strong> adalah bentuk asli atau dasar dari kata kerja sebelum mengalami perubahan waktu.</p>
                </div>
                <div class="banner-emoji">🌱</div>
              </div>
              <div class="features-row mt-4">
                <div class="feature-item"><span class="feature-icon">⏰</span><h5>1. Simple Present Tense</h5><p>Menyatakan rutinitas atau fakta umum.</p></div>
                <div class="feature-item"><span class="feature-icon">👉</span><h5>2. Kalimat Perintah</h5><p>Contoh: <em>"Open the door!"</em> atau <em>"Listen!"</em>.</p></div>
                <div class="feature-item"><span class="feature-icon">🎯</span><h5>3. Setelah Modal / To</h5><p>Digunakan setelah <em>can, will, must, should</em>.</p></div>
              </div>
              <h4 class="sub-heading mt-6">📖 Contoh Kalimat Verb 1:</h4>
              <div class="example-sentences-list">
                <div class="sentence-item"><div class="verb-tag v1-tag">Eat</div><div class="sentence-text"><span class="en">"I <strong>eat</strong> rice every morning."</span><span class="id">Artinya: Saya makan nasi setiap pagi.</span></div><button class="btn-sound-mini" data-speak="I eat rice every morning.">🔊 Dengarkan</button></div>
                <div class="sentence-item"><div class="verb-tag v1-tag">Go</div><div class="sentence-text"><span class="en">"They <strong>go</strong> to school by bicycle."</span><span class="id">Artinya: Mereka pergi ke sekolah dengan sepeda.</span></div><button class="btn-sound-mini" data-speak="They go to school by bicycle.">🔊 Dengarkan</button></div>
                <div class="sentence-item"><div class="verb-tag v1-tag">Play</div><div class="sentence-text"><span class="en">"We <strong>play</strong> football in the afternoon."</span><span class="id">Artinya: Kami bermain sepak bola pada sore hari.</span></div><button class="btn-sound-mini" data-speak="We play football in the afternoon.">🔊 Dengarkan</button></div>
              </div>
            </div>`;
        case 'verb2':
          return `
            <div class="materi-card animate-fade-in">
              <div class="card-hero-banner bg-orange-light">
                <div class="banner-text">
                  <h3>Verb 2: Bentuk Lampau (Past Simple)</h3>
                  <p><strong>Verb 2</strong> digunakan dalam <strong>Simple Past Tense</strong> untuk menyatakan tindakan yang terjadi dan selesai di masa lampau.</p>
                </div>
                <div class="banner-emoji">⏳</div>
              </div>
              <div class="example-sentences-list mt-4">
                <div class="sentence-item"><div class="verb-tag v2-tag">Ate</div><div class="sentence-text"><span class="en">"I <strong>ate</strong> delicious fried rice yesterday."</span><span class="id">Artinya: Saya makan nasi goreng lezat kemarin.</span></div><button class="btn-sound-mini" data-speak="I ate delicious fried rice yesterday.">🔊 Dengarkan</button></div>
                <div class="sentence-item"><div class="verb-tag v2-tag">Went</div><div class="sentence-text"><span class="en">"She <strong>went</strong> to school yesterday morning."</span><span class="id">Artinya: Dia pergi ke sekolah kemarin pagi.</span></div><button class="btn-sound-mini" data-speak="She went to school yesterday morning.">🔊 Dengarkan</button></div>
                <div class="sentence-item"><div class="verb-tag v2-tag">Played</div><div class="sentence-text"><span class="en">"They <strong>played</strong> football last Sunday."</span><span class="id">Artinya: Mereka bermain sepak bola Minggu lalu.</span></div><button class="btn-sound-mini" data-speak="They played football last Sunday.">🔊 Dengarkan</button></div>
              </div>
            </div>`;
        case 'verb3':
          return `
            <div class="materi-card animate-fade-in">
              <div class="card-hero-banner bg-purple-light">
                <div class="banner-text">
                  <h3>Verb 3: Bentuk Participle (Past Participle)</h3>
                  <p><strong>Verb 3</strong> digunakan dalam <strong>Present Perfect Tense</strong> (*have/has + V3*) dan <strong>Passive Voice</strong> (*to be + V3*).</p>
                </div>
                <div class="banner-emoji">🔮</div>
              </div>
              <div class="example-sentences-list mt-4">
                <div class="sentence-item"><div class="verb-tag v3-tag">have eaten</div><div class="sentence-text"><span class="en">"I <strong>have eaten</strong> rice this morning."</span><span class="id">Artinya: Saya sudah makan nasi pagi ini.</span></div><button class="btn-sound-mini" data-speak="I have eaten rice this morning.">🔊 Dengarkan</button></div>
                <div class="sentence-item"><div class="verb-tag v3-tag">has gone</div><div class="sentence-text"><span class="en">"She <strong>has gone</strong> to school."</span><span class="id">Artinya: Dia sudah pergi ke sekolah.</span></div><button class="btn-sound-mini" data-speak="She has gone to school.">🔊 Dengarkan</button></div>
                <div class="sentence-item"><div class="verb-tag v3-tag">was written</div><div class="sentence-text"><span class="en">"The letter <strong>was written</strong> by my mother."</span><span class="id">Artinya: Surat itu ditulis oleh ibu saya.</span></div><button class="btn-sound-mini" data-speak="The letter was written by my mother.">🔊 Dengarkan</button></div>
              </div>
            </div>`;
        case 'regular-irregular':
          return `
            <div class="materi-card animate-fade-in">
              <div class="card-hero-banner bg-yellow-light">
                <div class="banner-text">
                  <h3>Perbedaan Regular Verb & Irregular Verb</h3>
                  <p>Berdasarkan pola perubahannya ke V2 dan V3, kata kerja dibagi menjadi Regular dan Irregular.</p>
                </div>
                <div class="banner-emoji">⚖️</div>
              </div>
              <div class="comparison-dual-grid mt-4">
                <div class="comparison-card border-green">
                  <div class="comp-header bg-green-solid"><h4>🟢 1. Regular Verb (Beraturan)</h4></div>
                  <div class="comp-body">
                    <p>Hanya ditambah akhiran <strong>-ed</strong> atau <strong>-d</strong>.</p>
                    <ul class="rule-list">
                      <li>Play → Played → Played</li>
                      <li>Work → Worked → Worked</li>
                      <li>Clean → Cleaned → Cleaned</li>
                      <li>Watch → Watched → Watched</li>
                    </ul>
                  </div>
                </div>
                <div class="comparison-card border-orange">
                  <div class="comp-header bg-orange-solid"><h4>🟠 2. Irregular Verb (Tidak Beraturan)</h4></div>
                  <div class="comp-body">
                    <p>Bentuk kata kerja berubah khusus atau bahkan tetap.</p>
                    <ul class="rule-list">
                      <li>Eat → Ate → Eaten</li>
                      <li>Go → Went → Gone</li>
                      <li>Write → Wrote → Written</li>
                      <li>See → Saw → Seen</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="special-note-box mt-6">
                <div class="note-icon">📢</div>
                <div class="note-text">
                  <h5>Perhatian Khusus Kata "READ":</h5>
                  <p>Tulisannya sama persis: <em>Read - Read - Read</em>. Namun pelafalannya berbeda: <strong>Verb 1</strong> dilafalkan <span class="phonetic">/riːd/</span>, sedangkan <strong>Verb 2 & 3</strong> dilafalkan <span class="phonetic">/red/</span> (seperti warna merah).</p>
                </div>
              </div>
            </div>`;
      }
    }

    createCard(verb, meaning, sample, phonetic = null) {
      return `
        <div class="verb-audio-card">
          <div class="card-top"><span class="verb-title">${verb}</span><span class="verb-meaning">${meaning}</span></div>
          <p class="verb-sample">"${sample}"</p>
          <button class="btn-card-audio" data-speak="${phonetic || verb}">🔊 Dengarkan</button>
        </div>`;
    }

    bindEvents() {
      this.container.querySelectorAll('.materi-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          sound.playClick();
          this.activeTab = btn.getAttribute('data-tab');
          this.render();
        });
      });
      this.container.querySelectorAll('[data-speak]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          sound.playClick();
          sound.speak(btn.getAttribute('data-speak'));
        });
      });
    }
  }

  // ==========================================
  // 8. MODUL KAMUS KATA KERJA
  // ==========================================
  class DictionaryModule {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.verbs = [...VERBS_DATA];
      this.searchQuery = '';
      this.categoryFilter = 'all';
      this.letterFilter = 'all';
      this.viewMode = 'card';
    }

    getFilteredVerbs() {
      return this.verbs.filter(v => {
        if (this.categoryFilter !== 'all' && v.type !== this.categoryFilter) return false;
        if (this.letterFilter !== 'all' && !v.v1.toUpperCase().startsWith(this.letterFilter)) return false;
        if (this.searchQuery.trim() !== '') {
          const q = this.searchQuery.toLowerCase().trim();
          return v.v1.toLowerCase().includes(q) || v.v2.toLowerCase().includes(q) || v.v3.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q);
        }
        return true;
      });
    }

    render() {
      const filtered = this.getFilteredVerbs();
      const alphabetList = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

      this.container.innerHTML = `
        <div class="dict-container">
          <div class="dict-header">
            <div class="dict-title-group">
              <span class="materi-badge">📖 Kamus Interaktif</span>
              <h2 class="section-title">Kamus Kata Kerja (${this.verbs.length} Verbs)</h2>
              <p class="section-subtitle">Jelajahi kata kerja bahasa Inggris lengkap dengan audio pelafalan asli!</p>
            </div>
            <div class="dict-view-toggle">
              <button class="btn-toggle-view ${this.viewMode === 'card' ? 'active' : ''}" data-view="card">🃏 Kartu</button>
              <button class="btn-toggle-view ${this.viewMode === 'table' ? 'active' : ''}" data-view="table">📋 Tabel</button>
            </div>
          </div>
          <div class="dict-toolbar">
            <div class="search-box-wrapper">
              <span class="search-icon">🔍</span>
              <input type="text" id="dict-search-input" class="dict-search-input" placeholder="Cari kata kerja atau arti..." value="${this.searchQuery}">
              ${this.searchQuery ? '<button id="btn-clear-search" class="btn-clear-search">✕</button>' : ''}
            </div>
            <div class="filter-type-group">
              <button class="btn-filter-type ${this.categoryFilter === 'all' ? 'active' : ''}" data-cat="all">Semua (${this.verbs.length})</button>
              <button class="btn-filter-type ${this.categoryFilter === 'regular' ? 'active' : ''}" data-cat="regular">🟢 Regular</button>
              <button class="btn-filter-type ${this.categoryFilter === 'irregular' ? 'active' : ''}" data-cat="irregular">🟠 Irregular</button>
            </div>
          </div>
          <div class="alphabet-scroll-bar">
            <button class="alpha-chip ${this.letterFilter === 'all' ? 'active' : ''}" data-letter="all">Semua</button>
            ${alphabetList.map(l => `<button class="alpha-chip ${this.letterFilter === l ? 'active' : ''}" data-letter="${l}">${l}</button>`).join('')}
          </div>
          <div class="dict-count-bar">
            <span>Menampilkan <strong>${filtered.length}</strong> kata kerja</span>
            ${(this.searchQuery || this.categoryFilter !== 'all' || this.letterFilter !== 'all') ? '<button id="btn-reset-all-filters" class="btn-reset-filters">🔄 Reset</button>' : ''}
          </div>
          <div class="dict-content-area">
            ${filtered.length === 0 ? '<div class="empty-state"><h4>Kata kerja tidak ditemukan!</h4></div>' :
              this.viewMode === 'card' ? this.renderCardView(filtered) : this.renderTableView(filtered)}
          </div>
        </div>
      `;
      this.bindEvents();
    }

    renderCardView(list) {
      return `
        <div class="verb-cards-grid">
          ${list.map(v => {
            const isRead = v.v1.toLowerCase() === 'read';
            return `
              <div class="verb-card-item ${v.type === 'regular' ? 'regular-theme' : 'irregular-theme'}">
                <div class="verb-card-top">
                  <span class="type-pill ${v.type === 'regular' ? 'pill-regular' : 'pill-irregular'}">${v.type === 'regular' ? '🟢 Regular' : '🟠 Irregular'}</span>
                  <span class="card-id">#${v.id}</span>
                </div>
                <div class="verb-meaning-title">${v.meaning}</div>
                <div class="verb-forms-container">
                  <div class="verb-form-box v1-box">
                    <span class="form-tag">V1 (Base)</span>
                    <span class="form-word">${v.v1}</span>
                    ${isRead ? '<span class="phonetic-badge">/riːd/</span>' : ''}
                    <button class="btn-sound-pill" data-speak="${v.v1}">🔊 Dengar</button>
                  </div>
                  <div class="verb-form-box v2-box">
                    <span class="form-tag">V2 (Past)</span>
                    <span class="form-word">${v.v2}</span>
                    ${isRead ? '<span class="phonetic-badge">/red/</span>' : ''}
                    <button class="btn-sound-pill" data-speak="${isRead ? 'red' : v.v2}">🔊 Dengar</button>
                  </div>
                  <div class="verb-form-box v3-box">
                    <span class="form-tag">V3 (Participle)</span>
                    <span class="form-word">${v.v3}</span>
                    ${isRead ? '<span class="phonetic-badge">/red/</span>' : ''}
                    <button class="btn-sound-pill" data-speak="${isRead ? 'red' : v.v3}">🔊 Dengar</button>
                  </div>
                </div>
                <button class="btn-speak-all-trio" data-trio="${v.v1}. ${isRead ? 'red' : v.v2}. ${isRead ? 'red' : v.v3}.">🎵 Putar V1, V2, & V3</button>
              </div>`;
          }).join('')}
        </div>`;
    }

    renderTableView(list) {
      return `
        <div class="dict-table-wrapper">
          <table class="dict-table">
            <thead>
              <tr><th>No</th><th>Verb 1 (Base)</th><th>Verb 2 (Past)</th><th>Verb 3 (Participle)</th><th>Arti</th><th>Kategori</th><th>Audio</th></tr>
            </thead>
            <tbody>
              ${list.map((v, i) => {
                const isRead = v.v1.toLowerCase() === 'read';
                return `
                  <tr>
                    <td>${i + 1}</td>
                    <td><strong>${v.v1}</strong></td>
                    <td>${v.v2}</td>
                    <td>${v.v3}</td>
                    <td><strong>${v.meaning}</strong></td>
                    <td><span class="badge ${v.type === 'regular' ? 'badge-reg' : 'badge-irreg'}">${v.type}</span></td>
                    <td><button class="btn-sound-mini" data-trio="${v.v1}. ${isRead ? 'red' : v.v2}. ${isRead ? 'red' : v.v3}.">🔊 Trio</button></td>
                  </tr>`;
              }).join('')}
            </tbody>
          </table>
        </div>`;
    }

    bindEvents() {
      const search = this.container.querySelector('#dict-search-input');
      if (search) {
        search.addEventListener('input', (e) => {
          this.searchQuery = e.target.value;
          this.render();
          const s = this.container.querySelector('#dict-search-input');
          if (s) { s.focus(); s.setSelectionRange(s.value.length, s.value.length); }
        });
      }
      const clr = this.container.querySelector('#btn-clear-search');
      if (clr) clr.addEventListener('click', () => { sound.playClick(); this.searchQuery = ''; this.render(); });
      this.container.querySelectorAll('.btn-toggle-view').forEach(btn => {
        btn.addEventListener('click', () => { sound.playClick(); this.viewMode = btn.getAttribute('data-view'); this.render(); });
      });
      this.container.querySelectorAll('.btn-filter-type').forEach(btn => {
        btn.addEventListener('click', () => { sound.playClick(); this.categoryFilter = btn.getAttribute('data-cat'); this.render(); });
      });
      this.container.querySelectorAll('.alpha-chip').forEach(btn => {
        btn.addEventListener('click', () => { sound.playClick(); this.letterFilter = btn.getAttribute('data-letter'); this.render(); });
      });
      const rst = this.container.querySelector('#btn-reset-all-filters');
      if (rst) rst.addEventListener('click', () => { sound.playClick(); this.searchQuery = ''; this.categoryFilter = 'all'; this.letterFilter = 'all'; this.render(); });
      this.container.querySelectorAll('[data-speak]').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); sound.playClick(); sound.speak(btn.getAttribute('data-speak')); });
      });
      this.container.querySelectorAll('[data-trio]').forEach(btn => {
        btn.addEventListener('click', (e) => { e.stopPropagation(); sound.playClick(); sound.speak(btn.getAttribute('data-trio')); });
      });
    }
  }

  // ==========================================
  // 9. GAME 1: MATCH THE VERBS
  // ==========================================
  class GameMatchModule {
    constructor(containerId, onBack) {
      this.container = document.getElementById(containerId);
      this.onBack = onBack;
      this.totalRounds = 10;
      this.currentRound = 1;
      this.score = 0;
      this.verbsPool = [];
      this.roundVerbs = [];
      this.selectedCards = { v1: null, v2: null, v3: null };
      this.matchedPairs = [];
    }

    start() {
      this.currentRound = 1;
      this.score = 0;
      this.verbsPool = [...VERBS_DATA].sort(() => Math.random() - 0.5);
      this.loadRound();
    }

    loadRound() {
      this.selectedCards = { v1: null, v2: null, v3: null };
      this.matchedPairs = [];
      const startIdx = ((this.currentRound - 1) * 3) % (this.verbsPool.length - 3);
      this.roundVerbs = this.verbsPool.slice(startIdx, startIdx + 3);
      this.render();
    }

    render() {
      const v1List = [...this.roundVerbs].sort(() => Math.random() - 0.5);
      const v2List = [...this.roundVerbs].sort(() => Math.random() - 0.5);
      const v3List = [...this.roundVerbs].sort(() => Math.random() - 0.5);

      this.container.innerHTML = `
        <div class="game-wrapper animate-fade-in">
          <div class="game-top-bar">
            <button id="btn-back-to-hub" class="btn-game-nav">⬅️ Menu Game</button>
            <div class="game-info-badge"><span class="badge-title">🎮 Pasangkan Kata Kerja</span><span class="badge-round">Ronde ${this.currentRound} / ${this.totalRounds}</span></div>
            <div class="game-score-badge"><span class="score-icon">⭐</span><span class="score-num">${this.score} Poin</span></div>
          </div>
          <div class="game-instruction-banner">
            <span class="banner-icon">💡</span>
            <p>Sentuh 3 kartu yang berpasangan (<strong>Verb 1 + Verb 2 + Verb 3</strong>) atau gunakan drag & drop!</p>
          </div>
          <div class="match-game-board">
            <div class="match-column col-v1">
              <div class="column-header head-v1"><span class="col-pill">🟢 Verb 1</span><h4>Bentuk Dasar</h4></div>
              <div class="column-cards">
                ${v1List.map(v => `<div class="match-card card-v1 ${this.matchedPairs.includes(v.id) ? 'matched' : ''} ${this.selectedCards.v1 === v.id ? 'selected' : ''}" data-type="v1" data-id="${v.id}" data-word="${v.v1}"><span class="card-word">${v.v1}</span><span class="card-meaning">${v.meaning}</span></div>`).join('')}
              </div>
            </div>
            <div class="match-column col-v2">
              <div class="column-header head-v2"><span class="col-pill">🟠 Verb 2</span><h4>Past Simple</h4></div>
              <div class="column-cards">
                ${v2List.map(v => `<div class="match-card card-v2 ${this.matchedPairs.includes(v.id) ? 'matched' : ''} ${this.selectedCards.v2 === v.id ? 'selected' : ''}" data-type="v2" data-id="${v.id}" data-word="${v.v1.toLowerCase() === 'read' ? 'red' : v.v2}"><span class="card-word">${v.v2}</span></div>`).join('')}
              </div>
            </div>
            <div class="match-column col-v3">
              <div class="column-header head-v3"><span class="col-pill">🟣 Verb 3</span><h4>Past Participle</h4></div>
              <div class="column-cards">
                ${v3List.map(v => `<div class="match-card card-v3 ${this.matchedPairs.includes(v.id) ? 'matched' : ''} ${this.selectedCards.v3 === v.id ? 'selected' : ''}" data-type="v3" data-id="${v.id}" data-word="${v.v1.toLowerCase() === 'read' ? 'red' : v.v3}"><span class="card-word">${v.v3}</span></div>`).join('')}
              </div>
            </div>
          </div>
          <div class="selection-status-bar">
            <div class="status-slot ${this.selectedCards.v1 ? 'filled' : ''}"><strong>${this.getWord(this.selectedCards.v1, 'v1') || 'Pilih V1'}</strong></div>
            <span class="status-arrow">➔</span>
            <div class="status-slot ${this.selectedCards.v2 ? 'filled' : ''}"><strong>${this.getWord(this.selectedCards.v2, 'v2') || 'Pilih V2'}</strong></div>
            <span class="status-arrow">➔</span>
            <div class="status-slot ${this.selectedCards.v3 ? 'filled' : ''}"><strong>${this.getWord(this.selectedCards.v3, 'v3') || 'Pilih V3'}</strong></div>
          </div>
        </div>
      `;
      this.bindEvents();
    }

    getWord(id, form) {
      const v = this.roundVerbs.find(i => i.id === id);
      return v ? v[form] : null;
    }

    handleSelect(type, id, word) {
      sound.playClick();
      sound.speak(word);
      this.selectedCards[type] = id;
      this.render();
      if (this.selectedCards.v1 && this.selectedCards.v2 && this.selectedCards.v3) {
        this.checkMatch();
      }
    }

    checkMatch() {
      const { v1, v2, v3 } = this.selectedCards;
      if (v1 === v2 && v2 === v3) {
        sound.playCorrect();
        confetti.burst(40);
        this.score += 30;
        storage.addXP(30);
        this.matchedPairs.push(v1);
        this.selectedCards = { v1: null, v2: null, v3: null };
        if (this.matchedPairs.length === this.roundVerbs.length) {
          setTimeout(() => {
            if (this.currentRound < this.totalRounds) {
              this.currentRound++;
              this.loadRound();
            } else {
              this.renderGameOver();
            }
          }, 600);
        } else {
          this.render();
        }
      } else {
        sound.playWrong();
        setTimeout(() => {
          this.selectedCards = { v1: null, v2: null, v3: null };
          this.render();
        }, 500);
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
            <div class="score-item"><span class="label">Skor Akhir</span><span class="value text-gold">${this.score} Poin</span></div>
            <div class="score-item"><span class="label">Ronde Selesai</span><span class="value">${this.totalRounds}</span></div>
            <div class="score-item"><span class="label">Bonus XP</span><span class="value text-green">+100 XP</span></div>
          </div>
          <div class="result-actions">
            <button id="btn-replay-match" class="btn-primary-action">🔄 Main Lagi</button>
            <button id="btn-finish-match" class="btn-secondary-action">⬅️ Menu Game</button>
          </div>
        </div>
      `;
      this.container.querySelector('#btn-replay-match').addEventListener('click', () => this.start());
      this.container.querySelector('#btn-finish-match').addEventListener('click', () => this.onBack && this.onBack());
    }

    bindEvents() {
      const back = this.container.querySelector('#btn-back-to-hub');
      if (back) back.addEventListener('click', () => this.onBack && this.onBack());
      this.container.querySelectorAll('.match-card:not(.matched)').forEach(card => {
        card.addEventListener('click', () => {
          const type = card.getAttribute('data-type');
          const id = parseInt(card.getAttribute('data-id'), 10);
          const word = card.getAttribute('data-word');
          this.handleSelect(type, id, word);
        });
      });
    }
  }

  // ==========================================
  // 10. GAME 2: COMPLETE THE VERB
  // ==========================================
  class GameCompleteModule {
    constructor(containerId, onBack) {
      this.container = document.getElementById(containerId);
      this.onBack = onBack;
      this.totalQuestions = 10;
      this.currentIndex = 0;
      this.score = 0;
      this.questions = [];
      this.answered = false;
    }

    start() {
      this.currentIndex = 0;
      this.score = 0;
      this.generateQuestions();
      this.loadQuestion();
    }

    generateQuestions() {
      const shuffled = [...VERBS_DATA].sort(() => Math.random() - 0.5).slice(0, this.totalQuestions);
      this.questions = shuffled.map(verb => {
        const missing = ['v1', 'v2', 'v3'][Math.floor(Math.random() * 3)];
        const correct = verb[missing];
        const distSet = new Set();
        if (verb.type === 'irregular') { distSet.add(verb.v1 + 'ed'); distSet.add(verb.v1 + 'd'); }
        distSet.add(verb.v1 + 'ing');
        distSet.add(verb.v1 + 's');
        while (distSet.size < 4) {
          const r = VERBS_DATA[Math.floor(Math.random() * VERBS_DATA.length)];
          distSet.add(r[missing]);
        }
        const distractors = Array.from(distSet).filter(w => w.toLowerCase() !== correct.toLowerCase()).slice(0, 3);
        const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
        return {
          verb, missing, correct, options,
          explanation: `Kata kerja '${verb.v1}' (${verb.meaning}) memiliki pola: <strong>${verb.v1}</strong> ➔ <strong>${verb.v2}</strong> ➔ <strong>${verb.v3}</strong>. Bentuk yang tepat adalah <strong>${correct}</strong>.`
        };
      });
    }

    loadQuestion() {
      this.answered = false;
      this.render();
    }

    render() {
      const q = this.questions[this.currentIndex];
      this.container.innerHTML = `
        <div class="game-wrapper animate-fade-in">
          <div class="game-top-bar">
            <button id="btn-back-to-hub" class="btn-game-nav">⬅️ Menu Game</button>
            <div class="game-info-badge"><span class="badge-title">🧩 Lengkapi Kata Kerjanya</span><span class="badge-round">Soal ${this.currentIndex + 1} / ${this.totalQuestions}</span></div>
            <div class="game-score-badge"><span class="score-icon">⭐</span><span class="score-num">${this.score} Poin</span></div>
          </div>
          <div class="complete-challenge-card">
            <div class="challenge-meaning-badge">Arti: <strong>${q.verb.meaning}</strong></div>
            <div class="complete-triplet-display">
              <div class="triplet-slot ${q.missing === 'v1' ? 'slot-missing' : 'slot-given'}"><span class="slot-type">Verb 1</span><span class="slot-word">${q.missing === 'v1' ? '❓' : q.verb.v1}</span></div>
              <span class="triplet-arrow">➔</span>
              <div class="triplet-slot ${q.missing === 'v2' ? 'slot-missing' : 'slot-given'}"><span class="slot-type">Verb 2</span><span class="slot-word">${q.missing === 'v2' ? '❓' : q.verb.v2}</span></div>
              <span class="triplet-arrow">➔</span>
              <div class="triplet-slot ${q.missing === 'v3' ? 'slot-missing' : 'slot-given'}"><span class="slot-type">Verb 3</span><span class="slot-word">${q.missing === 'v3' ? '❓' : q.verb.v3}</span></div>
            </div>
            <div class="challenge-prompt">Pilih bentuk kata kerja yang tepat untuk mengisi tanda <strong>❓</strong>:</div>
            <div class="complete-options-grid">
              ${q.options.map((opt, idx) => `
                <button class="btn-complete-option" data-option="${opt}">
                  <span class="option-letter">${['A','B','C','D'][idx]}</span>
                  <span class="option-text">${opt}</span>
                </button>
              `).join('')}
            </div>
            <div id="explanation-box" class="explanation-box hidden">
              <div class="exp-header"><span id="exp-icon" class="exp-icon"></span><h4 id="exp-title" class="exp-title"></h4></div>
              <p id="exp-text" class="exp-text"></p>
              <button id="btn-next-question" class="btn-next-action">Lanjut Soal Berikutnya ➔</button>
            </div>
          </div>
        </div>
      `;
      this.bindEvents();
    }

    handleAnswer(opt, btn) {
      if (this.answered) return;
      this.answered = true;
      const q = this.questions[this.currentIndex];
      const isCorrect = opt.toLowerCase() === q.correct.toLowerCase();
      this.container.querySelectorAll('.btn-complete-option').forEach(b => {
        b.disabled = true;
        if (b.getAttribute('data-option').toLowerCase() === q.correct.toLowerCase()) b.classList.add('correct');
        else if (b === btn && !isCorrect) b.classList.add('wrong');
      });
      const box = this.container.querySelector('#explanation-box');
      const icon = this.container.querySelector('#exp-icon');
      const title = this.container.querySelector('#exp-title');
      const text = this.container.querySelector('#exp-text');
      if (isCorrect) {
        sound.playCorrect();
        confetti.burst(40);
        this.score += 10;
        storage.addXP(20);
        icon.textContent = '🎉';
        title.textContent = 'Jawaban Tepat Sekali!';
        title.className = 'exp-title text-green';
      } else {
        sound.playWrong();
        icon.textContent = '💡';
        title.textContent = 'Jawaban Belum Tepat!';
        title.className = 'exp-title text-orange';
      }
      text.innerHTML = q.explanation;
      box.classList.remove('hidden');
      sound.speak(q.correct);
    }

    bindEvents() {
      const back = this.container.querySelector('#btn-back-to-hub');
      if (back) back.addEventListener('click', () => this.onBack && this.onBack());
      this.container.querySelectorAll('.btn-complete-option').forEach(btn => {
        btn.addEventListener('click', () => this.handleAnswer(btn.getAttribute('data-option'), btn));
      });
      const next = this.container.querySelector('#btn-next-question');
      if (next) {
        next.addEventListener('click', () => {
          this.currentIndex++;
          if (this.currentIndex < this.totalQuestions) this.loadQuestion();
          else this.renderGameOver();
        });
      }
    }

    renderGameOver() {
      sound.playWin();
      confetti.burst(100);
      storage.addXP(100);
      this.container.innerHTML = `
        <div class="game-result-card animate-scale-up">
          <div class="result-trophy">🌟</div>
          <h2 class="result-title">Tantangan Selesai!</h2>
          <p class="result-subtitle">Hebat! Kamu telah menyelesaikan 10 tantangan melengkapi kata kerja.</p>
          <div class="result-score-box">
            <div class="score-item"><span class="label">Skor Kamu</span><span class="value text-gold">${this.score} / 100</span></div>
            <div class="score-item"><span class="label">Bonus XP</span><span class="value text-purple">+100 XP</span></div>
          </div>
          <div class="result-actions">
            <button id="btn-replay-complete" class="btn-primary-action">🔄 Coba Lagi</button>
            <button id="btn-finish-complete" class="btn-secondary-action">⬅️ Menu Game</button>
          </div>
        </div>
      `;
      this.container.querySelector('#btn-replay-complete').addEventListener('click', () => this.start());
      this.container.querySelector('#btn-finish-complete').addEventListener('click', () => this.onBack && this.onBack());
    }
  }

  // ==========================================
  // 11. GAME 3: VERB HUNTER
  // ==========================================
  class GameHunterModule {
    constructor(containerId, onBack) {
      this.container = document.getElementById(containerId);
      this.onBack = onBack;
      this.timeLeft = 45;
      this.score = 0;
      this.multiplier = 1;
      this.streak = 0;
      this.timerInterval = null;
      this.currentTarget = null;
      this.isRunning = false;
    }

    start() {
      this.score = 0;
      this.streak = 0;
      this.multiplier = 1;
      this.timeLeft = 45;
      this.isRunning = true;
      this.render();
      this.newTarget();
      this.timerInterval = setInterval(() => {
        if (!this.isRunning) return;
        this.timeLeft--;
        const t = this.container.querySelector('#hunter-timer');
        if (t) t.textContent = `${this.timeLeft}s`;
        if (this.timeLeft <= 0) {
          clearInterval(this.timerInterval);
          this.isRunning = false;
          this.renderGameOver();
        }
      }, 1000);
    }

    newTarget() {
      if (!this.isRunning) return;
      const v = VERBS_DATA[Math.floor(Math.random() * VERBS_DATA.length)];
      const form = Math.random() > 0.5 ? 'v2' : 'v3';
      this.currentTarget = { v, form, targetWord: v[form] };
      const p = this.container.querySelector('#hunter-prompt');
      if (p) p.innerHTML = `Tangkap <strong>${form === 'v2' ? 'Verb 2 (Past)' : 'Verb 3 (Participle)'}</strong> dari: <span class="hunter-keyword">${v.v1}</span> (${v.meaning})`;
      this.spawnBubbles();
    }

    spawnBubbles() {
      const arena = this.container.querySelector('#hunter-arena');
      if (!arena) return;
      arena.innerHTML = '';
      const pool = new Set([this.currentTarget.targetWord]);
      while (pool.size < 5) {
        const rand = VERBS_DATA[Math.floor(Math.random() * VERBS_DATA.length)];
        pool.add(rand[Math.random() > 0.5 ? 'v2' : 'v3']);
      }
      Array.from(pool).sort(() => Math.random() - 0.5).forEach((w, idx) => {
        const b = document.createElement('div');
        const isTarget = w.toLowerCase() === this.currentTarget.targetWord.toLowerCase();
        b.className = `hunter-bubble color-${(idx % 5) + 1} animate-float`;
        b.style.left = `${10 + idx * 18}%`;
        b.style.top = `${20 + (idx % 2) * 35}%`;
        b.innerHTML = `<span class="bubble-word">${w}</span>`;
        b.addEventListener('click', () => {
          sound.playPop();
          if (isTarget) {
            sound.playCorrect();
            this.streak++;
            if (this.streak >= 3) this.multiplier = 2;
            this.score += 20 * this.multiplier;
            storage.addXP(15);
            const sc = this.container.querySelector('#hunter-score');
            if (sc) sc.textContent = `${this.score} Poin`;
            setTimeout(() => this.newTarget(), 400);
          } else {
            sound.playWrong();
            this.streak = 0;
            this.multiplier = 1;
            b.classList.add('animate-shake');
          }
        });
        arena.appendChild(b);
      });
    }

    render() {
      this.container.innerHTML = `
        <div class="game-wrapper hunter-game-wrapper animate-fade-in">
          <div class="game-top-bar">
            <button id="btn-back-to-hub" class="btn-game-nav">⬅️ Menu Game</button>
            <div class="hunter-stats-group">
              <div class="stat-badge timer-badge">⏱️ <span id="hunter-timer">${this.timeLeft}s</span></div>
              <div class="stat-badge score-badge">🎯 <span id="hunter-score">${this.score} Poin</span></div>
            </div>
          </div>
          <div class="hunter-mission-bar">
            <span class="mission-icon">🏹</span>
            <div id="hunter-prompt" class="mission-text">Menyiapkan target...</div>
          </div>
          <div id="hunter-arena" class="hunter-arena-field"></div>
        </div>
      `;
      this.container.querySelector('#btn-back-to-hub').addEventListener('click', () => {
        this.isRunning = false;
        clearInterval(this.timerInterval);
        this.onBack && this.onBack();
      });
    }

    renderGameOver() {
      sound.playWin();
      confetti.burst(90);
      storage.addXP(80);
      this.container.innerHTML = `
        <div class="game-result-card animate-scale-up">
          <div class="result-trophy">🏹</div>
          <h2 class="result-title">Waktu Habis! Perburuan Selesai!</h2>
          <div class="result-score-box">
            <div class="score-item"><span class="label">Total Skor</span><span class="value text-gold">${this.score} Poin</span></div>
            <div class="score-item"><span class="label">Bonus XP</span><span class="value text-purple">+80 XP</span></div>
          </div>
          <div class="result-actions">
            <button id="btn-replay-hunter" class="btn-primary-action">🔄 Buru Lagi</button>
            <button id="btn-finish-hunter" class="btn-secondary-action">⬅️ Menu Game</button>
          </div>
        </div>
      `;
      this.container.querySelector('#btn-replay-hunter').addEventListener('click', () => this.start());
      this.container.querySelector('#btn-finish-hunter').addEventListener('click', () => this.onBack && this.onBack());
    }
  }

  // ==========================================
  // 12. GAME 4: SENTENCE BUILDER
  // ==========================================
  class GameSentenceModule {
    constructor(containerId, onBack) {
      this.container = document.getElementById(containerId);
      this.onBack = onBack;
      this.totalPuzzles = 8;
      this.currentIndex = 0;
      this.score = 0;
      this.puzzles = [];
      this.placedWords = [];
      this.availableWords = [];
      this.isEvaluated = false;
    }

    start() {
      this.currentIndex = 0;
      this.score = 0;
      this.puzzles = [...SENTENCE_PUZZLES].sort(() => Math.random() - 0.5).slice(0, this.totalPuzzles);
      this.loadPuzzle();
    }

    loadPuzzle() {
      this.isEvaluated = false;
      this.placedWords = [];
      const p = this.puzzles[this.currentIndex];
      this.availableWords = p.scrambled.map((w, idx) => ({ id: `${w}_${idx}`, text: w }));
      this.render();
    }

    render() {
      const p = this.puzzles[this.currentIndex];
      this.container.innerHTML = `
        <div class="game-wrapper animate-fade-in">
          <div class="game-top-bar">
            <button id="btn-back-to-hub" class="btn-game-nav">⬅️ Menu Game</button>
            <div class="game-info-badge"><span class="badge-title">🧱 Susun Kalimat</span><span class="badge-round">Tantangan ${this.currentIndex + 1} / ${this.totalPuzzles}</span></div>
            <div class="game-score-badge"><span class="score-icon">⭐</span><span class="score-num">${this.score} Poin</span></div>
          </div>
          <div class="sentence-target-banner">
            <div class="target-meta"><span class="verb-form-tag">${p.verbForm}</span><span class="meaning-label">Arti: "${p.meaning}"</span></div>
            <p class="target-instruction">Sentuh kata di bawah untuk menyusun kalimat:</p>
          </div>
          <div class="sentence-drop-zone ${this.isEvaluated ? 'evaluated' : ''}">
            ${this.placedWords.length === 0 ? '<div class="drop-placeholder">Sentuh kata di bawah untuk diletakkan di sini...</div>' : `
              <div class="placed-words-list">
                ${this.placedWords.map((item, idx) => `<div class="word-chip placed-chip" data-idx="${idx}"><span class="chip-text">${item.text}</span><span class="chip-remove">✕</span></div>`).join('')}
              </div>
            `}
          </div>
          <div class="scrambled-words-bank">
            ${this.availableWords.map(item => `<button class="word-chip bank-chip" data-id="${item.id}" data-word="${item.text}">${item.text}</button>`).join('')}
          </div>
          <div class="sentence-actions-row">
            <button id="btn-reset-sent" class="btn-secondary-action">🔄 Reset</button>
            <button id="btn-check-sent" class="btn-primary-action" ${this.availableWords.length > 0 || this.isEvaluated ? 'disabled' : ''}>✅ Periksa</button>
          </div>
          <div id="sentence-feedback-card" class="sentence-feedback-card hidden">
            <div class="fb-sentence-target">Kalimat Benar: <strong>"${p.targetSentence}."</strong> <button id="btn-speak-sent" class="btn-speak-sentence-audio">🔊 Dengar</button></div>
            <p><strong>Penjelasan:</strong> ${p.explanation}</p>
            <button id="btn-next-sent" class="btn-next-action mt-3">Lanjut Tantangan ➔</button>
          </div>
        </div>
      `;
      this.bindEvents();
    }

    bindEvents() {
      const back = this.container.querySelector('#btn-back-to-hub');
      if (back) back.addEventListener('click', () => this.onBack && this.onBack());
      this.container.querySelectorAll('.bank-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          if (this.isEvaluated) return;
          sound.playClick();
          const id = chip.getAttribute('data-id');
          const text = chip.getAttribute('data-word');
          this.placedWords.push({ id, text });
          this.availableWords = this.availableWords.filter(w => w.id !== id);
          this.render();
        });
      });
      this.container.querySelectorAll('.placed-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          if (this.isEvaluated) return;
          sound.playClick();
          const idx = parseInt(chip.getAttribute('data-idx'), 10);
          const item = this.placedWords.splice(idx, 1)[0];
          this.availableWords.push(item);
          this.render();
        });
      });
      const rst = this.container.querySelector('#btn-reset-sent');
      if (rst) rst.addEventListener('click', () => this.loadPuzzle());
      const chk = this.container.querySelector('#btn-check-sent');
      if (chk) {
        chk.addEventListener('click', () => {
          this.isEvaluated = true;
          const p = this.puzzles[this.currentIndex];
          const ans = this.placedWords.map(w => w.text).join(' ');
          const isCorrect = ans.trim().toLowerCase() === p.targetSentence.trim().toLowerCase();
          const fb = this.container.querySelector('#sentence-feedback-card');
          if (isCorrect) {
            sound.playCorrect();
            confetti.burst(50);
            this.score += 25;
            storage.addXP(25);
          } else {
            sound.playWrong();
          }
          fb.classList.remove('hidden');
          sound.speak(p.targetSentence);
        });
      }
      const spk = this.container.querySelector('#btn-speak-sent');
      if (spk) spk.addEventListener('click', () => sound.speak(this.puzzles[this.currentIndex].targetSentence));
      const nxt = this.container.querySelector('#btn-next-sent');
      if (nxt) {
        nxt.addEventListener('click', () => {
          this.currentIndex++;
          if (this.currentIndex < this.totalPuzzles) this.loadPuzzle();
          else this.renderGameOver();
        });
      }
    }

    renderGameOver() {
      sound.playWin();
      confetti.burst(100);
      storage.addXP(100);
      this.container.innerHTML = `
        <div class="game-result-card animate-scale-up">
          <div class="result-trophy">🧱</div>
          <h2 class="result-title">Pakar Kalimat Hebat!</h2>
          <div class="result-score-box">
            <div class="score-item"><span class="label">Skor Kamu</span><span class="value text-gold">${this.score} Poin</span></div>
            <div class="score-item"><span class="label">Bonus XP</span><span class="value text-purple">+100 XP</span></div>
          </div>
          <div class="result-actions">
            <button id="btn-replay-sent" class="btn-primary-action">🔄 Susun Lagi</button>
            <button id="btn-finish-sent" class="btn-secondary-action">⬅️ Menu Game</button>
          </div>
        </div>
      `;
      this.container.querySelector('#btn-replay-sent').addEventListener('click', () => this.start());
      this.container.querySelector('#btn-finish-sent').addEventListener('click', () => this.onBack && this.onBack());
    }
  }

  // ==========================================
  // 13. GAME 5: MEMORY CARD
  // ==========================================
  class GameMemoryModule {
    constructor(containerId, onBack) {
      this.container = document.getElementById(containerId);
      this.onBack = onBack;
      this.difficulty = 'medium';
      this.cards = [];
      this.flippedCards = [];
      this.matchedCardIds = [];
      this.movesCount = 0;
      this.score = 0;
      this.isLockBoard = false;
    }

    start(difficulty = 'medium') {
      this.difficulty = difficulty;
      this.movesCount = 0;
      this.score = 0;
      this.flippedCards = [];
      this.matchedCardIds = [];
      this.isLockBoard = false;
      const pairCount = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
      const selected = [...VERBS_DATA].sort(() => Math.random() - 0.5).slice(0, pairCount);
      const list = [];
      selected.forEach(v => {
        const isRead = v.v1.toLowerCase() === 'read';
        list.push({ uid: `${v.id}_v1`, verbId: v.id, word: v.v1, speak: v.v1, label: 'Verb 1' });
        list.push({ uid: `${v.id}_v2`, verbId: v.id, word: v.v2, speak: isRead ? 'red' : v.v2, label: 'Verb 2' });
      });
      this.cards = list.sort(() => Math.random() - 0.5);
      this.render();
    }

    render() {
      this.container.innerHTML = `
        <div class="game-wrapper animate-fade-in">
          <div class="game-top-bar">
            <button id="btn-back-to-hub" class="btn-game-nav">⬅️ Menu Game</button>
            <div class="memory-meta-group">
              <div class="difficulty-picker">
                <button class="diff-btn ${this.difficulty === 'easy' ? 'active' : ''}" data-diff="easy">Mudah (4)</button>
                <button class="diff-btn ${this.difficulty === 'medium' ? 'active' : ''}" data-diff="medium">Sedang (6)</button>
                <button class="diff-btn ${this.difficulty === 'hard' ? 'active' : ''}" data-diff="hard">Sulit (8)</button>
              </div>
              <div class="stat-badge">Langkah: <strong>${this.movesCount}</strong></div>
            </div>
          </div>
          <div class="memory-grid grid-${this.difficulty}">
            ${this.cards.map((c, idx) => {
              const isFlipped = this.flippedCards.some(fc => fc.uid === c.uid);
              const isMatched = this.matchedCardIds.includes(c.uid);
              return `
                <div class="memory-card-wrap ${isFlipped || isMatched ? 'flipped' : ''} ${isMatched ? 'matched' : ''}" data-idx="${idx}">
                  <div class="memory-card-inner">
                    <div class="card-face card-back"><span class="back-logo">❓</span><span class="back-title">VERB</span></div>
                    <div class="card-face card-front front-v1"><span class="face-tag">${c.label}</span><span class="face-word">${c.word}</span></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
      this.bindEvents();
    }

    bindEvents() {
      const back = this.container.querySelector('#btn-back-to-hub');
      if (back) back.addEventListener('click', () => this.onBack && this.onBack());
      this.container.querySelectorAll('.diff-btn').forEach(b => {
        b.addEventListener('click', () => this.start(b.getAttribute('data-diff')));
      });
      this.container.querySelectorAll('.memory-card-wrap').forEach(el => {
        el.addEventListener('click', () => {
          if (this.isLockBoard) return;
          const idx = parseInt(el.getAttribute('data-idx'), 10);
          const c = this.cards[idx];
          if (this.flippedCards.some(fc => fc.uid === c.uid) || this.matchedCardIds.includes(c.uid)) return;
          sound.playClick();
          sound.speak(c.speak);
          this.flippedCards.push(c);
          this.render();
          if (this.flippedCards.length === 2) {
            this.movesCount++;
            this.isLockBoard = true;
            const [c1, c2] = this.flippedCards;
            if (c1.verbId === c2.verbId) {
              setTimeout(() => {
                sound.playCorrect();
                confetti.burst(30);
                this.matchedCardIds.push(c1.uid, c2.uid);
                this.flippedCards = [];
                this.isLockBoard = false;
                if (this.matchedCardIds.length === this.cards.length) this.renderGameOver();
                else this.render();
              }, 400);
            } else {
              setTimeout(() => {
                sound.playWrong();
                this.flippedCards = [];
                this.isLockBoard = false;
                this.render();
              }, 800);
            }
          }
        });
      });
    }

    renderGameOver() {
      sound.playWin();
      confetti.burst(100);
      storage.addXP(100);
      this.container.innerHTML = `
        <div class="game-result-card animate-scale-up">
          <div class="result-trophy">🧠</div>
          <h2 class="result-title">Daya Ingat Hebat!</h2>
          <div class="result-score-box">
            <div class="score-item"><span class="label">Total Langkah</span><span class="value text-gold">${this.movesCount}</span></div>
            <div class="score-item"><span class="label">Bonus XP</span><span class="value text-purple">+100 XP</span></div>
          </div>
          <div class="result-actions">
            <button id="btn-replay-mem" class="btn-primary-action">🔄 Buka Kartu Lagi</button>
            <button id="btn-finish-mem" class="btn-secondary-action">⬅️ Menu Game</button>
          </div>
        </div>
      `;
      this.container.querySelector('#btn-replay-mem').addEventListener('click', () => this.start(this.difficulty));
      this.container.querySelector('#btn-finish-mem').addEventListener('click', () => this.onBack && this.onBack());
    }
  }

  // ==========================================
  // 14. MODUL KUIS INTERAKTIF (SKOR 0-100)
  // ==========================================
  class QuizModule {
    constructor(containerId, onHome) {
      this.container = document.getElementById(containerId);
      this.onHome = onHome;
      this.questions = [];
      this.currentIndex = 0;
      this.correctCount = 0;
      this.wrongCount = 0;
      this.timerSeconds = 30;
      this.timeLeft = 30;
      this.timerInterval = null;
      this.isAnswered = false;
    }

    start() {
      const settings = storage.teacherSettings;
      const count = settings.quizQuestionCount || 15;
      this.timerSeconds = settings.quizTimerSeconds !== undefined ? settings.quizTimerSeconds : 30;
      this.questions = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, count);
      this.currentIndex = 0;
      this.correctCount = 0;
      this.wrongCount = 0;
      this.loadQuestion();
    }

    loadQuestion() {
      this.isAnswered = false;
      this.timeLeft = this.timerSeconds;
      this.render();
      if (this.timerSeconds > 0) {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
          this.timeLeft--;
          const t = this.container.querySelector('#quiz-timer-text');
          if (t) t.textContent = `${this.timeLeft}s`;
          if (this.timeLeft <= 0) {
            clearInterval(this.timerInterval);
            this.handleAnswer(-1, null);
          }
        }, 1000);
      }
    }

    render() {
      const q = this.questions[this.currentIndex];
      const pct = Math.round((this.currentIndex / this.questions.length) * 100);

      this.container.innerHTML = `
        <div class="quiz-container animate-fade-in">
          <div class="quiz-top-bar">
            <button id="btn-quiz-exit" class="btn-game-nav">⬅️ Keluar</button>
            <div class="quiz-progress-wrapper">
              <div class="quiz-progress-labels">
                <span>Soal <strong>${this.currentIndex + 1}</strong> / <strong>${this.questions.length}</strong></span>
                <span>Benar: <strong class="text-green">${this.correctCount}</strong> | Salah: <strong class="text-orange">${this.wrongCount}</strong></span>
              </div>
              <div class="progress-bar-track"><div class="progress-bar-fill" style="width: ${pct}%;"></div></div>
            </div>
            ${this.timerSeconds > 0 ? `<div class="quiz-timer-badge">⏱️ <span id="quiz-timer-text">${this.timeLeft}s</span></div>` : ''}
          </div>
          <div class="quiz-question-card">
            <h3 class="quiz-question-text">${q.question}</h3>
            <button class="btn-read-question" data-speak="${q.question}">🔊 Dengarkan Soal</button>
            <div class="quiz-options-list">
              ${q.options.map((opt, idx) => `
                <button class="btn-quiz-option" data-idx="${idx}">
                  <span class="option-badge">${['A','B','C','D'][idx]}</span>
                  <span class="option-label">${opt}</span>
                </button>
              `).join('')}
            </div>
            <div id="quiz-feedback-box" class="quiz-feedback-box hidden">
              <div class="fb-title-row"><span id="quiz-fb-icon" class="fb-icon"></span><h4 id="quiz-fb-title" class="fb-title"></h4></div>
              <p id="quiz-fb-explanation" class="fb-explanation-text"></p>
              <button id="btn-quiz-next" class="btn-next-action">${this.currentIndex + 1 === this.questions.length ? 'Lihat Hasil Akhir 🏆' : 'Soal Berikutnya ➔'}</button>
            </div>
          </div>
        </div>
      `;
      this.bindEvents();
    }

    handleAnswer(idx, btn) {
      if (this.isAnswered) return;
      this.isAnswered = true;
      if (this.timerInterval) clearInterval(this.timerInterval);

      const q = this.questions[this.currentIndex];
      const isCorrect = idx === q.correctIndex;
      this.container.querySelectorAll('.btn-quiz-option').forEach((b, i) => {
        b.disabled = true;
        if (i === q.correctIndex) b.classList.add('correct');
        else if (i === idx && !isCorrect) b.classList.add('wrong');
      });

      const box = this.container.querySelector('#quiz-feedback-box');
      const icon = this.container.querySelector('#quiz-fb-icon');
      const title = this.container.querySelector('#quiz-fb-title');
      const exp = this.container.querySelector('#quiz-fb-explanation');

      if (isCorrect) {
        sound.playCorrect();
        confetti.burst(40);
        this.correctCount++;
        storage.addXP(25);
        icon.textContent = '🎉';
        title.textContent = 'Jawaban Tepat!';
        title.className = 'fb-title text-green';
      } else {
        sound.playWrong();
        this.wrongCount++;
        icon.textContent = '💡';
        title.textContent = idx === -1 ? 'Waktu Habis!' : 'Belum Tepat!';
        title.className = 'fb-title text-orange';
      }

      exp.innerHTML = q.explanation;
      box.classList.remove('hidden');
    }

    bindEvents() {
      const exit = this.container.querySelector('#btn-quiz-exit');
      if (exit) exit.addEventListener('click', () => { if (confirm('Keluar dari kuis?')) this.onHome && this.onHome(); });
      this.container.querySelectorAll('.btn-quiz-option').forEach(btn => {
        btn.addEventListener('click', () => this.handleAnswer(parseInt(btn.getAttribute('data-idx'), 10), btn));
      });
      const speak = this.container.querySelector('.btn-read-question');
      if (speak) speak.addEventListener('click', () => sound.speak(speak.getAttribute('data-speak')));
      const next = this.container.querySelector('#btn-quiz-next');
      if (next) {
        next.addEventListener('click', () => {
          this.currentIndex++;
          if (this.currentIndex < this.questions.length) this.loadQuestion();
          else this.renderResult();
        });
      }
    }

    renderResult() {
      sound.playWin();
      confetti.burst(120);
      const total = this.questions.length;
      const score = Math.round((this.correctCount / total) * 100);
      let pred = score === 100 ? 'Sempurna! (Master Verb)' : score >= 80 ? 'Sangat Hebat!' : score >= 60 ? 'Bagus!' : 'Perlu Latihan';
      storage.saveQuizResult({
        studentName: storage.userData.name,
        score, correctCount: this.correctCount, wrongCount: this.wrongCount, totalQuestions: total, percentage: score, predicate: pred
      });
      storage.addXP(score);

      this.container.innerHTML = `
        <div class="quiz-result-container animate-scale-up">
          <div class="result-celebration-banner">
            <div class="badge-huge">🏆</div>
            <h2 class="result-greeting">Hasil Kuis Siswa</h2>
            <span class="predicate-tag">${pred}</span>
          </div>
          <div class="score-summary-grid">
            <div class="summary-card card-final-score"><span class="card-label">Nilai Akhir</span><span class="card-big-value">${score}</span><small>/ 100</small></div>
            <div class="summary-card"><span class="card-label">Benar</span><span class="card-big-value text-green">${this.correctCount}</span></div>
            <div class="summary-card"><span class="card-label">Salah</span><span class="card-big-value text-orange">${this.wrongCount}</span></div>
            <div class="summary-card"><span class="card-label">Persentase</span><span class="card-big-value text-blue">${score}%</span></div>
          </div>
          <div class="result-action-buttons">
            <button id="btn-replay-quiz" class="btn-primary-action">🔄 Ulangi Kuis</button>
            <button id="btn-home-quiz" class="btn-secondary-action">🏠 Menu Utama</button>
          </div>
        </div>
      `;
      this.container.querySelector('#btn-replay-quiz').addEventListener('click', () => this.start());
      this.container.querySelector('#btn-home-quiz').addEventListener('click', () => this.onHome && this.onHome());
    }
  }

  // ==========================================
  // 15. TEAM BATTLE (IFP CERDAS CERMAT)
  // ==========================================
  class TeamBattleModule {
    constructor(containerId, onHome) {
      this.container = document.getElementById(containerId);
      this.onHome = onHome;
      this.stage = 'setup';
      this.teamCount = 2;
      this.mode = 'buzzer';
      this.teams = [
        { id: 1, name: 'Tim Rajawali 🦅', score: 0, color: 'blue' },
        { id: 2, name: 'Tim Harimau 🐯', score: 0, color: 'orange' },
        { id: 3, name: 'Tim Garuda 🌟', score: 0, color: 'green' },
        { id: 4, name: 'Tim Singa 🦁', score: 0, color: 'red' }
      ];
      this.totalQuestions = 10;
      this.currentIndex = 0;
      this.currentTurnIdx = 0;
      this.activeBuzzerTeam = null;
      this.isAnswered = false;
    }

    start() {
      this.stage = 'setup';
      this.render();
    }

    initBattle() {
      this.stage = 'battle';
      this.currentIndex = 0;
      this.currentTurnIdx = 0;
      this.teams.forEach(t => t.score = 0);
      this.questions = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5).slice(0, this.totalQuestions);
      this.loadQuestion();
    }

    loadQuestion() {
      this.isAnswered = false;
      this.activeBuzzerTeam = null;
      this.render();
    }

    render() {
      if (this.stage === 'setup') {
        this.container.innerHTML = `
          <div class="team-setup-container animate-fade-in">
            <div class="setup-header"><span class="materi-badge">⚔️ IFP Group Challenge</span><h2 class="section-title">Team Battle: Cerdas Cermat Verb</h2></div>
            <div class="setup-card">
              <div class="setup-form-group">
                <label class="form-label">1. Pilih Jumlah Kelompok:</label>
                <div class="team-count-selector">
                  ${[2,3,4].map(n => `<button class="btn-team-count ${this.teamCount === n ? 'active' : ''}" data-count="${n}">${n} Kelompok</button>`).join('')}
                </div>
              </div>
              <div class="setup-form-group">
                <label class="form-label">2. Pilih Mode Permainan:</label>
                <div class="game-mode-selector">
                  <button class="btn-mode-choice ${this.mode === 'buzzer' ? 'active' : ''}" data-mode="buzzer"><span class="mode-icon">⚡</span><div><strong>Rebutan Cepat (Buzzer Bel)</strong><small>Sentuh tombol bel untuk menjawab!</small></div></button>
                  <button class="btn-mode-choice ${this.mode === 'turn' ? 'active' : ''}" data-mode="turn"><span class="mode-icon">🔄</span><div><strong>Bergantian (Turn-Based)</strong><small>Setiap tim mendapat giliran.</small></div></button>
                </div>
              </div>
              <div class="setup-action-row">
                <button id="btn-cancel-btl" class="btn-secondary-action">⬅️ Batal</button>
                <button id="btn-start-btl" class="btn-primary-action">🚀 Mulai Pertandingan!</button>
              </div>
            </div>
          </div>
        `;
        this.container.querySelectorAll('.btn-team-count').forEach(b => b.addEventListener('click', () => { this.teamCount = parseInt(b.getAttribute('data-count'), 10); this.render(); }));
        this.container.querySelectorAll('.btn-mode-choice').forEach(b => b.addEventListener('click', () => { this.mode = b.getAttribute('data-mode'); this.render(); }));
        this.container.querySelector('#btn-cancel-btl').addEventListener('click', () => this.onHome && this.onHome());
        this.container.querySelector('#btn-start-btl').addEventListener('click', () => this.initBattle());
      } else if (this.stage === 'battle') {
        const q = this.questions[this.currentIndex];
        const activeTeams = this.teams.slice(0, this.teamCount);
        this.container.innerHTML = `
          <div class="battle-arena-container animate-fade-in">
            <div class="battle-scoreboard-bar">
              <div class="scoreboard-teams-list">
                ${activeTeams.map((t, i) => `
                  <div class="scoreboard-team-box box-${t.color} ${this.activeBuzzerTeam && this.activeBuzzerTeam.id === t.id ? 'active-highlight' : ''}">
                    <span class="team-name">${t.name}</span>
                    <div class="team-score-counter">${t.score}</div>
                    <span class="team-points-label">POIN</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="battle-question-card">
              <h3 class="battle-question-text">${q.question}</h3>
              ${this.mode === 'buzzer' && !this.activeBuzzerTeam ? `
                <div class="buzzer-prompt-banner"><h4>🔔 Tekan Bel Tim Anda untuk Menjawab!</h4></div>
                <div class="buzzers-container">
                  ${activeTeams.map(t => `<button class="btn-giant-buzzer buzzer-${t.color}" data-team-id="${t.id}"><span class="buzzer-press-surface"><span class="buzzer-team-title">${t.name}</span><span class="buzzer-cta">TEKAN BEL! 🛎️</span></span></button>`).join('')}
                </div>
              ` : `
                <div class="battle-options-grid">
                  ${q.options.map((opt, i) => `<button class="btn-battle-option" data-idx="${i}"><span class="option-badge">${['A','B','C','D'][i]}</span><span class="option-text">${opt}</span></button>`).join('')}
                </div>
              `}
              <div id="battle-fb-box" class="quiz-feedback-box hidden">
                <div class="fb-title-row"><span id="battle-fb-icon" class="fb-icon"></span><h4 id="battle-fb-title" class="fb-title"></h4></div>
                <p id="battle-fb-text"></p>
                <button id="btn-next-btl-q" class="btn-next-action">${this.currentIndex + 1 === this.totalQuestions ? 'Lihat Pemenang 🏆' : 'Soal Berikutnya ➔'}</button>
              </div>
            </div>
          </div>
        `;
        this.container.querySelectorAll('.btn-giant-buzzer').forEach(b => {
          b.addEventListener('click', () => {
            sound.playBuzzer();
            this.activeBuzzerTeam = this.teams.find(t => t.id === parseInt(b.getAttribute('data-team-id'), 10));
            this.render();
          });
        });
        this.container.querySelectorAll('.btn-battle-option').forEach(b => {
          b.addEventListener('click', () => {
            if (this.isAnswered) return;
            this.isAnswered = true;
            const idx = parseInt(b.getAttribute('data-idx'), 10);
            const isCorrect = idx === q.correctIndex;
            const curTeam = this.mode === 'buzzer' ? this.activeBuzzerTeam : this.teams[this.currentTurnIdx];
            if (isCorrect) {
              sound.playCorrect();
              confetti.burst(60);
              curTeam.score += 100;
            } else {
              sound.playWrong();
            }
            const box = this.container.querySelector('#battle-fb-box');
            const icon = this.container.querySelector('#battle-fb-icon');
            const title = this.container.querySelector('#battle-fb-title');
            const text = this.container.querySelector('#battle-fb-text');
            icon.textContent = isCorrect ? '🎉' : '⚠️';
            title.textContent = isCorrect ? `BENAR! +100 Poin untuk ${curTeam.name}!` : `Kurang tepat untuk ${curTeam.name}`;
            title.className = isCorrect ? 'fb-title text-green' : 'fb-title text-orange';
            text.innerHTML = `<strong>Kunci:</strong> ${q.options[q.correctIndex]}<br>${q.explanation}`;
            box.classList.remove('hidden');
          });
        });
        const nxt = this.container.querySelector('#btn-next-btl-q');
        if (nxt) {
          nxt.addEventListener('click', () => {
            this.currentIndex++;
            if (this.currentIndex < this.totalQuestions) {
              if (this.mode === 'turn') this.currentTurnIdx = (this.currentTurnIdx + 1) % this.teamCount;
              this.loadQuestion();
            } else {
              this.renderResult();
            }
          });
        }
      }
    }

    renderResult() {
      sound.playWin();
      confetti.burst(150);
      const activeTeams = this.teams.slice(0, this.teamCount).sort((a,b) => b.score - a.score);
      const winner = activeTeams[0];
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
          <div class="result-actions mt-6">
            <button id="btn-replay-battle" class="btn-primary-action">🔄 Tanding Ulang</button>
            <button id="btn-home-battle" class="btn-secondary-action">🏠 Menu Utama</button>
          </div>
        </div>
      `;
      this.container.querySelector('#btn-replay-battle').addEventListener('click', () => this.initBattle());
      this.container.querySelector('#btn-home-battle').addEventListener('click', () => this.onHome && this.onHome());
    }
  }

  // ==========================================
  // 16. DASHBOARD GURU & SETTINGS
  // ==========================================
  class DashboardModule {
    constructor(containerId, onHome) {
      this.container = document.getElementById(containerId);
      this.onHome = onHome;
      this.activeTab = 'settings';
    }

    render() {
      const s = storage.teacherSettings;
      const logs = storage.quizHistory;
      this.container.innerHTML = `
        <div class="dashboard-container animate-fade-in">
          <div class="dashboard-header">
            <div class="dash-title-group">
              <span class="materi-badge">⚙️ Pusat Kontrol Pendidik</span>
              <h2 class="section-title">Dashboard Guru & Pengaturan Kelas</h2>
            </div>
            <button id="btn-dash-back" class="btn-game-nav">🏠 Menu Utama</button>
          </div>
          <div class="dash-tabs-nav">
            <button class="dash-tab-btn ${this.activeTab === 'settings' ? 'active' : ''}" data-tab="settings">⚙️ Pengaturan</button>
            <button class="dash-tab-btn ${this.activeTab === 'logs' ? 'active' : ''}" data-tab="logs">📊 Rekap Nilai Siswa (${logs.length})</button>
          </div>
          <div class="dash-tab-content">
            ${this.activeTab === 'settings' ? `
              <div class="settings-card">
                <div class="settings-grid">
                  <div class="setting-item">
                    <label class="setting-label">Jumlah Soal Kuis:</label>
                    <select id="set-quiz-count" class="setting-select">
                      <option value="5" ${s.quizQuestionCount === 5 ? 'selected' : ''}>5 Soal</option>
                      <option value="10" ${s.quizQuestionCount === 10 ? 'selected' : ''}>10 Soal</option>
                      <option value="15" ${s.quizQuestionCount === 15 ? 'selected' : ''}>15 Soal</option>
                      <option value="20" ${s.quizQuestionCount === 20 ? 'selected' : ''}>20 Soal</option>
                    </select>
                  </div>
                  <div class="setting-item">
                    <label class="setting-label">Durasi Waktu:</label>
                    <select id="set-timer" class="setting-select">
                      <option value="0" ${s.quizTimerSeconds === 0 ? 'selected' : ''}>Tanpa Waktu</option>
                      <option value="15" ${s.quizTimerSeconds === 15 ? 'selected' : ''}>15 Detik</option>
                      <option value="30" ${s.quizTimerSeconds === 30 ? 'selected' : ''}>30 Detik</option>
                      <option value="60" ${s.quizTimerSeconds === 60 ? 'selected' : ''}>60 Detik</option>
                    </select>
                  </div>
                </div>
                <div class="danger-zone-box mt-6">
                  <p>Reset seluruh data riwayat skor dan pencapaian siswa:</p>
                  <button id="btn-reset-data" class="btn-danger-action">⚠️ Reset Semua Data</button>
                </div>
              </div>
            ` : `
              <div class="logs-container">
                <div class="logs-toolbar">
                  <span>Total <strong>${logs.length}</strong> catatan kuis</span>
                  <button id="btn-export-csv" class="btn-primary-action">📥 Unduh CSV / Excel</button>
                </div>
                <div class="logs-table-wrapper">
                  <table class="logs-table">
                    <thead><tr><th>No</th><th>Tanggal</th><th>Nama Siswa</th><th>Nilai</th><th>Benar</th><th>Predikat</th></tr></thead>
                    <tbody>
                      ${logs.map((item, i) => `
                        <tr><td>${i+1}</td><td>${item.date}</td><td>${item.studentName}</td><td><strong>${item.score}</strong></td><td>${item.correctCount}/${item.totalQuestions}</td><td>${item.predicate}</td></tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            `}
          </div>
        </div>
      `;
      this.bindEvents();
    }

    bindEvents() {
      const back = this.container.querySelector('#btn-dash-back');
      if (back) back.addEventListener('click', () => this.onHome && this.onHome());
      this.container.querySelectorAll('.dash-tab-btn').forEach(b => {
        b.addEventListener('click', () => { sound.playClick(); this.activeTab = b.getAttribute('data-tab'); this.render(); });
      });
      const cnt = this.container.querySelector('#set-quiz-count');
      if (cnt) cnt.addEventListener('change', (e) => storage.updateTeacherSettings({ quizQuestionCount: parseInt(e.target.value, 10) }));
      const tmr = this.container.querySelector('#set-timer');
      if (tmr) tmr.addEventListener('change', (e) => storage.updateTeacherSettings({ quizTimerSeconds: parseInt(e.target.value, 10) }));
      const rst = this.container.querySelector('#btn-reset-data');
      if (rst) rst.addEventListener('click', () => { if (confirm('Hapus seluruh riwayat skor siswa?')) { storage.resetAllData(); alert('Data berhasil di-reset!'); this.render(); } });
      const exp = this.container.querySelector('#btn-export-csv');
      if (exp) {
        exp.addEventListener('click', () => {
          const csv = storage.exportQuizToCSV();
          if (csv) {
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `rekap_nilai_verb_adventure_${Date.now()}.csv`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          } else alert('Belum ada nilai untuk diekspor!');
        });
      }
    }
  }

  // ==========================================
  // 17. MAIN APP CONTROLLER
  // ==========================================
  class App {
    constructor() {
      this.mainContainer = document.getElementById('app-main-content');
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
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
      }
    }

    renderHeader() {
      const header = document.getElementById('app-header');
      if (!header) return;
      const lvl = storage.getCurrentLevel();
      const nxt = storage.getNextLevelInfo();

      header.innerHTML = `
        <div class="top-nav-bar">
          <div class="nav-brand" id="brand-logo-btn">
            <span class="brand-mascot">🎒</span>
            <div class="brand-titles">
              <h1 class="brand-name">ENGLISH VERB ADVENTURE</h1>
              <span class="brand-tagline">Belajar Verb 1, 2, & 3 dengan Menyenangkan!</span>
            </div>
          </div>
          <div class="nav-player-level-badge" id="player-level-badge">
            <div class="level-icon-wrap">${lvl.icon}</div>
            <div class="level-info-col">
              <div class="level-name-row"><span class="level-title">Lv.${lvl.level} ${lvl.name}</span><span class="xp-count">${storage.userData.xp} XP</span></div>
              <div class="xp-mini-track"><div class="xp-mini-fill" style="width: ${nxt.progress}%;"></div></div>
            </div>
          </div>
          <div class="nav-quick-actions">
            <button id="btn-global-home" class="btn-nav-action"><span class="icon">🏠</span><span class="btn-text">Beranda</span></button>
            <button id="btn-global-bgm" class="btn-nav-action ${sound.bgmEnabled ? 'active' : ''}"><span class="icon">${sound.bgmEnabled ? '🎵' : '🔇'}</span><span class="btn-text">Musik</span></button>
            <button id="btn-global-sfx" class="btn-nav-action ${sound.sfxEnabled ? 'active' : ''}"><span class="icon">${sound.sfxEnabled ? '🔊' : '🔈'}</span><span class="btn-text">Suara</span></button>
            <button id="btn-global-fullscreen" class="btn-nav-action"><span class="icon">${document.fullscreenElement ? '🗗' : '⛶'}</span><span class="btn-text">Layar Penuh</span></button>
          </div>
        </div>
      `;
      this.bindHeaderEvents();
    }

    bindHeaderEvents() {
      const brand = document.getElementById('brand-logo-btn');
      if (brand) brand.addEventListener('click', () => { sound.playClick(); this.navigate('home'); });
      const home = document.getElementById('btn-global-home');
      if (home) home.addEventListener('click', () => { sound.playClick(); this.navigate('home'); });
      const bgm = document.getElementById('btn-global-bgm');
      if (bgm) bgm.addEventListener('click', () => { sound.playClick(); sound.toggleBGM(); this.renderHeader(); });
      const sfx = document.getElementById('btn-global-sfx');
      if (sfx) sfx.addEventListener('click', () => { sound.playClick(); sound.toggleSFX(); this.renderHeader(); });
      const fs = document.getElementById('btn-global-fullscreen');
      if (fs) {
        fs.addEventListener('click', () => {
          sound.playClick();
          if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
          else if (document.exitFullscreen) document.exitFullscreen();
          setTimeout(() => this.renderHeader(), 200);
        });
      }
    }

    navigate(view) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      switch(view) {
        case 'home': this.renderHome(); break;
        case 'materi': this.materiModule.render(); break;
        case 'dictionary': this.dictModule.render(); break;
        case 'games-hub': this.showGameHub(); break;
        case 'game-match': this.gameMatchModule.start(); break;
        case 'game-complete': this.gameCompleteModule.start(); break;
        case 'game-hunter': this.gameHunterModule.start(); break;
        case 'game-sentence': this.gameSentenceModule.start(); break;
        case 'game-memory': this.gameMemoryModule.start(); break;
        case 'quiz': this.quizModule.start(); break;
        case 'team-battle': this.teamBattleModule.start(); break;
        case 'guide': this.renderGuide(); break;
        case 'dashboard': this.dashboardModule.render(); break;
        default: this.renderHome();
      }
      this.renderHeader();
    }

    renderHome() {
      this.mainContainer.innerHTML = `
        <div class="home-screen-container animate-fade-in">
          <div class="home-hero-card">
            <div class="hero-content">
              <span class="hero-tag">🌟 Petualangan Belajar Bahasa Inggris</span>
              <h2 class="hero-main-title">ENGLISH VERB ADVENTURE</h2>
              <p class="hero-description">Kuasai <strong>Verb 1</strong> (Bentuk Dasar), <strong>Verb 2</strong> (Bentuk Lampau), dan <strong>Verb 3</strong> (Past Participle) melalui permainan seru di layar sentuh!</p>
              <div class="hero-action-buttons">
                <button class="btn-hero-primary" id="btn-hero-materi">📘 Mulai Belajar</button>
                <button class="btn-hero-secondary" id="btn-hero-games">🎮 Game Challenge</button>
              </div>
            </div>
            <div class="hero-mascot-wrapper">
              <div class="mascot-figure animate-bounce-slow">
                <span class="mascot-emoji">🤠</span>
                <div class="mascot-badge">Halo, Petualang! 👋</div>
              </div>
            </div>
          </div>
          <div class="home-main-menu-grid">
            <div class="menu-card card-materi" id="card-materi"><div class="card-icon-circle bg-blue">📘</div><div class="card-info"><h3>Materi Pembelajaran</h3><p>Pahami konsep Verb 1, 2, 3, dan Regular vs Irregular Verb.</p></div><span class="card-arrow-pill">Buka Modul ➔</span></div>
            <div class="menu-card card-dictionary" id="card-dict"><div class="card-icon-circle bg-green">📖</div><div class="card-info"><h3>Kamus Kata Kerja</h3><p>Jelajahi 66+ kata kerja lengkap dengan audio pengucapan.</p></div><span class="card-arrow-pill">Buka Kamus ➔</span></div>
            <div class="menu-card card-games" id="card-games"><div class="card-icon-circle bg-orange">🎮</div><div class="card-info"><h3>Game Challenge</h3><p>5 jenis permainan seru: Pasangkan Kata, Lengkapi Verb, dll.</p></div><span class="card-arrow-pill">Pilih Game ➔</span></div>
            <div class="menu-card card-quiz" id="card-quiz"><div class="card-icon-circle bg-purple">📝</div><div class="card-info"><h3>Kuis Interaktif</h3><p>Bank soal acak, skor instan 0-100, timer, & sertifikat.</p></div><span class="card-arrow-pill">Mulai Kuis ➔</span></div>
            <div class="menu-card card-battle" id="card-battle"><div class="card-icon-circle bg-red">⚔️</div><div class="card-info"><h3>Team Battle (Kelompok)</h3><p>Mode cerdas cermat 2-4 kelompok dengan bel rebutan (Buzzer)!</p></div><span class="card-arrow-pill">Mulai Tanding ➔</span></div>
            <div class="menu-card card-guide" id="card-guide"><div class="card-icon-circle bg-yellow">💡</div><div class="card-info"><h3>Panduan Bermain</h3><p>Petunjuk penggunaan aplikasi bagi guru dan siswa.</p></div><span class="card-arrow-pill">Baca Panduan ➔</span></div>
          </div>
          <div class="home-bottom-bar">
            <button class="btn-dashboard-link" id="btn-dashboard-bottom">⚙️ Pengaturan & Dashboard Guru</button>
          </div>
        </div>
      `;
      const bind = (id, v) => { const el = document.getElementById(id); if (el) el.addEventListener('click', () => { sound.playClick(); this.navigate(v); }); };
      bind('btn-hero-materi', 'materi');
      bind('btn-hero-games', 'games-hub');
      bind('card-materi', 'materi');
      bind('card-dict', 'dictionary');
      bind('card-games', 'games-hub');
      bind('card-quiz', 'quiz');
      bind('card-battle', 'team-battle');
      bind('card-guide', 'guide');
      bind('btn-dashboard-bottom', 'dashboard');
    }

    showGameHub() {
      this.mainContainer.innerHTML = `
        <div class="games-hub-container animate-fade-in">
          <div class="hub-header">
            <span class="materi-badge">🎮 Arena Permainan Edukatif</span>
            <h2 class="section-title">Pilih Tantangan Game Kata Kerja</h2>
          </div>
          <div class="games-catalog-grid">
            <div class="game-hub-card card-theme-blue" id="hub-g1"><div class="hub-icon">🧩</div><h3>1. Pasangkan Kata Kerja!</h3><p>Pasangkan kartu Verb 1, Verb 2, dan Verb 3 yang sesuai.</p><button class="btn-play-game">Mainkan ➔</button></div>
            <div class="game-hub-card card-theme-green" id="hub-g2"><div class="hub-icon">🔍</div><h3>2. Lengkapi Kata Kerjanya!</h3><p>Tebak bagian kata kerja yang hilang (V1, V2, atau V3).</p><button class="btn-play-game">Mainkan ➔</button></div>
            <div class="game-hub-card card-theme-orange" id="hub-g3"><div class="hub-icon">🏹</div><h3>3. Pemburu Kata Kerja!</h3><p>Tangkap kata kerja target yang mengapung di layar!</p><button class="btn-play-game">Mainkan ➔</button></div>
            <div class="game-hub-card card-theme-purple" id="hub-g4"><div class="hub-icon">🧱</div><h3>4. Susun Kalimat!</h3><p>Susun kata acak menjadi kalimat yang utuh dan benar.</p><button class="btn-play-game">Mainkan ➔</button></div>
            <div class="game-hub-card card-theme-pink" id="hub-g5"><div class="hub-icon">🃏</div><h3>5. Kartu Memori Kata Kerja!</h3><p>Buka kartu dan cocokkan pasangan kata kerja!</p><button class="btn-play-game">Mainkan ➔</button></div>
          </div>
          <div class="hub-bottom-actions">
            <button id="btn-back-hub" class="btn-secondary-action">⬅️ Kembali ke Beranda</button>
          </div>
        </div>
      `;
      const bind = (id, v) => { const el = document.getElementById(id); if (el) el.addEventListener('click', () => { sound.playClick(); this.navigate(v); }); };
      bind('hub-g1', 'game-match');
      bind('hub-g2', 'game-complete');
      bind('hub-g3', 'game-hunter');
      bind('hub-g4', 'game-sentence');
      bind('hub-g5', 'game-memory');
      const b = document.getElementById('btn-back-hub');
      if (b) b.addEventListener('click', () => this.navigate('home'));
    }

    renderGuide() {
      this.mainContainer.innerHTML = `
        <div class="guide-container animate-fade-in">
          <div class="guide-header"><span class="materi-badge">💡 Panduan Pembelajaran</span><h2 class="section-title">Panduan Bermain & Penggunaan IFP</h2></div>
          <div class="guide-content-cards">
            <div class="guide-card"><div class="guide-card-icon">🖥️</div><div class="guide-card-body"><h4>1. Optimal untuk Papan Interaktif (IFP)</h4><p>Gunakan mode <strong>Layar Penuh (Fullscreen)</strong>. Semua tombol berukuran besar untuk sentuhan jari langsung.</p></div></div>
            <div class="guide-card"><div class="guide-card-icon">🔊</div><div class="guide-card-body"><h4>2. Audio Pengucapan (Web Speech API)</h4><p>Setiap kata kerja dapat didengar lafal aslinya. Khusus 'Read', otomatis diucapkan /riːd/ untuk V1 dan /red/ untuk V2 & V3.</p></div></div>
            <div class="guide-card"><div class="guide-card-icon">👥</div><div class="guide-card-body"><h4>3. Team Battle</h4><p>Bagi siswa menjadi 2-4 kelompok untuk cerdas cermat dengan bel rebutan cepat di depan kelas.</p></div></div>
          </div>
          <div class="guide-action-row"><button id="btn-guide-back" class="btn-primary-action">🏠 Menu Utama</button></div>
        </div>
      `;
      document.getElementById('btn-guide-back').addEventListener('click', () => this.navigate('home'));
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
  });
})();
