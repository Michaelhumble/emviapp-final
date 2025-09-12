/**
 * Get the base URL for the application
 * Handles different environments (development, preview, production)
 * Never returns localhost for production-like domains
 */
export function getBaseUrl(): string {
  // Client-side: use window.location.origin
  if (typeof window !== 'undefined' && window.location?.origin) {
    const origin = window.location.origin;
    
    // Runtime guard: Never use localhost for production-like domains
    if (origin.includes('lovable.dev') || origin.includes('emvi.app')) {
      return origin;
    }
    
    // For localhost development, ensure we use the correct port
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return origin;
    }
    
    return origin;
  }
  
  // Server-side fallback: try environment variables
  const envOrigin = (import.meta as any)?.env?.VITE_PUBLIC_SITE_URL as string | undefined;
  if (envOrigin) {
    return envOrigin;
  }
  
  // Final fallback to production URL
  return 'https://www.emvi.app';
}

/**
 * Get auth callback URL with proper domain handling
 */
export function getAuthCallbackUrl(path: string = '/auth/callback'): string {
  const baseUrl = getBaseUrl();
  const callbackUrl = `${baseUrl}${path}`;
  
  // Log once for debugging (only in development)
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.search.includes('debug=true'))) {
    console.info(`🔗 Auth callbacks → ${callbackUrl}`);
  }
  
  return callbackUrl;
}

/**
 * Check if we're in a secure production-like environment
 */
export function isProductionLike(): boolean {
  if (typeof window === 'undefined') return false;
  
  const hostname = window.location.hostname;
  return hostname.includes('lovable.dev') || 
         hostname.includes('emvi.app') || 
         hostname.includes('vercel.app');
}