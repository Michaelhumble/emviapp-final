
import React from 'react';
import { JobPricingOption } from '@/utils/posting/types';
import { Card } from '@/components/ui/card';
import PricingTierCard from '@/components/posting/PricingTierCard';
import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';

interface PricingCardsProps {
  pricingOptions: JobPricingOption[];
  selectedPricing: string;
  onChange: (pricingId: string) => void;
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

const DURATION_OPTIONS = [
  { months: 1, label: '1 Month', discount: 0 },
  { months: 3, label: '3 Months', discount: 10 },
  { months: 6, label: '6 Months', discount: 20 },
  { months: 12, label: '12 Months', discount: 30, isBestValue: true },
];

const PricingCards: React.FC<PricingCardsProps> = ({
  pricingOptions,
  selectedPricing,
  onChange,
  selectedDuration,
  onDurationChange,
}) => {
  // Filter out any hidden options
  const visiblePricingOptions = pricingOptions.filter(option => !option.hidden);
  
  // Sort options by price - free at the end
  const sortedOptions = [...visiblePricingOptions].sort((a, b) => {
    if (a.id === 'free') return 1;
    if (b.id === 'free') return -1;
    return a.price - b.price;
  });

  // Find free plan
  const freePlan = sortedOptions.find(option => option.price === 0);
  // Find paid plans
  const paidPlans = sortedOptions.filter(option => option.price > 0);

  return (
    <div className="space-y-8">
      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Paid Plans First */}
        {paidPlans.map((pricing) => (
          <div 
            key={pricing.id} 
            className={cn(
              "transition-all duration-300",
              pricing.id === 'premium' ? "md:transform md:scale-105 md:z-10" : ""
            )}
          >
            <PricingTierCard
              pricing={pricing}
              isSelected={selectedPricing === pricing.id}
              onClick={() => onChange(pricing.id)}
              isMostPopular={pricing.id === 'premium'}
              subtitle={pricing.vietnameseDescription}
            />
          </div>
        ))}
      </div>

      {/* Duration Selector - Moved below pricing cards */}
      <Card className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200">
        <div className="flex flex-col space-y-3">
          <h3 className="text-base font-medium text-center sm:text-left">Choose Duration & Save:</h3>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {DURATION_OPTIONS.map((option) => (
              <button
                key={option.months}
                onClick={() => onDurationChange(option.months)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all border relative",
                  selectedDuration === option.months
                    ? option.months === 12 
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-600 shadow-md" 
                      : "bg-purple-600 text-white border-purple-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                )}
              >
                <span className="flex items-center">
                  {option.isBestValue && selectedDuration === option.months && (
                    <Crown className="h-4 w-4 mr-1.5 text-amber-200" />
                  )}
                  <span>{option.label}</span>
                  {option.discount > 0 && (
                    <span className={cn(
                      "ml-2 px-2 py-0.5 rounded-full text-xs font-semibold",
                      selectedDuration === option.months
                        ? option.months === 12 
                          ? "bg-amber-400 text-amber-900" 
                          : "bg-purple-500 text-white"
                        : "bg-green-100 text-green-800"
                    )}>
                      {option.isBestValue ? "👑 Best Deal" : ""} Save {option.discount}%
                    </span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Free Plan - Separated and visually diminished */}
      {freePlan && (
        <div className="mt-8 opacity-80 hover:opacity-90 transition-opacity max-w-sm mx-auto">
          <PricingTierCard
            pricing={freePlan}
            isSelected={selectedPricing === freePlan.id}
            onClick={() => onChange(freePlan.id)}
            isFreeVariant={true}
            subtitle={freePlan.vietnameseDescription}
            negativeFeatures={[
              "No Top placement",
              "No Highlight in search",
              "No Social media promotion"
            ]}
          />
        </div>
      )}
    </div>
  );
};

export default PricingCards;
