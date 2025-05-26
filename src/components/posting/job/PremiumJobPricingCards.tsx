
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, Crown, Star, Diamond, Clock, Users, Flame, Shield, Globe, Zap } from 'lucide-react';
import { calculatePricing } from '@/utils/posting/pricing';
import { JobPricingTier } from '@/utils/posting/types';

interface PremiumJobPricingCardsProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const PremiumJobPricingCards: React.FC<PremiumJobPricingCardsProps> = ({
  onPricingSelect,
  jobData
}) => {
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>('gold');
  const [durationMonths, setDurationMonths] = useState(1);
  const [autoRenew, setAutoRenew] = useState(false);
  const [isNationwide, setIsNationwide] = useState(false);
  const [goldSpotsLeft] = useState(8);
  const [premiumSpotsLeft] = useState(5);
  const [timeLeft, setTimeLeft] = useState('47:32:15');

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = now + (47 * 60 * 60 * 1000) + (32 * 60 * 1000) + (15 * 1000);
      const distance = endTime - now;
      
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const pricingPlans = [
    {
      tier: 'free' as JobPricingTier,
      name: 'Free Listing',
      price: 0,
      originalPrice: 0,
      icon: <Check className="h-6 w-6 text-gray-500" />,
      gradient: 'from-gray-50 to-slate-50',
      borderColor: 'border-gray-200',
      features: ['Basic visibility', '30-day duration', 'Standard search placement'],
      badge: null,
      spotsLeft: null
    },
    {
      tier: 'gold' as JobPricingTier,
      name: 'Gold Featured',
      price: 19.99,
      originalPrice: 24.99,
      icon: <Star className="h-6 w-6 text-amber-500" />,
      gradient: 'from-amber-50/80 via-yellow-50/60 to-orange-50/40',
      borderColor: 'border-amber-300',
      features: ['⭐ Featured placement', '🏆 Gold badge highlight', '📈 2x more visibility', '⚡ Priority in search'],
      badge: 'Most Popular',
      spotsLeft: goldSpotsLeft
    },
    {
      tier: 'premium' as JobPricingTier,
      name: 'Premium Listing',
      price: 39.99,
      originalPrice: 49.99,
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      gradient: 'from-purple-50/80 via-indigo-50/60 to-blue-50/40',
      borderColor: 'border-purple-300',
      features: ['👑 Top placement guarantee', '💎 Premium badge', '📊 Advanced analytics', '🎯 Targeted promotion'],
      badge: 'Best Value',
      spotsLeft: premiumSpotsLeft
    },
    {
      tier: 'diamond' as JobPricingTier,
      name: 'Diamond Exclusive',
      price: 999.99,
      originalPrice: 1199.99,
      icon: <Diamond className="h-6 w-6 text-cyan-500" />,
      gradient: 'from-cyan-50/80 via-blue-50/60 to-indigo-50/40',
      borderColor: 'border-cyan-300',
      features: ['💎 Highest placement', '👨‍💼 Personal manager', '🎨 Custom styling', '📞 Priority support'],
      badge: 'Annual Only',
      spotsLeft: 2
    }
  ];

  const handleTierSelect = (tier: JobPricingTier) => {
    setSelectedTier(tier);
  };

  const handleProceed = () => {
    const months = selectedTier === 'diamond' ? 12 : durationMonths;
    const { finalPrice } = calculatePricing(
      selectedTier,
      months,
      autoRenew,
      false,
      isNationwide
    );
    
    onPricingSelect(selectedTier, finalPrice, months);
  };

  const getDurationOptions = () => [
    { months: 1, label: '1 Month', discount: 0 },
    { months: 3, label: '3 Months', discount: 10 },
    { months: 6, label: '6 Months', discount: 15 },
    { months: 12, label: '1 Year', discount: 20 }
  ];

  const getDisplayPrice = (plan: any) => {
    if (plan.tier === 'free') return '$0';
    if (plan.tier === 'diamond') return '$999.99/year';
    
    const months = selectedTier === plan.tier ? durationMonths : 1;
    const { finalPrice } = calculatePricing(
      plan.tier,
      months,
      autoRenew && selectedTier === plan.tier,
      false,
      isNationwide && selectedTier === plan.tier
    );
    
    return `$${finalPrice.toFixed(2)}`;
  };

  return (
    <div className="space-y-8">
      {/* Scarcity Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-red-500" />
            <span className="font-bold text-red-700">Price increase in: {timeLeft}</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-orange-700">Limited spots remaining</span>
          </div>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.tier}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              y: -8,
              transition: { duration: 0.2 }
            }}
            className="relative"
          >
            <Card className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
              selectedTier === plan.tier 
                ? 'ring-2 ring-purple-500 shadow-xl transform scale-105' 
                : 'hover:shadow-lg'
            } ${plan.borderColor} backdrop-blur-sm`}>
              
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-60`} />
              
              {/* Popular/Recommended Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className={`${
                    plan.tier === 'gold' ? 'bg-gradient-to-r from-amber-500 to-yellow-500' :
                    plan.tier === 'premium' ? 'bg-gradient-to-r from-purple-500 to-indigo-500' :
                    'bg-gradient-to-r from-cyan-500 to-blue-500'
                  } text-white border-0 px-4 py-1 text-xs font-bold shadow-lg`}>
                    {plan.badge}
                  </Badge>
                </div>
              )}

              {/* Spots Left Indicator */}
              {plan.spotsLeft && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                    <Users className="h-3 w-3" />
                    {plan.spotsLeft} left
                  </div>
                </div>
              )}

              <CardContent 
                className="relative z-10 p-6 h-full flex flex-col"
                onClick={() => handleTierSelect(plan.tier)}
              >
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="mb-3">{plan.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  
                  {/* Pricing */}
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">
                      {getDisplayPrice(plan)}
                    </div>
                    {plan.originalPrice > plan.price && plan.tier !== 'free' && (
                      <div className="text-sm text-gray-500 line-through">
                        ${plan.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Select Button */}
                <Button
                  className={`w-full ${
                    selectedTier === plan.tier
                      ? plan.tier === 'gold' ? 'bg-amber-500 hover:bg-amber-600' :
                        plan.tier === 'premium' ? 'bg-purple-500 hover:bg-purple-600' :
                        plan.tier === 'diamond' ? 'bg-cyan-500 hover:bg-cyan-600' :
                        'bg-purple-500 hover:bg-purple-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } transition-all duration-200`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTierSelect(plan.tier);
                  }}
                >
                  {selectedTier === plan.tier ? (
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      Selected
                    </div>
                  ) : (
                    'Select Plan'
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Duration Selection - Only for non-Diamond plans */}
      {selectedTier !== 'diamond' && selectedTier !== 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 text-center">Choose Duration & Save More</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {getDurationOptions().map((option) => (
              <motion.button
                key={option.months}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setDurationMonths(option.months)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  durationMonths === option.months
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-semibold">{option.label}</div>
                  {option.discount > 0 && (
                    <Badge className="mt-1 bg-green-100 text-green-700 text-xs">
                      Save {option.discount}%
                    </Badge>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Add-on Options */}
      {selectedTier !== 'free' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-lg space-y-4"
        >
          <h3 className="text-lg font-semibold mb-4">Boost Your Reach</h3>
          
          {/* Auto-renew Toggle */}
          {selectedTier !== 'diamond' && durationMonths === 1 && (
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3">
                <Zap className="h-5 w-5 text-green-600" />
                <div>
                  <Label className="font-medium text-green-800">Auto-renew Monthly</Label>
                  <p className="text-sm text-green-600">Save 5% with automatic renewal</p>
                </div>
              </div>
              <Switch checked={autoRenew} onCheckedChange={setAutoRenew} />
            </div>
          )}

          {/* Nationwide Visibility */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-blue-600" />
              <div>
                <Label className="font-medium text-blue-800">Nationwide Visibility</Label>
                <p className="text-sm text-blue-600">Reach candidates in all 50 states (+$5)</p>
              </div>
            </div>
            <Switch checked={isNationwide} onCheckedChange={setIsNationwide} />
          </div>
        </motion.div>
      )}

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center gap-2 flex-wrap">
          {['Luxe Beauty Studio', 'Salon Magnifique', 'The Hair Collective'].map((salon, idx) => (
            <motion.div
              key={salon}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + idx * 0.1 }}
            >
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Shield className="h-3 w-3 mr-1" />
                {salon} just upgraded
              </Badge>
            </motion.div>
          ))}
        </div>
        
        <div className="text-sm text-gray-500">
          🔒 Secure payment • 30-day money-back guarantee • Cancel anytime
        </div>
      </motion.div>

      {/* Proceed Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <Button
          onClick={handleProceed}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-12 py-4 rounded-xl font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
        >
          Continue with {selectedTier === 'free' ? 'Free' : 
                        selectedTier === 'gold' ? 'Gold' :
                        selectedTier === 'premium' ? 'Premium' : 'Diamond'} Plan →
        </Button>
      </motion.div>
    </div>
  );
};

export default PremiumJobPricingCards;
