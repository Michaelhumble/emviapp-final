
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Diamond, Sparkles, Shield } from 'lucide-react';
import { DurationSelector } from '../pricing/DurationSelector';

interface JobPricingTableProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const JobPricingTable: React.FC<JobPricingTableProps> = ({ onPricingSelect, jobData }) => {
  const [selectedTier, setSelectedTier] = useState<string>('premium');
  const [durationMonths, setDurationMonths] = useState(1);

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free Listing',
      emotiveTitle: 'Shine',
      price: 0,
      originalPrice: null,
      duration: '30 days',
      icon: <Star className="h-6 w-6 text-gray-500" />,
      badge: null,
      gradient: 'from-gray-50 to-gray-100',
      features: [
        '👁️ Basic search visibility',
        '📅 30-day duration',
        '📍 Standard placement',
        '🔒 Secure posting'
      ],
      buttonText: 'Start Free',
      buttonClass: 'bg-gray-600 hover:bg-gray-700 text-white'
    },
    {
      id: 'gold',
      name: 'Gold Featured',
      emotiveTitle: 'Stand Out',
      price: 19.99,
      originalPrice: null,
      duration: '30 days',
      icon: <Star className="h-6 w-6 text-amber-500" />,
      badge: 'POPULAR',
      badgeColor: 'bg-amber-100 text-amber-700 border-amber-300',
      gradient: 'from-amber-50 to-yellow-50',
      features: [
        '🏆 Featured placement above standard',
        '⭐ Gold badge highlight',
        '👁️ Enhanced visibility',
        '📈 Basic analytics',
        '🤝 Priority support'
      ],
      buttonText: 'Select Gold',
      buttonClass: 'bg-amber-500 hover:bg-amber-600 text-white'
    },
    {
      id: 'premium',
      name: 'Premium Listing',
      emotiveTitle: 'Go Pro',
      price: 39.99,
      originalPrice: null,
      duration: '30 days',
      icon: <Crown className="h-6 w-6 text-purple-500" />,
      badge: 'RECOMMENDED',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-300',
      gradient: 'from-purple-50 to-indigo-50',
      features: [
        '👑 Premium placement above Gold',
        '💎 Premium badge & styling',
        '📊 Advanced analytics dashboard',
        '🚀 Priority support & consultation',
        '🎯 Targeted visibility boost'
      ],
      buttonText: 'Select Premium',
      buttonClass: 'bg-purple-600 hover:bg-purple-700 text-white',
      isRecommended: true
    },
    {
      id: 'diamond',
      name: 'Diamond Exclusive',
      emotiveTitle: 'Diamond Elite',
      price: 999.99,
      originalPrice: 1199.99,
      duration: '1 year',
      icon: <Diamond className="h-6 w-6 text-cyan-500" />,
      badge: 'ANNUAL ONLY',
      badgeColor: 'bg-cyan-100 text-cyan-700 border-cyan-300',
      gradient: 'from-cyan-50 to-blue-50',
      features: [
        '💎 Highest diamond placement',
        '🏆 Diamond badge & exclusive styling',
        '👤 Personal account manager',
        '📈 Premium analytics & insights',
        '🌟 Annual exclusive benefits',
        '🎯 Industry spotlight feature'
      ],
      buttonText: 'Apply for Diamond',
      buttonClass: 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white',
      isAnnualOnly: true
    }
  ];

  const handlePlanSelect = (planId: string) => {
    const plan = pricingPlans.find(p => p.id === planId);
    if (!plan) return;

    setSelectedTier(planId);
    
    // For Diamond, always use 12 months and fixed price
    if (planId === 'diamond') {
      onPricingSelect(planId, 999.99, 12);
    } else {
      onPricingSelect(planId, plan.price, durationMonths);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,107,0.08),transparent_50%)]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Supercharge Your Salon's
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent block">
              Success
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium mb-4">
            Choose Your Visibility Level
          </p>
          
          <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Every plan unlocks new ways to attract talent, win more clients, and grow your brand—
            <span className="font-semibold text-gray-800">risk-free, with no hidden fees.</span>
          </p>
          
          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Shield className="h-4 w-4 text-green-500" />
              <span>Secure PCI-compliant checkout</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span>No hidden fees</span>
            </div>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative ${plan.isRecommended ? 'lg:scale-105' : ''}`}
            >
              <Card className={`
                relative overflow-hidden cursor-pointer transition-all duration-300
                ${selectedTier === plan.id 
                  ? 'ring-2 ring-purple-500 shadow-2xl' 
                  : 'hover:shadow-xl hover:-translate-y-1'
                }
                bg-gradient-to-br ${plan.gradient} backdrop-blur-md
                border-0 shadow-lg
              `}>
                {/* Discount Badge */}
                {plan.originalPrice && (
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 transform rotate-45 translate-x-2 translate-y-3 uppercase font-semibold">
                      Save $200
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  {/* Badge */}
                  {plan.badge && (
                    <Badge className={`absolute top-4 left-4 ${plan.badgeColor} font-semibold text-xs`}>
                      {plan.badge}
                    </Badge>
                  )}

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    {plan.icon}
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {plan.emotiveTitle}
                  </p>

                  {/* Pricing */}
                  <div className="mt-4">
                    <div className="flex items-end justify-center gap-2">
                      {plan.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">
                          ${plan.originalPrice}
                        </span>
                      )}
                      <span className="text-3xl md:text-4xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      {plan.isAnnualOnly && (
                        <span className="text-sm text-gray-600 mb-1">/year</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {plan.isAnnualOnly ? 'Annual Only' : `for ${plan.duration}`}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full ${plan.buttonClass} font-semibold py-3 transition-all duration-300`}
                    disabled={selectedTier === plan.id}
                  >
                    {selectedTier === plan.id ? 'Selected' : plan.buttonText}
                  </Button>

                  {/* Trust Message */}
                  <p className="text-xs text-center text-gray-500 mt-3">
                    {plan.id === 'free' 
                      ? 'No credit card required'
                      : 'Secure checkout • Cancel anytime'
                    }
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Duration Selector - Only for non-Diamond plans */}
        {selectedTier !== 'diamond' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <DurationSelector
              durationMonths={durationMonths}
              onDurationChange={setDurationMonths}
              selectedPricingTier={selectedTier}
            />
          </motion.div>
        )}

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Button
            onClick={() => {
              const plan = pricingPlans.find(p => p.id === selectedTier);
              if (plan) {
                if (selectedTier === 'diamond') {
                  onPricingSelect(selectedTier, 999.99, 12);
                } else {
                  onPricingSelect(selectedTier, plan.price, durationMonths);
                }
              }
            }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Continue with {selectedTier === 'free' ? 'Free' : 
                           selectedTier === 'gold' ? 'Gold' :
                           selectedTier === 'premium' ? 'Premium' : 'Diamond'} Plan
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default JobPricingTable;
