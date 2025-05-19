
import React from 'react';
import { SummaryTotals } from './pricing/SummaryTotals';
import { usePricing } from '@/context/pricing';

interface PaymentSummaryProps {
  priceData: {
    originalPrice: number;
    finalPrice: number;
    discountPercentage: number;
  };
  durationMonths: number;
  autoRenew: boolean;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  priceData,
  durationMonths,
  autoRenew
}) => {
  const { updatePricingOptions } = usePricing();
  
  const handleAutoRenewChange = (value: boolean) => {
    updatePricingOptions({ autoRenew: value });
  };
  
  return (
    <div className="mt-4">
      <SummaryTotals
        originalPrice={priceData.originalPrice}
        finalPrice={priceData.finalPrice}
        discountPercentage={priceData.discountPercentage}
        durationMonths={durationMonths}
        autoRenew={autoRenew}
        onAutoRenewChange={handleAutoRenewChange}
      />
    </div>
  );
};
