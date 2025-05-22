
// Re-export the centralized configuration
export * from './pricingConfig';

// Import the base utils
import { formatCurrency } from '@/lib/utils';
export { formatCurrency };

import { PricingOptions, JobPricingTier } from './types';
import { calculateTotalPrice, DURATION_DISCOUNTS, DEFAULT_AUTO_RENEW } from './pricingConfig';

/**
 * Calculate pricing based on selected tier, duration, and options
 */
export const calculatePricing = (
  selectedPricingTier: string,
  durationMonths: number,
  autoRenew: boolean = DEFAULT_AUTO_RENEW,
  isFirstPost: boolean = false,
  isNationwide: boolean = false
): { originalPrice: number; finalPrice: number; discountPercentage: number } => {
  // Free for first post if specified
  if (isFirstPost && selectedPricingTier !== 'diamond') {
    return {
      originalPrice: 0,
      finalPrice: 0,
      discountPercentage: 0
    };
  }
  
  // Calculate base pricing with discounts
  const pricing = calculateTotalPrice(selectedPricingTier, durationMonths, autoRenew);
  
  // Add nationwide fee if selected (only for paid plans)
  let nationwidePrice = 0;
  if (isNationwide && pricing.finalPrice > 0) {
    nationwidePrice = 5; // $5 nationwide fee
  }
  
  return {
    originalPrice: pricing.originalPrice,
    finalPrice: pricing.finalPrice + nationwidePrice,
    discountPercentage: pricing.discountPercentage
  };
};

// Exporting with a different name to avoid conflict
export const getPostNationwidePrice = (postType: 'job' | 'salon' | 'booth' | 'supply'): string => {
  switch (postType) {
    case 'job': return '+$5';
    case 'salon': return '+$10';
    case 'booth': return '+$10';
    case 'supply': return '+$5';
    default: return '';
  }
};
