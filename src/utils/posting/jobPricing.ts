
import { PricingOptions, JobPricingTier, JobPricingOption } from './types';

// Define pricing tiers with appropriate prices
export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    priceMonthly: 0,
    description: 'Get started with a free listing for 7 days',
    vietnameseDescription: 'Bắt đầu với một bài đăng miễn phí trong 7 ngày',
    features: [
      'Active for 7 days',
      'Basic visibility',
      'Standard listing'
    ],
    tier: 'free',
    primaryBenefit: 'Free 7-day post'
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    priceMonthly: 9.99,
    wasPrice: 19.99,
    description: 'Perfect for individual job listings',
    vietnameseDescription: 'Hoàn hảo cho các bài đăng công việc cá nhân',
    features: [
      '30 days active listing',
      'Standard visibility',
      'Email support'
    ],
    tier: 'standard',
    primaryBenefit: 'Basic job post'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 14.99,
    priceMonthly: 14.99,
    wasPrice: 29.99,
    description: 'Enhanced visibility for your job listings',
    vietnameseDescription: 'Hiển thị nổi bật cho các bài đăng việc làm của bạn',
    tag: 'Best Value',
    popular: true,
    features: [
      '30 days active listing',
      'Higher visibility in search',
      'Featured tag',
      'Priority support'
    ],
    tier: 'premium',
    primaryBenefit: 'Higher visibility',
    recommended: true
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 24.99,
    priceMonthly: 24.99,
    wasPrice: 49.99,
    description: 'Maximum exposure for urgent hiring needs',
    vietnameseDescription: 'Phơi bày tối đa cho nhu cầu tuyển dụng khẩn cấp',
    features: [
      '60 days active listing',
      'Highest search ranking',
      'Highlighted listing',
      'Premium placement',
      'Priority email & phone support'
    ],
    tier: 'gold',
    primaryBenefit: 'Maximum exposure',
    limitedSpots: 'Only 5 spots available'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 999.99,
    priceMonthly: 999.99,
    description: 'Custom enterprise solution for large salons',
    vietnameseDescription: 'Giải pháp doanh nghiệp tùy chỉnh cho các salon lớn',
    features: [
      'Unlimited job posts',
      'Verified business badge',
      'Featured salon profile',
      'Dedicated account manager',
      'Custom recruitment solutions',
      'Analytics dashboard'
    ],
    tier: 'diamond',
    primaryBenefit: 'Enterprise solution'
  }
];

// Calculate the final price based on selected options
export function getJobPrice(options: PricingOptions) {
  const { 
    selectedPricingTier, 
    durationMonths = 1, 
    autoRenew = false, 
    isFirstPost = false,
    isNationwide = false 
  } = options;
  
  // Find the selected pricing tier
  const selectedTier = jobPricingOptions.find(option => option.tier === selectedPricingTier);
  
  // If no valid tier found, return zeros
  if (!selectedTier) {
    return {
      basePrice: 0,
      originalPrice: 0,
      finalPrice: 0,
      discountPercentage: 0,
      discountAmount: 0,
      autoRenewDiscount: 0,
      durationMonths,
      isFirstPost,
      isNationwide,
      selectedTier: 'standard' as JobPricingTier
    };
  }
  
  // Base monthly price from selected tier
  const basePrice = selectedTier.priceMonthly || selectedTier.price;
  
  // Free first post (if applicable)
  if (isFirstPost && selectedTier.tier !== 'diamond') {
    return {
      basePrice,
      originalPrice: 0,
      finalPrice: 0,
      discountPercentage: 100,
      discountAmount: basePrice * durationMonths,
      autoRenewDiscount: 0,
      durationMonths,
      isFirstPost,
      isNationwide,
      selectedTier: selectedPricingTier as JobPricingTier
    };
  }
  
  // Original price before discounts
  const originalPrice = basePrice * durationMonths;
  
  // Calculate duration discount percentage
  let durationDiscountPercentage = 0;
  if (durationMonths === 3) {
    durationDiscountPercentage = 10; // 10% discount for 3 months
  } else if (durationMonths === 6) {
    durationDiscountPercentage = 15; // 15% discount for 6 months
  } else if (durationMonths >= 12) {
    durationDiscountPercentage = 20; // 20% discount for 12+ months
  }
  
  // Calculate auto-renew discount
  let autoRenewDiscount = 0;
  if (autoRenew && durationMonths === 1) {
    autoRenewDiscount = originalPrice * 0.05; // 5% discount for auto-renew
  }
  
  // Calculate total discount percentage
  const totalDiscountPercentage = durationDiscountPercentage;
  
  // Calculate discount amount from percentage
  const discountAmount = (originalPrice * totalDiscountPercentage / 100) + autoRenewDiscount;
  
  // Apply nationwide fee if applicable
  const nationwidePrice = isNationwide && basePrice > 0 ? 5 : 0;
  
  // Calculate final price
  const finalPrice = originalPrice - discountAmount + nationwidePrice;
  
  return {
    basePrice,
    originalPrice,
    finalPrice,
    discountPercentage: totalDiscountPercentage,
    discountAmount,
    autoRenewDiscount,
    durationMonths,
    isFirstPost,
    isNationwide,
    selectedTier: selectedPricingTier as JobPricingTier
  };
}

// Format price for display
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
}

// Calculate amount in cents for Stripe
export function getAmountInCents(price: number): number {
  return Math.round(price * 100);
}

// Convert to Stripe amount (cents)
export function toStripeAmount(price: number): number {
  return Math.round(price * 100);
}

// Check if a plan is subscription or one-time
export function isSubscriptionPlan(plan: string): boolean {
  // All plans are subscription except free and perhaps others specifically marked
  return plan !== 'free';
}

// Utility to get Stripe price ID based on tier and duration
export function getStripePriceId(tier: JobPricingTier, durationMonths: number): string {
  // This would typically be a lookup table for your actual Stripe price IDs
  // These are placeholders and should be replaced with actual Stripe price IDs
  const priceIdMap: Record<JobPricingTier, Record<number, string>> = {
    free: {
      1: 'free_not_applicable',
    },
    standard: {
      1: 'price_standard_monthly',
      3: 'price_standard_quarterly',
      6: 'price_standard_biannual',
      12: 'price_standard_annual',
    },
    premium: {
      1: 'price_premium_monthly',
      3: 'price_premium_quarterly',
      6: 'price_premium_biannual',
      12: 'price_premium_annual',
    },
    gold: {
      1: 'price_gold_monthly',
      3: 'price_gold_quarterly',
      6: 'price_gold_biannual',
      12: 'price_gold_annual',
    },
    diamond: {
      1: 'price_diamond_monthly',
    }
  };
  
  return priceIdMap[tier]?.[durationMonths] || `price_${tier}_${durationMonths}month`;
}

// Check if a user can access the Diamond tier
export function canAccessDiamondTier(userId: string): boolean {
  // This would need to be implemented based on your business logic
  // For example, checking a database for approved users
  return false; // Default to false (invitation only)
}

// Calculate detailed job post price with all options
export function calculateJobPostPrice(options: PricingOptions) {
  return getJobPrice(options);
}

// Calculate final price with all options and discounts
export function calculateFinalPrice(options: PricingOptions): number {
  const priceDetails = getJobPrice(options);
  return priceDetails.finalPrice;
}

// Get a summarized version of the pricing details
export function getJobPostPricingSummary(options: PricingOptions) {
  const priceDetails = getJobPrice(options);
  return {
    tier: options.selectedPricingTier,
    finalPrice: priceDetails.finalPrice,
    discount: priceDetails.discountPercentage,
    duration: options.durationMonths
  };
}

// Validate pricing options to ensure they're complete and valid
export function validatePricingOptions(options: PricingOptions): boolean {
  // Check required fields
  if (!options.selectedPricingTier || !options.durationMonths) {
    return false;
  }
  
  // Check valid tier
  const validTiers: JobPricingTier[] = ['free', 'standard', 'premium', 'gold', 'diamond'];
  if (!validTiers.includes(options.selectedPricingTier)) {
    return false;
  }
  
  // Check valid duration
  const validDurations = [1, 3, 6, 12];
  if (!validDurations.includes(options.durationMonths)) {
    return false;
  }
  
  return true;
}
