
import { 
  PRICING_PLANS,
  AUTO_RENEW_DISCOUNT,
  DEFAULT_AUTO_RENEW,
  DURATION_DISCOUNTS
} from './pricingConfig';

import { JobPricingTier, PricingOptions } from './types';
import { PriceData } from '@/components/posting/PaymentSummary';

// Special map for job pricing plans with tailored features
export const jobPricingOptions = PRICING_PLANS;

// Gets the complete price for job listing based on options
export const getJobPrice = (options: PricingOptions): PriceData => {
  // Get the base price for the selected tier
  const tierOption = PRICING_PLANS.find(plan => plan.tier === options.selectedPricingTier);
  if (!tierOption) {
    throw new Error(`Pricing tier not found: ${options.selectedPricingTier}`);
  }
  
  const basePrice = tierOption.priceMonthly || tierOption.price;
  
  // First-time post exception (free) - for all tiers except diamond
  if (options.isFirstPost && options.selectedPricingTier !== 'diamond') {
    return {
      basePrice: 0,
      originalPrice: 0,
      finalPrice: 0,
      discountAmount: 0,
      discountPercentage: 0
    };
  }
  
  // Calculate original price (without discounts)
  const originalPrice = basePrice * options.durationMonths;
  
  // Apply discounts based on duration and auto-renew
  let discountPercentage = 0;
  
  // Duration discount
  const durationKey = String(options.durationMonths);
  if (durationKey in DURATION_DISCOUNTS) {
    discountPercentage += DURATION_DISCOUNTS[durationKey as keyof typeof DURATION_DISCOUNTS];
  }
  
  // Auto-renew discount
  if (options.autoRenew) {
    discountPercentage += AUTO_RENEW_DISCOUNT;
  }
  
  // Calculate discount amount
  const discountAmount = (originalPrice * discountPercentage) / 100;
  
  // Calculate final price
  const finalPrice = originalPrice - discountAmount;
  
  return {
    basePrice: basePrice,
    originalPrice: originalPrice,
    finalPrice: finalPrice,
    discountAmount: discountAmount,
    discountPercentage: discountPercentage
  };
};

/**
 * Check if a job post qualifies for processing in the selected tier
 */
export const validateJobPostTier = (options: PricingOptions): boolean => {
  const tierOption = PRICING_PLANS.find(plan => plan.tier === options.selectedPricingTier);
  
  if (!tierOption) {
    console.error('Invalid pricing tier selected');
    return false;
  }
  
  // Diamond tier requires special handling (invitation only)
  if (options.selectedPricingTier === 'diamond') {
    console.error('Diamond tier requires approval');
    return false;
  }
  
  return true;
};
