
import React from 'react';
import { cn } from '@/lib/utils';
import { CalendarIcon, DollarSign } from 'lucide-react';
import { durationOptions } from '@/utils/posting/jobPricing';
import { motion } from 'framer-motion';

interface DurationSelectorProps {
  selectedDuration: number;
  onChange: (duration: number) => void;
  selectedPricing: string;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({ 
  selectedDuration, 
  onChange,
  selectedPricing
}) => {
  const isPremiumPlan = selectedPricing === 'premium';
  
  // For Diamond tier, restrict to 12 months only
  const filteredOptions = selectedPricing === 'diamond' 
    ? durationOptions.filter(option => option.months === 12)
    : durationOptions;
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {filteredOptions.map((option) => {
        const isSelected = selectedDuration === option.months;
        
        return (
          <motion.button
            key={option.months}
            whileHover={{ scale: 1.02 }}
            onClick={() => onChange(option.months)}
            className={cn(
              "relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 text-center",
              isSelected 
                ? `border-purple-500 bg-purple-50 shadow-md ${isPremiumPlan ? 'ring-2 ring-purple-300 ring-opacity-50' : ''}`
                : "border-gray-200 bg-white hover:border-purple-200"
            )}
          >
            {option.discount > 0 && (
              <span className={cn(
                "absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-full border border-green-200",
                isSelected && "bg-green-500 text-white"
              )}>
                {option.discount}% off
              </span>
            )}
            
            <div className="mb-1">
              <CalendarIcon className={cn(
                "h-5 w-5 mx-auto mb-1",
                isSelected ? "text-purple-500" : "text-gray-400"
              )} />
            </div>
            
            <div className={cn(
              "font-medium",
              isSelected ? "text-purple-800" : "text-gray-700"
            )}>
              {option.months} {option.months === 1 ? 'Month' : 'Months'}
            </div>
            
            {option.discount > 0 && (
              <div className="text-xs mt-1 text-green-700">Save {option.discount}%</div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default DurationSelector;
