
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { JobPricingOption } from '@/utils/posting/types';

export interface PricingSectionProps {
  pricingOptions: JobPricingOption[];
  selectedTier: string;
  onSelectTier: (tier: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  pricingOptions,
  selectedTier,
  onSelectTier
}) => {
  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden">
      <CardContent className="p-6">
        <h2 className="text-xl font-playfair font-bold mb-4 text-center">Select Your Posting Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingOptions.map((option) => (
            <div 
              key={option.id} 
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedTier === option.tier 
                  ? 'border-primary bg-primary/5 shadow-md' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => onSelectTier(option.tier)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-lg">{option.name}</h3>
                {option.popular && (
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">Popular</span>
                )}
              </div>
              <div className="mb-2">
                <span className="text-2xl font-bold">${option.price}</span>
                {option.wasPrice && (
                  <span className="text-sm text-gray-500 line-through ml-2">${option.wasPrice}</span>
                )}
              </div>
              <p className="text-gray-600 text-sm mb-4">{option.description}</p>
              <ul className="space-y-2">
                {option.features?.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingSection;
