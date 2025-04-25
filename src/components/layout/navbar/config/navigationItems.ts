
import { Home, Briefcase, Store, Users, Activity, DollarSign, Gift, Award, Scissors } from "lucide-react";
import { NavigationItem } from "../types";

export const mainNavigationItems: NavigationItem[] = [
  { title: "Home", path: "/", isPrimary: false, icon: Home },
  { title: "Artists", path: "/artists", isPrimary: false, icon: Scissors },
  { title: "Salons", path: "/salons", isPrimary: false, icon: Store },
  { title: "Jobs", path: "/jobs", isPrimary: false, icon: Briefcase },
  { title: "Community", path: "/freelancers", isPrimary: false, icon: Users },
  { title: "Analysis", path: "/analysis", isPrimary: false, icon: Activity },
  { title: "Pricing", path: "/pricing", isPrimary: false, icon: DollarSign },
  { title: "Referral Program", path: "/referrals", isPrimary: false, icon: Gift },
  { title: "Early Access", path: "/early-access-dashboard", isPrimary: true, highlight: true, icon: Award }
];
