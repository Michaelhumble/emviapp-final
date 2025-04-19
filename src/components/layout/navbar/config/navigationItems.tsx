
import { LucideIcon, Users, Briefcase, Store, Scissors } from "lucide-react";

interface NavigationItem {
  title: string;
  path: string;
  icon?: LucideIcon;
  highlight?: boolean;
}

export const mainNavigationItems: NavigationItem[] = [
  {
    title: "Artists",
    path: "/artists",
    icon: Scissors,
  },
  {
    title: "Salons",
    path: "/salons",
    icon: Store,
  },
  {
    title: "Jobs",
    path: "/jobs",
    icon: Briefcase,
  },
  {
    title: "Community",
    path: "/freelancers",
    icon: Users,
  },
];
