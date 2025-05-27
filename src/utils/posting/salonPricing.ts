export type SalonPricingTier = 'basic' | 'standard' | 'featured';

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
}

const SALON_BASE_PRICES: Record<SalonPricingTier, number> = {
  basic: 19.99,
  standard: 24.99,
  featured: 39.99
};

// Duration options with Vietnamese-first labels
export const DURATION_OPTIONS = [
  {
    months: 1,
    label: '1 tháng / 1 month',
    days: 30,
    discount: 0
  },
  {
    months: 3,
    label: '3 tháng / 3 months',
    days: 90,
    discount: 7
  },
  {
    months: 6,
    label: '6 tháng / 6 months',
    days: 180,
    discount: 20
  },
  {
    months: 12,
    label: '12 tháng / 12 months',
    days: 365,
    discount: 17
  }
];

export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  const summary = getSalonPostPricingSummary(options);
  return summary.finalPrice;
};

export const getSalonPostPricingSummary = (options: SalonPricingOptions): SalonPricingSummary => {
  const basePrice = SALON_BASE_PRICES[options.selectedPricingTier];
  const durationMonths = options.durationMonths || 1;
  
  // Calculate subtotal before any discounts
  const subtotal = basePrice * durationMonths;
  
  // Duration discount based on selected duration
  const durationOption = DURATION_OPTIONS.find(d => d.months === durationMonths);
  const durationDiscountPercent = durationOption?.discount || 0;
  const durationDiscount = subtotal * (durationDiscountPercent / 100);
  
  // Auto-renew discount (5% additional)
  const autoRenewDiscountPercent = options.autoRenew ? 5 : 0;
  const autoRenewDiscount = subtotal * (autoRenewDiscountPercent / 100);
  
  // Add-ons
  const addOns = {
    nationwide: options.isNationwide ? 10 * durationMonths : 0,
    fastSale: (options.fastSalePackage || options.featuredBoost) ? 20 * durationMonths : 0,
    showAtTop: options.showAtTop ? 15 * durationMonths : 0,
    bundleWithJobPost: options.bundleWithJobPost ? 15 * durationMonths : 0,
  };

  const addOnsTotal = Object.values(addOns).reduce((sum, addon) => sum + addon, 0);
  
  // Other discounts
  const discounts = {
    firstPost: options.isFirstPost ? basePrice * 0.2 * durationMonths : 0,
    bulk: 0, // Not implemented yet
    autoRenewDiscount,
    durationDiscount
  };

  const totalDiscounts = Object.values(discounts).reduce((sum, discount) => sum + discount, 0);
  const totalPrice = subtotal + addOnsTotal;
  const finalPrice = totalPrice - totalDiscounts;
  const totalDiscountPercent = totalPrice > 0 ? Math.round((totalDiscounts / totalPrice) * 100) : 0;

  return {
    basePrice,
    durationMonths,
    subtotal,
    durationDiscount,
    autoRenewDiscount,
    addOns,
    discounts,
    totalPrice,
    finalPrice: Math.round(finalPrice * 100) / 100,
    discountAmount: totalDiscounts,
    discountPercentage: totalDiscountPercent
  };
};

export const validateSalonPricingOptions = (options: SalonPricingOptions): boolean => {
  return options.selectedPricingTier !== undefined && 
         Object.values(SALON_BASE_PRICES).includes(SALON_BASE_PRICES[options.selectedPricingTier]) &&
         options.durationMonths > 0;
};

export const getStripeSalonPriceId = (options: SalonPricingOptions): string => {
  // Return appropriate Stripe price ID based on options
  // This would map to actual Stripe price IDs in production
  const tierPriceIds = {
    basic: 'price_salon_basic',
    standard: 'price_salon_standard', 
    featured: 'price_salon_featured'
  };
  
  return tierPriceIds[options.selectedPricingTier];
};
