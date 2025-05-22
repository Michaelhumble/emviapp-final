
import React from 'react';
import { formatCurrency } from '@/lib/utils';

export interface PriceData {
  basePrice: number;
  originalPrice: number;
  finalPrice: number;
  discountAmount: number;
  discountPercentage: number;
}

interface PaymentSummaryProps {
  priceData: PriceData;
  durationMonths: number;
  autoRenew: boolean;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  priceData,
  durationMonths,
  autoRenew
}) => {
  const { basePrice, originalPrice, finalPrice, discountAmount, discountPercentage } = priceData;

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span>Base price</span>
        <span>{formatCurrency(basePrice)}/month</span>
      </div>
      
      <div className="flex justify-between">
        <span>Duration</span>
        <span>{durationMonths} month{durationMonths > 1 ? 's' : ''}</span>
      </div>
      
      {discountPercentage > 0 && (
        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>-{discountPercentage}%</span>
        </div>
      )}
      
      <div className="border-t pt-2 mt-2">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          {discountPercentage > 0 ? (
            <div>
              <span className="line-through text-gray-500 mr-2">{formatCurrency(originalPrice)}</span>
              <span>{formatCurrency(finalPrice)}</span>
            </div>
          ) : (
            <span>{formatCurrency(finalPrice)}</span>
          )}
        </div>
      </div>
      
      <div className="text-gray-500 text-xs mt-2">
        {autoRenew ? (
          <p>Your subscription will automatically renew every {durationMonths} month{durationMonths > 1 ? 's' : ''}. You can cancel anytime.</p>
        ) : (
          <p>Your listing will expire after {durationMonths} month{durationMonths > 1 ? 's' : ''} unless manually renewed.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentSummary;
