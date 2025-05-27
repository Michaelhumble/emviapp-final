export type SalonPricingTier = 'basic' | 'standard' | 'featured';

export interface SalonPricingOptions {
  selectedPricingTier: SalonPricingTier;
  isNationwide: boolean;
  fastSalePackage: boolean;
  showAtTop: boolean;
  bundleWithJobPost: boolean;
  isFirstPost: boolean;
  durationMonths?: number;
  autoRenew?: boolean;
  featuredBoost?: boolean;
}

export const calculateSalonPostPrice = (options: SalonPricingOptions) => {
  const basePrice = getSalonBasePrice(options.selectedPricingTier);
  let totalPrice = basePrice;
  
  const addOns = {
    nationwide: 0,
    fastSale: 0,
    showAtTop: 0,
    bundleWithJobPost: 0,
    autoRenewDiscount: 0,
    discountAmount: 0
  };

  if (options.isNationwide) {
    addOns.nationwide = 10;
    totalPrice += 10;
  }

  if (options.fastSalePackage || options.featuredBoost) {
    addOns.fastSale = 20;
    totalPrice += 20;
  }

  if (options.showAtTop) {
    addOns.showAtTop = 15;
    totalPrice += 15;
  }

  if (options.bundleWithJobPost) {
    addOns.bundleWithJobPost = 15;
    totalPrice += 15;
  }

  // Apply duration discount if applicable
  if (options.durationMonths && options.durationMonths > 1) {
    let discountPercent = 0;
    if (options.durationMonths >= 12) {
      discountPercent = 20;
    } else if (options.durationMonths >= 6) {
      discountPercent = 15;
    } else if (options.durationMonths >= 3) {
      discountPercent = 10;
    }
    
    addOns.discountAmount = (totalPrice * discountPercent) / 100;
    totalPrice -= addOns.discountAmount;
  }

  // Apply auto-renew discount if applicable
  if (options.autoRenew && options.durationMonths === 1) {
    addOns.autoRenewDiscount = totalPrice * 0.05; // 5% discount
    totalPrice -= addOns.autoRenewDiscount;
  }

  return {
    basePrice,
    totalPrice,
    finalPrice: totalPrice,
    addOns,
    discountAmount: addOns.discountAmount,
    autoRenewDiscount: addOns.autoRenewDiscount
  };
};

const getSalonBasePrice = (tier: SalonPricingTier): number => {
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

export const getSalonPostPricingSummary = (options: SalonPricingOptions) => {
  return calculateSalonPostPrice(options);
};

export const validateSalonPricingOptions = (options: SalonPricingOptions): boolean => {
  return Boolean(options.selectedPricingTier);
};

export const getStripeSalonPriceId = (options: SalonPricingOptions): string => {
  // Return appropriate Stripe price ID based on options
  return `price_salon_${options.selectedPricingTier}`;
};
