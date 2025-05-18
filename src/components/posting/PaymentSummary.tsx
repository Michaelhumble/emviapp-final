
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles, Loader2, ShieldCheck, CreditCard, Timer, AlarmClock } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
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
  isSubmitting,
}) => {
  const { t } = useTranslation();
  
  // Subtle shine animation for button
  const shine = {
    opacity: [0, 0.1, 0.2, 0],
    x: ['0%', '100%'],
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" }
  };
  
  // Button text based on plan
  const getActionButtonText = () => {
    if (isSubmitting) return 'Processing...';
    
    if (isFreePlan) {
      return t({
        english: 'Continue with Free Trial',
        vietnamese: 'Tiếp tục với gói miễn phí'
      });
    }
    
    return t({
      english: `Pay $${finalPrice.toFixed(2)} & Post Job`,
      vietnamese: `Thanh toán $${finalPrice.toFixed(2)} & Đăng tin`
    });
  };
  
  return (
    <div className="mt-6 space-y-6">
      {/* Special Offer Card - Show when discount available */}
      {discountPercentage > 0 && (
        <div className="bg-[#fefbf6] p-4 rounded-[18px] border border-[#f3efe0] text-gray-800">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium flex items-center">
              <Sparkles className="h-4 w-4 mr-1.5 text-amber-500" />
              {t({
                english: `${discountPercentage}% OFF - Limited Time`,
                vietnamese: `Giảm giá ${discountPercentage}% - Thời gian có hạn`
              })}
            </p>
            <AlarmClock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
              <span className="ml-2 text-lg font-bold text-gray-900">${finalPrice.toFixed(2)}</span>
            </div>
            <span className="text-xs text-green-600 font-medium">
              Save ${(originalPrice - finalPrice).toFixed(2)}
            </span>
          </div>
        </div>
      )}
      
      {/* Sticky Payment Button Area */}
      <div className="sticky bottom-4 bg-white bg-opacity-95 backdrop-blur-sm p-4 rounded-[18px] border border-[#e8e1d5] shadow-lg z-10">
        <motion.div
          className="w-full flex flex-col gap-3"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {/* Main Payment/Action Button */}
          <Button
            onClick={onProceedToPayment}
            disabled={isSubmitting}
            size="lg"
            className={cn(
              "relative w-full py-7 overflow-hidden text-base font-semibold tracking-wide rounded-xl",
              isFreePlan
                ? "bg-gradient-to-br from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800"
                : "bg-gradient-to-br from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {t({
                  english: 'Processing...',
                  vietnamese: 'Đang xử lý...'
                })}
              </>
            ) : (
              <>
                <motion.div className="flex items-center justify-center gap-1.5">
                  {!isFreePlan && <Sparkles className="h-4 w-4 text-white/90" />}
                  {isFreePlan && <CreditCard className="h-4 w-4 text-white/90" />}
                  <span>{getActionButtonText()}</span>
                </motion.div>
                
                {/* Subtle shine effect */}
                <motion.div
                  className="absolute inset-0 w-1/5 h-full bg-white opacity-5 transform -skew-x-20"
                  animate={shine}
                />
              </>
            )}
          </Button>
          
          <div className="text-center space-y-3">
            {/* Conditional messaging based on plan & auto-renew */}
            <div className="text-xs text-gray-500">
              {!isFreePlan && (
                <p className="mb-1">
                  {t({
                    english: autoRenew 
                      ? 'Cancel anytime — No risk, locked-in pricing'
                      : 'One-time payment — No auto-renewal',
                    vietnamese: autoRenew 
                      ? 'Hủy bất cứ lúc nào — Không rủi ro, giá cố định'
                      : 'Thanh toán một lần — Không tự động gia hạn'
                  })}
                </p>
              )}
              
              {!isFreePlan && (
                <p className="text-gray-700 font-medium">
                  Featured for {duration * 30} days {autoRenew ? '• Auto-renew enabled' : ''}
                </p>
              )}
              
              {isFreePlan && (
                <p className="text-gray-600">
                  {t({
                    english: 'Credit card required • We'll notify you before charging',
                    vietnamese: 'Yêu cầu thẻ tín dụng • Chúng tôi sẽ thông báo trước khi tính phí'
                  })}
                </p>
              )}
            </div>
            
            {/* Trust badges section */}
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                <Lock className="h-3 w-3" />
                <span>100% Secure Payment • No Hidden Fees • Cancel Anytime</span>
              </div>
              
              <div className="flex items-center justify-center mt-2 gap-3">
                <div className="flex items-center text-indigo-600">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  <span className="text-xs font-medium">Stripe Secure</span>
                </div>
                
                <div className="flex items-center text-green-600">
                  <Timer className="h-3 w-3 mr-1" />
                  <span className="text-xs font-medium">Quick Process</span>
                </div>
              </div>
              
              <p className="text-xs text-center mt-2 text-gray-500">
                <span className="font-medium">Thousands of businesses trust EmviApp</span> — Join them today!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSummary;
