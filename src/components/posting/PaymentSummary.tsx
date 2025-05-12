
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Loader2, Lock, CircleDollarSign } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { format, addMonths } from 'date-fns';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
  
  const dollarSavings = originalPrice - finalPrice;

  return (
    <motion.div
      initial={{ opacity: 0.8, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border border-[#F7E7CE]/40 shadow-sm">
        <div className="bg-gradient-to-r from-[#F8F8FF] to-[#F7E7CE]/10 p-5 border-b border-[#F7E7CE]/20">
          <h3 className="font-medium text-xl font-playfair text-[#1D1E1E]">
            {isFreePlan ? t('Confirm Free Listing', 'Xác nhận niêm yết miễn phí') : t('Order Summary', 'Tóm tắt đơn hàng')}
          </h3>
        </div>
        
        <div className="p-5">
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
                  <div className="flex justify-between items-center text-[#50C878]">
                    <span>{t('Discount', 'Giảm giá')}</span>
                    <span>{discountPercentage}%</span>
                  </div>
                )}
                
                <div className="pt-3 border-t border-[#F7E7CE]/20">
                  <div className="flex justify-between items-center">
                    <span className="font-medium font-playfair">{t('Total', 'Tổng cộng')}</span>
                    <span className="font-bold text-xl font-playfair">${finalPrice.toFixed(2)}</span>
                  </div>
                  
                  {discountPercentage > 0 && (
                    <div className="text-right text-[#50C878] text-sm font-medium">
                      {t('You save', 'Bạn tiết kiệm')}: ${dollarSavings.toFixed(2)}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Payment Security Notice */}
          {!isFreePlan && (
            <div className="flex items-center justify-center mb-6 bg-[#F8F8FF] p-3 rounded-lg border border-[#F7E7CE]/30">
              <Lock className="h-4 w-4 text-[#1D1E1E]/70 mr-2" />
              <span className="text-xs text-[#1D1E1E]/70">
                {t('Secure payment processing', 'Xử lý thanh toán an toàn')}
              </span>
            </div>
          )}
          
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={onProceedToPayment}
              disabled={isSubmitting}
              className={cn(
                "w-full py-3 h-auto font-medium shadow-sm text-base",
                isFreePlan 
                  ? "bg-gray-800 hover:bg-gray-900 focus:ring-gray-400" 
                  : "bg-gradient-to-r from-[#50C878] to-[#43a868] hover:from-[#43a868] hover:to-[#50C878] focus:ring-[#50C878]/40"
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t('Processing...', 'Đang xử lý...')}
                </>
              ) : (
                <>
                  {isFreePlan ? (
                    t('Confirm Free Listing', 'Xác nhận niêm yết miễn phí')
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      {t('Proceed to Payment', 'Tiếp tục thanh toán')}
                    </>
                  )}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PaymentSummary;
