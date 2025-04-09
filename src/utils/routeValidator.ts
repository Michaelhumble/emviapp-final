
import { isKnownRoute } from './routeChecker';
import routes from '../routes';

// Map routes config to paths for validation
const getRoutePaths = () => {
  return routes.map(route => route.path);
};

// Validate that a path exists in our routes configuration
export const validateRoute = (path: string): boolean => {
  const availableRoutes = getRoutePaths();
  return isKnownRoute(path, availableRoutes);
};

// Get a human-readable name for the current route
export const getCurrentRouteName = (): string => {
  const currentPath = window.location.pathname;
  const matchingRoute = routes.find(route => {
    // Handle dynamic routes with parameters
    if (route.path.includes(':')) {
      const regexPath = route.path.replace(/:[^\/]+/g, '[^/]+');
      const routeRegex = new RegExp(`^${regexPath}$`);
      return routeRegex.test(currentPath);
    }
    return route.path === currentPath;
  });
  
  return matchingRoute ? matchingRoute.path : 'Unknown Route';
};

// Log route validation for debugging
export const logRouteValidation = (path: string): void => {
  const isValid = validateRoute(path);
  console.log(`Route ${path} is ${isValid ? 'valid' : 'invalid'}`);
};
