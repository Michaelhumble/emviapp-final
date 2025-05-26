
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, Star, Crown, Diamond, Clock, Users, Zap, Timer } from 'lucide-react';
import { calculatePricing } from '@/utils/posting/pricing';
import { cn } from '@/lib/utils';

interface PremiumJobPricingCardsProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const PremiumJobPricingCards: React.FC<PremiumJobPricingCardsProps> = ({ 
  onPricingSelect,
  jobData 
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('gold');
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(true); // Default to ON
  const [isNationwide, setIsNationwide] = useState<boolean>(false);

  const pricingTiers = [
    {
      id: 'free',
      name: 'Free Listing',
      icon: <Check className="h-6 w-6 text-gray-500" />,
      price: 0,
      originalPrice: 0,
      badge: null,
      badgeColor: '',
      borderColor: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700',
      features: [
        'Basic visibility',
        '30-day duration', 
        'Standard search placement',
        'Basic support'
      ],
      scarcity: null
    },
    {
      id: 'gold',
      name: 'Gold Featured',
      icon: <Star className="h-6 w-6 text-amber-500" />,
      price: 19.99,
      originalPrice: 24.99,
      badge: 'Most Popular',
      badgeColor: 'bg-gradient-to-r from-amber-400 to-orange-400 text-white',
      borderColor: 'border-amber-300',
      buttonColor: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
      features: [
        '⭐ Featured placement',
        '🏆 Gold badge highlight',
        '📈 2x more visibility',
        '⚡ Priority in search'
      ],
      scarcity: '8 left'
    },
    {
      id: 'premium',
      name: 'Premium Listing',
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      price: 39.99,
      originalPrice: 49.99,
      badge: 'Best Value',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
      borderColor: 'border-purple-300',
      buttonColor: 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600',
      features: [
        '👑 Top placement guarantee',
        '💎 Premium badge',
        '📊 Advanced analytics',
        '🎯 Targeted promotion'
      ],
      scarcity: '5 left'
    },
    {
      id: 'diamond',
      name: 'Diamond Exclusive',
      icon: <Diamond className="h-6 w-6 text-cyan-500" />,
      price: 999.99,
      originalPrice: 1199.99,
      badge: 'Annual Only',
      badgeColor: 'bg-gradient-to-r from-cyan-400 to-blue-400 text-white',
      borderColor: 'border-cyan-300',
      buttonColor: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600',
      features: [
        '💎 Highest placement',
        '⭐ Personal manager',
        '🎨 Custom styling',
        '📞 Priority support'
      ],
      scarcity: '2 left'
    }
  ];

  const durationOptions = [
    { months: 1, label: '1 Month', discount: 0 },
    { months: 3, label: '3 Months', discount: 10 },
    { months: 6, label: '6 Months', discount: 15 },
    { months: 12, label: '12 Months', discount: 20 }
  ];

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
    
    // Diamond tier is always 12 months
    if (tierId === 'diamond') {
      setSelectedDuration(12);
    }
  };

  const handleDurationSelect = (months: number) => {
    // Diamond tier is locked to 12 months
    if (selectedTier === 'diamond') return;
    setSelectedDuration(months);
  };

  const handleProceed = () => {
    const isFirstPost = false; // You can determine this based on user data
    
    // Use the calculatePricing utility for accurate pricing
    const pricingResult = calculatePricing(
      selectedTier as any,
      selectedTier === 'diamond' ? 12 : selectedDuration,
      autoRenew,
      isFirstPost,
      isNationwide
    );

    console.log('🎯 Pricing calculation result:', pricingResult);
    
    onPricingSelect(selectedTier, pricingResult.finalPrice, selectedTier === 'diamond' ? 12 : selectedDuration);
  };

  const getDisplayPrice = (tier: any) => {
    if (tier.id === 'free') return '$0';
    if (tier.id === 'diamond') return '$999.99/year';
    
    const pricingResult = calculatePricing(
      tier.id as any,
      selectedDuration,
      autoRenew,
      false,
      isNationwide
    );
    
    return `$${pricingResult.finalPrice.toFixed(2)}`;
  };

  const getOriginalPrice = (tier: any) => {
    if (tier.id === 'free' || tier.id === 'diamond') return null;
    
    const pricingResult = calculatePricing(
      tier.id as any,
      selectedDuration,
      false, // No auto-renew for original price
      false,
      false // No nationwide for original price
    );
    
    return pricingResult.originalPrice > pricingResult.finalPrice ? 
      `$${pricingResult.originalPrice.toFixed(2)}` : null;
  };

  return (
    <div className="space-y-8">
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingTiers.map((tier, index) => {
          const isSelected = selectedTier === tier.id;
          const originalPrice = getOriginalPrice(tier);
          
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative bg-white rounded-2xl border-2 transition-all duration-300 cursor-pointer group",
                "hover:shadow-xl hover:-translate-y-1",
                isSelected ? `${tier.borderColor} shadow-lg` : 'border-gray-200 hover:border-gray-300'
              )}
              onClick={() => handleTierSelect(tier.id)}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className={`${tier.badgeColor} px-4 py-1 font-semibold text-sm shadow-lg border-0`}>
                    {tier.badge}
                  </Badge>
                </div>
              )}

              {/* Scarcity indicator */}
              {tier.scarcity && (
                <div className="absolute -top-2 -right-2">
                  <Badge className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse border-2 border-white">
                    {tier.scarcity}
                  </Badge>
                </div>
              )}

              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="text-center space-y-2">
                  <div className="flex justify-center">{tier.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900">{tier.name}</h3>
                  <div className="space-y-1">
                    <div className="text-3xl font-bold text-gray-900">
                      {getDisplayPrice(tier)}
                    </div>
                    {originalPrice && (
                      <div className="text-sm text-gray-500 line-through">
                        {originalPrice}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Select Button */}
                <Button
                  className={cn(
                    "w-full py-3 text-white font-semibold transition-all duration-200",
                    isSelected ? tier.buttonColor : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTierSelect(tier.id);
                  }}
                >
                  {isSelected ? (
                    <span className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Selected
                    </span>
                  ) : (
                    'Select Plan'
                  )}
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Duration & Options Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6"
      >
        <h3 className="text-2xl font-bold text-center text-gray-900">
          Choose Duration & Save More
        </h3>

        {/* Duration Options */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-800">Duration</h4>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {durationOptions.map((option) => {
              const isDisabled = selectedTier === 'diamond' && option.months !== 12;
              const isSelected = selectedDuration === option.months;
              
              return (
                <button
                  key={option.months}
                  onClick={() => handleDurationSelect(option.months)}
                  disabled={isDisabled}
                  className={cn(
                    "relative p-4 rounded-xl border-2 transition-all text-center",
                    isSelected ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300',
                    isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
                  )}
                >
                  <div className="font-semibold text-gray-900">{option.label}</div>
                  {option.discount > 0 && (
                    <Badge className="mt-1 bg-green-100 text-green-800 text-xs">
                      {option.discount}% OFF
                    </Badge>
                  )}
                  {selectedTier === 'diamond' && option.months === 12 && (
                    <Badge className="mt-1 bg-cyan-100 text-cyan-800 text-xs">
                      Only Option
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Boost Options */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Boost Your Reach
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Auto-Renew Toggle - Default ON */}
            {selectedTier !== 'free' && selectedDuration === 1 && (
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="space-y-1">
                  <Label htmlFor="auto-renew" className="text-sm font-medium text-blue-900">
                    Auto-Renew Monthly
                  </Label>
                  <p className="text-xs text-blue-700">Save 5% with automatic renewal</p>
                </div>
                <Switch
                  id="auto-renew"
                  checked={autoRenew}
                  onCheckedChange={setAutoRenew}
                />
              </div>
            )}

            {/* Nationwide Visibility */}
            {selectedTier !== 'free' && (
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="space-y-1">
                  <Label htmlFor="nationwide" className="text-sm font-medium text-green-900">
                    Nationwide Visibility
                  </Label>
                  <p className="text-xs text-green-700">+$5 to reach all states</p>
                </div>
                <Switch
                  id="nationwide"
                  checked={isNationwide}
                  onCheckedChange={setIsNationwide}
                />
              </div>
            )}
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleProceed}
          className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
          disabled={!selectedTier}
        >
          Continue with {selectedTier === 'free' ? 'Free' : 
                         selectedTier === 'gold' ? 'Gold Featured' :
                         selectedTier === 'premium' ? 'Premium' : 'Diamond'} Plan
        </Button>
      </motion.div>
    </div>
  );
};

export default PremiumJobPricingCards;
