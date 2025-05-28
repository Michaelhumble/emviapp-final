export type SalonPricingTier = 'basic' | 'featured';

export interface SalonPricingOptions {
  selectedPricingTier: SalonPricingTier;
  durationMonths: number;
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
  durationMonths: number;
  subtotal: number;
  durationDiscount: number;
  autoRenewDiscount: number;
  addOns: {
    nationwide: number;
    fastSale: number;
    showAtTop: number;
    bundleWithJobPost: number;
  };
  discounts: {
    firstPost: number;
    bulk: number;
    autoRenewDiscount: number;
    durationDiscount: number;
  };
  totalPrice: number;
  finalPrice: number;
  discountAmount: number;
  discountPercentage: number;
  originalPrice: number;
  savingsAmount: number;
  savingsPercentage: number;
}

// UPDATED PRICING STRUCTURE WITH FOMO/SCARCITY
const SALON_PRICING_PLANS = {
  basic: {
    1: { price: 19.99, originalPrice: 29.99 },
    3: { price: 49.99, originalPrice: 89.97 },
    6: { price: 99.99, originalPrice: 179.94 },
    12: { price: 149.99, originalPrice: 359.88 }
  },
  featured: {
    1: { price: 29.99, originalPrice: 39.99 },
    3: { price: 59.99, originalPrice: 99.97 },
    6: { price: 109.99, originalPrice: 189.94 },
    12: { price: 159.99, originalPrice: 369.88 }
  }
};

// Duration options with Vietnamese-first labels
export const DURATION_OPTIONS = [
  {
    months: 1,
    label: '1 month / 1 tháng',
    days: 30,
    discount: 33
  },
  {
    months: 3,
    label: '3 months / 3 tháng',
    days: 90,
    discount: 44
  },
  {
    months: 6,
    label: '6 months / 6 tháng',
    days: 180,
    discount: 44
  },
  {
    months: 12,
    label: '12 months / 12 tháng',
    days: 365,
    discount: 58
  }
];

export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  const summary = getSalonPostPricingSummary(options);
  return summary.finalPrice;
};

export const getSalonPostPricingSummary = (options: SalonPricingOptions): SalonPricingSummary => {
  const tier = options.selectedPricingTier;
  const duration = options.durationMonths || 1;
  
  const pricingData = SALON_PRICING_PLANS[tier][duration as keyof typeof SALON_PRICING_PLANS[typeof tier]];
  
  if (!pricingData) {
    throw new Error(`Invalid pricing combination: ${tier} - ${duration} months`);
  }
  
  const finalPrice = pricingData.price;
  const originalPrice = pricingData.originalPrice;
  const savingsAmount = originalPrice - finalPrice;
  const savingsPercentage = Math.round((savingsAmount / originalPrice) * 100);
  
  // Add-ons (currently not used but kept for compatibility)
  const addOns = {
    nationwide: options.isNationwide ? 10 * duration : 0,
    fastSale: (options.fastSalePackage || options.featuredBoost) ? 20 * duration : 0,
    showAtTop: options.showAtTop ? 15 * duration : 0,
    bundleWithJobPost: options.bundleWithJobPost ? 15 * duration : 0,
  };

  const addOnsTotal = Object.values(addOns).reduce((sum, addon) => sum + addon, 0);
  
  // Discounts (currently not used but kept for compatibility)
  const discounts = {
    firstPost: options.isFirstPost ? finalPrice * 0.2 : 0,
    bulk: 0,
    autoRenewDiscount: 0,
    durationDiscount: 0
  };

  const totalDiscounts = Object.values(discounts).reduce((sum, discount) => sum + discount, 0);
  const totalPrice = finalPrice + addOnsTotal - totalDiscounts;

  return {
    basePrice: finalPrice,
    durationMonths: duration,
    subtotal: finalPrice,
    durationDiscount: 0,
    autoRenewDiscount: 0,
    addOns,
    discounts,
    totalPrice,
    finalPrice: totalPrice,
    discountAmount: savingsAmount,
    discountPercentage: savingsPercentage,
    originalPrice,
    savingsAmount,
    savingsPercentage
  };
};

export const validateSalonPricingOptions = (options: SalonPricingOptions): boolean => {
  return options.selectedPricingTier !== undefined && 
         ['basic', 'featured'].includes(options.selectedPricingTier) &&
         options.durationMonths > 0 &&
         [1, 3, 6, 12].includes(options.durationMonths);
};

export const getStripeSalonPriceId = (options: SalonPricingOptions): string => {
  // Return appropriate Stripe price ID based on options
  const tierPriceIds = {
    basic: 'price_salon_basic',
    featured: 'price_salon_featured'
  };
  
  return tierPriceIds[options.selectedPricingTier];
};
