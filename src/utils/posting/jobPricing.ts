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
