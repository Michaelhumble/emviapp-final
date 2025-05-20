
import { JobPricingOption, JobPricingTier, PricingOptions } from './types';

// Define pricing options
export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: 39,
    wasPrice: 49,
    description: 'Basic job listing for 30 days',
    features: [
      'Listed for 30 days',
      'Basic search visibility',
      'Email support'
    ],
    tier: 'standard',
    color: 'gray',
    hidden: false,
    priceMonthly: 39
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 79,
    wasPrice: 99,
    description: 'Enhanced visibility for faster hiring',
    features: [
      'Priority placement',
      'Highlighted in search results',
      'Email alerts to candidates',
      'Performance analytics'
    ],
    tier: 'premium',
    popular: true,
    color: 'purple',
    recommended: true,
    hidden: false,
    priceMonthly: 79
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 129,
    wasPrice: 149,
    description: 'Maximum exposure for critical positions',
    features: [
      'Featured placement',
      'Social media promotion',
      'Targeting across networks',
      'Direct candidate matching',
      'Priority support'
    ],
    tier: 'gold',
    color: 'yellow',
    hidden: false,
    priceMonthly: 129
  }
];

// Validate pricing options
export const validatePricingOptions = (options: PricingOptions): boolean => {
  if (!options) return false;
  if (!options.selectedPricingTier) return false;
  if (options.durationMonths < 1) return false;
  
  // Check tier is valid
  const validTiers = ['standard', 'premium', 'gold', 'diamond', 'free'];
  if (!validTiers.includes(options.selectedPricingTier)) return false;
  
  return true;
};

// Calculate final price
export const calculateFinalPrice = (
  basePrice: number, 
  options: PricingOptions
): number => {
  // Free tier is always free
  if (options.selectedPricingTier === 'free') return 0;
  
  // First post discount
  if (options.isFirstPost) return 0;
  
  let price = basePrice;
  
  // Apply duration pricing
  price = price * options.durationMonths;
  
  // Apply auto-renew discount if applicable
  if (options.autoRenew) {
    price = price * 0.9; // 10% discount
  }
  
  // Handle nationwide premium
  if (options.isNationwide) {
    price = price * 1.5; // 50% premium
  }
  
  return price;
};

// Main pricing calculation
export const calculateJobPostPrice = (options: PricingOptions): number => {
  // Find the tier pricing
  const tier = jobPricingOptions.find(o => o.tier === options.selectedPricingTier);
  if (!tier) return 0;
  
  return calculateFinalPrice(tier.price, options);
};

// Get price summary for display
export const getJobPostPricingSummary = (options: PricingOptions) => {
  const tier = jobPricingOptions.find(o => o.tier === options.selectedPricingTier);
  if (!tier) return null;
  
  const basePrice = tier.price;
  const originalPrice = basePrice * options.durationMonths;
  const finalPrice = calculateJobPostPrice(options);
  
  return {
    basePrice,
    originalPrice,
    finalPrice,
    discount: originalPrice - finalPrice,
    discountPercentage: ((originalPrice - finalPrice) / originalPrice) * 100
  };
};

// Additional helpers
export const getStripePriceId = (tier: JobPricingTier): string => {
  const priceIds: Record<JobPricingTier, string> = {
    standard: 'price_standard',
    premium: 'price_premium',
    gold: 'price_gold',
    diamond: 'price_diamond',
    free: ''
  };
  
  return priceIds[tier] || '';
};

export const getAmountInCents = (amount: number): number => {
  return Math.round(amount * 100);
};

export const isSubscriptionPlan = (tier: JobPricingTier): boolean => {
  return ['premium', 'gold', 'diamond'].includes(tier);
};

export const getJobPrice = (options: PricingOptions): any => {
  const tier = jobPricingOptions.find(o => o.tier === options.selectedPricingTier) || jobPricingOptions[0];
  
  const basePrice = tier.price;
  const originalPrice = basePrice * options.durationMonths;
  
  let discountedPrice = originalPrice;
  // Apply discounts
  if (options.autoRenew) {
    discountedPrice = originalPrice * 0.9; // 10% off for auto-renew
  }
  
  // Calculate additional fees
  let additionalFees = 0;
  if (options.isNationwide) {
    additionalFees += basePrice * 0.5; // 50% extra for nationwide
  }
  
  // Calculate final price
  let finalPrice = discountedPrice + additionalFees;
  
  // First post is free
  if (options.isFirstPost) {
    finalPrice = 0;
  }
  
  // Return pricing data
  return {
    basePrice,
    originalPrice,
    discountedPrice,
    finalPrice,
    discountPercentage: 10,
    discountLabel: "Auto-renew Discount",
    discountAmount: originalPrice - discountedPrice,
    isFoundersDiscount: true,
    durationMonths: options.durationMonths
  };
};
