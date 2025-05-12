
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
    <div className="space-y-3 mt-8 mb-4">
      <h3 className="text-center text-lg font-medium font-playfair mb-4">Select Subscription Duration</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {filteredOptions.map((option) => {
          const isSelected = selectedDuration === option.months;
          const isBestDeal = option.months === 12;
          
          return (
            <motion.button
              key={option.months}
              whileHover={{ scale: 1.02 }}
              onClick={() => onChange(option.months)}
              className={cn(
                "relative flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-200 text-center",
                isSelected 
                  ? `border-[#50C878] bg-[#50C87815] shadow-md ${isPremiumPlan ? 'ring-2 ring-[#50C878] ring-opacity-50' : ''}`
                  : "border-gray-200 bg-white hover:border-[#50C878]/40"
              )}
            >
              {option.discount > 0 && (
                <span className={cn(
                  "absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full border border-green-200",
                  isSelected && "bg-green-500 text-white"
                )}>
                  {isBestDeal ? (
                    <>
                      <Crown className="h-3 w-3 inline-block mr-1 mb-0.5" /> Best Deal
                    </>
                  ) : null}
                  {' '}Save {option.discount}%
                </span>
              )}
              
              <div className="mb-1">
                <CalendarIcon className={cn(
                  "h-5 w-5 mx-auto mb-1",
                  isSelected ? "text-[#50C878]" : "text-gray-400"
                )} />
              </div>
              
              <div className={cn(
                "font-medium font-playfair",
                isSelected ? "text-[#50C878]" : "text-gray-700"
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
    </div>
  );
};

export default DurationSelector;
