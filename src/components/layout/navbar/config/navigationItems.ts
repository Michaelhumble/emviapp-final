
export interface NavigationItem {
  path: string;
  label: string;
  isPrimary?: boolean;
}

export const mainNavigationItems: NavigationItem[] = [
  {
    path: "/salons",
    label: "Salons"
  },
  {
    path: "/artists",
    label: "Artists"
  },
  {
    path: "/jobs",
    label: "Jobs"
  },
  {
    path: "/pricing",
    label: "Pricing",
    isPrimary: true
  }
];
