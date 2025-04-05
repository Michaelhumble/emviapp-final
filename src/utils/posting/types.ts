
export interface PricingOptions {
  isHotListing: boolean;
  isNationwide: boolean;
  isUrgent: boolean;
  bundleWithJobPost: boolean;
  bundleWithSalonPost: boolean;
  boostVisibility: boolean;
  featuredListing: boolean;
  extendedDuration: boolean;
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
