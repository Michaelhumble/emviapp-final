
export type JobPricingTier = 'free' | 'gold' | 'premium' | 'diamond';

export type PostType = 'job' | 'salon' | 'booth' | 'supply';

export interface JobPricingOption {
  id: string;
  tier: JobPricingTier;
  name: string;
  price: number;
  wasPrice?: number;
  duration: number; // Always 30 days
  description: string;
  vietnameseDescription: string;
  features: string[];
  popular?: boolean;
  recommended?: boolean;
  limitedSpots?: string;
}

export interface PricingOptions {
  selectedPricingTier: JobPricingTier;
  autoRenew?: boolean;
  isNationwide?: boolean;
  isFirstPost?: boolean;
  showAtTop?: boolean;
  fastSalePackage?: boolean;
  jobPostBundle?: boolean;
}

export interface DurationOption {
  months: number;
  label: string;
  vietnameseLabel: string;
  discount: number;
  description: string;
}

// Waitlist functionality for Diamond tier
export interface DiamondWaitlistEntry {
  id: string;
  userId: string;
  industry: string;
  jobTitle: string;
  contactEmail: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'activated';
  estimatedWaitTime?: string;
}
