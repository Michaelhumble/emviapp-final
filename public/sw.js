// ============= EMVIAPP SERVICE WORKER - PERFORMANCE OPTIMIZATION =============
// Aggressive caching strategy for maximum performance

const CACHE_VERSION = 'v2025-10-27-icons';
const CACHE_NAME = `emviapp-${CACHE_VERSION}`;
const STATIC_CACHE = `emviapp-static-${CACHE_VERSION}`;
const IMAGE_CACHE = `emviapp-images-${CACHE_VERSION}`;
const API_CACHE = `emviapp-api-${CACHE_VERSION}`;
const PRESS_CACHE = 'press-logos-v4';

// Assets to cache immediately - EXCLUDING icons/manifest to force fresh fetch
const STATIC_ASSETS = [
  '/',
  // Icons and manifest excluded - let network fetch them fresh
  // Critical CSS and JS will be added by build process
];

// Image domains to cache
const IMAGE_DOMAINS = [
  'images.unsplash.com',
  'wwhqbjrhbajpabfdwnip.supabase.co',
  'emvi.app',
  'logo.clearbit.com'
];

// API endpoints to cache
const CACHEABLE_APIS = [
  '/rest/v1/jobs',
  '/rest/v1/profiles',
  '/rest/v1/salons'
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('SW: Installing service worker');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('SW: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('SW: Activating service worker');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && 
                cacheName !== STATIC_CACHE && 
                cacheName !== IMAGE_CACHE && 
                cacheName !== API_CACHE &&
                cacheName !== PRESS_CACHE) {
              console.log('SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (isPressLogoRequest(url)) {
    event.respondWith(handlePressLogoRequest(request));
  } else if (isImageRequest(url)) {
    event.respondWith(handleImageRequest(request));
  } else if (isAPIRequest(url)) {
    event.respondWith(handleAPIRequest(request));
  } else if (isStaticAsset(url)) {
    event.respondWith(handleStaticAsset(request));
  } else {
    event.respondWith(handleNavigationRequest(request));
  }
});

// Image request handler - cache first with fallback
async function handleImageRequest(request) {
  const cache = await caches.open(IMAGE_CACHE);
  
  try {
    // Try cache first
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Fetch and cache
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('SW: Image fetch failed:', error);
    // Return a fallback image if available
    return cache.match('/images/fallback.jpg') || new Response('', { status: 404 });
  }
}

// API request handler - network first with cache fallback
async function handleAPIRequest(request) {
  const cache = await caches.open(API_CACHE);
  
  try {
    // Try network first for fresh data
    const response = await fetch(request);
    if (response.ok) {
      // Cache successful responses
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('SW: API fetch failed, trying cache:', error);
    // Fallback to cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    // Return offline response
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Static asset handler - cache first
async function handleStaticAsset(request) {
  const cache = await caches.open(STATIC_CACHE);
  
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('SW: Static asset fetch failed:', error);
    return new Response('', { status: 404 });
  }
}

// Navigation handler - network first with cache fallback
async function handleNavigationRequest(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    console.log('SW: Navigation fetch failed:', error);
    // Return cached index.html for SPA routing
    const cache = await caches.open(STATIC_CACHE);
    return cache.match('/') || new Response('Offline', { status: 503 });
  }
}

// Press logo request handler - Stale While Revalidate for logos
async function handlePressLogoRequest(request) {
  const cache = await caches.open(PRESS_CACHE);
  
  try {
    // Try cache first (stale-while-revalidate)
    const cachedResponse = await cache.match(request);
    
    // Fetch in background to update cache
    const fetchPromise = fetch(request).then(response => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(() => null);
    
    // Return cached version immediately if available
    if (cachedResponse) {
      fetchPromise; // Update in background
      return cachedResponse;
    }
    
    // If no cache, wait for fetch
    const response = await fetchPromise;
    return response || new Response('', { status: 404 });
  } catch (error) {
    console.log('SW: Press logo fetch failed:', error);
    return new Response('', { status: 404 });
  }
}

// Utility functions
function isPressLogoRequest(url) {
  return url.origin === 'https://logo.clearbit.com' || 
         url.pathname.startsWith('/press/');
}

function isImageRequest(url) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'];
  return imageExtensions.some(ext => url.pathname.includes(ext)) ||
         IMAGE_DOMAINS.some(domain => url.hostname.includes(domain));
}

function isAPIRequest(url) {
  return CACHEABLE_APIS.some(api => url.pathname.includes(api)) ||
         url.hostname.includes('supabase.co');
}

function isStaticAsset(url) {
  const staticExtensions = ['.js', '.css', '.woff', '.woff2', '.ttf', '.eot'];
  return staticExtensions.some(ext => url.pathname.includes(ext));
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('SW: Background sync triggered');
    event.waitUntil(handleBackgroundSync());
  }
});

async function handleBackgroundSync() {
  // Handle offline form submissions, etc.
  console.log('SW: Handling background sync');
}

// Message handler for manual updates
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    }).then(() => {
      event.ports[0].postMessage({ cleared: true });
    });
  }
});