
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown } from 'lucide-react';
import { SalonPricingOptions } from '@/utils/posting/salonPricing';
import { Toggle } from '@/components/ui/toggle';

interface SalonPlanSelectionSectionProps {
  options: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

const SalonPlanSelectionSection: React.FC<SalonPlanSelectionSectionProps> = ({
  options,
  onOptionsChange,
}) => {
  const pricingPlans = [
    {
      id: 'standard',
      name: 'Standard',
      price: 24.99,
      duration: 1,
      durationLabel: '1 Month',
      savings: null,
      features: ['Basic visibility', '30-day listing', 'Standard placement'],
      icon: <Check className="h-5 w-5 text-green-500" />,
      popular: false,
    },
    {
      id: 'sixmonth',
      name: 'Best Value',
      price: 120,
      duration: 6,
      durationLabel: '6 Months',
      savings: 30,
      originalPrice: 149.94,
      features: ['Extended visibility', '6-month listing', 'Priority placement'],
      icon: <Star className="h-5 w-5 text-amber-500" />,
      popular: true,
    },
    {
      id: 'annual',
      name: 'Premium',
      price: 249.99,
      duration: 12,
      durationLabel: '12 Months',
      savings: 50,
      originalPrice: 299.88,
      features: ['Maximum visibility', '12-month listing', 'Top placement'],
      icon: <Crown className="h-5 w-5 text-purple-500" />,
      popular: false,
    },
  ];

  const handlePlanSelect = (planId: string, duration: number) => {
    onOptionsChange({
      ...options,
      selectedPricingTier: planId as 'standard',
      durationMonths: duration,
    });
  };

  const handleFeatureBoostToggle = (enabled: boolean) => {
    onOptionsChange({
      ...options,
      featuredBoost: enabled,
    });
  };

  const getSelectedPlan = () => {
    return pricingPlans.find(plan => plan.duration === options.durationMonths);
  };

  const calculateTotal = () => {
    const selectedPlan = getSelectedPlan();
    const basePrice = selectedPlan ? selectedPlan.price : 24.99;
    const featureBoost = options.featuredBoost ? 25 : 0;
    return basePrice + featureBoost;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Listing Plan</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan to showcase your salon to thousands of qualified buyers. 
          Trusted by the Vietnamese beauty community nationwide.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative cursor-pointer transition-all hover:shadow-lg ${
              options.durationMonths === plan.duration
                ? 'ring-2 ring-purple-500 border-purple-500 shadow-lg'
                : 'border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => handlePlanSelect(plan.id, plan.duration)}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-purple-600 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-3">{plan.icon}</div>
              <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                </div>
                <div className="text-sm text-gray-600">{plan.durationLabel}</div>
                {plan.savings && (
                  <div className="space-y-1">
                    <div className="text-sm text-gray-500 line-through">
                      Was ${plan.originalPrice}
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Save ${plan.savings}
                    </Badge>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button
                className={`w-full ${
                  options.durationMonths === plan.duration
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlanSelect(plan.id, plan.duration);
                }}
              >
                {options.durationMonths === plan.duration ? 'Selected' : 'Select Plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Feature Boost Add-on */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-5 w-5 text-amber-500" />
                <h3 className="text-lg font-semibold text-gray-900">Feature Boost</h3>
                <Badge className="bg-amber-100 text-amber-800">+$25</Badge>
              </div>
              <p className="text-gray-700 mb-2">
                Get priority placement and stand out with a featured badge. 
                Sell faster and reach more qualified buyers.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Priority search placement</li>
                <li>• Featured badge on your listing</li>
                <li>• 3x more visibility</li>
                <li>• Email priority support</li>
              </ul>
            </div>
            <div className="ml-6">
              <Toggle
                pressed={options.featuredBoost}
                onPressedChange={handleFeatureBoostToggle}
                size="lg"
                className="data-[state=on]:bg-amber-500"
              >
                {options.featuredBoost ? 'Added' : 'Add Boost'}
              </Toggle>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Building Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="text-center space-y-3">
          <h3 className="text-lg font-semibold text-blue-900">
            Peace of Mind Guarantee
          </h3>
          <p className="text-blue-800">
            Join thousands of salon owners who trust EmviApp to sell their businesses quickly and securely. 
            Our platform is specifically designed for the Vietnamese beauty community, ensuring your listing 
            reaches the right buyers who understand your business value.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-blue-700">
            <span>✓ Verified buyer leads</span>
            <span>✓ Secure transactions</span>
            <span>✓ Community trusted</span>
          </div>
        </div>
      </div>

      {/* Price Summary */}
      {options.durationMonths && (
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Your Selection</h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">
                  {getSelectedPlan()?.name} Plan ({getSelectedPlan()?.durationLabel})
                </span>
                <span className="font-medium">${getSelectedPlan()?.price}</span>
              </div>
              {options.featuredBoost && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Feature Boost</span>
                  <span className="font-medium">$25</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SalonPlanSelectionSection;
