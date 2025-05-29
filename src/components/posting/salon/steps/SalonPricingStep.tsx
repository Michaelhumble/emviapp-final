
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SalonFormValues } from '../salonFormSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Check, Star, Crown, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface SalonPricingStepProps {
  form: UseFormReturn<SalonFormValues>;
}

type PricingTier = 'basic' | 'gold' | 'premium' | 'annual';

interface PricingPlan {
  id: PricingTier;
  name: string;
  price: number;
  originalPrice: number;
  duration: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  savings?: string;
  gradient: string;
}

const SalonPricingStep = ({ form }: SalonPricingStepProps) => {
  const [selectedTier, setSelectedTier] = useState<PricingTier>('basic');
  const [featuredAddon, setFeaturedAddon] = useState(false);

  const pricingPlans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 19.99,
      originalPrice: 24.99,
      duration: '/month',
      description: 'Perfect for getting started',
      features: ['Basic visibility', 'Standard placement', 'Email support'],
      icon: <Check className="h-5 w-5 text-blue-500" />,
      savings: 'Save $5',
      gradient: 'from-blue-50 to-indigo-50'
    },
    {
      id: 'gold',
      name: 'Gold Featured',
      price: 49.99,
      originalPrice: 74.99,
      duration: '/3 months',
      description: 'Most popular choice',
      features: ['Featured placement', 'Gold badge', 'Priority support', 'Analytics'],
      icon: <Star className="h-5 w-5 text-amber-500" />,
      popular: true,
      savings: 'Save $25',
      gradient: 'from-amber-50 to-yellow-50'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 99.99,
      originalPrice: 150,
      duration: '/6 months',
      description: 'Maximum visibility',
      features: ['Top placement', 'Premium badge', 'Priority support', 'Advanced analytics', 'Featured in newsletters'],
      icon: <Crown className="h-5 w-5 text-purple-500" />,
      savings: 'Save $50',
      gradient: 'from-purple-50 to-pink-50'
    },
    {
      id: 'annual',
      name: '12 Months',
      price: 149,
      originalPrice: 300,
      duration: '/year',
      description: 'Best value for serious sellers',
      features: ['All Premium features', 'Annual exclusive benefits', 'Dedicated account manager', 'Custom promotions', 'Priority placement all year'],
      icon: <Sparkles className="h-5 w-5 text-emerald-500" />,
      savings: 'Save $151',
      gradient: 'from-emerald-50 to-teal-50'
    }
  ];

  const handleTierSelect = (tier: PricingTier) => {
    setSelectedTier(tier);
    form.setValue('selectedPricingTier', tier);
  };

  const handleFeaturedAddonChange = (checked: boolean) => {
    setFeaturedAddon(checked);
    form.setValue('featuredAddon', checked);
  };

  const getTotalPrice = () => {
    const plan = pricingPlans.find(p => p.id === selectedTier);
    if (!plan) return 0;
    
    let total = plan.price;
    if (featuredAddon && selectedTier !== 'annual') {
      total += 10;
    }
    return total;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-gray-600 text-lg">Select the perfect plan to showcase your salon</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan) => (
          <motion.div
            key={plan.id}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative"
          >
            <Card
              className={`cursor-pointer transition-all duration-300 h-full ${
                selectedTier === plan.id
                  ? 'ring-2 ring-purple-500 shadow-2xl shadow-purple-500/25'
                  : 'hover:shadow-xl hover:shadow-gray-200/50'
              } ${plan.popular ? 'border-amber-300' : ''}`}
              onClick={() => handleTierSelect(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-50 rounded-lg`} />
              
              <CardHeader className="relative z-10 text-center pb-4">
                <div className="flex justify-center mb-3">{plan.icon}</div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500">{plan.duration}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-gray-500 line-through">
                      was ${plan.originalPrice}
                    </span>
                    <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                      {plan.savings}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent className="relative z-10 pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  type="button"
                  className={`w-full ${
                    selectedTier === plan.id
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTierSelect(plan.id);
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
      {selectedTier !== 'annual' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card className="border-2 border-dashed border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Checkbox
                  id="featuredAddon"
                  checked={featuredAddon}
                  onCheckedChange={handleFeaturedAddonChange}
                  className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                />
                <div className="flex-1">
                  <Label htmlFor="featuredAddon" className="text-lg font-semibold cursor-pointer flex items-center gap-2">
                    <Zap className="h-5 w-5 text-purple-600" />
                    Featured Add-on
                    <Badge className="bg-purple-100 text-purple-700">+$10</Badge>
                  </Label>
                  <p className="text-gray-600 mt-1">
                    Boost your listing with premium placement and enhanced visibility
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Total Price Summary */}
      <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Total Price</h3>
            <p className="text-sm text-gray-600">
              {pricingPlans.find(p => p.id === selectedTier)?.name}
              {featuredAddon && selectedTier !== 'annual' ? ' + Featured Add-on' : ''}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ${getTotalPrice().toFixed(2)}
            </div>
            <div className="text-sm text-gray-500">
              {pricingPlans.find(p => p.id === selectedTier)?.duration}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonPricingStep;
