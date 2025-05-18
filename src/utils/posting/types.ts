
export interface PricingOptions {
  selectedPricingTier: 'standard' | 'premium' | 'gold' | 'diamond' | 'free';
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
}

export interface UserPostingStats {
  jobPostCount: number;
  salonPostCount: number;
  boothPostCount: number;
  supplyPostCount: number;
}

export type IndustryType = 'nails' | 'hair' | 'lashes' | 'massage' | 'tattoo' | 'brows' | 'skincare' | 'barber' | 'makeup';
