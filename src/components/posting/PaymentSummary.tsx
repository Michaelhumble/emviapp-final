
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Loader2, Lock } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { format, addMonths } from 'date-fns';

interface PaymentSummaryProps {
  basePrice: number;
  duration: number;
  autoRenew: boolean;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  onProceedToPayment: () => void;
  isFreePlan: boolean;
  isSubmitting: boolean;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  basePrice,
  duration,
  autoRenew,
  originalPrice,
  finalPrice,
  discountPercentage,
  onProceedToPayment,
  isFreePlan,
  isSubmitting = false
}) => {
  const { t } = useTranslation();
  const today = new Date();
  const endDate = addMonths(today, duration);
  
  const formattedStartDate = format(today, 'MMM d, yyyy');
  const formattedEndDate = format(endDate, 'MMM d, yyyy');

  return (
    <Card className="overflow-hidden border shadow-sm">
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 border-b border-gray-200">
        <h3 className="font-medium text-lg">
          {isFreePlan ? t('Confirm Free Listing', 'Xác nhận niêm yết miễn phí') : t('Order Summary', 'Tóm tắt đơn hàng')}
        </h3>
      </div>
      
      <div className="p-4">
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('Start date', 'Ngày bắt đầu')}</span>
            <span>{formattedStartDate}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('End date', 'Ngày kết thúc')}</span>
            <span>{formattedEndDate}</span>
          </div>
          
          {!isFreePlan && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t('Duration', 'Thời hạn')}</span>
                <span>{duration} {t('month', 'tháng')}{duration > 1 ? 's' : ''}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{t('Base price', 'Giá cơ bản')}</span>
                <span>${basePrice.toFixed(2)}/mo</span>
              </div>
              
              {discountPercentage > 0 && (
                <div className="flex justify-between items-center text-green-700">
                  <span>{t('Discount', 'Giảm giá')}</span>
                  <span>{discountPercentage}%</span>
                </div>
              )}
              
              <div className="pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t('Total', 'Tổng cộng')}</span>
                  <span className="font-bold text-lg">${finalPrice.toFixed(2)}</span>
                </div>
                
                {discountPercentage > 0 && (
                  <div className="text-right text-green-600 text-sm">
                    {t('You save', 'Bạn tiết kiệm')}: ${(originalPrice - finalPrice).toFixed(2)}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Payment Security Notice */}
        {!isFreePlan && (
          <div className="flex items-center justify-center mb-6 bg-gray-50 p-2 rounded-lg border border-gray-200">
            <Lock className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-xs text-gray-600">
              {t('Secure payment processing', 'Xử lý thanh toán an toàn')}
            </span>
          </div>
        )}
        
        <Button
          onClick={onProceedToPayment}
          disabled={isSubmitting}
          className={cn(
            "w-full py-2 h-auto font-medium shadow-sm",
            isFreePlan 
              ? "bg-gray-700 hover:bg-gray-800 focus:ring-gray-400" 
              : "bg-purple-600 hover:bg-purple-700 focus:ring-purple-400"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('Processing...', 'Đang xử lý...')}
            </>
          ) : (
            <>
              {isFreePlan ? (
                t('Confirm Free Listing', 'Xác nhận niêm yết miễn phí')
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  {t('Proceed to Payment', 'Tiếp tục thanh toán')}
                </>
              )}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

import { cn } from '@/lib/utils';

export default PaymentSummary;
