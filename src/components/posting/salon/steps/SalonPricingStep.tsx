
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Crown, Zap, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { SalonFormValues } from '../salonFormSchema';

interface SalonPricingStepProps {
  form: UseFormReturn<SalonFormValues>;
}

const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic Listing',
    price: '$19.99',
    period: '/month',
    originalPrice: '$24.99',
    icon: Star,
    color: 'from-blue-500 to-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700',
    features: [
      'Standard listing visibility',
      'Visible to qualified buyers',
      'Basic contact features',
      'Standard support'
    ],
    popular: false
  },
  {
    id: 'gold',
    name: 'Gold Featured',
    price: '$49.99',
    period: '/3 months',
    originalPrice: '$74.99',
    icon: Crown,
    color: 'from-yellow-500 to-orange-500',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    features: [
      'Featured badge & enhanced visibility',
      'Higher placement in search results',
      'Premium contact features',
      'Priority support'
    ],
    popular: true
  },
  {
    id: 'premium',
    name: 'Premium Listing',
    price: '$99.99',
    period: '/6 months',
    originalPrice: '$150',
    icon: Zap,
    color: 'from-purple-500 to-purple-600',
    badgeColor: 'bg-purple-100 text-purple-700',
    features: [
      'Premium badge & maximum visibility',
      'Top placement in search results',
      'Advanced analytics dashboard',
      'VIP support & dedicated assistance'
    ],
    popular: false
  }
];

export const SalonPricingStep = ({ form }: SalonPricingStepProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [featuredAddon, setFeaturedAddon] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const toggleFeaturedAddon = () => {
    setFeaturedAddon(!featuredAddon);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Choose Your Listing Plan
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan to showcase your salon to qualified buyers and maximize your reach
        </p>
      </div>

      {/* Main Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan, index) => {
          const IconComponent = plan.icon;
          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className={`relative overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 border-2 ${
                  selectedPlan === plan.id 
                    ? 'border-purple-500 shadow-xl ring-4 ring-purple-100' 
                    : 'border-gray-200 hover:border-purple-300'
                } ${plan.popular ? 'ring-2 ring-yellow-200' : ''}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-center py-2 text-sm font-semibold">
                      🔥 Most Popular
                    </div>
                  </div>
                )}
                
                <CardContent className={`p-8 ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                  <div className="text-center space-y-4">
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} shadow-lg`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    {/* Plan Name */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                      <Badge className={`mt-2 ${plan.badgeColor}`}>
                        {plan.name.split(' ')[0]} Plan
                      </Badge>
                    </div>

                    {/* Pricing */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-500">{plan.period}</span>
                      </div>
                      <div className="text-sm text-gray-500 line-through">
                        Originally {plan.originalPrice}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 text-left">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Select Button */}
                    <Button
                      type="button"
                      className={`w-full mt-6 transition-all duration-300 ${
                        selectedPlan === plan.id
                          ? `bg-gradient-to-r ${plan.color} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Add-on */}
      {selectedPlan && selectedPlan !== 'premium' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8"
        >
          <Card className={`border-2 transition-all duration-300 ${
            featuredAddon ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-lg">
                    <Star className="h-6 w-6 text-white fill-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Featured Add-on</h3>
                    <p className="text-sm text-gray-600">Make your listing stand out with a golden featured badge</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">+$10</div>
                    <div className="text-sm text-gray-500">one-time</div>
                  </div>
                  <Button
                    type="button"
                    variant={featuredAddon ? "default" : "outline"}
                    onClick={toggleFeaturedAddon}
                    className={featuredAddon ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                  >
                    {featuredAddon ? 'Added' : 'Add Feature'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Trust Indicators */}
      <div className="mt-12 text-center space-y-4">
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>No setup fees</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center space-x-2">
            <Check className="h-4 w-4 text-green-500" />
            <span>Qualified buyers only</span>
          </div>
        </div>
        <p className="text-xs text-gray-400 max-w-md mx-auto">
          All plans include access to our qualified buyer network and secure messaging system
        </p>
      </div>
    </div>
  );
};

export default SalonPricingStep;
