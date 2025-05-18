
export interface PricingOptions {
  selectedPricingTier: 'standard' | 'premium' | 'gold' | 'diamond' | 'free';
  durationMonths: number;
  isFirstPost?: boolean;
  autoRenew?: boolean;
}
