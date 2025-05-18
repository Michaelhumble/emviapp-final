
import { JobPricingOption } from './types';

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

// Calculate pricing based on duration
export const calculateFinalPrice = (basePrice: number, duration: number) => {
  let discountPercentage = 0;
  
  // Apply discount based on subscription length
  if (duration === 3) {
    discountPercentage = 10; // 10% for 3 months
  } else if (duration === 6) {
    discountPercentage = 20; // 20% for 6 months
  } else if (duration === 12) {
    discountPercentage = 35; // 35% for 12 months
  }
  
  const originalPrice = basePrice * duration;
  const finalPrice = originalPrice * (1 - discountPercentage / 100);
  
  return {
    originalPrice,
    finalPrice,
    discountPercentage
  };
};

// Calculate job post price
export const calculateJobPostPrice = (options: any) => {
  const { selectedPricingTier, durationMonths = 1, isFirstPost = false } = options;
  
  // Find the base pricing option
  const pricingOption = jobPricingOptions.find(option => option.id === selectedPricingTier);
  if (!pricingOption) {
    return { originalPrice: 0, finalPrice: 0, discountPercentage: 0 };
  }
  
  // Apply first post free if applicable
  if (isFirstPost && selectedPricingTier === 'free') {
    return { originalPrice: 0, finalPrice: 0, discountPercentage: 0 };
  }
  
  // Calculate with duration discounts
  return calculateFinalPrice(pricingOption.price, durationMonths);
};

// Function to get job post pricing summary
export const getJobPostPricingSummary = (selectedTier: string, duration: number, isFirstPost: boolean = false) => {
  const options = {
    selectedPricingTier: selectedTier,
    durationMonths: duration,
    isFirstPost: isFirstPost
  };
  
  return calculateJobPostPrice(options);
};

// Function to calculate price with duration
export const calculatePriceWithDuration = (basePrice: number, duration: number) => {
  return calculateFinalPrice(basePrice, duration);
};

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
