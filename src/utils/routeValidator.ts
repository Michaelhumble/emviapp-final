
/**
 * Helper function to determine if a route is valid before navigation
 * This prevents breaks when navigating to routes that aren't defined
 */
export const validateRoute = (path: string): boolean => {
  // List of valid routes in the application
  const validRoutes = [
    '/',
    '/auth/signin',
    '/auth/signup',
    '/sign-in',
    '/sign-up',
    '/dashboard',
    '/dashboard/artist',
    '/dashboard/customer',
    '/dashboard/salon',
    '/dashboard/owner',
    '/dashboard/freelancer',
    '/dashboard/supplier',
    '/dashboard/other',
    '/profile',
    '/profile/edit',
    '/profile/view',
    '/profile/redirect',
    '/settings',
    '/welcome',
    '/artists',
    '/jobs',
    '/salons',
    '/sell-salon',
    '/salon-owners',
    '/customers',
    '/suppliers',
    '/freelancers',
    '/notifications'
  ];
  
  // Basic validation - check if the exact path exists
  if (validRoutes.includes(path)) {
    return true;
  }
  
  // Check for dynamic routes with parameters
  if (path.startsWith('/salons/')) {
    return true;
  }
  
  // Default to allowing navigation to main application routes
  return ['/dashboard', '/profile', '/settings'].includes(path);
};
