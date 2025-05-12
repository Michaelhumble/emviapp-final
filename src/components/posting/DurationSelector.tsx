
import React from 'react';
import { cn } from '@/lib/utils';
import { CalendarIcon, DollarSign, Crown } from 'lucide-react';
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
        const isAnnual = option.months === 12;
        
        // Get Vietnamese subtitle based on duration
        const getVietnameseSubtitle = () => {
          if (option.months === 3) return "Tiết kiệm 10% - 3 tháng";
          if (option.months === 6) return "Tiết kiệm 20% - 6 tháng";
          if (option.months === 12) return "Ưu đãi nhất - 12 tháng";
          return option.vietnameseLabel || "";
        };
        
        return (
          <motion.button
            key={option.months}
            whileHover={{ scale: 1.02 }}
            onClick={() => onChange(option.months)}
            className={cn(
              "relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 text-center",
              isSelected 
                ? isAnnual
                  ? "border-amber-500 bg-gradient-to-r from-amber-50 to-amber-100 shadow-md ring-2 ring-amber-300 ring-opacity-50"
                  : "border-purple-500 bg-purple-50 shadow-md"
                : "border-gray-200 bg-white hover:border-purple-200"
            )}
          >
            {option.discount > 0 && (
              <span className={cn(
                "absolute -top-2 -right-2 text-xs font-bold px-2 py-1 rounded-full border",
                isSelected 
                  ? isAnnual
                    ? "bg-amber-500 text-white border-amber-600"
                    : "bg-green-500 text-white border-green-600"
                  : "bg-green-100 text-green-800 border-green-200"
              )}>
                {option.discount}% off
              </span>
            )}
            
            <div className="mb-1">
              {isAnnual && isSelected ? (
                <Crown className={cn(
                  "h-5 w-5 mx-auto mb-1 text-amber-500"
                )} />
              ) : (
                <CalendarIcon className={cn(
                  "h-5 w-5 mx-auto mb-1",
                  isSelected ? isAnnual ? "text-amber-500" : "text-purple-500" : "text-gray-400"
                )} />
              )}
            </div>
            
            <div className={cn(
              "font-medium",
              isSelected 
                ? isAnnual 
                  ? "text-amber-800" 
                  : "text-purple-800" 
                : "text-gray-700"
            )}>
              {option.months} {option.months === 1 ? 'Month' : 'Months'}
            </div>
            
            {option.discount > 0 && (
              <>
                <div className={cn(
                  "text-xs mt-1",
                  isSelected 
                    ? isAnnual 
                      ? "text-amber-700" 
                      : "text-green-700" 
                    : "text-green-600"
                )}>
                  Save {option.discount}%
                </div>
                <div className="text-xs mt-0.5 text-gray-500 italic">
                  {getVietnameseSubtitle()}
                </div>
              </>
            )}
            
            {isAnnual && (
              <div className="absolute -bottom-2 transform translate-y-full w-full text-center">
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                  Best Value
                </span>
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default DurationSelector;
