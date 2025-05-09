
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { JobPricingOption } from '@/utils/posting/types';

interface PricingCardsProps {
  pricingOptions: JobPricingOption[];
  selectedPricing: string;
  onChange: (value: string) => void;
}

const PricingCards = ({ pricingOptions, selectedPricing, onChange }: PricingCardsProps) => {
  return (
    <div className="w-full space-y-4">
      <RadioGroup 
        value={selectedPricing} 
        onValueChange={onChange}
        className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4 snap-x scrollbar-thin"
      >
        {pricingOptions.map((option) => (
          <div key={option.id} className="min-w-[260px] snap-center">
            <Label
              htmlFor={option.id}
              className="cursor-pointer block h-full"
            >
              <Card className={`h-full transition-all border-2 hover:border-primary hover:shadow-md ${
                selectedPricing === option.id ? 'border-primary bg-primary/5' : 'border-muted'
              }`}>
                <CardHeader className="pb-2">
                  {option.tag && (
                    <div className="text-xs font-medium text-amber-600 mb-1">
                      {option.tag}
                    </div>
                  )}
                  <CardTitle className="text-lg">{option.name}</CardTitle>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold">
                      ${option.price === 0 ? '0' : option.price.toFixed(2)}
                      <span className="text-sm font-normal">{option.id === 'diamond' ? '/yr' : '/mo'}</span>
                    </span>
                    {option.wasPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ${option.wasPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-1 font-medium">{option.description}</div>
                  <div className="text-sm text-muted-foreground mb-3">{option.vietnameseDescription}</div>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-start">
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center w-full justify-between">
                    <RadioGroupItem
                      id={option.id}
                      value={option.id}
                      className="data-[state=checked]:border-primary data-[state=checked]:border-2"
                    />
                    <Label htmlFor={option.id} className="text-sm font-medium">
                      Select
                    </Label>
                  </div>
                </CardFooter>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
      
      <div className="text-center text-sm text-muted-foreground mt-4">
        All listings expire after 30 days. Auto-renew saves you up to 20%.
      </div>
    </div>
  );
};

export default PricingCards;
