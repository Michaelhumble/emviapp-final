
export type PostType = 'job' | 'salon' | 'booth';

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
  pricingTier?: string; // This will hold the tier from PRICING_TIERS
}

export interface PricingSummary {
  lineItems: string[];
  totalPrice: number;
  originalPrice?: number;
}
