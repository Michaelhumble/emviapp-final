
import { PricingOptions } from './types';
import { UserPostingStats } from './types'; // Added import

/**
 * Calculate the price of a new or renewed supply listing based on various options
 * @param options PricingOptions object with tier, isNationwide, isFastSalePackage, bundleWithJobPosting
 * @param userStats UserPostingStats object with post counts and limits
 * @returns Price as a number
 */
export function calculateSupplyPrice(options: PricingOptions, userStats?: UserPostingStats): number {
  const { tier, isNationwide = false, isFastSalePackage = false, isRenewal = false } = options;
  
  // Base prices by tier
  const basePrice = {
    diamond: 899.99,
    premium: 299.99,
    gold: 199.99,
    standard: 99.99,
    starter: 49.99,
    free: 0
  };
  
  // Determine which tier price to use (with fallback to free)
  const baseTierPrice = tier in basePrice ? basePrice[tier as keyof typeof basePrice] : basePrice.free;
  
  // Apply discount for renewals
  const renewalDiscount = isRenewal ? 0.2 : 0; // 20% off for renewals
  
  // Additional costs
  const nationwideFee = isNationwide ? 49.99 : 0;
  const fastSalePackage = isFastSalePackage ? 149.99 : 0;
  
  // Calculate price with all options
  let totalPrice = baseTierPrice * (1 - renewalDiscount) + nationwideFee + fastSalePackage;
  
  // Round to 2 decimal places for currency display
  return Math.round(totalPrice * 100) / 100;
}

/**
 * Calculate price for job posting based on tier and other options
 * @param options PricingOptions object
 * @param userStats UserPostingStats object with post counts and limits
 * @returns Price as a number
 */
export function calculateJobPostPrice(options: PricingOptions, userStats?: UserPostingStats): number {
  const { tier, isNationwide = false, bundleWithJobPosting = false, isRenewal = false } = options;
  
  // Base prices for job listings
  const basePrice = {
    diamond: 799.99,
    premium: 249.99,
    gold: 149.99,
    standard: 79.99,
    starter: 39.99,
    free: 0
  };
  
  // Determine base price with fallback to free
  const baseTierPrice = tier in basePrice ? basePrice[tier as keyof typeof basePrice] : basePrice.free;
  
  // Apply discount for renewals
  const renewalDiscount = isRenewal ? 0.2 : 0; // 20% off for renewals
  
  // Additional costs
  const nationwideFee = isNationwide ? 39.99 : 0;
  const bundleDiscount = bundleWithJobPosting ? 0.1 : 0; // 10% off when bundled
  
  // Calculate total with all options
  let totalPrice = baseTierPrice * (1 - renewalDiscount) * (1 - bundleDiscount) + nationwideFee;
  
  // Check if user has free posts remaining
  if (tier === 'free' && userStats && userStats.free_posts_remaining > 0) {
    totalPrice = 0;
  }
  
  // Round to 2 decimal places
  return Math.round(totalPrice * 100) / 100;
}
