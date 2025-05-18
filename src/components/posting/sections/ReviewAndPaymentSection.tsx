import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { JobPricingTier, PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import JobSummary from '../JobSummary';
import { PricingTierSelector } from '../pricing/PricingTierSelector';
import YesLadder from '../upsell/YesLadder';
import PaymentSummary from '../PaymentSummary';
import { getDiscountPercentage, getPriceWithDiscount } from '@/utils/posting/pricing';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { Card } from '@/components/ui/card';

interface ReviewAndPaymentSectionProps {
  formData: any;
  photoUploads: File[];
  onBack: () => void;
  onSubmit: (options: PricingOptions) => void;
  isSubmitting: boolean;
  pricingOptions: PricingOptions;
  setPricingOptions: React.Dispatch<React.SetStateAction<PricingOptions>>;
}

export const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  formData,
  photoUploads,
  onBack,
  onSubmit,
  isSubmitting,
  pricingOptions,
  setPricingOptions
}) => {
  const { t } = useTranslation();
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [basePrice, setBasePrice] = useState(20);
  const [finalPrice, setFinalPrice] = useState(20);
  
  // Validate form data to make sure all required fields are present
  useEffect(() => {
    if (!formData || !formData.title || !formData.description || !formData.location || !formData.contactEmail) {
      toast.error("Please complete all required fields before proceeding to payment");
      onBack();
    }
  }, [formData, onBack]);
  
  // Calculate pricing based on selected tier and duration
  useEffect(() => {
    let price = 20;
    
    if (pricingOptions.selectedPricingTier === 'premium') {
      price = 39;
    } else if (pricingOptions.selectedPricingTier === 'gold') {
      price = 59;
    } else if (pricingOptions.selectedPricingTier === 'diamond') {
      price = 99;
    } else if (pricingOptions.selectedPricingTier === 'free') {
      price = 0;
    }
    
    setBasePrice(price);
    
    // Calculate discount based on duration
    let discount = 0;
    if (pricingOptions.durationMonths === 3) {
      discount = 10;
    } else if (pricingOptions.durationMonths === 6) {
      discount = 15;
    } else if (pricingOptions.durationMonths === 12) {
      discount = 20;
    }
    
    setDiscountPercentage(discount);
    
    // Calculate final price after discount
    if (discount > 0) {
      setFinalPrice(price * pricingOptions.durationMonths * (1 - discount / 100));
    } else {
      setFinalPrice(price * pricingOptions.durationMonths);
    }
  }, [pricingOptions.selectedPricingTier, pricingOptions.durationMonths]);
  
  const handleSelectTier = (tier: JobPricingTier) => {
    setPricingOptions(prev => ({
      ...prev,
      selectedPricingTier: tier
    }));
  };
  
  const handleDurationChange = (months: number) => {
    setPricingOptions(prev => ({
      ...prev,
      durationMonths: months
    }));
  };
  
  const handleAutoRenewChange = (autoRenew: boolean) => {
    setPricingOptions(prev => ({
      ...prev,
      autoRenew
    }));
  };
  
  const handleUpsellOptionsChange = (options: {
    expertReview: boolean;
    priorityPlacement: boolean;
    extendedReach: boolean;
  }) => {
    setPricingOptions(prev => ({
      ...prev,
      expertReview: options.expertReview,
      priorityPlacement: options.priorityPlacement,
      extendedReach: options.extendedReach
    }));
    
    // If user selects multiple upsell options, suggest premium plan
    if (Object.values(options).filter(Boolean).length >= 2 && pricingOptions.selectedPricingTier === 'standard') {
      setTimeout(() => {
        toast.info("Premium plan recommended!", {
          description: "You've selected multiple premium features. Consider upgrading to Premium for best value.",
          action: {
            label: "Upgrade",
            onClick: () => handleSelectTier('premium')
          }
        });
      }, 500);
    }
  };
  
  const suggestPremiumPlan = () => {
    if (pricingOptions.selectedPricingTier === 'standard') {
      toast.info("Premium plan recommended!", {
        description: "You've selected multiple premium features. Consider upgrading to Premium for best value.",
        action: {
          label: "Upgrade",
          onClick: () => handleSelectTier('premium')
        }
      });
    }
  };
  
  const handleSubmitPayment = () => {
    // One final validation check
    if (!formData || !formData.title || !formData.description || !formData.location || !formData.contactEmail) {
      toast.error("Please complete all required fields before proceeding to payment");
      onBack();
      return;
    }
    
    onSubmit(pricingOptions);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          {t({
            english: 'Back to Edit',
            vietnamese: 'Quay lại chỉnh sửa'
          })}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="font-playfair text-2xl font-medium mb-4">
            {t({
              english: 'Review Your Job Post',
              vietnamese: 'Xem lại bài đăng công việc của bạn'
            })}
          </h2>
          
          <JobSummary 
            jobData={formData} 
            pricingTier={pricingOptions.selectedPricingTier}
            durationMonths={pricingOptions.durationMonths}
          />
          
          <YesLadder 
            onOptionChange={handleUpsellOptionsChange}
            suggestPremium={suggestPremiumPlan}
          />
          
          <div className="border-t border-[#e8e1d5] pt-6 mt-6">
            <PricingTierSelector
              selectedTier={pricingOptions.selectedPricingTier}
              onTierSelect={handleSelectTier}
              pricingOptions={pricingOptions}
              isFirstPost={pricingOptions.isFirstPost}
            />
          </div>
          
          <div className="border-t border-[#e8e1d5] pt-6 mt-6">
            <h3 className="font-medium text-lg mb-4">
              {t({
                english: 'Duration',
                vietnamese: 'Thời hạn'
              })}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[1, 3, 6].map(months => (
                <Button
                  key={months}
                  type="button"
                  variant={pricingOptions.durationMonths === months ? "default" : "outline"}
                  className={`h-auto py-3 ${pricingOptions.durationMonths === months ? 'bg-[#f9f5ff] text-purple-700 border-purple-200 hover:bg-[#f4eeff]' : ''}`}
                  onClick={() => handleDurationChange(months)}
                >
                  <div className="text-center">
                    <div className="font-medium">
                      {months === 1 ? '1 Month' : `${months} Months`}
                    </div>
                    {months > 1 && (
                      <div className="text-xs mt-1 text-purple-700">
                        Save {months === 3 ? '10%' : months === 6 ? '15%' : ''}
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
            
            {pricingOptions.selectedPricingTier !== 'free' && (
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="auto-renew"
                  checked={pricingOptions.autoRenew}
                  onChange={(e) => handleAutoRenewChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="auto-renew" className="text-sm">
                  {t({
                    english: 'Auto-renew my plan after expiration to maintain visibility',
                    vietnamese: 'Tự động gia hạn gói của tôi sau khi hết hạn để duy trì khả năng hiển thị'
                  })}
                </label>
              </div>
            )}
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="sticky top-4">
            <PaymentSummary
              basePrice={basePrice}
              duration={pricingOptions.durationMonths}
              autoRenew={pricingOptions.autoRenew || false}
              originalPrice={basePrice * pricingOptions.durationMonths}
              finalPrice={finalPrice}
              discountPercentage={discountPercentage}
              onProceedToPayment={handleSubmitPayment}
              isFreePlan={pricingOptions.selectedPricingTier === 'free'}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
