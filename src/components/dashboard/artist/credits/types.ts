
import { LucideIcon } from "lucide-react";

export interface CreditOption {
  id: string;
  title: string;
  description: string;
  creditCost: number;
  icon: LucideIcon;
  actionText: string;
  comingSoon?: boolean;
}

export interface BoostStatus {
  isActive: boolean;
  expiresAt: string | null;
}
