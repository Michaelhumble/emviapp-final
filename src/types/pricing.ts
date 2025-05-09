
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
