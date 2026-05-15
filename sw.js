const cacheName = 'O Botão v2';

const assets = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './README.txt',
  './assets/icon.png',
  './assets/css/style.css', 
  './assets/js/script.js',  
  
  // Imagens da pasta assets/images
  './assets/images/icon-192.png',
  './assets/images/icon-512.jpg',
  './assets/images/pap-preview.jpg',
  './assets/images/perfil.jpg',
 

  
  // Páginas

];

// Instalação: Guarda os ficheiros na Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('App O Botão: A guardar ficheiros offline...');
      return cache.addAll(assets);
    })
  );
});

// Ativação: Limpa lixo de versões antigas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Serve os ficheiros da Cache se estiver offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
