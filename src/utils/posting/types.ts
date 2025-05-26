
export type JobPricingTier = 'free' | 'gold' | 'premium' | 'diamond';

export type PostType = 'job' | 'salon' | 'booth' | 'supply';

export type IndustryType = 'nails' | 'hair' | 'lashes' | 'massage' | 'barber' | 'tattoo' | 'makeup' | 'spa' | 'esthetician' | 'booth-rental' | 'receptionist' | 'manager';

export interface UserPostingStats {
  totalPosts?: number;
  activePosts?: number;
  expiredPosts?: number;
  lastPostDate?: string;
  isFirstTimeUser?: boolean;
}

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
  hidden?: boolean;
  tag?: string;
  isFirstPost?: boolean;
  upsellText?: string;
}

export interface PricingOptions {
  selectedPricingTier: JobPricingTier;
  durationMonths?: number;
  autoRenew?: boolean;
  isNationwide?: boolean;
  isFirstPost?: boolean;
  showAtTop?: boolean;
  fastSalePackage?: boolean;
  jobPostBundle?: boolean;
  bundleWithJobPost?: boolean;
  isRenewal?: boolean;
  hasReferrals?: boolean;
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
