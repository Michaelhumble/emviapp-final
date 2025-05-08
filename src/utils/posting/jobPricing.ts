
// Job listing pricing tiers
export const PRICING_TIERS = {
  DIAMOND: 'diamond',
  PREMIUM: 'premium',
  GOLD: 'gold', 
  FEATURED: 'featured',
  STANDARD: 'standard',
  STARTER: 'starter',
  FREE: 'free',
  EXPIRED: 'expired'
};

// Annual pricing for each tier
export const TIER_PRICING = {
  [PRICING_TIERS.DIAMOND]: 999.99,
  [PRICING_TIERS.PREMIUM]: 499.99,
  [PRICING_TIERS.GOLD]: 249.99,
  [PRICING_TIERS.FEATURED]: 149.99,
  [PRICING_TIERS.STANDARD]: 99.99,
  [PRICING_TIERS.STARTER]: 49.99,
  [PRICING_TIERS.FREE]: 0,
};

// Value proposition text for each tier
export const TIER_VALUE_PROPS = {
  [PRICING_TIERS.DIAMOND]: [
    'Top placement above all other listings',
    'Permanent Diamond badge of trust',
    'Full contact visibility for all users',
    'Premium visual styling and emphasis',
    'Guaranteed 500% more views',
    'Full year of exposure (365 days)'
  ],
  [PRICING_TIERS.PREMIUM]: [
    'High placement in search results',
    'Premium badge of trust',
    'Enhanced visual styling',
    'Increased visibility',
    'Six months of exposure (180 days)'
  ],
  [PRICING_TIERS.GOLD]: [
    'Good placement in search results',
    'Gold badge of trust',
    'Standard visual styling',
    'Improved visibility',
    'Three months of exposure (90 days)'
  ],
  [PRICING_TIERS.FEATURED]: [
    'Featured placement in search results',
    'Featured badge',
    'Basic visual styling',
    'Good visibility',
    'One month of exposure (30 days)'
  ],
  [PRICING_TIERS.STANDARD]: [
    'Standard placement in search results',
    'No badge',
    'Basic visual styling',
    'Standard visibility',
    'One month of exposure (30 days)'
  ],
  [PRICING_TIERS.STARTER]: [
    'Basic placement in search results',
    'No badge',
    'Basic visual styling',
    'Limited visibility',
    'Two weeks of exposure (14 days)'
  ],
  [PRICING_TIERS.FREE]: [
    'Basic placement in search results',
    'No badge',
    'Basic visual styling',
    'Very limited visibility',
    'One week of exposure (7 days)'
  ],
  [PRICING_TIERS.EXPIRED]: [
    'Listing is expired',
    'No badge',
    'Basic visual styling',
    'No visibility',
    'No exposure (0 days)'
  ],
};

// Import PricingOptions type to use in our functions
import { PricingOptions } from './types';

/**
 * Calculate the price for a job post based on selected options
 * @param options Pricing options selected by the user
 * @returns The calculated price
 */
export const calculateJobPostPrice = (options: PricingOptions): number => {
  let basePrice = 0;
  
  // Set base price based on tier
  if (options.pricingTier === PRICING_TIERS.DIAMOND) {
    basePrice = TIER_PRICING[PRICING_TIERS.DIAMOND];
  } else if (options.pricingTier === PRICING_TIERS.PREMIUM) {
    basePrice = TIER_PRICING[PRICING_TIERS.PREMIUM];
  } else if (options.pricingTier === PRICING_TIERS.GOLD) {
    basePrice = TIER_PRICING[PRICING_TIERS.GOLD];
  } else if (options.pricingTier === PRICING_TIERS.FEATURED) {
    basePrice = TIER_PRICING[PRICING_TIERS.FEATURED];
  } else if (options.pricingTier === PRICING_TIERS.STANDARD) {
    basePrice = TIER_PRICING[PRICING_TIERS.STANDARD];
  } else if (options.pricingTier === PRICING_TIERS.STARTER) {
    basePrice = TIER_PRICING[PRICING_TIERS.STARTER];
  } else {
    // Default to free tier
    basePrice = TIER_PRICING[PRICING_TIERS.FREE];
  }
  
  // Apply additional pricing for options
  if (options.isNationwide) {
    basePrice += 49.99;
  }
  
  if (options.isUrgent) {
    basePrice += 19.99;
  }
  
  if (options.boostVisibility) {
    basePrice += 29.99;
  }
  
  if (options.extendedDuration) {
    basePrice += 39.99;
  }
  
  // Apply first post discount if applicable
  if (options.isFirstPost) {
    basePrice = Math.max(0, basePrice - 49.99);
  }
  
  // Round to 2 decimal places
  return Math.round(basePrice * 100) / 100;
};

/**
 * Generate a pricing summary for job posts
 * @param options Pricing options selected by the user
 * @returns Array of summary text items
 */
export const getJobPostPricingSummary = (options: PricingOptions): string[] => {
  const summary = [];
  
  // Base tier price
  let tierName = 'Standard Post';
  let tierPrice = TIER_PRICING[PRICING_TIERS.STANDARD];
  
  if (options.pricingTier === PRICING_TIERS.DIAMOND) {
    tierName = 'Diamond Tier';
    tierPrice = TIER_PRICING[PRICING_TIERS.DIAMOND];
  } else if (options.pricingTier === PRICING_TIERS.PREMIUM) {
    tierName = 'Premium Tier';
    tierPrice = TIER_PRICING[PRICING_TIERS.PREMIUM];
  } else if (options.pricingTier === PRICING_TIERS.GOLD) {
    tierName = 'Gold Tier';
    tierPrice = TIER_PRICING[PRICING_TIERS.GOLD];
  } else if (options.pricingTier === PRICING_TIERS.FEATURED) {
    tierName = 'Featured Tier';
    tierPrice = TIER_PRICING[PRICING_TIERS.FEATURED];
  } else if (options.pricingTier === PRICING_TIERS.STARTER) {
    tierName = 'Starter Tier';
    tierPrice = TIER_PRICING[PRICING_TIERS.STARTER];
  } else if (options.pricingTier === PRICING_TIERS.FREE) {
    tierName = 'Free Post';
    tierPrice = 0;
  }
  
  summary.push(`${tierName}: $${tierPrice.toFixed(2)}`);
  
  // Add additional options to summary
  if (options.isNationwide) {
    summary.push(`Nationwide Visibility: $49.99`);
  }
  
  if (options.isUrgent) {
    summary.push(`Urgent Tag: $19.99`);
  }
  
  if (options.boostVisibility) {
    summary.push(`Visibility Boost: $29.99`);
  }
  
  if (options.extendedDuration) {
    summary.push(`Extended Duration: $39.99`);
  }
  
  // Apply first post discount if applicable
  if (options.isFirstPost) {
    summary.push(`First Post Discount: -$49.99`);
  }
  
  // Calculate and add total
  const totalPrice = calculateJobPostPrice(options);
  summary.push(`Total: $${totalPrice.toFixed(2)}`);
  
  return summary;
};

// Add utility function to get tier duration in days
export const getTierDuration = (tier: string): number => {
  switch (tier) {
    case PRICING_TIERS.DIAMOND:
      return 365; // 1 year
    case PRICING_TIERS.PREMIUM:
      return 180; // 6 months
    case PRICING_TIERS.GOLD:
      return 90;  // 3 months
    case PRICING_TIERS.FEATURED:
      return 30;  // 1 month
    case PRICING_TIERS.STANDARD:
      return 30;  // 1 month
    case PRICING_TIERS.STARTER:
      return 14;  // 2 weeks
    case PRICING_TIERS.FREE:
      return 7;   // 1 week
    default:
      return 0;
  }
};
