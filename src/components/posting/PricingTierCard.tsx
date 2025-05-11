
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { JobPricingOption } from '@/utils/posting/types';
import { cn } from '@/lib/utils';
import { Check, X, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingTierCardProps {
  pricing: JobPricingOption;
  isSelected: boolean;
  isMostPopular?: boolean;
  isFreeVariant?: boolean;
  subtitle?: string;
  onClick: () => void;
}

const PricingTierCard: React.FC<PricingTierCardProps> = ({ 
  pricing, 
  isSelected, 
  isMostPopular = false,
  isFreeVariant = false,
  subtitle,
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
      case 'standard':
        return '🏆';
      default:
        return '📢';
    }
  };

  // Get promotion text based on tier
  const getPromotionText = (id: string) => {
    switch (id) {
      case 'premium':
        return 'Top Pick by Salons';
      case 'standard':
        return 'Smart Choice';
      case 'gold':
        return 'Fastest Hiring Plan';
      default:
        return null;
    }
  };

  const isFree = pricing.id === 'free';
  const promotionText = getPromotionText(pricing.id);
  
  // Define background style based on tier
  const getBgStyle = (id: string) => {
    switch (id) {
      case 'premium':
        return "bg-gradient-to-b from-amber-50 to-white border-amber-200"; // soft gold
      case 'standard':
        return "bg-gradient-to-b from-purple-50 to-white border-purple-100"; // lavender
      case 'gold':
        return "bg-gradient-to-b from-amber-100 to-white border-amber-300"; // premium gold
      case 'free':
        return "bg-gray-50 border-gray-200"; // muted gray
      default:
        return "bg-white border-gray-200";
    }
  };
  
  // Define premium-specific features that the free plan lacks
  const freeNegativeFeatures = isFree ? [
    'No visibility boost', 
    'Not recommended for hiring',
    'No listing boost'
  ] : [];
  
  return (
    <Card 
      className={cn(
        "relative border-2 overflow-hidden transition-all duration-300 cursor-pointer h-full",
        isSelected 
          ? "ring-2 ring-purple-500 ring-offset-2 border-purple-200 shadow-lg transform scale-[1.02]" 
          : "hover:border-purple-200 hover:shadow-md hover:transform hover:scale-[1.01]",
        getBgStyle(pricing.id)
      )}
      onClick={onClick}
    >
      {/* Animated Glow Effect for selected cards */}
      {isSelected && pricing.id === 'premium' && (
        <div className="absolute inset-0 bg-amber-100 opacity-30 animate-pulse rounded-lg" />
      )}
      
      {isSelected && pricing.id === 'gold' && (
        <div className="absolute inset-0 bg-amber-200 opacity-30 animate-pulse rounded-lg" />
      )}
      
      {/* Standard glow for standard selected */}
      {isSelected && pricing.id === 'standard' && (
        <div className="absolute inset-0 bg-purple-100 opacity-30 animate-pulse rounded-lg" />
      )}
      
      {/* Most Popular Badge with Star icon */}
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
              : pricing.id === 'gold'
                ? "bg-amber-200 text-amber-800"
                : "bg-purple-100 text-purple-700"
          )}>
            {promotionText}
          </span>
        </div>
      )}
      
      {/* Premium-specific tooltip */}
      {pricing.id === 'premium' && isSelected && (
        <div className="absolute -top-2 -left-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full border border-amber-200 shadow-sm">
          Most customers hire within 3 days
        </div>
      )}

      {/* Gold-specific tooltip */}
      {pricing.id === 'gold' && isSelected && (
        <div className="absolute -top-2 -left-2 bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full border border-amber-200 shadow-sm">
          Get front-page exposure
        </div>
      )}
      
      <CardContent className={cn(
        "p-6 pt-12",
        isSelected ? getBgStyle(pricing.id) : ""
      )}>
        <div className="text-center mb-4">
          <h3 className={cn(
            "text-lg font-medium mb-1",
            isSelected ? "text-purple-800" : "text-gray-800",
            pricing.id === 'premium' && "text-amber-700",
            pricing.id === 'gold' && "text-amber-800",
            isFree && "text-gray-600"
          )}>
            {pricing.name}
          </h3>
          <p className="text-sm text-muted-foreground">{pricing.description}</p>
          
          {/* Vietnamese subtitle for free plan */}
          {isFreeVariant && subtitle && (
            <p className="text-xs italic mt-1 text-gray-500">{subtitle}</p>
          )}
          
          <div className="mt-4 mb-6">
            {isFree ? (
              <div>
                <span className="text-3xl font-bold text-gray-700">$0</span>
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
          {/* Positive features */}
          {pricing.features.map((feature, index) => (
            <li key={index} className="flex items-start text-sm">
              <Check className={cn(
                "h-4 w-4 mr-2 mt-1 flex-shrink-0",
                pricing.id === 'premium' ? "text-amber-500" : 
                pricing.id === 'gold' ? "text-amber-600" :
                pricing.id === 'standard' ? "text-purple-500" :
                "text-gray-500"
              )} />
              <span className={cn(
                "text-gray-600",
                isFree && "text-gray-500"
              )}>{feature}</span>
            </li>
          ))}
          
          {/* Negative features for free plan */}
          {isFreeVariant && freeNegativeFeatures.map((feature, index) => (
            <li key={`missing-${index}`} className="flex items-start text-sm">
              <X className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-gray-400" />
              <span className="text-gray-400">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PricingTierCard;
