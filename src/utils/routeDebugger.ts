
/**
 * Utility to debug routes and navigation
 */

export const debugRoutes = () => {
  const currentPath = window.location.pathname;
  console.log('Current route path:', currentPath);
  return currentPath;
};

export const logRouteTransition = (from: string, to: string) => {
  console.log(`Route transition: ${from} -> ${to}`);
};

export const checkRouteExistence = (routePath: string, routesConfig: any[]) => {
  const exists = routesConfig.some(route => route.path === routePath);
  console.log(`Route '${routePath}' exists in config: ${exists}`);
  return exists;
};
