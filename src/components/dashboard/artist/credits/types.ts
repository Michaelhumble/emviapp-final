
import { User } from '@supabase/supabase-js';

export interface CreditOption {
  id: string;
  title: string;
  description: string;
  creditCost: number;
  icon: React.ComponentType<any>;
  actionText: string;
  comingSoon?: boolean;
}

export interface BoostStatus {
  isActive: boolean;
  expiresAt: string | null;
}

export interface ArtistCreditsRedemptionProps {
  credits: number;
}
