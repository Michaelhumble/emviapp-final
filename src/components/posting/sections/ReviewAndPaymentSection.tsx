
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { format, addMonths } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { calculateFinalPrice, jobPricingOptions } from '@/utils/posting/jobPricing';
import PricingCards from '../PricingCards';
import PricingDisplay from '../PricingDisplay';
import PaymentSummary from '../PaymentSummary';
import PaymentConfirmationModal from '../PaymentConfirmationModal';
import { useTranslation } from '@/hooks/useTranslation';
import { vi } from 'date-fns/locale';
import { PricingOptions, PostType } from '@/utils/posting/types';

interface ReviewAndPaymentSectionProps {
  postType: PostType;
  jobData?: any;
  pricingOptions: PricingOptions;
  onPricingChange: (pricingTier: string) => void;
  onUpdatePricing: (options: Partial<PricingOptions>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  isFirstPost?: boolean;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  postType,
  jobData,
  pricingOptions,
  onPricingChange,
  onUpdatePricing,
  onNextStep,
  onPrevStep,
  isFirstPost = true,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [duration, setDuration] = useState(1); // Default to 1 month
  
  // State for payment confirmation modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const selectedPricingTier = pricingOptions.selectedPricingTier || 'standard';
  const autoRenew = pricingOptions.autoRenew || false;
  
  // Find the selected pricing option
  const selectedOption = jobPricingOptions.find(option => option.id === selectedPricingTier);
  
  // Check if the selected plan is free
  const isFreePlan = selectedOption?.price === 0;
  
  // Set base price based on selected tier
  const basePrice = selectedOption?.price || 0;
  
  // Calculate the price with duration discount and special Diamond plan handling
  const { originalPrice, finalPrice, discountPercentage } = calculateFinalPrice(
    basePrice,
    duration,
    selectedPricingTier,
    autoRenew
  );
  
  // Calculate the renewal date
  const renewalDate = addMonths(new Date(), duration);
  const formattedRenewalDate = format(renewalDate, 'MMMM d, yyyy');
  const formattedRenewalDateVi = format(renewalDate, "d 'tháng' M, yyyy");
  
  // Determine renewal period text based on selected duration
  const getRenewalPeriodText = () => {
    if (selectedPricingTier === 'diamond') {
      // Special case for Diamond plan
      return t('every 12 months', 'mỗi 12 tháng');
    }
    
    switch (duration) {
      case 1: return t('every 30 days', 'mỗi 30 ngày');
      case 3: return t('every 90 days', 'mỗi 90 ngày');
      case 6: return t('every 180 days', 'mỗi 180 ngày');
      case 12: return t('every 12 months', 'mỗi 12 tháng');
      default: return t('every month', 'mỗi tháng');
    }
  };
  
  const handleDurationChange = (newDuration: number) => {
    setDuration(newDuration);
  };
  
  const handleAutoRenewChange = (checked: boolean) => {
    onUpdatePricing({ autoRenew: checked });
  };
  
  const handleProceedToPayment = () => {
    setShowPaymentModal(true);
  };
  
  const handlePaymentConfirmation = () => {
    setShowPaymentModal(false);
    // Actually process payment and submit job/salon
    navigate(`/${postType}-post-success`);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">
        {t('Review & Payment', 'Xem lại & Thanh toán')}
      </h2>
      
      {/* Review Summary Section */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">
            {t('Your selected package:', 'Gói bạn đã chọn:')}
          </h3>
          
          {/* Pricing Cards for Selection */}
          <div className="mb-6">
            <PricingCards
              selectedTier={selectedPricingTier}
              onSelectTier={onPricingChange}
              isJob={postType === 'job'}
              showReducedOptions={false}
            />
          </div>
          
          {/* Duration Selection */}
          <div className="mt-6 mb-4">
            <h4 className="font-medium mb-2">
              {t('Select Duration', 'Chọn thời hạn')}:
            </h4>
            <div className="grid grid-cols-4 gap-2">
              <Button 
                variant={duration === 1 ? "default" : "outline"}
                onClick={() => handleDurationChange(1)}
                className="w-full"
              >
                1 {t('Month', 'Tháng')}
              </Button>
              <Button 
                variant={duration === 3 ? "default" : "outline"}
                onClick={() => handleDurationChange(3)}
                className="w-full"
              >
                3 {t('Months', 'Tháng')}
              </Button>
              <Button 
                variant={duration === 6 ? "default" : "outline"}
                onClick={() => handleDurationChange(6)}
                className="w-full"
              >
                6 {t('Months', 'Tháng')}
              </Button>
              <Button 
                variant={duration === 12 ? "default" : "outline"}
                onClick={() => handleDurationChange(12)}
                className="w-full"
              >
                12 {t('Months', 'Tháng')}
              </Button>
            </div>
          </div>
          
          {/* Auto-renew Toggle - Hide for Free plan */}
          {!isFreePlan ? (
            <div className="flex items-center justify-between py-4 border-t">
              <div>
                <Label htmlFor="auto-renew" className="font-medium">
                  {t('Enable Auto-Renew', 'Bật tự động gia hạn')} 
                  <span className="text-green-600 ml-2">(-5%)</span>
                </Label>
                <div className="text-sm text-muted-foreground">
                  {t(
                    `You'll be billed $${finalPrice.toFixed(2)} ${getRenewalPeriodText()} starting ${formattedRenewalDate}.`, 
                    `Bạn sẽ bị trừ $${finalPrice.toFixed(2)} ${getRenewalPeriodText()} bắt đầu từ ${formattedRenewalDateVi}.`
                  )}
                </div>
                {autoRenew && selectedPricingTier === 'diamond' && (
                  <div className="text-xs text-green-600 mt-1">
                    {t('Keep this price locked in each year. Cancel anytime.', 'Giữ giá này mỗi năm. Hủy bất kỳ lúc nào.')}
                  </div>
                )}
              </div>
              <Switch 
                id="auto-renew"
                checked={autoRenew}
                onCheckedChange={handleAutoRenewChange}
              />
            </div>
          ) : (
            <div className="py-4 border-t text-sm text-muted-foreground">
              {t('This plan does not renew. First-time post only.', 'Gói này không tự động gia hạn. Chỉ áp dụng cho lần đăng đầu tiên.')}
            </div>
          )}
          
          {/* Display Total Price */}
          <div className="flex justify-between items-center py-4 border-t">
            <span className="font-medium">
              {t('Total', 'Tổng cộng')}:
            </span>
            <PricingDisplay 
              basePrice={basePrice} 
              duration={duration} 
              pricingId={selectedPricingTier}
              autoRenew={autoRenew}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Payment Summary */}
      <div className="mt-8">
        <PaymentSummary 
          basePrice={basePrice}
          duration={duration}
          autoRenew={autoRenew}
          originalPrice={originalPrice}
          finalPrice={finalPrice}
          discountPercentage={discountPercentage}
          onProceedToPayment={handleProceedToPayment}
          isFreePlan={isFreePlan}
        />
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrevStep}>
          {t('Back', 'Quay lại')}
        </Button>
      </div>
      
      {/* Payment Modal */}
      <PaymentConfirmationModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onConfirmPayment={handlePaymentConfirmation}
        amount={finalPrice}
        options={pricingOptions}
        originalPrice={originalPrice}
        discountPercentage={discountPercentage}
      />
    </div>
  );
};

export default ReviewAndPaymentSection;
