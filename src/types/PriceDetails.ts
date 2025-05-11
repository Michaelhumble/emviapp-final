
export type PriceDetails = {
  id: string;
  label: string;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  dailyRate: string;
  durationDays: number;
  durationMonths: number;
  isPopular?: boolean;
  isBestValue?: boolean;
  emoji: string;
};
