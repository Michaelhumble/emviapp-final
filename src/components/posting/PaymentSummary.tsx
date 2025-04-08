
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
  // Get summary array based on post type
  const getSummaryItems = () => {
    const options = { ...pricingOptions, isFirstPost };
    
    switch (postType) {
      case 'job':
        return getJobPostPricingSummary(options);
      case 'salon':
        return getSalonPostPricingSummary(options);
      case 'booth':
        return getBoothPostPricingSummary(options);
      default:
        return ['Basic Post: $5', 'Total: $5'];
    }
  };
  
  const summaryItems = getSummaryItems();
  const totalPrice = summaryItems[summaryItems.length - 1];
  const lineItems = summaryItems.slice(0, -1);
  
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
