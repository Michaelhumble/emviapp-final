
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { JobPricingTier, PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface PricingTierSelectorProps {
  selectedTier: JobPricingTier;
  onTierSelect: (tier: JobPricingTier) => void;
  pricingOptions: PricingOptions;
  isFirstPost?: boolean;
}

const PricingTierSelector: React.FC<PricingTierSelectorProps> = ({
  selectedTier,
  onTierSelect,
  pricingOptions,
  isFirstPost = false
}) => {
  const { t, isVietnamese } = useTranslation();
  const [showDiamond, setShowDiamond] = useState(false);
  
  // Filter to show only Free, Standard, Premium initially
  const visibleTiers = jobPricingOptions.filter(option => 
    !option.hidden || (option.id === 'diamond' && showDiamond)
  );
  
  const handlePremiumMouseEnter = () => {
    // When user hovers on premium, consider showing diamond tier
    if (selectedTier === 'premium') {
      setTimeout(() => setShowDiamond(true), 500);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="font-playfair text-xl font-medium text-gray-900">
        {t({
          english: 'Select Your Plan',
          vietnamese: 'Chọn gói của bạn'
        })}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleTiers.map((tier) => {
          const isSelected = selectedTier === tier.tier;
          
          // Don't show free tier unless it's the user's first post
          if (tier.tier === 'free' && !isFirstPost) {
            return null;
          }
          
          return (
            <motion.div
              key={tier.id}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              className="h-full"
            >
              <Card 
                className={`relative h-full overflow-hidden cursor-pointer border transition-all ${
                  isSelected 
                    ? 'ring-2 ring-offset-1 ring-purple-500 shadow-md' 
                    : 'hover:border-purple-200 hover:shadow-sm'
                }
                ${tier.tier === 'premium' ? 'bg-gradient-to-br from-purple-500/5 to-indigo-500/5 border-indigo-100' : ''}
                ${tier.tier === 'gold' ? 'bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border-amber-100' : ''}
                ${tier.tier === 'diamond' ? 'bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border-blue-100' : ''}
                ${tier.tier === 'free' || tier.tier === 'standard' ? 'bg-white' : ''}
                `}
                onClick={() => onTierSelect(tier.tier)}
                onMouseEnter={tier.tier === 'premium' ? handlePremiumMouseEnter : undefined}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs px-3 py-1 transform rotate-45 translate-x-2 translate-y-3 uppercase font-semibold tracking-wide">
                      {isVietnamese ? 'Phổ biến' : 'Popular'}
                    </div>
                  </div>
                )}
                
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold font-playfair">{tier.name}</h3>
                    {isSelected && <Check className="h-5 w-5 text-purple-600" />}
                  </div>
                  
                  <div className="mt-3 flex items-end">
                    <span className="text-2xl font-bold">${tier.price}</span>
                    <span className="text-sm text-gray-500 ml-1">/month</span>
                    {tier.wasPrice && (
                      <span className="ml-2 text-sm line-through text-gray-400">
                        ${tier.wasPrice}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm font-medium text-gray-800 mt-3">
                    {tier.primaryBenefit}
                  </p>
                  
                  <p className="text-sm text-purple-700 font-medium mt-1">
                    {tier.upsellText}
                  </p>
                  
                  <div className="mt-4 space-y-2">
                    {tier.features && tier.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <Check className="h-4 w-4 mr-2 mt-0.5 text-gray-400" />
                        <span className="text-xs text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingTierSelector;
