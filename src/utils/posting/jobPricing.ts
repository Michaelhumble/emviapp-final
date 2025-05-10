
import { JobPricingOption, PricingOptions } from './types';
import { DurationOption } from '@/types/pricing';

export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Free listing for 30 days',
    vietnameseDescription: 'Đăng tin miễn phí trong 30 ngày',
    features: [
      'Limited visibility',
      'Standard placement in listings'
    ],
    tier: 'free'
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 49.99,
    description: 'Standard listing with increased visibility',
    vietnameseDescription: 'Đăng tin tiêu chuẩn với khả năng hiển thị cao',
    features: [
      'Increased visibility',
      'Featured in search results'
    ],
    tier: 'standard'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 99.99,
    description: 'Premium listing with top placement',
    vietnameseDescription: 'Đăng tin cao cấp với vị trí hàng đầu',
    features: [
      'Top placement in listings',
      'Highlight in search results',
      'Social media promotion'
    ],
    tier: 'premium'
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 199.99,
    description: 'Gold listing with maximum exposure',
    vietnameseDescription: 'Đăng tin vàng với khả năng hiển thị tối đa',
    features: [
      'Maximum visibility',
      'Exclusive placement',
      'Dedicated support'
    ],
    tier: 'gold'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 299.99,
    description: 'Diamond listing with ultimate exposure',
    vietnameseDescription: 'Đăng tin kim cương với khả năng hiển thị tuyệt vời',
    features: [
      'Ultimate visibility',
      'Priority placement',
      '24/7 dedicated support'
    ],
    tier: 'diamond'
  }
];

export const durationOptions: DurationOption[] = [
  { months: 1, label: '1 Month', vietnameseLabel: '1 Tháng', discount: 0 },
  { months: 3, label: '3 Months', vietnameseLabel: '3 Tháng', discount: 10 },
  { months: 6, label: '6 Months', vietnameseLabel: '6 Tháng', discount: 15 },
  { months: 12, label: '12 Months', vietnameseLabel: '12 Tháng', discount: 20 }
];

// Define a mapping of Stripe product IDs based on pricing tier, duration and auto-renew status
const stripeProductIdMap = {
  standard: {
    1: {
      autoRenew: 'price_XXX_STANDARD_AUTO_949',
      oneTime: 'price_XXX_STANDARD_999'
    },
    3: {
      autoRenew: 'price_XXX_STANDARD_3M_AUTO_2699',
      oneTime: 'price_XXX_STANDARD_3M_2799'
    },
    6: {
      autoRenew: 'price_XXX_STANDARD_6M_AUTO_4999',
      oneTime: 'price_XXX_STANDARD_6M_5299'
    },
    12: {
      autoRenew: 'price_XXX_STANDARD_12M_AUTO_9499',
      oneTime: 'price_XXX_STANDARD_12M_9999'
    }
  },
  premium: {
    1: {
      autoRenew: 'price_XXX_PREMIUM_AUTO_4999',
      oneTime: 'price_XXX_PREMIUM_4999'
    },
    3: {
      autoRenew: 'price_XXX_PREMIUM_3M_AUTO_13499',
      oneTime: 'price_XXX_PREMIUM_3M_13999'
    },
    6: {
      autoRenew: 'price_XXX_PREMIUM_6M_AUTO_24999',
      oneTime: 'price_XXX_PREMIUM_6M_26999'
    },
    12: {
      autoRenew: 'price_XXX_PREMIUM_12M_AUTO_47999',
      oneTime: 'price_XXX_PREMIUM_12M_49999'
    }
  },
  gold: {
    1: {
      autoRenew: 'price_XXX_GOLD_AUTO_1899',
      oneTime: 'price_XXX_GOLD_1999'
    },
    3: {
      autoRenew: 'price_XXX_GOLD_3M_AUTO_5399',
      oneTime: 'price_XXX_GOLD_3M_5699'
    },
    6: {
      autoRenew: 'price_XXX_GOLD_6M_AUTO_9999',
      oneTime: 'price_XXX_GOLD_6M_10999'
    },
    12: {
      autoRenew: 'price_XXX_GOLD_12M_AUTO_18999',
      oneTime: 'price_XXX_GOLD_12M_19999'
    }
  },
  diamond: {
    1: {
      autoRenew: 'price_XXX_DIAMOND_AUTO_2899',
      oneTime: 'price_XXX_DIAMOND_2999'
    },
    3: {
      autoRenew: 'price_XXX_DIAMOND_3M_AUTO_8099',
      oneTime: 'price_XXX_DIAMOND_3M_8499'
    },
    6: {
      autoRenew: 'price_XXX_DIAMOND_6M_AUTO_15299',
      oneTime: 'price_XXX_DIAMOND_6M_15999'
    },
    12: {
      autoRenew: 'price_XXX_DIAMOND_12M_AUTO_28499',
      oneTime: 'price_XXX_DIAMOND_12M_29999'
    }
  }
};

export const getJobPostPricingSummary = (options: PricingOptions): string => {
  let summary = `Selected Pricing Tier: ${options.selectedPricingTier}`;
  if (options.isFirstPost) {
    summary += ', First Post Discount Applied';
  }
  if (options.isNationwide) {
    summary += ', Nationwide Visibility';
  }
  return summary;
};

export const calculatePriceWithDuration = (basePrice: number, durationMonths: number, discountPercentage: number): number => {
  const originalPrice = basePrice * durationMonths;
  const discount = (originalPrice * discountPercentage) / 100;
  return originalPrice - discount;
};

export const validatePricingOptions = (options: PricingOptions): boolean => {
  if (!options) return false;
  if (!options.selectedPricingTier) return false;
  return true;
};

/**
 * Gets the Stripe price ID based on pricing tier, duration, and auto-renew status
 * @param pricingTier The pricing tier selected
 * @param durationMonths The duration in months
 * @param autoRenew Whether auto-renew is enabled
 * @returns The Stripe price ID or null if not available
 */
export const getStripeProductId = (
  pricingTier: string, 
  durationMonths: number = 1, 
  autoRenew: boolean = false
): string | null => {
  // Free plan has no Stripe product ID
  if (pricingTier === 'free') return null;
  
  // Check if tier exists in the map
  if (!stripeProductIdMap[pricingTier]) return null;
  
  // Check if duration exists for the tier
  if (!stripeProductIdMap[pricingTier][durationMonths]) {
    // Default to 1 month if the specific duration is not available
    durationMonths = 1;
  }
  
  // Get the price ID based on auto-renew status
  return autoRenew 
    ? stripeProductIdMap[pricingTier][durationMonths].autoRenew
    : stripeProductIdMap[pricingTier][durationMonths].oneTime;
};

// Modify the calculateFinalPrice function to return an object with the expected properties
export const calculateFinalPrice = (basePrice: number, durationMonths: number) => {
  // Calculate original price (before any discounts)
  const originalPrice = basePrice * durationMonths;
  
  // Define discount percentage based on duration
  let discountPercentage = 0;
  
  if (durationMonths === 3) {
    discountPercentage = 10;
  } else if (durationMonths === 6) {
    discountPercentage = 15;
  } else if (durationMonths >= 12) {
    discountPercentage = 20;
  }
  
  // Calculate final price after applying discount
  const discount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discount;
  
  // Return an object with all required properties
  return {
    originalPrice,
    finalPrice,
    discountPercentage
  };
};

export const getAmountInCents = (amount: number): number => {
  return Math.round(amount * 100);
};

export const isSubscriptionPlan = (pricingId: string): boolean => {
    return pricingId !== 'free';
};

/**
 * Calculate the price for a job post based on pricing options
 * @param options - The pricing options selected by the user
 * @returns An object containing pricing details or null if required options are missing
 */
export const calculateJobPostPrice = (options: PricingOptions) => {
  // Check for required parameters
  if (!options || !options.selectedPricingTier || !options.durationMonths) {
    return null;
  }
  
  // Get the base price from the selected pricing tier
  const selectedPricingOption = jobPricingOptions.find(option => option.id === options.selectedPricingTier);
  if (!selectedPricingOption) {
    return null;
  }
  
  const basePrice = selectedPricingOption.price;
  
  // Get duration (default to 1 if not specified)
  const durationMonths = options.durationMonths || 1;
  
  // Calculate original price (before any discounts)
  const originalPrice = basePrice * durationMonths;
  
  // Define discount percentage based on duration
  let discountPercentage = 0;
  
  if (durationMonths === 3) {
    discountPercentage = 10;
  } else if (durationMonths === 6) {
    discountPercentage = 15;
  } else if (durationMonths >= 12) {
    discountPercentage = 20;
  }
  
  // Add first post discount if applicable
  if (options.isFirstPost) {
    discountPercentage += 5; // Additional 5% discount for first-time posters
  }
  
  // Apply auto-renew discount if enabled
  if (options.autoRenew) {
    discountPercentage += 5; // Additional 5% discount for auto-renew
  }
  
  // Calculate the final price
  const discount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discount;
  
  return {
    originalPrice,
    finalPrice,
    discountPercentage
  };
};


