
import React from 'react';
import { PricingOptions, JobPricingOption, JobPricingTier } from '@/utils/posting/types';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { jobPricingOptions } from '@/utils/posting';
import { cn } from '@/lib/utils';

export interface PricingSectionProps {
  onPricingChange: (options: PricingOptions) => void;
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

const PricingSection: React.FC<PricingSectionProps> = ({ 
  onPricingChange, 
  pricingOptions, 
  setPricingOptions 
}) => {
  const handlePricingTierChange = (tier: JobPricingTier) => {
    const updatedOptions = {
      ...pricingOptions,
      selectedPricingTier: tier
    };
    setPricingOptions(updatedOptions);
    onPricingChange(updatedOptions);
  };
  
  const handleDurationChange = (months: number) => {
    const updatedOptions = {
      ...pricingOptions,
      durationMonths: months
    };
    setPricingOptions(updatedOptions);
    onPricingChange(updatedOptions);
  };
  
  const handleAutoRenewChange = (checked: boolean) => {
    const updatedOptions = {
      ...pricingOptions,
      autoRenew: checked
    };
    setPricingOptions(updatedOptions);
    onPricingChange(updatedOptions);
  };

  const availablePricingOptions: JobPricingOption[] = jobPricingOptions.filter(
    option => !option.hidden
  );

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Pricing Options</h2>
        <p className="text-sm text-muted-foreground mt-1">Select a pricing tier for your job posting</p>
      </div>
      
      <RadioGroup
        value={pricingOptions.selectedPricingTier}
        onValueChange={(value) => handlePricingTierChange(value as JobPricingTier)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {availablePricingOptions.map((option) => (
          <div key={option.id} className="relative">
            <RadioGroupItem
              value={option.tier}
              id={option.id}
              className="sr-only"
            />
            <Label
              htmlFor={option.id}
              className="cursor-pointer"
            >
              <Card className={cn(
                "border-2 h-full transition-colors",
                pricingOptions.selectedPricingTier === option.tier 
                  ? "border-primary" 
                  : "border-gray-200 hover:border-gray-300"
              )}>
                <CardContent className="p-6">
                  {option.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 rounded-bl">
                      Popular
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">{option.name}</h3>
                      {option.tag && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {option.tag}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">${option.price}</span>
                      {option.wasPrice && (
                        <span className="ml-2 text-gray-500 line-through text-sm">
                          ${option.wasPrice}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600">{option.description}</p>
                    
                    {option.features && option.features.length > 0 && (
                      <ul className="text-sm space-y-1 mt-4">
                        {option.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <span className="text-green-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="border-t border-b py-4 mt-8">
        <h3 className="font-medium text-lg mb-3">Additional Options</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Duration</h4>
            <div className="flex space-x-4">
              {[1, 3, 6].map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => handleDurationChange(months)}
                  className={cn(
                    "px-4 py-2 border rounded-md",
                    pricingOptions.durationMonths === months
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  )}
                >
                  {months} {months === 1 ? 'Month' : 'Months'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="auto-renew"
              checked={pricingOptions.autoRenew}
              onCheckedChange={(checked) => handleAutoRenewChange(!!checked)}
            />
            <Label htmlFor="auto-renew" className="text-sm text-gray-700">
              Auto-renew my posting (cancel any time)
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
