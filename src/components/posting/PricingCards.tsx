
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PricingTierCard from './PricingTierCard';
import { JobPricingOption } from '@/utils/posting/types';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';
import DurationSelector from './DurationSelector';

interface PricingCardsProps {
  pricingOptions: JobPricingOption[];
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
  // If Diamond plan is selected, force 12 month duration
  useEffect(() => {
    if (selectedPricing === 'diamond' && selectedDuration !== 12) {
      onDurationChange(12);
    }
  }, [selectedPricing, selectedDuration, onDurationChange]);
  
  // Add null check for pricingOptions
  if (!pricingOptions || pricingOptions.length === 0) {
    return null;
  }
  
  // Filter out hidden tiers
  const visiblePricingOptions = pricingOptions.filter(option => !option.hidden);
  
  // Determine the "most popular" pricing tier (typically the Premium option)
  const getMostPopularId = () => {
    // Premium is now our most popular option
    return 'premium';
  };
  
  const mostPopularId = getMostPopularId();
  
  // Check if free plan is selected
  const isFreePlanSelected = selectedPricing === 'free';
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto pb-2">
        {visiblePricingOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <PricingTierCard 
              pricing={option}
              isSelected={selectedPricing === option.id}
              onClick={() => onChange(option.id)}
              isMostPopular={option.id === mostPopularId}
            />
          </motion.div>
        ))}
      </div>
      
      {!isFreePlanSelected && (
        <div className="mt-8">
          <p className="text-center text-sm text-gray-600 mb-4">Select subscription length to get the best value:</p>
          <DurationSelector 
            selectedDuration={selectedDuration} 
            onChange={onDurationChange}
            selectedPricing={selectedPricing}
          />
        </div>
      )}
    </div>
  );
};

export default PricingCards;
