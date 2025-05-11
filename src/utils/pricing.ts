
export const PRICING_TIERS = [
  { id: "free", label: "Free", priceCents: 0 },
  { id: "standard", label: "Standard", priceCents: 999 },
  { id: "premium", label: "Premium", priceCents: 2999 },
  { id: "gold", label: "Gold", priceCents: 4999 },
];

// Simple helper to format price in cents to dollars
export const formatPriceInDollars = (priceCents: number): string => {
  return (priceCents / 100).toFixed(2);
};
