const CACHE_NAME = 'rapports-wilaya-v1';
const urlsToCache = [
  './',
  './index.html',
  './logo.png',
  './manifest.json'
];

// Installation du service worker et mise en cache des fichiers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Fichiers mis en cache avec succès');
        return cache.addAll(urlsToCache);
      })
  );
});

// Interception des requêtes pour fonctionner hors-ligne (Offline)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retourne le fichier en cache s'il existe, sinon le télécharge via le réseau
        return response || fetch(event.request);
      })
  );
});
