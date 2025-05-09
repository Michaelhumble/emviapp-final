
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import PricingCards from '@/components/posting/PricingCards';
import PaymentSummary from '@/components/posting/PaymentSummary';
import { useTranslation } from '@/hooks/useTranslation';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PricingOptions } from '@/utils/posting/types';
import { Dialog } from '@/components/ui/dialog';
import { calculateFinalPrice } from '@/utils/posting/jobPricing';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import StripeCheckout from '@/components/payments/StripeCheckout';

export interface ReviewAndPaymentSectionProps {
  postType: 'job' | 'salon' | 'booth' | 'supply';
  jobData?: any;
  onNextStep: () => void;
  onPrevStep: () => void;
  isFirstPost: boolean;
  pricingOptions: PricingOptions;
  onPricingChange: (pricingTier: string) => void;
  onUpdatePricing?: (options: Partial<PricingOptions>) => void;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  postType,
  jobData,
  onNextStep,
  onPrevStep,
  isFirstPost,
  pricingOptions,
  onPricingChange,
  onUpdatePricing
}) => {
  const { t } = useTranslation();
  const [selectedPricing, setSelectedPricing] = useState<string>(pricingOptions.selectedPricingTier || 'standard');
  const [selectedDuration, setSelectedDuration] = useState<number>(1);
  const [autoRenew, setAutoRenew] = useState<boolean>(pricingOptions.autoRenew || false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

  const selectedPricingOption = jobPricingOptions.find(option => option.id === selectedPricing);
  const basePrice = selectedPricingOption?.price || 0;
  const isFreeTier = selectedPricing === 'free';

  // Calculate pricing with discounts applied
  const { originalPrice, finalPrice, discountPercentage } = calculateFinalPrice(
    basePrice,
    selectedDuration,
    selectedPricing,
    autoRenew
  );

  // Set the pricing details when selection changes
  useEffect(() => {
    if (onPricingChange) {
      onPricingChange(selectedPricing);
    }
  }, [selectedPricing, onPricingChange]);

  // Update autoRenew and other pricing options
  useEffect(() => {
    if (onUpdatePricing) {
      onUpdatePricing({
        selectedPricingTier: selectedPricing,
        autoRenew
      });
    }
  }, [selectedPricing, autoRenew, onUpdatePricing]);

  const handleChangePricing = (pricingId: string) => {
    setSelectedPricing(pricingId);
    // Reset auto-renew when switching to free tier
    if (pricingId === 'free') {
      setAutoRenew(false);
    }
  };

  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
  };

  const handleToggleAutoRenew = (checked: boolean) => {
    setAutoRenew(checked);
    if (onUpdatePricing) {
      onUpdatePricing({
        ...pricingOptions,
        autoRenew: checked
      });
    }
  };

  const handleProceedToPayment = () => {
    setShowPaymentModal(true);
  };

  const handleClosePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handleConfirmPayment = () => {
    // Here you would typically handle the actual payment processing
    // For now, just close the modal and proceed
    setShowPaymentModal(false);
    onNextStep();
  };

  // Construct the product name based on user selections
  const productName = `${selectedPricingOption?.name} ${postType.toUpperCase()} Post (${selectedDuration} ${selectedDuration === 1 ? 'month' : 'months'})`;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">
        {t('Review and Payment', 'Xem lại và Thanh toán')}
      </h2>
      <p className="text-gray-600">
        {t('Choose a plan that fits your needs. All plans include visibility on our platform.', 
           'Chọn gói phù hợp với nhu cầu của bạn. Tất cả các gói đều bao gồm hiển thị trên nền tảng của chúng tôi.')}
      </p>

      <Card>
        <CardContent className="pt-6">
          <PricingCards
            pricingOptions={jobPricingOptions}
            selectedPricing={selectedPricing}
            onChange={handleChangePricing}
            selectedDuration={selectedDuration}
            onDurationChange={handleDurationChange}
          />
        </CardContent>
      </Card>

      {!isFreeTier && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch 
                id="auto-renew" 
                checked={autoRenew} 
                onCheckedChange={handleToggleAutoRenew}
              />
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="auto-renew" className="cursor-pointer">
                        {t('Enable Auto-Renew and Save 20%', 'Bật Tự động gia hạn và Tiết kiệm 20%')}
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm max-w-xs">
                        {t('You can cancel anytime. We\'ll remind you before billing.',
                           'Bạn có thể hủy bất kỳ lúc nào. Chúng tôi sẽ nhắc bạn trước khi tính phí.')}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <CardContent className="pt-6">
          <PaymentSummary 
            basePrice={basePrice}
            duration={selectedDuration}
            autoRenew={autoRenew}
            originalPrice={originalPrice}
            finalPrice={finalPrice}
            discountPercentage={discountPercentage}
            onProceedToPayment={handleProceedToPayment}
          />
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">{t('Confirm Payment', 'Xác nhận thanh toán')}</h3>
            <p className="mb-4">{t('Total Amount:', 'Tổng số tiền:')}</p>
            <p className="text-2xl font-bold">${finalPrice.toFixed(2)}</p>
            <p className="text-sm text-gray-600 mb-6">
              {discountPercentage > 0 && (
                <span className="line-through mr-2">${originalPrice.toFixed(2)}</span>
              )}
              {discountPercentage > 0 && (
                <span className="text-green-600">(-{discountPercentage}%)</span>
              )}
            </p>

            <div className="mt-6 space-y-4">
              <StripeCheckout
                amount={finalPrice}
                productName={productName}
                buttonText={t('Proceed to Payment', 'Tiến hành thanh toán')}
                onSuccess={handleConfirmPayment}
              />
              <button 
                className="w-full py-2 text-gray-600 hover:text-gray-800"
                onClick={handleClosePaymentModal}
              >
                {t('Cancel', 'Hủy')}
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ReviewAndPaymentSection;
