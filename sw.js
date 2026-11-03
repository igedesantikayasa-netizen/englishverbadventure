// Service Worker untuk English Verb Adventure (PWA Offline Support)
const CACHE_NAME = 'eva-cache-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/bundle.js',
  './js/app.js',
  './js/data/verbs.js',
  './js/data/quiz-questions.js',
  './js/data/sentences.js',
  './js/modules/audio.js',
  './js/modules/confetti.js',
  './js/modules/storage.js',
  './js/modules/materi.js',
  './js/modules/dictionary.js',
  './js/modules/quiz.js',
  './js/modules/team-battle.js',
  './js/modules/dashboard.js',
  './js/modules/games/game1-match.js',
  './js/modules/games/game2-complete.js',
  './js/modules/games/game3-hunter.js',
  './js/modules/games/game4-sentence.js',
  './js/modules/games/game5-memory.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Fallback untuk offline
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
