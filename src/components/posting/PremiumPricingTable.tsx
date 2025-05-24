
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, Crown, Sparkles, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { JobPricingTier, PricingOptions } from '@/utils/posting/types';

interface PremiumPricingTableProps {
  selectedTier: JobPricingTier;
  durationMonths: number;
  autoRenew: boolean;
  isNationwide: boolean;
  onPricingChange: (options: PricingOptions) => void;
  onProceedToPayment: () => void;
  onBack: () => void;
  isLoading: boolean;
  totalPrice: number;
  originalPrice: number;
  discountPercentage: number;
}

const pricingPlans = [
  {
    id: 'standard',
    name: 'Standard',
    price: 9.99,
    description: 'Perfect for getting started',
    features: [
      'Active for 30 days',
      'Email notifications',
      'Basic support',
      'Standard visibility'
    ],
    color: 'border-gray-200',
    textColor: 'text-gray-900'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 19.99,
    description: 'Enhanced visibility',
    features: [
      'Active for 30 days',
      'Priority placement',
      'Featured badge',
      'Premium support',
      'Enhanced visibility'
    ],
    popular: true,
    color: 'border-purple-500',
    textColor: 'text-purple-900'
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 39.99,
    description: 'Maximum exposure',
    features: [
      'Active for 45 days',
      'Top placement guarantee',
      'Gold badge',
      'Priority support',
      'Maximum visibility',
      'Featured in newsletters'
    ],
    color: 'border-amber-500',
    textColor: 'text-amber-900'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    price: 999,
    description: 'Exclusive tier',
    features: [
      'Active for 60 days',
      'Guaranteed top placement',
      'Diamond badge',
      'Dedicated support',
      'Personal account manager',
      'Custom promotion'
    ],
    waitlist: true,
    spotsLeft: '2 spots left',
    color: 'border-indigo-500',
    textColor: 'text-indigo-900'
  }
];

const durationOptions = [
  { months: 1, label: '1 Month', discount: 0 },
  { months: 3, label: '3 Months', discount: 17, popular: true, specialPrice: 49.99 },
  { months: 6, label: '6 Months', discount: 25 },
  { months: 12, label: '12 Months', discount: 30 }
];

const PremiumPricingTable: React.FC<PremiumPricingTableProps> = ({
  selectedTier,
  durationMonths,
  autoRenew,
  isNationwide,
  onPricingChange,
  onProceedToPayment,
  onBack,
  isLoading,
  totalPrice,
  originalPrice,
  discountPercentage
}) => {
  const [selectedPlan, setSelectedPlan] = useState(selectedTier);
  const [selectedDuration, setSelectedDuration] = useState(durationMonths);
  const [autoRenewEnabled, setAutoRenewEnabled] = useState(autoRenew);
  const [nationwideEnabled, setNationwideEnabled] = useState(isNationwide);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId as JobPricingTier);
    updatePricingOptions(planId as JobPricingTier, selectedDuration, autoRenewEnabled, nationwideEnabled);
  };

  const handleDurationSelect = (months: number) => {
    setSelectedDuration(months);
    updatePricingOptions(selectedPlan, months, autoRenewEnabled, nationwideEnabled);
  };

  const handleAutoRenewToggle = (enabled: boolean) => {
    setAutoRenewEnabled(enabled);
    updatePricingOptions(selectedPlan, selectedDuration, enabled, nationwideEnabled);
  };

  const handleNationwideToggle = (enabled: boolean) => {
    setNationwideEnabled(enabled);
    updatePricingOptions(selectedPlan, selectedDuration, autoRenewEnabled, enabled);
  };

  const updatePricingOptions = (tier: JobPricingTier, duration: number, autoRenew: boolean, nationwide: boolean) => {
    onPricingChange({
      selectedPricingTier: tier,
      durationMonths: duration,
      autoRenew,
      isNationwide: nationwide
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
        <p className="text-lg text-gray-600">Select the perfect plan to reach the right candidates</p>
      </div>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.id}
            className={cn(
              "relative cursor-pointer transition-all duration-200 hover:shadow-lg",
              plan.color,
              selectedPlan === plan.id ? 'ring-2 ring-purple-500 shadow-lg' : '',
              plan.popular ? 'scale-105' : ''
            )}
            onClick={() => !plan.waitlist && handlePlanSelect(plan.id)}
          >
            {plan.popular && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-600">
                Most Popular
              </Badge>
            )}
            {plan.waitlist && (
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-indigo-600">
                {plan.spotsLeft}
              </Badge>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className={cn("text-xl", plan.textColor)}>
                <div className="flex items-center justify-center gap-2">
                  {plan.id === 'diamond' && <Crown className="h-5 w-5" />}
                  {plan.id === 'gold' && <Sparkles className="h-5 w-5" />}
                  {plan.name}
                </div>
              </CardTitle>
              <div className="text-3xl font-bold">
                {plan.waitlist ? (
                  <span className="text-lg">Waitlist Only</span>
                ) : (
                  <>
                    ${plan.price}
                    <span className="text-base font-normal text-gray-500">/month</span>
                  </>
                )}
              </div>
              <p className="text-gray-600">{plan.description}</p>
            </CardHeader>
            
            <CardContent>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                className={cn(
                  "w-full",
                  selectedPlan === plan.id && !plan.waitlist ? 'bg-purple-600 hover:bg-purple-700' : '',
                  plan.waitlist ? 'bg-indigo-600 hover:bg-indigo-700' : ''
                )}
                variant={selectedPlan === plan.id && !plan.waitlist ? 'default' : 'outline'}
                disabled={plan.waitlist}
              >
                {plan.waitlist ? 'Join Waitlist' : selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Duration Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {durationOptions.map((option) => (
              <Button
                key={option.months}
                variant={selectedDuration === option.months ? 'default' : 'outline'}
                className="relative h-auto p-4 flex flex-col items-center"
                onClick={() => handleDurationSelect(option.months)}
              >
                {option.popular && (
                  <Badge className="absolute -top-2 bg-green-600 text-xs">
                    Best Value
                  </Badge>
                )}
                <span className="font-medium">{option.label}</span>
                {option.discount > 0 && (
                  <span className="text-xs text-green-600 mt-1">
                    Save {option.discount}%
                  </span>
                )}
                {option.specialPrice && selectedPlan === 'premium' && (
                  <span className="text-xs text-gray-500 mt-1">
                    ${option.specialPrice} total
                  </span>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Additional Options */}
      <Card>
        <CardHeader>
          <CardTitle>Additional Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-renew" className="text-base font-medium">
                Auto-renew subscription
              </Label>
              <p className="text-sm text-gray-500">Save 5% with auto-renewal</p>
            </div>
            <Switch
              id="auto-renew"
              checked={autoRenewEnabled}
              onCheckedChange={handleAutoRenewToggle}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="nationwide" className="text-base font-medium">
                Nationwide visibility
              </Label>
              <p className="text-sm text-gray-500">Show to candidates across the country (+$5)</p>
            </div>
            <Switch
              id="nationwide"
              checked={nationwideEnabled}
              onCheckedChange={handleNationwideToggle}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing Summary */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Plan</span>
              <span>{pricingPlans.find(p => p.id === selectedPlan)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Duration</span>
              <span>{selectedDuration} month{selectedDuration > 1 ? 's' : ''}</span>
            </div>
            {discountPercentage > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{discountPercentage}%</span>
              </div>
            )}
            {nationwideEnabled && (
              <div className="flex justify-between">
                <span>Nationwide visibility</span>
                <span>+$5.00</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total</span>
              <div>
                {originalPrice !== totalPrice && (
                  <span className="line-through text-gray-500 text-sm mr-2">
                    ${originalPrice.toFixed(2)}
                  </span>
                )}
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Job Details
        </Button>
        <Button 
          onClick={onProceedToPayment}
          disabled={isLoading || selectedPlan === 'diamond'}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {isLoading ? 'Processing...' : selectedPlan === 'diamond' ? 'Join Waitlist' : 'Proceed to Payment'}
        </Button>
      </div>
    </div>
  );
};

export default PremiumPricingTable;
