
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { Crown, Star, Zap, Gift, MapPin } from 'lucide-react';

interface JobPricingStepProps {
  onSubmit: (pricingOptions: PricingOptions) => void;
  isLoading?: boolean;
}

const JobPricingStep = ({ onSubmit, isLoading = false }: JobPricingStepProps) => {
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>('standard');
  const [durationMonths, setDurationMonths] = useState(1);
  const [autoRenew, setAutoRenew] = useState(false);
  const [nationwidePosting, setNationwidePosting] = useState(false);

  const calculatePrice = () => {
    const baseOption = jobPricingOptions.find(option => option.tier === selectedTier);
    if (!baseOption) return 0;

    let price = baseOption.price;
    
    // Apply duration discounts
    if (durationMonths === 3) price *= 0.9; // 10% off
    else if (durationMonths === 6) price *= 0.85; // 15% off
    else if (durationMonths === 12) price *= 0.8; // 20% off
    
    // Apply auto-renewal discount (5% off monthly)
    if (autoRenew && durationMonths === 1) price *= 0.95;
    
    // Add nationwide posting fee
    if (nationwidePosting) price += 5;
    
    return Math.round(price * 100) / 100; // Round to 2 decimal places
  };

  const handleSubmit = () => {
    const pricingOptions: PricingOptions = {
      selectedPricingTier: selectedTier,
      durationMonths,
      autoRenew,
      isFirstPost: false,
      nationwidePosting
    };
    
    console.log('Submitting pricing options:', pricingOptions);
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
      case 'free':
        return <Gift className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const finalPrice = calculatePrice();

  return (
    <div className="space-y-6">
      {/* Pricing Tiers */}
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
                } ${option.tier === 'diamond' ? 'opacity-60' : ''}`}
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
                        {option.tier === 'diamond' && (
                          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                            Invitation Only
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          ${option.price}
                          {option.tier !== 'free' && <span className="text-sm text-gray-500">/month</span>}
                        </div>
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

      {/* Duration Selection */}
      {selectedTier !== 'free' && selectedTier !== 'diamond' && (
        <div className="space-y-3">
          <h4 className="font-medium">Duration (Save with longer commitments)</h4>
          <RadioGroup value={durationMonths.toString()} onValueChange={(value) => setDurationMonths(parseInt(value))}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="duration-1" />
                <Label htmlFor="duration-1" className="cursor-pointer">1 Month</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="duration-3" />
                <Label htmlFor="duration-3" className="cursor-pointer">
                  3 Months <Badge variant="outline" className="ml-1 text-xs">10% off</Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="6" id="duration-6" />
                <Label htmlFor="duration-6" className="cursor-pointer">
                  6 Months <Badge variant="outline" className="ml-1 text-xs">15% off</Badge>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="12" id="duration-12" />
                <Label htmlFor="duration-12" className="cursor-pointer">
                  12 Months <Badge variant="outline" className="ml-1 text-xs">20% off</Badge>
                </Label>
              </div>
            </div>
          </RadioGroup>
        </div>
      )}

      {/* Additional Options */}
      {selectedTier !== 'free' && selectedTier !== 'diamond' && (
        <div className="space-y-4">
          <h4 className="font-medium">Additional Options</h4>
          
          {/* Auto-renewal option (only for monthly) */}
          {durationMonths === 1 && (
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="auto-renew" 
                checked={autoRenew}
                onCheckedChange={setAutoRenew}
              />
              <Label htmlFor="auto-renew" className="cursor-pointer flex items-center gap-2">
                Auto-renewal (5% monthly discount)
                <Badge variant="outline" className="text-xs">Save 5%</Badge>
              </Label>
            </div>
          )}
          
          {/* Nationwide posting */}
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="nationwide" 
              checked={nationwidePosting}
              onCheckedChange={setNationwidePosting}
            />
            <Label htmlFor="nationwide" className="cursor-pointer flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Nationwide posting (+$5)
            </Label>
          </div>
        </div>
      )}

      {/* Price Summary */}
      {selectedTier !== 'free' && selectedTier !== 'diamond' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Price:</span>
            <span className="text-2xl font-bold text-blue-600">${finalPrice}</span>
          </div>
          {durationMonths > 1 && (
            <p className="text-sm text-gray-600 mt-1">
              For {durationMonths} months (${(finalPrice / durationMonths).toFixed(2)}/month)
            </p>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-8 pt-6 border-t">
        <Button
          onClick={handleSubmit}
          disabled={isLoading || selectedTier === 'diamond'}
          className="w-full py-3 text-lg"
        >
          {isLoading ? 'Processing...' : 
           selectedTier === 'diamond' ? 'Invitation Required' :
           selectedTier === 'free' ? 'Post Job for Free' : 
           'Proceed to Payment'}
        </Button>
        
        {selectedTier === 'diamond' && (
          <p className="text-center text-sm text-gray-500 mt-2">
            Diamond tier is available by invitation only. Contact us for more information.
          </p>
        )}
      </div>
    </div>
  );
};

export default JobPricingStep;
