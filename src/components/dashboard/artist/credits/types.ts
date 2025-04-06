
export interface ArtistCreditsRedemptionProps {
  credits?: number;
}

export interface CreditOption {
  id: string;
  title: string;
  description: string;
  creditCost: number;
  icon: React.ReactNode;
  isDisabled?: boolean;
  actionText?: string;
  comingSoon?: boolean;
}

export interface BoostStatus {
  isActive: boolean;
  expiresAt: string | null;
}

export interface RedeemActions {
  [key: string]: boolean;
}
