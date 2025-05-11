
import { PriceDetails } from '@/types/PriceDetails';

export const PRICING_TIERS: PriceDetails[] = [
  { id: "free", label: "Free", priceInCents: 0 },
  { id: "standard", label: "Standard", priceInCents: 999 },
  { id: "premium", label: "Premium", priceInCents: 2999 },
  { id: "gold", label: "Gold", priceInCents: 4999 },
];

// Simple helper to format price in cents to dollars
export const formatPriceInDollars = (priceCents: number): string => {
  return (priceCents / 100).toFixed(2);
};
