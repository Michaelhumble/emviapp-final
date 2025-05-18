
import React from 'react';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles, Loader2 } from 'lucide-react';
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
  
  return (
    <div className="mt-6 space-y-6">
      {discountPercentage > 0 && (
        <div className="bg-[#fefbf6] p-4 rounded-[18px] border border-[#f3efe0] text-gray-800">
          <p className="font-medium">
            {t({
              english: `${discountPercentage}% discount applied for ${duration} month${duration > 1 ? 's' : ''}`,
              vietnamese: `Giảm giá ${discountPercentage}% cho ${duration} tháng`
            })}
          </p>
          <div className="flex items-baseline justify-between mt-2">
            <div>
              <span className="text-gray-500 line-through">${originalPrice.toFixed(2)}</span>
              <span className="ml-2 text-lg font-bold text-gray-900">${finalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="sticky bottom-4 bg-white bg-opacity-95 backdrop-blur-sm p-4 rounded-[18px] border border-[#e8e1d5] shadow-lg z-10">
        <motion.div
          className="w-full flex flex-col gap-3"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Button
            onClick={onProceedToPayment}
            disabled={isSubmitting}
            size="lg"
            className={cn(
              "relative w-full py-7 overflow-hidden text-base font-medium rounded-xl",
              isFreePlan
                ? "bg-gray-900 hover:bg-gray-800"
                : "bg-gradient-to-r from-[#343434] via-[#282828] to-[#343434] hover:from-[#292929] hover:via-[#1e1e1e] hover:to-[#292929]"
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
                  {!isFreePlan && <Sparkles className="h-4 w-4 text-[#f3efe0]" />}
                  <span>
                    {t({
                      english: isFreePlan ? 'Continue with Free Plan' : 'Post My Job & Reach Top Candidates',
                      vietnamese: isFreePlan ? 'Tiếp tục với gói miễn phí' : 'Đăng tin ngay & Tiếp cận ứng viên hàng đầu'
                    })}
                  </span>
                </motion.div>
                
                {/* Subtle shine effect */}
                {!isFreePlan && (
                  <motion.div
                    className="absolute inset-0 w-1/5 h-full bg-white opacity-5 transform -skew-x-20"
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
              <p className="text-gray-700 font-medium">
                Featured for {duration * 30} days {autoRenew ? '• Auto-renew enabled' : ''}
              </p>
            )}
            
            <div className="flex items-center justify-center mt-2 text-gray-400">
              <Lock className="h-3 w-3 mr-1" />
              <span>100% Secure Payment • Premium Support</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSummary;
