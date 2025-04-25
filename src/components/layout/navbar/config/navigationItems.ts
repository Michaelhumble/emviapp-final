
import { Home, Briefcase, Store, Users, Activity, DollarSign, Gift, Award, Scissors } from "lucide-react";
import { NavigationItem } from "../types";

export const mainNavigationItems: NavigationItem[] = [
  { label: "Home", path: "/", isPrimary: false, icon: Home },
  { label: "Artists", path: "/artists", isPrimary: false, icon: Scissors },
  { label: "Salons", path: "/salons", isPrimary: false, icon: Store },
  { label: "Jobs", path: "/jobs", isPrimary: false, icon: Briefcase },
  { label: "Community", path: "/freelancers", isPrimary: false, icon: Users },
  { label: "Analysis", path: "/analysis", isPrimary: false, icon: Activity },
  { label: "Pricing", path: "/pricing", isPrimary: false, icon: DollarSign },
  { label: "Referral Program", path: "/referrals", isPrimary: false, icon: Gift },
  { label: "Early Access", path: "/early-access-dashboard", isPrimary: true, highlight: true, icon: Award }
];
