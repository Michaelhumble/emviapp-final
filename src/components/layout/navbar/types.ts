
import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;
  label?: string; // Make label optional
  path: string;
  isPrimary?: boolean;
  icon?: LucideIcon;
  highlight?: boolean;
}
