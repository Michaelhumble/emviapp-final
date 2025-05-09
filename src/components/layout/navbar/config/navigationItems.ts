
export type NavigationItem = {
  label: string;
  path: string;
  vietnameseLabel?: string;
  visibleFor?: 'all' | 'guest' | 'user';
};

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Home',
    path: '/',
    vietnameseLabel: 'Trang chủ',
    visibleFor: 'all',
  },
  {
    label: 'Jobs',
    path: '/jobs',
    vietnameseLabel: 'Công việc',
    visibleFor: 'all',
  },
  {
    label: 'Salons',
    path: '/salons',
    vietnameseLabel: 'Tiệm Nail',
    visibleFor: 'all',
  },
  {
    label: 'Artists',
    path: '/artists',
    vietnameseLabel: 'Nghệ sĩ',
    visibleFor: 'all',
  },
  {
    label: 'About',
    path: '/about',
    vietnameseLabel: 'Giới thiệu',
    visibleFor: 'all',
  },
];

export const userNavigation: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    vietnameseLabel: 'Bảng điều khiển',
  },
  {
    label: 'Profile',
    path: '/profile',
    vietnameseLabel: 'Hồ sơ',
  },
  {
    label: 'Messages',
    path: '/messages',
    vietnameseLabel: 'Tin nhắn',
  },
  {
    label: 'Settings',
    path: '/settings',
    vietnameseLabel: 'Cài đặt',
  },
];
