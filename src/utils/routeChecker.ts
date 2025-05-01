
/**
 * Utility for logging and validating route access
 */

/**
 * Logs route access for analytics and debugging
 * @param path The current route path
 */
export const logRouteAccess = (path: string): void => {
  if (path) {
    console.info(`🧭 Route accessed: ${path}`);
    
    // Track assets on route change to help debug path issues
    if (typeof document !== 'undefined') {
      const scripts = document.querySelectorAll('script[src]');
      const styles = document.querySelectorAll('link[rel="stylesheet"]');
      
      if (scripts.length > 0 || styles.length > 0) {
        console.info(`📦 Assets loaded on route ${path}:`);
        scripts.forEach(script => console.info(`- Script: ${(script as HTMLScriptElement).src}`));
        styles.forEach(style => console.info(`- Style: ${(style as HTMLLinkElement).href}`));
      }
    }
  }
};

/**
 * Checks if a route is valid
 * @param path The route path to check
 * @returns boolean indicating if the route is valid
 */
export const isValidRoute = (path: string): boolean => {
  // Add route validation logic if needed
  return !!path;
};

/**
 * Checks if a route is in the list of known routes
 * @param path The route path to check
 * @param availableRoutes Array of available route paths
 * @returns boolean indicating if the route is known
 */
export const isKnownRoute = (path: string, availableRoutes: string[]): boolean => {
  return availableRoutes.includes(path);
};

/**
 * Gets a human-readable name for a route
 * @param path The route path
 * @returns A formatted name for the route
 */
export const getRouteName = (path: string): string => {
  // Strip trailing slash and leading slash
  const cleanPath = path.replace(/^\/*|\/*$/g, '');
  
  // Handle root path
  if (!cleanPath) return 'Home';
  
  // Convert kebab-case to Title Case
  return cleanPath
    .split('/')
    .pop()!
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export default { 
  logRouteAccess,
  isValidRoute,
  isKnownRoute,
  getRouteName
};
