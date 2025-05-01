
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

export default { 
  logRouteAccess,
  isValidRoute
};
