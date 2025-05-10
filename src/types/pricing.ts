
export interface DurationOption {
  months: number;
  label: string;
  vietnameseLabel: string;
  discount: number;
}

export interface DurationSelection {
  [pricingId: string]: number; // months
}

// New interface for maintaining consistent pricing calculations
export interface PricingWithDuration {
  basePricePerMonth: number;
  durationMonths: number;
  discountPercentage: number;
}

export interface PricingOptions {
  isFirstPost?: boolean;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  showAtTop?: boolean;
  isHotListing?: boolean;
  isUrgent?: boolean;
  bundleWithJobPost?: boolean;
  bundleWithSalonPost?: boolean;
  boostVisibility?: boolean;
  featuredListing?: boolean;
  extendedDuration?: boolean;
  hasReferrals?: boolean;
  isRenewal?: boolean;
  selectedPricingTier?: string;
  autoRenew?: boolean;
  durationMonths?: number;
}
