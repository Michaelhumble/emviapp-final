
/**
 * Utility to handle redirects for non-existent routes
 */

// Map invalid routes to valid ones
const routeRedirectMap: Record<string, string> = {
  '/posting': '/create-listing',
  '/posts': '/create-listing',
  '/list': '/create-listing',
  '/opportunity': '/create-listing',
  '/booth': '/create-listing',
  '/post/job': '/create-listing',
  '/post/salon': '/create-listing',
  '/post/opportunity': '/create-listing'
};

/**
 * Check if a route should be redirected and return the correct route
 * @param path Current path to check
 * @returns Redirect path if needed, or null if no redirect needed
 */
export const getRedirectPath = (path: string): string | null => {
  // First check for exact match
  if (routeRedirectMap[path]) {
    console.log(`Redirecting from ${path} to ${routeRedirectMap[path]}`);
    return routeRedirectMap[path];
  }
  
  // Check if any redirect key is a prefix of the current path
  for (const [oldPath, newPath] of Object.entries(routeRedirectMap)) {
    if (path.startsWith(oldPath + '/')) {
      const suffixPath = path.substring(oldPath.length);
      const redirectPath = newPath + suffixPath;
      console.log(`Redirecting from ${path} to ${redirectPath}`);
      return redirectPath;
    }
  }
  
  // No redirect needed
  return null;
};

/**
 * Get safe fallback route for 404 errors
 * @param currentPath Current path that resulted in 404
 * @returns Appropriate fallback route based on context
 */
export const getSafeFallbackRoute = (currentPath: string): string => {
  // Determine appropriate fallback based on path prefix
  if (currentPath.includes('/salons/')) {
    return '/salons';
  } else if (currentPath.includes('/jobs/')) {
    return '/jobs';
  } else if (currentPath.includes('/artists/')) {
    return '/artists';
  } else if (currentPath.includes('/auth/')) {
    return '/auth/signin';
  }
  
  // Default fallback
  return '/';
};
