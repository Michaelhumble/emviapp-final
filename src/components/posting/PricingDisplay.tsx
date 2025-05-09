
import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { calculateFinalPrice } from '@/utils/posting/jobPricing';
import { useTranslation } from '@/hooks/useTranslation';

interface PricingDisplayProps {
  basePrice: number;
  duration: number;
  pricingId: string;
  autoRenew?: boolean;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({ 
  basePrice, 
  duration, 
  pricingId,
  autoRenew = false
}) => {
  const { t } = useTranslation();
  
  // Skip discount calculation for free tier
  if (basePrice === 0) {
    return (
      <div className="text-right">
        <div className="text-lg font-semibold">{formatCurrency(0)}</div>
        <div className="text-sm text-gray-500">
          {t('for', 'cho')} {duration} {duration === 1 ? t('month', 'tháng') : t('months', 'tháng')}
        </div>
      </div>
    );
  }
  
  // Calculate price with discount
  const { originalPrice, finalPrice, discountPercentage } = calculateFinalPrice(
    basePrice, 
    duration,
    pricingId,
    autoRenew
  );
  
  // For diamond plan, show as annual only
  if (pricingId === 'diamond') {
    return (
      <div className="text-right">
        <div className="text-lg font-semibold">{formatCurrency(finalPrice)}</div>
        <div className="text-sm text-gray-500">
          {t('annual subscription', 'gói đặc biệt')}
        </div>
      </div>
    );
  }
  
  // Show discount if applicable
  const hasDiscount = discountPercentage > 0;
  
  return (
    <div className="text-right">
      {hasDiscount && (
        <div className="text-sm text-gray-400 line-through">
          {formatCurrency(originalPrice)}
        </div>
      )}
      <div className="text-lg font-semibold">
        {formatCurrency(finalPrice)}
        {hasDiscount && (
          <span className="text-xs text-green-600 ml-2">
            (-{discountPercentage}%)
          </span>
        )}
      </div>
      <div className="text-sm text-gray-500">
        {t('for', 'cho')} {duration} {duration === 1 ? t('month', 'tháng') : t('months', 'tháng')}
        {autoRenew && (
          <span className="text-green-600 ml-1">{t('(auto-renew)', '(tự động gia hạn)')}</span>
        )}
      </div>
    </div>
  );
};

export default PricingDisplay;
