
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PricingTierCard from './PricingTierCard';
import { JobPricingOption } from '@/utils/posting/types';
import { cn } from '@/lib/utils';
import { CheckCircle, Calendar, AlertTriangle } from 'lucide-react';
import DurationSelector from './DurationSelector';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PricingCardsProps {
  pricingOptions: JobPricingOption[];
  selectedPricing: string;
  onChange: (pricingId: string) => void;
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

const PricingCards: React.FC<PricingCardsProps> = ({
  pricingOptions,
  selectedPricing,
  onChange,
  selectedDuration,
  onDurationChange
}) => {
  // If Diamond plan is selected, force 12 month duration
  // IMPORTANT: Diamond plan is intentionally hardcoded for 12-month only.
  // This restriction is by design and should not be changed without business approval.
  useEffect(() => {
    if (selectedPricing === 'diamond' && selectedDuration !== 12) {
      onDurationChange(12);
    }
  }, [selectedPricing, selectedDuration, onDurationChange]);
  
  // Add null check for pricingOptions
  if (!pricingOptions || pricingOptions.length === 0) {
    return null;
  }
  
  // Filter out hidden tiers
  const visiblePricingOptions = pricingOptions.filter(option => 
    !option.hidden
  );
  
  // Separate free and paid tiers
  const freeTier = visiblePricingOptions.find(option => option.id === 'free');
  
  // Get paid tiers - standard, premium, gold (featured)
  const paidTiers = visiblePricingOptions.filter(option => 
    option.id !== 'free' && (option.id === 'standard' || option.id === 'premium' || option.id === 'gold')
  );
  
  // Gold tier (Featured) might be hidden initially until upsell
  const standardTier = paidTiers.find(option => option.id === 'standard');
  const premiumTier = paidTiers.find(option => option.id === 'premium');
  const goldTier = paidTiers.find(option => option.id === 'gold');
  
  // Check if free plan is selected
  const isFreePlanSelected = selectedPricing === 'free';
  
  // FOMO tooltip for free plan
  const renderFreeTooltip = (children: React.ReactNode) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent className="p-3 max-w-xs bg-white border border-amber-200 text-gray-800 shadow-lg">
          <p className="font-medium mb-1 text-amber-800">⚠️ Limited Visibility Warning</p>
          <p className="text-sm">Free posts reach 80% fewer candidates. Use only if testing.</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
  
  return (
    <div className="space-y-6">
      {/* Paid Plans Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Standard Plan */}
        {standardTier && (
          <motion.div
            initial={{ y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            animate={selectedPricing === 'standard' ? { scale: 1.02, boxShadow: '0 4px 12px rgba(155, 135, 245, 0.2)' } : { scale: 1 }}
          >
            <PricingTierCard 
              pricing={{
                ...standardTier,
                name: 'Standard',
                wasPrice: 14.99,
                price: 9.99,
                description: 'Smart Choice for most businesses',
                tag: '🔥 Chosen by over 8,000 salons this year'
              }}
              isSelected={selectedPricing === 'standard'}
              onClick={() => onChange('standard')}
            />
          </motion.div>
        )}
        
        {/* Premium Plan */}
        {premiumTier && (
          <motion.div
            initial={{ y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            animate={selectedPricing === 'premium' ? { scale: 1.03, boxShadow: '0 4px 15px rgba(155, 135, 245, 0.3)' } : { scale: 1 }}
          >
            <PricingTierCard 
              pricing={{
                ...premiumTier,
                name: 'Premium',
                wasPrice: 24.99,
                price: 19.99,
                description: 'Top Pick by Salons',
                tag: '⭐ Used by 4,500+ serious salons for better results'
              }}
              isSelected={selectedPricing === 'premium'}
              onClick={() => onChange('premium')}
              isMostPopular={true}
            />
          </motion.div>
        )}
        
        {/* Gold/Featured Plan */}
        {goldTier && (
          <motion.div
            initial={{ y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            animate={selectedPricing === 'gold' ? { scale: 1.03, boxShadow: '0 4px 15px rgba(250, 202, 78, 0.3)' } : { scale: 1 }}
          >
            <PricingTierCard 
              pricing={{
                ...goldTier,
                name: 'Featured',
                wasPrice: 39.99,
                price: 29.99,
                description: 'Fastest Hiring Plan',
                tag: '🏆 Preferred by growing brands – 1,200 upgraded last month'
              }}
              isSelected={selectedPricing === 'gold'}
              onClick={() => onChange('gold')}
            />
          </motion.div>
        )}
      </div>
      
      {/* Free Plan Row - Smaller and visually deemphasized */}
      {freeTier && (
        <div className="mt-6 max-w-[85%] mx-auto opacity-80">
          {renderFreeTooltip(
            <motion.div
              initial={{ y: 0 }}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300 }}
              animate={selectedPricing === 'free' ? { scale: 1.01 } : { scale: 1 }}
              className="transform scale-95"
            >
              <PricingTierCard 
                pricing={{
                  ...freeTier,
                  name: 'Basic (Limited Reach)',
                  description: 'Free listing with very limited visibility',
                  tag: 'Recommended only for early testing'
                }}
                isSelected={selectedPricing === 'free'}
                onClick={() => onChange('free')}
                isFreeVariant={true}
                subtitle="Chỉ nên chọn nếu bạn đang thử nghiệm nền tảng"
                negativeFeatures={['Top placement', 'Highlight in search', 'Social media promotion']}
              />
            </motion.div>
          )}
        </div>
      )}
      
      {!isFreePlanSelected && (
        <div className="mt-6">
          <p className="text-center text-sm text-gray-600 mb-4">Select subscription length to get the best value:</p>
          <DurationSelector 
            selectedDuration={selectedDuration} 
            onChange={onDurationChange}
            selectedPricing={selectedPricing}
          />
        </div>
      )}
    </div>
  );
};

export default PricingCards;
