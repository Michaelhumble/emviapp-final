
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import { ShieldCheck } from 'lucide-react';

export interface PaymentConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onOpenChange?: (open: boolean) => void;
  onConfirmPayment: () => void;
  amount: number;
  options: PricingOptions;
  originalPrice: number;
  discountPercentage: number;
}

const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({
  open,
  onClose,
  onOpenChange,
  onConfirmPayment,
  amount,
  options,
  originalPrice,
  discountPercentage
}) => {
  const { t } = useTranslation();
  const savings = originalPrice - amount;

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
    if (onOpenChange) onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t({
            english: 'Confirm Payment',
            vietnamese: 'Xác nhận thanh toán'
          })}</DialogTitle>
          <DialogDescription>
            {t({
              english: 'Please review your selection before proceeding.',
              vietnamese: 'Vui lòng xem lại lựa chọn của bạn trước khi tiếp tục.'
            })}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">{t({
              english: 'Payment Details', 
              vietnamese: 'Chi tiết thanh toán'
            })}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t({
                  english: 'Plan', 
                  vietnamese: 'Gói'
                })}: </span>
                <span className="font-medium">
                  {options.selectedPricingTier === 'standard' ? t({
                    english: 'Basic', 
                    vietnamese: 'Cơ bản'
                  }) :
                   options.selectedPricingTier === 'gold' ? t({
                     english: 'Elite', 
                     vietnamese: 'Cao cấp'
                   }) :
                   options.selectedPricingTier === 'premium' ? t({
                     english: 'Professional', 
                     vietnamese: 'Chuyên nghiệp'
                   }) : 
                   options.selectedPricingTier === 'diamond' ? t({
                     english: 'Diamond', 
                     vietnamese: 'Kim cương'
                   }) : 
                   t({
                     english: 'Free', 
                     vietnamese: 'Miễn phí'
                   })}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span>{t({
                  english: 'Duration', 
                  vietnamese: 'Thời hạn'
                })}: </span>
                <span>
                  {options.durationMonths === 1 ? t({
                    english: '1 Month', 
                    vietnamese: '1 Tháng'
                  }) : t({
                    english: `${options.durationMonths} Months`, 
                    vietnamese: `${options.durationMonths} Tháng`
                  })}
                </span>
              </div>
              
              {options.autoRenew && (
                <div className="flex justify-between text-sm">
                  <span>{t({
                    english: 'Auto-renew', 
                    vietnamese: 'Tự động gia hạn'
                  })}: </span>
                  <span className="text-green-600">{t({
                    english: 'Enabled (5% discount)', 
                    vietnamese: 'Đã bật (giảm 5%)'
                  })}</span>
                </div>
              )}
              
              {discountPercentage > 0 && (
                <div className="flex justify-between text-sm">
                  <span>{t({
                    english: 'Discount', 
                    vietnamese: 'Giảm giá'
                  })}: </span>
                  <span className="text-green-600">-{discountPercentage}%</span>
                </div>
              )}
              
              {discountPercentage > 0 && (
                <div className="flex justify-between text-sm">
                  <span>{t({
                    english: 'Original price', 
                    vietnamese: 'Giá gốc'
                  })}: </span>
                  <span className="line-through text-gray-500">{formatCurrency(originalPrice)}</span>
                </div>
              )}
              
              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span>{t({
                    english: 'You save', 
                    vietnamese: 'Bạn tiết kiệm'
                  })}: </span>
                  <span className="text-green-600">{formatCurrency(savings)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>{t({
                  english: 'Total', 
                  vietnamese: 'Tổng cộng'
                })}: </span>
                <span>{formatCurrency(amount)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center text-xs text-gray-500 gap-1.5 py-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>{t({
              english: 'Secure payment powered by Stripe', 
              vietnamese: 'Thanh toán an toàn được cung cấp bởi Stripe'
            })}</span>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              {t({
                english: 'Cancel', 
                vietnamese: 'Hủy'
              })}
            </Button>
            <Button onClick={onConfirmPayment}>
              {t({
                english: 'Confirm & Pay', 
                vietnamese: 'Xác nhận & Thanh toán'
              })}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmationModal;
