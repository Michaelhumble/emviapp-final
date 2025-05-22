
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle2, CircleDollarSign, Trophy } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';

interface PricingOption {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended?: boolean;
}

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
  const [selectedTier, setSelectedTier] = useState<JobPricingTier>(
    pricingOptions?.selectedPricingTier || 'premium'
  );
  const [autoRenew, setAutoRenew] = useState<boolean>(
    pricingOptions?.autoRenew !== undefined ? pricingOptions.autoRenew : true
  );
  const [durationMonths, setDurationMonths] = useState<number>(
    pricingOptions?.durationMonths || 1
  );

  const pricingOptionsList: PricingOption[] = [
    {
      id: 'standard',
      name: 'Standard',
      price: 9.99,
      description: 'Basic job listing for 30 days',
      features: ['30-day listing', 'Basic search visibility', 'Email applications']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 29.99,
      description: 'Premium visibility & features',
      features: ['Featured in search results', 'Priority placement', 'Enhanced profile', 'Social media sharing'],
      recommended: true
    },
    {
      id: 'diamond',
      name: 'Diamond',
      price: 59.99,
      description: 'Maximum exposure for urgent hiring',
      features: ['Premium placement', 'Highlighted listing', 'Top of category', 'Email blast to candidates', 'Social promotion']
    }
  ];

  useEffect(() => {
    // Update pricing options when any selection changes
    const updatedOptions: PricingOptions = {
      ...pricingOptions,
      selectedPricingTier: selectedTier as JobPricingTier,
      durationMonths,
      autoRenew
    };
    
    setPricingOptions(updatedOptions);
    onPricingChange(updatedOptions);
  }, [selectedTier, durationMonths, autoRenew, onPricingChange, setPricingOptions, pricingOptions]);

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Pricing & Promotion</h2>
        <p className="text-sm text-muted-foreground mt-1">Choose how to promote your job listing</p>
      </div>

      <RadioGroup 
        value={selectedTier} 
        onValueChange={(value) => setSelectedTier(value as JobPricingTier)}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {pricingOptionsList.map((option) => (
          <div key={option.id} className={`relative`}>
            <RadioGroupItem 
              value={option.id} 
              id={option.id} 
              className="sr-only"
            />
            <Label
              htmlFor={option.id}
              className={`flex flex-col h-full cursor-pointer rounded-xl border-2 p-5 ${
                selectedTier === option.id
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              } transition-colors`}
            >
              {option.recommended && (
                <div className="absolute -top-2 -right-2">
                  <Trophy className="h-6 w-6 text-yellow-500 fill-yellow-100" />
                </div>
              )}
              <div className="mb-4 flex items-center justify-between">
                <div className="font-semibold">{option.name}</div>
                <CircleDollarSign className="h-5 w-5 text-primary" />
              </div>
              <div className="mb-2 text-xl font-bold">${option.price}</div>
              <div className="text-sm text-muted-foreground mb-4">{option.description}</div>
              <ul className="mt-auto space-y-2 text-sm">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle>Duration & Renewal</CardTitle>
          <CardDescription>Choose how long your listing will be active</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Auto-renew listing</div>
                <div className="text-sm text-muted-foreground">Automatically renew when expired</div>
              </div>
              <Switch 
                checked={autoRenew} 
                onCheckedChange={setAutoRenew} 
                aria-label="Auto-renew listing"
              />
            </div>
            
            <div>
              <div className="font-medium mb-2">Duration</div>
              <div className="flex gap-2">
                {[1, 3, 6].map((months) => (
                  <button
                    key={months}
                    type="button"
                    className={`px-4 py-2 rounded-lg border-2 ${
                      durationMonths === months
                        ? 'border-primary bg-primary/10 font-bold'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setDurationMonths(months)}
                  >
                    {months} {months === 1 ? 'Month' : 'Months'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingSection;
