
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Diamond, Star, Crown, Lock, Check } from 'lucide-react';

interface PricingCardsProps {
  diamondSpotsLeft: number;
  maxDiamondSpots: number;
}

const PricingCards = ({ diamondSpotsLeft, maxDiamondSpots }: PricingCardsProps) => {
  const isDiamondFull = diamondSpotsLeft === 0;

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started',
      features: [
        'Basic profile listing',
        'Community access',
        'Limited messaging',
        'Browse public listings'
      ],
      cta: 'Get Started',
      popular: false,
      tier: 'free'
    },
    {
      name: 'Gold',
      price: '$29',
      period: '/month',
      description: 'Most popular for growing salons',
      features: [
        'Featured profile placement',
        'Unlimited messaging',
        'Advanced analytics',
        'Priority support',
        'Marketing toolkit'
      ],
      cta: 'Start Gold',
      popular: true,
      tier: 'gold'
    },
    {
      name: 'Premium',
      price: '$79',
      period: '/month',
      description: 'Advanced features for serious businesses',
      features: [
        'Everything in Gold',
        'AI-powered recommendations',
        'Custom branding',
        'Advanced reporting',
        'Dedicated account manager'
      ],
      cta: 'Go Premium',
      popular: false,
      tier: 'premium'
    },
    {
      name: 'Diamond',
      price: '$999.99',
      period: '/year',
      description: `Ultra-exclusive (${diamondSpotsLeft}/${maxDiamondSpots} spots left)`,
      features: [
        'Everything in Premium',
        'Highest placement priority',
        'Personal account manager',
        'Exclusive styling',
        'Annual-only benefits'
      ],
      cta: isDiamondFull ? 'Join Waitlist' : 'Apply for Diamond',
      popular: false,
      tier: 'diamond',
      disabled: isDiamondFull
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className={`relative ${plan.tier === 'diamond' ? 'lg:scale-110' : ''}`}
        >
          <Card className={`
            relative overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl
            ${plan.popular ? 'border-amber-300 shadow-amber-100' : 'border-gray-200'}
            ${plan.tier === 'diamond' ? 'border-cyan-300 bg-gradient-to-br from-cyan-50 to-blue-50' : 'bg-white'}
            ${plan.disabled ? 'opacity-75' : ''}
          `}>
            {plan.popular && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
            )}
            
            {plan.tier === 'diamond' && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500" />
            )}

            <CardContent className="p-8">
              <div className="text-center">
                {/* Plan Name & Badge */}
                <div className="flex items-center justify-center mb-4">
                  {plan.tier === 'free' && <Star className="h-5 w-5 text-gray-500 mr-2" />}
                  {plan.tier === 'gold' && <Crown className="h-5 w-5 text-amber-500 mr-2" />}
                  {plan.tier === 'premium' && <Star className="h-5 w-5 text-purple-500 mr-2" />}
                  {plan.tier === 'diamond' && <Diamond className="h-5 w-5 text-cyan-500 mr-2" />}
                  
                  <h3 className="text-2xl font-playfair font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  
                  {plan.popular && (
                    <Badge className="ml-2 bg-amber-100 text-amber-800 border-amber-200">
                      Most Popular
                    </Badge>
                  )}
                  
                  {plan.tier === 'diamond' && (
                    <Badge className="ml-2 bg-cyan-100 text-cyan-800 border-cyan-200">
                      {diamondSpotsLeft > 0 ? `${diamondSpotsLeft}/${maxDiamondSpots} Left` : 'Waitlist Only'}
                    </Badge>
                  )}
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-4xl font-bold font-playfair text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 text-lg">{plan.period}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Features */}
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                      <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  className={`
                    w-full font-semibold transition-all duration-300
                    ${plan.tier === 'diamond' 
                      ? isDiamondFull 
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                      : plan.popular
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                    } text-white
                  `}
                  disabled={plan.disabled}
                >
                  {plan.disabled && <Lock className="h-4 w-4 mr-2" />}
                  {plan.cta}
                </Button>

                {plan.tier === 'diamond' && isDiamondFull && (
                  <p className="text-xs text-orange-600 mt-2">
                    All Diamond spots filled. Join waitlist for future openings.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingCards;
