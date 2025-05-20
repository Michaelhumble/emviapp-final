
import { JobPricingOption, JobPricingTier, PricingOptions, PostType } from './types';

// Define pricing tiers with their details
export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Basic 7-day listing for first-time posters',
    tier: 'free',
    features: ['7-day visibility', 'Basic listing', 'Email support'],
    primaryBenefit: 'Try out the platform for free',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    priceMonthly: 9.99,
    description: 'Standard 30-day listing with basic features',
    vietnameseDescription: 'Tin đăng tiêu chuẩn trong 30 ngày với các tính năng cơ bản',
    tier: 'standard',
    features: ['30-day visibility', 'Standard listing', 'Email support'],
    primaryBenefit: 'Most affordable option',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    priceMonthly: 19.99,
    description: 'Featured listing with enhanced visibility',
    vietnameseDescription: 'Tin đăng nổi bật với khả năng hiển thị cao hơn',
    tier: 'premium',
    features: ['30-day visibility', 'Featured placement', 'Priority support', 'Highlighted listing'],
    popular: true,
    recommended: true,
    primaryBenefit: 'Stand out from other listings',
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 39.99,
    priceMonthly: 39.99,
    description: 'Premium listing with maximum visibility',
    vietnameseDescription: 'Tin đăng cao cấp với khả năng hiển thị tốt nhất',
    tier: 'gold',
    features: ['30-day visibility', 'Top placement', 'Urgent tag', 'Social media promotion', '24/7 support'],
    primaryBenefit: 'Maximum exposure for fastest results',
    color: 'amber',
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 999.99,
    priceMonthly: 999.99,
    description: 'Exclusive nationwide featured placement',
    vietnameseDescription: 'Vị trí đặc quyền trên toàn quốc',
    tier: 'diamond',
    features: ['30-day visibility', 'Nationwide promotion', 'Premium support', 'Featured on homepage', 'Social media campaign'],
    primaryBenefit: 'Our most exclusive tier with personalized service',
    color: 'cyan',
    limitedSpots: 'Only 3 spots available',
  }
];

// Map pricing tiers to Stripe price IDs
const stripePriceMap = {
  standard_1mo: "price_std_999",
  standard_3mo: "price_std_2799",
  standard_6mo: "price_std_4999",
  standard_auto: "price_std_auto_949",
  premium_1mo: "price_premium_1999",
  premium_3mo: "price_premium_5399",
  premium_6mo: "price_premium_10199",
  gold_1mo: "price_gold_3999", 
  gold_3mo: "price_gold_10797",
  gold_6mo: "price_gold_20395"
};

// Function to get Stripe price ID based on pricing tier and options
export const getStripePriceId = (
  pricingTier: JobPricingTier,
  options: PricingOptions
): string | null => {
  // Free tier doesn't need a price ID
  if (pricingTier === 'free' || options.isFirstPost) {
    return null;
  }
  
  // Diamond tier is by invitation only
  if (pricingTier === 'diamond') {
    return null;
  }
  
  // Standard plan with auto-renew
  if (pricingTier === 'standard' && options.autoRenew) {
    return stripePriceMap.standard_auto;
  }
  
  const durationMonths = options.durationMonths || 1;
  
  if (pricingTier === 'standard') {
    if (durationMonths === 3) return stripePriceMap.standard_3mo;
    if (durationMonths === 6) return stripePriceMap.standard_6mo;
    return stripePriceMap.standard_1mo; // Default to 1 month
  }
  
  if (pricingTier === 'premium') {
    if (durationMonths === 3) return stripePriceMap.premium_3mo;
    if (durationMonths === 6) return stripePriceMap.premium_6mo;
    return stripePriceMap.premium_1mo;
  }
  
  if (pricingTier === 'gold') {
    if (durationMonths === 3) return stripePriceMap.gold_3mo;
    if (durationMonths === 6) return stripePriceMap.gold_6mo;
    return stripePriceMap.gold_1mo;
  }
  
  // Default fallback
  return stripePriceMap.standard_1mo;
};

// Helper function to validate pricing options
export const validatePricingOptions = (options: PricingOptions): boolean => {
  if (!options.selectedPricingTier) {
    console.error("No pricing tier selected");
    return false;
  }
  
  // Free tier or first post is always valid
  if (options.selectedPricingTier === 'free' || options.isFirstPost) {
    return true;
  }
  
  // For paid plans, ensure we have a duration
  if (!options.durationMonths) {
    console.error("No duration selected for paid plan");
    return false;
  }
  
  // Ensure we have a valid stripe price ID for paid plans
  const stripePriceId = getStripePriceId(options.selectedPricingTier, options);
  if (!stripePriceId && options.selectedPricingTier !== 'diamond') {
    console.error("Failed to get valid Stripe price ID", { options });
    return false;
  }
  
  return true;
};

// Helper function for amount in cents (for Stripe)
export const getAmountInCents = (amount: number): number => {
  return Math.round(amount * 100);
};

// Check if plan is a subscription
export const isSubscriptionPlan = (options: PricingOptions): boolean => {
  return options.autoRenew === true;
};

// Calculate the job price based on options
export const getJobPrice = (options: PricingOptions) => {
  const { selectedPricingTier, durationMonths = 1, isFirstPost = false, autoRenew = false, isNationwide = false } = options;
  
  // Find the selected pricing tier from options
  const selectedTier = jobPricingOptions.find(option => option.tier === selectedPricingTier);
  if (!selectedTier) {
    return {
      basePrice: 0,
      originalPrice: 0,
      finalPrice: 0,
      discountAmount: 0,
      discountPercentage: 0
    };
  }
  
  // Get base price (free for first post)
  let basePrice = isFirstPost ? 0 : selectedTier.price;
  
  // Calculate original price before discounts
  const originalPrice = basePrice * durationMonths;
  
  // Calculate discounts based on duration
  let discountPercentage = 0;
  if (durationMonths === 3) {
    discountPercentage = 10; // 10% for 3 months
  } else if (durationMonths === 6) {
    discountPercentage = 15; // 15% for 6 months
  } else if (durationMonths >= 12) {
    discountPercentage = 20; // 20% for 12+ months
  }
  
  // Add auto-renew discount
  if (autoRenew && durationMonths === 1) {
    discountPercentage += 5;
  }
  
  // Calculate discount amount
  const discountAmount = (originalPrice * discountPercentage) / 100;
  
  // Add nationwide fee if applicable
  let additionalFees = 0;
  if (isNationwide && basePrice > 0) {
    additionalFees = 5; // $5 for nationwide visibility
  }
  
  // Calculate final price
  const finalPrice = originalPrice - discountAmount + additionalFees;
  
  return {
    basePrice,
    originalPrice,
    finalPrice,
    discountAmount,
    discountPercentage
  };
};

// Get a pricing option by tier
export const getPricingOptionByTier = (tier: JobPricingTier): JobPricingOption | undefined => {
  return jobPricingOptions.find(option => option.tier === tier);
};
