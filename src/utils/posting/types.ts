
export interface UserPostingStats {
  jobPostCount: number;
  salonPostCount: number;
  boothPostCount: number;
  supplyPostCount: number;
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
}
