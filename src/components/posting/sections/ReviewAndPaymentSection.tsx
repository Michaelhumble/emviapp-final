
import React, { useState, useEffect } from 'react';
import PricingCards from '@/components/posting/PricingCards';
import { jobPricingOptions, calculateJobPostPrice, getStripeProductId, validatePricingOptions } from '@/utils/posting/jobPricing';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import PaymentSummary from '@/components/posting/PaymentSummary';
import { useTranslation } from '@/hooks/useTranslation';
import { format, addDays } from 'date-fns';
import { Job } from '@/types/job';
import { PricingOptions } from '@/utils/posting/types';
import PricingDisplay from '@/components/posting/PricingDisplay';
import { toast } from 'sonner';

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
  const [isFreePlan, setIsFreePlan] = useState(false);
  const [pricingError, setPricingError] = useState<string | null>(null);
  
  // Set free plan state based on selected pricing tier
  useEffect(() => {
    if (selectedPricing === 'free') {
      setIsFreePlan(true);
      // Automatically turn off auto-renew for the free plan
      setAutoRenew(false);
    } else {
      setIsFreePlan(false);
    }
  }, [selectedPricing]);

  // Update parent component's pricing options when local state changes
  useEffect(() => {
    onUpdatePricing({ 
      selectedPricingTier: selectedPricing,
      autoRenew: autoRenew,
      durationMonths: selectedDuration,
      isFirstPost: isFirstPost
    });
  }, [selectedPricing, autoRenew, selectedDuration, isFirstPost, onUpdatePricing]);
  
  // Handle pricing tier selection change
  const handlePricingChange = (pricingId: string) => {
    setSelectedPricing(pricingId);
    onPricingChange(pricingId);
    setPricingError(null);
    
    // When switching to free plan, disable auto-renew
    if (pricingId === 'free') {
      setAutoRenew(false);
    }
  };
  
  // Handle duration selection change
  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
    setPricingError(null);
  };
  
  // Handle auto-renew toggle
  const handleAutoRenewChange = (checked: boolean) => {
    setAutoRenew(checked);
    onUpdatePricing({ autoRenew: checked });
    setPricingError(null);
  };

  // Calculate pricing using the pricing utility function
  const pricingResult = calculateJobPostPrice({
    selectedPricingTier: selectedPricing,
    durationMonths: selectedDuration,
    autoRenew: autoRenew,
    isFirstPost: isFirstPost
  });

  // Set default values in case the pricing calculation returns null
  const selectedPricingOption = jobPricingOptions.find(option => option.id === selectedPricing);
  const basePrice = selectedPricingOption ? selectedPricingOption.price : 0;
  
  // Use the pricing result if available, otherwise use defaults
  const { originalPrice, finalPrice, discountPercentage } = pricingResult || {
    originalPrice: basePrice,
    finalPrice: basePrice,
    discountPercentage: 0
  };

  // Validate the Stripe product ID is available for the selected configuration
  useEffect(() => {
    // Skip validation for free plan
    if (selectedPricing === 'free') {
      setPricingError(null);
      return;
    }
    
    // Validate the configuration
    if (!validatePricingOptions({
      selectedPricingTier: selectedPricing,
      durationMonths: selectedDuration,
      autoRenew
    })) {
      setPricingError(t(
        'Invalid pricing configuration. Please select a valid plan and duration.',
        'Cấu hình giá không hợp lệ. Vui lòng chọn gói và thời hạn hợp lệ.'
      ));
      return;
    }
    
    // Check if a Stripe product ID is available for this configuration
    const stripeProductId = getStripeProductId(selectedPricing, selectedDuration, autoRenew);
    if (!stripeProductId) {
      setPricingError(t(
        'This pricing configuration is not available. Please select a different option.',
        'Cấu hình giá này không khả dụng. Vui lòng chọn một tùy chọn khác.'
      ));
    } else {
      setPricingError(null);
    }
  }, [selectedPricing, selectedDuration, autoRenew, t]);

  // Determine if free plan is eligible (only for first-time posters)
  const isFreePlanEligible = isFirstPost === true;
  
  // Disable free plan if not eligible
  useEffect(() => {
    if (selectedPricing === 'free' && !isFreePlanEligible) {
      setSelectedPricing('standard');
      onPricingChange('standard');
      toast.info(t(
        'Free plan is only available for first-time posters.',
        'Gói miễn phí chỉ khả dụng cho người đăng tin lần đầu.'
      ));
    }
  }, [isFreePlanEligible, selectedPricing, onPricingChange, t]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('Review & Payment', 'Xem lại & Thanh toán')}</h2>
      
      <PricingCards
        pricingOptions={jobPricingOptions.filter(option => 
          // Only show free plan if eligible
          option.id !== 'free' || isFreePlanEligible
        )}
        selectedPricing={selectedPricing}
        onChange={handlePricingChange}
        selectedDuration={selectedDuration}
        onDurationChange={handleDurationChange}
      />
      
      {selectedPricing !== 'free' && (
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-renew">{t('Auto-renew subscription', 'Tự động gia hạn đăng ký')}</Label>
          <Switch 
            id="auto-renew" 
            checked={autoRenew} 
            onCheckedChange={handleAutoRenewChange} 
          />
        </div>
      )}
      
      {selectedPricing === 'free' && (
        <div className="text-sm text-gray-500 italic">
          {t('This plan does not renew. First-time post only.', 'Gói này không tự động gia hạn. Chỉ áp dụng cho đăng tin lần đầu.')}
        </div>
      )}
      
      {pricingError && (
        <div className="text-sm text-red-500 p-2 border border-red-200 rounded-md bg-red-50">
          {pricingError}
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
        isDisabled={!!pricingError || (selectedPricing === 'free' && !isFreePlanEligible)}
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
