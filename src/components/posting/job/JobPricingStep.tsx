
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { JobFormValues } from './jobFormSchema';
import { Badge } from '@/components/ui/badge';

interface JobPricingStepProps {
  formData: Partial<JobFormValues>;
  onPricingSelect: (pricingOptions: PricingOptions) => void;
  isLoading: boolean;
}

const JobPricingStep: React.FC<JobPricingStepProps> = ({
  formData,
  onPricingSelect,
  isLoading
}) => {
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>('standard');
  const [durationMonths, setDurationMonths] = useState(1);
  const [autoRenew, setAutoRenew] = useState(false);
  const [isNationwide, setIsNationwide] = useState(false);

  const pricingTiers = [
    {
      id: 'free' as JobPricingTier,
      name: 'Free',
      price: 0,
      description: 'Basic job posting',
      features: ['30-day listing', 'Basic visibility']
    },
    {
      id: 'standard' as JobPricingTier,
      name: 'Standard',
      price: 49,
      description: 'Enhanced visibility',
      features: ['60-day listing', 'Enhanced visibility', 'Email notifications']
    },
    {
      id: 'premium' as JobPricingTier,
      name: 'Premium',
      price: 99,
      description: 'Priority placement',
      features: ['90-day listing', 'Priority placement', 'Featured badge', 'Analytics'],
      popular: true
    },
    {
      id: 'gold' as JobPricingTier,
      name: 'Gold',
      price: 199,
      description: 'Maximum exposure',
      features: ['120-day listing', 'Top placement', 'Highlighted listing', 'Priority support']
    },
    {
      id: 'diamond' as JobPricingTier,
      name: 'Diamond',
      price: 299,
      description: 'Invitation only',
      features: ['Unlimited listing', 'VIP support', 'Custom branding', 'Dedicated account manager']
    }
  ];

  const durationOptions = [
    { months: 1, discount: 0, label: '1 Month' },
    { months: 3, discount: 10, label: '3 Months (10% off)' },
    { months: 6, discount: 15, label: '6 Months (15% off)' },
    { months: 12, discount: 20, label: '12 Months (20% off)' }
  ];

  const calculatePrice = () => {
    const selectedTierData = pricingTiers.find(tier => tier.id === selectedTier);
    if (!selectedTierData || selectedTierData.price === 0) return 0;

    let basePrice = selectedTierData.price * durationMonths;
    
    // Apply duration discount
    const durationOption = durationOptions.find(opt => opt.months === durationMonths);
    if (durationOption && durationOption.discount > 0) {
      basePrice = basePrice * (1 - durationOption.discount / 100);
    }

    // Apply auto-renew discount
    if (autoRenew) {
      basePrice = basePrice * 0.95; // 5% discount
    }

    // Add nationwide posting fee
    if (isNationwide) {
      basePrice += 5;
    }

    return Math.round(basePrice * 100) / 100;
  };

  const handleProceedToPayment = () => {
    const pricingOptions: PricingOptions = {
      selectedPricingTier: selectedTier,
      durationMonths,
      autoRenew,
      isNationwide
    };
    
    onPricingSelect(pricingOptions);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Choose Your Plan</h3>
        <p className="text-gray-600">Select a pricing tier for your job posting</p>
      </div>

      {/* Pricing Tiers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pricingTiers.map((tier) => (
          <Card
            key={tier.id}
            className={`cursor-pointer transition-all ${
              selectedTier === tier.id
                ? 'ring-2 ring-primary border-primary'
                : 'hover:shadow-md'
            } ${tier.popular ? 'border-primary' : ''}`}
            onClick={() => setSelectedTier(tier.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{tier.name}</CardTitle>
                {tier.popular && (
                  <Badge variant="default" className="text-xs">
                    Popular
                  </Badge>
                )}
              </div>
              <div className="text-2xl font-bold">
                ${tier.price}
                {tier.price > 0 && <span className="text-sm font-normal">/month</span>}
              </div>
              <p className="text-sm text-gray-600">{tier.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {tier.features.map((feature, index) => (
                  <li key={index} className="text-sm flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Duration Selection */}
      {selectedTier !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {durationOptions.map((option) => (
                <Button
                  key={option.months}
                  variant={durationMonths === option.months ? 'default' : 'outline'}
                  onClick={() => setDurationMonths(option.months)}
                  className="h-auto p-3 flex flex-col items-center"
                >
                  <span className="font-medium">{option.label}</span>
                  {option.discount > 0 && (
                    <span className="text-xs text-green-600">Save {option.discount}%</span>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Additional Options */}
      {selectedTier !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Additional Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="autoRenew"
                checked={autoRenew}
                onCheckedChange={(checked: CheckedState) => setAutoRenew(checked === true)}
              />
              <label htmlFor="autoRenew" className="text-sm font-medium">
                Auto-renew subscription (+5% discount)
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="nationwide"
                checked={isNationwide}
                onCheckedChange={(checked: CheckedState) => setIsNationwide(checked === true)}
              />
              <label htmlFor="nationwide" className="text-sm font-medium">
                Nationwide posting (+$5)
              </label>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Total Price</p>
              <p className="text-sm text-gray-600">
                {selectedTier === 'free' ? 'Free listing' : `${durationMonths} month${durationMonths > 1 ? 's' : ''}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">${calculatePrice()}</p>
              {selectedTier !== 'free' && durationMonths > 1 && (
                <p className="text-sm text-gray-600">
                  ${(calculatePrice() / durationMonths).toFixed(2)}/month
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proceed Button */}
      <Button
        onClick={handleProceedToPayment}
        disabled={isLoading}
        className="w-full"
        size="lg"
      >
        {isLoading ? 'Processing...' : 'Proceed to Payment'}
      </Button>
    </div>
  );
};

export default JobPricingStep;
