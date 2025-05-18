
import React from 'react';

interface SummaryTotalsProps {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  durationMonths: number;
  autoRenew: boolean;
}

export function SummaryTotals({ 
  originalPrice, 
  finalPrice, 
  discountPercentage, 
  durationMonths,
  autoRenew 
}: SummaryTotalsProps) {
  return (
    <div className="space-y-3 border-t pt-4">
      <h3 className="text-lg font-medium">Summary</h3>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Original Price</span>
          <span className="text-gray-500">${originalPrice.toFixed(2)}</span>
        </div>
        
        {discountPercentage > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Duration Discount ({discountPercentage}%)</span>
            <span>-${(originalPrice - finalPrice).toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between font-medium text-lg pt-2 border-t">
          <span>Total</span>
          <span>${finalPrice.toFixed(2)}</span>
        </div>
        
        <div className="text-sm text-gray-500">
          {autoRenew 
            ? `Your subscription will automatically renew every ${durationMonths} month${durationMonths > 1 ? 's' : ''}.`
            : `Your post will expire after ${durationMonths} month${durationMonths > 1 ? 's' : ''}.`}
        </div>
      </div>
    </div>
  );
}
