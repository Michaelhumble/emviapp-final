
// Simplified route validator to fix build errors
const availableRoutes = [
  '/',
  '/sign-in', 
  '/sign-up'
];

export const validateRoute = (path: string): boolean => {
  return availableRoutes.includes(path);
};

export const getSafePath = (path: string, fallback: string = '/'): string => {
  return validateRoute(path) ? path : fallback;
};

export const getCurrentRouteName = (): string => {
  const currentPath = window.location.pathname;
  return currentPath || 'Unknown Route';
};

export const getClosestMatchingRoute = (path: string): string | null => {
  return availableRoutes.find(route => route.includes(path.split('/')[1])) || null;
};

export const logRouteValidation = (path: string): void => {
  const isValid = validateRoute(path);
  console.log(`Route ${path} is ${isValid ? 'valid' : 'invalid'}`);
};
