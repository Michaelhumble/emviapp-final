
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Check, Crown, Star, Diamond, Shield, Flame, Users, Globe, Zap } from 'lucide-react';

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
  const [nationwide, setNationwide] = useState(true);
  const [diamondSpotsLeft] = useState(2); // 2 out of 3 total spots

  const pricingPlans = [
    {
      tier: 'free',
      name: 'Free Listing',
      icon: Check,
      price: 0,
      wasPrice: null,
      popular: false,
      recommended: false,
      description: 'Perfect for testing the waters',
      features: [
        'Basic visibility for 30 days',
        'Standard job placement',
        'Basic applicant filtering',
        'Email notifications'
      ],
      bgGradient: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      iconColor: 'text-gray-600'
    },
    {
      tier: 'gold',
      name: 'Gold Featured',
      icon: Star,
      price: selectedDuration === 1 ? 19.99 : selectedDuration === 3 ? 17.99 : selectedDuration === 6 ? 15.99 : 13.99,
      wasPrice: selectedDuration === 1 ? 39.99 : selectedDuration === 3 ? 35.97 : selectedDuration === 6 ? 31.98 : 27.98,
      popular: true,
      recommended: false,
      description: 'Most popular choice for growing salons',
      features: [
        'Featured placement for 30+ days',
        'Gold verified badge',
        'Priority in search results',
        'Advanced analytics dashboard',
        'Instant email alerts',
        'Social media promotion'
      ],
      bgGradient: 'from-amber-50 to-yellow-50',
      borderColor: 'border-amber-200',
      iconColor: 'text-amber-600'
    },
    {
      tier: 'premium',
      name: 'Premium Boost',
      icon: Crown,
      price: selectedDuration === 1 ? 39.99 : selectedDuration === 3 ? 35.99 : selectedDuration === 6 ? 31.99 : 27.99,
      wasPrice: selectedDuration === 1 ? 79.99 : selectedDuration === 3 ? 71.97 : selectedDuration === 6 ? 63.98 : 55.98,
      popular: false,
      recommended: true,
      description: 'Recommended by top salon owners',
      features: [
        'Top placement for 60+ days',
        'Premium crown badge',
        'Featured in newsletters',
        'Advanced candidate matching',
        'Personal success manager',
        'Priority customer support',
        'Boost campaign included'
      ],
      bgGradient: 'from-purple-50 to-indigo-50',
      borderColor: 'border-purple-200',
      iconColor: 'text-purple-600'
    },
    {
      tier: 'diamond',
      name: 'Diamond Exclusive',
      icon: Diamond,
      price: 999.99,
      wasPrice: 1499.99,
      popular: false,
      recommended: false,
      inviteOnly: true,
      limitedSpots: `Only ${diamondSpotsLeft}/3 spots left`,
      description: 'Ultra-exclusive annual placement',
      features: [
        'Guaranteed top placement for 1 year',
        'Diamond elite badge',
        'Personal account manager',
        'Custom success strategy',
        'VIP candidate pipeline',
        'Exclusive industry events',
        'White-glove onboarding',
        'Success guarantee'
      ],
      bgGradient: 'from-cyan-50 to-blue-50',
      borderColor: 'border-cyan-200',
      iconColor: 'text-cyan-600'
    }
  ];

  const durations = [
    { months: 1, label: '1 Month', discount: 0 },
    { months: 3, label: '3 Months', discount: 10 },
    { months: 6, label: '6 Months', discount: 20 },
    { months: 12, label: '1 Year', discount: 30 }
  ];

  const handlePlanSelect = (plan: any) => {
    const finalPrice = plan.price + (nationwide && plan.price > 0 ? 5 : 0);
    const duration = plan.tier === 'diamond' ? 12 : selectedDuration;
    onPricingSelect(plan.tier, finalPrice, duration);
  };

  return (
    <div className="space-y-12">
      {/* Duration Selector */}
      <div className="text-center space-y-6">
        <h3 className="text-2xl font-bold font-playfair text-gray-900">Choose Your Timeline</h3>
        <div className="flex flex-wrap justify-center gap-3">
          {durations.map((duration) => (
            <motion.button
              key={duration.months}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDuration(duration.months)}
              className={`px-6 py-3 rounded-full border-2 transition-all ${
                selectedDuration === duration.months
                  ? 'bg-purple-600 text-white border-purple-600 shadow-lg'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
              }`}
            >
              <span className="font-semibold">{duration.label}</span>
              {duration.discount > 0 && (
                <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                  {duration.discount}% OFF
                </Badge>
              )}
            </motion.button>
          ))}
        </div>
        
        {selectedDuration === 12 && (
          <p className="text-sm text-green-600 font-semibold">
            🔒 Lock in this special price for a year!
          </p>
        )}
      </div>

      {/* Premium Add-ons */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-900 text-center">Premium Add-ons</h4>
        
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center space-x-3">
            <Switch
              checked={nationwide}
              onCheckedChange={setNationwide}
              className="data-[state=checked]:bg-blue-600"
            />
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <span className="font-medium">Nationwide Visibility (+$5)</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Switch
              checked={autoRenew}
              onCheckedChange={setAutoRenew}
              className="data-[state=checked]:bg-green-600"
            />
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-600" />
              <span className="font-medium">Auto-renew (5% discount)</span>
            </div>
          </div>
        </div>
        
        {/* Scarcity indicators */}
        <div className="flex justify-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-orange-600">
            <Users className="h-4 w-4" />
            <span>8 Gold spots left</span>
          </div>
          <div className="flex items-center gap-1 text-red-600">
            <Flame className="h-4 w-4" />
            <span>High demand</span>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan, index) => {
          const IconComponent = plan.icon;
          const isPopular = plan.popular;
          const isRecommended = plan.recommended;
          const isInviteOnly = plan.inviteOnly;
          const isDiamond = plan.tier === 'diamond';
          
          return (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="relative"
            >
              {/* Popular/Recommended Badge */}
              {(isPopular || isRecommended || isInviteOnly) && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className={`font-bold text-xs px-3 py-1 ${
                    isInviteOnly 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                      : isRecommended 
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                      : 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg'
                  }`}>
                    {isInviteOnly ? 'INVITE ONLY' : isRecommended ? 'RECOMMENDED' : 'POPULAR'}
                  </Badge>
                </div>
              )}
              
              <Card className={`h-full relative overflow-hidden border-2 ${plan.borderColor} bg-gradient-to-br ${plan.bgGradient} backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group`}>
                {/* Glass effect overlay */}
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardContent className="p-6 relative z-10">
                  {/* Header */}
                  <div className="text-center space-y-4 mb-6">
                    <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${plan.bgGradient} border-2 ${plan.borderColor} flex items-center justify-center shadow-lg`}>
                      <IconComponent className={`h-8 w-8 ${plan.iconColor}`} />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold font-playfair text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{plan.description}</p>
                    </div>
                    
                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-3xl font-bold text-gray-900">
                          ${plan.price}
                        </span>
                        {plan.wasPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${plan.wasPrice}
                          </span>
                        )}
                      </div>
                      
                      {plan.tier === 'diamond' ? (
                        <p className="text-sm text-gray-600 font-medium">Annual only</p>
                      ) : (
                        <p className="text-sm text-gray-600">
                          per {selectedDuration === 1 ? 'month' : `${selectedDuration} months`}
                        </p>
                      )}
                      
                      {nationwide && plan.price > 0 && (
                        <p className="text-xs text-blue-600 font-semibold">
                          +$5 Nationwide Visibility
                        </p>
                      )}
                    </div>
                    
                    {/* Limited spots for Diamond */}
                    {isDiamond && (
                      <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg p-3 space-y-2">
                        <p className="text-sm font-bold text-cyan-800">
                          Only 3 Diamond spots for the entire platform
                        </p>
                        <p className="text-xs text-cyan-700">
                          1 reserved for Emvi founder's brother's salon
                        </p>
                        <p className="text-xs text-cyan-700">
                          {diamondSpotsLeft} open for the world's most visionary salons
                        </p>
                        <div className="flex items-center gap-2 justify-center">
                          <div className="flex gap-1">
                            {[...Array(3)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-3 h-3 rounded-full ${
                                  i < (3 - diamondSpotsLeft) ? 'bg-red-400' : 'bg-cyan-400'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-bold text-cyan-800">
                            {diamondSpotsLeft}/3 spots left
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className={`h-4 w-4 mt-1 flex-shrink-0 ${plan.iconColor}`} />
                        <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <Button
                    onClick={() => handlePlanSelect(plan)}
                    disabled={isDiamond && diamondSpotsLeft === 0}
                    className={`w-full py-3 font-semibold text-base transition-all duration-300 ${
                      isDiamond && diamondSpotsLeft === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : isDiamond
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl'
                        : isRecommended
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl'
                        : isPopular
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isDiamond && diamondSpotsLeft === 0 
                      ? 'Join Waitlist'
                      : plan.tier === 'free' 
                      ? 'Start Free'
                      : `Choose ${plan.name}`
                    }
                  </Button>
                  
                  {/* Trust indicators */}
                  {plan.tier !== 'free' && (
                    <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Shield className="h-3 w-3" />
                        <span>100% Secure Payment • Cancel Anytime</span>
                      </div>
                    </div>
                  )}
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
