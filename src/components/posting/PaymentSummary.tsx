
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarClock, CheckCircle, RefreshCw, Shield, Tag } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { format, addMonths } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface PaymentSummaryProps {
  basePrice: number;
  duration: number;
  autoRenew: boolean;
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  onProceedToPayment: () => void;
  isFreePlan?: boolean;
  isSubmitting?: boolean;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  basePrice,
  duration,
  autoRenew,
  originalPrice,
  finalPrice,
  discountPercentage,
  onProceedToPayment,
  isFreePlan = false,
  isSubmitting = false
}) => {
  const { t } = useTranslation();
  const expiryDate = isFreePlan ? addMonths(new Date(), 1) : addMonths(new Date(), duration);
  const discountAmount = Number((originalPrice - finalPrice).toFixed(2));
  
  return (
    <Card className="border border-gray-200">
      <CardContent className="p-4 space-y-4">
        <h3 className="font-semibold text-lg">
          {isFreePlan 
            ? t('Free Listing Summary', 'Tóm tắt đăng tin miễn phí') 
            : t('Payment Summary', 'Tóm tắt thanh toán')}
        </h3>
        
        {isFreePlan ? (
          <div className="space-y-3">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
              <div>
                <p className="font-medium">{t('Free listing valid for 30 days', 'Đăng tin miễn phí có hiệu lực trong 30 ngày')}</p>
                <p className="text-sm text-gray-600">{t('Expires', 'Hết hạn')}: {format(expiryDate, 'MMMM d, yyyy')}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
              <div>
                <p className="font-medium">{t('Limited visibility', 'Hiển thị hạn chế')}</p>
                <p className="text-sm text-gray-600">{t('Standard placement in listings', 'Vị trí tiêu chuẩn trong danh sách')}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-start">
              <CalendarClock className="h-5 w-5 text-purple-500 mt-0.5 mr-2" /> 
              <div>
                <p className="font-medium">
                  {duration === 1 
                    ? t('1 month listing', '1 tháng đăng tin')
                    : t(`${duration} months listing`, `${duration} tháng đăng tin`)}
                </p>
                <p className="text-sm text-gray-600">
                  {t('Expires on', 'Hết hạn vào')}: {format(expiryDate, 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
            
            {autoRenew && (
              <div className="flex items-start">
                <RefreshCw className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
                <div>
                  <p className="font-medium">{t('Auto-renewal enabled', 'Tự động gia hạn được bật')}</p>
                  <p className="text-sm text-gray-600">
                    {t(
                      'Your subscription will automatically renew on', 
                      'Đăng ký của bạn sẽ tự động gia hạn vào'
                    )}: {format(expiryDate, 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-3 space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('Original price', 'Giá gốc')}:</span>
                <span className="text-gray-600">${originalPrice.toFixed(2)}</span>
              </div>
              
              {discountPercentage > 0 && (
                <div className="flex justify-between text-green-600">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>{t('Discount', 'Giảm giá')} ({discountPercentage}%):</span>
                  </div>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-semibold text-lg">
                <span>{t('Total', 'Tổng cộng')}:</span>
                <div className="flex flex-col items-end">
                  {discountPercentage > 0 && (
                    <span className="text-sm line-through text-gray-500 font-normal">${originalPrice.toFixed(2)}</span>
                  )}
                  <span>${finalPrice.toFixed(2)}</span>
                </div>
              </div>
              
              {discountPercentage > 0 && (
                <div className="mt-2 text-right">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                    {t('You Save', 'Bạn tiết kiệm')} ${discountAmount.toFixed(2)} ({discountPercentage}%)
                  </Badge>
                </div>
              )}
            </div>
          </div>
        )}
        
        <Button 
          onClick={onProceedToPayment} 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span>{isFreePlan ? t('Submitting...', 'Đang gửi...') : t('Processing...', 'Đang xử lý...')}</span>
          ) : (
            <>
              {isFreePlan 
                ? t('Complete Free Listing', 'Hoàn tất đăng tin miễn phí')
                : t('Proceed to Payment', 'Tiến hành thanh toán')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentSummary;
