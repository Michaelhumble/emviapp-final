
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CalendarClock, CheckCircle, Shield } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent } from '@/components/ui/card';
import { format, addDays } from 'date-fns';
import { formatPriceInDollars } from '@/utils/pricing';

interface PaymentSummaryProps {
  tier: string;
  priceInCents: number;
  onProceedToPayment: () => void;
  isFreePlan?: boolean;
  isSubmitting?: boolean;
  isDisabled?: boolean;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  tier,
  priceInCents,
  onProceedToPayment,
  isFreePlan = false,
  isSubmitting = false,
  isDisabled = false
}) => {
  const { t } = useTranslation();
  const expiryDate = addDays(new Date(), 30); // Default to 30 days
  const priceInDollars = formatPriceInDollars(priceInCents);
  
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
                <p className="font-medium">{tier.charAt(0).toUpperCase() + tier.slice(1)} Plan</p>
                <p className="text-sm text-gray-600">
                  {t('Expires on', 'Hết hạn vào')}: {format(expiryDate, 'MMMM d, yyyy')}
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between font-semibold text-lg">
                <span>{t('Total', 'Tổng cộng')}:</span>
                <span>${priceInDollars}</span>
              </div>
            </div>
          </div>
        )}
        
        <Button 
          onClick={onProceedToPayment} 
          className="w-full"
          disabled={isSubmitting || isDisabled}
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
