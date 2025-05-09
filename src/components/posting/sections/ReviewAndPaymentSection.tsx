
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PricingOptions, PostType } from '@/utils/posting/types';
import { Card } from '@/components/ui/card';
import PricingDisplay from '../PricingDisplay';
import PricingCards from '../PricingCards';
import PaymentConfirmationModal from '../PaymentConfirmationModal';
import { useTranslation } from '@/hooks/useTranslation';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ReviewAndPaymentSectionProps {
  postType: PostType;
  formData: any;
  onNextStep: () => void;
  onPrevStep: () => void;
  isFirstPost?: boolean;
  pricingOptions: PricingOptions;
  onPricingChange: (pricingTier: string) => void;
}

const ReviewAndPaymentSection = ({
  postType,
  formData,
  onNextStep,
  onPrevStep,
  isFirstPost = false,
  pricingOptions,
  onPricingChange
}: ReviewAndPaymentSectionProps) => {
  const { t } = useTranslation();
  const [selectedPricing, setSelectedPricing] = useState(pricingOptions.selectedPricingTier || 'standard');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [autoRenew, setAutoRenew] = useState(false);
  
  // Check if the selected pricing is the free tier
  const isFreeTier = selectedPricing === 'free';
  
  // Update parent component when pricing changes
  useEffect(() => {
    onPricingChange(selectedPricing);
  }, [selectedPricing, onPricingChange]);

  // Ensure Diamond plan always uses 12 months
  useEffect(() => {
    if (selectedPricing === 'diamond' && selectedDuration !== 12) {
      setSelectedDuration(12);
    }
  }, [selectedPricing]);

  const handlePricingChange = (pricingId: string) => {
    setSelectedPricing(pricingId);
    
    // If switching to Diamond plan, force 12 month duration
    if (pricingId === 'diamond') {
      setSelectedDuration(12);
    }
  };
  
  const handleDurationChange = (duration: number) => {
    // Don't allow changing Diamond plan duration from 12 months
    if (selectedPricing === 'diamond' && duration !== 12) {
      return;
    }
    setSelectedDuration(duration);
  };
  
  const handleContinue = () => {
    setShowPaymentModal(true);
  };
  
  const handlePaymentSuccess = () => {
    // Close payment modal and proceed to next step
    setShowPaymentModal(false);
    onNextStep();
  };
  
  // Find the selected pricing option
  const selectedPricingOption = jobPricingOptions.find(option => option.id === selectedPricing);
  const basePrice = selectedPricingOption ? selectedPricingOption.price : 0;
  
  // Calculate duration-based discount
  let discountPercentage = 0;
  if (selectedPricing !== 'diamond') {
    if (selectedDuration === 3) discountPercentage = 10;
    else if (selectedDuration === 6) discountPercentage = 20;
    else if (selectedDuration === 12) discountPercentage = 30;
  }
  
  // Calculate original price before discount (for displaying strikethrough)
  const originalPrice = selectedPricing === 'diamond' ? null : basePrice * selectedDuration;
  
  // Diamond plan price is always fixed regardless of duration
  const actualPrice = selectedPricing === 'diamond' 
    ? basePrice 
    : discountPercentage > 0 
      ? basePrice * selectedDuration * (1 - discountPercentage/100) 
      : basePrice * selectedDuration;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{t('Choose Listing Type', 'Chọn Loại Tin')}</h2>
        <p className="text-muted-foreground">{t('Select how you want your post to appear', 'Chọn cách hiển thị tin của bạn')}</p>
      </div>

      <Card className="p-6">
        <div className="space-y-6">
          <PricingCards 
            pricingOptions={jobPricingOptions}
            selectedPricing={selectedPricing}
            onChange={handlePricingChange}
            selectedDuration={selectedDuration}
            onDurationChange={handleDurationChange}
          />
          
          <div className="border-t border-gray-200 pt-6">
            <PricingDisplay 
              postType={postType}
              price={basePrice}
              options={{
                ...pricingOptions,
                isFirstPost
              }}
              originalPrice={originalPrice || undefined}
              discountPercentage={discountPercentage}
              duration={selectedDuration}
              pricingId={selectedPricing}
            />
            
            {!isFreeTier && (
              <div className="mt-5 flex items-center justify-between rounded-lg bg-gray-50 p-3 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">
                    {t('Enable Auto-Renew and Save 20%', 'Bật Tự động gia hạn và Tiết kiệm 20%')}
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <Info size={16} className="text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-sm">
                          {t(
                            'You can cancel anytime. We\'ll remind you before billing.',
                            'Bạn có thể hủy bất kỳ lúc nào. Chúng tôi sẽ nhắc bạn trước khi tính phí.'
                          )}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Switch
                  checked={autoRenew}
                  onCheckedChange={setAutoRenew}
                  aria-label={t('Auto-renew subscription', 'Tự động gia hạn đăng ký')}
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={onPrevStep}
            >
              {t('Back', 'Quay lại')}
            </Button>
            
            <Button onClick={handleContinue}>
              {t('Continue', 'Tiếp tục')}
            </Button>
          </div>
        </div>
      </Card>
      
      <PaymentConfirmationModal 
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        postType={postType}
        price={basePrice}
        options={{
          ...pricingOptions,
          isFirstPost,
          selectedPricingTier: selectedPricing,
          autoRenew: autoRenew
        }}
        originalPrice={originalPrice || undefined}
        discountPercentage={discountPercentage}
        duration={selectedDuration}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default ReviewAndPaymentSection;
