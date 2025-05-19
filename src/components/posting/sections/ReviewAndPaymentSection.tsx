
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';
import { JobPostPreview } from '@/components/posting/job/JobPostPreview';
import JobPostOptions from '@/components/posting/job/JobPostOptions';
import { DurationSelector } from '@/components/posting/pricing/DurationSelector';
import { PaymentSummary } from '@/components/posting/PaymentSummary';
import { Separator } from '@/components/ui/separator';
import PricingCard from '@/components/posting/pricing/PricingCard';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { JobPricingTier } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';

export interface ReviewAndPaymentSectionProps {
  formData: JobFormValues | null;
  photoUploads: File[];
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  pricingOptions: PricingOptions;
  setPricingOptions: (options: PricingOptions) => void;
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
  const [priceData, setPriceData] = React.useState(() => 
    calculateJobPostPrice(pricingOptions)
  );

  // Update price data when pricing options change
  useEffect(() => {
    const newPriceData = calculateJobPostPrice(pricingOptions);
    setPriceData(newPriceData);
  }, [pricingOptions]);

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

  const handleOptionChange = (option: keyof PricingOptions, value: boolean) => {
    setPricingOptions({
      ...pricingOptions,
      [option]: value
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
            durationMonths={pricingOptions.durationMonths}
            autoRenew={pricingOptions.autoRenew || false}
          />
          
          {/* Submission button */}
          <Button 
            onClick={onSubmit}
            disabled={isSubmitting || !formData}
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
