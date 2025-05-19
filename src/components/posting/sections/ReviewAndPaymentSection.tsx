
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { JobPostPreview } from '@/components/posting/job/JobPostPreview';
import JobPostOptions from '@/components/posting/job/JobPostOptions';
import { DurationSelector } from '@/components/posting/pricing/DurationSelector';
import { PaymentSummary } from '@/components/posting/PaymentSummary';
import { Separator } from '@/components/ui/separator';
import PricingCard from '@/components/posting/pricing/PricingCard';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { JobPricingTier } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import { usePricing } from '@/context/pricing/PricingProvider';

export interface ReviewAndPaymentSectionProps {
  formData: JobFormValues | null;
  photoUploads: File[];
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  formData,
  photoUploads,
  onBack,
  onSubmit,
  isSubmitting
}) => {
  const { t } = useTranslation();
  const { pricingOptions, setPricingOptions, priceData } = usePricing();

  const handleDurationChange = (months: number) => {
    setPricingOptions({
      ...pricingOptions,
      durationMonths: months
    });
  };

  const handleTierChange = (tier: JobPricingTier) => {
    setPricingOptions({
      ...pricingOptions,
      selectedPricingTier: tier
    });
  };

  const selectedTierOption = jobPricingOptions.find(option => 
    option.tier === pricingOptions.selectedPricingTier
  );

  const isDiamondPlan = pricingOptions.selectedPricingTier === 'diamond';
  const isFreePost = pricingOptions.selectedPricingTier === 'free';

  // Format price for display
  const formattedPrice = priceData.finalPrice > 0 
    ? `$${priceData.finalPrice.toFixed(2)}` 
    : "Free";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={onBack} 
          className="px-0 hover:bg-transparent hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          <span>{t({english: "Back to Edit", vietnamese: "Quay lại chỉnh sửa"})}</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Preview column - Job details and photos */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium mb-4">{t({english: "Review Your Job Post", vietnamese: "Xem xét tin của bạn"})}</h3>
          <JobPostPreview jobData={formData} photoUploads={photoUploads} onBack={onBack} />
        </div>
        
        {/* Pricing column - Plan selection, options, and payment */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium">{t({english: "Choose Your Plan", vietnamese: "Chọn gói của bạn"})}</h3>
          
          {/* Plans selection grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {jobPricingOptions
              .filter(option => !option.hidden)
              .map(option => (
                <PricingCard
                  key={option.id}
                  tier={option.tier}
                  pricingInfo={option}
                  isSelected={pricingOptions.selectedPricingTier === option.tier}
                  onSelect={() => handleTierChange(option.tier as JobPricingTier)}
                />
              ))
            }
          </div>
          
          <Separator />
          
          {/* Duration selection */}
          <DurationSelector
            durationMonths={pricingOptions.durationMonths}
            onDurationChange={handleDurationChange}
            isDiamondPlan={isDiamondPlan}
          />
          
          {/* Additional options */}
          <div className="space-y-4">
            <JobPostOptions
              options={pricingOptions}
              onOptionsChange={(updatedOptions) => setPricingOptions(updatedOptions)}
              isFirstPost={pricingOptions.isFirstPost}
            />
          </div>
          
          {/* Payment summary */}
          <PaymentSummary
            priceData={priceData}
          />
          
          {/* Validation to prevent $0 paid plans */}
          {pricingOptions.selectedPricingTier !== 'free' && priceData.finalPrice <= 0 && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
              Error: Invalid price calculation. Please try different options or contact support.
            </div>
          )}
          
          {/* Submission button */}
          <Button 
            onClick={onSubmit}
            disabled={
              isSubmitting || 
              !formData || 
              (pricingOptions.selectedPricingTier !== 'free' && priceData.finalPrice <= 0)
            }
            className="w-full py-6 text-lg shadow-md sticky bottom-4 mt-8"
          >
            {isSubmitting ? (
              <span>{t({english: "Processing...", vietnamese: "Đang xử lý..."})}</span>
            ) : (
              <span>
                {isFreePost 
                  ? t({english: "Start Free Trial", vietnamese: "Bắt đầu dùng thử"})
                  : t({
                      english: `Pay ${formattedPrice} & Post Job`,
                      vietnamese: `Thanh toán ${formattedPrice} & Đăng tin`
                    })
                }
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
