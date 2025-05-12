
import { DurationOption } from '@/types/pricing';

export const durationOptions: DurationOption[] = [
  { months: 1, label: '1 Month', vietnameseLabel: '1 Tháng', discount: 0 },
  { months: 3, label: '3 Months', vietnameseLabel: '3 Tháng', discount: 5 },  
  { months: 6, label: '6 Months', vietnameseLabel: '6 Tháng', discount: 10 }, 
  { months: 12, label: '12 Months', vietnameseLabel: '12 Tháng', discount: 20 } 
];

export interface DurationSelectorProps {
  selectedMonths: number;
  onChange: (months: number) => void;
}
