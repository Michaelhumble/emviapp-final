
import React from 'react';
import { PriceDetails } from '@/types/pricing';
import { useTranslation } from '@/hooks/useTranslation';

interface PricingDisplayProps {
  priceDetails: PriceDetails;
  duration: number;
  autoRenew: boolean;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({ priceDetails, duration, autoRenew }) => {
  const { t } = useTranslation();
  const priceInDollars = priceDetails.priceInCents / 100;
  
  return (
    <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
      <p><span className="font-semibold">{t('Selected Plan', 'Gói đã chọn')}:</span> {priceDetails.label}</p>
      <p><span className="font-semibold">{t('Price', 'Giá')}:</span> ${priceInDollars.toFixed(2)}</p>
      <p><span className="font-semibold">{t('Duration', 'Thời hạn')}:</span> {duration} {duration === 1 ? t('month', 'tháng') : t('months', 'tháng')}</p>
      <p><span className="font-semibold">{t('Auto-renewal', 'Tự động gia hạn')}:</span> {autoRenew ? t('Yes', 'Có') : t('No', 'Không')}</p>
    </div>
  );
};

export default PricingDisplay;
