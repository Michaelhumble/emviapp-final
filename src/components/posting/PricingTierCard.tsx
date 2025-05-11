
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { JobPricingOption } from '@/utils/posting/types';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PricingTierCardProps {
  pricing: JobPricingOption;
  isSelected: boolean;
  isMostPopular?: boolean;
  onClick: () => void;
}

const PricingTierCard: React.FC<PricingTierCardProps> = ({ 
  pricing, 
  isSelected, 
  isMostPopular = false,
  onClick 
}) => {
  
  // Helper to get the appropriate emoji based on tier
  const getTierEmoji = (id: string) => {
    switch (id) {
      case 'diamond':
        return '💎';
      case 'premium':
        return '✨';
      case 'gold':
        return '🏆';
      default:
        return '📢';
    }
  };

  const isFree = pricing.id === 'free';
  
  return (
    <Card 
      className={cn(
        "relative border-2 overflow-hidden transition-all duration-200 cursor-pointer h-full",
        isSelected 
          ? "ring-2 ring-purple-500 ring-offset-2 border-purple-200 shadow-lg" 
          : "hover:border-purple-200 hover:shadow-md"
      )}
      onClick={onClick}
    >
      {/* Most Popular Badge */}
      {isMostPopular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold py-1 px-3 transform rotate-0 translate-x-0 -translate-y-0 shadow-sm">
          Most Popular
        </div>
      )}
      
      {/* Tier Emoji Badge */}
      <div className="absolute top-4 left-4 text-2xl">
        {getTierEmoji(pricing.id)}
      </div>
      
      <CardContent className={cn(
        "p-6 pt-12",
        isSelected ? "bg-gradient-to-b from-purple-50 to-white" : ""
      )}>
        <div className="text-center mb-4">
          <h3 className={cn(
            "text-lg font-medium mb-1",
            isSelected ? "text-purple-800" : "text-gray-800"
          )}>
            {pricing.name}
          </h3>
          <p className="text-sm text-muted-foreground">{pricing.description}</p>
          
          <div className="mt-4 mb-6">
            {isFree ? (
              <div>
                <span className="text-3xl font-bold">$0</span>
                <span className="text-gray-500 text-sm"> / 30 days</span>
              </div>
            ) : (
              <div>
                <span className="text-3xl font-bold">${pricing.price}</span>
                <span className="text-gray-500 text-sm"> /month</span>
              </div>
            )}
          </div>
        </div>
        
        <ul className="space-y-2">
          {pricing.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PricingTierCard;
