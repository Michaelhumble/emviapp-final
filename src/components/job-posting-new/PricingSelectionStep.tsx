
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Crown, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { DurationSelector } from '@/components/posting/pricing/DurationSelector';

interface PricingSelectionStepProps {
  onBack: () => void;
  onPricingSelect: (pricingOptions: PricingOptions) => void;
  isSubmitting?: boolean;
}

const pricingPlans = [
  {
    id: 'free' as JobPricingTier,
    name: 'Free',
    price: 0,
    description: 'Basic job posting for 7 days',
    features: ['7-day listing', 'Basic visibility', 'Email applications'],
    popular: false,
    color: 'border-gray-200'
  },
  {
    id: 'standard' as JobPricingTier,
    name: 'Standard',
    price: 29,
    description: 'Enhanced visibility for 30 days',
    features: ['30-day listing', 'Enhanced visibility', 'Email & SMS notifications', 'Basic analytics'],
    popular: true,
    color: 'border-purple-300'
  },
  {
    id: 'premium' as JobPricingTier,
    name: 'Premium',
    price: 59,
    description: 'Priority placement for 60 days',
    features: ['60-day listing', 'Priority placement', 'Featured badge', 'Advanced analytics', 'Dedicated support'],
    popular: false,
    color: 'border-blue-300'
  },
  {
    id: 'gold' as JobPricingTier,
    name: 'Gold',
    price: 99,
    description: 'Maximum exposure for 90 days',
    features: ['90-day listing', 'Top placement', 'Gold badge', 'Premium analytics', 'Priority support', 'Social media boost'],
    popular: false,
    color: 'border-yellow-300'
  },
  {
    id: 'diamond' as JobPricingTier,
    name: 'Diamond',
    price: 199,
    description: 'Exclusive tier - By invitation only',
    features: ['Custom duration', 'Exclusive placement', 'White-glove service', 'Custom branding', 'Dedicated account manager'],
    popular: false,
    color: 'border-purple-500',
    disabled: true
  }
];

const PricingSelectionStep: React.FC<PricingSelectionStepProps> = ({
  onBack,
  onPricingSelect,
  isSubmitting = false
}) => {
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>('standard');
  const [durationMonths, setDurationMonths] = useState(1);
  const [autoRenew, setAutoRenew] = useState(false);

  const handleContinue = () => {
    const pricingOptions: PricingOptions = {
      selectedPricingTier: selectedTier,
      durationMonths,
      autoRenew,
      isFirstPost: false,
      isNationwide: false
    };
    
    onPricingSelect(pricingOptions);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
            disabled={isSubmitting}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Job Details
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Choose Your Pricing Plan</h1>
            <p className="text-gray-600 mb-8">
              Select the plan that best fits your hiring needs
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`cursor-pointer transition-all ${
                selectedTier === plan.id
                  ? `ring-2 ring-purple-500 ${plan.color}`
                  : plan.color
              } ${plan.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}`}
              onClick={() => !plan.disabled && setSelectedTier(plan.id)}
            >
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  {plan.id === 'diamond' && <Crown className="w-6 h-6 text-purple-500 mr-2" />}
                  {plan.id === 'gold' && <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />}
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  {plan.popular && (
                    <Badge className="ml-2 bg-purple-600 text-white">Most Popular</Badge>
                  )}
                  {plan.disabled && (
                    <Badge variant="outline" className="ml-2">Invitation Only</Badge>
                  )}
                </div>
                <div className="text-3xl font-bold">
                  ${plan.price}
                  {!plan.disabled && <span className="text-sm font-normal">/month</span>}
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedTier !== 'free' && selectedTier !== 'diamond' && (
          <div className="mb-8">
            <DurationSelector
              durationMonths={durationMonths}
              onDurationChange={setDurationMonths}
              selectedPricingTier={selectedTier}
              isDiamondPlan={selectedTier === 'diamond'}
            />
          </div>
        )}

        <div className="flex justify-center">
          <Button
            onClick={handleContinue}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 
             selectedTier === 'free' ? 'Post for Free' :
             selectedTier === 'diamond' ? 'Join Waitlist' :
             'Continue to Payment'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PricingSelectionStep;
