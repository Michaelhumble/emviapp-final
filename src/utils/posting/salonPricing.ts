
export type SalonPricingTier = 'basic' | 'standard' | 'featured';

export interface SalonPricingOptions {
  selectedPricingTier: SalonPricingTier;
  durationMonths?: number;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  featuredBoost?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
  isFirstPost?: boolean;
  autoRenew?: boolean;
}

export interface SalonPricingSummary {
  basePrice: number;
  totalPrice: number;
  finalPrice: number;
  addOns: {
    nationwide: number;
    fastSale: number;
    showAtTop: number;
    bundleWithJobPost: number;
    autoRenewDiscount: number;
    discountAmount: number;
  };
  discountAmount: number;
  autoRenewDiscount: number;
}

// Main function that returns a number (for backward compatibility)
export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  const summary = getSalonPostPricingSummary(options);
  return summary.finalPrice;
};

// Detailed function that returns full pricing breakdown
export const getSalonPostPricingSummary = (options: SalonPricingOptions): SalonPricingSummary => {
  const basePrice = getSalonBasePriceByTier(options.selectedPricingTier);
  
  let addOns = {
    nationwide: options.isNationwide ? 10 : 0,
    fastSale: options.fastSalePackage || options.featuredBoost ? 20 : 0,
    showAtTop: options.showAtTop ? 15 : 0,
    bundleWithJobPost: options.bundleWithJobPost ? 15 : 0,
    autoRenewDiscount: 0,
    discountAmount: 0
  };

  const totalPrice = basePrice + addOns.nationwide + addOns.fastSale + addOns.showAtTop + addOns.bundleWithJobPost;
  
  // Apply auto-renew discount if enabled
  if (options.autoRenew) {
    addOns.autoRenewDiscount = totalPrice * 0.1; // 10% discount
  }

  const discountAmount = addOns.autoRenewDiscount;
  const finalPrice = totalPrice - discountAmount;

  return {
    basePrice,
    totalPrice,
    finalPrice,
    addOns: {
      ...addOns,
      discountAmount
    },
    discountAmount,
    autoRenewDiscount: addOns.autoRenewDiscount
  };
};

const getSalonBasePriceByTier = (tier: SalonPricingTier): number => {
  switch (tier) {
    case 'basic':
      return 19.99;
    case 'standard':
      return 24.99;
    case 'featured':
      return 39.99;
    default:
      return 24.99;
  }
};

export const validateSalonPricingOptions = (options: SalonPricingOptions): boolean => {
  return !!(options.selectedPricingTier);
};

export const getStripeSalonPriceId = (options: SalonPricingOptions): string => {
  // Return appropriate Stripe price ID based on options
  return `salon_${options.selectedPricingTier}_${options.durationMonths || 1}m`;
};
