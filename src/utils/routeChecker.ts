
/**
 * Utility to check and validate application routes
 */

// Log route access for debugging
export const logRouteAccess = (pathname: string) => {
  console.log(`Route accessed: ${pathname}`);
};

// Check if a route exists in our defined routes
export const isKnownRoute = (pathname: string, availableRoutes: string[]) => {
  const normalizedPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  
  // Handle dynamic routes with parameters
  const isDynamicRoute = availableRoutes.some(route => {
    // Convert route patterns like "/profile/:username" to regex
    if (route.includes(':')) {
      const routeRegex = new RegExp(
        `^${route.replace(/:[^\/]+/g, '[^/]+')}$`
      );
      return routeRegex.test(normalizedPath);
    }
    return false;
  });
  
  if (isDynamicRoute) return true;
  
  return availableRoutes.some(route => {
    const normalizedRoute = route.endsWith('/') ? route.slice(0, -1) : route;
    return normalizedRoute === normalizedPath || route === '*';
  });
};

// Get a user-friendly name for a route path
export const getRouteName = (path: string) => {
  if (path === '/') return 'Home';
  
  // Extract the last segment of the path
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return 'Unknown';
  
  const lastSegment = segments[segments.length - 1];
  return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
};
