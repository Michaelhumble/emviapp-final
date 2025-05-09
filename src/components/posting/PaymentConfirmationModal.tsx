
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';

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

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) onClose();
    if (onOpenChange) onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('Confirm Payment', 'Xác nhận thanh toán')}</DialogTitle>
          <DialogDescription>
            {t('Please review your selection before proceeding.', 'Vui lòng xem lại lựa chọn của bạn trước khi tiếp tục.')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <h3 className="font-medium mb-2">{t('Payment Details', 'Chi tiết thanh toán')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{t('Plan', 'Gói')}: </span>
                <span className="font-medium">
                  {options.selectedPricingTier === 'standard' ? t('Standard', 'Tiêu chuẩn') :
                   options.selectedPricingTier === 'gold' ? t('Gold Featured', 'Nổi bật Vàng') :
                   options.selectedPricingTier === 'premium' ? t('Premium', 'Cao cấp') : 
                   options.selectedPricingTier === 'diamond' ? t('Diamond Featured', 'Nổi bật Kim cương') : 
                   t('Free', 'Miễn phí')}
                </span>
              </div>
              
              {options.autoRenew && (
                <div className="flex justify-between text-sm">
                  <span>{t('Auto-renew', 'Tự động gia hạn')}: </span>
                  <span className="text-green-600">{t('Enabled (5% discount)', 'Đã bật (giảm 5%)')}</span>
                </div>
              )}
              
              {discountPercentage > 0 && (
                <div className="flex justify-between text-sm">
                  <span>{t('Discount', 'Giảm giá')}: </span>
                  <span className="text-green-600">-{discountPercentage}%</span>
                </div>
              )}
              
              {discountPercentage > 0 && (
                <div className="flex justify-between text-sm">
                  <span>{t('Original price', 'Giá gốc')}: </span>
                  <span className="line-through text-gray-500">{formatCurrency(originalPrice)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>{t('Total', 'Tổng cộng')}: </span>
                <span>{formatCurrency(amount)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={onClose}>
              {t('Cancel', 'Hủy')}
            </Button>
            <Button onClick={onConfirmPayment}>
              {t('Confirm & Pay', 'Xác nhận & Thanh toán')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmationModal;
