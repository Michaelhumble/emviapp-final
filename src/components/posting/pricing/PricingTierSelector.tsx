
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JobPricingOption, JobPricingTier, PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Diamond } from 'lucide-react';

const pricingTiers: JobPricingOption[] = [
  {
    id: 'free',
    name: 'Free Listing',
    price: 0,
    duration: 30,
    description: 'Basic visibility in search results',
    vietnameseDescription: 'Hiển thị cơ bản trong kết quả tìm kiếm',
    tier: 'free',
    features: [
      '30-day listing duration',
      'Basic search visibility',
      'Standard listing placement',
      'Contact information display'
    ],
    hidden: false,
    isFirstPost: true,
    tag: 'Always Free'
  },
  {
    id: 'gold',
    name: 'Gold Featured Listing',
    price: 19.99,
    wasPrice: 24.99,
    duration: 30,
    description: 'Enhanced visibility with featured placement',
    vietnameseDescription: 'Tăng khả năng hiển thị với vị trí nổi bật',
    tier: 'gold',
    features: [
      '30-day featured placement',
      'Priority in search results',
      'Gold badge highlight',
      'Enhanced listing display',
      'Featured section placement'
    ],
    popular: true,
    hidden: false,
    tag: 'Early Adopter',
    upsellText: 'Most Popular',
    limitedSpots: 'Limited to 5 spots per industry'
  },
  {
    id: 'premium',
    name: 'Premium Listing',
    price: 39.99,
    wasPrice: 49.99,
    duration: 30,
    description: 'Maximum exposure with premium features',
    vietnameseDescription: 'Tiếp xúc tối đa với các tính năng cao cấp',
    tier: 'premium',
    features: [
      '30-day premium placement',
      'Top placement above Gold',
      'Premium badge & styling',
      'Priority customer support',
      'Advanced analytics',
      'Social media promotion'
    ],
    popular: false,
    hidden: false,
    tag: 'Recommended',
    upsellText: 'Best Value',
    limitedSpots: 'Limited to 5 spots per industry'
  },
  {
    id: 'diamond',
    name: 'Diamond Exclusive',
    price: 99.99,
    duration: 30,
    description: 'Top Diamond Featured - Invite/Bid Only',
    vietnameseDescription: 'Top Diamond Featured - Chỉ theo lời mời/đấu giá',
    tier: 'diamond',
    features: [
      '30-day top diamond placement',
      'Highest priority placement',
      'Diamond exclusive badge',
      'Personal account manager',
      'Custom listing design',
      'Industry spotlight feature'
    ],
    popular: false,
    hidden: false,
    tag: 'Invite Only',
    upsellText: 'Exclusive Access'
  }
];

interface PricingTierSelectorProps {
  selectedTier: JobPricingTier;
  onTierSelect: (tier: JobPricingTier) => void;
  options: PricingOptions;
}

const PricingTierSelector: React.FC<PricingTierSelectorProps> = ({
  selectedTier,
  onTierSelect,
  options
}) => {
  const { t } = useTranslation();

  const getTierIcon = (tier: JobPricingTier) => {
    switch (tier) {
      case 'diamond': return <Diamond className="h-5 w-5 text-cyan-500" />;
      case 'premium': return <Crown className="h-5 w-5 text-purple-500" />;
      case 'gold': return <Star className="h-5 w-5 text-amber-500" />;
      default: return <Check className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {pricingTiers.map((tier) => (
        <Card
          key={tier.id}
          className={`cursor-pointer transition-all ${
            selectedTier === tier.tier
              ? 'ring-2 ring-purple-500 border-purple-500'
              : 'hover:border-purple-300'
          }`}
          onClick={() => onTierSelect(tier.tier)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              {getTierIcon(tier.tier)}
              {tier.popular && (
                <Badge className="bg-orange-100 text-orange-800">Most Popular</Badge>
              )}
              {tier.recommended && (
                <Badge className="bg-purple-100 text-purple-800">Recommended</Badge>
              )}
            </div>
            
            <h3 className="font-semibold text-lg mb-2">{tier.name}</h3>
            
            <div className="flex items-end mb-3">
              <span className="text-2xl font-bold">${tier.price}</span>
              {tier.wasPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${tier.wasPrice}
                </span>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              {t({ english: tier.description, vietnamese: tier.vietnameseDescription })}
            </p>
            
            <ul className="space-y-2 mb-4">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
            
            {tier.limitedSpots && (
              <p className="text-xs text-orange-600 mb-3">{tier.limitedSpots}</p>
            )}
            
            <Button
              className={`w-full ${
                selectedTier === tier.tier
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onTierSelect(tier.tier);
              }}
            >
              {selectedTier === tier.tier ? 'Selected' : 'Select Plan'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PricingTierSelector;
