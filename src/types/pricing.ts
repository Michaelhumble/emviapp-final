
export interface PriceDetails {
  id: string;
  label: string;
  priceInCents: number;
}

export const pricingTiers: Record<string, PriceDetails> = {
  free: { id: "free", label: "Free", priceInCents: 0 },
  standard: { id: "standard", label: "Standard", priceInCents: 999 },
  premium: { id: "premium", label: "Premium", priceInCents: 2999 },
  gold: { id: "gold", label: "Gold", priceInCents: 4999 },
};
