
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { Crown, Star, Zap } from 'lucide-react';

interface JobPricingStepProps {
  onSubmit: (pricingOptions: PricingOptions) => void;
  isLoading?: boolean;
}

const JobPricingStep = ({ onSubmit, isLoading = false }: JobPricingStepProps) => {
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>('standard');
  const [durationMonths, setDurationMonths] = useState(1);
  const [autoRenew, setAutoRenew] = useState(false);

  const handleSubmit = () => {
    const pricingOptions: PricingOptions = {
      selectedPricingTier: selectedTier,
      durationMonths,
      autoRenew,
      isFirstPost: false // You can add logic to detect first post
    };
    
    onSubmit(pricingOptions);
  };

  const getTierIcon = (tier: JobPricingTier) => {
    switch (tier) {
      case 'diamond':
        return <Crown className="w-5 h-5 text-purple-600" />;
      case 'gold':
        return <Star className="w-5 h-5 text-yellow-600" />;
      case 'premium':
        return <Zap className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Pricing Plan</h2>
        <p className="text-gray-600">Select the plan that best fits your hiring needs</p>
      </div>

      <RadioGroup value={selectedTier} onValueChange={(value) => setSelectedTier(value as JobPricingTier)}>
        <div className="grid gap-4">
          {jobPricingOptions.map((option) => (
            <div key={option.id} className="relative">
              <RadioGroupItem value={option.tier} id={option.id} className="sr-only" />
              <Label
                htmlFor={option.id}
                className={`block cursor-pointer p-4 border-2 rounded-lg transition-all ${
                  selectedTier === option.tier
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Card className="shadow-none border-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getTierIcon(option.tier)}
                        <span className="text-lg">{option.name}</span>
                        {option.popular && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            Most Popular
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${option.price}</div>
                        {option.wasPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${option.wasPrice}
                          </div>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-3">{option.description}</p>
                    {option.features && (
                      <ul className="text-sm text-gray-600 space-y-1">
                        {option.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>

      <div className="mt-8 pt-6 border-t">
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full py-3 text-lg"
        >
          {isLoading ? 'Processing...' : 'Continue to Payment'}
        </Button>
      </div>
    </div>
  );
};

export default JobPricingStep;
