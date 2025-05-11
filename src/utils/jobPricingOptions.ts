
import { PriceDetails } from "@/types/PriceDetails";

export const PRICING_OPTIONS: PriceDetails[] = [
  {
    id: "gold-3mo",
    label: "90 days / 3 months",
    originalPrice: 59.97,
    finalPrice: 53.97,
    discountPercentage: 10,
    dailyRate: "$0.60/day",
    durationDays: 90,
    durationMonths: 3,
    emoji: "🐢"
  },
  {
    id: "gold-6mo",
    label: "180 days / 6 months",
    originalPrice: 119.94,
    finalPrice: 101.95,
    discountPercentage: 15,
    dailyRate: "$0.57/day",
    durationDays: 180,
    durationMonths: 6,
    isPopular: true,
    emoji: "🐝"
  },
  {
    id: "gold-12mo",
    label: "365 days / 12 months",
    originalPrice: 239.88,
    finalPrice: 191.90,
    discountPercentage: 20,
    dailyRate: "$0.53/day",
    durationDays: 365,
    durationMonths: 12,
    isBestValue: true,
    emoji: "🐇"
  },
];

// Helper functions
export const getPricingOptionByDuration = (durationMonths: number): PriceDetails | undefined => {
  return PRICING_OPTIONS.find(option => option.durationMonths === durationMonths);
};

export const applyAutoRenewDiscount = (price: PriceDetails, autoRenew: boolean): PriceDetails => {
  if (!autoRenew) return price;
  
  const finalPrice = Math.round((price.finalPrice * 0.95) * 100) / 100;
  const additionalDiscount = price.originalPrice - finalPrice;
  const newDiscountPercentage = Math.round((1 - finalPrice / price.originalPrice) * 100);
  
  return {
    ...price,
    finalPrice,
    discountPercentage: newDiscountPercentage,
    dailyRate: `$${(finalPrice / price.durationDays).toFixed(2)}/day`
  };
};
