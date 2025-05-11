
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

// Calculate price with duration discount
export const calculatePriceWithDuration = (basePrice: number, months: number) => {
  let discount = 0;
  
  if (months === 3) discount = 0.1;
  else if (months === 6) discount = 0.15;
  else if (months === 12) discount = 0.2;
  
  return basePrice * months * (1 - discount);
};

// Validate pricing options
export const validatePricingOptions = (options: PricingOptions) => {
  if (!options) return false;
  
  // Ensure required fields are present
  if (!options.selectedPricingTier || !options.durationMonths) {
    return false;
  }
  
  // Validate the tier exists
  const validTier = jobPricingOptions.some(option => option.id === options.selectedPricingTier);
  if (!validTier) return false;
  
  // Validate duration is valid
  const validDuration = [1, 3, 6, 12].includes(options.durationMonths);
  if (!validDuration) return false;
  
  return true;
};

// Map pricing configuration to Stripe product IDs
export const getStripeProductId = (
  pricingTier: string,
  durationMonths: number = 1,
  autoRenew: boolean = false
): string | null => {
  // Return null for invalid inputs
  if (!pricingTier || !durationMonths) {
    return null;
  }
  
  // Handle free tier (no product ID needed)
  if (pricingTier === 'free') {
    return null;
  }
  
  // Map pricing tier and duration to Stripe product IDs
  const productMapping = {
    // Standard tier
    'standard': {
      1: {
        true: 'price_XXX_STANDARD_1M_AUTO_949',   // 1 month with auto-renew
        false: 'price_XXX_STANDARD_1M_999'        // 1 month one-time
      },
      3: {
        true: 'price_XXX_STANDARD_3M_AUTO_2550',
        false: 'price_XXX_STANDARD_3M_2699'
      },
      6: {
        true: 'price_XXX_STANDARD_6M_AUTO_4675',
        false: 'price_XXX_STANDARD_6M_5099'
      },
      12: {
        true: 'price_XXX_STANDARD_12M_AUTO_7999',
        false: 'price_XXX_STANDARD_12M_8999'
      }
    },
    // Premium tier
    'premium': {
      1: {
        true: 'price_XXX_PREMIUM_AUTO_4999',
        false: 'price_XXX_PREMIUM_4999'
      },
      3: {
        true: 'price_XXX_PREMIUM_3M_AUTO_13499',
        false: 'price_XXX_PREMIUM_3M_13499'
      },
      6: {
        true: 'price_XXX_PREMIUM_6M_AUTO_25499',
        false: 'price_XXX_PREMIUM_6M_25499'
      },
      12: {
        true: 'price_XXX_PREMIUM_12M_AUTO_47999',
        false: 'price_XXX_PREMIUM_12M_47999'
      }
    },
    // Gold tier
    'gold': {
      1: {
        true: 'price_XXX_GOLD_AUTO_1999',
        false: 'price_XXX_GOLD_1999'
      },
      3: {
        true: 'price_XXX_GOLD_3M_AUTO_5399',
        false: 'price_XXX_GOLD_3M_5399'
      },
      6: {
        true: 'price_XXX_GOLD_6M_AUTO_10199',
        false: 'price_XXX_GOLD_6M_10199'
      },
      12: {
        true: 'price_XXX_GOLD_12M_AUTO_19199',
        false: 'price_XXX_GOLD_12M_19199'
      }
    },
    // Diamond tier
    'diamond': {
      1: {
        true: 'price_XXX_DIAMOND_AUTO_9999',
        false: 'price_XXX_DIAMOND_9999'
      },
      3: {
        true: 'price_XXX_DIAMOND_3M_AUTO_26997',
        false: 'price_XXX_DIAMOND_3M_26997'
      },
      6: {
        true: 'price_XXX_DIAMOND_6M_AUTO_50995',
        false: 'price_XXX_DIAMOND_6M_50995'
      },
      12: {
        true: 'price_XXX_DIAMOND_12M_AUTO_95990',
        false: 'price_XXX_DIAMOND_12M_95990'
      }
    }
  };
  
  // Check if the mapping exists
  if (!productMapping[pricingTier] || 
      !productMapping[pricingTier][durationMonths] || 
      productMapping[pricingTier][durationMonths][autoRenew] === undefined) {
    console.error(`Invalid pricing configuration: tier=${pricingTier}, months=${durationMonths}, autoRenew=${autoRenew}`);
    return null;
  }
  
  return productMapping[pricingTier][durationMonths][autoRenew];
};

// Helper to determine if a plan should use subscription mode
export const isSubscriptionPlan = (pricingOptions: PricingOptions): boolean => {
  if (!pricingOptions) return false;
  return pricingOptions.autoRenew === true && pricingOptions.selectedPricingTier !== 'free';
};

// Calculate final price with all discounts
export const calculateFinalPrice = (basePrice: number, options: PricingOptions): number => {
  if (!options || !options.durationMonths) return basePrice;
  
  const result = calculateJobPostPrice(options);
  if (!result) return basePrice;
  
  return result.finalPrice;
};

// Convert dollar amount to cents for Stripe
export const getAmountInCents = (amount: number): number => {
  return Math.round(amount * 100);
};
