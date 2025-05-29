
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Clock, Shield, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SalonPricingStepProps {
  pricingOptions: any;
  setPricingOptions: React.Dispatch<React.SetStateAction<any>>;
}

const SalonPricingStep: React.FC<SalonPricingStepProps> = ({ 
  pricingOptions, 
  setPricingOptions 
}) => {
  const [selectedPlan, setSelectedPlan] = useState(pricingOptions.selectedPricingTier || 'standard');
  const [featuredAddOn, setFeaturedAddOn] = useState(pricingOptions.featuredAddOn || false);

  const plans = [
    {
      id: 'basic',
      name: '1 Month',
      price: 19.99,
      originalPrice: 24.99,
      discount: '20% off',
      period: '/mo',
      icon: Clock,
      features: [
        'Basic salon listing',
        'Standard visibility',
        'Basic search placement',
        'Contact information display'
      ],
      popular: false,
      bestValue: false
    },
    {
      id: 'standard',
      name: '3 Months',
      price: 54.99,
      originalPrice: 74.99,
      discount: '27% off',
      period: '/3mo',
      icon: Star,
      features: [
        'Enhanced salon listing',
        'Priority placement',
        'Featured in search results',
        'Photo gallery showcase',
        'Customer reviews display'
      ],
      popular: true,
      bestValue: false
    },
    {
      id: 'premium',
      name: '6 Months',
      price: 99.99,
      originalPrice: 149.99,
      discount: '33% off',
      period: '/6mo',
      icon: Zap,
      features: [
        'Premium salon listing',
        'Top search placement',
        'Social media integration',
        'Advanced analytics',
        'Priority customer support'
      ],
      popular: false,
      bestValue: false
    },
    {
      id: 'enterprise',
      name: '12 Months',
      price: 145.99,
      originalPrice: 300,
      discount: '51% off',
      period: '/year',
      icon: Crown,
      features: [
        'Elite salon listing',
        'Premium placement guarantee',
        'Custom branding options',
        'Dedicated account manager',
        'Advanced marketing tools',
        'Priority listing reviews'
      ],
      popular: false,
      bestValue: true
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setPricingOptions((prev: any) => ({
      ...prev,
      selectedPricingTier: planId
    }));
  };

  const handleFeaturedAddOnToggle = () => {
    const newValue = !featuredAddOn;
    setFeaturedAddOn(newValue);
    setPricingOptions((prev: any) => ({
      ...prev,
      featuredAddOn: newValue
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Salon Listing Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan to showcase your salon and attract customers
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const isSelected = selectedPlan === plan.id;
            
            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-orange-500 text-white px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}
                {plan.bestValue && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-green-500 text-white px-4 py-1 text-sm font-semibold">
                      Best Value
                    </Badge>
                  </div>
                )}
                
                <Card 
                  className={`h-full cursor-pointer transition-all duration-300 ${
                    isSelected 
                      ? 'ring-4 ring-purple-500 shadow-2xl bg-white' 
                      : 'hover:shadow-xl bg-white/80 backdrop-blur-sm'
                  } ${plan.popular ? 'border-orange-300' : plan.bestValue ? 'border-green-300' : 'border-gray-200'}`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                        <span className="text-gray-600">{plan.period}</span>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-sm text-gray-500 line-through">${plan.originalPrice}</span>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          {plan.discount}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full ${
                        isSelected 
                          ? 'bg-purple-600 hover:bg-purple-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      {isSelected ? 'Selected' : 'Select Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Add-on */}
        <motion.div 
          className="max-w-2xl mx-auto"
          whileHover={{ scale: 1.02 }}
        >
          <Card 
            className={`cursor-pointer transition-all duration-300 bg-gradient-to-r from-yellow-50 to-amber-50 border-2 ${
              featuredAddOn ? 'border-yellow-400 shadow-lg' : 'border-yellow-200'
            }`}
            onClick={handleFeaturedAddOnToggle}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Featured Add-on</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      + $10 (one-time, applies to any plan)
                    </p>
                    <p className="text-xs text-gray-500">
                      + $10 (một lần duy nhất cho bất kỳ gói nào)
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={featuredAddOn ? "default" : "outline"}>
                    {featuredAddOn ? "Added" : "Add"}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-yellow-200">
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Premium listing badge
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Priority in search results
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Featured placement
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    Highlighted appearance
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SalonPricingStep;
