
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckedState } from '@radix-ui/react-checkbox';

export interface PricingOptions {
  tier: 'free' | 'standard' | 'premium' | 'gold';
  duration: number;
  autoRenew: boolean;
}

interface JobPricingStepProps {
  onNext: (pricingOptions: PricingOptions) => void;
  isLoading?: boolean;
}

const JobPricingStep: React.FC<JobPricingStepProps> = ({ onNext, isLoading = false }) => {
  const [selectedTier, setSelectedTier] = useState<'free' | 'standard' | 'premium' | 'gold'>('free');
  const [duration, setDuration] = useState(1);
  const [autoRenew, setAutoRenew] = useState(false);

  const pricingTiers = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: ['Basic listing', '7-day duration', 'Limited visibility']
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 29,
      features: ['Enhanced listing', '30-day duration', 'Priority support']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 59,
      features: ['Premium listing', '60-day duration', 'Featured placement', 'Analytics']
    },
    {
      id: 'gold',
      name: 'Gold',
      price: 99,
      features: ['Gold listing', '90-day duration', 'Top placement', 'Advanced analytics', 'Dedicated support']
    }
  ];

  const durationOptions = [
    { months: 1, label: '1 Month', discount: 0 },
    { months: 3, label: '3 Months', discount: 10 },
    { months: 6, label: '6 Months', discount: 15 },
    { months: 12, label: '12 Months', discount: 20 }
  ];

  const calculatePrice = () => {
    const baseTier = pricingTiers.find(tier => tier.id === selectedTier);
    if (!baseTier || baseTier.price === 0) return 0;

    let price = baseTier.price * duration;
    
    // Apply duration discount
    const durationOption = durationOptions.find(option => option.months === duration);
    if (durationOption && durationOption.discount > 0) {
      price = price * (1 - durationOption.discount / 100);
    }

    // Apply auto-renew discount
    if (autoRenew) {
      price = price * 0.95; // 5% discount
    }

    return Math.round(price * 100) / 100;
  };

  const handleSubmit = () => {
    const pricingOptions: PricingOptions = {
      tier: selectedTier,
      duration,
      autoRenew
    };
    onNext(pricingOptions);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Choose Your Plan</h2>
        <p className="text-gray-600">Select the best plan for your job posting</p>
      </div>

      <div className="grid gap-4">
        <RadioGroup value={selectedTier} onValueChange={(value) => setSelectedTier(value as typeof selectedTier)}>
          {pricingTiers.map((tier) => (
            <Card key={tier.id} className={`cursor-pointer transition-colors ${selectedTier === tier.id ? 'ring-2 ring-primary' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value={tier.id} id={tier.id} />
                  <Label htmlFor={tier.id} className="flex-1 cursor-pointer">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{tier.name}</h3>
                        <ul className="text-sm text-gray-600 mt-1">
                          {tier.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold">${tier.price}</span>
                        {tier.price > 0 && <span className="text-sm text-gray-500">/month</span>}
                      </div>
                    </div>
                  </Label>
                </div>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
      </div>

      {selectedTier !== 'free' && (
        <Card>
          <CardHeader>
            <CardTitle>Duration & Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Duration</Label>
              <RadioGroup value={duration.toString()} onValueChange={(value) => setDuration(parseInt(value))}>
                {durationOptions.map((option) => (
                  <div key={option.months} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.months.toString()} id={`duration-${option.months}`} />
                    <Label htmlFor={`duration-${option.months}`} className="flex-1">
                      {option.label}
                      {option.discount > 0 && (
                        <span className="ml-2 text-green-600 font-medium">
                          ({option.discount}% off)
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="auto-renew"
                checked={autoRenew}
                onCheckedChange={(checked: CheckedState) => setAutoRenew(checked === true)}
              />
              <Label htmlFor="auto-renew">
                Auto-renew (save 5% monthly)
              </Label>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium">Total Price:</span>
            <span className="text-2xl font-bold">${calculatePrice()}</span>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={handleSubmit} 
        className="w-full" 
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Proceed to Payment'}
      </Button>
    </div>
  );
};

export default JobPricingStep;
