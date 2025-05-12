
export type PostType = 'job' | 'salon' | 'booth' | 'supply';

export interface UserPostingStats {
  hasPostedJobs?: boolean;
  totalPostCount?: number;
  isFirstTimeUser?: boolean;
  referralCredits?: number;
}

export interface JobPricingOption {
  id: string;
  name: string;
  price: number;
  wasPrice?: number;
  description: string;
  vietnameseDescription?: string;
  features: string[];
  tier: string;
  tag?: string;
  hidden?: boolean;
}

export interface PricingOptions {
  isFirstPost?: boolean;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  showAtTop?: boolean;
  isHotListing?: boolean;
  isUrgent?: boolean;
  bundleWithJobPost?: boolean;
  bundleWithSalonPost?: boolean;
  boostVisibility?: boolean;
  featuredListing?: boolean;
  extendedDuration?: boolean;
  hasReferrals?: boolean;
  isRenewal?: boolean;
  selectedPricingTier?: string;
  autoRenew?: boolean;
  durationMonths?: number;
}
