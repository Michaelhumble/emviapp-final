
import React, { useState, useMemo } from 'react';
import { format, add } from 'date-fns';
import { jobPricingOptions, calculateFinalPrice } from '@/utils/posting/jobPricing';
import { PricingOptions, JobPricingOption } from '@/utils/posting/types';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import DurationSelector from '@/components/posting/DurationSelector';
import PricingCards from '@/components/posting/PricingCards';
import PaymentSummary from '@/components/posting/PaymentSummary';
import PaymentConfirmationModal from '@/components/posting/PaymentConfirmationModal';
import { useTranslation } from '@/hooks/useTranslation';

interface ReviewAndPaymentSectionProps {
  postType: string;
  pricingOptions: PricingOptions;
  onPricingChange: (pricingId: string) => void;
  onUpdatePricing: (options: Partial<PricingOptions>) => void;
  isFirstPost?: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
  jobData?: any;
  salonData?: any;
  boothData?: any;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  postType,
  pricingOptions,
  onPricingChange,
  onUpdatePricing,
  isFirstPost = false,
  onNextStep,
  onPrevStep,
  jobData,
  salonData,
  boothData
}) => {
  const { t } = useTranslation();
  const [duration, setDuration] = useState<number>(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  // Get filtered pricing options based on post type
  const filteredPricingOptions = useMemo(() => {
    // For this example, we'll use the job pricing options for all post types
    // In a real implementation, you'd have different pricing options for different post types
    return jobPricingOptions;
  }, []);
  
  // Get selected pricing option
  const selectedPricing = useMemo(() => {
    return filteredPricingOptions.find(
      (option) => option.id === pricingOptions.selectedPricingTier
    ) || filteredPricingOptions[0];
  }, [filteredPricingOptions, pricingOptions.selectedPricingTier]);
  
  // Handle duration change
  const handleDurationChange = (value: number) => {
    setDuration(value);
  };
  
  // Handle auto-renew toggle
  const handleAutoRenewToggle = (checked: boolean) => {
    onUpdatePricing({ autoRenew: checked });
  };
  
  // Calculate price with discount based on duration
  const { originalPrice, finalPrice, discountPercentage } = useMemo(() => {
    return calculateFinalPrice(
      selectedPricing.price,
      duration,
      selectedPricing.id,
      pricingOptions.autoRenew
    );
  }, [selectedPricing, duration, pricingOptions.autoRenew]);
  
  // Handle payment confirmation
  const handleProceedToPayment = () => {
    setShowPaymentModal(true);
  };
  
  const handleConfirmPayment = () => {
    setShowPaymentModal(false);
    onNextStep();
  };
  
  // Calculate renewal date
  const renewalDate = useMemo(() => {
    let daysToAdd = 30;
    
    if (duration === 3) {
      daysToAdd = 90;
    } else if (duration === 6) {
      daysToAdd = 180;
    } else if (duration === 12) {
      daysToAdd = 365;
    }
    
    return add(new Date(), { days: daysToAdd });
  }, [duration]);
  
  // Format renewal date for display
  const formattedRenewalDate = format(renewalDate, 'MMM d, yyyy');
  const formattedRenewalDateVi = format(renewalDate, "d 'tháng' M, yyyy");
  
  // Get renewal period text
  const getRenewalPeriodText = () => {
    if (duration === 1) {
      return t('every 30 days', 'mỗi 30 ngày');
    } else if (duration === 3) {
      return t('every 90 days', 'mỗi 90 ngày');
    } else if (duration === 6) {
      return t('every 180 days', 'mỗi 180 ngày');
    } else {
      return t('every 12 months', 'mỗi 12 tháng');
    }
  };
  
  // Check if Diamond plan is selected
  const isDiamondPlan = selectedPricing.id === 'diamond';
  
  // Check if auto-renew should be enabled
  // For Diamond plan, only enable if duration is 12 months
  const canEnableAutoRenew = !isDiamondPlan || (isDiamondPlan && duration === 12);
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {t('Choose Your Plan', 'Chọn Gói Dịch Vụ')}
        </h2>
        <p className="text-gray-600">
          {t(
            'Select a plan that fits your needs. Higher tier plans get more visibility and features.',
            'Chọn gói phù hợp với nhu cầu của bạn. Các gói cao cấp hơn sẽ được hiển thị nhiều hơn và có nhiều tính năng hơn.'
          )}
        </p>
      </div>
      
      <PricingCards
        pricingOptions={filteredPricingOptions}
        selectedPricing={selectedPricing.id}
        onChange={onPricingChange}
        selectedDuration={duration}
        onDurationChange={handleDurationChange}
      />
      
      {/* Auto-renew option */}
      <div className="bg-gray-50 p-4 rounded-lg border">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">
              {t('Enable Auto-Renew', 'Bật Tự Động Gia Hạn')}
            </h3>
            <p className="text-gray-600 text-sm">
              {canEnableAutoRenew ? (
                <>{t('Get an additional 5% discount', 'Nhận thêm giảm giá 5%')}</>
              ) : (
                <>{t('Only available for 12-month plans', 'Chỉ khả dụng cho gói 12 tháng')}</>
              )}
            </p>
            
            {/* Show renewal information if auto-renew is enabled */}
            {pricingOptions.autoRenew && canEnableAutoRenew && (
              <div className="mt-2 text-sm text-gray-600">
                <p>
                  {t(
                    `You'll be billed ${finalPrice} ${getRenewalPeriodText()} starting ${formattedRenewalDate}.`,
                    `Bạn sẽ bị tính phí ${finalPrice} ${getRenewalPeriodText()} bắt đầu từ ${formattedRenewalDateVi}.`
                  )}
                </p>
                {isDiamondPlan && duration === 12 && (
                  <p className="text-green-600 mt-1">
                    {t('Keep this price locked in each year. Cancel anytime.', 'Giữ giá này mỗi năm. Hủy bất kỳ lúc nào.')}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="auto-renew"
              checked={pricingOptions.autoRenew && canEnableAutoRenew}
              onCheckedChange={handleAutoRenewToggle}
              disabled={!canEnableAutoRenew}
            />
            <Label htmlFor="auto-renew">
              {pricingOptions.autoRenew && canEnableAutoRenew ? t('On', 'Bật') : t('Off', 'Tắt')}
            </Label>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <PaymentSummary
          basePrice={selectedPricing.price}
          duration={duration}
          autoRenew={pricingOptions.autoRenew && canEnableAutoRenew}
          originalPrice={originalPrice}
          finalPrice={finalPrice}
          discountPercentage={discountPercentage}
          onProceedToPayment={handleProceedToPayment}
        />
      </div>
      
      {/* Payment confirmation modal */}
      <PaymentConfirmationModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onConfirmPayment={handleConfirmPayment}
        amount={finalPrice}
        options={pricingOptions}
        originalPrice={originalPrice}
        discountPercentage={discountPercentage}
      />
    </div>
  );
};

export default ReviewAndPaymentSection;
