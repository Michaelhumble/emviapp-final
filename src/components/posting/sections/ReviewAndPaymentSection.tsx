
import React from 'react';
import { Button } from '@/components/ui/button';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { JobPostPreview } from '@/components/posting/job/JobPostPreview';
import JobPostOptions from '@/components/posting/job/JobPostOptions';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { DurationSelector } from '@/components/posting/pricing/DurationSelector';
import { PaymentSummary } from '@/components/posting/PaymentSummary';
import { useTranslation } from '@/hooks/useTranslation';
import { useJobPosting } from '@/context/JobPostingContext';
import { ExtendedJobFormValues } from '@/types/jobPosting';

interface ReviewAndPaymentSectionProps {
  formData: JobFormValues | null;
  photoUploads: File[];
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  pricingOptions: PricingOptions;
  setPricingOptions: (options: PricingOptions) => void;
  useContextAPI?: boolean;
}

export const ReviewAndPaymentSection: React.FC<ReviewAndPaymentSectionProps> = ({
  formData,
  photoUploads,
  onBack,
  onSubmit,
  isSubmitting,
  pricingOptions,
  setPricingOptions,
  useContextAPI = false
}) => {
  const { t } = useTranslation();
  
  // Access context if enabled
  const jobPostingContext = useContextAPI ? useJobPosting() : null;
  
  // Use context data or props
  const jobData = useContextAPI && jobPostingContext ? jobPostingContext.jobData : formData;
  const uploads = useContextAPI && jobPostingContext ? jobPostingContext.photoUploads : photoUploads;
  const priceOptions = useContextAPI && jobPostingContext ? jobPostingContext.pricingOptions : pricingOptions;
  const calculatedPrice = useContextAPI && jobPostingContext ? jobPostingContext.calculatedPrice : {
    originalPrice: 0,
    finalPrice: 0,
    discountPercentage: 0
  };
  const submitting = useContextAPI && jobPostingContext ? jobPostingContext.ui.isSubmitting : isSubmitting;
  
  // Handle pricing changes
  const handlePricingChange = (options: PricingOptions) => {
    if (useContextAPI && jobPostingContext) {
      jobPostingContext.updatePricingOptions(options);
    } else {
      setPricingOptions(options);
    }
  };
  
  // Handle duration change
  const handleDurationChange = (months: number) => {
    handlePricingChange({
      ...priceOptions,
      durationMonths: months
    });
  };

  // Check if we have necessary data to continue
  const canContinue = jobData && jobData.title && jobData.location;
  const isDiamondPlan = priceOptions.selectedPricingTier === 'diamond';

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">
          {t({english: "Review & Publish", vietnamese: "Xem lại & Đăng tuyển"})}
        </h2>
        <Button variant="outline" onClick={onBack}>
          {t({english: "Back", vietnamese: "Quay lại"})}
        </Button>
      </div>
      
      {/* Job preview section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-medium mb-4">
          {t({english: "Job Posting Preview", vietnamese: "Xem trước bài đăng công việc"})}
        </h3>
        {canContinue ? (
          <JobPostPreview 
            jobData={jobData as ExtendedJobFormValues}
            photoUrls={uploads.map(file => URL.createObjectURL(file))}
          />
        ) : (
          <div className="text-red-500 p-4 text-center">
            {t({
              english: "Missing required information. Please go back and complete the form.",
              vietnamese: "Thiếu thông tin bắt buộc. Vui lòng quay lại và hoàn thành biểu mẫu."
            })}
          </div>
        )}
      </div>
      
      {/* Pricing options section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <JobPostOptions 
          options={priceOptions}
          onOptionsChange={handlePricingChange}
          isFirstPost={priceOptions.isFirstPost}
        />
        
        <div className="mt-6">
          <DurationSelector 
            durationMonths={priceOptions.durationMonths}
            onDurationChange={handleDurationChange}
            selectedPricingTier={priceOptions.selectedPricingTier}
            isDiamondPlan={isDiamondPlan}
          />
        </div>
      </div>
      
      {/* Payment summary */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <PaymentSummary
          priceData={calculatedPrice}
          durationMonths={priceOptions.durationMonths}
          autoRenew={priceOptions.autoRenew}
          onAutoRenewChange={(autoRenew) => 
            handlePricingChange({...priceOptions, autoRenew})
          }
          selectedPricingTier={priceOptions.selectedPricingTier}
        />
      </div>
      
      {/* Submit button */}
      <div className="flex justify-end">
        <Button 
          onClick={onSubmit}
          disabled={!canContinue || submitting}
          className="px-8"
        >
          {submitting 
            ? t({english: "Processing...", vietnamese: "Đang xử lý..."})
            : t({english: "Publish Job Post", vietnamese: "Đăng tin tuyển dụng"})
          }
        </Button>
      </div>
    </div>
  );
};
