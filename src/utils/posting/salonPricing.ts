
import { JobPricingTier, PricingOptions } from './types';

// Calculate salon post price
export const calculateSalonPostPrice = (options: PricingOptions): number => {
  // Base prices for salon posts are higher
  const tierPrices: Record<JobPricingTier, number> = {
    standard: 59,
    premium: 99,
    gold: 149,
    diamond: 299,
    free: 0
  };
  
  const basePrice = tierPrices[options.selectedPricingTier] || tierPrices.premium;
  
  // First post discount
  if (options.isFirstPost) return 0;
  
  let price = basePrice;
  
  // Apply duration pricing
  price = price * options.durationMonths;
  
  // Apply auto-renew discount if applicable
  if (options.autoRenew) {
    price = price * 0.9; // 10% discount
  }
  
  return price;
};

// Get salon pricing summary
export const getSalonPostPricingSummary = (options: PricingOptions) => {
  const tierPrices: Record<JobPricingTier, number> = {
    standard: 59,
    premium: 99,
    gold: 149,
    diamond: 299,
    free: 0
  };
  
  const basePrice = tierPrices[options.selectedPricingTier] || tierPrices.premium;
  const originalPrice = basePrice * options.durationMonths;
  const finalPrice = calculateSalonPostPrice(options);
  
  return {
    basePrice,
    originalPrice,
    finalPrice,
    discount: originalPrice - finalPrice,
    discountPercentage: ((originalPrice - finalPrice) / originalPrice) * 100
  };
};

// Validate salon pricing options
export const validateSalonPricingOptions = (options: PricingOptions): boolean => {
  if (!options) return false;
  if (!options.selectedPricingTier) return false;
  if (options.durationMonths < 1) return false;
  
  // Check tier is valid
  const validTiers = ['standard', 'premium', 'gold', 'diamond', 'free'];
  if (!validTiers.includes(options.selectedPricingTier)) return false;
  
  return true;
};

// Get Stripe price ID for salon tier
export const getStripeSalonPriceId = (tier: JobPricingTier): string => {
  const priceIds: Record<JobPricingTier, string> = {
    standard: 'price_salon_standard',
    premium: 'price_salon_premium',
    gold: 'price_salon_gold',
    diamond: 'price_salon_diamond',
    free: ''
  };
  
  return priceIds[tier] || '';
};
