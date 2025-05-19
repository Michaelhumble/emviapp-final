
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
import JobPostingDebugPanel from '@/components/debug/JobPostingDebugPanel';

interface ReviewAndPaymentSectionProps {
  formData?: JobFormValues | null;
  photoUploads?: File[];
  onBack?: () => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  pricingOptions?: PricingOptions;
  setPricingOptions?: (options: PricingOptions) => void;
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
  useContextAPI = true
}) => {
  const { t } = useTranslation();
  
  // Try to access context
  let jobPostingContext = null;
  let usingContext = false;
  try {
    jobPostingContext = useJobPosting();
    usingContext = useContextAPI && jobPostingContext !== null;
  } catch (error) {
    console.error("Failed to load job posting context:", error);
  }
  
  // Use context data or props
  const jobData = usingContext ? jobPostingContext.jobData : formData;
  const uploads = usingContext ? jobPostingContext.photoUploads : (photoUploads || []);
  const priceOptions = usingContext ? jobPostingContext.pricingOptions : (pricingOptions || {
    selectedPricingTier: 'standard' as JobPricingTier,
    durationMonths: 1,
    autoRenew: false,
    isFirstPost: false,
    isNationwide: false
  });
  const calculatedPrice = usingContext ? jobPostingContext.calculatedPrice : {
    originalPrice: 0,
    finalPrice: 0,
    discountPercentage: 0
  };
  const submitting = usingContext ? jobPostingContext.ui.isSubmitting : (isSubmitting || false);
  
  // Handle pricing changes
  const handlePricingChange = (options: PricingOptions) => {
    if (usingContext) {
      jobPostingContext.updatePricingOptions(options);
    } else if (setPricingOptions) {
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
  
  // Handle submit
  const handleSubmit = () => {
    if (usingContext) {
      jobPostingContext.validateForm();
      jobPostingContext.setStep('payment');
    }
    if (onSubmit) onSubmit();
  };
  
  // Handle back
  const handleBack = () => {
    if (usingContext) {
      jobPostingContext.navigateBack();
      jobPostingContext.setStep('details');
    }
    if (onBack) onBack();
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
        <Button variant="outline" onClick={handleBack}>
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
            jobData={jobData}
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
          onClick={handleSubmit}
          disabled={!canContinue || submitting}
          className="px-8"
        >
          {submitting 
            ? t({english: "Processing...", vietnamese: "Đang xử lý..."})
            : t({english: "Publish Job Post", vietnamese: "Đăng tin tuyển dụng"})
          }
        </Button>
      </div>
      
      {/* Debug panel */}
      <JobPostingDebugPanel />
    </div>
  );
};
