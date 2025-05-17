
import React from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';
import { Check, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { JobPricingOption } from '@/utils/posting/types';

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

  return (
    <Card 
      className={`relative overflow-hidden cursor-pointer border transition-all ${getBgColor()} ${
        isSelected 
          ? 'ring-2 ring-offset-1 ring-purple-500 shadow-md' 
          : 'hover:border-purple-300 hover:shadow-sm'
      }`}
      onClick={onSelect}
    >
      {pricingInfo.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs px-3 py-1 transform rotate-45 translate-x-2 translate-y-3 uppercase font-semibold tracking-wide">
            {isVietnamese ? 'Phổ biến' : 'Popular'}
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
        </div>
        
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
      </div>
    </Card>
  );
};

export default PricingCard;
