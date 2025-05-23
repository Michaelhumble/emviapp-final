
// Temporary stub file for posting pricing utilities
// To be completed with actual pricing logic later

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
  selectedPricingTier: string,
  durationMonths: number,
  autoRenew: boolean = true,
  isFirstPost: boolean = false,
  isNationwide: boolean = false
): { originalPrice: number; finalPrice: number; discountPercentage: number } => {
  // Base pricing per tier (monthly)
  let basePrice = 0;
  
  switch (selectedPricingTier) {
    case 'free':
      basePrice = 0;
      break;
    case 'standard':
      basePrice = 9.99;
      break;
    case 'premium':
      basePrice = 19.99;
      break;
    case 'gold':
      basePrice = 39.99;
      break;
    case 'diamond':
      basePrice = 999.99;
      break;
    default:
      basePrice = 9.99; // Default to standard
  }
  
  // Free for first post if specified
  if (isFirstPost && selectedPricingTier !== 'diamond') {
    basePrice = 0;
  }
  
  // Calculate original price (without discounts)
  const originalPrice = basePrice * durationMonths;
  
  // Apply duration discount
  let discountPercentage = 0;
  if (durationMonths === 3) {
    discountPercentage = 10; // 10% discount for 3 months
  } else if (durationMonths === 6) {
    discountPercentage = 15; // 15% discount for 6 months
  } else if (durationMonths >= 12) {
    discountPercentage = 20; // 20% discount for 12+ months
  }
  
  // Apply auto-renew discount if enabled
  if (autoRenew && durationMonths === 1) {
    discountPercentage += 5; // Additional 5% for auto-renew on monthly plans
  }
  
  // Add nationwide fee if selected (only for paid plans)
  let nationwidePrice = 0;
  if (isNationwide && basePrice > 0) {
    nationwidePrice = 5; // $5 nationwide fee
  }
  
  // Calculate final price with discounts
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

