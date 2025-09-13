/**
 * Service Worker Authentication Handler
 * Disables service worker on auth pages and clears caches
 */

export function isAuthPage(): boolean {
  if (typeof window === 'undefined') return false;
  return window.location.pathname.startsWith('/auth');
}

export function disableServiceWorkerOnAuth(): void {
  if (typeof window === 'undefined') return;
  
  const isAuth = isAuthPage();
  console.log(`[SW] disabledOnAuth=${isAuth}`);
  
  if (isAuth) {
    // Unregister service worker on auth pages
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
          console.log('[SW] Unregistered service worker on auth page');
        });
      });
      
      // Clear all caches
      if ('caches' in window) {
        caches.keys().then((cacheNames) => {
          Promise.all(
            cacheNames.map((cacheName) => {
              console.log('[SW] Clearing cache:', cacheName);
              return caches.delete(cacheName);
            })
          );
        });
      }
    }
  } else {
    // Register service worker on non-auth pages
    if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
      navigator.serviceWorker.register('/sw.js', { scope: '/' })
        .then((registration) => {
          console.log('[SW] Registered successfully:', registration);
        })
        .catch((error) => {
          console.error('[SW] Registration failed:', error);
        });
    }
  }
}

// Auto-run on page load
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', disableServiceWorkerOnAuth);
  // Also run immediately in case DOMContentLoaded already fired
  disableServiceWorkerOnAuth();
}