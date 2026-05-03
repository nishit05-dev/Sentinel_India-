const CACHE_NAME = 'sentinel-india-v1';

// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
];

// Listener for the install event - pre-caches our assets list on service worker install.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(PRECACHE_ASSETS);
  })());
});

// Listener for the activate event - cleans up old caches.
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// Intercept fetch requests and serve from cache if available, falling back to network.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached response if found
      if (response) {
        return response;
      }
      
      // Otherwise, fetch from the network
      return fetch(event.request).then((networkResponse) => {
        // Cache the dynamically fetched resources (optional, remove if you only want pre-cached assets)
        if (event.request.method === 'GET' && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for offline mode if both cache and network fail
        // Optionally return a custom offline page here
        return new Response('You are offline. Please check your internet connection.', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      });
    })
  );
});
