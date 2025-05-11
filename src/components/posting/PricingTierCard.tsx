
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { JobPricingOption } from '@/utils/posting/types';

interface PricingTierCardProps {
  pricing: JobPricingOption;
  isSelected: boolean;
  onClick: () => void;
}

const PricingTierCard: React.FC<PricingTierCardProps> = ({
  pricing,
  isSelected,
  onClick
}) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-200 overflow-hidden relative",
        isSelected ? 
          "border-primary/70 shadow-md ring-2 ring-primary/20" : 
          "border-gray-200 hover:border-primary/50"
      )}
      onClick={onClick}
    >
      {pricing.popular && (
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium">
          Most Popular
        </div>
      )}
      
      {pricing.tag && !pricing.popular && (
        <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 text-xs font-medium">
          {pricing.tag}
        </div>
      )}
      
      <CardContent className={cn(
        "p-6",
        isSelected ? "bg-gradient-to-br from-white to-primary/5" : ""
      )}>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">{pricing.name}</h3>
            {pricing.vietnameseDescription && (
              <p className="text-sm text-gray-500">{pricing.vietnameseDescription}</p>
            )}
          </div>
          <div className="flex flex-col items-end">
            {pricing.wasPrice && (
              <span className="text-sm text-gray-400 line-through">${pricing.wasPrice}</span>
            )}
            <span className="text-2xl font-bold">
              {pricing.price === 0 ? 'Free' : `$${pricing.price}`}
            </span>
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          {pricing.features.map((feature, i) => (
            <div key={i} className="flex items-start">
              <Check className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingTierCard;
