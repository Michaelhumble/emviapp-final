
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

// Define these interfaces here since they're not properly exported from jobPricing.ts
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

export interface JobPricingTier {
  id: string;
  name: string;
  price: number;
  features: string[];
}

// Re-export from jobPricing.ts
export { jobPricingOptions } from './jobPricing';

// Export the JobDetailsSubmission type from types/job.ts
export type { JobDetailsSubmission, Job, PricingOptions as JobPricingOptions } from '@/types/job';
