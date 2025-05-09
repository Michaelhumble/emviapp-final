
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { calculateFinalPrice } from '@/utils/posting/jobPricing';
import { PostType, PricingOptions } from '@/utils/posting/types';
import { t } from '@/hooks/translationUtils';
import PricingCards from '../PricingCards';
import PricingDisplay from '../PricingDisplay';
import PaymentConfirmationModal from '../PaymentConfirmationModal';
import { useTranslation } from '@/hooks/useTranslation';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface ReviewAndPaymentSectionProps {
  postType: PostType;
  pricingOptions: PricingOptions;
  onUpdatePricing: (options: PricingOptions) => void;
  onSubmitListing: () => void;
  isFirstPost: boolean;
  initialPrice?: number;
  originalPrice?: number;
  finalPrice?: number;
  discountPercentage?: number;
}

const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  postType,
  pricingOptions,
  onUpdatePricing,
  onSubmitListing,
  isFirstPost,
  initialPrice,
  originalPrice,
  finalPrice,
  discountPercentage
}) => {
  const { t } = useTranslation();
  const [selectedPricing, setSelectedPricing] = useState(pricingOptions.selectedPricingTier || 'standard');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(1);
  const [autoRenew, setAutoRenew] = useState(false);
  
  // Check if the selected pricing is the free tier
  const isFreeTier = selectedPricing === 'free';
  
  // Update parent component when pricing changes
  useEffect(() => {
    if (selectedPricing) {
      onUpdatePricing({
        ...pricingOptions,
        selectedPricingTier: selectedPricing
      });
    }
  }, [selectedPricing]);

  // Get the base price of the selected pricing tier
  const getPricingOption = () => {
    return jobPricingOptions.find(option => option.id === selectedPricing);
  };

  // Get the base price
  const getBasePrice = () => {
    const option = getPricingOption();
    return option ? option.price : 0;
  };
  
  // Handle pricing selection
  const handlePricingChange = (pricingId: string) => {
    setSelectedPricing(pricingId);
    
    // Reset duration to 1 for non-diamond plans
    if (pricingId !== 'diamond') {
      setSelectedDuration(1);
    } else {
      setSelectedDuration(12); // Force 12 months for Diamond plan
    }
  };

  // Handle duration selection
  const handleDurationChange = (duration: number) => {
    setSelectedDuration(duration);
  };

  // Calculate the final price based on selected pricing and duration
  const calculateTotalPrice = () => {
    const basePrice = getBasePrice();
    
    if (selectedPricing === 'diamond') {
      return basePrice; // Diamond plan has fixed price
    }
    
    const { finalPrice } = calculateFinalPrice(
      basePrice, 
      selectedDuration,
      selectedPricing,
      autoRenew
    );
    
    return finalPrice;
  };

  // Handle submit/next
  const handleSubmit = () => {
    if (selectedPricing === 'free') {
      onSubmitListing();
    } else {
      setShowPaymentModal(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          {t('Select Listing Type', 'Chọn Loại Đăng Tin')}
        </h2>
        <p className="text-gray-500 mb-4">
          {t('Choose how you want to promote your listing', 'Chọn cách bạn muốn quảng bá tin đăng')}
        </p>
        
        <PricingCards 
          pricingOptions={jobPricingOptions}
          selectedPricing={selectedPricing}
          onChange={handlePricingChange}
          selectedDuration={selectedDuration}
          onDurationChange={handleDurationChange}
        />
      </div>
      
      <div className="border-t border-gray-200 py-5">
        <h2 className="text-xl font-semibold mb-4">
          {t('Payment Summary', 'Tổng kết Thanh toán')}
        </h2>
        
        <div className="bg-gray-50 rounded-lg p-5">
          <div className="flex justify-between items-center pb-4 border-b border-gray-200">
            <div>
              <p className="font-medium">
                {getPricingOption()?.name || t('Standard Listing', 'Đăng tin Tiêu chuẩn')}
              </p>
              <p className="text-sm text-gray-500">
                {t('Duration:', 'Thời hạn:')} {selectedDuration} {selectedDuration === 1 ? t('month', 'tháng') : t('months', 'tháng')}
              </p>
            </div>
            
            <PricingDisplay 
              basePrice={getBasePrice()}
              duration={selectedDuration}
              pricingId={selectedPricing}
              autoRenew={autoRenew}
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
            <p className="font-medium">
              {t('Total', 'Tổng cộng')}
            </p>
            <div className="text-right">
              <p className="text-xl font-bold">
                ${calculateTotalPrice().toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSubmit}>
          {selectedPricing === 'free' 
            ? t('Submit Listing', 'Đăng tin') 
            : t('Proceed to Payment', 'Tiến hành thanh toán')}
        </Button>
      </div>

      <PaymentConfirmationModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onConfirmPayment={onSubmitListing}
        amount={calculateTotalPrice()}
        options={{
          ...pricingOptions,
          isFirstPost,
          selectedPricingTier: selectedPricing,
          autoRenew: autoRenew
        }}
        originalPrice={originalPrice || undefined}
        discountPercentage={discountPercentage}
      />
    </div>
  );
};

export default ReviewAndPaymentSection;
