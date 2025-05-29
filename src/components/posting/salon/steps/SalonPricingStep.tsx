
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Crown, Diamond, Zap, Check, Sparkles } from 'lucide-react';
import { SalonFormValues } from '../salonFormSchema';

interface SalonPricingStepProps {
  form: UseFormReturn<SalonFormValues>;
  onNext: () => void;
}

type PricingTier = 'basic' | 'gold' | 'premium' | 'diamond';

interface PricingPlan {
  id: PricingTier;
  name: string;
  price: string;
  originalPrice?: string;
  duration: string;
  durationMonths: number;
  description: string;
  features: string[];
  icon: React.ReactNode;
  gradient: string;
  badgeColor: string;
  popular?: boolean;
  savings?: string;
  allowsFeature?: boolean;
}

const SalonPricingStep: React.FC<SalonPricingStepProps> = ({ form, onNext }) => {
  const [selectedTier, setSelectedTier] = useState<PricingTier>('basic');
  const [addFeatured, setAddFeatured] = useState(false);

  const pricingPlans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic Listing',
      price: '$19.99',
      duration: 'Monthly',
      durationMonths: 1,
      description: 'Perfect for getting started',
      features: [
        'Standard listing visibility',
        'Basic salon profile',
        'Contact information display',
        'Mobile-optimized listing'
      ],
      icon: <Star className="h-6 w-6" />,
      gradient: 'from-blue-500 to-blue-600',
      badgeColor: 'bg-blue-100 text-blue-700',
      allowsFeature: true
    },
    {
      id: 'gold',
      name: 'Gold Featured',
      price: '$49.99',
      originalPrice: '$74.99',
      duration: '3 Months',
      durationMonths: 3,
      description: 'Enhanced visibility & features',
      features: [
        'Featured badge & placement',
        'Enhanced visibility in search',
        'Priority customer support',
        'Detailed analytics dashboard',
        'Social media integration'
      ],
      icon: <Crown className="h-6 w-6" />,
      gradient: 'from-amber-500 to-yellow-600',
      badgeColor: 'bg-amber-100 text-amber-700',
      popular: true,
      savings: 'Save $25',
      allowsFeature: true
    },
    {
      id: 'premium',
      name: 'Premium Listing',
      price: '$99.99',
      originalPrice: '$150',
      duration: '6 Months',
      durationMonths: 6,
      description: 'Maximum exposure & tools',
      features: [
        'Premium badge & top placement',
        'Advanced analytics & insights',
        'Lead generation tools',
        'Custom branding options',
        'Priority listing support',
        'Featured in newsletters'
      ],
      icon: <Diamond className="h-6 w-6" />,
      gradient: 'from-purple-500 to-purple-600',
      badgeColor: 'bg-purple-100 text-purple-700',
      savings: 'Save $50',
      allowsFeature: true
    },
    {
      id: 'diamond',
      name: 'Diamond Exclusive',
      price: '$149',
      originalPrice: '$300',
      duration: '12 Months',
      durationMonths: 12,
      description: 'Ultimate visibility package',
      features: [
        'Diamond badge & exclusive placement',
        'Maximum visibility guarantee',
        'VIP support & account manager',
        'Custom marketing materials',
        'Featured across all platforms',
        'Exclusive networking events',
        'Advanced lead analytics'
      ],
      icon: <Sparkles className="h-6 w-6" />,
      gradient: 'from-cyan-500 to-blue-600',
      badgeColor: 'bg-cyan-100 text-cyan-700',
      savings: 'Save $151',
      allowsFeature: false
    }
  ];

  const selectedPlan = pricingPlans.find(plan => plan.id === selectedTier);
  const featuredCost = 10;
  const totalCost = parseFloat(selectedPlan?.price.replace('$', '') || '0') + (addFeatured ? featuredCost : 0);

  const handleSelectPlan = (tier: PricingTier) => {
    setSelectedTier(tier);
    // Reset featured add-on if diamond is selected
    if (tier === 'diamond') {
      setAddFeatured(false);
    }
  };

  const handleContinue = () => {
    // Set form values for pricing
    form.setValue('fastSalePackage', addFeatured);
    onNext();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
          <Crown className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
          Choose Your Salon Listing Plan
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Select the perfect plan to showcase your salon to thousands of qualified buyers
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative"
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 shadow-lg">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <Card
              className={`relative h-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 ${
                selectedTier === plan.id
                  ? 'border-purple-500 shadow-2xl ring-4 ring-purple-200'
                  : 'border-gray-200 hover:border-purple-300'
              } bg-white/80 backdrop-blur-sm`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white shadow-lg`}>
                  {plan.icon}
                </div>
                
                <CardTitle className="text-xl font-bold text-gray-800">
                  {plan.name}
                </CardTitle>
                
                <div className="space-y-1">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{plan.duration}</p>
                  {plan.savings && (
                    <Badge className="bg-green-100 text-green-700 text-xs">
                      {plan.savings}
                    </Badge>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mt-2">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-2">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    selectedTier === plan.id
                      ? `bg-gradient-to-r ${plan.gradient} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  } rounded-xl h-12 font-semibold transition-all duration-200`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPlan(plan.id);
                  }}
                >
                  {selectedTier === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Featured Add-on */}
      {selectedPlan?.allowsFeature && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
              addFeatured 
                ? 'border-yellow-400 bg-gradient-to-br from-yellow-50 to-amber-50 shadow-lg' 
                : 'border-gray-200 hover:border-yellow-300 bg-white/80'
            } backdrop-blur-sm`}
            onClick={() => setAddFeatured(!addFeatured)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center">
                      Feature This Listing
                      <Badge className="ml-2 bg-yellow-100 text-yellow-700 animate-pulse">
                        +$10
                      </Badge>
                    </h3>
                    <p className="text-sm text-gray-600">
                      Stand out with a golden badge and premium placement
                    </p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  addFeatured 
                    ? 'border-yellow-500 bg-yellow-500' 
                    : 'border-gray-300'
                }`}>
                  {addFeatured && <Check className="h-4 w-4 text-white" />}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Summary & Continue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100"
      >
        <div className="text-center space-y-4">
          <h3 className="text-xl font-bold text-gray-800">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-lg">
              <span>{selectedPlan?.name} ({selectedPlan?.duration})</span>
              <span className="font-semibold">{selectedPlan?.price}</span>
            </div>
            {addFeatured && (
              <div className="flex justify-between items-center text-yellow-700">
                <span>Feature This Listing</span>
                <span className="font-semibold">+${featuredCost}</span>
              </div>
            )}
            <hr className="border-gray-200" />
            <div className="flex justify-between items-center text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>${totalCost.toFixed(2)}</span>
            </div>
          </div>
          
          <Button
            onClick={handleContinue}
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Continue to Payment
          </Button>
          
          <p className="text-xs text-gray-500 mt-4">
            Your listing will be live within 24 hours after payment confirmation
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SalonPricingStep;
