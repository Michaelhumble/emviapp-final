import React, { useState, useEffect } from 'react';
import PricingCards from '@/components/posting/PricingCards';
import { jobPricingOptions, calculateFinalPrice } from '@/utils/posting/jobPricing';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import PaymentSummary from '@/components/posting/PaymentSummary';
import { useTranslation } from '@/hooks/useTranslation';
import { format, addDays } from 'date-fns';
import { Job } from '@/types/job';
import { PricingOptions } from '@/utils/posting/types';
import PricingDisplay from '@/components/posting/PricingDisplay';

export interface ReviewAndPaymentSectionProps {
  postType: 'job' | 'salon' | 'booth' | 'supply';
  pricingOptions: PricingOptions;
  onPricingChange: (pricingTier: string) => void;
  onUpdatePricing: (options: Partial<PricingOptions>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  jobData?: Partial<Job>; // Add this prop to fix the JobPost.tsx error
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  postType,
  pricingOptions,
  onPricingChange,
  onUpdatePricing,
  onNextStep,
  onPrevStep,
  jobData
}) => {
  const { t } = useTranslation();
  const [selectedPricing, setSelectedPricing] = useState(pricingOptions.selectedPricingTier || 'standard');
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [autoRenew, setAutoRenew] = useState(pricingOptions.autoRenew || false);
  const [isFreePlan, setIsFreePlan] = useState(false);
  
  useEffect(() => {
    if (selectedPricing === 'free') {
      setIsFreePlan(true);
    } else {
      setIsFreePlan(false);
    }
  }, [selectedPricing]);

  useEffect(() => {
    onUpdatePricing({ 
      selectedPricingTier: selectedPricing,
      autoRenew: autoRenew
    });
  }, [selectedPricing, autoRenew, onUpdatePricing]);
  
  const handlePricingChange = (pricingId: string) => {
    setSelectedPricing(pricingId);
    onPricingChange(pricingId);
  };
  
  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
  };
  
  const handleAutoRenewChange = (checked: boolean) => {
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
      
      <PaymentSummary
        basePrice={basePrice}
        duration={selectedDuration}
        autoRenew={autoRenew}
        originalPrice={originalPrice}
        finalPrice={finalPrice}
        discountPercentage={discountPercentage}
        onProceedToPayment={onNextStep}
        isFreePlan={isFreePlan}
      />
      
      <PricingDisplay 
        basePrice={basePrice}
        duration={selectedDuration}
        autoRenew={autoRenew}
        originalPrice={originalPrice}
        finalPrice={finalPrice}
        discountPercentage={discountPercentage}
      />
    </div>
  );
};

export default ReviewAndPaymentSection;
