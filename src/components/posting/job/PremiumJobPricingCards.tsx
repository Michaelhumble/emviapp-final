
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Crown, Shield, Diamond, Check, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
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
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>('premium');
  const [durationMonths, setDurationMonths] = useState<{ [key: string]: number }>({
    gold: 3,
    premium: 6,
    diamond: 12
  });
  const [autoRenew, setAutoRenew] = useState(true);
  const [nationwide, setNationwide] = useState(false);

  const tiers = [
    {
      id: 'gold' as JobPricingTier,
      name: 'Gold Featured',
      icon: Crown,
      iconColor: 'text-amber-500',
      badge: 'POPULAR',
      badgeColor: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white',
      gradient: 'from-amber-50 via-yellow-50 to-amber-100',
      borderColor: 'border-amber-200',
      basePrice: 19.99,
      features: [
        'Featured placement in search',
        'Gold badge & highlighting',
        'Priority in recommendations',
        'Email notifications for applicants',
        'Basic analytics dashboard'
      ]
    },
    {
      id: 'premium' as JobPricingTier,
      name: 'Premium Listing',
      icon: Shield,
      iconColor: 'text-purple-500',
      badge: 'RECOMMENDED',
      badgeColor: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
      gradient: 'from-purple-50 via-indigo-50 to-purple-100',
      borderColor: 'border-purple-200',
      basePrice: 39.99,
      features: [
        'Top placement guarantee',
        'Premium badge & styling',
        'Advanced applicant filtering',
        'Detailed analytics & insights',
        'Priority customer support',
        'Social media boost'
      ]
    },
    {
      id: 'diamond' as JobPricingTier,
      name: 'Diamond Exclusive',
      icon: Diamond,
      iconColor: 'text-cyan-500',
      badge: 'ANNUAL ONLY',
      badgeColor: 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white',
      gradient: 'from-cyan-50 via-blue-50 to-cyan-100',
      borderColor: 'border-cyan-200',
      basePrice: 999.99,
      isAnnualOnly: true,
      features: [
        'Exclusive top placement',
        'Diamond badge & premium styling',
        'Personal account manager',
        'White-glove service',
        'Custom branding options',
        'Advanced recruitment tools',
        '24/7 priority support'
      ]
    }
  ];

  const durations = [
    { months: 1, label: '1 Month', discount: 0 },
    { months: 3, label: '3 Months', discount: 10 },
    { months: 6, label: '6 Months', discount: 15 },
    { months: 12, label: '12 Months', discount: 20 }
  ];

  const handleDurationChange = (tierId: string, months: number) => {
    if (tierId === 'diamond') return; // Diamond is annual only
    setDurationMonths(prev => ({ ...prev, [tierId]: months }));
  };

  const getPricing = (tier: any) => {
    const months = tier.isAnnualOnly ? 12 : durationMonths[tier.id];
    const pricing = calculatePricing(
      tier.id,
      months,
      autoRenew,
      false,
      nationwide
    );
    return pricing;
  };

  const handleSelectPlan = (tier: any) => {
    const months = tier.isAnnualOnly ? 12 : durationMonths[tier.id];
    const pricing = getPricing(tier);
    onPricingSelect(tier.id, pricing.finalPrice, months);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Global Options */}
      <div className="mb-8 flex justify-center">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex items-center gap-3">
              <Switch
                checked={autoRenew}
                onCheckedChange={setAutoRenew}
                className="data-[state=checked]:bg-purple-600"
              />
              <span className="font-medium text-gray-700">Auto-Renew Enabled</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Save 5%
              </Badge>
            </div>
            
            <div className="flex items-center gap-3">
              <Switch
                checked={nationwide}
                onCheckedChange={setNationwide}
                className="data-[state=checked]:bg-blue-600"
              />
              <Globe className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-gray-700">Nationwide Visibility</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                +$5
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {tiers.map((tier, index) => {
          const pricing = getPricing(tier);
          const months = tier.isAnnualOnly ? 12 : durationMonths[tier.id];
          const IconComponent = tier.icon;
          
          return (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <Card className={cn(
                "relative overflow-hidden h-full transition-all duration-300 hover:shadow-2xl",
                "bg-gradient-to-br", tier.gradient,
                tier.borderColor,
                selectedTier === tier.id && "ring-2 ring-purple-500 ring-offset-2 scale-105"
              )}>
                {/* Top Badge */}
                <div className="absolute -top-0 -right-0 z-10">
                  <div className={cn(
                    "px-4 py-2 text-xs font-bold tracking-wider transform rotate-12 translate-x-2 -translate-y-2 shadow-lg",
                    tier.badgeColor
                  )}>
                    {tier.badge}
                  </div>
                </div>

                <CardHeader className="text-center pt-8 pb-4">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className={cn(
                      "p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg",
                      "ring-1 ring-white/20"
                    )}>
                      <IconComponent className={cn("h-8 w-8", tier.iconColor)} />
                    </div>
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  
                  {/* Pricing Display */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {formatCurrency(pricing.finalPrice)}
                      </span>
                      {!tier.isAnnualOnly && (
                        <span className="text-gray-600">/{months}mo</span>
                      )}
                    </div>
                    
                    {pricing.discountPercentage > 0 && (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg text-gray-500 line-through">
                          {formatCurrency(pricing.originalPrice)}
                        </span>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          Save {pricing.discountPercentage}%
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Duration Selector (not for Diamond) */}
                  {!tier.isAnnualOnly && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-center">Duration</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {durations.map((duration) => (
                          <button
                            key={duration.months}
                            onClick={() => handleDurationChange(tier.id, duration.months)}
                            className={cn(
                              "p-3 rounded-xl text-sm font-medium transition-all",
                              "border border-gray-200 hover:border-gray-300",
                              durationMonths[tier.id] === duration.months
                                ? "bg-purple-600 text-white border-purple-600 shadow-md"
                                : "bg-white/80 text-gray-700 hover:bg-white"
                            )}
                          >
                            <div>{duration.label}</div>
                            {duration.discount > 0 && (
                              <div className="text-xs opacity-80">
                                Save {duration.discount}%
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Features Included</h4>
                    <ul className="space-y-2">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handleSelectPlan(tier)}
                    className={cn(
                      "w-full py-3 text-base font-semibold transition-all",
                      selectedTier === tier.id
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                        : "bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black"
                    )}
                  >
                    {selectedTier === tier.id ? 'Selected' : `Choose ${tier.name}`}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PremiumJobPricingCards;
