
import { Scissors, Store, Briefcase, Users } from "lucide-react";
import { NavigationItem } from "../types";

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
