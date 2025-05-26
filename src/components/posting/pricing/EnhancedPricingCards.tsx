
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Diamond, Lock, Users } from 'lucide-react';
import { JobPricingTier, PricingOptions } from '@/utils/posting/types';

interface EnhancedPricingCardsProps {
  selectedTier: JobPricingTier;
  onTierSelect: (tier: JobPricingTier) => void;
  options: PricingOptions;
  diamondSpotsLeft: number;
  onProceed: () => void;
}

const EnhancedPricingCards: React.FC<EnhancedPricingCardsProps> = ({
  selectedTier,
  onTierSelect,
  options,
  diamondSpotsLeft,
  onProceed
}) => {
  const pricingPlans = [
    {
      tier: 'free' as JobPricingTier,
      name: 'Starter',
      price: 0,
      originalPrice: null,
      badge: null,
      badgeColor: '',
      description: 'Perfect for testing the waters',
      features: [
        'Basic job listing for 30 days',
        'Standard search placement',
        'Email notifications',
        'Basic applicant tracking'
      ],
      icon: <Check className="h-6 w-6 text-gray-500" />,
      cardStyle: 'bg-white border-gray-200 hover:border-gray-300',
      buttonStyle: 'bg-gray-600 hover:bg-gray-700',
      popular: false
    },
    {
      tier: 'gold' as JobPricingTier,
      name: 'Professional',
      price: 29.99,
      originalPrice: 59.99,
      badge: 'Popular',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'Most chosen by successful salons',
      features: [
        'Featured placement for 30 days',
        'Priority in search results',
        'Advanced applicant filtering',
        'Email & SMS notifications',
        'Salon badge display'
      ],
      icon: <Star className="h-6 w-6 text-amber-500" />,
      cardStyle: 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-300 hover:shadow-xl',
      buttonStyle: 'bg-amber-600 hover:bg-amber-700',
      popular: true
    },
    {
      tier: 'premium' as JobPricingTier,
      name: 'Business Elite',
      price: 49.99,
      originalPrice: 99.99,
      badge: 'Recommended',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      description: 'Maximum visibility and tools',
      features: [
        'Top placement for 30 days',
        'Premium salon profile',
        'Advanced analytics dashboard',
        'Priority customer support',
        'Social media boost',
        'Unlimited applicant views'
      ],
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      cardStyle: 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:border-purple-300 hover:shadow-xl',
      buttonStyle: 'bg-purple-600 hover:bg-purple-700',
      popular: false
    },
    {
      tier: 'diamond' as JobPricingTier,
      name: 'Diamond Exclusive',
      price: 999.99,
      originalPrice: null,
      badge: 'Invite Only',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
      description: 'Ultra-exclusive annual membership',
      features: [
        'Highest placement for 365 days',
        'Personal account manager',
        'White-glove onboarding',
        'Custom salon showcase',
        'VIP customer support',
        'Exclusive networking events',
        'Annual-only membership'
      ],
      icon: <Diamond className="h-6 w-6 text-cyan-500" />,
      cardStyle: 'bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 border-2 border-cyan-300 hover:border-cyan-400 hover:shadow-2xl relative overflow-hidden',
      buttonStyle: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700',
      popular: false
    }
  ];

  const getActualPrice = (plan: any) => {
    if (plan.tier === 'diamond') return plan.price; // Always annual
    
    const monthlyPrice = plan.price;
    switch (options.durationMonths) {
      case 3: return monthlyPrice * 3 * 0.9; // 10% discount
      case 6: return monthlyPrice * 6 * 0.85; // 15% discount  
      case 12: return monthlyPrice * 12 * 0.75; // 25% discount
      default: return monthlyPrice;
    }
  };

  const getDurationLabel = (tier: JobPricingTier) => {
    if (tier === 'diamond') return '/year';
    if (options.durationMonths === 1) return '/month';
    return `/${options.durationMonths} months`;
  };

  const isDiamondFull = diamondSpotsLeft === 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {pricingPlans.map((plan, index) => (
        <motion.div
          key={plan.tier}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="relative"
        >
          <Card
            className={`cursor-pointer transition-all duration-300 h-full flex flex-col ${plan.cardStyle} ${
              selectedTier === plan.tier ? 'ring-2 ring-purple-500 ring-offset-2' : ''
            }`}
            onClick={() => onTierSelect(plan.tier)}
          >
            {/* Diamond exclusive effects */}
            {plan.tier === 'diamond' && (
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-blue-400/10 to-indigo-400/10 rounded-lg" />
            )}
            
            <CardHeader className="text-center relative z-10">
              {/* Badge */}
              {plan.badge && (
                <div className="flex justify-center mb-3">
                  <Badge className={`${plan.badgeColor} font-semibold px-3 py-1 text-xs`}>
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-full ${
                  plan.tier === 'diamond' ? 'bg-cyan-100' : 
                  plan.tier === 'premium' ? 'bg-purple-100' :
                  plan.tier === 'gold' ? 'bg-amber-100' : 'bg-gray-100'
                }`}>
                  {plan.icon}
                </div>
              </div>

              {/* Plan name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 mb-4">{plan.description}</p>

              {/* Pricing */}
              <div className="space-y-1">
                <div className="flex items-end justify-center gap-2">
                  <span className="text-3xl font-bold text-gray-900">
                    ${getActualPrice(plan).toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500 mb-1">
                    {getDurationLabel(plan.tier)}
                  </span>
                </div>
                {plan.originalPrice && (
                  <div className="text-sm text-gray-500">
                    <span className="line-through">${plan.originalPrice}</span>
                    <span className="text-green-600 font-semibold ml-2">
                      Save {Math.round((1 - plan.price / plan.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {/* Diamond spots tracker */}
              {plan.tier === 'diamond' && (
                <div className="mt-4 space-y-2">
                  <div className="text-xs text-cyan-700 font-medium">
                    Only 3 Diamond spots for the entire platform.
                  </div>
                  <div className="text-xs text-cyan-600">
                    1 reserved for Emvi founder's brother's salon.
                  </div>
                  <div className="text-xs text-cyan-600 font-semibold">
                    {diamondSpotsLeft}/3 spots left for visionary salons.
                  </div>
                  <div className="w-full bg-cyan-100 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((3 - diamondSpotsLeft) / 3) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </CardHeader>

            <CardContent className="flex-1 flex flex-col relative z-10">
              {/* Features */}
              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <div className="mt-auto">
                {plan.tier === 'diamond' && isDiamondFull ? (
                  <Button
                    className="w-full bg-gray-400 hover:bg-gray-500 text-white"
                    disabled
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Join Waitlist
                  </Button>
                ) : (
                  <Button
                    className={`w-full text-white transition-all duration-300 ${plan.buttonStyle} ${
                      selectedTier === plan.tier ? 'shadow-lg' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTierSelect(plan.tier);
                    }}
                  >
                    {selectedTier === plan.tier ? 'Selected' : 
                     plan.tier === 'diamond' ? 'Apply Now' : 'Choose Plan'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default EnhancedPricingCards;
