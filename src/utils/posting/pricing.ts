
import { JobPricingTier } from './types';

/**
 * Format a number as currency (USD)
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Calculate pricing based on selected tier, duration, and options
 */
export const calculatePricing = (
  selectedPricingTier: JobPricingTier,
  durationMonths: number,
  autoRenew: boolean = true,
  isFirstPost: boolean = false,
  isNationwide: boolean = false
): { originalPrice: number; finalPrice: number; discountPercentage: number } => {
  
  // DIAMOND TIER - Special handling: Always $999.99 for 1 year only
  if (selectedPricingTier === 'diamond') {
    const finalPrice = 999.99;
    const originalPrice = 1199.88; // Theoretical monthly price × 12 for discount calculation
    const discountPercentage = Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
    
    // Add nationwide fee if selected
    let nationwidePrice = 0;
    if (isNationwide) {
      nationwidePrice = 5; // $5 nationwide fee
    }
    
    return {
      originalPrice,
      finalPrice: finalPrice + nationwidePrice,
      discountPercentage
    };
  }

  // Base pricing per tier (monthly) for NON-DIAMOND tiers
  let basePrice = 0;
  
  // Handle only non-diamond tiers with EXACT pricing
  if (selectedPricingTier === 'free') {
    basePrice = 0;
  } else if (selectedPricingTier === 'gold') {
    basePrice = 18.99; // FIXED: Correct Gold Featured monthly price to match user expectation
  } else if (selectedPricingTier === 'premium') {
    basePrice = 39.99;
  } else {
    // Fallback for any other tier
    basePrice = 19.99;
  }
  
  // Free for first post if specified (only for non-diamond tiers)
  if (isFirstPost) {
    basePrice = 0;
  }
  
  // Calculate original price (without discounts) for regular plans
  // CRITICAL: This must be basePrice × durationMonths for correct totals
  const originalPrice = basePrice * durationMonths;
  
  // Apply duration discount with EXACT percentages
  let discountPercentage = 0;
  if (durationMonths === 3) {
    discountPercentage = 10; // 10% discount for 3 months
  } else if (durationMonths === 6) {
    discountPercentage = 15; // 15% discount for 6 months
  } else if (durationMonths >= 12) {
    discountPercentage = 20; // 20% discount for 12+ months
  }
  
  // Apply auto-renew discount if enabled (only for monthly plans)
  if (autoRenew && durationMonths === 1) {
    discountPercentage += 5; // Additional 5% for auto-renew on monthly plans
  }
  
  // Add nationwide fee if selected (only for paid plans)
  let nationwidePrice = 0;
  if (isNationwide && basePrice > 0) {
    nationwidePrice = 5; // $5 nationwide fee
  }
  
  // Calculate final price with discounts
  // CRITICAL: Apply discount to originalPrice, then add nationwide fee
  const discount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discount + nationwidePrice;
  
  return {
    originalPrice,
    finalPrice,
    discountPercentage
  };
};

export const getNationwidePrice = (postType: 'job' | 'salon' | 'booth' | 'supply'): string => {
  switch (postType) {
    case 'job': return '+$5';
    case 'salon': return '+$10';
    case 'booth': return '+$10';
    case 'supply': return '+$5';
    default: return '';
  }
};
