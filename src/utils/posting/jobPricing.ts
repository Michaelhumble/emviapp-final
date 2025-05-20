
import { PricingOptions, JobPricingTier, JobPricingOption } from './types';

// Define the job pricing options for different tiers
export const jobPricingOptions: Record<JobPricingTier, JobPricingOption> = {
  free: {
    id: 'free',
    tier: 'free',
    name: 'Free',
    price: 0,
    description: 'Basic job post for 7 days',
    vietnameseDescription: 'Đăng tin cơ bản, thời hạn 7 ngày',
    features: [
      'Post visible for 7 days',
      'Basic search visibility',
      'No auto-renewal'
    ],
    priceMonthly: 0
  },
  standard: {
    id: 'standard',
    tier: 'standard',
    name: 'Standard',
    price: 9.99,
    wasPrice: 14.99,
    description: 'Standard job post for full visibility',
    vietnameseDescription: 'Đăng tin tiêu chuẩn với khả năng hiển thị đầy đủ',
    features: [
      'Post visible for 30 days',
      'Standard search visibility',
      'Email alerts to potential candidates',
      'Auto-renewal option'
    ],
    priceMonthly: 9.99
  },
  premium: {
    id: 'premium',
    tier: 'premium',
    name: 'Premium',
    price: 19.99,
    wasPrice: 29.99,
    description: 'Premium job post with enhanced visibility',
    vietnameseDescription: 'Đăng tin cao cấp với khả năng hiển thị nâng cao',
    popular: true,
    features: [
      'Highlighted in search results',
      'Premium placement for 30 days',
      'Featured in weekly job alert emails',
      'Detailed analytics',
      'Auto-renewal option'
    ],
    recommended: true,
    priceMonthly: 19.99
  },
  gold: {
    id: 'gold',
    tier: 'gold',
    name: 'Gold',
    price: 39.99,
    wasPrice: 59.99,
    description: 'Top visibility with maximum reach',
    vietnameseDescription: 'Hiển thị hàng đầu với phạm vi tiếp cận tối đa',
    features: [
      'Top of search results',
      'Featured on homepage',
      'Social media promotion',
      'Direct message to top candidates',
      'Full analytics dashboard',
      'Priority customer support',
      'Auto-renewal option'
    ],
    priceMonthly: 39.99
  },
  diamond: {
    id: 'diamond',
    tier: 'diamond',
    name: 'Diamond',
    price: 999.99,
    description: 'Exclusive placement with concierge service',
    vietnameseDescription: 'Đăng tin độc quyền với dịch vụ hỗ trợ riêng',
    tag: 'Invite Only',
    features: [
      'Exclusive placement',
      'Custom branding options',
      'Concierge recruitment service',
      'Direct access to all candidates',
      'Custom analytics reporting',
      'Dedicated account manager'
    ],
    limitedSpots: 'Only 3 spots available',
    priceMonthly: 999.99
  }
};

/**
 * Calculate final price with applied discounts for job posts
 */
export const calculateFinalPrice = (basePrice: number, discountPercentage: number): number => {
  const discountAmount = (basePrice * discountPercentage) / 100;
  return basePrice - discountAmount;
};

/**
 * Get discount percentage based on duration and auto-renew option
 */
export const getDiscountPercentage = (durationMonths: number, autoRenew: boolean): number => {
  let discountPercentage = 0;
  
  // Duration-based discounts
  if (durationMonths === 3) {
    discountPercentage = 10; // 10% discount for 3 months
  } else if (durationMonths === 6) {
    discountPercentage = 15; // 15% discount for 6 months
  } else if (durationMonths >= 12) {
    discountPercentage = 20; // 20% discount for 12+ months
  }
  
  // Auto-renew discount (only for monthly subscriptions)
  if (autoRenew && durationMonths === 1) {
    discountPercentage += 5; // Additional 5% for auto-renew on monthly plans
  }
  
  return discountPercentage;
};

/**
 * Calculate job posting price based on pricing options
 */
export const calculateJobPostPrice = (pricingOptions: PricingOptions) => {
  // Get the base price for the selected tier
  const tierOption = jobPricingOptions[pricingOptions.selectedPricingTier];
  if (!tierOption) {
    throw new Error(`Invalid pricing tier: ${pricingOptions.selectedPricingTier}`);
  }
  
  // First-time posters get free standard tier
  if (pricingOptions.isFirstPost && pricingOptions.selectedPricingTier !== 'diamond') {
    return {
      basePrice: 0,
      originalPrice: 0,
      finalPrice: 0,
      discountPercentage: 0,
      discountAmount: 0
    };
  }
  
  // Base price for the selected tier
  const basePrice = tierOption.price;
  
  // Calculate original price (without discounts)
  const originalPrice = basePrice * pricingOptions.durationMonths;
  
  // Get discount percentage
  const discountPercentage = getDiscountPercentage(
    pricingOptions.durationMonths, 
    pricingOptions.autoRenew || false
  );
  
  // Calculate discount amount
  const discountAmount = (originalPrice * discountPercentage) / 100;
  
  // Calculate the final price with discounts
  const finalPrice = originalPrice - discountAmount;
  
  return {
    basePrice,
    originalPrice,
    finalPrice,
    discountPercentage,
    discountAmount
  };
};

/**
 * Get a summary of the job post pricing for display
 */
export const getJobPostPricingSummary = (pricingOptions: PricingOptions) => {
  const { finalPrice, originalPrice, discountPercentage } = calculateJobPostPrice(pricingOptions);
  
  return {
    finalPrice,
    originalPrice,
    discountPercentage,
    durationText: pricingOptions.durationMonths === 1 
      ? '1 month' 
      : `${pricingOptions.durationMonths} months`,
    durationMonths: pricingOptions.durationMonths
  };
};

/**
 * Validate pricing options to ensure all required fields are present
 */
export const validatePricingOptions = (options: PricingOptions): boolean => {
  if (!options) return false;
  
  // Check for required fields
  if (!options.selectedPricingTier || !options.durationMonths) {
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
 * Get the appropriate Stripe price ID based on pricing options
 * Note: In a real implementation, these would be stored in a database or configuration
 */
export const getStripePriceId = (pricingOptions: PricingOptions): string => {
  const tier = pricingOptions.selectedPricingTier;
  const months = pricingOptions.durationMonths;
  
  // This is a simplified example - in real implementation, 
  // these would be proper Stripe price IDs from your Stripe dashboard
  const priceMap: Record<string, Record<number, string>> = {
    standard: {
      1: 'price_standard_monthly',
      3: 'price_standard_quarterly',
      6: 'price_standard_biannual',
      12: 'price_standard_annual'
    },
    premium: {
      1: 'price_premium_monthly',
      3: 'price_premium_quarterly',
      6: 'price_premium_biannual',
      12: 'price_premium_annual'
    },
    gold: {
      1: 'price_gold_monthly',
      3: 'price_gold_quarterly',
      6: 'price_gold_biannual',
      12: 'price_gold_annual'
    }
  };
  
  return priceMap[tier]?.[months] || 'price_default';
};

/**
 * Convert price to cents for Stripe
 */
export const getAmountInCents = (price: number): number => {
  return Math.round(price * 100);
};

/**
 * Determine if the plan should be handled as a subscription
 */
export const isSubscriptionPlan = (pricingOptions: PricingOptions): boolean => {
  return !!pricingOptions.autoRenew;
};

/**
 * Main function to get job post price details
 */
export const getJobPrice = (options: PricingOptions) => {
  return calculateJobPostPrice(options);
};
