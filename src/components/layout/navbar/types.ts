
// Define navigation item types
export interface NavigationItem {
  label: string;
  path: string;
  vietnameseLabel?: string;
  visibleFor?: 'all' | 'guest' | 'user';
}
