
import React from 'react';
import { usePricing } from '@/context/pricing/PricingProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, Sparkles } from 'lucide-react';
import { JobPricingTier } from '@/utils/posting/types';

interface PricingSectionProps {
  onContinue: () => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({ onContinue }) => {
  const { pricingOptions, setPricingOptions, priceData } = usePricing();

  const handlePricingTierChange = (tier: JobPricingTier) => {
    setPricingOptions(prev => ({
      ...prev,
      selectedPricingTier: tier
    }));
  };

  const handleDurationChange = (months: number) => {
    setPricingOptions(prev => ({
      ...prev,
      durationMonths: months
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-playfair font-medium mb-2">Select Your Pricing Plan</h2>
        <p className="text-gray-600">Choose the plan that works best for your business needs.</p>
      </div>

      <RadioGroup 
        value={pricingOptions.selectedPricingTier} 
        onValueChange={(value: string) => handlePricingTierChange(value as JobPricingTier)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="relative">
          <RadioGroupItem 
            value="standard" 
            id="standard" 
            className="sr-only" 
          />
          <Label 
            htmlFor="standard" 
            className={`flex flex-col h-full border rounded-lg p-4 cursor-pointer hover:border-primary transition-all ${pricingOptions.selectedPricingTier === 'standard' ? 'border-2 border-primary bg-primary/5' : 'border-gray-200'}`}
          >
            {pricingOptions.selectedPricingTier === 'standard' && (
              <div className="absolute -top-2 -right-2">
                <div className="bg-primary text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              </div>
            )}
            <div className="font-medium text-lg">Standard</div>
            <div className="text-2xl font-semibold mt-2">$9.99</div>
            <div className="text-sm text-gray-500 mt-1">per post</div>
            <div className="mt-4 text-sm">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Basic job listing</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>7 days visibility</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Email support</span>
                </li>
              </ul>
            </div>
          </Label>
        </div>

        <div className="relative">
          <RadioGroupItem 
            value="premium" 
            id="premium" 
            className="sr-only" 
          />
          <Label 
            htmlFor="premium" 
            className={`flex flex-col h-full border rounded-lg p-4 cursor-pointer hover:border-primary transition-all ${pricingOptions.selectedPricingTier === 'premium' ? 'border-2 border-primary bg-primary/5' : 'border-gray-200'}`}
          >
            {pricingOptions.selectedPricingTier === 'premium' && (
              <div className="absolute -top-2 -right-2">
                <div className="bg-primary text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              </div>
            )}
            <div className="absolute -top-3 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              Popular
            </div>
            <div className="font-medium text-lg mt-2">Premium</div>
            <div className="text-2xl font-semibold mt-2">$19.99</div>
            <div className="text-sm text-gray-500 mt-1">per post</div>
            <div className="mt-4 text-sm">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Enhanced visibility</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>14 days visibility</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Featured in search results</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span>Priority customer support</span>
                </li>
              </ul>
            </div>
          </Label>
        </div>

        <div className="relative">
          <RadioGroupItem 
            value="gold" 
            id="gold" 
            className="sr-only" 
          />
          <Label 
            htmlFor="gold" 
            className={`flex flex-col h-full border rounded-lg p-4 cursor-pointer hover:border-primary transition-all ${pricingOptions.selectedPricingTier === 'gold' ? 'border-2 border-primary bg-primary/5' : 'border-gray-200'}`}
          >
            {pricingOptions.selectedPricingTier === 'gold' && (
              <div className="absolute -top-2 -right-2">
                <div className="bg-primary text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              </div>
            )}
            <div className="font-medium text-lg">Gold</div>
            <div className="text-2xl font-semibold mt-2">$29.99</div>
            <div className="text-sm text-gray-500 mt-1">per post</div>
            <div className="mt-4 text-sm">
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Sparkles className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                  <span>Maximum visibility</span>
                </li>
                <li className="flex items-start">
                  <Sparkles className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                  <span>30 days visibility</span>
                </li>
                <li className="flex items-start">
                  <Sparkles className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                  <span>Featured on homepage</span>
                </li>
                <li className="flex items-start">
                  <Sparkles className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                  <span>Email blast to candidates</span>
                </li>
                <li className="flex items-start">
                  <Sparkles className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                  <span>VIP support</span>
                </li>
              </ul>
            </div>
          </Label>
        </div>
      </RadioGroup>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Select Duration</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={pricingOptions.durationMonths.toString()} 
            onValueChange={(value) => handleDurationChange(parseInt(value, 10))}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[1, 2, 3].map((months) => (
              <div key={months} className="relative">
                <RadioGroupItem 
                  value={months.toString()} 
                  id={`duration-${months}`} 
                  className="sr-only" 
                />
                <Label 
                  htmlFor={`duration-${months}`} 
                  className={`flex flex-col border rounded-lg p-4 cursor-pointer hover:border-primary transition-all ${pricingOptions.durationMonths === months ? 'border-2 border-primary bg-primary/5' : 'border-gray-200'}`}
                >
                  {pricingOptions.durationMonths === months && (
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-primary text-white rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                  <div className="font-medium">
                    {months} {months === 1 ? 'Month' : 'Months'}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    {months === 1 ? 'Standard duration' : months === 2 ? 'Extended visibility' : 'Maximum exposure'}
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Button 
          onClick={onContinue} 
          className="w-full"
        >
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default PricingSection;
export { PricingSection };
