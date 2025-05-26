
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Star, Diamond, Sparkles, Zap, Target, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface PricingCardData {
  id: string;
  name: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  basePrice: number;
  features: string[];
  gradient: string;
  borderColor: string;
  popular?: boolean;
  recommended?: boolean;
}

interface PremiumJobPricingCardsProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const PremiumJobPricingCards: React.FC<PremiumJobPricingCardsProps> = ({ 
  onPricingSelect,
  jobData 
}) => {
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [autoRenew, setAutoRenew] = useState(true);
  const [nationwide, setNationwide] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string>('gold');

  const durations = [
    { months: 1, label: '1 Month', discount: 0 },
    { months: 3, label: '3 Months', discount: 10 },
    { months: 6, label: '6 Months', discount: 15 },
    { months: 12, label: '12 Months', discount: 20 }
  ];

  const pricingData: PricingCardData[] = [
    {
      id: 'free',
      name: 'Free Listing',
      icon: <Check className="h-6 w-6 text-gray-500" />,
      badge: 'FREE',
      badgeColor: 'bg-gray-100 text-gray-700',
      basePrice: 0,
      features: ['Basic visibility', '30-day duration', 'Standard placement'],
      gradient: 'bg-gradient-to-br from-gray-50 to-gray-100',
      borderColor: 'border-gray-200'
    },
    {
      id: 'gold',
      name: 'Gold Featured',
      icon: <Star className="h-6 w-6 text-amber-500" />,
      badge: 'POPULAR',
      badgeColor: 'bg-gradient-to-r from-amber-400 to-orange-400 text-white',
      basePrice: 19.99,
      features: ['Featured placement', 'Gold badge', 'Priority listing', 'Enhanced visibility'],
      gradient: 'bg-gradient-to-br from-amber-50 to-yellow-100',
      borderColor: 'border-amber-200',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Listing',
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      badge: 'RECOMMENDED',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
      basePrice: 39.99,
      features: ['Top placement', 'Premium badge', 'Analytics dashboard', 'Priority support'],
      gradient: 'bg-gradient-to-br from-purple-50 to-indigo-100',
      borderColor: 'border-purple-200',
      recommended: true
    },
    {
      id: 'diamond',
      name: 'Diamond Exclusive',
      icon: <Diamond className="h-6 w-6 text-cyan-500" />,
      badge: 'ANNUAL ONLY',
      badgeColor: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
      basePrice: 999.99,
      features: ['Highest placement', 'Diamond badge', 'Personal manager', 'Exclusive analytics'],
      gradient: 'bg-gradient-to-br from-cyan-50 to-blue-100',
      borderColor: 'border-cyan-200'
    }
  ];

  const calculatePrice = (basePrice: number, months: number) => {
    if (basePrice === 0) return 0;
    if (basePrice === 999.99) return 999.99; // Diamond is always annual
    
    const discount = durations.find(d => d.months === months)?.discount || 0;
    const total = basePrice * months;
    const discountAmount = (total * discount) / 100;
    let finalPrice = total - discountAmount;
    
    if (autoRenew && months === 1) {
      finalPrice = finalPrice * 0.95; // 5% auto-renew discount
    }
    
    if (nationwide && basePrice > 0) {
      finalPrice += 5; // $5 nationwide fee
    }
    
    return finalPrice;
  };

  const handleSelectPlan = (tierId: string) => {
    const plan = pricingData.find(p => p.id === tierId);
    if (!plan) return;
    
    const finalPrice = calculatePrice(plan.basePrice, selectedDuration);
    const months = tierId === 'diamond' ? 12 : selectedDuration;
    
    setSelectedTier(tierId);
    onPricingSelect(tierId, finalPrice, months);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Duration Selector - Outside Cards */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Choose Your Duration
        </h3>
        <div className="flex justify-center gap-2 mb-6">
          {durations.map((duration) => (
            <motion.button
              key={duration.months}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDuration(duration.months)}
              className={cn(
                "relative px-6 py-3 rounded-full border-2 font-medium transition-all duration-200",
                selectedDuration === duration.months
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-600 shadow-lg"
                  : "bg-white text-gray-700 border-gray-200 hover:border-purple-300 hover:shadow-md"
              )}
            >
              {duration.label}
              {duration.discount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5">
                  -{duration.discount}%
                </Badge>
              )}
            </motion.button>
          ))}
        </div>

        {/* Auto-Renew and Nationwide Toggles */}
        <div className="flex justify-center gap-8 mb-8">
          <div className="flex items-center gap-3">
            <Switch
              checked={autoRenew}
              onCheckedChange={setAutoRenew}
              className="data-[state=checked]:bg-purple-600"
            />
            <span className="text-sm font-medium text-gray-700">
              Auto-renew (Save 5%)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={nationwide}
              onCheckedChange={setNationwide}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">
              Nationwide visibility (+$5)
            </span>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingData.map((plan, index) => {
          const finalPrice = calculatePrice(plan.basePrice, selectedDuration);
          const isSelected = selectedTier === plan.id;
          
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative"
            >
              <Card 
                className={cn(
                  "relative overflow-hidden cursor-pointer border-2 transition-all duration-300 hover:shadow-2xl",
                  plan.gradient,
                  isSelected 
                    ? `${plan.borderColor} ring-4 ring-purple-200 shadow-xl` 
                    : `${plan.borderColor} hover:border-purple-300`,
                  plan.popular && "transform scale-105",
                  plan.recommended && "transform scale-105"
                )}
                onClick={() => handleSelectPlan(plan.id)}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-0 right-0">
                    <Badge className={`${plan.badgeColor} rounded-bl-lg rounded-tr-lg px-3 py-1 text-xs font-bold`}>
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                {/* Popular/Recommended Glow Effect */}
                {(plan.popular || plan.recommended) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-50" />
                )}

                <CardContent className="p-6 relative z-10">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
                      {plan.icon}
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-center mb-4 text-gray-900">
                    {plan.name}
                  </h3>

                  {/* Price Display */}
                  <div className="text-center mb-6">
                    <div className="text-4xl font-black text-gray-900 mb-1">
                      ${finalPrice === 0 ? '0' : finalPrice.toFixed(2)}
                    </div>
                    {plan.basePrice > 0 && plan.id !== 'diamond' && (
                      <div className="text-sm text-gray-600">
                        ${plan.basePrice}/month × {selectedDuration} month{selectedDuration > 1 ? 's' : ''}
                      </div>
                    )}
                    {plan.id === 'diamond' && (
                      <div className="text-sm text-gray-600">
                        Annual plan only
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Select Button */}
                  <Button
                    className={cn(
                      "w-full h-12 rounded-lg font-semibold transition-all duration-200",
                      isSelected
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                        : "bg-white text-gray-900 border-2 border-gray-200 hover:border-purple-300 hover:shadow-md"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPlan(plan.id);
                    }}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Selected
                      </>
                    ) : (
                      'Choose Plan'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-12"
      >
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Sparkles className="h-4 w-4 text-purple-500" />
            Premium Support
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Zap className="h-4 w-4 text-amber-500" />
            Instant Activation
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Target className="h-4 w-4 text-green-500" />
            Cancel Anytime
          </div>
        </div>
        
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          All plans include 24/7 support, money-back guarantee, and access to our exclusive beauty industry network.
          Prices shown include all applicable discounts and fees.
        </p>
      </motion.div>
    </div>
  );
};

export default PremiumJobPricingCards;
