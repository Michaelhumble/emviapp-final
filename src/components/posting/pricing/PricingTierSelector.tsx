
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { JobPricingTier, PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Card } from '@/components/ui/card';
import { Check, Clock, Crown, Star, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  
  // Filter to show only visible tiers
  const visibleTiers = jobPricingOptions.filter(option => 
    !option.hidden || (option.id === 'diamond' && showDiamond)
  );
  
  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format time with leading zeros
  const formatTime = (value: number) => value.toString().padStart(2, '0');
  
  const handlePremiumMouseEnter = () => {
    // When user hovers on pro or premium, consider showing diamond tier
    if (selectedTier === 'premium' || selectedTier === 'gold') {
      setTimeout(() => setShowDiamond(true), 500);
    }
  };

  const getPricingBadge = (tier: JobPricingOption) => {
    if (tier.tag === 'Limited Time') {
      return (
        <Badge variant="outline" className="absolute top-2 right-2 bg-amber-50 text-amber-700 border-amber-200 font-medium flex items-center gap-1">
          <Clock className="h-3 w-3" /> Limited Time
        </Badge>
      );
    }
    
    if (tier.tag === 'Most Popular') {
      return (
        <Badge variant="outline" className="absolute top-2 right-2 bg-purple-50 text-purple-700 border-purple-200 font-medium flex items-center gap-1">
          <Star className="h-3 w-3" /> Most Popular
        </Badge>
      );
    }
    
    if (tier.tag === 'Power Seller') {
      return (
        <Badge variant="outline" className="absolute top-2 right-2 bg-indigo-50 text-indigo-700 border-indigo-200 font-medium flex items-center gap-1">
          <Zap className="h-3 w-3" /> Power Seller
        </Badge>
      );
    }
    
    if (tier.tag === 'Ultimate') {
      return (
        <Badge variant="outline" className="absolute top-2 right-2 bg-gradient-to-r from-amber-100 to-yellow-50 text-amber-800 border-amber-300 font-medium flex items-center gap-1">
          <Crown className="h-3 w-3" /> Ultimate Status
        </Badge>
      );
    }
    
    return null;
  };

  const renderLimitedSpotsIndicator = (tier: JobPricingOption) => {
    if (!tier.limitedSpots) return null;
    
    return (
      <div className="mt-2">
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-red-500"
            style={{ width: tier.limitedSpots }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {tier.limitedSpots} - Limited spots at this price!
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center text-center mb-8">
        <h3 className="font-playfair text-2xl font-medium text-gray-900 mb-2">
          {t({
            english: '50% OFF for Launch—Today Only!',
            vietnamese: 'Giảm 50% cho Ngày Ra Mắt - Chỉ Hôm Nay!'
          })}
        </h3>
        
        <p className="text-sm text-gray-600 max-w-lg">
          {t({
            english: 'Lock in forever pricing. Renew early to keep your rate.',
            vietnamese: 'Khóa giá vĩnh viễn. Gia hạn sớm để giữ mức giá của bạn.'
          })}
        </p>
        
        <div className="mt-3 px-4 py-2 bg-red-50 rounded-full border border-red-100 text-red-700 font-medium flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>
            {t({
              english: `Next price increase in ${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`,
              vietnamese: `Tăng giá tiếp theo trong ${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`
            })}
          </span>
        </div>
      </div>
      
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
                ${tier.color || ''}
                `}
                onClick={() => {
                  // For Diamond tier, show waitlist dialog instead
                  if (tier.id === 'diamond') {
                    // This would open a waitlist modal in a real implementation
                    alert('Please join our waitlist for Diamond tier access. Limited to 3 spots only!');
                    return;
                  }
                  
                  onTierSelect(tier.tier);
                }}
                onMouseEnter={tier.tier === 'premium' || tier.tier === 'gold' ? handlePremiumMouseEnter : undefined}
              >
                {getPricingBadge(tier)}
                
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold font-playfair">{tier.name}</h3>
                    {isSelected && <Check className="h-5 w-5 text-purple-600" />}
                  </div>
                  
                  <div className="mt-3 flex items-baseline">
                    <span className="text-2xl font-bold">${tier.price}</span>
                    {tier.annual ? (
                      <span className="text-sm text-gray-500 ml-1">/year</span>
                    ) : (
                      <span className="text-sm text-gray-500 ml-1">/month</span>
                    )}
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
                  
                  {renderLimitedSpotsIndicator(tier)}
                  
                  <div className="mt-4 space-y-2">
                    {tier.features && tier.features.map((feature, idx) => (
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
      
      {/* Upsell for longer plans */}
      <div className="mt-6 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-100 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Get extra savings with longer plans:</h4>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white rounded p-3 border border-gray-100 shadow-sm">
            <div className="text-purple-600 font-bold">3 Months</div>
            <div className="text-sm text-gray-600">10% extra off</div>
          </div>
          <div className="bg-white rounded p-3 border border-gray-100 shadow-sm">
            <div className="text-purple-600 font-bold">6 Months</div>
            <div className="text-sm text-gray-600">20% extra off</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded p-3 border border-amber-100 shadow-sm">
            <div className="text-amber-700 font-bold">12 Months</div>
            <div className="text-sm text-amber-700">35% off + Free Feature</div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">Secure your spot and lock in your rate today!</p>
      </div>
    </div>
  );
};

export default PricingTierSelector;
