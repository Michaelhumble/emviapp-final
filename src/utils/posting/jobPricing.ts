import { JobPricingOption, JobPricingTier, PricingOptions } from './types';

export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    priceMonthly: 9.99,
    description: 'Perfect for getting started with quality candidates',
    vietnameseDescription: 'Hoàn hảo để bắt đầu với các ứng viên chất lượng',
    tier: 'standard',
    features: [
      'Active for 30 days',
      'Email notifications',
      'Basic support',
      'Standard visibility'
    ],
    color: 'blue'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    priceMonthly: 19.99,
    description: 'Enhanced visibility with priority placement',
    vietnameseDescription: 'Tăng cường khả năng hiển thị với vị trí ưu tiên',
    tier: 'premium',
    features: [
      'Active for 30 days',
      'Priority placement',
      'Featured badge',
      'Premium support',
      'Enhanced visibility'
    ],
    popular: true,
    color: 'purple'
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 39.99,
    priceMonthly: 39.99,
    description: 'Maximum exposure with top placement',
    vietnameseDescription: 'Tiếp xúc tối đa với vị trí hàng đầu',
    tier: 'gold',
    features: [
      'Active for 45 days',
      'Top placement guarantee',
      'Gold badge',
      'Priority support',
      'Maximum visibility',
      'Featured in newsletters'
    ],
    color: 'amber'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 999,
    priceMonthly: 999,
    description: 'Exclusive tier with guaranteed results',
    vietnameseDescription: 'Cấp độ độc quyền với kết quả được đảm bảo',
    tier: 'diamond',
    features: [
      'Active for 60 days',
      'Guaranteed top placement',
      'Diamond badge',
      'Dedicated support',
      'Personal account manager',
      'Custom promotion'
    ],
    limitedSpots: '2 spots left',
    color: 'indigo',
    hidden: false
  }
];

export const calculateJobPostPrice = (options: PricingOptions) => {
  const basePlan = jobPricingOptions.find(plan => plan.tier === options.selectedPricingTier);
  if (!basePlan) return { originalPrice: 0, finalPrice: 0, discountPercentage: 0 };

  let basePrice = basePlan.price;
  const { durationMonths, autoRenew, isNationwide } = options;

  // Calculate original price
  let originalPrice = basePrice * durationMonths;

  // Apply duration discounts
  let discountPercentage = 0;
  if (durationMonths === 3) {
    discountPercentage = 17; // ~$16.66/month for premium
    if (options.selectedPricingTier === 'premium') {
      originalPrice = 49.99; // Special 3-month pricing
    }
  } else if (durationMonths === 6) {
    discountPercentage = 25;
  } else if (durationMonths >= 12) {
    discountPercentage = 30;
  }

  // Auto-renew discount
  if (autoRenew && durationMonths === 1) {
    discountPercentage += 5;
  }

  // Calculate final price
  const discount = (originalPrice * discountPercentage) / 100;
  let finalPrice = originalPrice - discount;

  // Add nationwide fee
  if (isNationwide) {
    finalPrice += 5;
  }

  return {
    originalPrice,
    finalPrice: Math.max(0, finalPrice),
    discountPercentage,
    discountAmount: discount
  };
};

export const getJobPrice = (options: PricingOptions) => {
  const pricing = calculateJobPostPrice(options);
  
  return {
    basePrice: pricing.originalPrice,
    originalPrice: pricing.originalPrice,
    finalPrice: pricing.finalPrice,
    discountAmount: pricing.discountAmount || 0,
    discountPercentage: pricing.discountPercentage,
    selectedTier: options.selectedPricingTier,
    durationMonths: options.durationMonths,
    isFirstPost: options.isFirstPost
  };
};

// Other required exports to maintain compatibility
export const calculateFinalPrice = calculateJobPostPrice;
export const getJobPostPricingSummary = getJobPrice;
export const validatePricingOptions = (options: PricingOptions) => true;
export const getStripePriceId = (tier: JobPricingTier) => `price_${tier}`;
export const getAmountInCents = (amount: number) => Math.round(amount * 100);
export const isSubscriptionPlan = (tier: JobPricingTier) => tier !== 'free';
