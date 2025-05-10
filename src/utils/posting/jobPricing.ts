import { JobPricingOption, JobPricingTier, PricingOptions } from './types';

export const jobPricingOptions: JobPricingOption[] = [
  {
    id: 'free',
    name: '🎁 Free Post',
    tier: 'basic' as JobPricingTier,
    price: 0,
    wasPrice: 9.99,
    description: 'Simple & quick post. Limited reach.',
    vietnameseDescription: 'Tin đơn giản – Không có hình ảnh',
    features: [
      '📄 Listed in standard row',
      '⏳ Expires in 30 days',
      '🚫 No image or contact shown'
    ],
    duration: 30, // days
    tag: '⚪ Was $9.99 – Now Free!'
  },
  {
    id: 'standard',
    name: '✅ Standard',
    tier: 'premium' as JobPricingTier,
    price: 9.99,
    wasPrice: 29.99,
    description: 'Full listing. Better placement.',
    vietnameseDescription: 'Hiển thị đầy đủ với hình ảnh + số điện thoại',
    features: [
      '🖼️ Show image',
      '📞 Show contact info',
      '🪙 Gold row placement'
    ],
    duration: 30, // days
    tag: '🟢 Save Big – Limited Time'
  },
  {
    id: 'gold',
    name: '🏆 Gold Featured',
    tier: 'featured' as JobPricingTier,
    price: 19.99,
    wasPrice: 39.99,
    description: 'Featured row. Look more impressive.',
    vietnameseDescription: 'Hiển thị nổi bật – Khách thấy dễ hơn',
    features: [
      '👑 Highlighted in Gold',
      '🔍 Search priority',
      '📅 30-day display'
    ],
    duration: 30, // days
    popular: true,
    tag: '🟡 Smart Pick'
  },
  {
    id: 'premium',
    name: '✨ Premium',
    tier: 'featured' as JobPricingTier,
    price: 49.99,
    wasPrice: 99.99,
    description: 'Homepage power. Best for speed.',
    vietnameseDescription: 'Ưu tiên trên trang chính – Khách thấy bạn đầu tiên',
    features: [
      '📌 Homepage pinning',
      '📈 Top visibility',
      '💬 VIP support'
    ],
    duration: 30, // days
    tag: '🟠 Today Only – 50% OFF'
  },
  {
    id: 'diamond',
    name: '💎 Diamond Featured',
    tier: 'featured' as JobPricingTier,
    price: 1499.99,
    wasPrice: 1999.99,
    description: 'Top 3 Spots. Forever Trusted.',
    vietnameseDescription: 'Vị trí đặc biệt – Chỉ 3 chỗ duy nhất',
    features: [
      '🥇 1 of only 3',
      '📌 Homepage pinned',
      '👥 Unlimited team'
    ],
    duration: 365, // days
    tag: '🔥 Only 3 Available',
    note: 'Includes homepage pinning, unlimited team members, and highest visibility.',
    yearlyDiscountPrice: 999.99 // New property for yearly discount
  },
];

// Price map for Stripe products
export const priceMap = {
  free: null,
  standard: "price_XXX_STANDARD_999",
  standardAutoRenew: "price_XXX_STANDARD_AUTO_949",
  gold: "price_XXX_GOLD_1999",
  premium: "price_XXX_PREMIUM_4999",
  diamond3mo: "price_XXX_DIAMOND_3MO_49999",
  diamond6mo: "price_XXX_DIAMOND_6MO_79999",
  diamond1yr: "price_XXX_DIAMOND_1YR_99999"
};

// Function to get the Stripe price ID based on pricing options
export const getStripePriceId = (
  pricingId: string,
  options: PricingOptions
): string | null => {
  if (pricingId === 'free') {
    return null; // Free tier doesn't need a Stripe price ID
  }
  
  // Special handling for Diamond plan based on duration
  if (pricingId === 'diamond') {
    const durationMonths = options.durationMonths || 12;
    if (durationMonths === 3) {
      return priceMap.diamond3mo;
    } else if (durationMonths === 6) {
      return priceMap.diamond6mo;
    } else {
      // Default to 1 year for Diamond plan
      return priceMap.diamond1yr;
    }
  }
  
  // Standard plan with auto-renew
  if (pricingId === 'standard' && options.autoRenew) {
    return priceMap.standardAutoRenew;
  }
  
  // Other plans
  switch (pricingId) {
    case 'standard': return priceMap.standard;
    case 'gold': return priceMap.gold;
    case 'premium': return priceMap.premium;
    default: return priceMap.standard; // Default fallback
  }
};

// Validate pricing options
export const validatePricingOptions = (
  pricingId: string,
  options: PricingOptions
): boolean => {
  // Ensure we have a valid pricing ID
  if (!pricingId) {
    console.error("No pricing tier selected");
    return false;
  }
  
  // Ensure we have a duration for non-free plans
  if (pricingId !== 'free' && !options.durationMonths) {
    console.error("No duration selected for paid plan");
    return false;
  }
  
  // Ensure we have a valid Stripe price ID for non-free plans
  if (pricingId !== 'free' && !getStripePriceId(pricingId, options)) {
    console.error("Failed to get valid Stripe price ID", { pricingId, options });
    return false;
  }
  
  return true;
};

// Function to get pricing summary for job posts
export const getJobPostPricingSummary = (
  selectedPricingId: string,
  extras: Record<string, boolean> = {}
): { total: number; lineItems: Array<{ name: string; price: number }> } => {
  // Find the selected pricing option
  const selectedOption = jobPricingOptions.find(option => option.id === selectedPricingId);
  
  if (!selectedOption) {
    return {
      total: 0,
      lineItems: []
    };
  }

  // Start with the base pricing
  const lineItems = [
    {
      name: `${selectedOption.name} Job Posting`,
      price: selectedOption.price
    }
  ];

  // Add any extras (can be expanded in the future)
  Object.entries(extras).forEach(([key, isSelected]) => {
    if (isSelected) {
      switch (key) {
        case 'featuredPlacement':
          lineItems.push({
            name: 'Featured Placement Upgrade',
            price: 29.99
          });
          break;
        case 'extendedDuration':
          lineItems.push({
            name: 'Extended Duration (+14 days)',
            price: 14.99
          });
          break;
        case 'highlightedListing':
          lineItems.push({
            name: 'Highlighted Listing',
            price: 9.99
          });
          break;
        // Add more extras as needed
      }
    }
  });

  // Calculate total
  const total = lineItems.reduce((sum, item) => sum + item.price, 0);

  return {
    total,
    lineItems
  };
};

// Function to calculate price with duration discount
export const calculatePriceWithDuration = (
  basePrice: number,
  durationMonths: number,
  autoRenew: boolean = false
): {
  monthlyPrice: number;
  totalPrice: number;
  savings: number;
  discountPercentage: number;
} => {
  let discountPercentage = 0;
  
  // Apply duration-based discounts
  if (durationMonths === 3) {
    discountPercentage = 5;
  } else if (durationMonths === 6) {
    discountPercentage = 10;
  } else if (durationMonths === 12) {
    discountPercentage = 20;
  }
  
  // Add auto-renew discount
  if (autoRenew) {
    discountPercentage += 5;
  }
  
  const monthlyPrice = basePrice * (1 - discountPercentage / 100);
  const totalPrice = monthlyPrice * durationMonths;
  const savings = basePrice * durationMonths - totalPrice;
  
  return {
    monthlyPrice,
    totalPrice,
    savings,
    discountPercentage
  };
};

// Updated calculateFinalPrice function with special Diamond plan logic
export const calculateFinalPrice = (
  basePrice: number,
  durationMonths: number,
  pricingId: string,
  autoRenew: boolean = false
): {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
} => {
  // Special Diamond plan pricing logic
  if (pricingId === 'diamond') {
    const selectedOption = jobPricingOptions.find(option => option.id === 'diamond');
    
    if (durationMonths === 3) {
      return {
        originalPrice: 499.99,
        finalPrice: 499.99,
        discountPercentage: 0
      };
    } else if (durationMonths === 6) {
      return {
        originalPrice: 799.99,
        finalPrice: 799.99,
        discountPercentage: 0
      };
    } else if (durationMonths === 12) {
      // Use the special yearly discount price for Diamond
      const yearlyPrice = selectedOption?.price || 1499.99;
      const yearlyDiscountPrice = 999.99; // As per requirements
      
      return {
        originalPrice: yearlyPrice,
        finalPrice: yearlyDiscountPrice, 
        discountPercentage: Math.round(((yearlyPrice - yearlyDiscountPrice) / yearlyPrice) * 100)
      };
    } else {
      // All other durations show full price with no discount
      return {
        originalPrice: basePrice * durationMonths,
        finalPrice: basePrice * durationMonths,
        discountPercentage: 0
      };
    }
  }
  
  // Regular pricing logic for other plans
  let discountPercentage = 0;
  if (durationMonths === 3) discountPercentage = 5;
  else if (durationMonths === 6) discountPercentage = 10;
  else if (durationMonths === 12) discountPercentage = 20;
  
  // Add auto-renew discount if enabled (only for non-Diamond plans)
  if (autoRenew) {
    discountPercentage += 5;
  }
  
  const originalPrice = basePrice * durationMonths;
  const finalPrice = originalPrice * (1 - discountPercentage / 100);
  
  return {
    originalPrice,
    finalPrice,
    discountPercentage
  };
};

// Get amount in cents for Stripe
export const getAmountInCents = (amount: number): number => {
  return Math.round(amount * 100);
};

// Helper function to determine if plan should use subscription mode
export const isSubscriptionPlan = (pricingId: string, autoRenew: boolean): boolean => {
  // Only standard plan with auto-renew should use subscription mode
  return pricingId === 'standard' && autoRenew;
};
