
export interface DurationOption {
  months: number;
  label: string;
  vietnameseLabel: string;
  discount: number;
}

export interface PricingDisplayOption {
  id: string;
  name: string;
  displayName: string;
  price: number;
  wasPrice?: number;
  description: string;
  vietnameseDescription?: string;
  features: string[];
  tag?: string;
  badge?: string;
  tier?: string;
  popular?: boolean;
  hidden?: boolean;
}

export interface PricingOption {
  id: string;
  name: string;
  price: number;
  wasPrice?: number;
  description: string;
  features: string[];
  tier?: string;
  discountPercentage?: number;
  selected?: boolean;
}
