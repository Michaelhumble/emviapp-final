import { PricingOptions } from './types';

export const jobPricingOptions = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'List your job for free',
    vietnameseDescription: 'Đăng tin tuyển dụng miễn phí',
    features: [
      'Limited visibility',
      'Tin hiển thị hạn chế'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    description: 'Reach more candidates',
    vietnameseDescription: 'Tiếp cận nhiều ứng viên hơn',
    features: [
      'Higher visibility',
      'Tin hiển thị nổi bật hơn',
      '30-day listing',
      'Tin đăng 30 ngày'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    popular: true,
    description: 'Attract top talent',
    vietnameseDescription: 'Thu hút nhân tài hàng đầu',
    features: [
      'Featured listing',
      'Tin đăng nổi bật',
      'Priority placement',
      'Vị trí ưu tiên',
      '60-day listing',
      'Tin đăng 60 ngày'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 29.99,
    description: 'Maximize your reach',
    vietnameseDescription: 'Tối đa hóa phạm vi tiếp cận của bạn',
    features: [
      'Top placement',
      'Vị trí hàng đầu',
      'Extended visibility',
      'Tăng khả năng hiển thị',
      '90-day listing',
      'Tin đăng 90 ngày',
      'Unlimited access to candidate profiles',
      'Truy cập không giới hạn vào hồ sơ ứng viên'
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 49.99,
    tag: 'Exclusive',
    description: 'The ultimate solution for hiring',
    vietnameseDescription: 'Giải pháp tối ưu để tuyển dụng',
    features: [
      'Exclusive placement',
      'Vị trí độc quyền',
      'Maximum visibility',
      'Hiển thị tối đa',
      '120-day listing',
      'Tin đăng 120 ngày',
      'Dedicated account manager',
      'Quản lý tài khoản riêng',
      'Unlimited access to candidate profiles',
      'Truy cập không giới hạn vào hồ sơ ứng viên'
    ]
  }
];

/**
 * Calculate the price with duration discount
 */
export function calculatePriceWithDuration(basePrice: number, durationMonths: number): number {
  const discountPercentage = durationMonths === 1 ? 0 : 
                             durationMonths === 3 ? 10 : 
                             durationMonths === 6 ? 15 : 20;
                             
  const discountMultiplier = (100 - discountPercentage) / 100;
  return basePrice * durationMonths * discountMultiplier;
}

/**
 * Calculate the final price with all discounts applied
 */
export function calculateFinalPrice(basePrice: number, durationMonths: number, autoRenew: boolean): number {
  let price = calculatePriceWithDuration(basePrice, durationMonths);
  
  if (autoRenew) {
    // Apply additional 5% discount for auto-renewal
    price = price * 0.95;
  }
  
  return price;
}

/**
 * Convert price to cents for Stripe
 */
export function getAmountInCents(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Check if the plan is a subscription plan
 */
export function isSubscriptionPlan(tier: string): boolean {
  return tier === 'premium' || tier === 'gold' || tier === 'diamond';
}

/**
 * Get summary of job post pricing
 */
export function getJobPostPricingSummary(tier: string, duration: number): string {
  let summary = '';
  switch (tier) {
    case 'free':
      summary = 'Free listing';
      break;
    case 'standard':
      summary = `Standard listing for ${duration} months`;
      break;
    case 'premium':
      summary = `Premium listing for ${duration} months`;
      break;
    case 'gold':
      summary = `Gold listing for ${duration} months`;
      break;
    case 'diamond':
      summary = `Diamond listing for ${duration} months`;
      break;
    default:
      summary = 'Unknown listing type';
      break;
  }
  return summary;
}

/**
 * Calculate job post price
 */
export function calculateJobPostPrice(options: PricingOptions): number {
  let basePrice = 0;
  switch (options.selectedPricingTier) {
    case 'free':
      basePrice = 0;
      break;
    case 'standard':
      basePrice = 9.99;
      break;
    case 'premium':
      basePrice = 19.99;
      break;
    case 'gold':
      basePrice = 29.99;
      break;
    case 'diamond':
      basePrice = 49.99;
      break;
    default:
      basePrice = 9.99;
      break;
  }
  
  let durationMonths = options.durationMonths || 1;
  let price = calculatePriceWithDuration(basePrice, durationMonths);
  
  if (options.autoRenew) {
    price = price * 0.95;
  }
  
  return price;
}

/**
 * Maps the pricing tier, duration, and auto-renew status to the appropriate Stripe product ID
 */
export function getStripeProductId(tier: string, durationMonths: number, autoRenew: boolean): string | null {
  // Use a key format that works with TypeScript (string keys only)
  const key = `${tier}_${durationMonths}_${autoRenew ? 'autorenew' : 'standard'}`;
  
  const productMapping: Record<string, string> = {
    'standard_1_standard': 'price_standard_1m',
    'standard_3_standard': 'price_standard_3m',
    'standard_6_standard': 'price_standard_6m',
    'standard_12_standard': 'price_standard_12m',
    'standard_1_autorenew': 'price_standard_1m_auto',
    'standard_3_autorenew': 'price_standard_3m_auto',
    'standard_6_autorenew': 'price_standard_6m_auto',
    'standard_12_autorenew': 'price_standard_12m_auto',
    
    'premium_1_standard': 'price_premium_1m',
    'premium_3_standard': 'price_premium_3m',
    'premium_6_standard': 'price_premium_6m',
    'premium_12_standard': 'price_premium_12m',
    'premium_1_autorenew': 'price_premium_1m_auto',
    'premium_3_autorenew': 'price_premium_3m_auto',
    'premium_6_autorenew': 'price_premium_6m_auto',
    'premium_12_autorenew': 'price_premium_12m_auto',
    
    'gold_1_standard': 'price_gold_1m',
    'gold_3_standard': 'price_gold_3m',
    'gold_6_standard': 'price_gold_6m',
    'gold_12_standard': 'price_gold_12m',
    'gold_1_autorenew': 'price_gold_1m_auto',
    'gold_3_autorenew': 'price_gold_3m_auto',
    'gold_6_autorenew': 'price_gold_6m_auto',
    'gold_12_autorenew': 'price_gold_12m_auto',
  };
  
  return productMapping[key] || null;
}

/**
 * Validates pricing options are complete and valid
 */
export function validatePricingOptions(options?: PricingOptions): boolean {
  if (!options) return false;
  
  return (
    options.selectedPricingTier !== undefined &&
    options.durationMonths !== undefined
  );
}

// Export everything needed
export const jobPricingOptions = {
  
};
