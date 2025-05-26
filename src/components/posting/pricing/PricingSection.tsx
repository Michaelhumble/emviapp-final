
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JobPricingTier, PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import { Check, Crown, Star, Diamond } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface PricingSectionProps {
  selectedTier: JobPricingTier;
  onTierSelect: (tier: JobPricingTier) => void;
  options: PricingOptions;
  onProceed: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  selectedTier,
  onTierSelect,
  options,
  onProceed
}) => {
  const { t } = useTranslation();

  const pricingPlans = [
    {
      tier: 'free' as JobPricingTier,
      name: 'Free Listing',
      price: 0,
      duration: 30,
      priceLabel: '$0',
      durationLabel: '30 days',
      features: ['Basic visibility', '30-day duration', 'Standard placement'],
      icon: <Check className="h-5 w-5 text-gray-500" />
    },
    {
      tier: 'gold' as JobPricingTier,
      name: 'Gold Featured',
      price: 19.99,
      duration: 30,
      priceLabel: '$19.99',
      durationLabel: '30 days',
      features: ['Featured placement', 'Gold badge', 'Priority listing'],
      icon: <Star className="h-5 w-5 text-amber-500" />
    },
    {
      tier: 'premium' as JobPricingTier,
      name: 'Premium Listing',
      price: 39.99,
      duration: 30,
      priceLabel: '$39.99',
      durationLabel: '30 days',
      features: ['Top placement', 'Premium badge', 'Analytics'],
      icon: <Crown className="h-5 w-5 text-purple-500" />
    },
    {
      tier: 'diamond' as JobPricingTier,
      name: 'Diamond Exclusive',
      price: 999.99,
      duration: 365,
      priceLabel: '$999.99',
      durationLabel: '1 year only',
      features: ['Highest placement', 'Diamond badge', 'Personal manager', 'Annual exclusive'],
      icon: <Diamond className="h-5 w-5 text-cyan-500" />
    }
  ];

  const handleTierSelect = (tier: JobPricingTier) => {
    onTierSelect(tier);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">Select the perfect plan for your listing</p>
      </div>
      
      {selectedTier === 'diamond' && (
        <Alert className="border-cyan-200 bg-cyan-50">
          <Diamond className="h-4 w-4 text-cyan-600" />
          <AlertDescription className="text-cyan-800">
            Diamond is only available as a $999.99 annual listing - No monthly options
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pricingPlans.map((plan) => (
          <Card
            key={plan.tier}
            className={`cursor-pointer transition-all ${
              selectedTier === plan.tier
                ? 'ring-2 ring-purple-500 border-purple-500'
                : 'hover:border-purple-300'
            }`}
            onClick={() => handleTierSelect(plan.tier)}
          >
            <CardHeader className="text-center">
              <div className="flex justify-center mb-2">{plan.icon}</div>
              <CardTitle className="text-lg">{plan.name}</CardTitle>
              <div className="text-2xl font-bold">
                {plan.priceLabel}
                {plan.tier === 'diamond' && <span className="text-sm font-normal">/year</span>}
              </div>
              <p className="text-sm text-gray-500">
                {plan.tier === 'diamond' ? 'Annual Only' : plan.durationLabel}
              </p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full mt-4 ${
                  selectedTier === plan.tier
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTierSelect(plan.tier);
                }}
              >
                {selectedTier === plan.tier ? 'Selected' : 'Select'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button onClick={onProceed} className="px-8 py-2">
          Continue with {selectedTier === 'free' ? 'Free' : 
                       selectedTier === 'gold' ? 'Gold' :
                       selectedTier === 'premium' ? 'Premium' : 'Diamond Annual'} Plan
        </Button>
      </div>
    </div>
  );
};

export default PricingSection;
