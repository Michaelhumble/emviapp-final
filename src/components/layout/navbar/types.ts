
import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  label: string;
  path: string;
  isPrimary?: boolean;
  title?: string;
  icon?: LucideIcon;
  highlight?: boolean;
}
