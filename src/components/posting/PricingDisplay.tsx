
import React from 'react';
import { PriceDetails } from '@/types/pricing';

interface PricingDisplayProps {
  priceDetails: PriceDetails;
  duration: number;
  autoRenew: boolean;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({
  priceDetails,
  duration,
  autoRenew
}) => {
  const priceInDollars = priceDetails.priceInCents / 100;
  
  return (
    <div className="text-sm text-gray-500 mt-4 p-4 bg-gray-50 rounded-md">
      <h4 className="font-medium text-gray-700 mb-2">Selected Plan: {priceDetails.label}</h4>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Price:</span>
          <span>${priceInDollars.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Duration:</span>
          <span>{duration} {duration === 1 ? 'month' : 'months'}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Auto-renew:</span>
          <span>{autoRenew ? 'Enabled' : 'Disabled'}</span>
        </div>
      </div>
    </div>
  );
};

export default PricingDisplay;
