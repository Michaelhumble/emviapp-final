
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import PaymentConfirmationModal from './PaymentConfirmationModal';
import { MobileButton } from '@/components/ui/mobile-button';
import { ArrowRight, CheckCircle, CreditCard, CalendarClock, RefreshCw, Sparkles } from 'lucide-react';

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
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleProcessPayment = () => {
    if (isFreePlan) {
      // For free plan, just proceed directly
      onProceedToPayment();
    } else {
      // For paid plans, show confirmation dialog
      setShowConfirmation(true);
    }
  };
  
  const handleConfirmPayment = () => {
    setShowConfirmation(false);
    onProceedToPayment();
  };
  
  const handleCloseModal = () => {
    setShowConfirmation(false);
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-gray-100 bg-gray-50">
        <h3 className="font-semibold text-md flex items-center gap-2 text-gray-800">
          <CreditCard className="h-5 w-5 text-purple-600" />
          {isFreePlan 
            ? t('Free Posting Summary', 'Tóm tắt đăng tin miễn phí') 
            : t('Payment Summary', 'Tóm tắt thanh toán')}
        </h3>
      </div>
      
      <div className="p-5 space-y-4">
        <div className="space-y-3">
          {/* Duration info */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 text-gray-700">
              <CalendarClock className="h-4 w-4 text-blue-500" />
              <span>{t('Duration', 'Thời hạn')}</span>
            </div>
            <span className="font-medium">
              {duration} {duration === 1 
                ? t('month', 'tháng') 
                : t('months', 'tháng')}
            </span>
          </div>
          
          {/* Auto-renewal info if enabled */}
          {autoRenew && (
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-700">
                <RefreshCw className="h-4 w-4 text-green-500" />
                <span>{t('Auto-renewal', 'Tự động gia hạn')}</span>
              </div>
              <span className="text-green-600 font-medium">
                {t('Enabled', 'Đã bật')}
              </span>
            </div>
          )}
          
          {/* Base price if not free */}
          {!isFreePlan && (
            <div className="flex justify-between items-center">
              <span className="text-gray-700">{t('Base Price', 'Giá cơ bản')}</span>
              <span>${basePrice.toFixed(2)} × {duration}</span>
            </div>
          )}
          
          {/* Discount if applicable */}
          {discountPercentage > 0 && (
            <div className="flex justify-between items-center text-green-600">
              <span>{t('Discount', 'Giảm giá')} ({discountPercentage}%)</span>
              <span>-${(originalPrice - finalPrice).toFixed(2)}</span>
            </div>
          )}
          
          {/* Separator line */}
          <div className="border-t border-gray-200 my-2"></div>
          
          {/* Final price display */}
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-800">{t('Total', 'Tổng')}</span>
            <div className="text-right">
              {discountPercentage > 0 && (
                <div className="line-through text-gray-500 text-sm">${originalPrice.toFixed(2)}</div>
              )}
              <div className="font-bold text-lg text-purple-800">
                {isFreePlan ? '$0.00' : `$${finalPrice.toFixed(2)}`}
              </div>
            </div>
          </div>
          
          {/* Plan benefits summary */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="bg-gray-50 p-3 rounded-md">
              <h4 className="font-medium text-sm mb-2 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-purple-500" />
                {t('Plan Benefits', 'Quyền lợi gói')}
              </h4>
              <ul className="space-y-2">
                <li className="flex text-sm items-start">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600">
                    {isFreePlan 
                      ? t('Basic visibility for 30 days', 'Hiển thị cơ bản trong 30 ngày') 
                      : t('Enhanced visibility for your job post', 'Tăng khả năng hiển thị cho bài đăng của bạn')}
                  </span>
                </li>
                {!isFreePlan && (
                  <>
                    <li className="flex text-sm items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">
                        {t('Priority placement in search results', 'Vị trí ưu tiên trong kết quả tìm kiếm')}
                      </span>
                    </li>
                    <li className="flex text-sm items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">
                        {t('Access to premium analytics', 'Truy cập phân tích cao cấp')}
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Action button */}
        <MobileButton
          onClick={handleProcessPayment}
          disabled={isSubmitting}
          className="w-full py-3 mt-4 bg-purple-600 hover:bg-purple-700 text-white"
          mobileFullWidth
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              {t('Processing...', 'Đang xử lý...')}
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              {isFreePlan
                ? t('Continue with Free Plan', 'Tiếp tục với Gói Miễn phí')
                : t('Proceed to Payment', 'Tiếp tục thanh toán')}
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </MobileButton>
        
        {/* Secure payment note */}
        {!isFreePlan && (
          <p className="text-xs text-center text-gray-500 mt-2">
            {t('Secure payment processed by Stripe', 'Thanh toán an toàn được xử lý bởi Stripe')}
          </p>
        )}
      </div>
      
      {/* Payment confirmation modal */}
      <PaymentConfirmationModal
        open={showConfirmation}
        onClose={handleCloseModal}
        onConfirmPayment={handleConfirmPayment}
        amount={finalPrice}
        options={{
          selectedPricingTier: isFreePlan ? 'free' : 'standard',
          autoRenew: autoRenew,
          durationMonths: duration
        }}
        originalPrice={originalPrice}
        discountPercentage={discountPercentage}
      />
    </div>
  );
};

export default PaymentSummary;
