
export type PostType = 'job' | 'salon' | 'booth' | 'supply';

export interface PricingOptions {
  isHotListing: boolean;
  isNationwide: boolean;
  isUrgent: boolean;
  bundleWithJobPost: boolean;
  bundleWithSalonPost: boolean;
  boostVisibility: boolean;
  featuredListing: boolean;
  extendedDuration: boolean;
  // Additional properties that are being used
  isFirstPost?: boolean;
  isRenewal?: boolean;
  fastSalePackage?: boolean;
  showAtTop?: boolean;
  featuredPost?: boolean;
  hasReferrals?: boolean;
}

export interface UserPostingStats {
  jobPostCount: number;
  salonPostCount: number;
  boothPostCount: number;
  supplyPostCount: number;
  totalPostCount: number;
  hasReferrals: boolean;
}

export interface PricingItem {
  name: string;
  description: string;
  price: number;
  recommended?: boolean;
  default?: boolean;
}

export interface PostPricingOptions {
  basePrice: number;
  options: {
    isHotListing: PricingItem;
    isNationwide: PricingItem;
    isUrgent: PricingItem;
    bundleWithJobPost: PricingItem;
    bundleWithSalonPost: PricingItem;
    boostVisibility: PricingItem;
    featuredListing: PricingItem;
    extendedDuration: PricingItem;
  };
}
