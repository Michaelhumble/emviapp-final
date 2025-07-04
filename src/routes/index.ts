
// Route definitions for navigation and validation
export const routes = [
  { path: '/', name: 'Home' },
  { path: '/jobs', name: 'Jobs' },
  { path: '/artists', name: 'Artists' },
  { path: '/salons', name: 'Salons' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' },
  { path: '/post-job', name: 'Post Job' },
  { path: '/sell-salon', name: 'Sell Salon' },
  { path: '/auth/:mode', name: 'Auth' },
  { path: '/freelancers', name: 'Freelancers' },
  { path: '/pricing', name: 'Pricing' },
  { path: '/dashboard', name: 'Dashboard' },
  { path: '/dashboard/artist', name: 'Artist Dashboard' },
  { path: '/dashboard/customer', name: 'Customer Dashboard' },
  { path: '/dashboard/owner', name: 'Owner Dashboard' },
  { path: '/profile', name: 'Profile' }
];

export default routes;
