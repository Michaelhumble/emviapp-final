import { getBaseUrl, isProductionLike } from './getBaseUrl';

export function getAppOrigin(): string {
  // Use the new getBaseUrl utility for consistent URL handling
  const baseUrl = getBaseUrl();
  
  // Additional safety check for production-like environments
  if (isProductionLike() && baseUrl.includes('localhost')) {
    console.warn('⚠️ Localhost detected in production-like environment, using fallback');
    return 'https://www.emvi.app';
  }
  
  return baseUrl;
}
