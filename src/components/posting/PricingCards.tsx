
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
        className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4 overflow-x-auto pb-4 snap-x scrollbar-thin"
      >
        {pricingOptions.map((option) => (
          <div key={option.id} className="min-w-[260px] snap-center">
            <Label
              htmlFor={option.id}
              className="cursor-pointer block h-full"
            >
              <Card className={`h-full transition-all border-2 hover:border-primary hover:shadow-lg ${
                selectedPricing === option.id ? 'border-primary bg-primary/5' : 'border-muted'
              }`}>
                <CardHeader className="pb-1 space-y-3">
                  {option.tag && (
                    <Badge variant="secondary" className={`text-xs px-2.5 py-1 font-medium mb-1 whitespace-nowrap inline-flex items-center 
                    ${option.id === 'diamond' ? 'bg-amber-500 hover:bg-amber-600 text-white' : 
                      option.id === 'premium' ? 'bg-orange-500 hover:bg-orange-600 text-white' : 
                      option.id === 'gold' ? 'bg-yellow-500 hover:bg-yellow-600 text-white' : 
                      option.id === 'standard' ? 'bg-green-500 hover:bg-green-600 text-white' : 
                      'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                      {option.tag}
                    </Badge>
                  )}
                  <CardTitle className="text-lg leading-tight">{option.name}</CardTitle>
                  <div className="flex items-baseline flex-wrap gap-2 mb-1">
                    <span className="text-xl font-bold">
                      ${option.price === 0 ? '0' : option.price.toFixed(2)}
                      <span className="text-sm font-normal ml-0.5">{option.id === 'diamond' ? '/yr' : '/mo'}</span>
                    </span>
                    {option.wasPrice && (
                      <span className="text-sm text-red-600 line-through font-medium">
                        ${option.wasPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-3 pt-1">
                  <div className="mb-2 font-medium leading-snug">{option.description}</div>
                  <div className="text-sm text-muted-foreground mb-3 italic">{option.vietnameseDescription}</div>
                  <ul className="space-y-2.5">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="text-sm flex items-start leading-tight">
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-1">
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
      
      <div className="text-center text-sm text-muted-foreground mt-6 py-2 border-t border-gray-100">
        All listings expire after 30 days. Auto-renew saves you up to 20%.
      </div>
    </div>
  );
};

export default PricingCards;
