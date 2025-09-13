import { getBaseUrl } from '../getBaseUrl';

export function getAuthCallbackUrl() {
  // Use the existing base URL utility for consistent URL handling
  const baseUrl = getBaseUrl();
  const callbackUrl = `${baseUrl}/auth/callback`;
  
  // Log once for debugging (only in development)
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.search.includes('debug=true'))) {
    console.info(`🔗 Auth callbacks → ${callbackUrl}`);
  }
  
  return callbackUrl;
}