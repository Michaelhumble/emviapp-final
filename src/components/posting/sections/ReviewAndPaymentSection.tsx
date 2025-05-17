
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
import { Award } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';

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
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [previousPlan, setPreviousPlan] = useState('');
  
  useEffect(() => {
    // Automatically set premium as default if not already selected
    if (!pricingOptions.selectedPricingTier && selectedPricing === 'standard') {
      setTimeout(() => {
        setSelectedPricing('premium');
        onPricingChange('premium');
      }, 500);
    }
  }, []);
  
  useEffect(() => {
    if (selectedPricing === 'free') {
      setIsFreePlan(true);
      // Automatically turn off auto-renew for the free plan
      setAutoRenew(false);
    } else {
      setIsFreePlan(false);
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
    // Store previous plan for potential upsell opportunity
    setPreviousPlan(selectedPricing);
    
    setSelectedPricing(pricingId);
    onPricingChange(pricingId);
    
    // When switching to a paid plan from a lower tier, show upsell modal
    if (
      (pricingId === 'premium' && (previousPlan === 'free' || previousPlan === 'standard')) ||
      (pricingId === 'gold' && previousPlan !== 'gold')
    ) {
      setTimeout(() => {
        setShowUpsellModal(true);
      }, 800);
    }
    
    // When switching to free plan, disable auto-renew
    if (pricingId === 'free') {
      setAutoRenew(false);
    }
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
  
  // Call calculateFinalPrice with only the required parameters, and receive an object as the return value
  const pricingResult = calculateFinalPrice(basePrice, selectedDuration);
  
  // Destructure the values from the pricingResult object
  const { originalPrice, finalPrice, discountPercentage } = pricingResult;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t({
        english: 'Review & Payment',
        vietnamese: 'Xem lại & Thanh toán'
      })}</h2>
      
      <PricingCards
        pricingOptions={jobPricingOptions}
        selectedPricing={selectedPricing}
        onChange={handlePricingChange}
        selectedDuration={selectedDuration}
        onDurationChange={handleDurationChange}
      />
      
      {selectedPricing !== 'free' && (
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50">
          <Label htmlFor="auto-renew" className="flex items-center gap-2">
            {t({
              english: 'Auto-renew subscription',
              vietnamese: 'Tự động gia hạn đăng ký'
            })}
            <span className="text-xs text-purple-600 font-medium">
              {autoRenew ? 'Your listing will never expire' : 'Recommended to ensure continuous visibility'}
            </span>
          </Label>
          <Switch 
            id="auto-renew" 
            checked={autoRenew} 
            onCheckedChange={handleAutoRenewChange} 
          />
        </div>
      )}
      
      {selectedPricing === 'free' && (
        <div className="text-sm text-gray-500 italic p-4 border border-gray-200 rounded-lg bg-gray-50">
          {t({
            english: 'This plan does not renew. First-time post only.',
            vietnamese: 'Gói này không tự động gia hạn. Chỉ áp dụng cho đăng tin lần đầu.'
          })}
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
      
      {/* Upsell Modal */}
      <Dialog open={showUpsellModal} onOpenChange={setShowUpsellModal}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle className="flex items-center gap-2 text-center">
            <Award className="h-5 w-5 text-yellow-500" />
            Want a free upgrade?
          </DialogTitle>
          <DialogDescription className="text-center">
            Share your listing on Facebook and get boosted for 7 days!
          </DialogDescription>
          
          <div className="flex flex-col gap-4 py-4">
            <p className="text-sm text-center text-gray-600">
              Get your job in front of more qualified candidates by sharing it on social media.
            </p>
            
            <div className="flex justify-center gap-3">
              <button 
                onClick={() => setShowUpsellModal(false)} 
                className="px-4 py-2 rounded-md bg-blue-600 text-white flex items-center gap-2"
              >
                Share & Get Boosted
              </button>
              <button 
                onClick={() => setShowUpsellModal(false)}
                className="px-4 py-2 rounded-md border border-gray-300"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewAndPaymentSection;
