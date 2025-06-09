
import { isKnownRoute } from './routeChecker';

// Available routes for validation
const availableRoutes = [
  '/',
  '/artists',
  '/salons', 
  '/jobs',
  '/community',
  '/about',
  '/contact',
  '/auth/signin',
  '/auth/signup',
  '/artist/:id',
  '/salon/:id',
  '/job/:id',
  '/salon-details/:id',
  '/dashboard',
  '/dashboard/artist',
  '/dashboard/customer',
  '/dashboard/salon',
  '/dashboard/owner',
  '/profile',
  '/profile/edit',
  '/post-job'
];

// Validate that a path exists in our routes configuration
export const validateRoute = (path: string): boolean => {
  return isKnownRoute(path, availableRoutes);
};

// Check if a path exists and provide fallback if it doesn't
export const getSafePath = (path: string, fallback: string = '/dashboard'): string => {
  return validateRoute(path) ? path : fallback;
};

// Get a human-readable name for the current route
export const getCurrentRouteName = (): string => {
  const currentPath = window.location.pathname;
  const matchingRoute = availableRoutes.find(route => {
    // Handle dynamic routes with parameters
    if (route.includes(':')) {
      const regexPath = route.replace(/:[^\/]+/g, '[^/]+');
      const routeRegex = new RegExp(`^${regexPath}$`);
      return routeRegex.test(currentPath);
    }
    return route === currentPath;
  });
  
  return matchingRoute ? matchingRoute : 'Unknown Route';
};

// Find closest matching route for a 404 fallback suggestion
export const getClosestMatchingRoute = (path: string): string | null => {
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 0) return null;
  
  const rootSegment = segments[0];
  
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
