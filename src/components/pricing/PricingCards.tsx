
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Diamond, Lock, Users } from 'lucide-react';

interface PricingCardsProps {
  diamondSpotsLeft?: number;
  maxDiamondSpots?: number;
}

const PricingCards = ({ diamondSpotsLeft = 1, maxDiamondSpots = 3 }: PricingCardsProps) => {
  const plans = [
    {
      id: 'free',
      name: 'Free Listing',
      price: '$0',
      period: '/month',
      description: 'Perfect for testing the waters',
      features: [
        'Basic search visibility',
        '30-day duration',
        'Standard placement',
        'Secure posting'
      ],
      buttonText: 'Start Free',
      buttonVariant: 'outline' as const,
      icon: <Check className="h-5 w-5 text-gray-500" />,
      popular: false
    },
    {
      id: 'gold',
      name: 'Gold Featured',
      price: '$19.99',
      period: '/month',
      description: 'Stand out from the competition',
      spotsLeft: '8/15 spots remaining',
      features: [
        'Featured placement above standard',
        'Gold badge highlight', 
        'Enhanced visibility',
        'Basic analytics',
        'Priority support'
      ],
      buttonText: 'Unlock Gold Now',
      buttonVariant: 'default' as const,
      icon: <Star className="h-5 w-5 text-amber-500" />,
      popular: false,
      gradient: 'from-amber-50 to-yellow-50',
      borderColor: 'border-amber-200'
    },
    {
      id: 'premium',
      name: 'Premium Listing',
      price: '$39.99',
      period: '/month',
      description: 'Maximum impact for serious growth',
      features: [
        'Premium placement above Gold',
        'Premium badge & styling',
        'Advanced analytics dashboard',
        'Priority support & consultation',
        'Targeted visibility boost'
      ],
      buttonText: 'Upgrade to Premium',
      buttonVariant: 'default' as const,
      icon: <Crown className="h-5 w-5 text-purple-500" />,
      popular: true,
      gradient: 'from-purple-50 to-indigo-50',
      borderColor: 'border-indigo-200'
    },
    {
      id: 'diamond',
      name: 'Diamond Exclusive',
      price: '$999.99',
      period: '/year only',
      description: 'Elite tier for industry leaders',
      spotsLeft: `${diamondSpotsLeft}/${maxDiamondSpots} spots remaining`,
      features: [
        'Highest diamond placement',
        'Diamond badge & exclusive styling',
        'Personal account manager',
        'Premium analytics & insights',
        'Annual exclusive benefits'
      ],
      buttonText: diamondSpotsLeft > 0 ? 'Apply for Diamond' : 'Join Waitlist',
      buttonVariant: 'default' as const,
      icon: <Diamond className="h-5 w-5 text-cyan-500" />,
      popular: false,
      gradient: 'from-cyan-50 to-blue-50',
      borderColor: 'border-blue-200',
      exclusive: true,
      disabled: diamondSpotsLeft === 0
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          <Card className={`
            h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl
            ${plan.gradient ? `bg-gradient-to-br ${plan.gradient}` : 'bg-white'}
            ${plan.borderColor || 'border-gray-200'}
            ${plan.popular ? 'ring-2 ring-purple-500 ring-offset-2' : ''}
            ${plan.exclusive ? 'ring-2 ring-cyan-500 ring-offset-2' : ''}
          `}>
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-purple-600 text-white px-3 py-1">
                  RECOMMENDED
                </Badge>
              </div>
            )}

            {/* Exclusive Badge */}
            {plan.exclusive && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Badge className="bg-cyan-600 text-white px-3 py-1">
                  INVITE ONLY
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-2">
              <div className="flex justify-center mb-2">{plan.icon}</div>
              <CardTitle className="text-xl">{plan.name}</CardTitle>
              <p className="text-sm text-gray-600">{plan.description}</p>
              
              {/* Spots Remaining */}
              {plan.spotsLeft && (
                <div className="mt-2">
                  <div className={`
                    text-xs font-medium px-3 py-1 rounded-full inline-flex items-center gap-1
                    ${plan.id === 'diamond' 
                      ? 'bg-cyan-100 text-cyan-800 border border-cyan-200' 
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }
                  `}>
                    <Users className="h-3 w-3" />
                    {plan.spotsLeft}
                  </div>
                  
                  {/* Progress Bar */}
                  {plan.id === 'diamond' && (
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(diamondSpotsLeft / maxDiamondSpots) * 100}%` }}
                      />
                    </div>
                  )}
                </div>
              )}
            </CardHeader>

            <CardContent className="pt-0">
              {/* Pricing */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold">{plan.price}</div>
                <div className="text-sm text-gray-500">{plan.period}</div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm">
                    <Check className={`
                      h-4 w-4 mr-2 mt-0.5 flex-shrink-0
                      ${plan.id === 'diamond' ? 'text-cyan-500' :
                        plan.id === 'premium' ? 'text-purple-500' :
                        plan.id === 'gold' ? 'text-amber-500' : 'text-gray-500'
                      }
                    `} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                className={`
                  w-full 
                  ${plan.id === 'diamond' && diamondSpotsLeft === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : plan.id === 'diamond' 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600' 
                    : plan.id === 'premium'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
                    : plan.id === 'gold'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600'
                    : ''
                  }
                `}
                variant={plan.buttonVariant}
                disabled={plan.disabled}
              >
                {plan.disabled && <Lock className="h-4 w-4 mr-2" />}
                {plan.buttonText}
              </Button>

              {/* Waitlist Message */}
              {plan.id === 'diamond' && diamondSpotsLeft === 0 && (
                <p className="text-xs text-gray-600 text-center mt-2">
                  All Diamond spots filled! Join waitlist for future openings.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingCards;
