
export interface UserPostingStats {
  totalJobPosts: number;
  totalSalonPosts: number;
  totalBoothPosts: number;
  totalSupplyPosts: number;
  referralCount: number;
}

export interface PricingOptions {
  isNationwide?: boolean;
  isFirstPost?: boolean;
  hasActivePost?: boolean;
  bundleWithJobPost?: boolean;
  fastSalePackage?: boolean;
  isRenewal?: boolean;
  featuredPost?: boolean;
  showAtTop?: boolean;
}

export type PostType = 'job' | 'salon' | 'booth' | 'supply';
