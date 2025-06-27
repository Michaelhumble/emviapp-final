
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Crown, Diamond, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface PremiumJobPricingCardsProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const PremiumJobPricingCards: React.FC<PremiumJobPricingCardsProps> = ({ 
  onPricingSelect,
  jobData 
}) => {
  const [selectedTier, setSelectedTier] = useState<string>('');

  const pricingPlans = [
    {
      id: 'gold',
      name: 'Gold Featured',
      price: 19.99,
      originalPrice: 29.99,
      duration: 30,
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      badge: 'Most Popular',
      badgeColor: 'bg-yellow-100 text-yellow-800',
      features: [
        'Featured placement in job listings',
        'Gold badge highlighting',
        'Priority in search results',
        '30-day active listing',
        'Email application notifications'
      ],
      color: 'border-yellow-200 hover:border-yellow-300'
    },
    {
      id: 'premium',
      name: 'Premium Boost',
      price: 39.99,
      originalPrice: 49.99,
      duration: 30,
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      badge: 'Best Value',
      badgeColor: 'bg-purple-100 text-purple-800',
      features: [
        'Top placement in all listings',
        'Premium badge highlighting',
        'Boost in search algorithms',
        'Social media promotion',
        'Advanced analytics dashboard',
        'Direct message from candidates'
      ],
      color: 'border-purple-200 hover:border-purple-300'
    },
    {
      id: 'diamond',
      name: 'Diamond Elite',
      price: 999.99,
      originalPrice: 1199.99,
      duration: 365,
      icon: <Diamond className="h-6 w-6 text-cyan-500" />,
      badge: 'Exclusive',
      badgeColor: 'bg-cyan-100 text-cyan-800',
      features: [
        'Highest priority placement',
        'Diamond exclusive badge',
        'Personal account manager',
        'Custom promotion campaign',
        'Full year visibility',
        'VIP candidate screening',
        'Dedicated support line'
      ],
      color: 'border-cyan-200 hover:border-cyan-300'
    }
  ];

  const handleSelect = (plan: any) => {
    setSelectedTier(plan.id);
    onPricingSelect(plan.id, plan.price, plan.id === 'diamond' ? 12 : 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Choose Your Perfect{' '}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Job Plan
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Get your job posting in front of the right candidates with our premium plans
        </motion.p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`relative h-full ${plan.color} ${selectedTier === plan.id ? 'ring-2 ring-purple-500' : ''} transition-all duration-300`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className={plan.badgeColor}>
                    <Zap className="h-3 w-3 mr-1" />
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {plan.id === 'diamond' ? 'Annual Plan Only' : '30-day listing'}
                  </p>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  onClick={() => handleSelect(plan)}
                  className={`w-full ${
                    selectedTier === plan.id
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gray-900 hover:bg-gray-800'
                  } transition-colors`}
                  size="lg"
                >
                  {selectedTier === plan.id ? 'Selected' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12 space-y-4"
      >
        <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Secure Payment</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>30-Day Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Instant Activation</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumJobPricingCards;
