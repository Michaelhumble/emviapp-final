
import { PricingOptions } from './types';

// Pricing tiers for job listings
export const jobPricingOptions = {
  tiers: [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: [
        'Visible for 7 days',
        'Limited visibility',
        'Basic listing details',
        'No featured badge'
      ],
      description: 'Basic listing for quick hires',
      badge: ''
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 9.99,
      features: [
        'Visible for 30 days',
        'Standard visibility',
        'Full listing details',
        'Contact information'
      ],
      description: 'Perfect for most positions',
      badge: 'Popular'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19.99,
      features: [
        'Visible for 45 days',
        'Enhanced visibility',
        'Featured in search results',
        'Premium support'
      ],
      description: 'Higher visibility for competitive positions',
      badge: 'Best Value'
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 29.99,
      features: [
        'Visible for 60 days',
        'Maximum visibility',
        'Top of search results',
        'Social media promotion',
        'Priority support'
      ],
      description: 'Top-tier visibility for urgent positions',
      badge: 'Featured'
    }
  ],
  durations: [
    { months: 1, discount: 0 },
    { months: 3, discount: 10 },
    { months: 6, discount: 15 },
    { months: 12, discount: 20 }
  ]
};

/**
 * Get a job post pricing summary based on tier and duration
 */
export function getJobPostPricingSummary(tierId: string, durationMonths: number) {
  const tier = jobPricingOptions.tiers.find(t => t.id === tierId);
  if (!tier) {
    return { basePrice: 0, totalPrice: 0, discount: 0, discountAmount: 0 };
  }

  const basePrice = tier.price;
  const { totalPrice, discount } = calculateJobPostPrice(basePrice, durationMonths);
  const discountAmount = basePrice * durationMonths * (discount / 100);

  return {
    basePrice,
    totalPrice,
    discount,
    discountAmount
  };
}

/**
 * Calculate job post price based on base price and duration
 */
export function calculateJobPostPrice(basePrice: number, durationMonths: number) {
  let discount = 0;

  // Apply discount based on duration
  if (durationMonths === 3) {
    discount = 10;
  } else if (durationMonths === 6) {
    discount = 15;
  } else if (durationMonths === 12) {
    discount = 20;
  }

  // Calculate total price after discount
  const totalPrice = basePrice * durationMonths * (1 - discount / 100);

  return {
    totalPrice,
    discount
  };
}

/**
 * Convert dollar amount to cents for Stripe
 */
export function getAmountInCents(amount: number): number {
  return Math.round(amount * 100);
}

/**
 * Calculate price with duration discount
 */
export function calculatePriceWithDuration(
  basePrice: number,
  durationMonths: number
): number {
  let discountPercent = 0;
  
  if (durationMonths === 3) discountPercent = 10;
  else if (durationMonths === 6) discountPercent = 15;
  else if (durationMonths === 12) discountPercent = 20;
  
  return basePrice * durationMonths * (1 - discountPercent / 100);
}

/**
 * Calculate final price with all discounts (duration + auto-renew)
 */
export function calculateFinalPrice(
  basePrice: number,
  durationMonths: number,
  autoRenew: boolean
): number {
  // First calculate the price with duration discount
  const priceWithDurationDiscount = calculatePriceWithDuration(basePrice, durationMonths);
  
  // Apply auto-renew discount if enabled
  if (autoRenew) {
    const autoRenewDiscountPercent = 5;
    return priceWithDurationDiscount * (1 - autoRenewDiscountPercent / 100);
  }
  
  return priceWithDurationDiscount;
}

/**
 * Check if a plan is a subscription (auto-renew) plan
 */
export function isSubscriptionPlan(pricingOptions: PricingOptions): boolean {
  return pricingOptions.autoRenew === true;
}

/**
 * Get the appropriate Stripe product ID based on tier, duration, and whether it's a recurring plan
 */
export function getStripeProductId(
  tier: string,
  durationMonths: number,
  isRecurring: boolean = false
): string | null {
  // Mapping of tier+duration to Stripe product IDs
  const productMapping: { [key: string]: string } = {
    // Standard tier product IDs
    'standard_1_one_time': 'prod_std_1mo_ot',
    'standard_3_one_time': 'prod_std_3mo_ot',
    'standard_6_one_time': 'prod_std_6mo_ot',
    'standard_12_one_time': 'prod_std_12mo_ot',
    'standard_1_recurring': 'prod_std_1mo_rec',
    'standard_3_recurring': 'prod_std_3mo_rec',
    'standard_6_recurring': 'prod_std_6mo_rec',
    'standard_12_recurring': 'prod_std_12mo_rec',
    
    // Premium tier product IDs
    'premium_1_one_time': 'prod_prem_1mo_ot',
    'premium_3_one_time': 'prod_prem_3mo_ot',
    'premium_6_one_time': 'prod_prem_6mo_ot',
    'premium_12_one_time': 'prod_prem_12mo_ot',
    'premium_1_recurring': 'prod_prem_1mo_rec',
    'premium_3_recurring': 'prod_prem_3mo_rec',
    'premium_6_recurring': 'prod_prem_6mo_rec',
    'premium_12_recurring': 'prod_prem_12mo_rec',
    
    // Gold tier product IDs
    'gold_1_one_time': 'prod_gold_1mo_ot',
    'gold_3_one_time': 'prod_gold_3mo_ot',
    'gold_6_one_time': 'prod_gold_6mo_ot',
    'gold_12_one_time': 'prod_gold_12mo_ot',
    'gold_1_recurring': 'prod_gold_1mo_rec',
    'gold_3_recurring': 'prod_gold_3mo_rec',
    'gold_6_recurring': 'prod_gold_6mo_rec',
    'gold_12_recurring': 'prod_gold_12mo_rec',
  };
  
  const planType = isRecurring ? 'recurring' : 'one_time';
  const key = `${tier}_${durationMonths}_${planType}`;
  
  return productMapping[key] || null;
}

/**
 * Validate that the pricing options are complete and valid
 */
export function validatePricingOptions(options?: PricingOptions): boolean {
  if (!options) return false;
  
  const { selectedPricingTier, durationMonths } = options;
  
  // Check if selectedPricingTier is valid
  if (!selectedPricingTier) {
    console.error("No pricing tier selected");
    return false;
  }
  
  const validTiers = jobPricingOptions.tiers.map(tier => tier.id);
  if (!validTiers.includes(selectedPricingTier)) {
    console.error(`Invalid pricing tier: ${selectedPricingTier}`);
    return false;
  }
  
  // Check if durationMonths is valid
  if (!durationMonths) {
    console.error("No duration selected");
    return false;
  }
  
  const validDurations = jobPricingOptions.durations.map(d => d.months);
  if (!validDurations.includes(durationMonths)) {
    console.error(`Invalid duration: ${durationMonths}`);
    return false;
  }
  
  return true;
}
