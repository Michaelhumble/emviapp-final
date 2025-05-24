
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, Star, Crown, Zap } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  features: string[];
  tag?: string;
  popular?: boolean;
  exclusive?: boolean;
  spotsLeft?: number;
}

interface PremiumPricingTableProps {
  onPlanSelect?: (plan: PricingPlan) => void;
  selectedPlan?: string;
  isFirstPost?: boolean;
}

const PremiumPricingTable: React.FC<PremiumPricingTableProps> = ({
  onPlanSelect,
  selectedPlan,
  isFirstPost = false
}) => {
  const plans: PricingPlan[] = [
    {
      id: 'standard',
      name: 'Standard',
      price: 24.99,
      duration: 'month',
      description: 'Great for short-term posts',
      features: [
        '30-day active listing',
        'Basic visibility',
        'Standard support',
        'Mobile-optimized display'
      ]
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 49.99,
      duration: '3 months',
      description: 'Save $25 — Most popular!',
      tag: 'Best Value',
      popular: true,
      features: [
        '90-day active listing',
        'Priority placement',
        'Enhanced visibility',
        'Priority support',
        'Featured badge',
        'Mobile + desktop optimization'
      ]
    },
    {
      id: 'diamond',
      name: 'Diamond',
      price: 999.99,
      duration: 'year',
      description: 'Only 2 left. Exclusive, bid or apply only.',
      tag: 'VIP',
      exclusive: true,
      spotsLeft: 2,
      features: [
        '12-month premium listing',
        'Top placement guaranteed',
        'Exclusive VIP badge',
        'Dedicated account manager',
        'Priority customer support',
        'Advanced analytics',
        'Custom branding options',
        'Invite/Bid only access'
      ]
    }
  ];

  const handlePlanClick = (plan: PricingPlan) => {
    if (onPlanSelect) {
      onPlanSelect(plan);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Fast-Track Your Salon's Success — Premium Listings That Overdeliver
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Choose the perfect plan to showcase your opportunity and attract top talent faster
        </p>
      </div>

      {/* First Post Free Banner */}
      {isFirstPost && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-8 text-center">
          <div className="flex items-center justify-center mb-2">
            <Star className="w-5 h-5 text-green-600 mr-2" />
            <span className="font-semibold text-green-800">Your First Job Post is FREE!</span>
          </div>
          <p className="text-sm text-green-700">
            Experience our premium features at no cost. Card required for verification only.
          </p>
        </div>
      )}

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <Card 
            key={plan.id}
            className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl ${
              plan.popular 
                ? 'ring-2 ring-purple-500 shadow-lg scale-105' 
                : plan.exclusive
                ? 'ring-2 ring-amber-500 shadow-lg'
                : 'hover:shadow-md'
            } ${selectedPlan === plan.id ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => handlePlanClick(plan)}
          >
            {/* Popular/Tag Badge */}
            {plan.tag && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                <Badge 
                  className={`px-3 py-1 text-xs font-semibold ${
                    plan.popular 
                      ? 'bg-purple-600 text-white' 
                      : plan.exclusive
                      ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white'
                      : 'bg-gray-600 text-white'
                  }`}
                >
                  {plan.tag}
                </Badge>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center mb-2">
                {plan.exclusive && <Crown className="w-6 h-6 text-amber-500 mr-2" />}
                {plan.popular && <Zap className="w-6 h-6 text-purple-500 mr-2" />}
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
              </div>
              
              <div className="mb-2">
                <span className="text-3xl md:text-4xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-600 ml-1">/{plan.duration}</span>
              </div>
              
              <p className="text-sm text-gray-600 font-medium">
                {plan.description}
              </p>

              {/* Spots Left Indicator for Diamond */}
              {plan.exclusive && plan.spotsLeft && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-2 mt-3">
                  <p className="text-xs text-red-700 font-semibold">
                    🔥 Only {plan.spotsLeft} spots remaining
                  </p>
                  <p className="text-xs text-red-600">
                    1 spot reserved • High demand
                  </p>
                </div>
              )}
            </CardHeader>

            <CardContent>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full ${
                  plan.popular 
                    ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                    : plan.exclusive
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
                disabled={plan.exclusive} // Diamond is invite/bid only for now
              >
                {plan.exclusive ? 'Apply for Invitation' : `Select ${plan.name}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Information */}
      <div className="text-center text-sm text-gray-600 space-y-2">
        <p className="font-medium">
          First job post is always <span className="text-green-600 font-semibold">FREE</span> (requires card/business info).
        </p>
        <p>
          All paid plans renew automatically, cancel anytime. 
          <span className="font-medium text-amber-600 ml-1">Diamond: Invite/Bid only.</span>
        </p>
        <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
          <Check className="w-4 h-4 text-green-500 mr-1" />
          <span>Secure payment • Cancel anytime • 30-day guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default PremiumPricingTable;
