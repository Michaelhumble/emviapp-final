
import { JobPricingTier, PricingOptions, JobPricingOption } from "./types";

// Pricing tiers available for job listings
export const jobPricingOptions: JobPricingOption[] = [
  {
    id: "free",
    name: "Free Trial",
    tier: "free",
    priceMonthly: 0,
    description: "Basic listing for 7 days",
    features: ["7-day listing", "Basic visibility", "No support"],
    color: "bg-gray-100",
    hidden: false
  },
  {
    id: "standard",
    name: "Standard",
    tier: "standard",
    priceMonthly: 9.99,
    description: "Standard listing with good visibility",
    features: ["30-day listing", "Standard visibility", "Email support"],
    color: "bg-blue-100",
    hidden: false
  },
  {
    id: "premium",
    name: "Premium",
    tier: "premium",
    priceMonthly: 19.99,
    description: "Featured listing with premium visibility",
    features: ["30-day listing", "Featured in search results", "Priority support", "Salon highlights"],
    color: "bg-purple-100",
    hidden: false
  },
  {
    id: "gold",
    name: "Gold",
    tier: "gold",
    priceMonthly: 39.99,
    description: "Top visibility with all premium features",
    features: ["30-day listing", "Top of search results", "Priority support", "Salon highlights", "Social media promotion"],
    color: "bg-amber-200",
    hidden: false
  },
  {
    id: "diamond",
    name: "Diamond",
    tier: "diamond",
    priceMonthly: 999.99,
    description: "Exclusive nationwide promotion",
    features: ["Nationwide promotion", "Premium placement", "Dedicated account manager", "Custom marketing", "Social media campaign"],
    color: "bg-cyan-100",
    hidden: false
  }
];

// Calculate job price based on selected options
export const getJobPrice = (options: PricingOptions) => {
  const {
    selectedPricingTier,
    durationMonths = 1,
    autoRenew = true,
    isFirstPost = false,
    isNationwide = false
  } = options;

  // Base pricing per tier (monthly)
  let basePrice = 0;
  
  switch (selectedPricingTier) {
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
      basePrice = 39.99;
      break;
    case 'diamond':
      basePrice = 999.99;
      break;
    default:
      basePrice = 9.99; // Default to standard
  }
  
  // First post discount for eligible plans
  if (isFirstPost && selectedPricingTier === 'free') {
    basePrice = 0;
  }

  // Calculate original price (without discounts)
  const originalPrice = basePrice * durationMonths;
  
  // Apply duration discount
  let discountPercentage = 0;
  if (durationMonths === 3) {
    discountPercentage = 10; // 10% discount for 3 months
  } else if (durationMonths === 6) {
    discountPercentage = 15; // 15% discount for 6 months
  } else if (durationMonths >= 12) {
    discountPercentage = 20; // 20% discount for 12+ months
  }
  
  // Apply auto-renew discount for monthly plans only
  const autoRenewDiscount = (autoRenew && durationMonths === 1) ? 5 : 0; // 5% discount
  const totalDiscountPercentage = discountPercentage + autoRenewDiscount;
  
  // Calculate discount amount
  const discountAmount = (originalPrice * totalDiscountPercentage) / 100;
  
  // Nationwide fee if applicable (for paid plans)
  const nationwidePrice = (isNationwide && basePrice > 0) ? 5 : 0; // $5 nationwide fee
  
  // Calculate final price with discounts and fees
  const finalPrice = originalPrice - discountAmount + nationwidePrice;
  
  return {
    basePrice,
    originalPrice,
    finalPrice, 
    discountPercentage: totalDiscountPercentage,
    discountAmount,
    autoRenewDiscount,
    durationMonths,
    isFirstPost,
    isNationwide,
    selectedTier: selectedPricingTier
  };
};

// Format price for display
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(price);
};

// Convert UI price to Stripe amount (in cents)
export const toStripeAmount = (price: number): number => {
  return Math.round(price * 100);
};

// Get Stripe price ID based on plan details
export const getStripePriceId = (
  pricingTier: JobPricingTier, 
  autoRenew: boolean = false, 
  durationMonths: number = 1
): string => {
  // Retrieve price IDs from environment variables
  const priceIdMap: {[key: string]: string} = {
    // Standard tier prices
    'standard_1m': process.env.STRIPE_PRICE_STANDARD_1M || 'price_standard_1m',
    'standard_1m_auto': process.env.STRIPE_PRICE_STANDARD_1M_AUTO || 'price_standard_1m_auto',
    'standard_3m': process.env.STRIPE_PRICE_STANDARD_3M || 'price_standard_3m',
    'standard_6m': process.env.STRIPE_PRICE_STANDARD_6M || 'price_standard_6m',
    'standard_12m': process.env.STRIPE_PRICE_STANDARD_12M || 'price_standard_12m',
    
    // Premium tier prices
    'premium_1m': process.env.STRIPE_PRICE_PREMIUM_1M || 'price_premium_1m',
    'premium_1m_auto': process.env.STRIPE_PRICE_PREMIUM_1M_AUTO || 'price_premium_1m_auto',
    'premium_3m': process.env.STRIPE_PRICE_PREMIUM_3M || 'price_premium_3m',
    'premium_6m': process.env.STRIPE_PRICE_PREMIUM_6M || 'price_premium_6m',
    'premium_12m': process.env.STRIPE_PRICE_PREMIUM_12M || 'price_premium_12m',
    
    // Gold tier prices
    'gold_1m': process.env.STRIPE_PRICE_GOLD_1M || 'price_gold_1m',
    'gold_1m_auto': process.env.STRIPE_PRICE_GOLD_1M_AUTO || 'price_gold_1m_auto',
    'gold_3m': process.env.STRIPE_PRICE_GOLD_3M || 'price_gold_3m',
    'gold_6m': process.env.STRIPE_PRICE_GOLD_6M || 'price_gold_6m',
    'gold_12m': process.env.STRIPE_PRICE_GOLD_12M || 'price_gold_12m',
    
    // Diamond tier price
    'diamond': process.env.STRIPE_PRICE_DIAMOND || 'price_diamond'
  };
  
  // For free tier, no price ID needed
  if (pricingTier === 'free') {
    return '';
  }
  
  // Diamond tier only has one price, regardless of duration
  if (pricingTier === 'diamond') {
    return priceIdMap['diamond'];
  }
  
  // For all other tiers, determine based on duration and auto-renewal
  const key = `${pricingTier}_${durationMonths}m${durationMonths === 1 && autoRenew ? '_auto' : ''}`;
  
  return priceIdMap[key] || '';
};

// Validate if user can access diamond tier
export const canAccessDiamondTier = async (userId: string): Promise<boolean> => {
  try {
    // Check if user has an invitation or is on waitlist
    // In a real implementation, this would check against database records
    // For now, we'll use a simple client-side check based on user tags
    
    // This should be replaced with an actual API call or database check
    return true; // Placeholder - always return true for now
  } catch (error) {
    console.error("Error checking diamond tier access:", error);
    return false;
  }
};

// Additional exported functions required by imports

export const calculateFinalPrice = (options: PricingOptions): number => {
  const priceData = getJobPrice(options);
  return priceData.finalPrice;
};

export const calculateJobPostPrice = (options: PricingOptions) => {
  return getJobPrice(options);
};

export const getJobPostPricingSummary = (options: PricingOptions) => {
  const priceData = getJobPrice(options);
  return {
    basePrice: priceData.basePrice,
    finalPrice: priceData.finalPrice,
    discountAmount: priceData.discountAmount,
    discountPercentage: priceData.discountPercentage,
    originalPrice: priceData.originalPrice,
    durationMonths: priceData.durationMonths,
    selectedTier: priceData.selectedTier
  };
};

export const validatePricingOptions = (options: PricingOptions): boolean => {
  // Validate that pricing options are valid
  if (!options.selectedPricingTier) {
    return false;
  }

  // Check if the tier exists in available options
  const validTiers: JobPricingTier[] = ['free', 'standard', 'premium', 'gold', 'diamond'];
  if (!validTiers.includes(options.selectedPricingTier)) {
    return false;
  }

  // Check duration is valid
  if (options.durationMonths !== undefined && 
      (options.durationMonths <= 0 || 
       ![1, 3, 6, 12].includes(options.durationMonths))) {
    return false;
  }

  return true;
};

export const getAmountInCents = (price: number): number => {
  return Math.round(price * 100);
};

export const isSubscriptionPlan = (pricingTier: JobPricingTier, autoRenew: boolean): boolean => {
  // Only monthly plans with auto-renew enabled are considered subscriptions
  return autoRenew && pricingTier !== 'free' && pricingTier !== 'diamond';
};
