import { PricingOptions, JobPricingTier } from './types';

// Define job pricing tiers
export const jobPricingOptions = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Basic listing for 30 days',
    vietnameseDescription: 'Đăng tin cơ bản trong 30 ngày',
    popular: false,
    features: [
      'Basic visibility',
      'Standard placement',
      '30-day listing',
      'Email support'
    ],
    tier: 'free' as JobPricingTier
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    description: 'Higher visibility listing',
    vietnameseDescription: 'Đăng tin với khả năng hiển thị cao hơn',
    popular: true,
    features: [
      'Increased visibility',
      'Higher search placement',
      'Phone support',
      'Email alerts'
    ],
    tier: 'standard' as JobPricingTier
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 49.99,
    description: 'Featured listing with maximum exposure',
    vietnameseDescription: 'Đăng tin nổi bật với mức độ hiển thị tối đa',
    tag: 'Best Value',
    popular: false,
    features: [
      'Featured in premium section',
      'Top search placement',
      'Social media promotion',
      'Priority support',
      'Analytics dashboard'
    ],
    tier: 'premium' as JobPricingTier
  },
  {
    id: 'gold',
    name: 'Gold Featured',
    price: 19.99,
    description: 'Featured listing with high visibility',
    vietnameseDescription: 'Đăng tin nổi bật với độ phơi bày cao',
    popular: false,
    features: [
      'Featured in gold section',
      'High search placement',
      'Dedicated support',
      'Listing analytics'
    ],
    tier: 'gold' as JobPricingTier
  },
  {
    id: 'diamond',
    name: 'Diamond Featured',
    price: 99.99,
    description: 'Premium listing with maximum visibility',
    vietnameseDescription: 'Đăng tin cao cấp với độ hiển thị tối đa',
    popular: false,
    tag: 'Premium',
    features: [
      'Featured in diamond section',
      'Top search placement',
      'Social media promotion',
      'Dedicated account manager',
      'Full analytics suite',
      'Multi-channel promotion'
    ],
    tier: 'diamond' as JobPricingTier
  }
];

// Calculate job post price based on options
export const calculateJobPostPrice = (options: PricingOptions) => {
  if (!options || !options.selectedPricingTier || !options.durationMonths) {
    return null;
  }
  
  // Find the selected pricing option
  const selectedOption = jobPricingOptions.find(option => option.id === options.selectedPricingTier);
  if (!selectedOption) {
    return null;
  }
  
  // Get the base price from the selected option
  const basePrice = selectedOption.price;
  let originalPrice = basePrice * options.durationMonths;
  let discountPercentage = 0;
  
  // Apply duration discounts
  if (options.durationMonths === 3) {
    discountPercentage = 10;
  } else if (options.durationMonths === 6) {
    discountPercentage = 15;
  } else if (options.durationMonths === 12) {
    discountPercentage = 20;
  }
  
  // Apply auto-renew discount (additional 5%)
  if (options.autoRenew && options.selectedPricingTier !== 'free') {
    discountPercentage += 5;
  }
  
  // Apply first post discount if applicable
  if (options.isFirstPost && options.selectedPricingTier !== 'free') {
    discountPercentage += 10;
  }
  
  // Calculate final price with discount
  const finalPrice = originalPrice * (1 - discountPercentage / 100);
  
  return {
    basePrice,
    originalPrice,
    finalPrice,
    discountPercentage
  };
};

// Get job post pricing summary text
export const getJobPostPricingSummary = (pricingOptions: PricingOptions) => {
  if (!pricingOptions) return '';
  
  const pricingResult = calculateJobPostPrice(pricingOptions);
  if (!pricingResult) return '';
  
  const { originalPrice, finalPrice, discountPercentage } = pricingResult;
  
  if (discountPercentage > 0) {
    return `$${finalPrice.toFixed(2)} (${discountPercentage}% off $${originalPrice.toFixed(2)})`;
  } else {
    return `$${finalPrice.toFixed(2)}`;
  }
};

/**
 * Calculates the price with duration discount but without auto-renew discount
 */
export const calculatePriceWithDuration = (basePrice: number, durationMonths: number): number => {
  // Apply duration-based discount
  let discountPercentage = 0;
  if (durationMonths === 3) discountPercentage = 10;
  else if (durationMonths === 6) discountPercentage = 15;
  else if (durationMonths === 12) discountPercentage = 20;
  
  const discountMultiplier = 1 - (discountPercentage / 100);
  return basePrice * durationMonths * discountMultiplier;
};

/**
 * Calculates the final price with all discounts applied
 */
export const calculateFinalPrice = (basePrice: number, durationMonths: number, autoRenew: boolean = false): number => {
  let price = calculatePriceWithDuration(basePrice, durationMonths);
  
  // Apply auto-renew discount if enabled
  if (autoRenew) {
    const autoRenewDiscount = 0.05; // 5% discount
    price = price * (1 - autoRenewDiscount);
  }
  
  return price;
};

/**
 * Get Stripe product ID based on tier, duration and auto-renew status
 */
export const getStripeProductId = (
  selectedPricingTier: string,
  durationMonths: number,
  autoRenew: boolean = false
): string | null => {
  // Validate inputs
  if (!selectedPricingTier || !durationMonths) {
    console.error("Missing required parameters for Stripe product ID lookup", {
      tier: selectedPricingTier,
      duration: durationMonths
    });
    return null;
  }

  // Map of product IDs by tier, duration, and renewal option
  const productIds: Record<string, Record<number, Record<boolean, string>>> = {
    standard: {
      1: { true: 'price_1NxYs2DfXxB9DeyaasdqWERE', false: 'price_1NxYrKDfXxB9Deyaasf35Dda' },
      3: { true: 'price_1NxYs2DfXxB9DeyaFG4qWEDF', false: 'price_1NxYrKDfXxB9DeyaSD35Dda' },
      6: { true: 'price_1NxYs2DfXxB9DeyaFGGGEDF', false: 'price_1NxYrKDfXxB9DeyaSDGHDda' },
      12: { true: 'price_1NxYs2DfXxB9DeyJJGGGEDF', false: 'price_1NxYrKDfXxB9DYYYSDGHDda' }
    },
    premium: {
      1: { true: 'price_1NxYs2DfXxB9Deya0Et6YiXP', false: 'price_1NxYrKDfXxB9DeyaopoCSmvx' },
      3: { true: 'price_1NxYs2DfXxB9DeyaEEEYiXP', false: 'price_1NxYrKDfXxB9DeyUUUCSmvx' },
      6: { true: 'price_1NxYs2DfXxB9DeyaAAAYiXP', false: 'price_1NxYrKDfXxB9DeyQQQCSmvx' },
      12: { true: 'price_1NxYs2DfXxB9DeyLLLLYiXP', false: 'price_1NxYrKDfXxB9DeyBBBBSmvx' }
    },
    gold: {
      1: { true: 'price_1NxYs2DfXxB9Deya7cKbQrAF', false: 'price_1NxYrKDfXxB9DeyalVuCeN1I' },
      3: { true: 'price_1NxYs2DfXxB9DeyaRRRbQrAF', false: 'price_1NxYrKDfXxB9DeWWWVuCeN1I' },
      6: { true: 'price_1NxYs2DfXxB9DeyaMMMbQrAF', false: 'price_1NxYrKDfXxB9DeyaPPPCeN1I' },
      12: { true: 'price_1NxYs2DfXxB9DeyZZZZbQrAF', false: 'price_1NxYrKDfXxB9DeyaXXXCeN1I' }
    }
  };

  try {
    return productIds[selectedPricingTier][durationMonths][autoRenew] || null;
  } catch (e) {
    console.error("Error retrieving Stripe product ID:", e);
    console.error("Invalid pricing configuration:", {
      tier: selectedPricingTier,
      duration: durationMonths,
      autoRenew
    });
    return null;
  }
};

// Helper to determine if a plan should use subscription mode
export const isSubscriptionPlan = (pricingOptions: PricingOptions): boolean => {
  if (!pricingOptions) return false;
  return pricingOptions.autoRenew === true && pricingOptions.selectedPricingTier !== 'free';
};

// Convert dollar amount to cents for Stripe
export const getAmountInCents = (amount: number): number => {
  return Math.round(amount * 100);
};
