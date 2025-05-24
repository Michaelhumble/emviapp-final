
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Crown, Zap, Star, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PremiumPricingTableProps {
  onPlanSelect: (plan: PricingPlan) => void;
  selectedPlan?: string;
  isFirstPost?: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  description: string;
  features: string[];
  badge?: string;
  badgeColor?: string;
  popular?: boolean;
  exclusive?: boolean;
  spotsLeft?: number;
  savings?: string;
}

const PremiumPricingTable: React.FC<PremiumPricingTableProps> = ({
  onPlanSelect,
  selectedPlan,
  isFirstPost = false
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | '3months' | 'diamond'>('monthly');

  const plans: PricingPlan[] = [
    {
      id: 'standard',
      name: 'Standard',
      price: 24.99,
      duration: 'month',
      description: 'Great for short-term posts',
      features: [
        'Active for 30 days',
        'Basic listing visibility',
        'Contact form included',
        'Mobile optimized',
        'Basic support'
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 49.99,
      originalPrice: 74.97,
      duration: '3 months',
      description: 'Save $25 — Most popular!',
      features: [
        'Active for 90 days',
        'Priority listing placement',
        'Enhanced visibility boost',
        'Verified badge included',
        'Premium support',
        'Auto-renewal available'
      ],
      badge: 'Best Value',
      badgeColor: 'bg-amber-500',
      popular: true,
      savings: 'Save $25'
    },
    {
      id: 'diamond',
      name: 'Diamond',
      price: 999.99,
      duration: 'year',
      description: 'Only 2 left. Exclusive, bid or apply only.',
      features: [
        'Active for 365 days',
        'Top placement guarantee',
        'Exclusive Diamond badge',
        'Priority customer matching',
        'Dedicated account manager',
        'Custom styling options',
        'Advanced analytics'
      ],
      badge: 'Only 2 Left',
      badgeColor: 'bg-purple-600',
      exclusive: true,
      spotsLeft: 2
    }
  ];

  const currentPlans = billingCycle === 'diamond' 
    ? plans.filter(p => p.id === 'diamond')
    : plans.filter(p => p.id !== 'diamond');

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold font-playfair mb-4 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent"
        >
          Fast-Track Your Salon's Success
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-8"
        >
          Premium Listings That Overdeliver
        </motion.p>

        {/* Billing Toggle */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-gray-100 p-1 rounded-full flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={cn(
                'px-6 py-2 rounded-full font-medium transition-all',
                billingCycle === 'monthly' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('3months')}
              className={cn(
                'px-6 py-2 rounded-full font-medium transition-all relative',
                billingCycle === '3months' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              )}
            >
              3 Months
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs">
                Save 33%
              </Badge>
            </button>
            <button
              onClick={() => setBillingCycle('diamond')}
              className={cn(
                'px-6 py-2 rounded-full font-medium transition-all relative',
                billingCycle === 'diamond' 
                  ? 'bg-white text-purple-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              )}
            >
              Diamond
              <Badge className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs">
                Exclusive
              </Badge>
            </button>
          </div>
        </motion.div>
      </div>

      {/* First Post Free Banner */}
      {isFirstPost && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-green-700">
            <Star className="w-5 h-5 fill-current" />
            <span className="font-semibold">First post is free (with card/business info required)</span>
            <Star className="w-5 h-5 fill-current" />
          </div>
        </motion.div>
      )}

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {currentPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index + 0.4 }}
            className={cn(
              'relative',
              plan.popular && 'lg:scale-105'
            )}
          >
            <Card className={cn(
              'relative overflow-hidden border-2 transition-all duration-300 hover:shadow-xl',
              selectedPlan === plan.id 
                ? 'border-purple-500 shadow-lg' 
                : 'border-gray-200 hover:border-purple-300',
              plan.popular && 'border-amber-400 shadow-lg',
              plan.exclusive && 'border-purple-500 bg-gradient-to-br from-purple-50 to-indigo-50'
            )}>
              {/* Badge */}
              {plan.badge && (
                <div className={cn(
                  'absolute top-0 right-0 px-3 py-1 text-white text-sm font-bold rounded-bl-lg',
                  plan.badgeColor || 'bg-purple-600'
                )}>
                  {plan.badge}
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {plan.exclusive && <Crown className="w-6 h-6 text-purple-600" />}
                  {plan.popular && <Zap className="w-6 h-6 text-amber-500" />}
                  <h3 className="text-2xl font-bold font-playfair">{plan.name}</h3>
                </div>
                
                <div className="mb-2">
                  <div className="flex items-center justify-center gap-2">
                    {plan.originalPrice && (
                      <span className="text-2xl text-gray-400 line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                    <span className="text-4xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                  </div>
                  <span className="text-gray-600">/{plan.duration}</span>
                </div>

                <p className="text-gray-600 font-medium">{plan.description}</p>

                {plan.savings && (
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {plan.savings}
                  </Badge>
                )}

                {plan.spotsLeft && (
                  <div className="flex items-center justify-center gap-1 text-red-600 font-semibold">
                    <Clock className="w-4 h-4" />
                    <span>Only {plan.spotsLeft} spots left</span>
                  </div>
                )}
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => onPlanSelect(plan)}
                  className={cn(
                    'w-full py-3 font-semibold transition-all',
                    plan.exclusive 
                      ? 'bg-purple-600 hover:bg-purple-700' 
                      : plan.popular
                      ? 'bg-amber-500 hover:bg-amber-600'
                      : 'bg-purple-600 hover:bg-purple-700'
                  )}
                  disabled={plan.exclusive && !plan.spotsLeft}
                >
                  {plan.exclusive 
                    ? (plan.spotsLeft ? 'Apply for Diamond' : 'Waitlist Only')
                    : 'Choose Plan'
                  }
                </Button>

                {!plan.exclusive && (
                  <p className="text-xs text-gray-500 text-center mt-2">
                    Auto-renew enabled • Cancel anytime
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Bottom Notice */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-center gap-2 text-blue-700 mb-2">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">All paid listings include auto-verification</span>
          </div>
          <p className="text-sm text-blue-600">
            Get verified badge, priority placement, and enhanced visibility instantly
          </p>
        </div>
      </motion.div>

      {/* Test Environment Notice */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg p-3 text-sm">
          <div className="font-semibold text-yellow-800">TEST MODE</div>
          <div className="text-yellow-700">Pricing display in staging</div>
        </div>
      )}
    </div>
  );
};

export default PremiumPricingTable;
