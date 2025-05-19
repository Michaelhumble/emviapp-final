
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { JobPricingTier } from '@/utils/posting/types';

interface PricingCardProps {
  id: JobPricingTier;
  title: string;
  price: number;
  description: string;
  features: string[];
  isSelected?: boolean;
  isPopular?: boolean;
  isFirstPost?: boolean;
  onClick: (id: JobPricingTier) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  id,
  title,
  price,
  description,
  features,
  isSelected,
  isPopular,
  isFirstPost,
  onClick
}) => {
  const { t } = useTranslation();
  
  // If it's first post and not diamond tier, show as free
  const isFree = isFirstPost && id !== 'diamond';
  const displayPrice = isFree ? '0' : price.toFixed(2);
  
  return (
    <Card 
      className={`relative overflow-hidden transition-all duration-200 ${
        isSelected ? 'ring-2 ring-purple-500 shadow-lg' : ''
      } ${isPopular ? 'scale-105 md:scale-105 shadow-xl' : 'shadow'}`}
      onClick={() => onClick(id)}
    >
      {isPopular && (
        <div className="absolute -right-10 top-4 transform rotate-45 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-1 px-10 text-xs font-semibold">
          {t({
            english: 'MOST POPULAR',
            vietnamese: 'PHỔ BIẾN NHẤT'
          })}
        </div>
      )}
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          {isSelected && (
            <div className="bg-purple-100 rounded-full p-1.5">
              <Check className="h-4 w-4 text-purple-600" />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold">${displayPrice}</span>
          <span className="text-gray-500 ml-1">/mo</span>
          {isFree && (
            <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
              First Post Free!
            </Badge>
          )}
        </div>
        
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter className="pt-4 bg-gray-50 border-t">
        <div
          className={`w-full py-2 rounded text-center text-sm ${
            isSelected
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {isSelected
            ? t({
                english: 'Selected',
                vietnamese: 'Đã Chọn'
              })
            : t({
                english: 'Select Plan',
                vietnamese: 'Chọn Gói'
              })}
        </div>
      </CardFooter>
    </Card>
  );
};

interface PricingCardsProps {
  selectedTier: JobPricingTier;
  onSelectTier: (tier: JobPricingTier) => void;
  isFirstPost?: boolean;
}

const PricingCards: React.FC<PricingCardsProps> = ({
  selectedTier,
  onSelectTier,
  isFirstPost = false
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
      {jobPricingOptions.slice(1, 4).map((option) => (
        <PricingCard
          key={option.id}
          id={option.id as JobPricingTier}
          title={option.name}
          price={option.price}
          description={option.description}
          features={option.features}
          isSelected={selectedTier === option.id}
          isPopular={option.id === 'premium'}
          isFirstPost={isFirstPost}
          onClick={onSelectTier}
        />
      ))}
    </div>
  );
};

export default PricingCards;
