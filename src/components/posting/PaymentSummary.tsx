
import React from 'react';
import { PricingOptions, PostType } from '@/utils/posting/types';
import { getJobPostPricingSummary } from '@/utils/posting/jobPricing';
import { getSalonPostPricingSummary } from '@/utils/posting/salonPricing';
import { getBoothPostPricingSummary } from '@/utils/posting/boothPricing';
import { Card, CardContent } from '@/components/ui/card';

interface PaymentSummaryProps {
  postType: PostType;
  pricingOptions: PricingOptions;
  isFirstPost?: boolean;
}

const PaymentSummary = ({ postType, pricingOptions, isFirstPost = false }: PaymentSummaryProps) => {
  // Get summary based on post type
  const getSummaryItems = () => {
    switch (postType) {
      case 'job': {
        // Job pricing uses a different format (returns object)
        const selectedTier = pricingOptions.featuredPost ? 'premium' : 
                             pricingOptions.featuredListing ? 'standard' : 'free';
        
        const extras = {
          featuredPlacement: !!pricingOptions.featuredListing,
          extendedDuration: !!pricingOptions.extendedDuration,
          highlightedListing: !!pricingOptions.boostVisibility
        };
        
        return getJobPostPricingSummary(selectedTier, extras);
      }
      case 'salon':
        // Salon pricing returns string[]
        return getSalonPostPricingSummary(pricingOptions);
      case 'booth':
        // Booth pricing returns string[]
        return getBoothPostPricingSummary(pricingOptions);
      default:
        // Default fallback
        return ['Basic Post: $5', 'Total: $5'];
    }
  };
  
  const summaryItems = getSummaryItems();
  
  // Handle different return types (object vs string array)
  let lineItems: string[] = [];
  let totalPrice: string = '';
  
  if (Array.isArray(summaryItems)) {
    // Handle string array return type (salon, booth)
    totalPrice = summaryItems[summaryItems.length - 1];
    lineItems = summaryItems.slice(0, -1);
  } else {
    // Handle object return type (job)
    totalPrice = `Total: $${summaryItems.total.toFixed(2)}`;
    lineItems = summaryItems.lineItems.map(item => `${item.name}: $${item.price.toFixed(2)}`);
  }
  
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="font-medium text-lg mb-3">Pricing Summary</h3>
        <div className="space-y-2">
          {lineItems.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm">
              <span>{item.split(': ')[0]}</span>
              <span>{item.split(': ')[1]}</span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
            <span>{totalPrice.split(': ')[0]}</span>
            <span>{totalPrice.split(': ')[1]}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
