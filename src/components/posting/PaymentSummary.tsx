
import React from 'react';
import { SummaryTotals } from './pricing/SummaryTotals';
import { useTranslation } from '@/hooks/useTranslation';
import { JobPricingTier } from '@/utils/posting/types';
import { PricingSummary } from '@/types/jobPosting';

interface PaymentSummaryProps {
  priceData: Partial<PricingSummary> | {
    originalPrice: number;
    finalPrice: number;
    discountPercentage: number;
  };
  durationMonths: number;
  autoRenew: boolean;
  onAutoRenewChange?: (autoRenew: boolean) => void;
  selectedPricingTier?: JobPricingTier;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  priceData,
  durationMonths,
  autoRenew,
  onAutoRenewChange,
  selectedPricingTier = 'standard'
}) => {
  const { t } = useTranslation();
  const isFreeplan = selectedPricingTier === 'free';
  
  // Log pricing data being received for debugging
  console.log('PaymentSummary received price data:', priceData);
  console.log('Duration:', durationMonths, 'Auto-renew:', autoRenew, 'Tier:', selectedPricingTier);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
      <h3 className="font-semibold text-lg mb-4">
        {t({english: "Payment Summary", vietnamese: "Tóm tắt thanh toán"})}
      </h3>
      
      <SummaryTotals
        originalPrice={priceData.originalPrice || 0}
        finalPrice={priceData.finalPrice || 0}
        discountPercentage={priceData.discountPercentage || 0}
        durationMonths={durationMonths}
        autoRenew={autoRenew}
        onAutoRenewChange={onAutoRenewChange}
        selectedPricingTier={selectedPricingTier}
        isFreeplan={isFreeplan}
      />
    </div>
  );
};
