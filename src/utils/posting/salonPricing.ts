
import { PricingOptions } from "./types";

// Calculate salon posting price based on options
export const calculateSalonPostPrice = (options: PricingOptions): number => {
  let basePrice = 29.99; // Base salon posting price
  
  // Add-ons
  if (options.isNationwide) {
    basePrice += 10;
  }
  
  if (options.fastSalePackage) {
    basePrice += 20;
  }
  
  if (options.showAtTop) {
    basePrice += 15;
  }
  
  if (options.bundleWithJobPost) {
    basePrice += 15;
  }

  // Apply duration discount if applicable
  const months = options.durationMonths || 1;
  let totalPrice = basePrice * months;
  
  // Duration discounts
  if (months >= 12) {
    totalPrice *= 0.8; // 20% discount for 12 months
  } else if (months >= 6) {
    totalPrice *= 0.85; // 15% discount for 6 months
  } else if (months >= 3) {
    totalPrice *= 0.9; // 10% discount for 3 months
  }

  // Auto-renew discount
  if (options.autoRenew) {
    totalPrice *= 0.95; // 5% discount for auto-renew
  }

  return totalPrice;
};

export const getSalonPostPricingSummary = (options: PricingOptions) => {
  const basePrice = 29.99;
  const months = options.durationMonths || 1;
  
  let addOns = 0;
  if (options.isNationwide) addOns += 10;
  if (options.fastSalePackage) addOns += 20;
  if (options.showAtTop) addOns += 15;
  if (options.bundleWithJobPost) addOns += 15;
  
  const monthlyPrice = basePrice + addOns;
  const originalPrice = monthlyPrice * months;
  
  let discountPercentage = 0;
  if (months >= 12) discountPercentage = 20;
  else if (months >= 6) discountPercentage = 15;
  else if (months >= 3) discountPercentage = 10;
  
  if (options.autoRenew) discountPercentage += 5;
  
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;
  
  return {
    basePrice: monthlyPrice,
    originalPrice,
    finalPrice,
    discountAmount,
    discountPercentage,
    breakdown: {
      isNationwide: options.isNationwide ? 10 : 0,
      fastSalePackage: options.fastSalePackage ? 20 : 0,
      showAtTop: options.showAtTop ? 15 : 0,
      bundleWithJobPost: options.bundleWithJobPost ? 15 : 0,
      autoRenewDiscount: options.autoRenew ? 5 : 0
    }
  };
};

export const validateSalonPricingOptions = (options: PricingOptions): boolean => {
  return true; // Basic validation - can be enhanced
};

export const getStripeSalonPriceId = (options: PricingOptions): string => {
  // Return appropriate Stripe price ID based on options
  return 'price_salon_base';
};
