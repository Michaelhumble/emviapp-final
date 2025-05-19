
import { PricingOptions, PricingSummary } from '@/types/jobPosting';
import { formatCurrency } from '@/utils/formatting';
import { logJobPostingEvent } from '@/utils/telemetry/jobPostingEvents';

// Base prices per tier (monthly)
const BASE_PRICES: Record<string, number> = {
  'free': 0,
  'standard': 9.99,
  'premium': 19.99,
  'gold': 39.99,
  'diamond': 999.99
};

// Duration discount percentages
const DURATION_DISCOUNTS: Record<number, number> = {
  1: 0,
  3: 10,
  6: 20,
  12: 35
};

// Nationwide add-on prices
const NATIONWIDE_PRICES: Record<string, number> = {
  'job': 5,
  'salon': 10,
  'booth': 10,
  'supply': 5
};

// Auto-renew discount percentage
const AUTO_RENEW_DISCOUNT = 5;

/**
 * Calculate job posting price based on selected options
 */
export function calculateJobPostPrice(options: PricingOptions): PricingSummary {
  const { 
    selectedPricingTier, 
    durationMonths = 1, 
    autoRenew = false,
    isFirstPost = false,
    isNationwide = false
  } = options;

  // Validate inputs
  if (!selectedPricingTier) {
    console.error('Price calculation failed: Pricing tier is required');
    return createDefaultPriceSummary();
  }

  // Log calculation start
  console.log(`Calculating price for tier: ${selectedPricingTier}, duration: ${durationMonths} months, autoRenew: ${autoRenew}`);

  // Get base price for selected tier
  let basePrice = BASE_PRICES[selectedPricingTier] || BASE_PRICES['standard'];
  
  // Handle free first post promotion if applicable
  if (isFirstPost && selectedPricingTier === 'free') {
    basePrice = 0;
  }

  // Calculate original price (without discounts)
  const originalPrice = basePrice * durationMonths;
  
  // Skip further calculations for truly free listings
  if (basePrice === 0) {
    const result = {
      originalPrice: 0,
      finalPrice: 0,
      discountPercentage: 0,
      isFreeTrial: isFirstPost,
      currency: 'USD',
      formattedOriginalPrice: formatCurrency(0),
      formattedFinalPrice: formatCurrency(0),
      recurringBilling: autoRenew
    };
    
    logPriceCalculation(options, result);
    return result;
  }
  
  // Calculate duration-based discount
  let discountPercentage = DURATION_DISCOUNTS[durationMonths] || 0;
  
  // Add auto-renew discount if applicable
  if (autoRenew && durationMonths === 1) {
    discountPercentage += AUTO_RENEW_DISCOUNT;
  }
  
  // Calculate discount amount
  const discountAmount = (originalPrice * discountPercentage) / 100;
  
  // Calculate pre-add-on price
  let finalPrice = originalPrice - discountAmount;
  
  // Add nationwide fee if selected
  if (isNationwide) {
    finalPrice += NATIONWIDE_PRICES['job'] || 0;
  }
  
  // Add promotional add-ons if selected
  if (options.expertReview) finalPrice += 15;
  if (options.priorityPlacement) finalPrice += 10;
  if (options.extendedReach) finalPrice += 20;
  
  // Safety check: ensure paid plans never show $0
  if (selectedPricingTier !== 'free' && finalPrice <= 0) {
    console.warn('Price calculation resulted in $0 for a paid plan. Using base price as fallback.');
    finalPrice = basePrice; // Fallback to base price
  }
  
  // Format currency for display
  const result = {
    originalPrice,
    finalPrice,
    discountPercentage,
    isFreeTrial: isFirstPost && selectedPricingTier === 'free',
    currency: 'USD',
    formattedOriginalPrice: formatCurrency(originalPrice),
    formattedFinalPrice: formatCurrency(finalPrice),
    recurringBilling: autoRenew,
    nextBillingDate: autoRenew ? getNextBillingDate(durationMonths) : undefined
  };
  
  logPriceCalculation(options, result);
  return result;
}

/**
 * Create a default price summary with $0 values
 */
function createDefaultPriceSummary(): PricingSummary {
  return {
    originalPrice: 0,
    finalPrice: 0,
    discountPercentage: 0,
    isFreeTrial: false,
    currency: 'USD',
    formattedOriginalPrice: formatCurrency(0),
    formattedFinalPrice: formatCurrency(0),
    recurringBilling: false
  };
}

/**
 * Get next billing date based on duration
 */
function getNextBillingDate(durationMonths: number): string {
  const date = new Date();
  date.setMonth(date.getMonth() + durationMonths);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Validate pricing options to ensure they are complete and consistent
 */
export function validatePricingOptions(options: PricingOptions): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!options.selectedPricingTier) {
    errors.push('Pricing tier is required');
  }
  
  if (!options.durationMonths || options.durationMonths < 1) {
    errors.push('Duration must be at least 1 month');
  }
  
  // Diamond plan requires annual subscription
  if (options.selectedPricingTier === 'diamond' && options.durationMonths !== 12) {
    errors.push('Diamond plan requires annual subscription');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Log detailed information about price calculation
 */
export function logPriceCalculation(options: PricingOptions, result: PricingSummary): void {
  console.group('Price Calculation');
  console.log('Input options:', options);
  console.log('Base price:', BASE_PRICES[options.selectedPricingTier]);
  console.log('Duration:', options.durationMonths, 'months');
  console.log('Original price:', result.originalPrice);
  console.log('Discount %:', result.discountPercentage);
  console.log('Final price:', result.finalPrice);
  console.groupEnd();
  
  // Log pricing event
  logJobPostingEvent('PRICE_CHANGE', 'Price calculated', {
    options,
    result
  });
}
