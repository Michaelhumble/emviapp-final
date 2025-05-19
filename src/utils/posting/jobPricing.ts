
import { JobPricingTier, PricingOptions } from './types';

// Base prices for each pricing tier (in USD)
const BASE_PRICES: Record<JobPricingTier, number> = {
  'free': 0,
  'standard': 20,
  'premium': 30,
  'gold': 50,
  'diamond': 75
};

// Discount percentage for auto-renew selection
const AUTO_RENEW_DISCOUNT = 10; // 10% discount

// Duration discounts based on number of months
const DURATION_DISCOUNTS: Record<number, number> = {
  1: 0,    // No discount for 1 month
  3: 15,   // 15% discount for 3 months
  6: 25,   // 25% discount for 6 months
  12: 40   // 40% discount for 12 months
};

// Additional price for nationwide option
const NATIONWIDE_PRICE = 5;

/**
 * Calculate the price for a job post based on the pricing options
 * @param options The pricing options
 * @returns The calculated price details
 */
export const getJobPrice = (options: PricingOptions) => {
  // Default to premium if no tier is selected
  const tier = options.selectedPricingTier || 'premium';
  
  // Handle free tier for first time users
  if (tier === 'free' && options.isFirstPost) {
    return {
      basePrice: 0,
      originalPrice: 0,
      finalPrice: 0,
      discountPercentage: 0,
      discountAmount: 0,
      autoRenewDiscount: 0,
      durationMonths: options.durationMonths || 1,
      isFirstPost: !!options.isFirstPost,
      isNationwide: !!options.isNationwide,
      selectedTier: tier
    };
  }
  
  // Get the base price for the selected tier
  const basePrice = BASE_PRICES[tier];
  
  // Calculate the original price (base price * duration)
  const durationMonths = options.durationMonths || 1;
  const originalPrice = basePrice * durationMonths;
  
  // Calculate duration discount
  const durationDiscountPercentage = DURATION_DISCOUNTS[durationMonths] || 0;
  const durationDiscountAmount = (originalPrice * durationDiscountPercentage) / 100;
  
  // Calculate auto-renew discount if enabled
  const autoRenewDiscount = options.autoRenew 
    ? ((originalPrice - durationDiscountAmount) * AUTO_RENEW_DISCOUNT) / 100 
    : 0;
  
  // Calculate total discounts
  const totalDiscountAmount = durationDiscountAmount + autoRenewDiscount;
  const discountPercentage = (totalDiscountAmount / originalPrice) * 100;
  
  // Calculate the final price with all discounts
  const discountedPrice = originalPrice - totalDiscountAmount;
  
  // Add nationwide price if selected
  const nationwideExtra = options.isNationwide ? NATIONWIDE_PRICE : 0;
  
  // Calculate the final price including all options
  const finalPrice = discountedPrice + nationwideExtra;
  
  // Return all price details
  return {
    basePrice,
    originalPrice,
    finalPrice,
    discountPercentage,
    discountAmount: totalDiscountAmount,
    autoRenewDiscount,
    durationMonths,
    isFirstPost: !!options.isFirstPost,
    isNationwide: !!options.isNationwide,
    selectedTier: tier
  };
};

// Re-export other utility functions that might exist in this file
export const validatePricingOptions = (options: PricingOptions): boolean => {
  // At minimum, we need a pricing tier and duration
  if (!options.selectedPricingTier || !options.durationMonths) {
    return false;
  }
  
  return true;
};

export const calculateFinalPrice = (options: PricingOptions): number => {
  const priceData = getJobPrice(options);
  return priceData.finalPrice;
};

export const isSubscriptionPlan = (options: PricingOptions): boolean => {
  return !!options.autoRenew;
};

export const getAmountInCents = (amount: number): number => {
  return Math.round(amount * 100);
};

// Optional: Function to get a price ID for Stripe
export const getStripePriceId = (options: PricingOptions): string => {
  // This would normally return a Stripe price ID based on the options
  // For now, just return a placeholder
  return 'price_placeholder';
};

// Optional: Function to get a summary of the job pricing
export const getJobPostPricingSummary = (options: PricingOptions): string => {
  const priceData = getJobPrice(options);
  const { finalPrice, durationMonths, selectedTier } = priceData;
  
  return `${selectedTier} tier for ${durationMonths} month${durationMonths > 1 ? 's' : ''}: $${finalPrice.toFixed(2)}`;
};

export const calculateJobPostPrice = (options: PricingOptions): number => {
  const priceData = getJobPrice(options);
  return priceData.finalPrice;
};
