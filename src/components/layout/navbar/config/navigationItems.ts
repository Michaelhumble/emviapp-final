
import { NavigationItem } from "../types";

export const mainNavigationItems: NavigationItem[] = [
  { label: "Home", path: "/", isPrimary: false },
  { label: "Artists", path: "/artists", isPrimary: false },
  { label: "Salons", path: "/salons", isPrimary: false },
  { label: "Jobs", path: "/jobs", isPrimary: false },
  { label: "Early Access", path: "/early-access-dashboard", isPrimary: true }
];
