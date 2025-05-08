
import { PricingOptions } from './types';
import { PRICING_TIERS } from './jobPricing';

/**
 * Calculate the price for a salon post based on selected options
 */
export const calculateSalonPostPrice = (options: PricingOptions): number => {
  let basePrice = 149.99; // Default base price for salon listings
  
  if (options.fastSalePackage) {
    basePrice += 99.99;
  }
  
  if (options.isNationwide) {
    basePrice += 49.99;
  }
  
  if (options.showAtTop) {
    basePrice += 79.99;
  }
  
  if (options.isFirstPost) {
    basePrice = Math.max(0, basePrice - 49.99);
  }
  
  return Math.round(basePrice * 100) / 100;
};

/**
 * Generate a pricing summary for salon posts
 */
export const getSalonPostPricingSummary = (options: PricingOptions): string[] => {
  const summary = [];
  
  summary.push(`Salon Listing: $149.99`);
  
  if (options.fastSalePackage) {
    summary.push(`Fast Sale Package: $99.99`);
  }
  
  if (options.isNationwide) {
    summary.push(`Nationwide Visibility: $49.99`);
  }
  
  if (options.showAtTop) {
    summary.push(`Top Placement: $79.99`);
  }
  
  if (options.isFirstPost) {
    summary.push(`First Post Discount: -$49.99`);
  }
  
  const totalPrice = calculateSalonPostPrice(options);
  summary.push(`Total: $${totalPrice.toFixed(2)}`);
  
  return summary;
};
