
import { useState } from 'react';
import { durationOptions } from '@/utils/posting/jobPricing';
import { useTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';

interface DurationSelectorProps {
  selectedDuration: number;
  onChange: (months: number) => void;
  selectedPricing: string;
}

const DurationSelector = ({ 
  selectedDuration, 
  onChange, 
  selectedPricing 
}: DurationSelectorProps) => {
  const { t } = useTranslation();
  
  // Diamond tier is fixed at 12 months
  const isDiamond = selectedPricing === 'diamond';
  const filteredOptions = isDiamond 
    ? durationOptions.filter(option => option.months === 12)
    : durationOptions;
  
  // Free tier is fixed at trial length
  const isFree = selectedPricing === 'free';

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {filteredOptions.map((option) => (
        <button
          key={option.months}
          onClick={() => !isFree && !isDiamond && onChange(option.months)}
          disabled={isDiamond || isFree}
          className={cn(
            "px-5 py-3 rounded-lg border transition-all",
            selectedDuration === option.months
              ? "bg-purple-50 border-purple-300 text-purple-800 font-medium"
              : "bg-white border-gray-200 text-gray-700 hover:border-gray-300",
            (isDiamond || isFree) && "opacity-70 cursor-not-allowed"
          )}
        >
          <div className="text-center">
            <div className="font-medium">
              {t(option.label, option.vietnameseLabel)}
            </div>
            {option.discount > 0 && (
              <div className="text-xs text-green-600 font-medium mt-1">
                {t(`Save ${option.discount}%`, `Tiết kiệm ${option.discount}%`)}
              </div>
            )}
          </div>
        </button>
      ))}
      
      {isFree && (
        <div className="text-sm text-amber-700 mt-2 w-full text-center">
          {t("Free listings are fixed at 14 days", "Tin đăng miễn phí cố định 14 ngày")}
        </div>
      )}
      
      {isDiamond && (
        <div className="text-sm text-amber-700 mt-2 w-full text-center">
          {t("Diamond package is annual only", "Gói Kim cương chỉ có hạn hàng năm")}
        </div>
      )}
    </div>
  );
};

export default DurationSelector;
