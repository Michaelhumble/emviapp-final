
import { JobPricingTier, PricingOptions } from './types';

// Define job pricing options array (this might exist elsewhere already)
export const jobPricingOptions = [
  {
    id: 'free',
    name: 'Free Post',
    price: 0,
    description: 'List your first job for free',
    vietnameseDescription: 'Đăng việc đầu tiên miễn phí',
    tier: 'free' as JobPricingTier,
    features: ['Basic job listing', 'One free post per account', 'Visible for 30 days'],
    hidden: false
  },
  {
    id: 'standard',
    name: 'Standard Post',
    price: 29,
    description: 'High visibility job listing',
    vietnameseDescription: 'Danh sách việc làm có khả năng hiển thị cao',
    tier: 'standard' as JobPricingTier,
    features: ['Higher visibility', '30-day listing', 'Dashboard analytics'],
    hidden: false
  },
  {
    id: 'premium',
    name: 'Premium Post',
    price: 49,
    wasPrice: 59,
    description: 'Featured placement for faster hiring',
    vietnameseDescription: 'Vị trí nổi bật để thuê nhanh hơn',
    tier: 'premium' as JobPricingTier,
    features: ['Featured placement', 'Premium badge', '60-day listing', 'Detailed analytics'],
    popular: true,
    hidden: false
  },
  {
    id: 'gold',
    name: 'Gold Post',
    price: 99,
    wasPrice: 129,
    description: 'Maximum visibility and promotion',
    vietnameseDescription: 'Khả năng hiển thị và quảng cáo tối đa',
    tier: 'gold' as JobPricingTier,
    features: [
      'Top placement guarantee', 
      'Gold badge & highlighting', 
      'Social media promotion', 
      '90-day listing'
    ],
    hidden: false
  },
  {
    id: 'diamond',
    name: 'Diamond Post',
    price: 199,
    wasPrice: 249,
    description: 'Ultimate visibility package',
    vietnameseDescription: 'Gói hiển thị cao cấp',
    tier: 'diamond' as JobPricingTier,
    features: [
      'Premium placement across platform',
      'Featured in weekly newsletter', 
      'Diamond verification badge',
      '6-month listing'
    ],
    hidden: false
  }
];

// Calculate discount based on duration
export const calculateDiscountPercentage = (durationMonths: number): number => {
  if (durationMonths >= 6) return 25;
  if (durationMonths >= 3) return 15;
  if (durationMonths >= 2) return 10;
  return 0;
};

// Calculate auto-renew discount
export const calculateAutoRenewDiscount = (basePrice: number, autoRenew: boolean): number => {
  return autoRenew ? basePrice * 0.05 : 0; // 5% discount for auto-renew
};

// Get tier base price
export const getTierBasePrice = (tier: JobPricingTier): number => {
  const option = jobPricingOptions.find(option => option.tier === tier);
  return option ? option.price : 0;
};

// Check if this is a subscription plan
export const isSubscriptionPlan = (pricingOptions: PricingOptions): boolean => {
  return pricingOptions.autoRenew === true;
};

// Check if the pricing options are valid
export const validatePricingOptions = (pricingOptions: PricingOptions): boolean => {
  // Basic validation
  if (!pricingOptions.selectedPricingTier) {
    return false;
  }
  
  // Free tier is only valid for first posts
  if (pricingOptions.selectedPricingTier === 'free' && !pricingOptions.isFirstPost) {
    return false;
  }
  
  return true;
};

// Get Stripe price ID (placeholder - would be replaced with actual IDs)
export const getStripePriceId = (tier: JobPricingTier): string => {
  // This would map to actual Stripe price IDs in production
  const priceIdMap: Record<JobPricingTier, string> = {
    'free': 'price_free',
    'standard': 'price_standard',
    'premium': 'price_premium',
    'gold': 'price_gold',
    'diamond': 'price_diamond'
  };
  
  return priceIdMap[tier];
};

// Convert price to cents for Stripe
export const getAmountInCents = (amount: number): number => {
  return Math.round(amount * 100);
};

// Calculate final price considering all factors
export const calculateFinalPrice = (
  basePrice: number,
  discountPercentage: number,
  autoRenewDiscount: number,
  isNationwide: boolean
): number => {
  // Apply percentage discount first
  const priceAfterDiscount = basePrice * (1 - (discountPercentage / 100));
  
  // Apply auto-renew discount
  const priceAfterAutoRenew = priceAfterDiscount - autoRenewDiscount;
  
  // Add nationwide fee if applicable
  const nationwideFee = isNationwide ? 5 : 0;
  
  // Calculate final price, ensuring it's never negative
  const finalPrice = Math.max(0, priceAfterAutoRenew + nationwideFee);
  
  // Round to 2 decimal places
  return Math.round(finalPrice * 100) / 100;
};

// Calculate job post price
export const calculateJobPostPrice = (options: PricingOptions) => {
  // Get base price for the selected tier
  const basePrice = getTierBasePrice(options.selectedPricingTier);
  
  // Free tier handling
  if (options.selectedPricingTier === 'free' && options.isFirstPost) {
    return 0;
  }
  
  // Calculate discount percentage based on duration
  const discountPercentage = calculateDiscountPercentage(options.durationMonths || 1);
  
  // Calculate discount amount
  const discountAmount = (basePrice * discountPercentage) / 100;
  
  // Calculate auto-renew discount
  const autoRenewDiscount = calculateAutoRenewDiscount(basePrice - discountAmount, options.autoRenew || false);
  
  // Calculate final price
  const finalPrice = calculateFinalPrice(
    basePrice,
    discountPercentage,
    autoRenewDiscount,
    options.isNationwide || false
  );
  
  return {
    basePrice,
    originalPrice: basePrice * (options.durationMonths || 1),
    discountPercentage,
    discountAmount,
    autoRenewDiscount,
    finalPrice
  };
};

// Get a summary of the pricing for display
export const getJobPostPricingSummary = (options: PricingOptions) => {
  const pricingDetails = calculateJobPostPrice(options);
  return {
    ...pricingDetails,
    durationMonths: options.durationMonths || 1,
    isFirstPost: options.isFirstPost || false,
    isNationwide: options.isNationwide || false,
    selectedTier: options.selectedPricingTier
  };
};

// The main function to get job price - this is the one used by the PricingProvider
export const getJobPrice = (options: PricingOptions) => {
  // Validate pricing options
  if (!validatePricingOptions(options)) {
    throw new Error("Invalid pricing options");
  }
  
  // Get base price for the selected tier
  const basePrice = getTierBasePrice(options.selectedPricingTier);
  
  // Free tier handling
  if (options.selectedPricingTier === 'free' && options.isFirstPost) {
    return {
      basePrice: 0,
      originalPrice: 0,
      finalPrice: 0,
      discountPercentage: 0,
      discountAmount: 0,
      autoRenewDiscount: 0,
      durationMonths: options.durationMonths || 1,
      isFirstPost: options.isFirstPost || false,
      isNationwide: options.isNationwide || false,
      selectedTier: options.selectedPricingTier
    };
  }
  
  // Calculate discount percentage based on duration
  const discountPercentage = calculateDiscountPercentage(options.durationMonths || 1);
  
  // Calculate original price (for the whole duration)
  const originalPrice = basePrice * (options.durationMonths || 1);
  
  // Calculate discount amount
  const discountAmount = (originalPrice * discountPercentage) / 100;
  
  // Calculate auto-renew discount
  const autoRenewDiscount = options.autoRenew ? 
    (originalPrice - discountAmount) * 0.05 : 0;
  
  // Calculate final price
  const finalPrice = calculateFinalPrice(
    originalPrice,
    discountPercentage,
    autoRenewDiscount,
    options.isNationwide || false
  );
  
  return {
    basePrice,
    originalPrice,
    finalPrice,
    discountPercentage,
    discountAmount,
    autoRenewDiscount,
    durationMonths: options.durationMonths || 1,
    isFirstPost: options.isFirstPost || false,
    isNationwide: options.isNationwide || false,
    selectedTier: options.selectedPricingTier
  };
};
