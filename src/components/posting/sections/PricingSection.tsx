
import React from 'react';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface PricingSectionProps {
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
  onPricingChange?: (options: PricingOptions) => void;
}

const PricingSection: React.FC<PricingSectionProps> = ({
  pricingOptions,
  setPricingOptions,
  onPricingChange
}) => {
  const handlePricingChange = (value: JobPricingTier) => {
    const newOptions: PricingOptions = {
      ...pricingOptions,
      selectedPricingTier: value
    };
    setPricingOptions(newOptions);
    
    if (onPricingChange) {
      onPricingChange(newOptions);
    }
  };
  
  const handleDurationChange = (value: number) => {
    const newOptions: PricingOptions = {
      ...pricingOptions,
      durationMonths: value
    };
    setPricingOptions(newOptions);
    
    if (onPricingChange) {
      onPricingChange(newOptions);
    }
  };
  
  const handleAutoRenewChange = (checked: boolean) => {
    const newOptions: PricingOptions = {
      ...pricingOptions,
      autoRenew: checked
    };
    setPricingOptions(newOptions);
    
    if (onPricingChange) {
      onPricingChange(newOptions);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Pricing & Duration</h2>
        <p className="text-sm text-muted-foreground mt-1">Choose your posting options</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Select Plan</h3>
          <RadioGroup
            value={pricingOptions.selectedPricingTier}
            onValueChange={(value: JobPricingTier) => handlePricingChange(value)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="border rounded-lg p-4 hover:border-primary cursor-pointer">
              <RadioGroupItem value="standard" id="standard" className="sr-only" />
              <Label htmlFor="standard" className="flex flex-col cursor-pointer">
                <span className="text-lg font-medium">Standard</span>
                <span className="font-bold text-xl mt-1">$49</span>
                <span className="text-sm text-gray-500 mt-1">Basic visibility for your job posting</span>
              </Label>
            </div>
            
            <div className="border rounded-lg p-4 hover:border-primary cursor-pointer relative">
              <div className="absolute -top-2 -right-2 bg-amber-400 text-amber-900 text-xs px-2 py-1 rounded-full font-semibold">Popular</div>
              <RadioGroupItem value="premium" id="premium" className="sr-only" />
              <Label htmlFor="premium" className="flex flex-col cursor-pointer">
                <span className="text-lg font-medium">Premium</span>
                <span className="font-bold text-xl mt-1">$79</span>
                <span className="text-sm text-gray-500 mt-1">Enhanced visibility and featured placement</span>
              </Label>
            </div>
            
            <div className="border rounded-lg p-4 hover:border-primary cursor-pointer">
              <RadioGroupItem value="gold" id="gold" className="sr-only" />
              <Label htmlFor="gold" className="flex flex-col cursor-pointer">
                <span className="text-lg font-medium">Gold</span>
                <span className="font-bold text-xl mt-1">$129</span>
                <span className="text-sm text-gray-500 mt-1">Top visibility and exclusive features</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Duration</h3>
          <RadioGroup
            value={String(pricingOptions.durationMonths)}
            onValueChange={(value) => handleDurationChange(Number(value))}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="border rounded-lg p-4 hover:border-primary cursor-pointer">
              <RadioGroupItem value="1" id="one-month" className="sr-only" />
              <Label htmlFor="one-month" className="flex flex-col cursor-pointer">
                <span className="text-lg font-medium">1 Month</span>
                <span className="text-sm text-gray-500 mt-1">Standard duration</span>
              </Label>
            </div>
            
            <div className="border rounded-lg p-4 hover:border-primary cursor-pointer relative">
              <div className="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">-10%</div>
              <RadioGroupItem value="3" id="three-months" className="sr-only" />
              <Label htmlFor="three-months" className="flex flex-col cursor-pointer">
                <span className="text-lg font-medium">3 Months</span>
                <span className="text-sm text-gray-500 mt-1">Save 10%</span>
              </Label>
            </div>
            
            <div className="border rounded-lg p-4 hover:border-primary cursor-pointer relative">
              <div className="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">-15%</div>
              <RadioGroupItem value="6" id="six-months" className="sr-only" />
              <Label htmlFor="six-months" className="flex flex-col cursor-pointer">
                <span className="text-lg font-medium">6 Months</span>
                <span className="text-sm text-gray-500 mt-1">Save 15%</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch 
            id="auto-renew" 
            checked={pricingOptions.autoRenew}
            onCheckedChange={handleAutoRenewChange}
          />
          <Label htmlFor="auto-renew">Auto-renew your posting when it expires</Label>
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
