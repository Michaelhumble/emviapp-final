
export interface UserPostingStats {
  jobPostCount: number;
  salonPostCount: number;
  boothPostCount: number;
  supplyPostCount: number;
  totalPostCount?: number;
  hasReferrals?: boolean;
}

export interface PricingOptions {
  selectedPricingTier: string;
  isFirstPost?: boolean;
  isRenewal?: boolean;
  durationMonths?: number;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
  hasReferrals?: boolean;
  autoRenew?: boolean;
  isHotListing?: boolean;
}

export type PostType = 'job' | 'salon' | 'booth' | 'supply';

export interface JobPricingOption {
  id: string;
  name: string;
  price: number;
  wasPrice?: number;
  basePrice?: number;
  finalPrice?: number;
  description: string;
  vietnameseDescription?: string;
  tag?: string;
  popular?: boolean;
  discountPercentage?: number;
  features: string[];
  isFirstPost?: boolean;
  tier?: JobPricingTier;
  hidden?: boolean; // Add hidden property
}

export type JobPricingTier = 'free' | 'standard' | 'premium' | 'gold' | 'diamond';
