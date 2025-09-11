// PWA utilities for iOS and secure context management

export interface PWAInfo {
  isSecureContext: boolean;
  isStandalone: boolean;
  serviceWorkerSupported: boolean;
  serviceWorkerRegistered: boolean;
  serviceWorkerStatus?: string;
  cacheVersion?: string;
  manifestLoaded: boolean;
}

export interface TestResult {
  success: boolean;
  error?: string;
  latency?: number;
}

export class PWAManager {
  private registration: ServiceWorkerRegistration | null = null;

  // Initialize PWA features
  async init(): Promise<void> {
    if (window.isSecureContext && 'serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
          updateViaCache: 'none'
        });
        
        console.log('PWA: Service Worker registered:', this.registration);
        
        // Listen for updates
        this.registration.addEventListener('updatefound', () => {
          console.log('PWA: New version available');
          this.notifyUpdateAvailable();
        });
        
      } catch (error) {
        console.warn('PWA: Service Worker registration failed:', error);
      }
    }
  }

  // Force update the service worker
  async forceUpdate(): Promise<boolean> {
    if (!this.registration) return false;
    
    try {
      // Clear all caches first
      await this.clearAllCaches();
      
      // Update service worker
      await this.registration.update();
      
      // Skip waiting for new SW
      if (this.registration.waiting) {
        this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        return true;
      }
      
      // Reload the page
      window.location.reload();
      return true;
    } catch (error) {
      console.error('PWA: Force update failed:', error);
      return false;
    }
  }

  // Clear all caches
  async clearAllCaches(): Promise<void> {
    if (!('caches' in window)) return;
    
    try {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
      console.log('PWA: All caches cleared');
    } catch (error) {
      console.warn('PWA: Cache clear failed:', error);
    }
  }

  // Get current service worker version
  async getServiceWorkerVersion(): Promise<string | null> {
    if (!this.registration?.active) return null;
    
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.version || null);
      };
      
      this.registration!.active!.postMessage(
        { type: 'GET_VERSION' },
        [messageChannel.port2]
      );
      
      setTimeout(() => resolve(null), 1000);
    });
  }

  // Get comprehensive PWA info
  async getPWAInfo(): Promise<PWAInfo> {
    const manifestLoaded = await this.checkManifestLoaded();
    const cacheVersion = await this.getServiceWorkerVersion();
    
    // Check if running in standalone mode (iOS Safari)
    const isStandalone = (window.navigator as any).standalone || 
                        window.matchMedia('(display-mode: standalone)').matches;
    
    return {
      isSecureContext: window.isSecureContext,
      isStandalone,
      serviceWorkerSupported: 'serviceWorker' in navigator,
      serviceWorkerRegistered: !!this.registration,
      serviceWorkerStatus: this.registration?.active?.state,
      cacheVersion,
      manifestLoaded
    };
  }

  // Test WebSocket connection
  async testWebSocket(url: string): Promise<TestResult> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const timeout = setTimeout(() => {
        resolve({ success: false, error: 'Connection timeout' });
      }, 5000);

      try {
        const wsUrl = url.replace('http://', 'wss://').replace('https://', 'wss://');
        const ws = new WebSocket(wsUrl);
        
        ws.onopen = () => {
          clearTimeout(timeout);
          const latency = Date.now() - startTime;
          ws.close();
          resolve({ success: true, latency });
        };
        
        ws.onerror = (error) => {
          clearTimeout(timeout);
          resolve({ 
            success: false, 
            error: error instanceof Event ? 'WebSocket connection failed' : String(error)
          });
        };
        
      } catch (error) {
        clearTimeout(timeout);
        resolve({ success: false, error: String(error) });
      }
    });
  }

  // Test SSE connection
  async testSSE(url: string): Promise<TestResult> {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const timeout = setTimeout(() => {
        resolve({ success: false, error: 'Connection timeout' });
      }, 5000);

      try {
        const es = new EventSource(url);
        
        es.onopen = () => {
          clearTimeout(timeout);
          const latency = Date.now() - startTime;
          es.close();
          resolve({ success: true, latency });
        };
        
        es.onerror = () => {
          clearTimeout(timeout);
          es.close();
          resolve({ success: false, error: 'SSE connection failed' });
        };
        
      } catch (error) {
        clearTimeout(timeout);
        resolve({ success: false, error: String(error) });
      }
    });
  }

  // Test HTTP polling
  async testPolling(url: string): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });
      
      const latency = Date.now() - startTime;
      
      if (response.ok) {
        return { success: true, latency };
      } else {
        return { success: false, error: `HTTP ${response.status}` };
      }
      
    } catch (error) {
      return { success: false, error: String(error) };
    }
  }

  // Check if manifest is loaded
  private async checkManifestLoaded(): Promise<boolean> {
    try {
      const response = await fetch('/site.webmanifest');
      return response.ok;
    } catch {
      return false;
    }
  }

  // Notify when update is available
  private notifyUpdateAvailable(): void {
    // Dispatch custom event for UI to handle
    window.dispatchEvent(new CustomEvent('pwa-update-available'));
  }
}

// Default instance
export const pwaManager = new PWAManager();

// Auto-initialize PWA on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    pwaManager.init();
  });
}