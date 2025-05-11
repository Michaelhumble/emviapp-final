
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';
import { DurationOption } from '@/types/pricing';

interface DurationSelectorProps {
  options: DurationOption[];
  selectedDuration: number;
  onChange: (duration: number) => void;
}

const DurationSelector = ({ options, selectedDuration, onChange }: DurationSelectorProps) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">
        {t('Select listing duration', 'Chọn thời gian hiển thị')}
      </h3>
      <RadioGroup 
        value={selectedDuration.toString()} 
        onValueChange={(value) => onChange(parseInt(value))}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {options.map((option) => (
          <div 
            key={option.months}
            className={`border rounded-lg p-3 cursor-pointer ${
              selectedDuration === option.months ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <RadioGroupItem value={option.months.toString()} id={`duration-${option.months}`} className="sr-only" />
            <Label htmlFor={`duration-${option.months}`} className="cursor-pointer block">
              <div className="font-medium">{t(option.label, option.vietnameseLabel)}</div>
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
  );
};

export default DurationSelector;
