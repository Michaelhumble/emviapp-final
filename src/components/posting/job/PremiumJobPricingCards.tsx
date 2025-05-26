
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, Calendar, MapPin, Award, Star, Trophy, ArrowUp, 
  BarChart, Sparkles, Crown, BadgeCheck, Headset, 
  Diamond, Medal, User, Briefcase, Shield, Zap, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const PremiumJobPricingCards: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [autoRenew, setAutoRenew] = useState(false);
  const [nationwide, setNationwide] = useState(false);

  const durations = [
    { months: 1, label: '1 Month' },
    { months: 3, label: '3 Months', discount: 15 },
    { months: 6, label: '6 Months', discount: 25 },
    { months: 12, label: '12 Months', discount: 40 }
  ];

  const plans = [
    {
      name: 'Free Listing',
      monthlyPrice: 0,
      color: 'from-gray-100 to-gray-200',
      textColor: 'text-gray-700',
      buttonStyle: 'bg-gray-600 hover:bg-gray-700',
      features: [
        { icon: Eye, text: 'Basic visibility' },
        { icon: Calendar, text: '30-day duration' },
        { icon: MapPin, text: 'Standard placement' }
      ],
      cta: 'Post Free Job'
    },
    {
      name: 'Gold Featured',
      monthlyPrice: 49,
      color: 'from-yellow-100 to-amber-200',
      textColor: 'text-amber-800',
      buttonStyle: 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700',
      spotsLeft: 8,
      totalSpots: 15,
      features: [
        { icon: Award, text: 'Featured placement' },
        { icon: Star, text: 'Gold badge' },
        { icon: Trophy, text: 'Priority listing' },
        { icon: Sparkles, text: 'Enhanced visibility' }
      ],
      cta: 'Unlock Gold'
    },
    {
      name: 'Premium Listing',
      monthlyPrice: 99,
      color: 'from-purple-100 to-indigo-200',
      textColor: 'text-purple-800',
      buttonStyle: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700',
      popular: true,
      features: [
        { icon: Crown, text: 'Top placement' },
        { icon: BadgeCheck, text: 'Premium badge' },
        { icon: BarChart, text: 'Analytics dashboard' },
        { icon: Headset, text: 'Priority support' }
      ],
      cta: 'Upgrade Premium'
    },
    {
      name: 'Diamond Exclusive',
      monthlyPrice: 199,
      color: 'from-cyan-100 to-blue-200',
      textColor: 'text-blue-800',
      buttonStyle: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700',
      spotsLeft: 2,
      totalSpots: 5,
      features: [
        { icon: Diamond, text: 'Highest placement' },
        { icon: Medal, text: 'Diamond badge' },
        { icon: User, text: 'Personal manager' },
        { icon: BarChart, text: 'Exclusive analytics' }
      ],
      cta: 'Apply Diamond'
    }
  ];

  const calculatePrice = (basePrice: number) => {
    if (basePrice === 0) return 0;
    
    const selectedDurationData = durations.find(d => d.months === selectedDuration);
    const discount = selectedDurationData?.discount || 0;
    const discountedPrice = basePrice * (1 - discount / 100);
    
    return autoRenew ? discountedPrice * 0.9 : discountedPrice;
  };

  const calculateTotalPrice = (basePrice: number) => {
    const monthlyPrice = calculatePrice(basePrice);
    return monthlyPrice * selectedDuration;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Duration Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h3 className="text-xl font-semibold mb-4">Choose Your Duration</h3>
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {durations.map((duration) => (
            <motion.button
              key={duration.months}
              onClick={() => setSelectedDuration(duration.months)}
              className={`px-4 py-2 rounded-full border-2 transition-all ${
                selectedDuration === duration.months
                  ? 'border-purple-500 bg-purple-500 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-purple-300'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {duration.label}
              {duration.discount && (
                <span className="ml-1 text-xs bg-green-500 text-white px-1 rounded">
                  -{duration.discount}%
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Toggles */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRenew}
              onChange={(e) => setAutoRenew(e.target.checked)}
              className="w-4 h-4 text-purple-600"
            />
            <span className="text-sm">Auto-renew (save 10%)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={nationwide}
              onChange={(e) => setNationwide(e.target.checked)}
              className="w-4 h-4 text-purple-600"
            />
            <span className="text-sm">Nationwide visibility</span>
          </label>
        </div>
      </motion.div>

      {/* Spots Left Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-6 mb-8"
      >
        <div className="bg-gradient-to-r from-yellow-100 to-amber-100 px-4 py-2 rounded-full border border-yellow-200">
          <span className="text-sm font-medium text-amber-800">
            🥇 {plans[1].spotsLeft}/{plans[1].totalSpots} Gold spots left
          </span>
        </div>
        <div className="bg-gradient-to-r from-cyan-100 to-blue-100 px-4 py-2 rounded-full border border-cyan-200">
          <span className="text-sm font-medium text-blue-800">
            💎 {plans[3].spotsLeft}/{plans[3].totalSpots} Diamond spots left
          </span>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </span>
              </div>
            )}
            
            <Card className={`h-full relative overflow-hidden border-0 shadow-xl bg-gradient-to-br ${plan.color} backdrop-blur-sm`}>
              <CardContent className="p-6 h-full flex flex-col">
                <div className="text-center mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${plan.textColor}`}>
                    {plan.name}
                  </h3>
                  
                  <div className="mb-4">
                    <span className={`text-3xl font-bold ${plan.textColor}`}>
                      ${calculatePrice(plan.monthlyPrice).toFixed(0)}
                    </span>
                    <span className="text-sm text-gray-600">/month</span>
                  </div>
                  
                  {selectedDuration > 1 && (
                    <div className="text-sm text-gray-600">
                      Total: ${calculateTotalPrice(plan.monthlyPrice).toFixed(0)} 
                      ({selectedDuration} months)
                    </div>
                  )}
                </div>

                <div className="flex-grow space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <feature.icon className={`h-5 w-5 ${plan.textColor}`} />
                      <span className="text-sm text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full ${plan.buttonStyle} text-white font-semibold py-3 rounded-lg transition-all hover:scale-105 shadow-lg`}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* All Plans Include */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 p-6"
      >
        <h4 className="text-center text-lg font-semibold text-gray-800 mb-4">
          All plans include
        </h4>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-700">Premium Support</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-gray-700">Instant Activation</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-gray-700">Cancel Anytime</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumJobPricingCards;
