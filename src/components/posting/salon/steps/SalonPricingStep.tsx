
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface SalonPricingStepProps {
  pricingOptions: any;
  setPricingOptions: React.Dispatch<React.SetStateAction<any>>;
}

const SalonPricingStep: React.FC<SalonPricingStepProps> = ({ 
  pricingOptions, 
  setPricingOptions 
}) => {
  const [selectedPlan, setSelectedPlan] = useState('3months');

  const plans = [
    {
      id: '1month',
      title: '1 tháng / 1 month',
      price: '$19.99',
      originalPrice: '$24.99',
      discount: '20% off',
      features: [
        'Basic listing visibility',
        '30-day duration',
        'Standard placement'
      ]
    },
    {
      id: '3months', 
      title: '3 tháng / 3 months',
      price: '$49.99',
      originalPrice: '$74.97',
      discount: '33% off',
      popular: true,
      features: [
        'Featured placement',
        'Priority in search',
        'Extended visibility',
        'Email alerts to buyers'
      ]
    },
    {
      id: '6months',
      title: '6 tháng / 6 months', 
      price: '$89.99',
      originalPrice: '$149.94',
      discount: '40% off',
      bestValue: true,
      features: [
        'Premium placement',
        'Top of search results',
        'Maximum exposure',
        'Dedicated support',
        'Boost notifications'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setPricingOptions((prev: any) => ({
      ...prev,
      selectedPlan: planId
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pricing Plan / Chọn Gói Đăng Tin
        </h2>
        <p className="text-gray-600">
          Choose the plan and duration that fits your needs / Chọn gói và thời hạn đăng tin phù hợp với nhu cầu của bạn
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">
          Chọn Gói Đăng Tin / Choose Your Listing Plan
        </h3>
        <p className="text-gray-600 mb-8">
          Chọn thời hạn phù hợp để salon của bạn tiếp cận đúng đối tượng khách hàng.<br />
          Select the right duration to reach your target buyers effectively.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                selectedPlan === plan.id 
                  ? 'ring-2 ring-purple-500 shadow-lg' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white">
                  Most Popular
                </Badge>
              )}
              {plan.bestValue && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-600 text-white">
                  Best Value
                </Badge>
              )}

              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold mb-2">{plan.title}</h3>
                  <div className="mb-2">
                    <span className="text-2xl font-bold text-purple-600">{plan.price}</span>
                    {plan.originalPrice && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  {plan.discount && (
                    <Badge variant="secondary" className="text-green-600">
                      {plan.discount}
                    </Badge>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={selectedPlan === plan.id ? "default" : "outline"}
                  className="w-full"
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Selected Plan Summary */}
      {selectedPlan && (
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-purple-800 mb-2">
              Selected Plan Summary / Tóm tắt gói đã chọn
            </h3>
            <div className="text-sm text-purple-700">
              <p>Plan: {plans.find(p => p.id === selectedPlan)?.title}</p>
              <p>Price: {plans.find(p => p.id === selectedPlan)?.price}</p>
              <p className="mt-2 text-purple-600">
                Your salon listing will be live and visible to potential buyers immediately after payment.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SalonPricingStep;
