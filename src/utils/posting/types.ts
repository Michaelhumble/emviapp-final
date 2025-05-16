
import { JobPricingOption, JobPricingTier } from './jobPricing';

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

export { JobPricingOption, JobPricingTier };

// Export the JobDetailsSubmission type from types/job.ts
export type { JobDetailsSubmission } from '@/types/job';
