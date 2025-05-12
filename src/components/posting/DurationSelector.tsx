
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
      <h3 className="text-center text-xl font-medium font-playfair mb-5 text-[#1D1E1E]">Select Subscription Duration</h3>
      <div className="flex flex-wrap justify-center gap-4">
        {filteredOptions.map((option) => {
          const isSelected = selectedDuration === option.months;
          const isBestDeal = option.months === 12;
          
          // Calculate savings amount for display
          const basePrice = selectedPricing === 'standard' ? 9.99 : 
                            selectedPricing === 'premium' ? 14.99 : 
                            selectedPricing === 'gold' ? 24.99 : 19.99;
          const regularTotal = basePrice * option.months;
          const discountedTotal = regularTotal * (1 - option.discount / 100);
          const dollarSavings = regularTotal - discountedTotal;
          
          return (
            <motion.div
              key={option.months}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 min-w-[120px] max-w-[200px]"
            >
              <button
                onClick={() => onChange(option.months)}
                className={cn(
                  "relative w-full flex flex-col items-center justify-center px-6 py-4 rounded-full border-2 transition-all duration-300",
                  isSelected 
                    ? `border-[#50C878] bg-gradient-to-b from-white to-[#50C87815] shadow-lg ${isPremiumPlan ? 'ring-2 ring-[#50C878] ring-opacity-50' : ''}`
                    : "border-gray-200 bg-white hover:border-[#50C878]/30 hover:shadow-md"
                )}
              >
                {option.discount > 0 && (
                  <span className={cn(
                    "absolute -top-2 -right-2 px-3 py-1 rounded-full text-xs font-bold shadow-sm",
                    isBestDeal 
                      ? "bg-gradient-to-r from-[#F7E7CE] to-[#F0D9B5] text-[#8B5A2B] border border-[#D4AF37]/20" 
                      : "bg-gradient-to-r from-[#E8F5E9] to-[#C8E6C9] text-[#1B5E20] border border-green-200",
                    isSelected && !isBestDeal && "bg-green-500 text-white border-green-600"
                  )}>
                  {isBestDeal ? (
                    <>
                      <Crown className="h-3 w-3 inline-block mr-1 mb-0.5" /> Best Deal
                    </>
                  ) : (
                    <>
                      Save {option.discount}%
                    </>
                  )}
                </span>
                )}
                
                <div className="flex flex-col items-center space-y-1">
                  <span className={cn(
                    "font-medium text-base",
                    isSelected ? "text-[#50C878]" : "text-gray-700"
                  )}>
                    {option.months} {option.months === 1 ? 'Month' : 'Months'}
                  </span>
                  
                  {/* Vietnamese translation support */}
                  <span className="text-xs text-gray-500">
                    {option.discount > 0 ? (
                      option.months === 3 ? 'Tiết kiệm 10% – 3 tháng' :
                      option.months === 6 ? 'Tiết kiệm 20% – 6 tháng' :
                      option.months === 12 ? 'Ưu đãi nhất – 12 tháng' : 
                      ''
                    ) : ''}
                  </span>
                  
                  {option.discount > 0 && (
                    <span className="text-[#50C878] text-sm font-medium">
                      Save ${dollarSavings.toFixed(2)}
                    </span>
                  )}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
      
      {/* Savings microcopy */}
      <div className="text-center text-sm text-gray-600 mt-2">
        <p>You'll save nearly 4 months by going annual. That's $35.96 back in your pocket.</p>
      </div>
    </div>
  );
};

export default DurationSelector;
