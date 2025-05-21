
import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/hooks/useTranslation';
import { DurationOption } from '@/types/pricing';
import { durationOptions } from './pricingData';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface HeroSectionProps {
  selectedDuration?: number;
  onDurationChange?: (duration: number) => void;
}

const HeroSection = ({ 
  selectedDuration = 1, 
  onDurationChange = () => {} 
}: HeroSectionProps) => {
  const { t } = useTranslation();

  const handleDurationChange = (value: string) => {
    const duration = parseInt(value, 10);
    if (!isNaN(duration)) {
      onDurationChange(duration);
    }
  };

  const getDiscountLabel = (option: DurationOption) => {
    if (option.discount === 0) return '';
    return t({
      english: `(${option.discount}% off)`,
      vietnamese: `(Giảm ${option.discount}%)`
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto"
    >
      <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-800 mb-4">
        {t({
          english: "Simple, Transparent Pricing",
          vietnamese: "Báo Giá Đơn Giản, Minh Bạch"
        })}
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">
        {t({
          english: "Choose the plan that fits your needs. Lock in today's pricing for life.",
          vietnamese: "Chọn gói phù hợp với nhu cầu của bạn. Giá hôm nay sẽ được áp dụng trọn đời."
        })}
      </p>

      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-full p-2 shadow-md">
          <ToggleGroup 
            type="single" 
            value={selectedDuration.toString()}
            onValueChange={handleDurationChange}
            className="bg-white rounded-full"
          >
            {durationOptions.map((option) => (
              <ToggleGroupItem 
                key={option.months} 
                value={option.months.toString()}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedDuration === option.months 
                    ? 'bg-emvi-accent text-white shadow-sm' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <span className="font-medium">
                  {t({english: option.label, vietnamese: option.vietnameseLabel})}
                </span>
                {' '}
                <span className="text-sm font-normal">
                  {getDiscountLabel(option)}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
