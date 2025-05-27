
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from "@/hooks/useTranslation";

interface PricingPlan {
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  onSelect: () => void;
}

interface PricingCardsProps {
  plans: PricingPlan[];
  title?: string;
  subtitle?: string;
}

const PricingCards: React.FC<PricingCardsProps> = ({ 
  plans, 
  title = "Choose Your Plan",
  subtitle = "Select the perfect plan for your needs"
}) => {
  const { t, isVietnamese } = useTranslation();

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-lg text-gray-600">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card 
            key={index} 
            className={`relative ${plan.popular ? 'border-purple-500 shadow-lg' : 'border-gray-200'}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  {isVietnamese ? "Phổ Biến Nhất" : "Most Popular"}
                </span>
              </div>
            )}
            
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-xl font-semibold">{plan.name}</CardTitle>
              <div className="mt-4">
                <div className="flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-1">/{plan.period}</span>
                </div>
                {plan.originalPrice && (
                  <div className="text-sm text-gray-500 line-through mt-1">
                    {plan.originalPrice}
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-sm mt-2">{plan.description}</p>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={plan.onSelect}
                className={`w-full ${
                  plan.popular 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingCards;
