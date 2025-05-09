
import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { calculateFinalPrice } from '@/utils/posting/jobPricing';
import { useTranslation } from '@/hooks/useTranslation';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PricingDisplayProps {
  basePrice: number;
  duration: number;
  pricingId?: string;
  autoRenew?: boolean;
  // Add the following properties to fix the type error
  originalPrice?: number;
  finalPrice?: number;
  discountPercentage?: number;
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({ 
  basePrice, 
  duration, 
  pricingId = '',
  autoRenew = false,
  // Handle the new props with defaults
  originalPrice: providedOriginalPrice,
  finalPrice: providedFinalPrice,
  discountPercentage: providedDiscountPercentage
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
  
  // Calculate price with discount if not provided
  const { 
    originalPrice = providedOriginalPrice, 
    finalPrice = providedFinalPrice, 
    discountPercentage = providedDiscountPercentage 
  } = providedOriginalPrice !== undefined ? 
    { originalPrice: providedOriginalPrice, finalPrice: providedFinalPrice, discountPercentage: providedDiscountPercentage } : 
    calculateFinalPrice(basePrice, duration, pricingId, autoRenew);
  
  // For diamond plan, show special messaging
  if (pricingId === 'diamond') {
    const isYearly = duration === 12;
    
    return (
      <div className="text-right">
        {isYearly && originalPrice > finalPrice && (
          <div className="text-sm text-gray-400 line-through">
            {formatCurrency(originalPrice)}
          </div>
        )}
        <div className="text-lg font-semibold">{formatCurrency(finalPrice)}</div>
        <div className="text-sm text-gray-500">
          {t('annual subscription', 'gói đặc biệt')}
        </div>
        {isYearly && autoRenew && (
          <div className="text-xs text-green-600 mt-1">
            {t('Keep this price locked in each year. Cancel anytime.', 'Giữ giá này mỗi năm. Hủy bất kỳ lúc nào.')}
          </div>
        )}
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
