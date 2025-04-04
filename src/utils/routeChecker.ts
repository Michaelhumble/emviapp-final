
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

// Check if all required routes are properly defined
export const validateRequiredRoutes = (definedRoutes: string[]) => {
  const requiredRoutes = [
    '/', 
    '/jobs', 
    '/salons', 
    '/analysis', 
    '/auth/signin', 
    '/auth/signup',
    '/sign-in',
    '/sign-up'
  ];
  
  const missingRoutes = requiredRoutes.filter(
    route => !definedRoutes.includes(route)
  );
  
  return {
    isValid: missingRoutes.length === 0,
    missingRoutes
  };
};
