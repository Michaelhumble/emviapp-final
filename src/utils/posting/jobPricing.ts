
import { JobPricingTier, PricingOptions, JobPricingOption } from './types';

// Pricing tiers for job listings
export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Basic listing for your first post',
    tier: 'free',
    features: [
      'Basic job listing',
      'Live for 30 days',
      'First-time users only'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    wasPrice: 14.99,
    description: 'Great for small businesses',
    tier: 'standard',
    features: [
      'Standard job listing',
      'Live for 30 days',
      'Email applications',
      'Basic analytics'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    wasPrice: 29.99,
    description: 'Our most popular option',
    tier: 'premium',
    primaryBenefit: 'Featured Listing',
    recommended: true,
    features: [
      'Featured in search results',
      'Highlighted with premium badge',
      'Live for 45 days',
      'Email applications',
      'Enhanced analytics',
      'Priority support'
    ],
    color: 'purple'
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 39.99,
    wasPrice: 59.99,
    description: 'Maximum visibility',
    tier: 'gold',
    primaryBenefit: 'Top Visibility',
    features: [
      'Top of search results',
      'Gold badge highlighting',
      'Live for 60 days',
      'Social media promotion',
      'Email applications',
      'Full analytics dashboard',
      'Dedicated support',
      'Boosted visibility'
    ],
    color: 'amber'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 999.99,
    description: 'By invitation only',
    tier: 'diamond',
    primaryBenefit: 'Enterprise Visibility',
    features: [
      'Top of search results',
      'Diamond badge highlighting',
      'Professional design',
      'Custom URL',
      'Nationwide visibility',
      'Social media campaign',
      'Featured in newsletter',
      'Custom recruitment package',
      'Dedicated account manager'
    ],
    color: 'sky',
    limitedSpots: '2 spots available'
  }
];

/**
 * Validates pricing options to ensure they contain required fields
 */
export const validatePricingOptions = (options: PricingOptions): boolean => {
  if (!options) return false;
  
  // Check required fields
  if (options.selectedPricingTier === undefined || options.durationMonths === undefined) {
    return false;
  }
  
  // Validate tier
  const validTiers: JobPricingTier[] = ['free', 'standard', 'premium', 'gold', 'diamond'];
  if (!validTiers.includes(options.selectedPricingTier)) {
    return false;
  }
  
  // Validate duration
  if (options.durationMonths < 1) {
    return false;
  }
  
  return true;
};

/**
 * Calculate final price with all discounts applied
 */
export const calculateFinalPrice = (
  basePrice: number,
  durationMonths: number,
  discounts: { durationDiscount: number; autoRenewDiscount: number }
): number => {
  // Calculate duration multiplier
  const durationMultiplier = durationMonths;
  
  // Calculate subtotal before discounts
  const subtotal = basePrice * durationMultiplier;
  
  // Apply duration discount
  const durationDiscountAmount = subtotal * (discounts.durationDiscount / 100);
  
  // Apply auto-renew discount
  const autoRenewDiscountAmount = subtotal * (discounts.autoRenewDiscount / 100);
  
  // Calculate final price
  const finalPrice = subtotal - durationDiscountAmount - autoRenewDiscountAmount;
  
  // Return final price, ensuring it's not negative
  return Math.max(0, finalPrice);
};

/**
 * Calculate job post price based on pricing options
 */
export const calculateJobPostPrice = (options: PricingOptions) => {
  // Find the pricing tier
  const tierOption = jobPricingOptions.find(option => option.tier === options.selectedPricingTier);
  if (!tierOption) {
    throw new Error(`Invalid pricing tier: ${options.selectedPricingTier}`);
  }
  
  // Get the base price from the tier
  let basePrice = tierOption.price;
  
  // Check if this is the first post and eligible for free tier
  if (options.isFirstPost && options.selectedPricingTier === 'free') {
    basePrice = 0;
  }
  
  // Calculate discounts
  let durationDiscount = 0;
  // Apply duration discounts
  if (options.durationMonths === 3) {
    durationDiscount = 10; // 10% discount for 3 months
  } else if (options.durationMonths === 6) {
    durationDiscount = 15; // 15% discount for 6 months
  } else if (options.durationMonths >= 12) {
    durationDiscount = 20; // 20% discount for 12+ months
  }
  
  // Auto-renew discount is applied only if enabled and for monthly plans
  const autoRenewDiscount = (options.autoRenew && options.durationMonths === 1) ? 5 : 0;
  
  // Calculate the final price
  const finalPrice = calculateFinalPrice(
    basePrice,
    options.durationMonths,
    { durationDiscount, autoRenewDiscount }
  );
  
  // Calculate nationwide fee if applicable
  const nationwideFee = (options.isNationwide && basePrice > 0) ? 5 : 0;
  
  // Return price breakdown
  return {
    basePrice,
    finalPrice: finalPrice + nationwideFee,
    durationDiscount,
    autoRenewDiscount,
    nationwideFee,
    originalPrice: basePrice * options.durationMonths,
    discountAmount: (basePrice * options.durationMonths) - finalPrice
  };
};

/**
 * Get a job post pricing summary with all details needed for display
 */
export const getJobPostPricingSummary = (options: PricingOptions) => {
  const priceDetails = calculateJobPostPrice(options);
  
  // Calculate discount percentage
  const discountPercentage = Math.round(
    (priceDetails.durationDiscount + priceDetails.autoRenewDiscount)
  );
  
  return {
    ...priceDetails,
    discountPercentage,
    durationMonths: options.durationMonths,
    selectedTier: options.selectedPricingTier
  };
};

/**
 * Get the Stripe price ID based on pricing options
 */
export const getStripePriceId = (options: PricingOptions): string => {
  // In a real implementation, you would map your pricing tiers to Stripe product/price IDs
  // This is a placeholder implementation
  const tierMap: Record<JobPricingTier, string> = {
    'free': 'price_free_tier',
    'standard': 'price_standard_tier',
    'premium': 'price_premium_tier',
    'gold': 'price_gold_tier',
    'diamond': 'price_diamond_tier'
  };
  
  return tierMap[options.selectedPricingTier] || '';
};

/**
 * Convert price to cents for Stripe
 */
export const getAmountInCents = (price: number): number => {
  return Math.round(price * 100);
};

/**
 * Check if pricing option should be treated as subscription
 */
export const isSubscriptionPlan = (options: PricingOptions): boolean => {
  // Plans with autoRenew enabled are treated as subscriptions
  return !!options.autoRenew;
};

/**
 * Main function to get job price with all calculations
 */
export const getJobPrice = (options: PricingOptions) => {
  if (!validatePricingOptions(options)) {
    throw new Error('Invalid pricing options');
  }
  
  // Calculate price
  const priceDetails = calculateJobPostPrice(options);
  
  // Add additional fields needed for payment summary
  const discountPercentage = priceDetails.durationDiscount + priceDetails.autoRenewDiscount;
  
  // Format discount label
  let discountLabel = '';
  if (discountPercentage > 0) {
    discountLabel = `${discountPercentage}% Discount`;
  }
  
  // Return final price details
  return {
    basePrice: priceDetails.basePrice,
    originalPrice: priceDetails.originalPrice,
    finalPrice: priceDetails.finalPrice,
    discountAmount: priceDetails.discountAmount,
    discountPercentage,
    discountLabel,
    isFoundersDiscount: false // Can be set based on other criteria
  };
};
