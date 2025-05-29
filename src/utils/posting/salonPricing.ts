
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
