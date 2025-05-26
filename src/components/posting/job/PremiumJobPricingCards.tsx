
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Star, Diamond, Sparkles, Timer, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { calculatePricing, formatCurrency } from '@/utils/posting/pricing';
import { JobPricingTier } from '@/utils/posting/types';

interface PremiumJobPricingCardsProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const PremiumJobPricingCards: React.FC<PremiumJobPricingCardsProps> = ({ 
  onPricingSelect,
  jobData 
}) => {
  const [selectedDurations, setSelectedDurations] = useState<{[key: string]: number}>({
    free: 1,
    gold: 1,
    premium: 1,
    diamond: 12 // Diamond is always 12 months
  });

  const durationOptions = [
    { value: 1, label: '1 Month', discount: 0 },
    { value: 3, label: '3 Months', discount: 10 },
    { value: 6, label: '6 Months', discount: 15 },
    { value: 12, label: '12 Months', discount: 20 }
  ];

  const handleDurationChange = (tier: string, months: number) => {
    if (tier !== 'diamond') { // Diamond duration cannot be changed
      setSelectedDurations(prev => ({ ...prev, [tier]: months }));
    }
  };

  const handleSelectPlan = (tier: JobPricingTier) => {
    const durationMonths = selectedDurations[tier];
    
    // CRITICAL FIX: Use the calculatePricing function for ALL pricing calculations
    const pricing = calculatePricing(
      tier,
      durationMonths,
      true, // autoRenew
      false, // isFirstPost
      false // isNationwide
    );
    
    console.log(`Selected ${tier} plan:`, {
      tier,
      durationMonths,
      finalPrice: pricing.finalPrice,
      originalPrice: pricing.originalPrice,
      discountPercentage: pricing.discountPercentage
    });
    
    // Pass the correct calculated price to the modal
    onPricingSelect(tier, pricing.finalPrice, durationMonths);
  };

  const getPricingDisplay = (tier: JobPricingTier) => {
    const durationMonths = selectedDurations[tier];
    const pricing = calculatePricing(
      tier,
      durationMonths,
      true, // autoRenew
      false, // isFirstPost
      false // isNationwide
    );
    
    return {
      finalPrice: pricing.finalPrice,
      originalPrice: pricing.originalPrice,
      discountPercentage: pricing.discountPercentage,
      monthlyPrice: pricing.finalPrice / durationMonths
    };
  };

  const plans = [
    {
      id: 'free',
      tier: 'free' as JobPricingTier,
      name: 'Free Listing',
      icon: <Sparkles className="h-6 w-6 text-gray-500" />,
      description: 'Basic visibility for 30 days',
      features: [
        'Listed in search results',
        'Basic contact info display',
        '30-day duration',
        'Standard support'
      ],
      buttonText: 'Post for Free',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      id: 'gold',
      tier: 'gold' as JobPricingTier,
      name: 'Gold Featured',
      icon: <Star className="h-6 w-6 text-amber-500" />,
      description: 'Stand out with featured placement',
      features: [
        'Featured in search results',
        'Gold badge highlight',
        'Priority placement',
        'Enhanced visibility',
        'Premium support'
      ],
      buttonText: 'Select Gold',
      buttonVariant: 'default' as const,
      popular: true,
      gradient: 'from-amber-400 to-amber-600'
    },
    {
      id: 'premium',
      tier: 'premium' as JobPricingTier,
      name: 'Premium Listing',
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      description: 'Maximum exposure and premium features',
      features: [
        'Top premium placement',
        'Purple crown badge',
        'Advanced analytics',
        'Featured above Gold',
        'Priority support',
        'Application tracking'
      ],
      buttonText: 'Select Premium',
      buttonVariant: 'default' as const,
      popular: false,
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      id: 'diamond',
      tier: 'diamond' as JobPricingTier,
      name: 'Diamond Exclusive',
      icon: <Diamond className="h-6 w-6 text-cyan-500" />,
      description: 'Ultimate visibility with exclusive benefits',
      features: [
        'Top diamond placement',
        'Diamond badge prestige',
        'Personal account manager',
        'Advanced analytics suite',
        'VIP support line',
        'Custom promotional features'
      ],
      buttonText: 'Select Diamond',
      buttonVariant: 'default' as const,
      popular: false,
      gradient: 'from-cyan-400 to-cyan-600',
      exclusive: true
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {plans.map((plan, index) => {
        const pricing = getPricingDisplay(plan.tier);
        const durationMonths = selectedDurations[plan.tier];
        
        return (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-3 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <Card className={`h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl border-2 ${
              plan.popular ? 'border-amber-200 shadow-lg' : 'border-gray-200 hover:border-gray-300'
            }`}>
              {plan.gradient && (
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${plan.gradient}`} />
              )}
              
              <CardHeader className="text-center space-y-4">
                <div className="flex justify-center">
                  {plan.icon}
                </div>
                
                <div>
                  <CardTitle className="text-xl font-bold flex items-center justify-center gap-2">
                    {plan.name}
                    {plan.exclusive && (
                      <Badge variant="secondary" className="text-xs">Exclusive</Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </div>
                
                {/* Duration Selection */}
                {plan.tier !== 'free' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Duration:</label>
                    <Select
                      value={durationMonths.toString()}
                      onValueChange={(value) => handleDurationChange(plan.tier, parseInt(value))}
                      disabled={plan.tier === 'diamond'} // Diamond is always 12 months
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {durationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {option.label}
                            {option.discount > 0 && (
                              <span className="text-green-600 ml-2">(-{option.discount}%)</span>
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {/* Pricing Display */}
                <div className="space-y-2">
                  {plan.tier === 'free' ? (
                    <div className="text-3xl font-bold text-gray-900">Free</div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-gray-900">
                        {formatCurrency(pricing.finalPrice)}
                      </div>
                      {pricing.discountPercentage > 0 && (
                        <div className="space-y-1">
                          <div className="text-sm text-gray-500 line-through">
                            {formatCurrency(pricing.originalPrice)}
                          </div>
                          <div className="text-sm text-green-600 font-medium">
                            Save {pricing.discountPercentage}%
                          </div>
                        </div>
                      )}
                      <div className="text-sm text-gray-600">
                        {formatCurrency(pricing.monthlyPrice)}/month × {durationMonths} month{durationMonths > 1 ? 's' : ''}
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleSelectPlan(plan.tier)}
                  variant={plan.buttonVariant}
                  className={`w-full font-semibold ${
                    plan.gradient 
                      ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white border-0`
                      : ''
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PremiumJobPricingCards;
