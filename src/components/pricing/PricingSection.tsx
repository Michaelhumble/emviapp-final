
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import { pricingPlans, durationOptions } from './pricingData';
import HeroSection from './HeroSection';
import { PricingWithDuration } from '@/types/pricing';

const PricingSection = () => {
  const { t } = useTranslation();
  const [selectedDuration, setSelectedDuration] = useState<number>(1); // Default to monthly

  const handleDurationChange = useCallback((duration: number) => {
    setSelectedDuration(duration);
  }, []);

  const calculatePrice = useCallback(({ basePricePerMonth, durationMonths, discountPercentage }: PricingWithDuration): string => {
    const discountMultiplier = 1 - (discountPercentage / 100);
    const totalPrice = basePricePerMonth * durationMonths * discountMultiplier;
    return totalPrice.toFixed(2);
  }, []);

  const getAdjustedPrice = useCallback((basePrice: number): string => {
    const selectedDurationOption = durationOptions.find(option => option.months === selectedDuration);
    if (!selectedDurationOption) return basePrice.toFixed(2);

    return calculatePrice({
      basePricePerMonth: basePrice,
      durationMonths: selectedDuration,
      discountPercentage: selectedDurationOption.discount
    });
  }, [calculatePrice, selectedDuration]);

  const getPriceLabel = useCallback((price: string): React.ReactNode => {
    if (selectedDuration === 1) {
      return (
        <span>
          ${price}
          <span className="text-sm text-gray-600 font-normal">/mo</span>
        </span>
      );
    }
    
    return (
      <span>
        ${price}
        <span className="text-sm text-gray-600 font-normal">
          {selectedDuration === 3 ? '/quarter' : '/year'}
        </span>
      </span>
    );
  }, [selectedDuration]);

  return (
    <div>
      <HeroSection 
        selectedDuration={selectedDuration} 
        onDurationChange={handleDurationChange}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-12 px-2"
      >
        {pricingPlans.map((plan, index) => {
          const adjustedPrice = getAdjustedPrice(plan.price);
          const adjustedOriginalPrice = getAdjustedPrice(plan.originalPrice);
          const isHighlighted = plan.highlight;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
              className={`flex flex-col relative rounded-2xl border overflow-hidden
                ${isHighlighted 
                  ? 'bg-white/90 shadow-[0_8px_30px_rgb(155,135,245,0.25)] border-emvi-accent/30 scale-105 z-10 backdrop-blur-sm' 
                  : 'bg-white/80 shadow-lg border-gray-100/50 backdrop-blur-sm'}`}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="inline-block bg-[#FF7743] text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className={`p-8 ${isHighlighted ? 'bg-gradient-to-br from-emvi-accent/10 to-purple-100/20' : ''}`}>
                <h3 className={`text-2xl font-playfair font-bold 
                  ${isHighlighted ? 'text-emvi-accent' : 'text-gray-800'}`}>
                  {t({english: plan.name, vietnamese: plan.vietnameseName})}
                </h3>
                <p className="text-gray-600 mt-2 min-h-[50px]">
                  {t({english: plan.description, vietnamese: plan.vietnameseDescription})}
                </p>

                <div className="mt-6 space-y-2">
                  <div className="flex items-baseline">
                    <span className="text-gray-500 line-through text-lg mr-2">
                      {getPriceLabel(adjustedOriginalPrice)}
                    </span>
                  </div>
                  <div className="flex items-baseline">
                    <span className={`text-4xl font-bold ${isHighlighted ? 'text-emvi-accent' : 'text-gray-800'}`}>
                      {getPriceLabel(adjustedPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-8 space-y-4 bg-gray-50/70">
                <div className="space-y-3">
                  {(plan.vietnameseFeatures || plan.features).map((feature, i) => (
                    <div key={i} className="flex">
                      <div className="flex-shrink-0">
                        <Check className={`h-5 w-5 ${isHighlighted ? 'text-emvi-accent' : 'text-green-500'}`} />
                      </div>
                      <span className="ml-3 text-gray-700">
                        {t({english: plan.features[i], vietnamese: plan.vietnameseFeatures?.[i]})}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-white/90">
                <Button 
                  className={`w-full py-7 rounded-xl text-base font-bold transition-all text-white
                    ${isHighlighted 
                      ? 'bg-emvi-accent hover:bg-emvi-accent/90 shadow-xl shadow-emvi-accent/30' 
                      : 'bg-gray-800 hover:bg-gray-700 shadow-lg'}`}
                >
                  {t({english: plan.buttonText, vietnamese: plan.vietnameseButtonText})}
                </Button>
                <p className="text-xs text-center mt-3 text-gray-500">
                  {t({
                    english: "Lock in this price for life—limited time only!",
                    vietnamese: "Khóa giá này suốt đời - chỉ trong thời gian giới hạn!"
                  })}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default PricingSection;
