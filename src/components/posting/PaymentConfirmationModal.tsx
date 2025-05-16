
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface PaymentConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  isSuccess: boolean;
  paymentId?: string;
  errorMessage?: string;
  onRetry?: () => void;
}

/**
 * Displays a modal with the payment confirmation/error result
 */
const PaymentConfirmationModal: React.FC<PaymentConfirmationModalProps> = ({
  isOpen,
  onClose,
  isSuccess,
  paymentId,
  errorMessage = '',
  onRetry,
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {isSuccess ? (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <DialogTitle className="text-center text-xl">
                {t({ english: "Payment Successful", vietnamese: "Thanh toán thành công" })}
              </DialogTitle>
              <DialogDescription className="text-center mt-2">
                {t({ english: "Your payment was processed successfully.", vietnamese: "Thanh toán của bạn đã được xử lý thành công." })}
              </DialogDescription>
            </>
          ) : (
            <>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <DialogTitle className="text-center text-xl">
                {t({ english: "Payment Failed", vietnamese: "Thanh toán thất bại" })}
              </DialogTitle>
              <DialogDescription className="text-center mt-2">
                {t({ english: "There was an issue processing your payment.", vietnamese: "Đã xảy ra sự cố khi xử lý thanh toán của bạn." })}
              </DialogDescription>
            </>
          )}
        </DialogHeader>
        
        <div className="p-2">
          {isSuccess ? (
            <>
              <p className="text-center text-sm text-gray-600 mb-4">
                {t({ english: "Thank you for your payment! Your listing will be published shortly.", vietnamese: "Cảm ơn vì khoản thanh toán! Bài đăng của bạn sẽ sớm được xuất bản." })}
              </p>
              
              {paymentId && (
                <div className="bg-gray-50 p-3 rounded-md text-center mt-2 mb-4">
                  <p className="text-sm font-medium text-gray-800">
                    {t({ english: "Payment Reference", vietnamese: "Mã tham chiếu thanh toán" })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 break-all">
                    {paymentId}
                  </p>
                </div>
              )}
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-3 mb-4">
                <p className="text-sm text-blue-800">
                  {t({ english: "We've sent you a confirmation email with all the details.", vietnamese: "Chúng tôi đã gửi email xác nhận với tất cả các chi tiết." })}
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-100 rounded-md p-3">
                <h4 className="text-sm font-medium text-green-800">
                  {t({ english: "Next Steps", vietnamese: "Các bước tiếp theo" })}
                </h4>
                <ul className="mt-2 text-sm text-green-700 space-y-1 pl-5 list-disc">
                  <li>{t({ english: "Your listing is being reviewed by our team", vietnamese: "Bài đăng của bạn đang được đội ngũ chúng tôi xem xét" })}</li>
                  <li>{t({ english: "You'll receive a notification when it's published", vietnamese: "Bạn sẽ nhận được thông báo khi nó được xuất bản" })}</li>
                  <li>{t({ english: "You can track your listing status in your dashboard", vietnamese: "Bạn có thể theo dõi trạng thái bài đăng trong bảng điều khiển" })}</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div className="bg-red-50 border border-red-100 rounded-md p-3 mb-4">
                <p className="text-sm text-red-800">
                  {errorMessage || t({ english: "We couldn't process your payment. Please check your payment details and try again.", vietnamese: "Chúng tôi không thể xử lý thanh toán của bạn. Vui lòng kiểm tra thông tin thanh toán và thử lại." })}
                </p>
              </div>
              
              <div className="bg-gray-50 border border-gray-100 rounded-md p-3">
                <h4 className="text-sm font-medium text-gray-800">
                  {t({ english: "Common Issues", vietnamese: "Các vấn đề phổ biến" })}
                </h4>
                <ul className="mt-2 text-sm text-gray-600 space-y-1 pl-5 list-disc">
                  <li>{t({ english: "Insufficient funds in your account", vietnamese: "Không đủ tiền trong tài khoản của bạn" })}</li>
                  <li>{t({ english: "Card expired or invalid", vietnamese: "Thẻ hết hạn hoặc không hợp lệ" })}</li>
                  <li>{t({ english: "Security verification failed", vietnamese: "Xác minh bảo mật không thành công" })}</li>
                  <li>{t({ english: "Transaction limit exceeded", vietnamese: "Vượt quá giới hạn giao dịch" })}</li>
                </ul>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-row sm:justify-center gap-2 mt-2">
          {isSuccess ? (
            <Button onClick={onClose} className="w-full sm:w-auto">
              {t({ english: "Go to Dashboard", vietnamese: "Đi đến Bảng điều khiển" })}
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={onClose} className="w-full sm:w-auto">
                {t({ english: "Cancel", vietnamese: "Hủy bỏ" })}
              </Button>
              {onRetry && (
                <Button onClick={onRetry} className="w-full sm:w-auto">
                  {t({ english: "Try Again", vietnamese: "Thử lại" })}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentConfirmationModal;
