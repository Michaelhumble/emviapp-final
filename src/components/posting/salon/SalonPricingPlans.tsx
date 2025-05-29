
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { SALON_PRICING_PLANS, SalonPricingTier, SalonPricingOptions } from '@/utils/posting/salonPricing';

interface SalonPricingPlansProps {
  selectedOptions: SalonPricingOptions;
  onPlanSelect: (tier: SalonPricingTier) => void;
}

const SalonPricingPlans: React.FC<SalonPricingPlansProps> = ({
  selectedOptions,
  onPlanSelect
}) => {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Choose Your Listing Plan
        </h3>
        <p className="text-gray-600">
          Select the perfect plan for your salon listing
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SALON_PRICING_PLANS.map((plan) => {
          const isSelected = selectedOptions.selectedPricingTier === plan.tier;
          const isPopular = plan.tier === 'premium';
          
          return (
            <Card 
              key={plan.id}
              className={`relative transition-all duration-200 cursor-pointer hover:shadow-lg ${
                isSelected 
                  ? 'border-2 border-purple-500 shadow-lg ring-2 ring-purple-200' 
                  : 'border hover:border-purple-300'
              }`}
              onClick={() => onPlanSelect(plan.tier)}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-lg font-semibold">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-purple-600">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">
                    /{plan.duration === 1 ? 'mo' : `${plan.duration}mo`}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    isSelected 
                      ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  onClick={() => onPlanSelect(plan.tier)}
                >
                  {isSelected ? 'Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SalonPricingPlans;
