
export interface DurationOption {
  months: number;
  label: string;
  vietnameseLabel: string;
  discount: number;
}

export interface DurationSelection {
  [pricingId: string]: number; // months
}
