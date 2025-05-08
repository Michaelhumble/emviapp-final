
import { JobPricingOption, JobPricingTier } from './types';

export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free Post',
    tier: 'basic' as JobPricingTier,
    price: 0,
    description: 'Great for casual hiring',
    features: [
      'Visible in Standard section',
      'No image',
      'Shows for 3 days',
      'Standard placement'
    ],
    duration: 3, // days
  },
  {
    id: 'standard',
    name: 'Standard',
    tier: 'premium' as JobPricingTier,
    price: 19.99,
    description: '3x more visibility',
    features: [
      'Includes image',
      'Visible for 2 weeks',
      'Listed in Gold section',
      'Better placement'
    ],
    duration: 14, // days
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    tier: 'featured' as JobPricingTier,
    price: 49.99,
    description: 'Best for urgent hiring',
    features: [
      'Pinned for 1 week',
      'Visible longer',
      'Shows on homepage',
      'Priority placement'
    ],
    duration: 30, // days
  },
  {
    id: 'diamond',
    name: 'Diamond Featured',
    tier: 'featured' as JobPricingTier,
    price: 999.99,
    description: 'Maximum trust & exposure',
    features: [
      'Top 3 spots',
      '1-year duration',
      'Only 3 available',
      'Premium placement'
    ],
    duration: 365, // days
  },
];
