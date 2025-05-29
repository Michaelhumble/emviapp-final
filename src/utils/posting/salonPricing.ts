
export type SalonPricingTier = 'basic' | 'gold' | 'premium' | 'annual';

export interface SalonPricingOptions {
  selectedPricingTier?: SalonPricingTier;
  featuredAddon?: boolean;
  planType: 'basic' | 'standard' | 'premium' | 'enterprise';
  duration: number;
  basePrice: number;
  totalPrice: number;
  features: string[];
  planName: string;
}

export const SALON_PRICING_PLANS = [
  {
    id: 'basic',
    tier: 'basic' as SalonPricingTier,
    name: 'Basic',
    price: 19.99,
    duration: 1,
    description: 'Standard salon listing for 1 month',
    features: [
      'Listed for 30 days',
      'Basic contact information',
      'Standard search visibility',
      'Basic listing placement'
    ]
  },
  {
    id: 'gold',
    tier: 'gold' as SalonPricingTier,
    name: 'Gold',
    price: 49.99,
    duration: 3,
    description: 'Enhanced listing for 3 months',
    features: [
      'Listed for 90 days',
      'Enhanced visibility',
      'Priority in search results',
      'Email support included'
    ]
  },
  {
    id: 'premium',
    tier: 'premium' as SalonPricingTier,
    name: 'Premium',
    price: 99.99,
    duration: 6,
    description: 'Premium listing for 6 months',
    features: [
      'Listed for 180 days',
      'Maximum visibility',
      'Top placement in results',
      'Premium badge display'
    ]
  },
  {
    id: 'annual',
    tier: 'annual' as SalonPricingTier,
    name: '12 Months',
    price: 149.00,
    duration: 12,
    description: 'Annual listing package - Best Value',
    features: [
      'Listed for 1 full year',
      'All premium features',
      'Priority customer support',
      'Maximum exposure guarantee'
    ]
  }
];

export const calculateSalonPostPrice = (options: SalonPricingOptions): number => {
  // Get base price from selected tier
  const selectedPlan = SALON_PRICING_PLANS.find(plan => plan.tier === options.selectedPricingTier);
  let totalPrice = selectedPlan ? selectedPlan.price : 19.99;
  
  // Add featured addon if selected
  if (options.featuredAddon) {
    totalPrice += 10.00;
  }
  
  return totalPrice;
};

export const getSalonPostPricingSummary = (options: SalonPricingOptions) => {
  const selectedPlan = SALON_PRICING_PLANS.find(plan => plan.tier === options.selectedPricingTier);
  const basePrice = selectedPlan ? selectedPlan.price : 19.99;
  
  return {
    basePrice,
    featuredAddon: options.featuredAddon ? 10.00 : 0,
    total: calculateSalonPostPrice(options),
    planName: selectedPlan?.name || 'Basic',
    duration: selectedPlan?.duration || 1
  };
};

export const validateSalonPricingOptions = (options: SalonPricingOptions): boolean => {
  return !!options.selectedPricingTier;
};

export const getStripeSalonPriceId = (options: SalonPricingOptions): string => {
  // This would map to actual Stripe price IDs in production
  const priceMap = {
    basic: 'price_basic_salon',
    gold: 'price_gold_salon', 
    premium: 'price_premium_salon',
    annual: 'price_annual_salon'
  };
  
  return priceMap[options.selectedPricingTier || 'basic'];
};
