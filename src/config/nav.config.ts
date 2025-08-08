// PROTECTED: Do not modify without explicit approval.

export type NavLocation = 'top' | 'drawer' | 'bottom';
export type NavRole = 'guest' | 'artist' | 'salon' | 'freelancer' | 'customer';

export interface NavItem {
  key: string;
  label: string;
  path: string;
  icon?: string; // lucide icon name, optional
  roles?: NavRole[];
  location?: NavLocation;
}

// Centralized navigation config used by Navbar (top) and MobileMenu (drawer)
// Do not change visual style in components; this only defines links.
export const NAV_ITEMS: NavItem[] = [
  { key: 'home', label: 'Home', path: '/', location: 'top' },
  { key: 'jobs', label: 'Jobs', path: '/jobs', location: 'top' },
  { key: 'salons', label: 'Salons', path: '/salons', location: 'top' },
  { key: 'artists', label: 'Artists', path: '/artists', location: 'top' },
  { key: 'booking', label: 'Book Services', path: '/booking-services', location: 'top' },
  { key: 'community', label: 'Community', path: '/community', location: 'top' },
  { key: 'blog', label: 'Blog', path: '/blog', location: 'top' },
  { key: 'about', label: 'About', path: '/about', location: 'top' },
  { key: 'contact', label: 'Contact', path: '/contact', location: 'top' },
  // Drawer-specific extras
  { key: 'dashboard', label: 'Dashboard', path: '/dashboard', roles: ['artist','salon','freelancer','customer'], location: 'drawer' },
  { key: 'postJob', label: 'Post a Job', path: '/post-job', location: 'drawer' },
  { key: 'sellSalon', label: 'Post Your Salon', path: '/sell-salon', location: 'drawer' },
];
