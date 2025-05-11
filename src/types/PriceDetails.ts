
export interface PriceDetails {
  id: string;
  label: string;
  priceInCents: number;
}

// This is a simplified version of PricingOptions that matches
// what usePostPayment expects
export interface PaymentOptions {
  selectedPricingTier: string;
  durationMonths?: number;
  autoRenew?: boolean;
  isFirstPost?: boolean;
}
