
import { JobPricingOption, JobPricingTier } from './types';

// Job pricing options for the pricing section
export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'standard-plan',
    name: 'Standard',
    price: 20,
    priceMonthly: 20,
    description: 'Basic job posting with all essential features',
    tag: 'Most Common',
    features: [
      'Standard visibility',
      'Basic placement',
      '1 photo'
    ],
    popular: false,
    tier: 'standard',
    color: 'blue'
  },
  {
    id: 'premium-plan',
    name: 'Premium',
    price: 39,
    priceMonthly: 39,
    wasPrice: 49,
    description: 'Enhanced visibility and priority placement',
    features: [
      'Premium visibility',
      'Priority placement',
      '3 photos',
      'Featured badge'
    ],
    popular: true,
    tier: 'premium',
    color: 'green',
    primaryBenefit: '2x more applications'
  },
  {
    id: 'gold-plan',
    name: 'Gold',
    price: 59,
    priceMonthly: 59,
    description: 'Maximum visibility and premium features',
    features: [
      'Top visibility',
      'Premium placement',
      '5 photos',
      'Featured badge',
      'Social promotion',
      'Urgent badge'
    ],
    tier: 'gold',
    color: 'yellow',
    primaryBenefit: '3x more applications'
  },
  {
    id: 'diamond-plan',
    name: 'Diamond',
    price: 99,
    priceMonthly: 99,
    description: 'Ultimate promotion package for urgent hiring needs',
    features: [
      'Featured at top',
      'Diamond badge',
      'Unlimited photos',
      'Social promotion',
      'Email blast to artists',
      '30-day job fair'
    ],
    tier: 'diamond',
    color: 'purple',
    hidden: true
  },
  {
    id: 'free-plan',
    name: 'Free',
    price: 0,
    priceMonthly: 0,
    description: 'First job posting free for new users',
    features: [
      'Standard visibility',
      '1 photo',
      'Basic placement'
    ],
    isFirstPost: true,
    tier: 'free',
    hidden: false
  }
];

/**
 * Get the pricing option by tier
 */
export const getPricingOptionByTier = (tier: JobPricingTier): JobPricingOption | undefined => {
  return jobPricingOptions.find(option => option.tier === tier);
};

/**
 * Calculate the total price based on pricing options
 */
export const calculateTotalPrice = (pricingOptions: { 
  selectedPricingTier: JobPricingTier;
  durationMonths: number;
  isFirstPost?: boolean;
}): number => {
  // If it's a user's first post and they selected the standard tier, it's free
  if (pricingOptions.isFirstPost && pricingOptions.selectedPricingTier === 'standard') {
    return 0;
  }
  
  const option = getPricingOptionByTier(pricingOptions.selectedPricingTier);
  if (!option) return 0;
  
  return option.price * pricingOptions.durationMonths;
};

/**
 * Get formatted price text with discounts if applicable
 */
export const getFormattedPriceText = (pricingOptions: { 
  selectedPricingTier: JobPricingTier;
  durationMonths: number;
  isFirstPost?: boolean;
}): string => {
  const total = calculateTotalPrice(pricingOptions);
  
  if (total === 0) {
    return 'FREE';
  }
  
  return `$${total}`;
};
