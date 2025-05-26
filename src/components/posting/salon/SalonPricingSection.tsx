
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { SalonPricingOptions, calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SalonPricingSectionProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
  isFirstPost?: boolean;
}

const SalonPricingSection: React.FC<SalonPricingSectionProps> = ({
  selectedOptions,
  onOptionsChange,
  isFirstPost = false
}) => {
  const [localOptions, setLocalOptions] = useState<SalonPricingOptions>({
    ...selectedOptions,
    isFirstPost
  });

  const pricingPlans = [
    {
      id: 'standard',
      name: 'Standard Listing',
      price: 24.99,
      duration: 1,
      savings: 0,
      description: 'Perfect for getting started',
      features: [
        'Active for 30 days',
        'Basic visibility',
        'Standard placement',
        'Email support'
      ],
      icon: <Check className="h-5 w-5 text-green-500" />,
      popular: false
    },
    {
      id: '6month',
      name: '6 Month Package',
      price: 120,
      duration: 6,
      savings: 30,
      description: 'Most popular choice',
      features: [
        'Active for 6 months',
        'Enhanced visibility',
        'Priority placement',
        'Email support',
        'Performance analytics'
      ],
      icon: <Star className="h-5 w-5 text-amber-500" />,
      popular: true
    },
    {
      id: '12month',
      name: '12 Month Package',
      price: 249.99,
      duration: 12,
      savings: 50,
      description: 'Best value for serious sellers',
      features: [
        'Active for 12 months',
        'Maximum visibility',
        'Top placement',
        'Priority support',
        'Advanced analytics',
        'Featured badge'
      ],
      icon: <Crown className="h-5 w-5 text-purple-500" />,
      popular: false
    }
  ];

  const handlePlanSelect = (planId: string) => {
    const plan = pricingPlans.find(p => p.id === planId);
    if (!plan) return;

    const updatedOptions = {
      ...localOptions,
      durationMonths: plan.duration,
      selectedPricingTier: planId as 'standard' | 'premium'
    };

    setLocalOptions(updatedOptions);
  };

  const handleFeatureToggle = (feature: keyof SalonPricingOptions, value: boolean) => {
    const updatedOptions = {
      ...localOptions,
      [feature]: value
    };
    setLocalOptions(updatedOptions);
  };

  const handleConfirmSelection = () => {
    onOptionsChange(localOptions);
  };

  const selectedPlan = pricingPlans.find(p => p.duration === localOptions.durationMonths);
  const basePrice = selectedPlan?.price || 24.99;
  const featureBoostPrice = localOptions.featuredBoost ? 25 : 0;
  const totalPrice = basePrice + featureBoostPrice;

  return (
    <div className="space-y-6">
      {/* Pricing Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative cursor-pointer transition-all duration-200 ${
              selectedPlan?.id === plan.id
                ? 'ring-2 ring-purple-500 border-purple-500 shadow-lg'
                : 'hover:shadow-md border-gray-200'
            } ${plan.popular ? 'border-amber-300' : ''}`}
            onClick={() => handlePlanSelect(plan.id)}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                {plan.icon}
              </div>
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <div className="text-3xl font-bold text-gray-900">
                ${plan.price}
              </div>
              {plan.savings > 0 && (
                <Badge variant="outline" className="text-green-600 border-green-600">
                  Save ${plan.savings}
                </Badge>
              )}
              <p className="text-sm text-gray-500">{plan.description}</p>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2 mb-4">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  selectedPlan?.id === plan.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(plan.id);
                }}
              >
                {selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Add-ons */}
      <Card className="border-dashed border-2 border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Featured Boost Add-on
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-3">
            <Checkbox
              id="featuredBoost"
              checked={localOptions.featuredBoost || false}
              onCheckedChange={(checked) => handleFeatureToggle('featuredBoost', checked === true)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="featuredBoost" className="text-sm font-medium cursor-pointer">
                Featured Boost (+$25)
              </Label>
              <p className="text-sm text-gray-600">
                Get your salon featured at the top of search results and increase visibility by 3x
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Selected Plan:</span>
              <span className="font-medium">{selectedPlan?.name || 'No plan selected'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Base Price:</span>
              <span className="font-medium">${basePrice}</span>
            </div>
            {localOptions.featuredBoost && (
              <div className="flex justify-between">
                <span className="text-gray-600">Featured Boost:</span>
                <span className="font-medium">+$25</span>
              </div>
            )}
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-purple-600">${totalPrice}</span>
            </div>
          </div>
          
          <Button
            onClick={handleConfirmSelection}
            disabled={!selectedPlan}
            className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
          >
            Confirm Selection & Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonPricingSection;
