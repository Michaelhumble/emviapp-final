
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown } from 'lucide-react';
import { SalonPricingOptions, calculateSalonPostPrice } from '@/utils/posting/salonPricing';

interface SalonPlanSelectionSectionProps {
  options: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

const SalonPlanSelectionSection: React.FC<SalonPlanSelectionSectionProps> = ({
  options,
  onOptionsChange
}) => {
  const handlePlanSelect = (durationMonths: number) => {
    const updatedOptions = {
      ...options,
      durationMonths
    };
    onOptionsChange(updatedOptions);
  };

  const handleFeatureToggle = (feature: keyof SalonPricingOptions) => {
    const updatedOptions = {
      ...options,
      [feature]: !options[feature]
    };
    onOptionsChange(updatedOptions);
  };

  const plans = [
    {
      duration: 1,
      title: "Standard",
      price: 24.99,
      description: "Perfect for testing the market",
      features: ["Basic listing visibility", "30-day duration", "Standard support"]
    },
    {
      duration: 6,
      title: "6 Months",
      price: 120,
      originalPrice: 149.94,
      savings: 30,
      description: "Most popular choice for serious sellers",
      features: ["Extended visibility", "6-month duration", "Priority support", "Better search ranking"],
      popular: true
    },
    {
      duration: 12,
      title: "12 Months",
      price: 249.99,
      originalPrice: 299.88,
      savings: 50,
      description: "Maximum exposure for your salon",
      features: ["Premium visibility", "Full year duration", "VIP support", "Top search placement", "Analytics dashboard"]
    }
  ];

  const currentTotal = calculateSalonPostPrice(options);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Listing Plan</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select the perfect plan to showcase your salon to thousands of qualified buyers in the Vietnamese community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isSelected = options.durationMonths === plan.duration;
          
          return (
            <Card 
              key={plan.duration}
              className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected 
                  ? 'ring-2 ring-purple-500 border-purple-500 shadow-lg' 
                  : 'border-gray-200 hover:border-purple-300'
              } ${plan.popular ? 'scale-105' : ''}`}
              onClick={() => handlePlanSelect(plan.duration)}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold text-gray-900">{plan.title}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                  {plan.originalPrice && (
                    <div className="text-sm text-gray-500 mt-1">
                      <span className="line-through">${plan.originalPrice}</span>
                      <span className="ml-2 text-green-600 font-medium">Save ${plan.savings}</span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-6 ${
                    isSelected 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanSelect(plan.duration);
                  }}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Selected
                    </>
                  ) : (
                    'Select Plan'
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Feature Boost Add-on */}
      <Card className="border-2 border-dashed border-purple-300 bg-purple-50">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <Crown className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Featured Boost</h3>
                <Badge variant="outline" className="ml-2 text-purple-600 border-purple-600">+$25</Badge>
              </div>
              <p className="text-gray-700 mb-3">
                Stand out from the competition! Your salon will appear at the top of search results with a premium "Featured" badge.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Top placement in search results</li>
                <li>• Premium "Featured" badge</li>
                <li>• 3x more visibility</li>
                <li>• Faster sale potential</li>
              </ul>
            </div>
            <div className="ml-6">
              <Button
                variant={options.featuredBoost ? "default" : "outline"}
                onClick={() => handleFeatureToggle('featuredBoost')}
                className={options.featuredBoost ? "bg-purple-600" : ""}
              >
                {options.featuredBoost ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Added
                  </>
                ) : (
                  'Add Feature Boost'
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Summary */}
      <Card className="bg-gray-50 border-2">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Your Selection</h3>
              <p className="text-gray-600">
                {options.durationMonths === 1 ? 'Standard Plan' : 
                 options.durationMonths === 6 ? '6 Month Plan' : 
                 '12 Month Plan'}
                {options.featuredBoost && ' + Featured Boost'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${currentTotal}</div>
              <div className="text-sm text-gray-500">Total Price</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust Building Copy */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Peace of Mind Guarantee</h3>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Join thousands of successful salon owners who trust EmviApp. Our platform is designed specifically 
          for the Vietnamese nail salon community, ensuring your listing reaches serious, qualified buyers.
        </p>
      </div>
    </div>
  );
};

export default SalonPlanSelectionSection;
