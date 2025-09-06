export function buildCanonicalUrl(path: string): string {
  // Always use https://www.emvi.app as the base
  const BASE_URL = 'https://www.emvi.app';
  
  // Remove query params and fragments from the path
  const cleanPath = path.split('?')[0].split('#')[0];
  
  // Ensure the path starts with /
  const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  
  return `${BASE_URL}${normalizedPath}`;
}