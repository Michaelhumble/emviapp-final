
import React, { useState } from 'react';
import { AlertCircle, ShieldCheck, Clock } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from '@/hooks/useTranslation';
import { JobPricingTier } from '@/utils/posting/types';

interface SummaryTotalsProps {
  originalPrice: number;
  finalPrice: number;
  discountPercentage: number;
  durationMonths: number;
  autoRenew: boolean;
  onAutoRenewChange?: (autoRenew: boolean) => void;
  selectedPricingTier?: JobPricingTier;
  isFreeplan?: boolean;
}

export function SummaryTotals({ 
  originalPrice, 
  finalPrice, 
  discountPercentage, 
  durationMonths,
  autoRenew,
  onAutoRenewChange,
  selectedPricingTier = 'standard',
  isFreeplan = false
}: SummaryTotalsProps) {
  const { t } = useTranslation();
  const [showAutoRenewDialog, setShowAutoRenewDialog] = useState(false);
  
  const handleAutoRenewToggle = () => {
    if (autoRenew) {
      // Show warning dialog when turning OFF auto-renew
      setShowAutoRenewDialog(true);
    } else {
      // Turn ON auto-renew directly (no warning needed)
      onAutoRenewChange?.(true);
    }
  };

  const confirmDisableAutoRenew = () => {
    onAutoRenewChange?.(false);
    setShowAutoRenewDialog(false);
  };

  const cancelDisableAutoRenew = () => {
    setShowAutoRenewDialog(false);
  };

  // Determine if we should show payment details or free plan messaging
  const showPaymentDetails = !isFreeplan || (isFreeplan && finalPrice > 0);

  // Get monthly price for recurring information
  const monthlyPrice = finalPrice / durationMonths;

  return (
    <div className="space-y-3 border-t pt-4">
      {showPaymentDetails ? (
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-500">{t({
              english: "Original Price",
              vietnamese: "Giá gốc"
            })}</span>
            <span className="text-gray-500">${originalPrice.toFixed(2)}</span>
          </div>
          
          {discountPercentage > 0 && (
            <div className="flex justify-between text-green-600">
              <span>{t({
                english: `Duration Discount (${discountPercentage}% OFF)`,
                vietnamese: `Giảm giá theo thời hạn (${discountPercentage}% GIẢM)`
              })}</span>
              <span>-${(originalPrice - finalPrice).toFixed(2)}</span>
            </div>
          )}
          
          <div className="flex justify-between font-medium text-lg pt-2 border-t">
            <span>{t({
              english: "Total",
              vietnamese: "Tổng cộng"
            })}</span>
            <span>${finalPrice.toFixed(2)}</span>
          </div>
          
          {finalPrice > 0 && onAutoRenewChange && (
            <div className="flex items-center justify-between mt-2 bg-gray-50 p-2 rounded">
              <label className="flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="form-checkbox h-4 w-4 text-purple-600 rounded" 
                  checked={autoRenew} 
                  onChange={handleAutoRenewToggle}
                />
                <span className="ml-2 text-sm font-medium">{t({
                  english: "Auto-renew subscription",
                  vietnamese: "Tự động gia hạn đăng ký"
                })}</span>
              </label>
              <span className="text-xs text-green-600 font-medium">
                {autoRenew ? t({
                  english: "Can turn off anytime",
                  vietnamese: "Có thể tắt bất cứ lúc nào"
                }) : ""}
              </span>
            </div>
          )}
          
          <div className="text-sm text-gray-500">
            {autoRenew 
              ? <span>{t({
                  english: `Your subscription will automatically renew every ${durationMonths} month${durationMonths > 1 ? 's' : ''} at $${monthlyPrice.toFixed(2)}/month.`,
                  vietnamese: `Đăng ký của bạn sẽ tự động gia hạn mỗi ${durationMonths} tháng với giá $${monthlyPrice.toFixed(2)}/tháng.`
                })}</span>
              : <span>{t({
                  english: `Your post will expire after ${durationMonths} month${durationMonths > 1 ? 's' : ''}.`,
                  vietnamese: `Bài đăng của bạn sẽ hết hạn sau ${durationMonths} tháng.`
                })} <span className="text-amber-600 font-medium">{t({
                  english: "You'll lose your current pricing!",
                  vietnamese: "Bạn sẽ mất mức giá hiện tại!"
                })}</span></span>
            }
          </div>
        </div>
      ) : (
        // Free plan messaging
        <div className="mt-3 text-xs bg-yellow-50 p-3 rounded-md text-amber-800">
          <p className="font-medium">{t({
            english: "Credit card required for free trial. Cancel anytime, no risk.",
            vietnamese: "Yêu cầu thẻ tín dụng để dùng thử miễn phí. Hủy bất kỳ lúc nào, không có rủi ro."
          })}</p>
          <p className="mt-1">{t({
            english: "After your 30-day free trial, plan will automatically convert to paid unless canceled.",
            vietnamese: "Sau 30 ngày dùng thử miễn phí, gói sẽ tự động chuyển sang trả phí trừ khi bạn hủy."
          })}</p>
        </div>
      )}

      {/* Trust badges for all plans */}
      <div className="mt-4 pt-3 border-t flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-xs text-gray-600">{t({
            english: "100% Secure Payment via Stripe",
            vietnamese: "Thanh toán an toàn 100% qua Stripe"
          })}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Badge variant="outline" className="text-[10px] py-0 h-4">
            <Clock className="h-3 w-3 mr-1" />
            {t({
              english: "Limited Time Offer",
              vietnamese: "Ưu đãi có thời hạn"
            })}
          </Badge>
        </div>
      </div>

      {/* Auto-renew warning dialog */}
      <AlertDialog open={showAutoRenewDialog} onOpenChange={setShowAutoRenewDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              {t({
                english: "Are you sure you want to disable auto-renew?",
                vietnamese: "Bạn có chắc chắn muốn tắt tự động gia hạn không?"
              })}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t({
                english: "By turning off auto-renew, you'll lose your special pricing when your subscription ends. We'll also be unable to guarantee your listing's position after expiration.",
                vietnamese: "Khi tắt tự động gia hạn, bạn sẽ mất mức giá đặc biệt khi đăng ký kết thúc. Chúng tôi cũng không thể đảm bảo vị trí danh sách của bạn sau khi hết hạn."
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDisableAutoRenew}>{t({
              english: "Keep Auto-Renew",
              vietnamese: "Giữ tự động gia hạn"
            })}</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDisableAutoRenew} className="bg-red-600 hover:bg-red-700">
              {t({
                english: "Turn Off Auto-Renew",
                vietnamese: "Tắt tự động gia hạn"
              })}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
