
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { DurationOption } from '@/types/pricing';
import { useTranslation } from '@/hooks/useTranslation';
import { PriceDetails } from '@/types/pricing';

interface PricingCardsProps {
  pricingOptions: PriceDetails[];
  selectedPricing: string;
  onChange: (id: string) => void;
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

const durationOptions: DurationOption[] = [
  { months: 1, label: '1 Month', vietnameseLabel: '1 Tháng', discount: 0 },
  { months: 3, label: '3 Months', vietnameseLabel: '3 Tháng', discount: 10 },
  { months: 6, label: '6 Months', vietnameseLabel: '6 Tháng', discount: 20 }
];

const PricingCards: React.FC<PricingCardsProps> = ({
  pricingOptions,
  selectedPricing,
  onChange,
  selectedDuration,
  onDurationChange
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <RadioGroup value={selectedPricing} onValueChange={onChange} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pricingOptions.map((option) => (
          <div 
            key={option.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedPricing === option.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
            <Label htmlFor={option.id} className="cursor-pointer block">
              <div className="font-semibold text-lg mb-1">{option.label}</div>
              <div className="text-xl font-bold mb-2">
                {option.priceInCents === 0 
                  ? t('Free', 'Miễn phí') 
                  : `$${(option.priceInCents / 100).toFixed(2)}`}
              </div>
              <div className="text-sm text-gray-500">
                {option.id === 'free' 
                  ? t('Limited visibility', 'Hiển thị hạn chế') 
                  : t('Premium visibility', 'Hiển thị nổi bật')}
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      {selectedPricing !== 'free' && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">{t('Select Duration', 'Chọn thời hạn')}</h3>
          <RadioGroup 
            value={String(selectedDuration)} 
            onValueChange={(value) => onDurationChange(Number(value))}
            className="grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            {durationOptions.map((option) => (
              <div 
                key={option.months}
                className={`border rounded-lg p-3 cursor-pointer transition-all ${
                  selectedDuration === option.months ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <RadioGroupItem value={String(option.months)} id={`duration-${option.months}`} className="sr-only" />
                <Label htmlFor={`duration-${option.months}`} className="cursor-pointer block">
                  <div className="font-semibold">
                    {t(option.label, option.vietnameseLabel)}
                  </div>
                  {option.discount > 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      {t(`Save ${option.discount}%`, `Tiết kiệm ${option.discount}%`)}
                    </div>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}
    </div>
  );
};

export default PricingCards;
