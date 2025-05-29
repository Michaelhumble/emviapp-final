
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, TrendingUp, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface SalonPricingOptions {
  planType: '1-month' | '3-month' | '6-month' | '12-month';
  duration: string;
  price: number;
  originalPrice: number;
  isFeatured: boolean;
  isNationwide: boolean;
}

interface SalonPricingStepProps {
  data: SalonPricingOptions;
  onUpdate: (data: Partial<SalonPricingOptions>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const SalonPricingStep: React.FC<SalonPricingStepProps> = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
}) => {
  const [selectedPlan, setSelectedPlan] = useState(data.planType || '3-month');
  const [isFeatured, setIsFeatured] = useState(data.isFeatured || false);

  const pricingPlans = [
    {
      id: '1-month',
      duration: '1 Month',
      price: 19.99,
      originalPrice: 24.99,
      discount: '20%',
      icon: Calendar,
      badge: null,
      badgeColor: '',
      popular: false,
      features: [
        'Professional salon listing',
        'High-quality photo gallery',
        'Contact information display',
        'Basic search visibility'
      ]
    },
    {
      id: '3-month',
      duration: '3 Months',
      price: 54.99,
      originalPrice: 74.99,
      discount: '27%',
      icon: TrendingUp,
      badge: 'Most Popular',
      badgeColor: 'bg-orange-500',
      popular: true,
      features: [
        'Everything in 1 Month',
        'Enhanced search ranking',
        'Featured in category listings',
        'Priority customer support'
      ]
    },
    {
      id: '6-month',
      duration: '6 Months',
      price: 99.99,
      originalPrice: 149.99,
      discount: '33%',
      icon: Star,
      badge: null,
      badgeColor: '',
      popular: false,
      features: [
        'Everything in 3 Months',
        'Advanced analytics dashboard',
        'Social media integration',
        'Custom branding options'
      ]
    },
    {
      id: '12-month',
      duration: '12 Months',
      price: 145.99,
      originalPrice: 300,
      discount: '51%',
      icon: Award,
      badge: 'Best Value',
      badgeColor: 'bg-green-500',
      popular: false,
      features: [
        'Everything in 6 Months',
        'Premium placement guarantee',
        'Dedicated account manager',
        'Advanced marketing tools'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId as any);
    const plan = pricingPlans.find(p => p.id === planId);
    if (plan) {
      onUpdate({
        planType: planId as any,
        duration: plan.duration,
        price: isFeatured ? plan.price + 10 : plan.price,
        originalPrice: plan.originalPrice,
        isFeatured,
        isNationwide: data.isNationwide || false
      });
    }
  };

  const handleFeaturedToggle = () => {
    const newFeatured = !isFeatured;
    setIsFeatured(newFeatured);
    const plan = pricingPlans.find(p => p.id === selectedPlan);
    if (plan) {
      onUpdate({
        ...data,
        isFeatured: newFeatured,
        price: newFeatured ? plan.price + 10 : plan.price
      });
    }
  };

  const handleNext = () => {
    const plan = pricingPlans.find(p => p.id === selectedPlan);
    if (plan) {
      onUpdate({
        planType: selectedPlan as any,
        duration: plan.duration,
        price: isFeatured ? plan.price + 10 : plan.price,
        originalPrice: plan.originalPrice,
        isFeatured,
        isNationwide: data.isNationwide || false
      });
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Choose Your Listing Package
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan to showcase your salon to thousands of potential buyers
          </p>
          <p className="text-lg text-gray-500 mt-2">
            Chọn gói hoàn hảo để giới thiệu salon của bạn đến hàng nghìn người mua tiềm năng
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {plan.badge && (
                <div className={`absolute -top-3 left-1/2 transform -translate-x-1/2 z-10`}>
                  <Badge className={`${plan.badgeColor} text-white px-3 py-1 text-sm font-medium`}>
                    {plan.badge}
                  </Badge>
                </div>
              )}
              
              <Card 
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-2xl h-full ${
                  selectedPlan === plan.id 
                    ? 'ring-4 ring-pink-400 shadow-2xl transform scale-105 bg-gradient-to-br from-white to-pink-50' 
                    : 'hover:shadow-xl bg-white'
                } ${plan.popular ? 'border-2 border-pink-300' : ''}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                <CardContent className="p-6 text-center h-full flex flex-col">
                  {selectedPlan === plan.id && (
                    <div className="absolute top-4 right-4">
                      <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <plan.icon className="w-12 h-12 mx-auto text-pink-500 mb-3" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.duration}</h3>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center justify-center mb-2">
                      <span className="text-sm text-gray-500 line-through mr-2">
                        ${plan.originalPrice}
                      </span>
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                        {plan.discount} OFF
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      ${plan.price}
                    </div>
                    <div className="text-sm text-gray-500">
                      {plan.id === '1-month' ? '/tháng' : 
                       plan.id === '3-month' ? '/3 tháng' :
                       plan.id === '6-month' ? '/6 tháng' : '/năm'}
                    </div>
                  </div>
                  
                  <div className="flex-grow">
                    <ul className="text-left space-y-2 text-sm">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Add-on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <Card 
            className={`cursor-pointer transition-all duration-300 ${
              isFeatured 
                ? 'ring-4 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50' 
                : 'bg-gradient-to-br from-yellow-50 to-amber-50 hover:shadow-lg'
            }`}
            onClick={handleFeaturedToggle}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {isFeatured && (
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <Star className="w-8 h-8 text-yellow-500 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      Featured Listing Add-on
                    </h3>
                    <p className="text-gray-600">
                      + $10 (one-time, applies to any plan)
                    </p>
                    <p className="text-sm text-gray-500">
                      + $10 (một lần duy nhất cho bất kỳ gói nào)
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-600">+$10</div>
                  <div className="text-sm text-gray-500">one-time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={onPrevious}
            className="px-8 py-3 text-lg border-pink-200 text-pink-600 hover:bg-pink-50"
          >
            Previous
          </Button>
          
          <div className="text-center">
            <p className="text-gray-600 mb-2">
              Step 5 of 6: Choose Your Package
            </p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div
                  key={step}
                  className={`w-3 h-3 rounded-full ${
                    step <= 5 ? 'bg-pink-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <Button
            onClick={handleNext}
            className="px-8 py-3 text-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Continue to Review
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SalonPricingStep;
