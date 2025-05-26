
// Route validation utility
export const validateRoute = (path: string): boolean => {
  const validPaths = [
    '/',
    '/jobs',
    '/artists',
    '/salon-owners',
    '/about',
    '/pricing',
    '/post-job',
    '/post-salon',
    '/profile',
    '/dashboard',
    '/sign-in',
    '/sign-up',
    '/messages',
    '/notifications',
    '/salons',
    '/sell-salon',
    '/explore',
    '/marketplace'
  ];

  return validPaths.includes(path) || path.startsWith('/artist/') || path.startsWith('/user/');
};

export const getRouteTitle = (path: string): string => {
  const routeTitles: Record<string, string> = {
    '/': 'Home',
    '/jobs': 'Jobs',
    '/artists': 'Artists',
    '/salon-owners': 'Salon Owners',
    '/about': 'About',
    '/pricing': 'Pricing',
    '/post-job': 'Post Job',
    '/post-salon': 'Post Salon',
    '/profile': 'Profile',
    '/dashboard': 'Dashboard',
    '/sign-in': 'Sign In',
    '/sign-up': 'Sign Up',
    '/messages': 'Messages',
    '/notifications': 'Notifications',
    '/salons': 'Salons',
    '/sell-salon': 'Sell Salon',
    '/explore': 'Explore',
    '/marketplace': 'Marketplace'
  };

  return routeTitles[path] || 'EmviApp';
};
