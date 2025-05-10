
export type JobPricingTier = 'free' | 'basic' | 'premium' | 'featured';

export type PostType = 'job' | 'salon' | 'booth' | 'supply';

export interface JobPricingOption {
  id: string;
  name: string;
  tier: JobPricingTier;
  price: number;
  wasPrice?: number;
  description: string;
  vietnameseDescription?: string;
  features: string[];
  duration: number;
  tag?: string;
  popular?: boolean;
  note?: string;
  yearlyDiscountPrice?: number;
}

export interface UserPostingStats {
  jobPostCount: number;
  salonPostCount: number;
  featuredPostCount: number;
  boothPostCount?: number;
  supplyPostCount?: number;
  totalPostCount?: number;
  hasReferrals?: boolean;
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

// Re-export the type
export type { PricingOptions };
