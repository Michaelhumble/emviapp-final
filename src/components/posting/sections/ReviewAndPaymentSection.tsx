
import React, { useState } from 'react';
import { Job } from '@/types/job';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { PricingOptions, PostType } from '@/utils/posting/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TierTooltip from "@/components/ui/tier-tooltip";

interface ReviewAndPaymentSectionProps {
  formData: Partial<Job>;
  postType: PostType;
  onNextStep: () => void;
  onPrevStep: () => void;
  isFirstPost: boolean;
  pricingOptions: PricingOptions;
}

const ReviewAndPaymentSection = ({ 
  formData,
  postType,
  onNextStep,
  onPrevStep,
  isFirstPost,
  pricingOptions
}: ReviewAndPaymentSectionProps) => {
  const [selectedTier, setSelectedTier] = useState('free');
  
  const getSelectedPricingOption = () => {
    return jobPricingOptions.find(option => option.id === selectedTier);
  };
  
  const getTotalPrice = () => {
    const basePricingOption = getSelectedPricingOption();
    let basePrice = basePricingOption?.price || 0;
    
    // Apply any additional pricing options
    if (pricingOptions.isNationwide && basePrice > 0) basePrice += 9.99;
    if (pricingOptions.fastSalePackage && basePrice > 0) basePrice += 29.99;
    if (pricingOptions.showAtTop && basePrice > 0) basePrice += 19.99;
    
    return basePrice.toFixed(2);
  };

  const formatPrice = (price: number) => {
    if (price === 0) return "$0";
    return `$${price.toFixed(2)}`;
  };

  // Helper to determine if a plan is monthly or yearly
  const getPricingPeriod = (optionId: string) => {
    return optionId === 'diamond' ? '/ year' : '/ month';
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Choose Your Visibility</h2>
        <p className="text-muted-foreground mt-1">Select how you want your job posting to be displayed</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {jobPricingOptions.map((option) => (
          <Card 
            key={option.id}
            className={`cursor-pointer transition-all h-full flex flex-col ${
              selectedTier === option.id 
                ? 'border-primary shadow-md ring-2 ring-primary ring-opacity-50' 
                : 'hover:border-gray-300'
            }`}
            onClick={() => setSelectedTier(option.id)}
          >
            <CardHeader className="pb-2 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="font-serif">{option.name}</CardTitle>
                  <div className="flex items-baseline space-x-2 mt-1">
                    {option.wasPrice && (
                      <div className="text-xs text-muted-foreground line-through">was ${option.wasPrice.toFixed(2)}</div>
                    )}
                    <CardDescription className="font-medium text-base">
                      {formatPrice(option.price)} {option.price > 0 && getPricingPeriod(option.id)}
                    </CardDescription>
                  </div>
                </div>
                {option.tag && (
                  <Badge variant="outline" className="text-xs whitespace-nowrap bg-opacity-10 font-medium">
                    {option.tag}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div>
                <p className="text-sm mb-1 font-medium">{option.description}</p>
                <p className="text-xs text-muted-foreground italic mb-3">{option.vietnameseDescription}</p>
                <ul className="text-xs space-y-1.5">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-green-500 mt-0.5">✓</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              {option.note && (
                <div className="mt-3 text-xs text-muted-foreground bg-muted p-1.5 rounded">
                  {option.note}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
        📅 Each post lasts 30 days. You can renew or upgrade anytime.
      </div>
      
      {selectedTier !== 'free' && (
        <div className="bg-gray-50 p-4 rounded-lg mt-6">
          <h3 className="font-semibold mb-2">Additional Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="nationwide"
                checked={pricingOptions.isNationwide}
                disabled={selectedTier === 'free'}
                onChange={() => pricingOptions.isNationwide = !pricingOptions.isNationwide}
                className="rounded border-gray-300"
              />
              <label htmlFor="nationwide">
                <div>Nationwide Listing (+$9.99)</div>
                <div className="text-xs text-muted-foreground">Show to candidates across the USA</div>
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="fastSale"
                checked={pricingOptions.fastSalePackage}
                disabled={selectedTier === 'free'}
                onChange={() => pricingOptions.fastSalePackage = !pricingOptions.fastSalePackage}
                className="rounded border-gray-300"
              />
              <label htmlFor="fastSale">
                <div>Fast Hire Package (+$29.99)</div>
                <div className="text-xs text-muted-foreground">Extra visibility + urgent tag</div>
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showAtTop"
                checked={pricingOptions.showAtTop}
                disabled={selectedTier === 'free'}
                onChange={() => pricingOptions.showAtTop = !pricingOptions.showAtTop}
                className="rounded border-gray-300"
              />
              <label htmlFor="showAtTop">
                <div>Show At Top (+$19.99)</div>
                <div className="text-xs text-muted-foreground">Pin to top of category</div>
              </label>
            </div>
          </div>
        </div>
      )}
      
      <div className="border-t pt-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">Total</div>
          <div className="text-xl font-bold">${getTotalPrice()}</div>
        </div>
        
        <div className="text-sm text-muted-foreground mb-6 text-center">
          You can always start free and upgrade later
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" onClick={onPrevStep}>
            Back
          </Button>
          <TierTooltip 
            tier={getSelectedPricingOption()?.name || 'Free'} 
            price={`$${getTotalPrice()}`}
            description="Click to proceed with this pricing tier"
          >
            <Button onClick={onNextStep}>
              {selectedTier === 'free' ? 'Post for Free' : 'Continue to Payment'}
            </Button>
          </TierTooltip>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndPaymentSection;
