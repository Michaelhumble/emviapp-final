
import { JobPricingTier, PricingOptions } from './types';

// Job pricing tiers with their base prices, names and details
export const jobPricingOptions = [
  {
    id: 'free',
    name: 'Free',
    vietnameseName: 'Miễn phí',
    description: 'Basic listing with limited visibility',
    vietnameseDescription: 'Đăng tin cơ bản với khả năng hiển thị hạn chế',
    basePrice: 0,
    durationMultipliers: [1],
    badge: 'Basic',
    features: ['7-day listing', 'Standard listing', 'Local visibility'],
    color: 'gray',
    isAvailableToNewUsers: true,
    tier: 'free' as JobPricingTier,
    price: 0,
  },
  {
    id: 'standard',
    name: 'Standard',
    vietnameseName: 'Tiêu chuẩn',
    description: 'Standard listing with good visibility',
    vietnameseDescription: 'Đăng tin tiêu chuẩn với khả năng hiển thị tốt',
    basePrice: 39.99,
    durationMultipliers: [1, 0.9, 0.8],
    badge: 'Standard',
    features: ['30-day listing', 'Enhanced visibility', 'Featured in category'],
    color: 'blue',
    isAvailableToAll: true,
    tier: 'standard' as JobPricingTier,
    price: 39.99,
  },
  {
    id: 'premium',
    name: 'Premium',
    vietnameseName: 'Cao cấp',
    description: 'Premium listing with excellent visibility',
    vietnameseDescription: 'Đăng tin cao cấp với khả năng hiển thị rất tốt',
    basePrice: 89.99,
    durationMultipliers: [1, 0.9, 0.8],
    badge: 'Premium',
    features: ['30-day listing', 'Top visibility', 'Featured in search results', 'Priority support'],
    color: 'purple',
    isAvailableToAll: true,
    tier: 'premium' as JobPricingTier,
    price: 89.99,
  },
  {
    id: 'gold',
    name: 'Gold Featured',
    vietnameseName: 'Nổi bật Vàng',
    description: 'Gold featured listing with maximum exposure',
    vietnameseDescription: 'Đăng tin nổi bật vàng với khả năng hiển thị tối đa',
    basePrice: 149.99,
    durationMultipliers: [1, 0.9, 0.8],
    badge: 'Gold',
    features: ['30-day listing', 'Maximum visibility', 'Top of search & browse', 'Featured on homepage', 'Priority support'],
    color: 'yellow',
    isAvailableToAll: true,
    tier: 'gold' as JobPricingTier,
    price: 149.99,
  },
  {
    id: 'diamond',
    name: 'Diamond Featured',
    vietnameseName: 'Kim cương',
    description: 'Exclusive diamond featured listing with premium support',
    vietnameseDescription: 'Đăng tin kim cương độc quyền với hỗ trợ cao cấp',
    basePrice: 999.99,
    durationMultipliers: [1],  // Only 12-month option for Diamond
    badge: 'Diamond',
    features: ['12-month listing', 'Custom branding', 'Premium placement', 'Featured across the platform', 'Dedicated account manager'],
    color: 'cyan',
    isAvailableToAll: true, // Changed from inviteOnly: true to make it available to all
    tier: 'diamond' as JobPricingTier,
    price: 999.99,
  }
];

// Validate that the pricing options provided match our expectations
export const validatePricingOptions = (options: PricingOptions) => {
  if (!options) return false;
  
  const {
    selectedPricingTier,
    durationMonths,
    autoRenew,
    isFirstPost,
    isNationwide
  } = options;
  
  // Verify pricing tier exists
  const validTier = jobPricingOptions.find(tier => tier.id === selectedPricingTier);
  if (!validTier) return false;
  
  // Verify duration is valid (1, 3, 6 or 12 months)
  if (![1, 3, 6, 12].includes(durationMonths)) return false;
  
  // All other fields have sensible defaults if not provided
  return true;
};

// Calculate the price for a job post based on the options
export const getJobPrice = (options: PricingOptions) => {
  const {
    selectedPricingTier,
    durationMonths = 1,
    autoRenew = false,
    isFirstPost = false,
    isNationwide = false
  } = options;
  
  // Find the selected pricing tier
  const tier = jobPricingOptions.find(tier => tier.id === selectedPricingTier);
  if (!tier) {
    throw new Error(`Invalid pricing tier: ${selectedPricingTier}`);
  }
  
  // Free tier is always $0
  if (tier.id === 'free') {
    return {
      basePrice: 0,
      originalPrice: 0,
      finalPrice: 0,
      discountAmount: 0,
      discountPercentage: 0
    };
  }
  
  // First post for new users is free (still using the selected tier)
  if (isFirstPost && tier.id === 'standard') {
    return {
      basePrice: 0,
      originalPrice: 0,
      finalPrice: 0,
      discountAmount: tier.basePrice,
      discountPercentage: 100
    };
  }
  
  // Calculate the base price for 1 month
  let basePrice = tier.basePrice;
  
  // Diamond plan is special - fixed 12 months
  if (tier.id === 'diamond') {
    // For diamond, price is fixed for 12 months
    const originalPrice = basePrice;
    return {
      basePrice,
      originalPrice,
      finalPrice: originalPrice,
      discountAmount: 0,
      discountPercentage: 0
    };
  }
  
  // Calculate the price for the selected duration
  let durationIndex = 0; // Default to first multiplier (1.0)
  if (durationMonths === 3) durationIndex = 1;
  if (durationMonths === 6) durationIndex = 2;
  
  // Make sure we have a valid multiplier
  const multiplier = tier.durationMultipliers[durationIndex] || 1;
  
  // Calculate original price before discounts
  const originalPrice = basePrice * durationMonths;
  
  // Apply duration discount if applicable
  let discountedPrice = originalPrice * multiplier;
  
  // Apply auto-renew discount if enabled (5% discount)
  if (autoRenew) {
    discountedPrice *= 0.95; // 5% discount
  }
  
  // Add nationwide fee if applicable
  let nationwideFee = 0;
  if (isNationwide) {
    nationwideFee = 5 * durationMonths; // $5 per month for nationwide visibility
  }
  
  // Round to 2 decimal places
  const finalPrice = Math.round((discountedPrice + nationwideFee) * 100) / 100;
  
  // Calculate discount amount and percentage
  const discountAmount = originalPrice - discountedPrice;
  const discountPercentage = Math.round((discountAmount / originalPrice) * 100);
  
  return {
    basePrice,
    originalPrice,
    finalPrice,
    discountAmount,
    discountPercentage
  };
};

// Helper function to get a price ID from Stripe
export const getStripePriceId = (tier: JobPricingTier, months: number = 1) => {
  // This would be implemented with your actual Stripe price IDs
  const priceMap: Record<string, Record<number, string>> = {
    standard: {
      1: 'price_standard_1month',
      3: 'price_standard_3month',
      6: 'price_standard_6month'
    },
    premium: {
      1: 'price_premium_1month',
      3: 'price_premium_3month',
      6: 'price_premium_6month'
    },
    gold: {
      1: 'price_gold_1month',
      3: 'price_gold_3month',
      6: 'price_gold_6month'
    },
    diamond: {
      12: 'price_diamond_12month'
    }
  };
  
  return priceMap[tier]?.[months] || '';
};

// Helper function to get amount in cents for Stripe
export const getAmountInCents = (amount: number) => {
  return Math.round(amount * 100);
};

// Determine if this tier uses subscription billing
export const isSubscriptionPlan = (tier: JobPricingTier, autoRenew: boolean) => {
  // Only paid plans with auto-renew enabled are subscription plans
  // Diamond is never auto-renew (always 12 months fixed)
  return tier !== 'free' && autoRenew && tier !== 'diamond';
};
