
import { PricingOptions, UserPostingStats, JobPricingTier, JobPricingOption } from "./types";

// Updated Stripe price IDs - THESE MUST MATCH YOUR ACTUAL STRIPE DASHBOARD
export const jobPriceMap = {
  free: null,
  standard_1mo: "price_1QOBxsJBvWVB2d16QqYw1234", // $9.99 - REPLACE WITH REAL PRICE ID
  standard_3mo: "price_1QOBxsJBvWVB2d16QqYw5678", // $27.99 - REPLACE WITH REAL PRICE ID  
  standard_6mo: "price_1QOBxsJBvWVB2d16QqYw9012", // $49.99 - REPLACE WITH REAL PRICE ID
  premium_1mo: "price_1QOBxsJBvWVB2d16QqYw3456", // $19.99 - REPLACE WITH REAL PRICE ID
  gold_1mo: "price_1QOBxsJBvWVB2d16QqYw7890", // $49.99 - REPLACE WITH REAL PRICE ID
  // NOTE: Diamond tier intentionally has no price ID - it goes to waitlist
};

export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free Post',
    price: 0,
    description: 'Perfect for your first job posting',
    vietnameseDescription: 'Hoàn hảo cho tin tuyển dụng đầu tiên của bạn',
    tier: 'free',
    isFirstPost: true,
    popular: false,
    features: ['30-day listing', 'Basic visibility'],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    description: 'Great for most job postings',
    vietnameseDescription: 'Tuyệt vời cho hầu hết các tin tuyển dụng',
    tier: 'standard',
    popular: true,
    features: ['30-day listing', 'Standard visibility', 'Email support'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    description: 'Enhanced visibility and priority placement',
    vietnameseDescription: 'Tăng khả năng hiển thị và ưu tiên vị trí',
    tier: 'premium',
    features: ['30-day listing', 'Premium visibility', 'Priority support', 'Featured badge'],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 49.99,
    description: 'Maximum exposure for urgent hiring',
    vietnameseDescription: 'Phơi bày tối đa cho việc tuyển dụng khẩn cấp',
    tier: 'gold',
    features: ['30-day listing', 'Top placement', 'Urgent badge', 'Priority support', 'Social media promotion'],
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 0, // Special pricing - invitation only
    description: 'Invitation only - Contact us for pricing',
    vietnameseDescription: 'Chỉ theo lời mời - Liên hệ để biết giá',
    tier: 'diamond',
    hidden: true, // Don't show in normal pricing
    features: ['Premium everything', 'Personal account manager', 'Custom placement'],
  },
];

export const getStripePriceId = (
  pricingTier: JobPricingTier,
  options: PricingOptions
): string | null => {
  if (pricingTier === 'free') {
    return null; // Free tier doesn't need a Stripe price ID
  }
  
  // Diamond tier always goes to waitlist
  if (pricingTier === 'diamond') {
    return null;
  }
  
  // Duration-based pricing for standard tier
  const durationMonths = options.durationMonths || 1;
  
  if (pricingTier === 'standard') {
    if (durationMonths === 3) return jobPriceMap.standard_3mo;
    if (durationMonths === 6) return jobPriceMap.standard_6mo;
    return jobPriceMap.standard_1mo; // Default to 1 month
  }
  
  if (pricingTier === 'premium') {
    return jobPriceMap.premium_1mo;
  }
  
  if (pricingTier === 'gold') {
    return jobPriceMap.gold_1mo;
  }
  
  // Default fallback
  return jobPriceMap.standard_1mo;
};

export const validatePricingOptions = (options: PricingOptions): boolean => {
  // Free plan is always valid
  if (options.selectedPricingTier === 'free') {
    return true;
  }
  
  // Diamond tier is valid (goes to waitlist)
  if (options.selectedPricingTier === 'diamond') {
    return true;
  }
  
  // Ensure we have a valid pricing tier
  if (!options.selectedPricingTier) {
    console.error("No pricing tier selected");
    return false;
  }
  
  // Ensure we have a duration for non-free plans
  if (options.selectedPricingTier !== 'free' && !options.durationMonths) {
    console.error("No duration selected for paid plan");
    return false;
  }
  
  // Ensure we have a valid Stripe price ID for paid plans (except diamond)
  if (options.selectedPricingTier !== 'free' && options.selectedPricingTier !== 'diamond') {
    const stripePriceId = getStripePriceId(options.selectedPricingTier, options);
    if (!stripePriceId) {
      console.error("Failed to get valid Stripe price ID", { 
        pricingTier: options.selectedPricingTier, 
        options 
      });
      return false;
    }
  }
  
  return true;
};

export const calculateJobPostPrice = (options: PricingOptions, stats?: UserPostingStats): number => {
  // Check if this is a free post
  if (options.selectedPricingTier === 'free' || options.isFirstPost) {
    return 0;
  }
  
  // Diamond tier pricing is handled separately (invitation only)
  if (options.selectedPricingTier === 'diamond') {
    return 0; // No payment processing
  }
  
  // Get base pricing
  const pricingOption = jobPricingOptions.find(opt => opt.tier === options.selectedPricingTier);
  if (!pricingOption) {
    return 0;
  }
  
  let basePrice = pricingOption.price;
  
  // Apply duration discounts for standard tier
  if (options.selectedPricingTier === 'standard') {
    const durationMonths = options.durationMonths || 1;
    if (durationMonths === 3) {
      basePrice = 27.99; // 3-month discount
    } else if (durationMonths === 6) {
      basePrice = 49.99; // 6-month discount
    }
  }
  
  // Apply auto-renewal discount (5% off)
  if (options.autoRenew) {
    basePrice = basePrice * 0.95;
  }
  
  return Math.round(basePrice * 100) / 100; // Round to 2 decimal places
};

export interface PriceData {
  basePrice: number;
  discountedPrice: number;
  finalPrice: number;
  discountPercentage: number;
  discountLabel: string;
  discountAmount: number;
  isFoundersDiscount: boolean;
  durationMonths?: number;
  selectedTier?: string;
}

export const getJobPrice = (options: PricingOptions, stats?: UserPostingStats): PriceData => {
  const finalPrice = calculateJobPostPrice(options, stats);
  const pricingOption = jobPricingOptions.find(opt => opt.tier === options.selectedPricingTier);
  const basePrice = pricingOption?.price || 0;
  
  const discountAmount = Math.max(0, basePrice - finalPrice);
  const discountPercentage = basePrice > 0 ? Math.round((discountAmount / basePrice) * 100) : 0;
  
  let discountLabel = '';
  if (options.autoRenew && discountPercentage > 0) {
    discountLabel = 'Auto-renewal discount';
  } else if (options.durationMonths && options.durationMonths > 1) {
    discountLabel = `${options.durationMonths}-month discount`;
  }
  
  return {
    basePrice,
    discountedPrice: finalPrice,
    finalPrice,
    discountPercentage,
    discountLabel,
    discountAmount,
    isFoundersDiscount: false,
    durationMonths: options.durationMonths,
    selectedTier: options.selectedPricingTier,
  };
};

export const getJobPostPricingSummary = (options: PricingOptions, stats?: UserPostingStats): string[] => {
  const summary: string[] = [];
  const priceData = getJobPrice(options, stats);
  
  if (priceData.finalPrice === 0) {
    if (options.isFirstPost) {
      summary.push("First Job Post: FREE");
    } else {
      summary.push("Free Job Post: $0.00");
    }
  } else {
    const pricingOption = jobPricingOptions.find(opt => opt.tier === options.selectedPricingTier);
    summary.push(`${pricingOption?.name || 'Job Post'}: $${priceData.basePrice.toFixed(2)}`);
    
    if (priceData.discountAmount > 0) {
      summary.push(`${priceData.discountLabel}: -$${priceData.discountAmount.toFixed(2)}`);
    }
    
    summary.push(`Total: $${priceData.finalPrice.toFixed(2)}`);
  }
  
  return summary;
};

export const calculateFinalPrice = calculateJobPostPrice;
export const getAmountInCents = (price: number): number => Math.round(price * 100);
export const isSubscriptionPlan = (tier: JobPricingTier): boolean => false; // We use one-time payments, not subscriptions
