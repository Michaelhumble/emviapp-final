import { PricingOptions, JobPricingTier, JobPricingOption } from './types';

// Job pricing configuration
export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Perfect for your first job posting',
    vietnameseDescription: 'Hoàn hảo cho bài đăng công việc đầu tiên của bạn',
    features: ['30-day listing', 'Basic visibility', 'Standard support'],
    tier: 'free',
    isFirstPost: true,
    tag: 'First Post Only'
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    description: 'Great for regular job postings',
    vietnameseDescription: 'Tuyệt vời cho việc đăng công việc thường xuyên',
    features: ['30-day listing', 'Enhanced visibility', 'Email support'],
    tier: 'standard'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    description: 'Featured placement and priority',
    vietnameseDescription: 'Vị trí nổi bật và ưu tiên',
    features: ['30-day listing', 'Priority placement', 'Featured badge', 'Priority support'],
    tier: 'premium',
    popular: true
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 49.99,
    description: 'Maximum exposure and benefits',
    vietnameseDescription: 'Tiếp xúc tối đa và lợi ích',
    features: ['30-day listing', 'Top placement', 'Gold badge', 'Dedicated support', 'Social media boost'],
    tier: 'gold'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 999.99,
    description: 'Invitation only - Premium placement',
    vietnameseDescription: 'Chỉ theo lời mời - Vị trí cao cấp',
    features: ['Custom placement', 'Dedicated account manager', 'Custom pricing', 'Priority everything'],
    tier: 'diamond',
    hidden: true
  }
];

// Base pricing calculation
export const calculateFinalPrice = (
  basePrice: number,
  durationMonths: number,
  autoRenew: boolean = false
): { originalPrice: number; finalPrice: number; discountPercentage: number; discountAmount: number } => {
  const originalPrice = basePrice * durationMonths;
  let discountPercentage = 0;

  // Duration discounts
  if (durationMonths === 3) {
    discountPercentage = 10;
  } else if (durationMonths === 6) {
    discountPercentage = 15;
  } else if (durationMonths >= 12) {
    discountPercentage = 20;
  }

  // Auto-renew discount for monthly plans
  if (autoRenew && durationMonths === 1) {
    discountPercentage += 5;
  }

  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;

  return {
    originalPrice,
    finalPrice,
    discountPercentage,
    discountAmount
  };
};

// Main job pricing calculation function
export const getJobPrice = (options: PricingOptions) => {
  const { selectedPricingTier, durationMonths, autoRenew = false, isFirstPost = false } = options;
  
  // Find the pricing option
  const pricingOption = jobPricingOptions.find(option => option.tier === selectedPricingTier);
  if (!pricingOption) {
    throw new Error(`Invalid pricing tier: ${selectedPricingTier}`);
  }

  let basePrice = pricingOption.price;

  // Handle free first post logic
  if (isFirstPost && (selectedPricingTier === 'standard' || selectedPricingTier === 'premium' || selectedPricingTier === 'gold')) {
    basePrice = 0;
  }

  // Handle diamond tier (always redirect to waitlist for now)
  if (selectedPricingTier === 'diamond') {
    return {
      basePrice: 0,
      originalPrice: 0,
      finalPrice: 0,
      discountAmount: 0,
      discountPercentage: 0,
      durationMonths,
      isFirstPost,
      selectedTier: selectedPricingTier
    };
  }

  const pricing = calculateFinalPrice(basePrice, durationMonths, autoRenew);

  return {
    basePrice,
    originalPrice: pricing.originalPrice,
    finalPrice: pricing.finalPrice,
    discountAmount: pricing.discountAmount,
    discountPercentage: pricing.discountPercentage,
    durationMonths,
    isFirstPost,
    selectedTier: selectedPricingTier
  };
};

// Helper function to format a number as currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
};

// Calculate price for job post
// export const calculateJobPostPrice = (options: PricingOptions) => {
//   const { selectedPricingTier, durationMonths, autoRenew = false, isFirstPost = false } = options;
  
//   let basePrice = 0;
  
//   switch (selectedPricingTier) {
//     case 'free':
//       basePrice = 0;
//       break;
//     case 'standard':
//       basePrice = 9.99;
//       break;
//     case 'premium':
//       basePrice = 19.99;
//       break;
//     case 'gold':
//       basePrice = 39.99;
//       break;
//     case 'diamond':
//       basePrice = 999.99;
//       break;
//     default:
//       basePrice = 9.99; // Default to standard
//   }
  
//   // Free for first post if specified
//   if (isFirstPost && selectedPricingTier !== 'diamond') {
//     basePrice = 0;
//   }
  
//   // Calculate original price (without discounts)
//   const originalPrice = basePrice * durationMonths;
  
//   // Apply duration discount
//   let discountPercentage = 0;
//   if (durationMonths === 3) {
//     discountPercentage = 10; // 10% discount for 3 months
//   } else if (durationMonths === 6) {
//     discountPercentage = 15; // 15% discount for 6 months
//   } else if (durationMonths >= 12) {
//     discountPercentage = 20; // 20% discount for 12+ months
//   }
  
//   // Apply auto-renew discount if enabled
//   if (autoRenew && durationMonths === 1) {
//     discountPercentage += 5; // Additional 5% for auto-renew on monthly plans
//   }
  
//   // Calculate final price with discounts
//   const discount = (originalPrice * discountPercentage) / 100;
//   const finalPrice = originalPrice - discount;
  
//   return {
//     basePrice,
//     originalPrice,
//     finalPrice,
//     discountPercentage,
//     durationMonths,
//     isFirstPost,
//     selectedTier: selectedPricingTier
//   };
// };

// Get job post pricing summary
// export const getJobPostPricingSummary = (options: PricingOptions) => {
//   const { selectedPricingTier, durationMonths } = options;
//   const { finalPrice } = calculateJobPostPrice(options);
  
//   return {
//     selectedTier: selectedPricingTier,
//     durationMonths,
//     finalPrice,
//     summary: `${selectedPricingTier} plan for ${durationMonths} month(s) - $${finalPrice.toFixed(2)}`
//   };
// };

export const calculateJobPostPrice = getJobPrice;

export const getJobPostPricingSummary = (options: PricingOptions) => {
  const result = getJobPrice(options);
  return {
    ...result,
    summary: `${result.selectedTier} plan for ${result.durationMonths} month(s) - $${result.finalPrice.toFixed(2)}`
  };
};

export const validatePricingOptions = (options: PricingOptions): boolean => {
  const validTiers: JobPricingTier[] = ['free', 'standard', 'premium', 'gold', 'diamond'];
  const validDurations = [1, 3, 6, 12];
  
  return validTiers.includes(options.selectedPricingTier) && 
         validDurations.includes(options.durationMonths);
};

export const getStripePriceId = (tier: JobPricingTier, duration: number): string => {
  // Return appropriate Stripe Price IDs based on tier and duration
  const priceMap: Record<string, string> = {
    'standard_1': 'price_STANDARD_MONTHLY',
    'standard_3': 'price_STANDARD_QUARTERLY', 
    'premium_1': 'price_PREMIUM_MONTHLY',
    'premium_3': 'price_PREMIUM_QUARTERLY',
    'gold_1': 'price_GOLD_MONTHLY',
    'gold_3': 'price_GOLD_QUARTERLY'
  };
  
  return priceMap[`${tier}_${duration}`] || priceMap[`${tier}_1`] || '';
};

export const getAmountInCents = (amount: number): number => {
  return Math.round(amount * 100);
};

export const isSubscriptionPlan = (tier: JobPricingTier): boolean => {
  return tier !== 'free';
};
