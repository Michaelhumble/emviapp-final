
import { JobPricingOption, JobPricingTier, PricingOptions } from './types';

// Define pricing options for job posts
export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Basic job listing',
    vietnameseDescription: 'Tin đăng việc làm cơ bản',
    features: ['Basic listing', '7 days visibility', 'Local area visibility'],
    isFirstPost: true
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    description: 'Enhanced job listing with priority placement',
    vietnameseDescription: 'Tin đăng việc làm nâng cao',
    tag: 'Most Popular',
    popular: true,
    features: [
      'Enhanced listing',
      '30 days visibility',
      'Featured in job search',
      'Email notifications to candidates'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    wasPrice: 24.99,
    description: 'Premium job listing with maximum visibility',
    vietnameseDescription: 'Tin đăng việc làm cao cấp',
    discountPercentage: 20,
    features: [
      'Premium listing',
      '60 days visibility',
      'Featured in job search',
      'Email notifications to candidates',
      'Social media promotion',
      'Top placement in search results'
    ]
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 49.99,
    description: 'Gold job listing with nationwide visibility',
    vietnameseDescription: 'Tin đăng việc làm vàng',
    features: [
      'Gold listing',
      '90 days visibility',
      'Featured in job search',
      'Email notifications to candidates',
      'Social media promotion',
      'Top placement in search results',
      'Nationwide visibility',
      'Priority customer support'
    ]
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 99.99,
    description: 'Diamond job listing with maximum exposure',
    vietnameseDescription: 'Tin đăng việc làm kim cương',
    features: [
      'Diamond listing',
      '120 days visibility',
      'Featured in job search',
      'Email notifications to candidates',
      'Social media promotion',
      'Top placement in search results',
      'Nationwide visibility',
      'Priority customer support',
      'Featured in newsletter',
      'Premium badge'
    ]
  }
];

// Define Stripe price IDs
export const jobPriceMap: Record<string, string | null> = {
  'free': null,
  'standard_1mo': 'price_1234567890',
  'standard_3mo': 'price_1234567891',
  'standard_6mo': 'price_1234567892',
  'standard_autorenew': 'price_1234567893',
  'premium_1mo': 'price_1234567894',
  'premium_3mo': 'price_1234567895',
  'premium_6mo': 'price_1234567896',
  'gold_1mo': 'price_1234567897',
  'gold_3mo': 'price_1234567898',
  'gold_6mo': 'price_1234567899',
  'diamond_1mo': 'price_1234567900',
  'diamond_3mo': 'price_1234567901',
  'diamond_6mo': 'price_1234567902',
  'diamond_1yr': 'price_1234567903',
};

// Calculate the final price based on options
export const calculateFinalPrice = (basePrice: number, options: PricingOptions): number => {
  let finalPrice = basePrice;

  if (options.isNationwide) {
    finalPrice += 10;
  }

  if (options.fastSalePackage) {
    finalPrice += 15;
  }

  if (options.showAtTop) {
    finalPrice += 20;
  }

  if (options.isHotListing) {
    finalPrice += 25;
  }

  // Apply referral discount if applicable
  if (options.hasReferrals) {
    finalPrice *= 0.8; // 20% discount
  }

  // First post discount
  if (options.isFirstPost) {
    finalPrice = 5; // Special first post price
  }

  return Math.round(finalPrice * 100) / 100;
};

// Calculate job post price based on options
export const calculateJobPostPrice = (options: PricingOptions): number => {
  const tier = options.selectedPricingTier;
  
  // Get the base price for the selected tier
  let basePrice = 9.99; // Default to Standard
  
  switch (tier) {
    case 'free':
      basePrice = 0;
      break;
    case 'standard':
      basePrice = 9.99;
      break;
    case 'premium':
      basePrice = 19.99;
      break;
    case 'gold':
      basePrice = 49.99;
      break;
    case 'diamond':
      basePrice = 99.99;
      break;
    default:
      basePrice = 9.99;
  }
  
  return calculateFinalPrice(basePrice, options);
};

// Apply duration multipliers to the price
export const calculatePriceWithDuration = (basePrice: number, durationMonths: number = 1): number => {
  if (durationMonths === 3) {
    return basePrice * 2.5;
  } else if (durationMonths === 6) {
    return basePrice * 4.5;
  } else if (durationMonths === 12) {
    return basePrice * 8;
  }
  
  return basePrice;
};

// Get a job post pricing summary
export const getJobPostPricingSummary = (options: PricingOptions): string[] => {
  const summary: string[] = [];
  
  // Base price line
  const tier = options.selectedPricingTier;
  let basePrice = 9.99;
  
  switch (tier) {
    case 'free':
      basePrice = 0;
      summary.push(`Free Job Listing: $0`);
      break;
    case 'standard':
      basePrice = 9.99;
      summary.push(`Standard Job Listing: $${basePrice}`);
      break;
    case 'premium':
      basePrice = 19.99;
      summary.push(`Premium Job Listing: $${basePrice}`);
      break;
    case 'gold':
      basePrice = 49.99;
      summary.push(`Gold Job Listing: $${basePrice}`);
      break;
    case 'diamond':
      basePrice = 99.99;
      summary.push(`Diamond Job Listing: $${basePrice}`);
      break;
    default:
      basePrice = 9.99;
      summary.push(`Job Listing: $${basePrice}`);
  }
  
  // Apply options
  if (options.isNationwide) {
    summary.push(`Nationwide Visibility: +$10`);
  }
  
  if (options.fastSalePackage) {
    summary.push(`Fast Sale Package: +$15`);
  }
  
  if (options.showAtTop) {
    summary.push(`Show at Top: +$20`);
  }
  
  if (options.isHotListing) {
    summary.push(`Hot Listing: +$25`);
  }
  
  // Apply referral discount
  if (options.hasReferrals) {
    summary.push(`Referral Discount: -20%`);
  }
  
  // First post discount
  if (options.isFirstPost) {
    summary.push(`First Post Special Price: $5 only!`);
  }
  
  // Total line
  const finalPrice = calculateJobPostPrice(options);
  summary.push(`Total: $${finalPrice}`);
  
  return summary;
};

// Validate pricing options
export const validatePricingOptions = (pricingId: string, options: PricingOptions): boolean => {
  // Free plan is always valid
  if (pricingId === 'free') {
    return true;
  }
  
  // Ensure we have a valid pricing ID
  const validIds = ['free', 'standard', 'premium', 'gold', 'diamond'];
  if (!validIds.includes(pricingId)) {
    console.error("Invalid pricing ID:", pricingId);
    return false;
  }
  
  // Ensure we have a duration for non-free plans
  if (pricingId !== 'free' && !options.durationMonths) {
    console.error("No duration selected for paid plan");
    return false;
  }
  
  return true;
};

// Get Stripe price ID
export const getStripePriceId = (pricingId: string, options: PricingOptions): string | null => {
  if (pricingId === 'free') {
    return null;
  }
  
  // Auto-renew subscription
  if (options.autoRenew && pricingId === 'standard') {
    return jobPriceMap.standard_autorenew;
  }
  
  // One-time purchase with duration
  const durationMonths = options.durationMonths || 1;
  const key = `${pricingId}_${durationMonths === 12 ? '1yr' : durationMonths + 'mo'}`;
  
  return jobPriceMap[key] || jobPriceMap[`${pricingId}_1mo`];
};

// Get the amount in cents for Stripe
export const getAmountInCents = (amount: number): number => {
  return Math.round(amount * 100);
};

// Check if the pricing option is a subscription
export const isSubscriptionPlan = (options: PricingOptions): boolean => {
  return !!options.autoRenew;
};
