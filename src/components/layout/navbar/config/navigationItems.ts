
import { LucideIcon, Users, Briefcase, Store, Scissors, Home, Info, Phone, Plus } from "lucide-react";

export interface NavigationItem {
  title: string;
  path: string;
  icon?: LucideIcon;
  highlight?: boolean;
  vietnameseTitle?: string;
}

export const mainNavigationItems: NavigationItem[] = [
  {
    title: "Home",
    path: "/",
    icon: Home,
    vietnameseTitle: "Trang chủ"
  },
  {
    title: "Artists",
    path: "/artists",
    icon: Scissors,
    vietnameseTitle: "Nghệ sĩ"
  },
  {
    title: "Salons",
    path: "/salons",
    icon: Store,
    vietnameseTitle: "Tiệm Nail"
  },
  {
    title: "Jobs",
    path: "/jobs",
    icon: Briefcase,
    vietnameseTitle: "Công việc"
  },
  {
    title: "Community",
    path: "/freelancers",
    icon: Users,
    vietnameseTitle: "Cộng đồng"
  },
  {
    title: "About",
    path: "/about",
    icon: Info,
    vietnameseTitle: "Giới thiệu"
  },
  {
    title: "Contact",
    path: "/contact",
    icon: Phone,
    vietnameseTitle: "Liên hệ"
  }
];

// Development/Testing navigation items - REMOVED (now integrated into main form)
export const testNavigationItems: NavigationItem[] = [
  // All test navigation removed - paid job functionality now in main form
];

// Production navigation items - removed paid job posting link
export const paidJobNavigationItems: NavigationItem[] = [
  // Removed "Post Paid Job" - now integrated into main Post Job form
];
