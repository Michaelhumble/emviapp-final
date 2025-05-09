
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useTranslation } from '@/hooks/useTranslation';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface JobPostPaymentStepProps {
  onComplete: (paymentMethodId: string, autoRenew: boolean) => void;
  pricingTier: string;
  isFreeTier: boolean;
}

const JobPostPaymentStep: React.FC<JobPostPaymentStepProps> = ({ 
  onComplete, 
  pricingTier,
  isFreeTier 
}) => {
  const { t, isVietnamese } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [billingName, setBillingName] = useState('');
  const [autoRenew, setAutoRenew] = useState(false);

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    
    if (!cardElement) {
      setError(t('Card element not found', 'Không tìm thấy thông tin thẻ'));
      setIsProcessing(false);
      return;
    }

    // Create a payment method instead of charging the card
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: billingName || undefined,
      },
    });

    if (error) {
      setError(error.message || t('Payment processing error', 'Lỗi xử lý thanh toán'));
      setIsProcessing(false);
      return;
    }

    // Pass the payment method ID to parent component
    onComplete(paymentMethod.id, autoRenew);
  };
  
  const renewalDate = new Date();
  renewalDate.setDate(renewalDate.getDate() + 30);
  const formattedDate = renewalDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('Payment Information', 'Thông tin thanh toán')}</h2>
      
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
            <Label htmlFor="billing-name">{t('Billing Name (Optional)', 'Tên thanh toán (Không bắt buộc)')}</Label>
            <Input
              id="billing-name"
              value={billingName}
              onChange={(e) => setBillingName(e.target.value)}
              placeholder={t('Name on card', 'Tên trên thẻ')}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="card-element">{t('Card Details', 'Chi tiết thẻ')}</Label>
            <div className="border rounded-md p-3 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
              <CardElement id="card-element" options={cardElementOptions} />
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
          <Button type="submit" disabled={!stripe || isProcessing} className="px-8">
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
