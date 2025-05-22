
export interface NavigationItem {
  title: string;
  vietnameseTitle?: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  label?: string; // Added to fix TypeScript error
}
