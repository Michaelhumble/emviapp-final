
export interface NavigationItem {
  title: string;
  vietnameseTitle?: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}
