
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useJobPaymentHandler } from '@/hooks/useJobPaymentHandler';

interface JobPostPaymentStepProps {
  onComplete: (paymentMethodId: string, autoRenew: boolean) => void;
  pricingTier: string;
  isFreeTier?: boolean;
}

const JobPostPaymentStep: React.FC<JobPostPaymentStepProps> = ({ 
  onComplete, 
  pricingTier,
  isFreeTier = false
}) => {
  const { t } = useTranslation();
  const [billingName, setBillingName] = useState('');
  const [autoRenew, setAutoRenew] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const { handlePaymentSetup, isProcessing } = useJobPaymentHandler();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // For demo purposes, we'll simulate a successful payment setup
    // In a real implementation, we would use Stripe.js to tokenize the card
    try {
      // Simulate a payment method ID from Stripe
      const mockPaymentMethodId = `pm_mock_${Math.random().toString(36).substring(2, 15)}`;
      
      // Call our payment handler
      const result = await handlePaymentSetup({
        paymentMethodId: mockPaymentMethodId,
        pricingTier,
        autoRenew
      });
      
      if (result.success) {
        onComplete(mockPaymentMethodId, autoRenew);
      } else {
        setError(t('Payment setup failed', 'Thiết lập thanh toán thất bại'));
      }
    } catch (err) {
      setError(t('An unexpected error occurred', 'Đã xảy ra lỗi không mong muốn'));
    }
  };

  const renewalDate = new Date();
  renewalDate.setDate(renewalDate.getDate() + 30);
  const formattedDate = renewalDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        {t('Payment Information', 'Thông tin thanh toán')}
      </h2>
      
      <Alert>
        <AlertDescription className="text-base">
          {t(
            '💳 To post this job, please add your card. We\'ll only charge you if you choose a paid plan or auto-renew later.',
            '💳 Để đăng tin, vui lòng nhập thông tin thẻ. Bạn chỉ bị tính phí nếu chọn gói trả tiền hoặc bật tự động gia hạn.'
          )}
        </AlertDescription>
      </Alert>
      
      {isFreeTier && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Alert className="bg-blue-50 border-blue-200">
                <AlertDescription className="text-sm">
                  {t(
                    'Credit card required to prevent spam. You won\'t be charged unless you upgrade.',
                    'Yêu cầu thẻ tín dụng để ngăn spam. Bạn sẽ không bị tính phí trừ khi nâng cấp.'
                  )}
                </AlertDescription>
              </Alert>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                {t(
                  'We require a valid card for all listings to maintain quality. Free tier users are never charged.',
                  'Chúng tôi yêu cầu thẻ hợp lệ cho tất cả bài đăng để duy trì chất lượng. Người dùng gói miễn phí không bao giờ bị tính phí.'
                )}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="billing-name">
              {t('Billing Name (Optional)', 'Tên thanh toán (Không bắt buộc)')}
            </Label>
            <Input
              id="billing-name"
              value={billingName}
              onChange={(e) => setBillingName(e.target.value)}
              placeholder={t('Name on card', 'Tên trên thẻ')}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="card-number">
              {t('Card Number', 'Số thẻ')}
            </Label>
            <Input
              id="card-number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="font-mono"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="card-expiry">
                {t('Expiry Date', 'Ngày hết hạn')}
              </Label>
              <Input
                id="card-expiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="card-cvc">
                {t('CVC', 'Mã bảo mật')}
              </Label>
              <Input
                id="card-cvc"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="123"
              />
            </div>
          </div>
          
          {!isFreeTier && (
            <div className="flex items-center space-x-2 pt-2">
              <Switch
                id="auto-renew"
                checked={autoRenew}
                onCheckedChange={setAutoRenew}
              />
              <Label htmlFor="auto-renew" className="cursor-pointer">
                {t('Enable Auto-Renew and Save 20%', 'Bật Tự động gia hạn và Tiết kiệm 20%')}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-gray-400 text-xs cursor-help ml-1">(?)</span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      {t(
                        'You can cancel anytime. We\'ll remind you before billing.',
                        'Bạn có thể hủy bất kỳ lúc nào. Chúng tôi sẽ nhắc bạn trước khi tính phí.'
                      )}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
          
          {autoRenew && !isFreeTier && (
            <div className="text-sm bg-gray-50 p-3 rounded-md border">
              {t(
                `You'll be billed $9.99 every 30 days starting ${formattedDate} (unless canceled)`,
                `Bạn sẽ bị tính phí $9.99 mỗi 30 ngày bắt đầu từ ${formattedDate} (trừ khi hủy)`
              )}
            </div>
          )}
          
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
        
        <div className="flex justify-end pt-4">
          <Button 
            type="submit"
            disabled={isProcessing}
            className="px-8"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t('Processing...', 'Đang xử lý...')}
              </>
            ) : (
              t('Continue', 'Tiếp tục')
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobPostPaymentStep;
