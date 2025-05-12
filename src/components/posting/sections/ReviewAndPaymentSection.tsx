
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
import AutoRenewSuggestionCard from '@/components/posting/AutoRenewSuggestionCard';
import { Info } from 'lucide-react';

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
  const [showUpsellCard, setShowUpsellCard] = useState(false);
  
  useEffect(() => {
    if (selectedPricing === 'free') {
      setIsFreePlan(true);
      // Force 1 month duration for free plan and turn off auto-renew
      setSelectedDuration(1);
      setAutoRenew(false);
      setShowUpsellCard(false);
    } else {
      setIsFreePlan(false);
      // Show upsell card if standard or premium is selected (but not gold)
      setShowUpsellCard(selectedPricing === 'standard' || selectedPricing === 'premium');
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
    
    // When switching to free plan, disable auto-renew and set duration to 1 month
    if (pricingId === 'free') {
      setAutoRenew(false);
      setSelectedDuration(1);
    }
  };
  
  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
  };
  
  const handleAutoRenewChange = (checked: boolean) => {
    setAutoRenew(checked);
    onUpdatePricing({ autoRenew: checked });
  };

  const handleUpgradeClick = () => {
    setSelectedPricing('gold');
    onPricingChange('gold');
    setShowUpsellCard(false);
  };

  const selectedPricingOption = jobPricingOptions.find(option => option.id === selectedPricing);
  const basePrice = selectedPricingOption ? selectedPricingOption.price : 0;
  
  // Call calculateFinalPrice with only the required parameters, and receive an object as the return value
  const pricingResult = calculateFinalPrice(basePrice, selectedDuration);
  
  // Destructure the values from the pricingResult object
  const { originalPrice, finalPrice, discountPercentage } = pricingResult;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('Review & Payment', 'Xem lại & Thanh toán')}</h2>
      
      <div className="bg-gradient-to-b from-white to-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm space-y-8">
        <PricingCards
          pricingOptions={jobPricingOptions}
          selectedPricing={selectedPricing}
          onChange={handlePricingChange}
          selectedDuration={selectedDuration}
          onDurationChange={handleDurationChange}
        />
        
        {selectedPricing !== 'free' && (
          <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <Label htmlFor="auto-renew" className="flex items-center gap-2 cursor-pointer">
              <Info className="h-4 w-4 text-blue-500" />
              {t('Auto-renew subscription', 'Tự động gia hạn đăng ký')}
            </Label>
            <Switch 
              id="auto-renew" 
              checked={autoRenew} 
              onCheckedChange={handleAutoRenewChange} 
              className="data-[state=checked]:bg-purple-600"
            />
          </div>
        )}
        
        {selectedPricing === 'free' && (
          <div className="text-sm text-gray-600 italic bg-gray-50 p-4 rounded-md flex items-start border border-gray-200">
            <Info className="h-5 w-5 mr-2 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              {t('Auto-renew not available for Free listings. This plan offers 30 days of visibility with standard placement.', 
                'Tự động gia hạn không khả dụng cho đăng tin miễn phí. Gói này cung cấp 30 ngày hiển thị với vị trí tiêu chuẩn.')}
            </div>
          </div>
        )}
        
        {/* Auto-Renew Suggestion Banner */}
        {selectedPricing !== 'free' && !autoRenew && (
          <AutoRenewSuggestionCard />
        )}

        {/* Smart Upsell Card */}
        {showUpsellCard && (
          <AutoRenewSuggestionCard onUpgrade={handleUpgradeClick} selectedPricing={selectedPricing} />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="order-2 md:order-1">
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
        
        <div className="order-1 md:order-2">
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
        </div>
      </div>
    </div>
  );
};

export default ReviewAndPaymentSection;
