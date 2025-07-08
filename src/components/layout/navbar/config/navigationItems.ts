
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

// Development/Testing navigation items - ONLY VISIBLE IN DEV MODE
export const testNavigationItems: NavigationItem[] = [
  {
    title: "🧪 Paid Job Test",
    path: "/post-job-paid-test",
    icon: Plus,
    highlight: true,
    vietnameseTitle: "🧪 Test Job trả phí"
  }
];

// Production navigation items - REAL PAID JOB POSTING
export const paidJobNavigationItems: NavigationItem[] = [
  {
    title: "Post Paid Job",
    path: "/post-job",
    icon: Plus,
    highlight: true,
    vietnameseTitle: "Đăng việc trả phí"
  }
];
