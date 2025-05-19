import { PricingOptions, JobPricingTier } from './types';

// Define our pricing tiers and their base prices
const BASE_PRICES: Record<JobPricingTier, number> = {
  'free': 0,
  'standard': 9.99,
  'premium': 14.99,
  'gold': 24.99,
  'diamond': 999.99
};

// Define duration-based discount percentages
const DURATION_DISCOUNTS = {
  1: 0,    // No discount for 1 month
  3: 10,   // 10% discount for 3 months
  6: 20,   // 20% discount for 6 months
  12: 35,  // 35% discount for 12 months
};

// Additional pricing options
const NATIONWIDE_FEE = 5.00;         // $5 extra for nationwide visibility
const AUTO_RENEW_DISCOUNT = 0.05;    // 5% discount for auto-renewal

/**
 * Get the job posting price based on pricing options
 * 
 * @param options The pricing options
 * @returns The calculated price details including original price, discounts, and final price
 */
export function getJobPrice(options: PricingOptions): {
  basePrice: number;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  discountAmount: number;
  autoRenewDiscount: number;
  durationMonths: number;
  isFirstPost: boolean;
  isNationwide: boolean;
  selectedTier: JobPricingTier;
} {
  const {
    selectedPricingTier = 'premium',
    durationMonths = 1,
    autoRenew = true,
    isFirstPost = false,
    isNationwide = false
  } = options;
  
  // Handle free tier specially
  if (selectedPricingTier === 'free' && isFirstPost) {
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
      selectedTier: selectedPricingTier
    };
  }

  // Get base price for the selected tier
  const basePrice = BASE_PRICES[selectedPricingTier] || BASE_PRICES.premium;
  
  // Calculate original price (base price × duration)
  const originalPrice = basePrice * durationMonths;
  
  // Apply duration discount
  const discountPercentage = DURATION_DISCOUNTS[durationMonths as keyof typeof DURATION_DISCOUNTS] || 0;
  const discountAmount = originalPrice * (discountPercentage / 100);
  
  // Apply auto-renew discount if enabled
  const autoRenewDiscount = autoRenew ? (originalPrice - discountAmount) * AUTO_RENEW_DISCOUNT : 0;
  
  // Add nationwide fee if selected
  const nationwideFee = isNationwide ? NATIONWIDE_FEE * durationMonths : 0;
  
  // Calculate final price
  let finalPrice = originalPrice - discountAmount - autoRenewDiscount + nationwideFee;
  
  // Ensure price is never negative
  finalPrice = Math.max(finalPrice, 0);
  
  // Round to 2 decimal places
  finalPrice = Math.round(finalPrice * 100) / 100;
  
  return {
    basePrice,
    originalPrice,
    finalPrice,
    discountPercentage,
    discountAmount,
    autoRenewDiscount,
    durationMonths,
    isFirstPost,
    isNationwide,
    selectedTier: selectedPricingTier
  };
}

// Legacy functions for backward compatibility - these all now use the getJobPrice function
export const calculateJobPostPrice = (options: PricingOptions) => {
  const priceData = getJobPrice(options);
  return {
    originalPrice: priceData.originalPrice,
    finalPrice: priceData.finalPrice,
    discountPercentage: priceData.discountPercentage
  };
};

export const getJobPostPricingSummary = (selectedTier: string, duration: number, isFirstPost: boolean = false) => {
  const options = {
    selectedPricingTier: selectedTier as JobPricingTier,
    durationMonths: duration,
    isFirstPost: isFirstPost,
    autoRenew: true,
    isNationwide: false
  };
  
  return calculateJobPostPrice(options);
};

export const calculateFinalPrice = (basePrice: number, duration: number) => {
  const options = {
    selectedPricingTier: 'custom' as JobPricingTier,
    durationMonths: duration,
    autoRenew: true,
    isFirstPost: false,
    isNationwide: false
  };
  
  const customPrice = getJobPrice({ ...options, basePrice });
  
  return {
    originalPrice: customPrice.originalPrice,
    finalPrice: customPrice.finalPrice,
    discountPercentage: customPrice.discountPercentage
  };
};

// Job pricing options
export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free Trial',
    price: 0,
    wasPrice: 9.99,
    description: 'Try our platform risk-free for 30 days',
    vietnameseDescription: 'Dùng thử nền tảng miễn phí trong 30 ngày',
    tag: 'Limited Time',
    features: [
      'One-time free job post',
      'Standard visibility',
      'Basic applicant matching',
      'Valid for 30 days',
      'Auto-converts to paid after trial'
    ],
    isFirstPost: true,
    tier: 'free',
    primaryBenefit: 'Limited Time: Try for Free',
    upsellText: 'Credit card required',
    color: 'bg-gray-50',
    limitedSpots: '50% OFF'
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 9.99,
    wasPrice: 19.99,
    description: 'Regular visibility in search results',
    vietnameseDescription: 'Hiển thị thông thường trong kết quả tìm kiếm',
    features: [
      'Standard search position',
      'Basic candidate matching',
      'Email notifications',
      'Valid for 30 days',
      'Unlimited candidate responses'
    ],
    tier: 'standard',
    primaryBenefit: 'For early adopters!',
    upsellText: 'Special Launch Pricing – Ends Soon!',
    color: 'bg-slate-50',
    limitedSpots: '50% OFF'
  },
  {
    id: 'plus',
    name: 'Plus',
    price: 14.99,
    wasPrice: 29.99,
    description: 'Enhanced visibility for quality candidates',
    vietnameseDescription: 'Hiển thị nổi bật để thu hút ứng viên chất lượng',
    popular: true,
    recommended: true,
    tag: 'Most Popular',
    features: [
      'Featured position in search',
      'Priority matching algorithm',
      'Unlimited candidate responses',
      'Email alerts for new matches',
      'Full access to candidate profiles'
    ],
    tier: 'premium',
    primaryBenefit: 'Most Popular – Smart Choice',
    upsellText: 'Growing Salon\'s Top Pick',
    color: 'bg-gradient-to-br from-purple-500/5 to-indigo-500/5',
    limitedSpots: '50% OFF'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 24.99,
    wasPrice: 49.99,
    description: 'Maximum exposure to top talent',
    vietnameseDescription: 'Tiếp cận tối đa tới nhân tài hàng đầu',
    tag: 'Power Seller',
    features: [
      'Top placement guarantee',
      'Premium badge on listing',
      'Featured in email campaigns',
      'SMS notifications',
      'Dedicated support agent'
    ],
    tier: 'gold',
    primaryBenefit: 'Maximum Visibility & Fastest Hires',
    upsellText: 'Power Seller Choice',
    color: 'bg-gradient-to-br from-amber-500/5 to-yellow-500/5',
    limitedSpots: '50% OFF'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 999.99,
    wasPrice: 1299.99,
    description: 'Ultimate Status - Apply for Waitlist',
    vietnameseDescription: 'Trạng thái Cao cấp - Đăng ký vào danh sách chờ',
    tag: 'Ultimate',
    features: [
      'Exclusive top positioning',
      'Talent sourcing team',
      'Personalized candidate matching',
      'Background screening included',
      'VIP concierge service'
    ],
    tier: 'diamond',
    primaryBenefit: 'The world sees your ad first',
    upsellText: 'Waitlist or Bid Required',
    color: 'bg-gradient-to-br from-cyan-500/5 to-blue-500/5',
    hidden: false, // Changed to false to show it
    annual: true,
    limitedSpots: '25% OFF'
  }
];

// Function to validate pricing options
export const validatePricingOptions = (options: any) => {
  const { selectedPricingTier } = options;
  
  if (!selectedPricingTier) {
    return false;
  }
  
  return jobPricingOptions.some(option => option.id === selectedPricingTier);
};

// Function to get Stripe price ID
export const getStripePriceId = (tier: string, duration: number) => {
  // This would normally map to actual Stripe price IDs
  return `price_${tier}_${duration}months`;
};

// Function to get amount in cents for Stripe
export const getAmountInCents = (amount: number) => {
  return Math.round(amount * 100);
};

// Function to check if a plan is a subscription
export const isSubscriptionPlan = (tier: string) => {
  // Define which tiers are subscription-based
  return ['basic', 'plus', 'pro', 'diamond'].includes(tier);
};
