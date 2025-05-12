
import { PricingOptions } from './types';

export const calculateSalonPostPrice = (options: PricingOptions) => {
  // Set base price based on tier
  let basePrice = 0;
  
  switch (options.selectedPricingTier) {
    case 'standard':
      basePrice = 19.99;
      break;
    case 'premium':
      basePrice = 39.99;
      break;
    case 'gold':
      basePrice = 59.99;
      break;
    case 'diamond':
      basePrice = 99.99;
      break;
    default:
      basePrice = 0; // Free tier
  }
  
  // Add cost for nationwide visibility
  if (options.isNationwide) {
    basePrice += 5;
  }
  
  // Add cost for fast sale package
  if (options.fastSalePackage) {
    basePrice += 50;
  }
  
  // Add cost for bundling with job post
  if (options.bundleWithJobPost) {
    basePrice += 15;
  }
  
  // Apply first-time discount if applicable
  if (options.isFirstPost && basePrice > 0) {
    basePrice = Math.max(basePrice - 10, 0);
  }
  
  const finalPrice = basePrice;
  
  return {
    basePrice,
    finalPrice,
    discountApplied: options.isFirstPost
  };
};

export const getSalonPostPricingSummary = (options: PricingOptions): string => {
  const pricing = calculateSalonPostPrice(options);
  let summary = `Selected Pricing Tier: ${options.selectedPricingTier}`;
  
  if (options.isNationwide) {
    summary += ", Nationwide Visibility";
  }
  
  if (options.fastSalePackage) {
    summary += ", Fast Sale Package";
  }
  
  if (options.bundleWithJobPost) {
    summary += ", With Job Post Bundle";
  }
  
  if (options.isFirstPost) {
    summary += " (First Post Discount Applied)";
  }
  
  summary += ` - Total: $${pricing.finalPrice.toFixed(2)}`;
  
  return summary;
};

export const validateSalonPricingOptions = (options: PricingOptions): boolean => {
  if (!options) return false;
  if (!options.selectedPricingTier) return false;
  return true;
};

export const getStripeSalonPriceId = (selectedTier: string): string | null => {
  const priceIdMap: Record<string, string | null> = {
    'free': null,
    'standard': process.env.NEXT_PUBLIC_STRIPE_SALON_STANDARD_PRICE_ID || null,
    'premium': process.env.NEXT_PUBLIC_STRIPE_SALON_PREMIUM_PRICE_ID || null,
    'gold': process.env.NEXT_PUBLIC_STRIPE_SALON_GOLD_PRICE_ID || null,
    'diamond': process.env.NEXT_PUBLIC_STRIPE_SALON_DIAMOND_PRICE_ID || null
  };
  
  return priceIdMap[selectedTier] || null;
};
