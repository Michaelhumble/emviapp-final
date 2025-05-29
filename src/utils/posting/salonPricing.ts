
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
  duration: number; // in months
  description: string;
  features: string[];
}

export const SALON_PRICING_PLANS: SalonPricingPlan[] = [
  {
    id: 'basic',
    tier: 'basic',
    name: 'Basic Listing',
    price: 39,
    duration: 1,
    description: 'Essential visibility for your salon listing',
    features: [
      '30-day active listing',
      'Basic search visibility',
      'Photo gallery (up to 7 images)',
      'Contact form integration',
      'Mobile-optimized listing'
    ]
  },
  {
    id: 'gold',
    tier: 'gold',
    name: 'Gold Listing',
    price: 89,
    duration: 2,
    description: 'Enhanced visibility with premium features',
    features: [
      '60-day active listing',
      'Priority search placement',
      'Photo gallery (up to 7 images)',
      'Featured badge',
      'Social media promotion',
      'Email alerts to buyers',
      'Mobile-optimized listing'
    ]
  },
  {
    id: 'premium',
    tier: 'premium',
    name: 'Premium Listing',
    price: 149,
    duration: 3,
    description: 'Maximum exposure with all premium features',
    features: [
      '90-day active listing',
      'Top search placement',
      'Photo gallery (up to 7 images)',
      'Premium featured badge',
      'Social media promotion',
      'Email alerts to buyers',
      'Homepage spotlight',
      'Dedicated listing manager',
      'Mobile-optimized listing'
    ]
  },
  {
    id: 'annual',
    tier: 'annual',
    name: 'Annual Package',
    price: 299,
    duration: 12,
    description: 'Best value for long-term listings',
    features: [
      '12-month active listing',
      'Top search placement',
      'Photo gallery (up to 7 images)',
      'Premium featured badge',
      'Social media promotion',
      'Email alerts to buyers',
      'Homepage spotlight',
      'Dedicated listing manager',
      'Monthly listing refresh',
      'Performance analytics',
      'Mobile-optimized listing'
    ]
  }
];

export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  const plan = SALON_PRICING_PLANS.find(p => p.tier === options.selectedPricingTier);
  const basePrice = plan?.price || 0;
  const addonPrice = options.featuredAddon ? 10 : 0;
  return basePrice + addonPrice;
};

export const getSalonPostPricingSummary = (options: SalonPricingOptions) => {
  const plan = SALON_PRICING_PLANS.find(p => p.tier === options.selectedPricingTier);
  const basePrice = plan?.price || 0;
  const addonPrice = options.featuredAddon ? 10 : 0;
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
