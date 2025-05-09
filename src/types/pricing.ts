
export interface DurationOption {
  months: number;
  label: string;
  vietnameseLabel: string;
  discount: number;
}

export interface DurationSelection {
  [pricingId: string]: number; // months
}

// New interface for maintaining consistent pricing calculations
export interface PricingWithDuration {
  basePricePerMonth: number;
  durationMonths: number;
  discountPercentage: number;
}

// Types for Stripe payment processing
export interface StripePaymentRequest {
  postType: 'job' | 'salon' | 'booth' | 'supply';
  pricing: {
    tier: string;
    amountInCents: number;
    mode: 'payment' | 'subscription';
    durationMonths: number;
    autoRenew: boolean;
    basePrice: number;
  };
  postDetails: any;
  pricingOptions: any;
}

export interface StripeCheckoutResponse {
  url: string;
  session_id: string;
  payment_log_id?: string;
  post_id?: string;
}
