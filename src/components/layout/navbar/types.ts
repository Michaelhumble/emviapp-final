
import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  label?: string;
  title?: string;
  path: string;
  isPrimary?: boolean;
  icon?: LucideIcon;
  highlight?: boolean;
}
