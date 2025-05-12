
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import { PricingOptions } from '@/types/job';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight, CalendarClock, CheckCircle, CreditCard, RefreshCw, ShieldCheck } from 'lucide-react';

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
  
  const getPlanDisplayName = (plan: string) => {
    switch (plan) {
      case 'standard': return t('Standard', 'Tiêu chuẩn');
      case 'gold': return t('Gold Featured', 'Nổi bật Vàng');
      case 'premium': return t('Premium', 'Cao cấp');
      case 'diamond': return t('Diamond Featured', 'Nổi bật Kim cương');
      default: return t('Free', 'Miễn phí');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-purple-500" />
            {t('Confirm Payment', 'Xác nhận thanh toán')}
          </DialogTitle>
          <DialogDescription>
            {t('Please review your selection before proceeding.', 'Vui lòng xem lại lựa chọn của bạn trước khi tiếp tục.')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-gray-50">
            <h3 className="font-medium mb-3 flex items-center gap-2 text-gray-800">
              <CreditCard className="h-4 w-4 text-purple-600" />
              {t('Payment Details', 'Chi tiết thanh toán')}
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center gap-1.5">
                  <CalendarClock className="h-4 w-4 text-blue-500" />
                  <span>{t('Plan', 'Gói')}: </span>
                </div>
                <span className="font-medium">
                  {getPlanDisplayName(options.selectedPricingTier)}
                </span>
              </div>
              
              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center gap-1.5">
                  <CalendarClock className="h-4 w-4 text-blue-500" />
                  <span>{t('Duration', 'Thời hạn')}: </span>
                </div>
                <span className="font-medium">
                  {options.durationMonths} {options.durationMonths === 1 
                    ? t('month', 'tháng') 
                    : t('months', 'tháng')}
                </span>
              </div>
              
              {options.autoRenew && (
                <div className="flex justify-between text-sm items-center">
                  <div className="flex items-center gap-1.5">
                    <RefreshCw className="h-4 w-4 text-green-500" />
                    <span>{t('Auto-renew', 'Tự động gia hạn')}: </span>
                  </div>
                  <span className="text-green-600 font-medium">
                    {t('Enabled', 'Đã bật')}
                  </span>
                </div>
              )}
              
              {discountPercentage > 0 && (
                <div className="flex justify-between text-sm items-center">
                  <span>{t('Discount', 'Giảm giá')}: </span>
                  <span className="text-green-600">-{discountPercentage}%</span>
                </div>
              )}
              
              {discountPercentage > 0 && (
                <div className="flex justify-between text-sm items-center">
                  <span>{t('Original price', 'Giá gốc')}: </span>
                  <span className="line-through text-gray-500">{formatCurrency(originalPrice)}</span>
                </div>
              )}
              
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <span>{t('Total', 'Tổng cộng')}: </span>
                <span className="text-purple-800">{formatCurrency(amount)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg">
            <div className="flex items-start text-sm mb-1">
              <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
              <span className="text-blue-800">
                {t('Your payment is secure and processed by Stripe', 
                   'Thanh toán của bạn được bảo mật và xử lý bởi Stripe')}
              </span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-2">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="px-4"
            >
              {t('Cancel', 'Hủy')}
            </Button>
            
            <Button 
              onClick={onConfirmPayment}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4"
            >
              <div className="flex items-center gap-1">
                {t('Confirm & Pay', 'Xác nhận & Thanh toán')}
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmationModal;
