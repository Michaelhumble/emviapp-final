
import React from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Check, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { JobPricingOption } from '@/utils/posting/types';
import { Badge } from '@/components/ui/badge';

interface PricingCardProps {
  isSelected: boolean;
  onSelect: () => void;
  tier: string;
  pricingInfo: JobPricingOption;
}

const PricingCard: React.FC<PricingCardProps> = ({
  isSelected,
  onSelect,
  tier,
  pricingInfo
}) => {
  const { t, isVietnamese } = useTranslation();
  
  // Get background styling based on tier
  const getBgColor = () => {
    switch (tier) {
      case 'premium':
        return 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-indigo-200';
      case 'gold':
        return 'bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-amber-200';
      case 'diamond':
        return 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-blue-200';
      default:
        return 'bg-white';
    }
  };
  
  const getCheckColor = () => {
    switch (tier) {
      case 'premium':
        return 'text-indigo-500';
      case 'gold':
        return 'text-amber-500';
      case 'diamond':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  // Calculate discount percentage from wasPrice and price
  const getDiscountPercentage = () => {
    if (pricingInfo.wasPrice && pricingInfo.price < pricingInfo.wasPrice) {
      const discount = Math.round(((pricingInfo.wasPrice - pricingInfo.price) / pricingInfo.wasPrice) * 100);
      return `${discount}% OFF`;
    }
    return null;
  };

  // Get FOMO message based on tier
  const getFomoMessage = () => {
    if (pricingInfo.annual) return "Limited Availability";
    if (pricingInfo.recommended) return "Limited Time";
    if (pricingInfo.popular) return "Ends Soon";
    return "Special Offer";
  };

  // Format for Diamond plan
  const isDiamondPlan = tier === 'diamond';

  return (
    <Card 
      className={`relative overflow-hidden cursor-pointer border transition-all ${getBgColor()} ${
        isSelected 
          ? 'ring-2 ring-offset-1 ring-purple-500 shadow-md' 
          : 'hover:border-purple-300 hover:shadow-sm'
      }`}
      onClick={onSelect}
    >
      {/* Display discount badge instead of spots remaining */}
      {getDiscountPercentage() && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-rose-500 to-red-500 text-white text-xs px-3 py-1 transform rotate-45 translate-x-2 translate-y-3 uppercase font-semibold tracking-wide">
            {getDiscountPercentage()}
          </div>
        </div>
      )}
      
      <div className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{pricingInfo.name}</h3>
          {isSelected && <CheckCircle className="h-5 w-5 text-purple-600" />}
        </div>
        
        <div className="mt-2 flex items-end">
          <span className="text-2xl font-bold">${pricingInfo.price}</span>
          {pricingInfo.wasPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">${pricingInfo.wasPrice}</span>
          )}
        </div>
        
        {/* FOMO messaging */}
        <Badge className="mt-2 bg-amber-100 text-amber-800 border-amber-200 flex items-center gap-1.5">
          <Clock className="h-3 w-3" />
          <span>{getFomoMessage()}</span>
        </Badge>
        
        <p className="text-sm text-gray-600 mt-2">
          {isVietnamese ? pricingInfo.vietnameseDescription : pricingInfo.description}
        </p>
        
        <ul className="mt-4 space-y-2">
          {pricingInfo.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={`h-4 w-4 mr-2 mt-1 flex-shrink-0 ${getCheckColor()}`} />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Diamond plan waitlist button */}
        {isDiamondPlan && (
          <div className="mt-4 pt-3 border-t">
            <button
              className="w-full py-2 rounded-md bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium text-sm hover:from-blue-600 hover:to-cyan-500 transition-colors"
            >
              Request Invitation
            </button>
          </div>
        )}

        {/* Trust badges */}
        {(pricingInfo.recommended || pricingInfo.popular) && (
          <div className="mt-4 pt-3 border-t flex items-center justify-center">
            <ShieldCheck className="h-3 w-3 text-gray-400 mr-1" />
            <span className="text-[10px] text-gray-500">100% Secure Payment • Cancel Anytime</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PricingCard;
