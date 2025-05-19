
import { JobPricingTier, PricingOptions, JobPricingOption } from "./types";

// Pricing tiers available for job listings
export const jobPricingOptions: JobPricingOption[] = [
  {
    id: "free",
    name: "Free Trial",
    tier: "free",
    price: 0,
    priceMonthly: 0,
    description: "Basic listing for 7 days",
    features: ["7-day listing", "Basic visibility", "No support"],
    primaryBenefit: "Try before you buy",
    color: "gray"
  },
  {
    id: "standard",
    name: "Standard",
    tier: "standard",
    price: 9.99,
    wasPrice: 14.99, // Original price before founder discount
    priceMonthly: 9.99,
    description: "Standard listing with good visibility",
    features: ["30-day listing", "Standard visibility", "Email support"],
    primaryBenefit: "Great for small salons",
    tag: "Basic",
    color: "blue"
  },
  {
    id: "premium",
    name: "Premium",
    tier: "premium",
    price: 19.99,
    wasPrice: 29.99, // Original price before founder discount
    priceMonthly: 19.99,
    description: "Featured listing with premium visibility",
    features: ["30-day listing", "Featured in search results", "Priority support", "Salon highlights"],
    primaryBenefit: "Best for quick hiring",
    popular: true,
    tag: "Popular",
    color: "purple",
    recommended: true
  },
  {
    id: "gold",
    name: "Gold",
    tier: "gold",
    price: 39.99,
    wasPrice: 49.99, // Original price before founder discount
    priceMonthly: 39.99,
    description: "Top visibility with all premium features",
    features: ["30-day listing", "Top of search results", "Priority support", "Salon highlights", "Social media promotion"],
    primaryBenefit: "Maximum visibility",
    tag: "Best Value",
    color: "amber"
  },
  {
    id: "diamond",
    name: "Diamond",
    tier: "diamond",
    price: 999.99,
    wasPrice: 1299.99, // Original price before exclusive discount
    priceMonthly: 999.99,
    description: "Exclusive nationwide promotion",
    features: ["Nationwide promotion", "Premium placement", "Dedicated account manager", "Custom marketing", "Social media campaign"],
    primaryBenefit: "Elite nationwide exposure",
    limitedSpots: "Only 10 spots left",
    tag: "Exclusive",
    color: "cyan",
    hidden: false
  }
];

// Get formatted price string with appropriate discount
export const formatPrice = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2
  }).format(amount);
};

// Convert price to Stripe format (cents)
export const toStripeAmount = (price: number): number => {
  return Math.round(price * 100);
};

// Get price for selected pricing tier and duration
export function getJobPrice(options: PricingOptions): {
  basePrice: number;
  discountedPrice: number;
  finalPrice: number;
  discountPercentage: number;
  discountLabel: string;
  discountAmount: number;
  isFoundersDiscount: boolean;
} {
  const { selectedPricingTier, durationMonths, isFirstPost = false, autoRenew = false, isNationwide = false } = options;

  // Get pricing tier
  const tierConfig = jobPricingOptions.find(option => option.tier === selectedPricingTier);
  if (!tierConfig) {
    throw new Error(`Invalid pricing tier: ${selectedPricingTier}`);
  }

  // Free tier is always free
  if (selectedPricingTier === 'free' || isFirstPost) {
    return {
      basePrice: 0,
      discountedPrice: 0,
      finalPrice: 0,
      discountPercentage: 0,
      discountLabel: "Free First Post",
      discountAmount: 0,
      isFoundersDiscount: false
    };
  }

  // Diamond tier has special pricing
  const basePrice = tierConfig.price;
  const originalBasePrice = tierConfig.wasPrice || basePrice;
  let discountPercentage = 0;
  let discountLabel = "";
  let isFoundersDiscount = false;

  // Apply duration discount
  if (durationMonths === 3) {
    discountPercentage = 10; // 10% discount for 3 months
    discountLabel = "3-Month Bundle Discount";
  } else if (durationMonths === 6) {
    discountPercentage = 15; // 15% discount for 6 months
    discountLabel = "6-Month Bundle Discount";
  } else if (durationMonths >= 12) {
    discountPercentage = 20; // 20% discount for 12 months
    discountLabel = "Annual Discount";
  }

  // Apply auto-renew discount
  if (autoRenew && durationMonths === 1) {
    discountPercentage += 5; // Additional 5% for auto-renewal
    discountLabel = discountLabel ? `${discountLabel} + Auto-Renew` : "Auto-Renew Discount";
  }

  // Apply founders discount
  if (originalBasePrice > basePrice) {
    isFoundersDiscount = true;
    const foundersDiscountPercentage = Math.round(((originalBasePrice - basePrice) / originalBasePrice) * 100);
    // Add founders discount to display but not to calculation (already in the base price)
    discountLabel = discountLabel 
      ? `Nail Industry Founders Discount (${foundersDiscountPercentage}%) + ${discountLabel}` 
      : `Nail Industry Founders Discount (${foundersDiscountPercentage}%)`;
  }

  // Calculate prices
  const totalBasePrice = originalBasePrice * durationMonths;
  const discountAmount = (totalBasePrice * discountPercentage) / 100;
  const discountedPrice = basePrice * durationMonths;
  
  // Add nationwide fee if applicable
  const nationwideFee = isNationwide ? 5 : 0;
  const finalPrice = discountedPrice - discountAmount + nationwideFee;

  return {
    basePrice: totalBasePrice,
    discountedPrice,
    finalPrice,
    discountPercentage,
    discountLabel,
    discountAmount,
    isFoundersDiscount
  };
}

// Convenience function to get a price summary
export function getJobPostPricingSummary(options: PricingOptions): string {
  const priceData = getJobPrice(options);
  
  if (priceData.finalPrice <= 0) {
    return "Free";
  }
  
  return formatPrice(priceData.finalPrice);
}

// Calculate the final price with all discounts applied
export function calculateFinalPrice(options: PricingOptions): number {
  return getJobPrice(options).finalPrice;
}

// Legacy function for compatibility
export function calculateJobPostPrice(options: PricingOptions): {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
} {
  const priceData = getJobPrice(options);
  return {
    originalPrice: priceData.basePrice,
    finalPrice: priceData.finalPrice,
    discountPercentage: priceData.discountPercentage
  };
}

// Validate pricing options
export function validatePricingOptions(options: PricingOptions): boolean {
  // Free tier is always valid
  if (options.selectedPricingTier === 'free') {
    return true;
  }
  
  // Check if the tier exists
  const tier = jobPricingOptions.find(option => option.tier === options.selectedPricingTier);
  if (!tier) {
    return false;
  }
  
  // Diamond tier requires special access
  if (options.selectedPricingTier === 'diamond' && !canAccessDiamondTier()) {
    return false;
  }
  
  // Validate duration
  if (![1, 3, 6, 12].includes(options.durationMonths)) {
    return false;
  }
  
  return true;
}

// Check if the user can access the Diamond tier
export function canAccessDiamondTier(): boolean {
  // This would typically check user permissions, waitlist status, etc.
  // For now, always return false to enforce "Request Invitation" flow
  return false;
}

// Convert price to cents for Stripe
export function getAmountInCents(price: number): number {
  return Math.round(price * 100);
}

// Check if a plan uses subscription billing
export function isSubscriptionPlan(tier: JobPricingTier): boolean {
  // For monthly plans with auto-renew
  return tier !== 'free';
}

// Get Stripe price ID based on plan details
export const getStripePriceId = (
  tier: JobPricingTier, 
  durationMonths: number = 1, 
  autoRenew: boolean = false
): string => {
  // Retrieve price IDs from environment variables
  const priceIdMap: {[key: string]: string} = {
    // Standard tier price IDs
    standard_1m: 'price_1OrmvbNX9M9yx9PCVElrTz69',
    standard_1m_auto: 'price_1OrmvbNX9M9yx9PCVElrTz69',
    standard_3m: 'price_1OrmwFNX9M9yx9PC8YtuJwFV',
    standard_6m: 'price_1OrmwqNX9M9yx9PCdBSlGwRD',
    standard_12m: 'price_1OrmxSNX9M9yx9PCnkJOQUnT',
    
    // Premium tier price IDs
    premium_1m: 'price_1OrmdlNX9M9yx9PCIfRDI9Sk',
    premium_1m_auto: 'price_1OrmdlNX9M9yx9PCIfRDI9Sk',
    premium_3m: 'price_1OrmeVNX9M9yx9PCzwPGBorP',
    premium_6m: 'price_1OrmfGNX9M9yx9PCu8YwhTsD',
    premium_12m: 'price_1OrmftNX9M9yx9PCNIqgUlvD',
    
    // Gold tier price IDs
    gold_1m: 'price_1OrmgbNX9M9yx9PCKyh9Bfg1',
    gold_1m_auto: 'price_1OrmgbNX9M9yx9PCKyh9Bfg1',
    gold_3m: 'price_1OrmhiNX9M9yx9PCJh7j6dY0',
    gold_6m: 'price_1OrmiLNX9M9yx9PCYimJuSfn',
    gold_12m: 'price_1Orml9NX9M9yx9PCCy9BPW3n',
    
    // Diamond tier has only one price ID
    diamond: 'price_1OrmoYNX9M9yx9PCWdcfg0wa',
  };
  
  // For free tier, no price ID needed
  if (tier === 'free') {
    return '';
  }
  
  // Diamond tier only has one price, regardless of duration
  if (tier === 'diamond') {
    return priceIdMap['diamond'];
  }
  
  // For all other tiers, determine based on duration and auto-renewal
  const key = `${tier}_${durationMonths}m${durationMonths === 1 && autoRenew ? '_auto' : ''}`;
  
  return priceIdMap[key] || '';
};
