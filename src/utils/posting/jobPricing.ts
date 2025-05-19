
import { PricingOptions } from './types';

// Base price map for each pricing tier
export const baseJobPriceMap = {
  free: 0,
  standard: 9.99,
  premium: 14.99,
  gold: 24.99,
  diamond: 999.99
};

// Utility to validate pricing options
export const validatePricingOptions = (options: PricingOptions): boolean => {
  // Ensure we have the minimum required fields
  if (!options || !options.selectedPricingTier) {
    console.error("Missing pricing tier selection");
    return false;
  }
  
  // Validate duration is provided for all non-free tiers
  if (options.selectedPricingTier !== 'free' && !options.durationMonths) {
    console.error("Missing duration for paid tier");
    return false;
  }
  
  return true;
};

// Main function to calculate job pricing
export const getJobPrice = (options: PricingOptions): {
  basePrice: number;
  originalPrice: number;
  discountAmount: number;
  discountPercentage: number;
  finalPrice: number;
} => {
  const { selectedPricingTier, durationMonths = 1, autoRenew = false, isFirstPost = false } = options;
  
  // Get base price from pricing tier (monthly rate)
  const basePrice = baseJobPriceMap[selectedPricingTier] || 0;
  
  // Free for first post
  if (isFirstPost && selectedPricingTier !== 'diamond') {
    return {
      basePrice: basePrice,
      originalPrice: basePrice * durationMonths,
      discountAmount: basePrice * durationMonths,
      discountPercentage: 100,
      finalPrice: 0,
    };
  }
  
  // Calculate original price (base price * duration)
  const originalPrice = basePrice * durationMonths;
  
  // Apply duration discount
  let durationDiscountPercentage = 0;
  if (durationMonths === 3) {
    durationDiscountPercentage = 10; // 10% discount for 3 months
  } else if (durationMonths === 6) {
    durationDiscountPercentage = 15; // 15% discount for 6 months
  } else if (durationMonths >= 12) {
    durationDiscountPercentage = 20; // 20% discount for 12+ months
  }
  
  // Apply auto-renew discount (only applies to monthly plans)
  let autoRenewDiscountPercentage = 0;
  if (autoRenew && durationMonths === 1) {
    autoRenewDiscountPercentage = 5; // 5% discount for auto-renew
  }
  
  // Calculate founder's discount - currently applied to all as part of early adoption promotion
  const foundersDiscountPercentage = 20; // 20% early adopter discount
  
  // Total discount percentage (capped at 40% to prevent $0 final prices)
  const totalDiscountPercentage = Math.min(
    durationDiscountPercentage + autoRenewDiscountPercentage + foundersDiscountPercentage, 
    40
  );
  
  // Calculate discount amount and final price
  const discountAmount = (originalPrice * totalDiscountPercentage) / 100;
  let finalPrice = originalPrice - discountAmount;
  
  // Ensure Diamond tier is never free
  if (selectedPricingTier === 'diamond' && finalPrice <= 0) {
    finalPrice = 499.99; // Minimum price for Diamond tier
  }
  
  // Round to 2 decimal places
  finalPrice = Number(finalPrice.toFixed(2));
  
  return {
    basePrice,
    originalPrice,
    discountAmount,
    discountPercentage: totalDiscountPercentage,
    finalPrice,
  };
};
