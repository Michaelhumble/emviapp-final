
export interface UserPostingStats {
  jobPostCount: number;
  salonPostCount: number;
  boothPostCount: number;
  supplyPostCount: number;
  totalPostCount?: number;
  hasReferrals?: boolean;
}

export interface PaymentOptions {
  selectedPricingTier: string;
  priceDetails: PriceDetails;
  durationMonths: number;
  autoRenew: boolean;
  isFirstPost?: boolean;
}

export type PostType = 'job' | 'salon' | 'booth' | 'supply';

export type JobPricingTier = 'free' | 'standard' | 'premium' | 'gold' | 'diamond';
