
import { PricingOptions } from '@/types/pricing';

// Define job pricing options with correct prices
export interface JobPricingOption {
  id: string;
  name: string;
  tier: string;
  price: number;
  wasPrice?: number;
  description: string;
  vietnameseDescription?: string;
  features: string[];
  popular?: boolean;
  tag?: string;
  duration?: number; // Duration in months
}

// Price mapping for Stripe
export const jobPricePriceMap: Record<string, string | null> = {
  'free': null,
  'standard': 'price_XXXX_STANDARD',
  'gold': 'price_XXXX_GOLD',
  'premium': 'price_XXXX_PREMIUM',
  'diamond': 'price_XXXX_DIAMOND'
};

// Duration options for job posts
export const jobDurationOptions = [
  { months: 1, label: '1 Month', vietnameseLabel: '1 Tháng', discount: 0 },
  { months: 3, label: '3 Months', vietnameseLabel: '3 Tháng', discount: 10 },
  { months: 6, label: '6 Months', vietnameseLabel: '6 Tháng', discount: 15 },
  { months: 12, label: '12 Months', vietnameseLabel: '12 Tháng', discount: 20 }
];

// Job pricing tiers
export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free',
    tier: 'free',
    price: 0,
    description: 'Basic listing for first-time posters only',
    vietnameseDescription: 'Đăng tin cơ bản chỉ dành cho người đăng lần đầu',
    features: [
      'Basic visibility',
      '30-day listing',
      'First-time posters only'
    ],
    tag: 'First Post Only'
  },
  {
    id: 'standard',
    name: 'Standard',
    tier: 'standard',
    price: 9.99,
    wasPrice: 19.99,
    description: 'Essential visibility for basic job posts',
    vietnameseDescription: 'Khả năng hiển thị cơ bản cho bài đăng công việc',
    features: [
      'Standard visibility',
      'Email notifications',
      'Basic analytics'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    tier: 'gold',
    price: 19.99,
    wasPrice: 29.99,
    description: 'Enhanced visibility with premium placement',
    vietnameseDescription: 'Tăng cường hiển thị với vị trí ưu tiên',
    features: [
      'Featured listing',
      'Top placement for 7 days',
      'Email and SMS notifications',
      'Enhanced analytics'
    ],
    popular: true,
    tag: 'Most Popular'
  },
  {
    id: 'premium',
    name: 'Premium',
    tier: 'premium',
    price: 29.99,
    description: 'Maximum exposure for urgent hiring needs',
    vietnameseDescription: 'Phơi bày tối đa cho nhu cầu tuyển dụng khẩn cấp',
    features: [
      'Featured listing with urgent tag',
      'Top placement for 14 days',
      'Email, SMS, and app notifications',
      'Premium analytics',
      'Dedicated account manager'
    ],
    tag: 'Best Value'
  }
];

// Function to calculate final price with discounts
export const calculateFinalPrice = (
  basePrice: number,
  durationMonths: number = 1,
  pricingTier: string,
  autoRenew: boolean = false
): { originalPrice: number; finalPrice: number; discountPercentage: number } => {
  // Free tier costs nothing
  if (pricingTier === 'free') {
    return { originalPrice: 0, finalPrice: 0, discountPercentage: 0 };
  }

  // Calculate original price based on duration
  let originalPrice = basePrice * durationMonths;
  
  // Find duration discount
  const durationOption = jobDurationOptions.find(option => option.months === durationMonths);
  const durationDiscount = durationOption?.discount || 0;
  
  // Apply auto-renew discount (5%)
  const autoRenewDiscount = autoRenew ? 5 : 0;
  
  // Calculate total discount percentage
  const discountPercentage = durationDiscount + autoRenewDiscount;
  
  // Apply discount
  const finalPrice = originalPrice * (1 - discountPercentage / 100);
  
  return {
    originalPrice,
    finalPrice,
    discountPercentage
  };
};

// Validate pricing options
export const validatePricingOptions = (pricingOptions?: PricingOptions): boolean => {
  if (!pricingOptions) return false;
  
  // Check if tier exists
  const tier = pricingOptions.selectedPricingTier;
  if (!tier) return false;
  
  // Validate tier exists in our pricing options
  const pricingTier = jobPricingOptions.find(option => option.id === tier);
  if (!pricingTier) return false;
  
  return true;
};

// Get stripe price ID based on tier
export const getStripePriceId = (tier: string): string | null => {
  return jobPricePriceMap[tier] || null;
};
