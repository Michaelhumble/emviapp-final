
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { formatCurrency } from '@/lib/utils';

interface PaymentSummaryProps {
  basePrice: number;
  duration: number;
  autoRenew?: boolean;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  onProceedToPayment: () => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  basePrice,
  duration,
  autoRenew = false,
  originalPrice,
  finalPrice,
  discountPercentage,
  onProceedToPayment
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{t('Payment Summary', 'Tóm tắt thanh toán')}</h3>
      
      <div className="space-y-2 divide-y">
        {/* Base price line */}
        <div className="flex justify-between py-2">
          <span>{t('Base price', 'Giá cơ bản')}:</span>
          <span>{formatCurrency(basePrice)}/mo</span>
        </div>
        
        {/* Duration line */}
        <div className="flex justify-between py-2">
          <span>{t('Duration', 'Thời hạn')}:</span>
          <span>{duration} {duration === 1 ? t('month', 'tháng') : t('months', 'tháng')}</span>
        </div>
        
        {/* Show original price if discount applies */}
        {discountPercentage > 0 && (
          <div className="flex justify-between py-2">
            <span>{t('Subtotal', 'Tạm tính')}:</span>
            <span className="text-gray-500 line-through">{formatCurrency(originalPrice)}</span>
          </div>
        )}
        
        {/* Auto-renew discount if enabled */}
        {autoRenew && (
          <div className="flex justify-between py-2">
            <span>{t('Auto-renew discount', 'Giảm giá gia hạn tự động')}:</span>
            <span className="text-green-600">-5%</span>
          </div>
        )}
        
        {/* Duration discount if applicable */}
        {duration > 1 && (
          <div className="flex justify-between py-2">
            <span>{t('Duration discount', 'Giảm giá theo thời hạn')}:</span>
            <span className="text-green-600">
              {duration === 3 ? '-10%' : duration === 6 ? '-20%' : '-30%'}
            </span>
          </div>
        )}
        
        {/* Total section */}
        <div className="flex justify-between py-3 font-semibold">
          <span>{t('Total', 'Tổng cộng')}:</span>
          <div className="text-right">
            <div className="text-xl">{formatCurrency(finalPrice)}</div>
            {discountPercentage > 0 && (
              <div className="text-sm text-green-600">
                {t('You save', 'Bạn tiết kiệm')}: {formatCurrency(originalPrice - finalPrice)} ({discountPercentage}%)
              </div>
            )}
            <div className="text-xs text-gray-500">
              {t('for', 'cho')} {duration} {duration === 1 ? t('month', 'tháng') : t('months', 'tháng')}
            </div>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full mt-4" 
        onClick={onProceedToPayment}
      >
        {t('Proceed to Payment', 'Tiến hành thanh toán')}
      </Button>
    </div>
  );
};

export default PaymentSummary;
