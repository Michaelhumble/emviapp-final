
import { router } from '../routes';

// Map routes config to paths for validation
const getRoutePaths = () => {
  const routePaths = router.routes.map(route => route.path || '/');
  // Add explicit routes that might not be in the routes config
  const explicitRoutes = ['/dashboard/artist/booking-calendar', '/dashboard/artist/inbox'];
  return [...routePaths, ...explicitRoutes];
};

// Validate that a path exists in our routes configuration
export const validateRoute = (path: string): boolean => {
  const availableRoutes = getRoutePaths();
  return availableRoutes.includes(path) || availableRoutes.some(route => {
    // Handle dynamic routes with parameters
    if (route.includes(':')) {
      const regexPath = route.replace(/:[^\/]+/g, '[^/]+');
      const routeRegex = new RegExp(`^${regexPath}$`);
      return routeRegex.test(path);
    }
    return route === path;
  });
};

// Check if a path exists and provide fallback if it doesn't
export const getSafePath = (path: string, fallback: string = '/dashboard'): string => {
  return validateRoute(path) ? path : fallback;
};

// Get a human-readable name for the current route
export const getCurrentRouteName = (): string => {
  const currentPath = window.location.pathname;
  const matchingRoute = router.routes.find(route => {
    const routePath = route.path || '/';
    // Handle dynamic routes with parameters
    if (routePath.includes(':')) {
      const regexPath = routePath.replace(/:[^\/]+/g, '[^/]+');
      const routeRegex = new RegExp(`^${regexPath}$`);
      return routeRegex.test(currentPath);
    }
    return routePath === currentPath;
  });
  
  return matchingRoute?.path || 'Unknown Route';
};

// Find closest matching route for a 404 fallback suggestion
export const getClosestMatchingRoute = (path: string): string | null => {
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  
  const rootSegment = segments[0];
  const availableRoutes = getRoutePaths();
  
  // Try to find a route that starts with the same root segment
  const matchingRoute = availableRoutes.find(route => {
    const routeSegments = route.split('/').filter(Boolean);
    return routeSegments[0] === rootSegment;
  });
  
  return matchingRoute || null;
};

// Log route validation for debugging
export const logRouteValidation = (path: string): void => {
  const isValid = validateRoute(path);
  console.log(`Route ${path} is ${isValid ? 'valid' : 'invalid'}`);
};
