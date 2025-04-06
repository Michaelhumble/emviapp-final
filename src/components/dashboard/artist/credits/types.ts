
export interface ArtistCreditsRedemptionProps {
  credits?: number;
}

export interface CreditOption {
  id: string;
  title: string;
  description: string;
  creditCost: number;
  icon: React.ReactNode;
  duration?: string; // Added duration as optional property
  isDisabled?: boolean;
  actionText?: string;
  comingSoon?: boolean;
}

export interface BoostStatus {
  isActive: boolean;
  expiresAt: string | null;
  daysRemaining?: number;
}

export interface BoostStatusBannerProps {
  isActive: boolean;
  expiresAt: string | null;
  daysRemaining?: number;
}

export interface RedeemActions {
  [key: string]: boolean;
}

export interface ProfileBoostHook {
  boostStatus: BoostStatus;
  setBoostStatus: React.Dispatch<React.SetStateAction<BoostStatus>>;
  activateBoost: (days: number) => Promise<boolean>;
  checkBoostStatus: () => Promise<{ isActive: boolean; daysRemaining: number }>;
  isBoostLoading: boolean;
}

export interface CreditRedemptionHook {
  isProcessing: { [key: string]: boolean };
  redeemSuccess: { [key: string]: boolean };
  handleRedeemAction: (action: string, requiredCredits: number, actionType: string) => Promise<void>;
  redeemCredits: (action: string, credits: number, days: number, actionType: string) => Promise<boolean>;
  isRedeeming: (action: string) => boolean;
}
