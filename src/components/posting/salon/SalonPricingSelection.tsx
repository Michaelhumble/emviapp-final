
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Crown, Star, Shield } from 'lucide-react';
import { SalonPricingOptions, calculateSalonPostPrice } from '@/utils/posting/salonPricing';
import SalonPostOptions from './SalonPostOptions';

interface SalonPricingSelectionProps {
  selectedOptions: SalonPricingOptions;
  onOptionsChange: (options: SalonPricingOptions) => void;
}

const SalonPricingSelection: React.FC<SalonPricingSelectionProps> = ({
  selectedOptions,
  onOptionsChange
}) => {
  const pricingPlans = [
    {
      id: 'standard',
      name: 'Standard Listing',
      price: 24.99,
      duration: 1,
      savings: 0,
      popular: false,
      icon: <Check className="h-5 w-5 text-green-500" />,
      features: [
        'Active for 30 days',
        'Basic listing visibility',
        'Email notifications for inquiries',
        'Standard support'
      ]
    },
    {
      id: '6months',
      name: '6 Month Package',
      price: 120,
      duration: 6,
      savings: 30,
      popular: true,
      icon: <Star className="h-5 w-5 text-amber-500" />,
      features: [
        'Active for 6 months',
        'Enhanced visibility',
        'Priority email notifications',
        'Dedicated support',
        'Save $30 vs monthly'
      ]
    },
    {
      id: '12months',
      name: '12 Month Package',
      price: 249.99,
      duration: 12,
      savings: 50,
      popular: false,
      icon: <Crown className="h-5 w-5 text-purple-500" />,
      features: [
        'Active for 12 months',
        'Maximum visibility',
        'Instant notifications',
        'Premium support',
        'Save $50 vs monthly'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    let newOptions = { ...selectedOptions };
    
    if (planId === 'standard') {
      newOptions.selectedPricingTier = 'standard';
      newOptions.durationMonths = 1;
    } else if (planId === '6months') {
      newOptions.selectedPricingTier = 'standard';
      newOptions.durationMonths = 6;
    } else if (planId === '12months') {
      newOptions.selectedPricingTier = 'standard';
      newOptions.durationMonths = 12;
    }
    
    onOptionsChange(newOptions);
  };

  const getSelectedPlanId = () => {
    if (selectedOptions.durationMonths === 1) return 'standard';
    if (selectedOptions.durationMonths === 6) return '6months';
    if (selectedOptions.durationMonths === 12) return '12months';
    return 'standard';
  };

  const selectedPlanId = getSelectedPlanId();
  const currentPrice = calculateSalonPostPrice(selectedOptions);

  return (
    <div className="space-y-8">
      {/* Pricing Plans Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {pricingPlans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          
          return (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'ring-2 ring-purple-500 border-purple-500 shadow-lg'
                  : 'hover:border-purple-300 hover:shadow-md'
              } ${plan.popular ? 'border-amber-400' : ''}`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-amber-500 text-white px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">{plan.icon}</div>
                <CardTitle className="text-lg">{plan.name}</CardTitle>
                <div className="space-y-1">
                  <div className="text-3xl font-bold text-gray-900">
                    ${plan.price}
                  </div>
                  {plan.savings > 0 && (
                    <div className="text-sm text-green-600 font-medium">
                      Save ${plan.savings}
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full ${
                    isSelected
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanSelect(plan.id);
                  }}
                >
                  {isSelected ? 'Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add-on Options */}
      <div className="border-t pt-6">
        <SalonPostOptions
          options={selectedOptions}
          onOptionsChange={onOptionsChange}
        />
      </div>

      {/* Price Summary */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span className="font-medium text-gray-900">Total Price</span>
          </div>
          <div className="text-2xl font-bold text-purple-600">
            ${currentPrice.toFixed(2)}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Your listing will be active for {selectedOptions.durationMonths} month{selectedOptions.durationMonths > 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default SalonPricingSelection;
