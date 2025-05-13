
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

export interface UpsellOption {
  id: string;
  name: string;
  vietnameseName?: string;
  description: string;
  vietnameseDescription?: string;
  price: number;
  type: 'toggle' | 'radio' | 'checkbox';
  defaultEnabled?: boolean;
}

export const getUpsellOptions = (isFreePost: boolean): UpsellOption[] => {
  return [
    {
      id: 'nationwide',
      name: 'Nationwide Visibility',
      vietnameseName: 'Hiển thị toàn quốc',
      description: 'Get seen across all states',
      vietnameseDescription: 'Được nhìn thấy trên tất cả các tiểu bang',
      price: 5,
      type: 'toggle',
      defaultEnabled: false
    },
    {
      id: 'fastSale',
      name: 'Fast Sale Package',
      vietnameseName: 'Gói bán nhanh',
      description: 'Premium placement + 30-day featured pin',
      vietnameseDescription: 'Vị trí nổi bật + ghim nổi bật trong 30 ngày',
      price: 50,
      type: 'toggle',
      defaultEnabled: false
    },
    {
      id: 'weeklyPay',
      name: 'Weekly Pay Trust Badge',
      vietnameseName: 'Huy hiệu thanh toán hàng tuần',
      description: 'Show that you offer weekly pay',
      vietnameseDescription: 'Hiển thị rằng bạn trả lương hàng tuần',
      price: 0,
      type: 'checkbox',
      defaultEnabled: false
    }
  ].filter(option => {
    // If this is a free post, only allow free upsells
    if (isFreePost) {
      return option.price === 0;
    }
    return true;
  });
};
