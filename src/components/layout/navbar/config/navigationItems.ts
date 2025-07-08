
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
    title: "🚨 Post Job (TEST)",
    path: "/post-job-free",
    icon: Plus,
    vietnameseTitle: "Đăng công việc"
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
