
import React, { useState, useEffect } from 'react';
import PricingCards from '@/components/posting/PricingCards';
import { jobPricingOptions, calculateFinalPrice } from '@/utils/posting/jobPricing';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import PaymentSummary from '@/components/posting/PaymentSummary';
import { useTranslation } from '@/hooks/useTranslation';
import { Job } from '@/types/job';
import { PricingOptions } from '@/utils/posting/types';
import PricingDisplay from '@/components/posting/PricingDisplay';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export interface ReviewAndPaymentSectionProps {
  postType: 'job' | 'salon' | 'booth' | 'supply';
  pricingOptions: PricingOptions;
  onPricingChange: (pricingTier: string) => void;
  onUpdatePricing: (options: Partial<PricingOptions>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  jobData?: Partial<Job>;
  isFirstPost?: boolean;
  isSubmitting?: boolean;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  postType,
  pricingOptions,
  onPricingChange,
  onUpdatePricing,
  onNextStep,
  onPrevStep,
  jobData,
  isFirstPost,
  isSubmitting = false
}) => {
  const { t } = useTranslation();
  const [selectedPricing, setSelectedPricing] = useState(pricingOptions.selectedPricingTier || 'standard');
  const [selectedDuration, setSelectedDuration] = useState(pricingOptions.durationMonths || 1);
  const [autoRenew, setAutoRenew] = useState(pricingOptions.autoRenew || false);
  const [isFreePlan, setIsFreePlan] = useState(selectedPricing === 'free');
  const [showDiamondWarning, setShowDiamondWarning] = useState(false);
  
  useEffect(() => {
    if (selectedPricing === 'free') {
      setIsFreePlan(true);
      // Automatically turn off auto-renew for the free plan
      setAutoRenew(false);
    } else {
      setIsFreePlan(false);
    }
    
    // Show/hide diamond warning based on selected pricing and duration
    setShowDiamondWarning(selectedPricing === 'diamond' && selectedDuration !== 12);
    
  }, [selectedPricing, selectedDuration]);

  // For Diamond plan, force 12-month duration if not already selected
  useEffect(() => {
    if (selectedPricing === 'diamond' && selectedDuration !== 12) {
      setSelectedDuration(12);
    }
  }, [selectedPricing]);

  useEffect(() => {
    onUpdatePricing({ 
      selectedPricingTier: selectedPricing,
      autoRenew: autoRenew,
      durationMonths: selectedDuration
    });
  }, [selectedPricing, autoRenew, selectedDuration, onUpdatePricing]);
  
  const handlePricingChange = (pricingId: string) => {
    setSelectedPricing(pricingId);
    onPricingChange(pricingId);
    
    // When switching to free plan, disable auto-renew
    if (pricingId === 'free') {
      setAutoRenew(false);
    }
    
    // For Diamond plan, force 12 month duration and allow auto-renew
    if (pricingId === 'diamond') {
      setSelectedDuration(12);
    }
  };
  
  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
  };
  
  const handleAutoRenewChange = (checked: boolean) => {
    // Only Diamond plan can have auto-renew and must be 12 months
    if (selectedPricing === 'diamond' && selectedDuration !== 12) {
      setSelectedDuration(12);
    }
    
    setAutoRenew(checked);
    onUpdatePricing({ autoRenew: checked });
  };

  const selectedPricingOption = jobPricingOptions.find(option => option.id === selectedPricing);
  const basePrice = selectedPricingOption ? selectedPricingOption.price : 0;
  
  const { originalPrice, finalPrice, discountPercentage } = calculateFinalPrice(
    basePrice,
    selectedDuration,
    selectedPricing,
    autoRenew
  );

  // Only show auto-renew toggle for Diamond plan with 12-month duration
  const showAutoRenew = selectedPricing === 'diamond' && selectedDuration === 12;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('Review & Payment', 'Xem lại & Thanh toán')}</h2>
      
      <PricingCards
        pricingOptions={jobPricingOptions}
        selectedPricing={selectedPricing}
        onChange={handlePricingChange}
        selectedDuration={selectedDuration}
        onDurationChange={handleDurationChange}
      />
      
      {showDiamondWarning && (
        <Alert variant="warning" className="bg-amber-50 border-amber-200">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription>
            {t(
              'Diamond Featured listings are only available with 12-month duration.',
              'Các tin đăng Kim Cương Nổi Bật chỉ khả dụng với thời hạn 12 tháng.'
            )}
          </AlertDescription>
        </Alert>
      )}
      
      {showAutoRenew && (
        <div className="flex items-center justify-between bg-blue-50 p-3 rounded-lg border border-blue-100">
          <Label htmlFor="auto-renew" className="font-medium text-blue-800">
            {t('Auto-renew subscription yearly - lock in this price!', 'Tự động gia hạn đăng ký hàng năm - khóa mức giá này!')}
            <p className="text-sm font-normal mt-1">
              {t('Keep this Diamond price locked in. Cancel anytime.', 'Giữ giá Kim Cương này cố định. Hủy bất kỳ lúc nào.')}
            </p>
          </Label>
          <Switch 
            id="auto-renew" 
            checked={autoRenew} 
            onCheckedChange={handleAutoRenewChange} 
            className="data-[state=checked]:bg-blue-600"
          />
        </div>
      )}
      
      {selectedPricing === 'free' && (
        <div className="text-sm text-gray-500 italic">
          {t('This plan does not renew. First-time post only.', 'Gói này không tự động gia hạn. Chỉ áp dụng cho đăng tin lần đầu.')}
        </div>
      )}
      
      <PaymentSummary
        basePrice={basePrice}
        duration={selectedDuration}
        autoRenew={autoRenew}
        originalPrice={originalPrice}
        finalPrice={finalPrice}
        discountPercentage={discountPercentage}
        onProceedToPayment={onNextStep}
        isFreePlan={isFreePlan}
        isSubmitting={isSubmitting}
      />
      
      <PricingDisplay 
        basePrice={basePrice}
        duration={selectedDuration}
        pricingId={selectedPricing}
        autoRenew={autoRenew}
        originalPrice={originalPrice}
        finalPrice={finalPrice}
        discountPercentage={discountPercentage}
      />
    </div>
  );
};

export default ReviewAndPaymentSection;
