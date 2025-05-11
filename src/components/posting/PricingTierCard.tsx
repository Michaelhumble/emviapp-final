
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { JobPricingOption } from '@/utils/posting/types';
import { cn } from '@/lib/utils';
import { Check, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';

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

  // Get promotion text based on tier
  const getPromotionText = (id: string) => {
    switch (id) {
      case 'premium':
        return 'Get Seen 5x More';
      case 'standard':
        return 'Most Booked by Salons';
      default:
        return null;
    }
  };

  const isFree = pricing.id === 'free';
  const promotionText = getPromotionText(pricing.id);
  
  return (
    <Card 
      className={cn(
        "relative border-2 overflow-hidden transition-all duration-300 cursor-pointer h-full",
        isSelected 
          ? "ring-2 ring-purple-500 ring-offset-2 border-purple-200 shadow-lg transform scale-[1.02]" 
          : "hover:border-purple-200 hover:shadow-md hover:transform hover:scale-[1.01]",
        pricing.id === 'free' && "bg-gray-50",
        pricing.id === 'premium' && "bg-gradient-to-b from-amber-50 to-white border-amber-200"
      )}
      onClick={onClick}
    >
      {/* Animated Glow Effect when selected */}
      {isSelected && (
        <div className="absolute inset-0 bg-purple-100 opacity-30 animate-pulse rounded-lg" />
      )}
      
      {/* Most Popular Badge */}
      {isMostPopular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold py-1 px-3 transform rotate-0 translate-x-0 -translate-y-0 shadow-sm flex items-center gap-1">
          <Star className="h-3 w-3" />
          <span>Most Popular</span>
        </div>
      )}
      
      {/* Tier Emoji Badge */}
      <div className="absolute top-4 left-4 text-2xl">
        {getTierEmoji(pricing.id)}
      </div>

      {/* Promotional text */}
      {promotionText && (
        <div className="absolute top-4 right-4">
          <span className={cn(
            "text-xs font-medium px-2 py-1 rounded-full",
            pricing.id === 'premium' 
              ? "bg-amber-100 text-amber-700" 
              : "bg-blue-100 text-blue-700"
          )}>
            {promotionText}
          </span>
        </div>
      )}
      
      <CardContent className={cn(
        "p-6 pt-12",
        isSelected ? 
          pricing.id === 'premium' 
            ? "bg-gradient-to-b from-amber-50 to-white" 
            : "bg-gradient-to-b from-purple-50 to-white" 
          : ""
      )}>
        <div className="text-center mb-4">
          <h3 className={cn(
            "text-lg font-medium mb-1",
            isSelected ? "text-purple-800" : "text-gray-800",
            pricing.id === 'premium' && "text-amber-700"
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
        
        <ul className="space-y-3">
          {pricing.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <Check className={cn(
                "h-4 w-4 mr-2 mt-1 flex-shrink-0",
                pricing.id === 'premium' ? "text-amber-500" : "text-green-500"
              )} />
              <span className="text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PricingTierCard;
