import { JobPricingOption, PricingOptions } from './types';

export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Free job posting with limited visibility',
    vietnameseDescription: 'Đăng tin miễn phí với khả năng hiển thị hạn chế',
    features: ['Limited visibility', 'Standard placement'],
    tier: 'free',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    description: 'Standard job posting with increased visibility',
    vietnameseDescription: 'Đăng tin tiêu chuẩn với khả năng hiển thị tăng lên',
    features: ['Increased visibility', 'Featured placement'],
    tier: 'standard',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    description: 'Premium job posting with maximum visibility',
    vietnameseDescription: 'Đăng tin cao cấp với khả năng hiển thị tối đa',
    features: ['Maximum visibility', 'Top placement', 'Urgent badge'],
    tier: 'premium',
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 29.99,
    description: 'Gold job posting with exclusive features',
    vietnameseDescription: 'Đăng tin vàng với các tính năng độc quyền',
    features: ['Exclusive visibility', 'Highlighted listing', 'Priority support'],
    tier: 'gold',
  },
];

/**
 * Get the job post pricing summary
 */
export const getJobPostPricingSummary = (pricingTier: string) => {
  return jobPricingOptions.find((option) => option.id === pricingTier);
};

/**
 * Calculate the price with duration
 */
export const calculatePriceWithDuration = (basePrice: number, durationMonths: number): number => {
  return basePrice * durationMonths;
};

/**
 * Validate pricing options
 */
export const validatePricingOptions = (pricingOptions: PricingOptions | undefined): boolean => {
  if (!pricingOptions) return false;
  if (!pricingOptions.selectedPricingTier) return false;
  if (!pricingOptions.durationMonths) return false;
  return true;
};

/**
 * Get the stripe product id
 */
export const getStripeProductId = (tier: string, durationMonths: number, autoRenew: boolean): string | null => {
  let productId = null;

  // Construct the product ID based on tier, duration, and autoRenew
  switch (tier) {
    case 'standard':
      productId = 'prod_OiLA4V9mYWIZUJ'; // Standard - 1 month
      if (durationMonths === 3) {
        productId = 'prod_OiL9t2lhzBaK9G'; // Standard - 3 months
      } else if (durationMonths === 6) {
        productId = 'prod_OiLAu5Ka9JZZYB'; // Standard - 6 months
      } else if (durationMonths === 12) {
        productId = 'prod_OiLB59z9ursjJL'; // Standard - 12 months
      }
      break;
    case 'premium':
      productId = 'prod_OiLBUX9mEQQzLQ'; // Premium - 1 month
      if (durationMonths === 3) {
        productId = 'prod_OiLCJ9GqV8xK9i'; // Premium - 3 months
      } else if (durationMonths === 6) {
        productId = 'prod_OiLCWNxj0uWl0H'; // Premium - 6 months
      } else if (durationMonths === 12) {
        productId = 'prod_OiLCz4yW99RF1d'; // Premium - 12 months
      }
      break;
    case 'gold':
      productId = 'prod_OiLD9vJ8QqyD9L'; // Gold - 1 month
      if (durationMonths === 3) {
        productId = 'prod_OiLDLo88D3qD4L'; // Gold - 3 months
      } else if (durationMonths === 6) {
        productId = 'prod_OiLDXhS4m59y3H'; // Gold - 6 months
      } else if (durationMonths === 12) {
        productId = 'prod_OiLDm8181iVuGE'; // Gold - 12 months
      }
      break;
    default:
      return null;
  }

  return productId;
};

/**
 * Calculate the final price based on base price, duration and auto-renew status
 * Always returns an object with originalPrice, finalPrice, and discountPercentage
 */
export function calculateFinalPrice(basePrice: number, duration: number, autoRenew: boolean): {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
} {
  const originalPrice = basePrice * duration;
  let finalPrice = originalPrice;
  
  // Apply duration-based discounts
  if (duration === 3) finalPrice *= 0.9;
  else if (duration === 6) finalPrice *= 0.85;
  else if (duration === 12) finalPrice *= 0.8;

  // Apply auto-renew discount
  if (autoRenew) finalPrice *= 0.95;

  // Round to 2 decimal places
  finalPrice = Math.round(finalPrice * 100) / 100;
  
  // Calculate discount percentage
  const discountPercentage = originalPrice > 0 
    ? Math.round((1 - finalPrice / originalPrice) * 100) 
    : 0;

  return {
    originalPrice,
    finalPrice,
    discountPercentage
  };
}

/**
 * Get discount percentage between original and final price
 */
export function getDiscountPercentage(original: number, final: number): number {
  if (original === 0) return 0;
  return Math.round((1 - final / original) * 100);
}

/**
 * Calculate the job post price with stripe
 */
export function calculateJobPostPrice(tier: string): number {
  switch(tier) {
    case 'free': return 0;
    case 'standard': return 9.99;
    case 'premium': return 19.99;
    case 'gold': return 29.99;
    default: return 9.99;
  }
}

/**
 * Get amount in cents
 */
export const getAmountInCents = (amount: number): number => {
  return Math.round(amount * 100);
};

/**
 * Check if plan is subscription
 */
export const isSubscriptionPlan = (plan: string): boolean => {
  return plan === 'premium' || plan === 'gold';
};

/**
 * Calculate job post price
 */
export const calculateJobPostPriceOld = (
  isFirstPost: boolean = false,
  isNationwide: boolean = false,
  fastSalePackage: boolean = false,
  showAtTop: boolean = false,
  isHotListing: boolean = false,
  isUrgent: boolean = false,
  bundleWithJobPost: boolean = false,
  bundleWithSalonPost: boolean = false,
  boostVisibility: boolean = false,
  featuredListing: boolean = false,
  extendedDuration: boolean = false,
  hasReferrals: boolean = false,
  isRenewal: boolean = false
): number => {
  let price = 0;

  if (isFirstPost) price += 5;
  if (isNationwide) price += 10;
  if (fastSalePackage) price += 15;
  if (showAtTop) price += 20;
  if (isHotListing) price += 25;
  if (isUrgent) price += 30;
  if (bundleWithJobPost) price += 35;
  if (bundleWithSalonPost) price += 40;
  if (boostVisibility) price += 45;
  if (featuredListing) price += 50;
  if (extendedDuration) price += 55;
  if (hasReferrals) price += 60;
  if (isRenewal) price += 65;

  return price;
};
