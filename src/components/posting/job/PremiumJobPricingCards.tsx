
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, Calendar, MapPin, Award, Star, Trophy, BarChart, 
  Crown, Certificate, Presentation, Headset, Diamond, 
  Medal, Briefcase, Sparkles, Shield, Clock, Users 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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

  // Mock data for spots left (this would come from backend in real app)
  const spotsData = {
    gold: { left: 8, total: 15 },
    premium: { left: 12, total: 20 },
    diamond: { left: 2, total: 5 }
  };

  const durationOptions = [
    { months: 1, label: '1 Month', discount: 0 },
    { months: 3, label: '3 Months', discount: 10 },
    { months: 6, label: '6 Months', discount: 15 },
    { months: 12, label: '12 Months', discount: 20 }
  ];

  const calculatePrice = (basePrice: number, duration: number, discount: number) => {
    const totalPrice = basePrice * duration;
    const discountAmount = (totalPrice * discount) / 100;
    return totalPrice - discountAmount;
  };

  const plans = [
    {
      id: 'free',
      name: 'Free Listing',
      basePrice: 0,
      originalPrice: 0,
      badge: null,
      gradient: 'from-gray-50 to-gray-100',
      borderColor: 'border-gray-200',
      features: [
        { icon: Eye, text: 'Basic visibility', color: 'text-gray-500' },
        { icon: Calendar, text: '30-day duration', color: 'text-gray-500' },
        { icon: MapPin, text: 'Standard placement', color: 'text-gray-500' }
      ]
    },
    {
      id: 'gold',
      name: 'Gold Featured',
      basePrice: 19.99,
      originalPrice: 29.99,
      badge: { text: `${spotsData.gold.left}/${spotsData.gold.total} spots left`, color: 'bg-amber-100 text-amber-800' },
      gradient: 'from-amber-50 to-yellow-50',
      borderColor: 'border-amber-200',
      glowColor: 'shadow-amber-100/50',
      features: [
        { icon: Award, text: 'Featured placement', color: 'text-amber-600' },
        { icon: Star, text: 'Gold badge', color: 'text-amber-600' },
        { icon: Trophy, text: 'Priority listing', color: 'text-amber-600' },
        { icon: BarChart, text: 'Enhanced visibility', color: 'text-amber-600' }
      ]
    },
    {
      id: 'premium',
      name: 'Premium Listing',
      basePrice: 39.99,
      originalPrice: 59.99,
      badge: { text: 'Most Popular', color: 'bg-purple-100 text-purple-800' },
      gradient: 'from-purple-50 to-indigo-50',
      borderColor: 'border-purple-200',
      glowColor: 'shadow-purple-100/50',
      features: [
        { icon: Crown, text: 'Top placement', color: 'text-purple-600' },
        { icon: Certificate, text: 'Premium badge', color: 'text-purple-600' },
        { icon: Presentation, text: 'Analytics dashboard', color: 'text-purple-600' },
        { icon: Headset, text: 'Priority support', color: 'text-purple-600' }
      ]
    },
    {
      id: 'diamond',
      name: 'Diamond Exclusive',
      basePrice: 999.99,
      originalPrice: 1199.99,
      badge: { text: `${spotsData.diamond.left}/${spotsData.diamond.total} spots left`, color: 'bg-cyan-100 text-cyan-800' },
      gradient: 'from-cyan-50 to-blue-50',
      borderColor: 'border-cyan-200',
      glowColor: 'shadow-cyan-100/50',
      features: [
        { icon: Diamond, text: 'Highest placement', color: 'text-cyan-600' },
        { icon: Medal, text: 'Diamond badge', color: 'text-cyan-600' },
        { icon: Briefcase, text: 'Personal manager', color: 'text-cyan-600' },
        { icon: Sparkles, text: 'Exclusive analytics', color: 'text-cyan-600' }
      ]
    }
  ];

  const handlePlanSelect = (planId: string, basePrice: number) => {
    const discount = durationOptions.find(d => d.months === selectedDuration)?.discount || 0;
    let finalPrice = planId === 'diamond' ? 999.99 : calculatePrice(basePrice, selectedDuration, discount);
    
    // Add nationwide fee if selected
    if (nationwide && basePrice > 0) {
      finalPrice += 5;
    }

    onPricingSelect(planId, finalPrice, planId === 'diamond' ? 12 : selectedDuration);
  };

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Spots Left Indicators */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center gap-6 mb-8"
      >
        {[
          { name: 'Gold', data: spotsData.gold, color: 'amber' },
          { name: 'Premium', data: spotsData.premium, color: 'purple' },
          { name: 'Diamond', data: spotsData.diamond, color: 'cyan' }
        ].map((spot) => (
          <div key={spot.name} className="text-center">
            <div className={`text-sm font-medium text-${spot.color}-700 mb-1`}>
              {spot.name}: {spot.data.left}/{spot.data.total} spots left
            </div>
            <Progress 
              value={(spot.data.left / spot.data.total) * 100} 
              className={`w-24 h-2 bg-${spot.color}-100`}
            />
          </div>
        ))}
      </motion.div>

      {/* Duration Selector */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-200">
          <div className="flex gap-1">
            {durationOptions.map((option) => (
              <button
                key={option.months}
                onClick={() => setSelectedDuration(option.months)}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  selectedDuration === option.months
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {option.label}
                {option.discount > 0 && (
                  <span className="block text-xs opacity-80">
                    {option.discount}% off
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Options Toggles */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-8 mb-12"
      >
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={autoRenew}
            onChange={(e) => setAutoRenew(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="font-medium text-gray-700">Auto-renew (Save 5%)</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={nationwide}
            onChange={(e) => setNationwide(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="font-medium text-gray-700">Nationwide visibility (+$5)</span>
        </label>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {plans.map((plan, index) => {
          const discount = durationOptions.find(d => d.months === selectedDuration)?.discount || 0;
          const finalPrice = plan.id === 'diamond' ? 999.99 : calculatePrice(plan.basePrice, selectedDuration, discount);
          const nationwidePrice = nationwide && plan.basePrice > 0 ? 5 : 0;
          const totalPrice = finalPrice + nationwidePrice;

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`relative bg-gradient-to-br ${plan.gradient} backdrop-blur-xl rounded-3xl border-2 ${plan.borderColor} p-8 shadow-xl ${plan.glowColor || ''} hover:shadow-2xl transition-all duration-300`}
            >
              {/* Badge */}
              {plan.badge && (
                <Badge className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${plan.badge.color} border-0 px-4 py-1 font-semibold`}>
                  {plan.badge.text}
                </Badge>
              )}

              {/* Plan Name */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-4xl font-bold text-gray-900">${totalPrice.toFixed(2)}</span>
                  {plan.originalPrice > plan.basePrice && (
                    <span className="text-lg text-gray-500 line-through">${plan.originalPrice}</span>
                  )}
                </div>
                {plan.id === 'diamond' && (
                  <p className="text-sm text-gray-600 mt-1">Annual Only</p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <feature.icon className={`h-5 w-5 ${feature.color}`} />
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                onClick={() => handlePlanSelect(plan.id, plan.basePrice)}
                className={`w-full py-4 text-lg font-semibold rounded-xl transition-all duration-200 ${
                  plan.id === 'free'
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                    : plan.id === 'gold'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg'
                    : plan.id === 'premium'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg'
                }`}
              >
                {plan.id === 'free' ? 'Get Started' : 
                 plan.id === 'diamond' ? 'Apply Now' : 'Upgrade Now'}
              </Button>
            </motion.div>
          );
        })}
      </div>

      {/* All Plans Include */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 text-center"
      >
        <h4 className="font-semibold text-gray-900 mb-4">All plans include</h4>
        <div className="flex justify-center gap-8 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Headset className="h-4 w-4 text-green-500" />
            <span>Premium Support</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>Instant Activation</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-purple-500" />
            <span>Cancel Anytime</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumJobPricingCards;
