
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Lock, Sparkles } from 'lucide-react';
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
  
  // Shine animation for button
  const shine = {
    opacity: [0, 1, 0.5, 0],
    x: ['0%', '100%'],
    transition: { repeat: Infinity, duration: 2, ease: "easeInOut" }
  };
  
  return (
    <div className="mt-6 space-y-6">
      {discountPercentage > 0 && (
        <div className="bg-green-50 p-4 rounded-md text-green-800 border border-green-200">
          <p className="font-medium">
            {t({
              english: `${discountPercentage}% discount applied for ${duration} month${duration > 1 ? 's' : ''}!`,
              vietnamese: `Giảm giá ${discountPercentage}% cho ${duration} tháng!`
            })}
          </p>
          <div className="flex items-baseline justify-between mt-2">
            <div>
              <span className="text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
              <span className="ml-2 text-lg font-bold">${finalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="sticky bottom-4 bg-white bg-opacity-95 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-gray-100 z-10">
        <motion.div
          className="w-full flex flex-col gap-2"
          whileHover={{ scale: 1.015 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            onClick={onProceedToPayment}
            disabled={isSubmitting}
            size="lg"
            className={cn(
              "relative w-full py-6 overflow-hidden text-lg font-medium",
              isFreePlan
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-700 hover:to-violet-600"
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
                <motion.div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-yellow-200" />
                  <span>
                    {t({
                      english: isFreePlan ? 'Continue with Free Plan' : '🚀 Post My Job & Reach Top Candidates Now',
                      vietnamese: isFreePlan ? 'Tiếp tục với gói miễn phí' : '🚀 Đăng tin ngay & Tiếp cận ứng viên hàng đầu'
                    })}
                  </span>
                </motion.div>
                
                {/* Shine effect */}
                {!isFreePlan && (
                  <motion.div
                    className="absolute inset-0 w-1/4 h-full bg-white opacity-20 transform -skew-x-12"
                    animate={shine}
                  />
                )}
              </>
            )}
          </Button>
          
          <div className="text-xs text-center text-gray-500">
            {!isFreePlan && (
              <p className="mb-1">
                {t({
                  english: 'Cancel anytime — No risk, just results',
                  vietnamese: 'Hủy bất cứ lúc nào — Không rủi ro, chỉ có kết quả'
                })}
              </p>
            )}
            
            {!isFreePlan && (
              <p className="text-purple-600 font-medium">
                ✨ Featured for {duration * 30} days {autoRenew ? '• Auto-renew enabled' : '• Auto-renew anytime'}
              </p>
            )}
            
            <div className="flex items-center justify-center mt-2 text-gray-400">
              <Lock className="h-3 w-3 mr-1" />
              <span>100% Secure Payment • 24/7 Live Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSummary;
