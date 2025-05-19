
import { JobPricingTier, PricingOptions } from "./types";

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
