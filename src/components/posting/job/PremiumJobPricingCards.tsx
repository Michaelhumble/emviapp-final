
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';

interface PremiumJobPricingCardsProps {
  onPricingSelect: (tier: string, finalPrice: number, durationMonths: number) => void;
  jobData?: any;
}

const PremiumJobPricingCards: React.FC<PremiumJobPricingCardsProps> = ({
  onPricingSelect,
  jobData
}) => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      duration: 1,
      icon: <Zap className="h-6 w-6" />,
      popular: false,
      features: [
        'Basic job listing',
        '30-day visibility',
        'Standard support',
        'Basic search placement'
      ],
      color: 'border-gray-200',
      buttonColor: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 49.99,
      duration: 1,
      icon: <Star className="h-6 w-6" />,
      popular: true,
      features: [
        'Enhanced visibility',
        '30-day listing',
        'Priority support',
        'Featured badge',
        'Higher search ranking'
      ],
      color: 'border-yellow-300',
      buttonColor: 'bg-yellow-600 hover:bg-yellow-700'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 99.99,
      duration: 1,
      icon: <Crown className="h-6 w-6" />,
      popular: false,
      features: [
        'Premium visibility',
        '30-day listing',
        'Priority support',
        'Featured badge',
        'Top search results',
        'Social media promotion'
      ],
      color: 'border-purple-300',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      id: 'diamond',
      name: 'Diamond',
      price: 999.99,
      duration: 12,
      icon: <Crown className="h-6 w-6" />,
      popular: false,
      features: [
        'Maximum visibility',
        '12-month listing',
        'Dedicated support',
        'Premium badge',
        'Top placement guaranteed',
        'Analytics dashboard',
        'Custom branding'
      ],
      color: 'border-blue-300',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    }
  ];

  const handleSelectPlan = (plan: any) => {
    setSelectedTier(plan.id);
    onPricingSelect(plan.id, plan.price, plan.duration);
  };

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Job Posting Plan
          </h2>
          <p className="text-lg text-gray-600">
            Select the plan that best fits your hiring needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-purple-500' : ''} hover:shadow-lg transition-shadow`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-purple-600 text-white">Most Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  {plan.icon}
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-gray-900">
                  {plan.price === 0 ? 'Free' : `$${plan.price}`}
                </div>
                <div className="text-sm text-gray-600">
                  {plan.duration} month{plan.duration > 1 ? 's' : ''}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full ${plan.buttonColor} text-white`}
                  disabled={selectedTier === plan.id}
                >
                  {selectedTier === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>All plans include secure payment processing and 24/7 customer support.</p>
          <p className="mt-2">Need help choosing? <a href="/contact" className="text-purple-600 hover:underline">Contact our team</a></p>
        </div>
      </div>
    </div>
  );
};

export default PremiumJobPricingCards;
