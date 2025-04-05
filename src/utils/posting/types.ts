
export type PostType = 'job' | 'salon' | 'booth' | 'supply';

export interface PricingOptions {
  isNationwide?: boolean;
  showAtTop?: boolean;
  fastSalePackage?: boolean;
  bundleWithJobPost?: boolean;
  bundleWithSalonPost?: boolean;  // Added this property
  isFirstPost?: boolean;
  isRenewal?: boolean;
  hasReferrals?: boolean;
  featuredPost?: boolean;
}

export interface UserPostingStats {
  jobPostCount: number;
  salonPostCount: number;
  boothPostCount: number;
  supplyPostCount: number;
  totalPosts: number;
  referralCount: number;
}
