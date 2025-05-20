
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { JobPricingOption, JobPricingTier } from '@/utils/posting/types';
import { usePricing } from '@/context/pricing/PricingContext';
import { cn } from '@/lib/utils';

interface PricingTierSelectorProps {
  pricingOptions: JobPricingOption[];
  className?: string;
}

export const PricingTierSelector: React.FC<PricingTierSelectorProps> = ({
  pricingOptions,
  className
}) => {
  const { pricingOptions: selectedOptions, setPricingOptions } = usePricing();
  
  const handleTierSelect = (tier: JobPricingTier) => {
    setPricingOptions({
      ...selectedOptions,
      selectedPricingTier: tier
    });
  };
  
  return (
    <Card className={cn("border-0 shadow-none bg-transparent", className)}>
      <CardContent className="p-0">
        <h3 className="text-lg font-medium mb-4">Select Your Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingOptions.filter(option => !option.hidden).map((option) => (
            <div 
              key={option.id}
              className={cn(
                "border rounded-xl p-5 cursor-pointer transition-all hover:shadow-md",
                selectedOptions.selectedPricingTier === option.tier
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 bg-white"
              )}
              onClick={() => handleTierSelect(option.tier)}
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold text-lg">{option.name}</h4>
                {option.popular && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">
                    Popular
                  </span>
                )}
              </div>
              
              <div className="mb-3">
                <span className="text-2xl font-bold">${option.price}</span>
                {option.wasPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">${option.wasPrice}</span>
                )}
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{option.description}</p>
              
              <ul className="space-y-2 mb-4">
                {option.features?.slice(0, 3).map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">
                      <Check size={16} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant={selectedOptions.selectedPricingTier === option.tier ? "default" : "outline"}
                className="w-full mt-2"
                onClick={() => handleTierSelect(option.tier)}
              >
                {selectedOptions.selectedPricingTier === option.tier ? "Selected" : "Select"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingTierSelector;
