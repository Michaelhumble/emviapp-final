
import React, { useState, useEffect } from 'react';
import PricingCards from '@/components/posting/PricingCards';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import PaymentSummary from '@/components/posting/PaymentSummary';
import { useTranslation } from '@/hooks/useTranslation';
import { Job } from '@/types/job';
import { PriceDetails, pricingTiers } from '@/types/pricing';
import PricingDisplay from '@/components/posting/PricingDisplay';

export interface ReviewAndPaymentSectionProps {
  postType: 'job' | 'salon' | 'booth' | 'supply';
  onPricingChange: (pricingTier: string) => void;
  onUpdatePricing: (options: Partial<{
    selectedPricingTier: string;
    autoRenew: boolean;
    durationMonths: number;
  }>) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  jobData?: Partial<Job>;
  isFirstPost?: boolean;
  isSubmitting?: boolean;
  selectedPricingTier: string;
  autoRenew: boolean;
  durationMonths: number;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  postType,
  onPricingChange,
  onUpdatePricing,
  onNextStep,
  onPrevStep,
  jobData,
  isFirstPost,
  isSubmitting = false,
  selectedPricingTier,
  autoRenew,
  durationMonths
}) => {
  const { t } = useTranslation();
  const [isFreePlan, setIsFreePlan] = useState(false);
  
  useEffect(() => {
    if (selectedPricingTier === 'free') {
      setIsFreePlan(true);
      // Automatically turn off auto-renew for the free plan
      onUpdatePricing({ autoRenew: false });
    } else {
      setIsFreePlan(false);
    }
  }, [selectedPricingTier, onUpdatePricing]);
  
  const handlePricingChange = (pricingId: string) => {
    onPricingChange(pricingId);
    
    // When switching to free plan, disable auto-renew
    if (pricingId === 'free') {
      onUpdatePricing({ autoRenew: false });
    }
  };
  
  const handleDurationChange = (duration: number) => {
    onUpdatePricing({ durationMonths: duration });
  };
  
  const handleAutoRenewChange = (checked: boolean) => {
    onUpdatePricing({ autoRenew: checked });
  };

  // Get the selected pricing tier details
  const priceDetails: PriceDetails = pricingTiers[selectedPricingTier] || pricingTiers.standard;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('Review & Payment', 'Xem lại & Thanh toán')}</h2>
      
      <PricingCards
        pricingOptions={Object.values(pricingTiers)}
        selectedPricing={selectedPricingTier}
        onChange={handlePricingChange}
        selectedDuration={durationMonths}
        onDurationChange={handleDurationChange}
      />
      
      {selectedPricingTier !== 'free' && (
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-renew">{t('Auto-renew subscription', 'Tự động gia hạn đăng ký')}</Label>
          <Switch 
            id="auto-renew" 
            checked={autoRenew} 
            onCheckedChange={handleAutoRenewChange} 
          />
        </div>
      )}
      
      {selectedPricingTier === 'free' && (
        <div className="text-sm text-gray-500 italic">
          {t('This plan does not renew. First-time post only.', 'Gói này không tự động gia hạn. Chỉ áp dụng cho đăng tin lần đầu.')}
        </div>
      )}
      
      <PaymentSummary
        priceDetails={priceDetails}
        duration={durationMonths}
        autoRenew={autoRenew}
        onProceedToPayment={onNextStep}
        isFreePlan={isFreePlan}
        isSubmitting={isSubmitting}
      />
      
      <PricingDisplay 
        priceDetails={priceDetails}
        duration={durationMonths}
        autoRenew={autoRenew}
      />
    </div>
  );
};

export default ReviewAndPaymentSection;
