
export type SalonPricingTier = 'basic' | 'gold' | 'premium' | 'annual';

export interface SalonPricingOptions {
  selectedPricingTier: SalonPricingTier;
  featuredAddon: boolean;
}

export interface SalonPricingPlan {
  id: string;
  tier: SalonPricingTier;
  name: string;
  price: number;
  originalPrice?: number; // For showing discounts
  duration: number; // in months
  description: string;
  features: string[];
  savings?: string; // For annual plan savings text
}

export const SALON_PRICING_PLANS: SalonPricingPlan[] = [
  {
    id: 'annual',
    tier: 'annual',
    name: 'Until Sold',
    price: 149.00,
    originalPrice: 399.00,
    duration: 0, // Until sold - unlimited
    description: 'No renewal needed! Keep listing active until your salon sells',
    savings: 'No Renewal Needed!',
    features: [
      '+ Active until your salon sells',
      '+ Top search placement',
      '+ Homepage spotlight feature',
      '+ Photo gallery (up to 7 images)',
      '+ Premium featured badge',
      '+ Social media promotion',
      '+ Email alerts to buyers',
      '+ VIP seller support',
      '+ Performance analytics',
      '+ Mobile-optimized listing'
    ]
  },
  {
    id: 'premium',
    tier: 'premium',
    name: 'Fast Sale',
    price: 39.99,
    originalPrice: 119.99,
    duration: 3,
    description: 'Best value for quick sales with premium features',
    savings: 'Save $80!',
    features: [
      '+ 90-day active listing',
      '+ Top search placement',
      '+ Featured badge',
      '+ Photo gallery (up to 7 images)',
      '+ Social media promotion',
      '+ Email alerts to buyers',
      '+ FREE photo gallery',
      '+ Priority customer support',
      '+ Mobile-optimized listing'
    ]
  },
  {
    id: 'gold',
    tier: 'gold',
    name: 'Standard',
    price: 59.99,
    originalPrice: 89.99,
    duration: 2,
    description: 'Enhanced visibility with priority features',
    savings: 'Save $30',
    features: [
      '+ 60-day active listing',
      '+ Priority search placement',
      '+ Photo gallery (up to 7 images)',
      '+ Featured badge',
      '+ Email alerts to buyers',
      '+ Mobile-optimized listing'
    ]
  },
  {
    id: 'basic',
    tier: 'basic',
    name: 'Basic',
    price: 19.99,
    originalPrice: 39.99,
    duration: 1,
    description: 'Essential visibility for your salon listing',
    savings: '50% OFF - Launch Special',
    features: [
      '+ 30-day active listing',
      '+ Basic search visibility',
      '+ Photo gallery (up to 7 images)',
      '+ Contact form integration',
      '+ Mobile-optimized listing'
    ]
  }
];

export const FEATURED_ADDON_PRICE = 10.00;

export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  const plan = SALON_PRICING_PLANS.find(p => p.tier === options.selectedPricingTier);
  const basePrice = plan?.price || 0;
  const addonPrice = options.featuredAddon ? FEATURED_ADDON_PRICE : 0;
  return basePrice + addonPrice;
};

export const getSalonPostPricingSummary = (options: SalonPricingOptions) => {
  const plan = SALON_PRICING_PLANS.find(p => p.tier === options.selectedPricingTier);
  const basePrice = plan?.price || 0;
  const addonPrice = options.featuredAddon ? FEATURED_ADDON_PRICE : 0;
  const total = basePrice + addonPrice;
  
  return {
    planName: plan?.name || 'Unknown Plan',
    basePrice,
    addonPrice,
    total,
    duration: plan?.duration || 1
  };
};

export const validateSalonPricingOptions = (options: SalonPricingOptions): boolean => {
  return Boolean(options.selectedPricingTier && 
    SALON_PRICING_PLANS.some(p => p.tier === options.selectedPricingTier));
};

export const getStripeSalonPriceId = (tier: SalonPricingTier): string => {
  // These would be your actual Stripe price IDs in production
  const priceMap = {
    basic: 'price_basic_salon',
    gold: 'price_gold_salon', 
    premium: 'price_premium_salon',
    annual: 'price_annual_salon'
  };
  return priceMap[tier] || priceMap.basic;
};
