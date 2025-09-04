/**
 * iOS PWA Crash Prevention: Capability Detection
 * 
 * Detects WebSocket availability and secure context to prevent crashes
 * on iOS Safari, PWAs, and in-app webviews where WebSockets may be blocked.
 */

export const isSecure = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for secure context (https or localhost)
  return window.isSecureContext === true;
};

export const hasWS = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check if WebSocket constructor exists
  return 'WebSocket' in window;
};

export const inWebView = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  const ua = navigator.userAgent || '';
  
  // Detect various in-app webviews and social media browsers
  // These environments often block WebSockets for security
  return /FB_IAB|FBAN|Instagram|Line|Twitter|TikTok|WebView|wv|GSA/i.test(ua);
};

export const isPWA = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Detect PWA standalone mode (iOS "Add to Home Screen")
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone === true;
  
  return isStandalone;
};

export const isIOSDevice = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  
  const ua = navigator.userAgent || '';
  return /iPad|iPhone|iPod/.test(ua);
};

/**
 * Comprehensive check for WebSocket safety
 * Returns true only if WebSockets are likely to work without crashes
 */
export const isWebSocketSafe = (): boolean => {
  // Must have secure context and WebSocket support
  if (!isSecure() || !hasWS()) {
    return false;
  }
  
  // iOS PWAs and webviews are known to have WebSocket issues
  if (isIOSDevice() && (isPWA() || inWebView())) {
    return false;
  }
  
  // Additional safety: avoid WebSockets in known problematic environments
  if (inWebView()) {
    return false;
  }
  
  return true;
};

/**
 * Development environment detection
 * Dev environments can use different protocols safely
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

/**
 * Get diagnostic info for troubleshooting (dev only)
 */
export const getDiagnosticInfo = () => {
  if (!isDevelopment()) return null;
  
  return {
    isSecure: isSecure(),
    hasWebSocket: hasWS(),
    inWebView: inWebView(),
    isPWA: isPWA(),
    isIOSDevice: isIOSDevice(),
    isWebSocketSafe: isWebSocketSafe(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
    protocol: typeof location !== 'undefined' ? location.protocol : 'N/A'
  };
};