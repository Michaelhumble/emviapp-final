import { JobPricingOption, PricingOptions } from './types';
import { DurationOption } from '@/types/pricing';

export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Basic (Limited Reach)',
    price: 0,
    description: 'Free listing with very limited visibility',
    vietnameseDescription: 'Đăng tin miễn phí với khả năng hiển thị rất hạn chế',
    features: [
      'Limited visibility',
      'Standard placement in listings'
    ],
    tier: 'free'
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    wasPrice: 14.99,
    description: 'Smart Choice for most businesses',
    vietnameseDescription: 'Lựa chọn thông minh cho hầu hết các doanh nghiệp',
    features: [
      'Increased visibility',
      'Better search placement'
    ],
    tier: 'standard',
    tag: '🔥 Chosen by over 8,000 salons this year'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    wasPrice: 24.99,
    description: 'Top Pick by Salons',
    vietnameseDescription: 'Lựa chọn hàng đầu của các salon',
    features: [
      'Top placement in listings',
      'Highlighted in search results',
      'Faster candidate matching'
    ],
    tier: 'premium',
    tag: '⭐ Used by 4,500+ serious salons for better results'
  },
  {
    id: 'gold',
    name: 'Featured',
    price: 29.99,
    wasPrice: 39.99,
    description: 'Fastest Hiring Plan',
    vietnameseDescription: 'Kế hoạch tuyển dụng nhanh nhất',
    features: [
      'Premium placement',
      'Homepage feature',
      'Free listing boost',
      'Priority support'
    ],
    tier: 'gold',
    tag: '🏆 Preferred by growing brands – 1,200 upgraded last month'
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
    tier: 'diamond',
    hidden: true // TODO: Diamond tier is temporarily hidden and will be accessible later via waitlist/bid flow
  }
];

export const durationOptions: DurationOption[] = [
  { months: 1, label: '1 Month', vietnameseLabel: '1 Tháng', discount: 0 },
  { months: 3, label: '3 Months', vietnameseLabel: '3 Tháng', discount: 5 },  // 5% discount
  { months: 6, label: '6 Months', vietnameseLabel: '6 Tháng', discount: 10 }, // 10% discount
  { months: 12, label: '12 Months', vietnameseLabel: '12 Tháng', discount: 20 } // 20% discount
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

// Calculates the final price based on base price and duration with appropriate discounts
// Note: Free plan is always 30 days regardless of duration selection
export const calculateFinalPrice = (basePrice: number, durationMonths: number) => {
  // Calculate original price (before any discounts)
  const originalPrice = basePrice * durationMonths;
  
  // Define discount percentage based on duration
  let discountPercentage = 0;
  
  if (durationMonths === 3) {
    discountPercentage = 5; // 5% discount for 3-month duration
  } else if (durationMonths === 6) {
    discountPercentage = 10; // 10% discount for 6-month duration
  } else if (durationMonths >= 12) {
    discountPercentage = 20; // 20% discount for 12-month or longer duration
  }
  
  // Calculate final price after applying discount
  const discount = (originalPrice * discountPercentage) / 100;
  const finalPrice = Number((originalPrice - discount).toFixed(2)); // Round to 2 decimal places at final step
  
  // Return an object with all required properties
  return {
    originalPrice: Number(originalPrice.toFixed(2)),
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
    discountPercentage = 5; // 5% discount for 3-month duration
  } else if (durationMonths === 6) {
    discountPercentage = 10; // 10% discount for 6-month duration
  } else if (durationMonths >= 12) {
    discountPercentage = 20; // 20% discount for 12-month or longer duration
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
