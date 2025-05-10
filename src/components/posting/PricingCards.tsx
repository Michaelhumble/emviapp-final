
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ListingPlan } from '@/components/posting/ListingPlanSelector';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import DurationSelector from './DurationSelector';
import { useTranslation } from '@/hooks/useTranslation';

interface PricingCardsProps {
  pricingOptions: ListingPlan[];
  selectedPricing: string;
  onChange: (pricingId: string) => void;
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

const PricingCards: React.FC<PricingCardsProps> = ({
  pricingOptions,
  selectedPricing,
  onChange,
  selectedDuration,
  onDurationChange
}) => {
  const { t } = useTranslation();
  
  // If Diamond plan is selected, force 12 month duration
  useEffect(() => {
    if (selectedPricing === 'diamond' && selectedDuration !== 12) {
      onDurationChange(12);
    }
  }, [selectedPricing, selectedDuration, onDurationChange]);

  // If no plan is selected, default to 'featured'
  useEffect(() => {
    if (!selectedPricing && pricingOptions.length > 0) {
      // Default to featured (index 1)
      const defaultPlan = pricingOptions.length > 1 ? pricingOptions[1].id : pricingOptions[0].id;
      onChange(defaultPlan);
    }
  }, [selectedPricing, pricingOptions, onChange]);
  
  // Add null check for pricingOptions
  if (!pricingOptions || pricingOptions.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pricingOptions.map((option) => (
          <motion.div
            key={option.id}
            className={cn(
              "border rounded-lg overflow-hidden cursor-pointer transition-all",
              selectedPricing === option.id
                ? "border-purple-600 shadow-md ring-2 ring-purple-200"
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            )}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(option.id)}
          >
            <div className={cn(
              "px-6 py-4",
              option.popular ? "bg-gradient-to-r from-amber-50 to-amber-100" : "bg-gray-50"
            )}>
              {option.popular && (
                <span className="bg-amber-500 text-white px-2 py-0.5 text-xs rounded-full uppercase font-medium mb-2 inline-block">
                  {t("Most Popular", "Phổ biến nhất")}
                </span>
              )}
              {option.tag && (
                <span className="text-xs text-gray-600 bg-white px-2 py-0.5 rounded-full mb-2 inline-block border shadow-sm">
                  {t(option.tag, option.tag)}
                </span>
              )}
              <h3 className="font-bold text-lg">{option.name}</h3>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold">${option.price}</span>
                {option.wasPrice && option.wasPrice > option.price && (
                  <span className="text-sm text-gray-500 line-through">${option.wasPrice}</span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {option.vietnameseDescription || option.description}
              </p>
            </div>
            <div className="p-4 bg-white">
              <ul className="space-y-2">
                {option.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{t(feature, feature)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8">
        <p className="text-center text-sm text-gray-600 mb-4">{t("Select subscription length:", "Chọn thời hạn đăng tin:")}</p>
        <DurationSelector 
          selectedDuration={selectedDuration} 
          onChange={onDurationChange}
          selectedPricing={selectedPricing}
        />
      </div>
    </div>
  );
};

export default PricingCards;
