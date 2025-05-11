
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

export const getStripePriceId = (pricingTier: string): string | null => {
  switch (pricingTier) {
    case 'standard':
      return process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID || null;
    case 'premium':
      return process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || null;
    default:
      return null;
  }
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
 * @returns An object containing pricing details
 */
export const calculateJobPostPrice = (options: PricingOptions) => {
  // Get the base price from the selected pricing tier
  const selectedPricingOption = jobPricingOptions.find(option => option.id === options.selectedPricingTier);
  const basePrice = selectedPricingOption ? selectedPricingOption.price : 0;
  
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
  
  // Calculate the final price
  const discount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discount;
  
  return {
    originalPrice,
    finalPrice,
    discountPercentage
  };
};

