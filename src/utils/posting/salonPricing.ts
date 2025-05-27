
import { PricingOptions, JobPricingTier } from "./types";

export type SalonPricingTier = 'basic' | 'standard' | 'featured' | 'premium';

export interface SalonPricingOptions {
  selectedPricingTier: SalonPricingTier;
  durationMonths?: number;
  autoRenew?: boolean;
  isNationwide?: boolean;
  isFirstPost?: boolean;
  showAtTop?: boolean;
  fastSalePackage?: boolean;
  jobPostBundle?: boolean;
  bundleWithJobPost?: boolean;
  isRenewal?: boolean;
  hasReferrals?: boolean;
  featuredBoost?: boolean;
}

// Calculate salon posting price based on options
export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  let basePrice = 24.99; // Base salon posting price per month
  
  // Duration-based pricing
  const months = options.durationMonths || 1;
  let totalPrice = basePrice * months;
  
  // Duration discounts
  if (months >= 12) {
    totalPrice = 250; // Special 12-month price
  } else if (months >= 6) {
    totalPrice = 120; // Special 6-month price
  }
  
  // Featured boost add-on
  if (options.featuredBoost || options.fastSalePackage) {
    totalPrice += 25;
  }

  // Auto-renew discount (5% off)
  if (options.autoRenew) {
    totalPrice *= 0.95;
  }

  return Math.round(totalPrice * 100) / 100; // Round to 2 decimal places
};

export const getSalonPostPricingSummary = (options: SalonPricingOptions) => {
  const basePrice = 24.99;
  const months = options.durationMonths || 1;
  
  let monthlyPrice = basePrice;
  let originalPrice = monthlyPrice * months;
  let finalPrice = originalPrice;
  
  // Apply special pricing for longer durations
  if (months >= 12) {
    originalPrice = basePrice * 12;
    finalPrice = 250;
  } else if (months >= 6) {
    originalPrice = basePrice * 6;
    finalPrice = 120;
  }
  
  // Featured boost add-on
  let featuredCost = 0;
  if (options.featuredBoost || options.fastSalePackage) {
    featuredCost = 25;
    finalPrice += featuredCost;
  }
  
  // Auto-renew discount
  let autoRenewDiscount = 0;
  if (options.autoRenew) {
    autoRenewDiscount = finalPrice * 0.05;
    finalPrice *= 0.95;
  }
  
  const discountAmount = originalPrice - finalPrice + autoRenewDiscount;
  const discountPercentage = originalPrice > 0 ? Math.round((discountAmount / originalPrice) * 100) : 0;
  
  return {
    basePrice: monthlyPrice,
    originalPrice,
    finalPrice: Math.round(finalPrice * 100) / 100,
    discountAmount: Math.round(discountAmount * 100) / 100,
    discountPercentage,
    featuredCost,
    autoRenewDiscount: Math.round(autoRenewDiscount * 100) / 100,
    breakdown: {
      featuredBoost: featuredCost,
      autoRenewDiscount: Math.round(autoRenewDiscount * 100) / 100
    }
  };
};

export const validateSalonPricingOptions = (options: SalonPricingOptions): boolean => {
  return true; // Basic validation - can be enhanced
};

export const getStripeSalonPriceId = (options: SalonPricingOptions): string => {
  // Return appropriate Stripe price ID based on options
  return 'price_salon_base';
};
