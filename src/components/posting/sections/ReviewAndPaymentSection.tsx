
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';
import { JobPostPreview } from '@/components/posting/job/JobPostPreview';
import JobPostOptions from '@/components/posting/job/JobPostOptions';
import { DurationSelector } from '@/components/posting/pricing/DurationSelector';
import { PaymentSummary } from '@/components/posting/PaymentSummary';
import { Separator } from '@/components/ui/separator';
import PricingCard from '@/components/posting/pricing/PricingCard';
import { jobPricingOptions } from '@/utils/posting/jobPricing';
import { useTranslation } from '@/hooks/useTranslation';

interface ReviewAndPaymentSectionProps {
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

  // Format price for display - ensure we never show $0 for paid plans
  const formattedPrice = isFreePost 
    ? "Free" 
    : `$${priceData.finalPrice.toFixed(2)}`;

  // Determine button text - if free plan, show "Start Free Trial", otherwise show "Pay $X & Post Job"
  const buttonText = isFreePost 
    ? t({english: "Start Free Trial", vietnamese: "Bắt đầu dùng thử"})
    : t({
        english: `Pay ${formattedPrice} & Post Job`,
        vietnamese: `Thanh toán ${formattedPrice} & Đăng tin`
      });

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
          <JobPostPreview 
            jobData={formData} 
            photoUploads={photoUploads} 
            onBack={onBack} 
            pricingTier={pricingOptions.selectedPricingTier}
          />
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
            selectedPricingTier={pricingOptions.selectedPricingTier}
          />
          
          {/* Free plan messaging */}
          {isFreePost && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800">
              <p className="font-medium">{t({
                english: "Credit card required for free trial. Cancel anytime, no risk.",
                vietnamese: "Yêu cầu thẻ tín dụng để dùng thử miễn phí. Hủy bất kỳ lúc nào, không có rủi ro."
              })}</p>
              <p className="mt-1">{t({
                english: "After your 30-day free trial, plan will automatically convert to paid unless canceled.",
                vietnamese: "Sau 30 ngày dùng thử miễn phí, gói sẽ tự động chuyển sang trả phí trừ khi bạn hủy."
              })}</p>
            </div>
          )}
          
          {/* Submission button */}
          <Button 
            onClick={onSubmit}
            disabled={isSubmitting || !formData}
            className="w-full py-6 text-lg shadow-md sticky bottom-4 mt-8"
          >
            {isSubmitting ? (
              <span>{t({english: "Processing...", vietnamese: "Đang xử lý..."})}</span>
            ) : (
              <span>{buttonText}</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
