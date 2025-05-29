
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface SalonPricingStepProps {
  pricingOptions: any;
  setPricingOptions: React.Dispatch<React.SetStateAction<any>>;
}

const SalonPricingStep: React.FC<SalonPricingStepProps> = ({ 
  pricingOptions, 
  setPricingOptions 
}) => {
  const [selectedPlan, setSelectedPlan] = useState('3months');

  const plans = [
    {
      id: '1month',
      title: '1 tháng / 1 month',
      price: '$19.99',
      originalPrice: '$24.99',
      discount: '20% off',
      icon: Zap,
      color: 'from-blue-500 to-blue-600',
      features: [
        'Basic listing visibility',
        '30-day duration',
        'Standard placement',
        'Email support'
      ]
    },
    {
      id: '3months', 
      title: '3 tháng / 3 months',
      price: '$49.99',
      originalPrice: '$74.97',
      discount: '33% off',
      popular: true,
      icon: Star,
      color: 'from-purple-500 to-purple-600',
      features: [
        'Featured placement',
        'Priority in search',
        'Extended visibility',
        'Email alerts to buyers',
        'Social media promotion'
      ]
    },
    {
      id: '6months',
      title: '6 tháng / 6 months', 
      price: '$89.99',
      originalPrice: '$149.94',
      discount: '40% off',
      bestValue: true,
      icon: Crown,
      color: 'from-green-500 to-green-600',
      features: [
        'Premium placement',
        'Top of search results',
        'Maximum exposure',
        'Dedicated support',
        'Boost notifications',
        'Analytics dashboard'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setPricingOptions((prev: any) => ({
      ...prev,
      selectedPlan: planId
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      className="space-y-8 max-w-6xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Premium Header */}
      <motion.div 
        className="text-center space-y-4 pb-8"
        variants={itemVariants}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
        </div>
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 tracking-tight">
          Choose Your Listing Plan
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Select the right duration to reach your target buyers effectively
        </p>
        <div className="text-sm text-emerald-600 font-medium">
          Chọn Gói Đăng Tin Phù Hợp ✨
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        variants={itemVariants}
      >
        {plans.map((plan, index) => {
          const IconComponent = plan.icon;
          return (
            <motion.div
              key={plan.id}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card 
                className={`relative cursor-pointer transition-all duration-300 h-full ${
                  selectedPlan === plan.id 
                    ? 'ring-4 ring-purple-200 shadow-2xl scale-105' 
                    : 'hover:shadow-xl hover:scale-102'
                } ${plan.popular ? 'border-purple-300' : plan.bestValue ? 'border-green-300' : 'border-gray-200'}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 text-sm font-bold shadow-lg">
                      🔥 Most Popular
                    </Badge>
                  </div>
                )}
                {plan.bestValue && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 text-sm font-bold shadow-lg">
                      ⭐ Best Value
                    </Badge>
                  </div>
                )}

                <CardContent className="p-8 h-full flex flex-col">
                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{plan.title}</h3>
                    
                    <div className="mb-3">
                      <span className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        {plan.price}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-lg text-gray-500 line-through ml-3">
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    {plan.discount && (
                      <Badge variant="secondary" className="bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700 font-semibold px-3 py-1">
                        💰 {plan.discount}
                      </Badge>
                    )}
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3 text-base">
                        <div className="w-5 h-5 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    variant={selectedPlan === plan.id ? "default" : "outline"}
                    className={`w-full h-14 text-lg font-semibold rounded-xl transition-all duration-300 ${
                      selectedPlan === plan.id 
                        ? `bg-gradient-to-r ${plan.color} text-white shadow-lg hover:shadow-xl` 
                        : 'hover:bg-gray-50 border-2'
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {selectedPlan === plan.id ? (
                      <div className="flex items-center gap-2">
                        <Check className="w-5 h-5" />
                        Selected
                      </div>
                    ) : (
                      'Choose Plan'
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Selected Plan Summary */}
      {selectedPlan && (
        <motion.div variants={itemVariants}>
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-purple-800">
                  Selected Plan Summary
                </h3>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-purple-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      📋 Plan: {plans.find(p => p.id === selectedPlan)?.title}
                    </p>
                    <p className="text-lg font-semibold text-gray-800">
                      💰 Price: {plans.find(p => p.id === selectedPlan)?.price}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-4">
                    <p className="text-purple-700 font-medium leading-relaxed">
                      🚀 Your salon listing will be live and visible to potential buyers immediately after payment.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Progress Indicator */}
      <motion.div 
        className="flex justify-center pt-6"
        variants={itemVariants}
      >
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-1 bg-gray-200 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <div className="w-8 h-1 bg-emerald-200 rounded-full"></div>
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SalonPricingStep;
