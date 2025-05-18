
export interface PricingOptions {
  selectedPricingTier: JobPricingTier;
  durationMonths: number;
  isFirstPost?: boolean;
  autoRenew?: boolean;
  // Additional properties needed for other components
  isRenewal?: boolean;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
  hasReferrals?: boolean;
  // New upsell properties
  expertReview?: boolean;
  priorityPlacement?: boolean;
  extendedReach?: boolean;
}

export type PostType = 'job' | 'salon' | 'booth' | 'supply';

export type JobPricingTier = 'standard' | 'premium' | 'gold' | 'diamond' | 'free';

export interface JobPricingOption {
  id: string;
  name: string;
  price: number;
  wasPrice?: number;
  description: string;
  vietnameseDescription?: string;
  tag?: string;
  features?: string[];
  popular?: boolean;
  isFirstPost?: boolean;
  tier: JobPricingTier;
  // Properties for FOMO and UI
  primaryBenefit?: string;
  upsellText?: string;
  color?: string;
  recommended?: boolean;
  hidden?: boolean;
  annual?: boolean;
  limitedSpots?: string;
}

export interface UserPostingStats {
  jobPostCount: number;
  salonPostCount: number;
  boothPostCount: number;
  supplyPostCount: number;
}

export type IndustryType = 'nails' | 'hair' | 'lashes' | 'massage' | 'tattoo' | 'brows' | 'skincare' | 'barber' | 'makeup';
