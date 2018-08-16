const staticCacheName = 'txiriVita-v2';

self.addEventListener('install', function(event){
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache){
      return cache.addAll([
        // 'sw.js', // The service worker itself musn't be cached
        'css/styles.css',
        'cestas.html',
        'contacto.html',
        'index.html',
        'nosotros.html',
        'servicios.html',
        'img/arte_1280.jpg',
        'img/arte_360.jpg',
        'img/arte_640.jpg',
        'img/arte_800.jpg',
        'img/bonita_1280.png',
        'img/bonita_360.png',
        'img/bonita_640.png',
        'img/bonita_800.png',
        'img/cosmetica_1280.jpg',
        'img/cosmetica_360.jpg',
        'img/cosmetica_640.jpg',
        'img/cosmetica_800.jpg',
        'img/desayuno_1280.png',
        'img/desayuno_360.png',
        'img/desayuno_640.png',
        'img/desayuno_800.png',
        'img/dulce_1280.png',
        'img/dulce_360.png',
        'img/dulce_640.png',
        'img/dulce_800.png',
        'img/fruta_1280.jpg',
        'img/fruta_360.jpg',
        'img/fruta_640.jpg',
        'img/fruta_800.jpg',
        'img/granel_1280.jpg',
        'img/granel_360.jpg',
        'img/granel_640.jpg',
        'img/granel_800.jpg',
        'img/salada_1280.png',
        'img/salada_360.png',
        'img/salada_640.png',
        'img/salada_800.png',
        'img/logo-facebook.png',
        'img/logo-rgb.svg'
      ]);
    })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('txiriVita-v') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName){
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event){
  event.respondWith(
  
    caches.match(event.request).then(function(response){
      if (response){
        // console.log('Found ', event.request.url, ' in cache');
        return response;
      } 
      // else {console.log('NOT FOUND ', event.request.url, ' in cache'); }
      return fetch(event.request);
    })
  );
});
