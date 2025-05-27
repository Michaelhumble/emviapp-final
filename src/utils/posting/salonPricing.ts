
export type SalonPricingTier = 'basic' | 'standard' | 'featured';

export interface SalonPricingOptions {
  selectedPricingTier: SalonPricingTier;
  isNationwide?: boolean;
  fastSalePackage?: boolean;
  featuredBoost?: boolean;
  showAtTop?: boolean;
  bundleWithJobPost?: boolean;
  isFirstPost?: boolean;
  durationMonths?: number;
  autoRenew?: boolean;
}

export interface SalonPricingSummary {
  basePrice: number;
  addOns: {
    nationwide: number;
    fastSale: number;
    showAtTop: number;
    bundleWithJobPost: number;
  };
  discounts: {
    firstPost: number;
    bulk: number;
  };
  totalPrice: number;
}

const SALON_BASE_PRICES: Record<SalonPricingTier, number> = {
  basic: 19.99,
  standard: 24.99,
  featured: 39.99
};

export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  const basePrice = SALON_BASE_PRICES[options.selectedPricingTier];
  let totalPrice = basePrice;

  // Add-on pricing
  if (options.isNationwide) totalPrice += 10;
  if (options.fastSalePackage || options.featuredBoost) totalPrice += 20;
  if (options.showAtTop) totalPrice += 15;
  if (options.bundleWithJobPost) totalPrice += 15;

  // First post discount
  if (options.isFirstPost) {
    totalPrice *= 0.8; // 20% discount
  }

  return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places
};

export const getSalonPostPricingSummary = (options: SalonPricingOptions): SalonPricingSummary => {
  const basePrice = SALON_BASE_PRICES[options.selectedPricingTier];
  
  const addOns = {
    nationwide: options.isNationwide ? 10 : 0,
    fastSale: (options.fastSalePackage || options.featuredBoost) ? 20 : 0,
    showAtTop: options.showAtTop ? 15 : 0,
    bundleWithJobPost: options.bundleWithJobPost ? 15 : 0,
  };

  const discounts = {
    firstPost: options.isFirstPost ? basePrice * 0.2 : 0,
    bulk: 0 // Not implemented yet
  };

  const subtotal = basePrice + Object.values(addOns).reduce((sum, addon) => sum + addon, 0);
  const totalDiscounts = Object.values(discounts).reduce((sum, discount) => sum + discount, 0);
  const totalPrice = subtotal - totalDiscounts;

  return {
    basePrice,
    addOns,
    discounts,
    totalPrice: Math.round(totalPrice * 100) / 100
  };
};

export const validateSalonPricingOptions = (options: SalonPricingOptions): boolean => {
  return options.selectedPricingTier !== undefined && 
         Object.values(SALON_BASE_PRICES).includes(SALON_BASE_PRICES[options.selectedPricingTier]);
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
