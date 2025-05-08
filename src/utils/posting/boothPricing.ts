
import { PricingOptions } from './types';

/**
 * Calculate the price for a booth rental post based on selected options
 */
export const calculateBoothPostPrice = (options: PricingOptions): number => {
  let basePrice = 79.99; // Default base price for booth rental listings
  
  if (options.bundleWithJobPost) {
    basePrice += 29.99;
  }
  
  if (options.bundleWithSalonPost) {
    basePrice += 39.99;
  }
  
  if (options.showAtTop) {
    basePrice += 49.99;
  }
  
  if (options.isFirstPost) {
    basePrice = Math.max(0, basePrice - 29.99);
  }
  
  return Math.round(basePrice * 100) / 100;
};

/**
 * Generate a pricing summary for booth rental posts
 */
export const getBoothPostPricingSummary = (options: PricingOptions): string[] => {
  const summary = [];
  
  summary.push(`Booth Rental Listing: $79.99`);
  
  if (options.bundleWithJobPost) {
    summary.push(`Job Post Bundle: $29.99`);
  }
  
  if (options.bundleWithSalonPost) {
    summary.push(`Salon Listing Bundle: $39.99`);
  }
  
  if (options.showAtTop) {
    summary.push(`Top Placement: $49.99`);
  }
  
  if (options.isFirstPost) {
    summary.push(`First Post Discount: -$29.99`);
  }
  
  const totalPrice = calculateBoothPostPrice(options);
  summary.push(`Total: $${totalPrice.toFixed(2)}`);
  
  return summary;
};
