
/**
 * Utility functions for route checking
 */

/**
 * Check if a path is in the list of known routes
 */
export const isKnownRoute = (path: string, availableRoutes: string[]): boolean => {
  // Normalize paths for comparison
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  
  // Direct match
  if (availableRoutes.includes(normalizedPath)) {
    return true;
  }
  
  // Check for dynamic routes with parameters
  const isDynamicPath = availableRoutes.some(route => {
    // Check if route has parameters (indicated by : character)
    if (!route.includes(':')) return false;
    
    // Convert route pattern to regex pattern
    // e.g., '/user/:id' becomes '/user/[^/]+'
    const regexPattern = route.replace(/:[^/]+/g, '[^/]+');
    const routeRegex = new RegExp(`^${regexPattern}$`);
    
    return routeRegex.test(normalizedPath);
  });
  
  return isDynamicPath;
};

/**
 * Simple route caching for performance
 */
const routeCache = new Map<string, boolean>();

/**
 * Cached version of isKnownRoute
 */
export const isKnownRouteCached = (path: string, availableRoutes: string[]): boolean => {
  const cacheKey = `${path}:${availableRoutes.length}`;
  
  if (routeCache.has(cacheKey)) {
    return routeCache.get(cacheKey)!;
  }
  
  const result = isKnownRoute(path, availableRoutes);
  routeCache.set(cacheKey, result);
  
  return result;
};

/**
 * Clear route cache (useful when routes change)
 */
export const clearRouteCache = (): void => {
  routeCache.clear();
};
