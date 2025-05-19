
import { PricingOptions } from './types';

// Base price map for each pricing tier
export const baseJobPriceMap = {
  free: 0,
  standard: 9.99,
  premium: 14.99,
  gold: 24.99,
  diamond: 999.99
};

// Pricing options configuration for job posts
export const jobPricingOptions = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Basic visibility for 7 days',
    features: [
      'Local visibility only',
      'Basic listing features',
      'No profile highlight',
      '7-day listing'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    description: 'Better visibility for 30 days',
    features: [
      'Improved local visibility',
      'Featured for 3 days',
      'Basic analytics',
      '30-day listing'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 14.99,
    description: 'High visibility and engagement',
    features: [
      'High local visibility',
      'Featured for 7 days',
      'Detailed analytics',
      'Social media promotion',
      '30-day listing'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 24.99,
    description: 'Maximum visibility and priority',
    features: [
      'Maximum visibility nationwide',
      'Featured for 14 days',
      'Priority in search results',
      'Full analytics dashboard',
      'Premium support',
      '45-day listing'
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 999.99,
    description: 'Ultimate enterprise solution',
    features: [
      'Enterprise-level visibility',
      'Always featured',
      'Dedicated account manager',
      'Custom branding options',
      'Premium placement in all listings',
      'Unlimited listing duration'
    ]
  }
];

// Utility to validate pricing options
export const validatePricingOptions = (options: PricingOptions): boolean => {
  // Ensure we have the minimum required fields
  if (!options || !options.selectedPricingTier) {
    console.error("Missing pricing tier selection");
    return false;
  }
  
  // Validate duration is provided for all non-free tiers
  if (options.selectedPricingTier !== 'free' && !options.durationMonths) {
    console.error("Missing duration for paid tier");
    return false;
  }
  
  return true;
};

// Helper function to calculate final price with all discounts
export const calculateFinalPrice = (basePrice: number, durationMonths: number, autoRenew = false): {
  originalPrice: number,
  discountPercentage: number,
  finalPrice: number
} => {
  // Calculate original price (base price * duration)
  const originalPrice = basePrice * durationMonths;
  
  // Apply duration discount
  let durationDiscountPercentage = 0;
  if (durationMonths === 3) {
    durationDiscountPercentage = 10; // 10% discount for 3 months
  } else if (durationMonths === 6) {
    durationDiscountPercentage = 15; // 15% discount for 6 months
  } else if (durationMonths >= 12) {
    durationDiscountPercentage = 20; // 20% discount for 12+ months
  }
  
  // Apply auto-renew discount (only applies to monthly plans)
  let autoRenewDiscountPercentage = 0;
  if (autoRenew && durationMonths === 1) {
    autoRenewDiscountPercentage = 5; // 5% discount for auto-renew
  }
  
  // Calculate founder's discount - currently applied to all as part of early adoption promotion
  const foundersDiscountPercentage = 20; // 20% early adopter discount
  
  // Total discount percentage (capped at 40% to prevent $0 final prices)
  const totalDiscountPercentage = Math.min(
    durationDiscountPercentage + autoRenewDiscountPercentage + foundersDiscountPercentage,
    40
  );
  
  // Calculate discount amount and final price
  const discountAmount = (originalPrice * totalDiscountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;
  
  return {
    originalPrice,
    discountPercentage: totalDiscountPercentage,
    finalPrice: Number(finalPrice.toFixed(2))
  };
};

// Main function to calculate job pricing
export const getJobPrice = (options: PricingOptions): {
  basePrice: number;
  originalPrice: number;
  discountAmount: number;
  discountPercentage: number;
  finalPrice: number;
} => {
  const { selectedPricingTier, durationMonths = 1, autoRenew = false, isFirstPost = false } = options;
  
  // Get base price from pricing tier (monthly rate)
  const basePrice = baseJobPriceMap[selectedPricingTier] || 0;
  
  // Free for first post
  if (isFirstPost && selectedPricingTier !== 'diamond') {
    return {
      basePrice: basePrice,
      originalPrice: basePrice * durationMonths,
      discountAmount: basePrice * durationMonths,
      discountPercentage: 100,
      finalPrice: 0,
    };
  }
  
  // Calculate original price (base price * duration)
  const originalPrice = basePrice * durationMonths;
  
  // Apply duration discount
  let durationDiscountPercentage = 0;
  if (durationMonths === 3) {
    durationDiscountPercentage = 10; // 10% discount for 3 months
  } else if (durationMonths === 6) {
    durationDiscountPercentage = 15; // 15% discount for 6 months
  } else if (durationMonths >= 12) {
    durationDiscountPercentage = 20; // 20% discount for 12+ months
  }
  
  // Apply auto-renew discount (only applies to monthly plans)
  let autoRenewDiscountPercentage = 0;
  if (autoRenew && durationMonths === 1) {
    autoRenewDiscountPercentage = 5; // 5% discount for auto-renew
  }
  
  // Calculate founder's discount - currently applied to all as part of early adoption promotion
  const foundersDiscountPercentage = 20; // 20% early adopter discount
  
  // Total discount percentage (capped at 40% to prevent $0 final prices)
  const totalDiscountPercentage = Math.min(
    durationDiscountPercentage + autoRenewDiscountPercentage + foundersDiscountPercentage, 
    40
  );
  
  // Calculate discount amount and final price
  const discountAmount = (originalPrice * totalDiscountPercentage) / 100;
  let finalPrice = originalPrice - discountAmount;
  
  // Ensure Diamond tier is never free
  if (selectedPricingTier === 'diamond' && finalPrice <= 0) {
    finalPrice = 499.99; // Minimum price for Diamond tier
  }
  
  // Round to 2 decimal places
  finalPrice = Number(finalPrice.toFixed(2));
  
  return {
    basePrice,
    originalPrice,
    discountAmount,
    discountPercentage: totalDiscountPercentage,
    finalPrice,
  };
};

// Calculate job post price with all options
export const calculateJobPostPrice = (options: PricingOptions): number => {
  const priceData = getJobPrice(options);
  return priceData.finalPrice;
};

// Get job post pricing summary for display
export const getJobPostPricingSummary = (options: PricingOptions) => {
  const priceData = getJobPrice(options);
  
  return {
    basePrice: priceData.basePrice,
    originalPrice: priceData.originalPrice,
    discountAmount: priceData.discountAmount,
    discountPercentage: priceData.discountPercentage,
    finalPrice: priceData.finalPrice,
    discountedPrice: priceData.originalPrice,
    discountLabel: priceData.discountPercentage > 0 ? `${priceData.discountPercentage}% Discount` : '',
    isFoundersDiscount: true,
    durationMonths: options.durationMonths,
    isFirstPost: options.isFirstPost,
    isNationwide: options.isNationwide,
    selectedTier: options.selectedPricingTier
  };
};

// Get Stripe Price ID based on selected tier and duration
export const getStripePriceId = (tier: string, duration: number = 1): string => {
  // These would be actual Stripe price IDs in production
  const priceMap = {
    standard: {
      1: 'price_std_monthly',
      3: 'price_std_quarterly',
      6: 'price_std_biannual',
      12: 'price_std_annual'
    },
    premium: {
      1: 'price_prem_monthly',
      3: 'price_prem_quarterly',
      6: 'price_prem_biannual',
      12: 'price_prem_annual'
    },
    gold: {
      1: 'price_gold_monthly',
      3: 'price_gold_quarterly',
      6: 'price_gold_biannual',
      12: 'price_gold_annual'
    },
    diamond: {
      1: 'price_diamond'
    }
  };
  
  // Return the appropriate price ID or a default
  return priceMap[tier]?.[duration] || 'price_default';
};

// Convert price to cents for Stripe
export const getAmountInCents = (price: number): number => {
  return Math.round(price * 100);
};

// Check if the selected plan is a subscription
export const isSubscriptionPlan = (tier: string): boolean => {
  // In this example, all paid plans are one-time payments not subscriptions
  // You can modify this based on your business model
  return false;
};
