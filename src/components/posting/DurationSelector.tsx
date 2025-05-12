
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
    <div className="space-y-4 mt-10 mb-6">
      <h3 className="text-center text-lg font-medium font-playfair mb-4">Select Subscription Duration</h3>
      <div className="flex flex-wrap justify-center gap-3">
        {filteredOptions.map((option) => {
          const isSelected = selectedDuration === option.months;
          const isBestDeal = option.months === 12;
          
          // Calculate approximate savings based on a sample price of $19.99/month
          const sampleMonthlyPrice = 19.99;
          const regularTotal = sampleMonthlyPrice * option.months;
          const discountedTotal = regularTotal * (1 - option.discount / 100);
          const dollarSavings = regularTotal - discountedTotal;
          
          return (
            <motion.button
              key={option.months}
              whileHover={{ scale: 1.03, boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onChange(option.months)}
              className={cn(
                "relative flex flex-col items-center justify-center px-8 py-4 rounded-full border-2 transition-all duration-300",
                isSelected 
                  ? `border-[#50C878] bg-gradient-to-b from-white to-[#50C87810] shadow-md ${isPremiumPlan ? 'ring-2 ring-[#50C878] ring-opacity-50' : ''}`
                  : "border-gray-200 bg-white hover:border-[#50C878]/30 hover:bg-gradient-to-b hover:from-white hover:to-[#50C87805]"
              )}
            >
              {option.discount > 0 && (
                <span className={cn(
                  "absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold",
                  isBestDeal 
                    ? "bg-gradient-to-r from-[#F7E7CE] to-[#F0D9B5] text-[#8B5A2B] border border-[#D4AF37]/20 shadow-sm" 
                    : "bg-green-100 text-green-800 border border-green-200",
                  isSelected && !isBestDeal && "bg-green-500 text-white border-green-600"
                )}>
                  {isBestDeal ? (
                    <>
                      <Crown className="h-3 w-3 inline-block mr-1 mb-0.5" /> Best Deal
                    </>
                  ) : (
                    <>
                      🟢 Save {option.discount}%
                    </>
                  )}
                </span>
              )}
              
              <div className="flex items-center space-x-2">
                <span className={cn(
                  "font-medium",
                  isSelected ? "text-[#50C878]" : "text-gray-700"
                )}>
                  {option.months} {option.months === 1 ? 'Month' : 'Months'}
                </span>
                
                {option.discount > 0 && (
                  <span className="text-green-600 font-medium">
                    Save ${dollarSavings.toFixed(2)}
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default DurationSelector;
