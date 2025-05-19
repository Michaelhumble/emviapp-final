import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { JobFormSchema, JobFormValues } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useTranslation } from '@/hooks/useTranslation';
import { JobDetailsSection } from '@/components/posting/sections/JobDetailsSection';
import { ContactInfoSection } from '@/components/posting/sections/ContactInfoSection';
import { ReviewAndPaymentSection } from '@/components/posting/sections/ReviewAndPaymentSection';
import { StepIndicator } from '@/components/posting/StepIndicator';
import { usePricing } from '@/context/pricing/PricingProvider';
import { PricingOptions } from '@/utils/posting/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Assuming the EnhancedJobForm interface is defined here or imported
// We need to update the onSubmit prop to include exactUiPrice
interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions, exactUiPrice?: number) => Promise<boolean>;
  onBack?: () => void;
  initialValues?: Partial<JobFormValues>;
  initialTemplate?: JobFormValues;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  onBack,
  initialValues,
  initialTemplate,
  isCustomTemplate = false,
  maxPhotos = 5,
  onStepChange
}) => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<JobFormValues | null>(null);
  const { pricingOptions } = usePricing();

  // Initialize form with default values or template
  const methods = useForm<JobFormValues>({
    resolver: zodResolver(JobFormSchema),
    defaultValues: initialTemplate || initialValues || {
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      jobType: 'Full-time',
      compensation_type: 'hourly',
      compensation_details: '',
      weekly_pay: '',
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      contactName: '',
      contactPhone: '',
      contactEmail: '',
    },
  });

  // Update step indicator when step changes
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  const handleNextStep = async (data?: JobFormValues) => {
    if (data) {
      setFormData(data);
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
    window.scrollTo(0, 0);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo(0, 0);
  };

  const handleBackToFormStep = () => {
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handlePhotoUpload = (files: File[]) => {
    setPhotoUploads(files);
  };

  // Update the submit function to include the exact UI price
  const handleFinalSubmit = async (exactUiPrice: number) => {
    try {
      if (!formData) {
        toast.error("Please complete the form before submitting");
        return;
      }
      
      setIsSubmitting(true);
      
      // Add pricing tier to formData for tracking
      const enhancedFormData = {
        ...formData,
        pricingTier: pricingOptions.selectedPricingTier
      };
      
      console.log("Submitting job with pricing tier:", pricingOptions.selectedPricingTier);
      console.log("Exact UI price:", exactUiPrice);
      
      // Pass the exact price from UI to payment processing
      const success = await onSubmit(enhancedFormData, photoUploads, pricingOptions, exactUiPrice);
      
      if (success) {
        toast.success("Job posted successfully!");
      } else {
        toast.error("Failed to post job");
      }
      
      return success;
    } catch (error) {
      console.error("Error submitting job:", error);
      toast.error("An unexpected error occurred");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        {currentStep > 1 && (
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            className="flex items-center"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            {t({
              english: 'Back',
              vietnamese: 'Quay lại'
            })}
          </Button>
        )}
        
        {currentStep < 3 && (
          <Button
            type="submit"
            className="ml-auto flex items-center"
          >
            {currentStep === 2 ? t({
              english: 'Review & Pay',
              vietnamese: 'Xem lại & Thanh toán'
            }) : t({
              english: 'Next',
              vietnamese: 'Tiếp theo'
            })}
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <StepIndicator 
        currentStep={currentStep} 
        steps={[
          t({ english: 'Job Details', vietnamese: 'Chi tiết công việc' }),
          t({ english: 'Contact Info', vietnamese: 'Thông tin liên hệ' }),
          t({ english: 'Review & Pay', vietnamese: 'Xem lại & Thanh toán' })
        ]} 
      />
      
      <FormProvider {...methods}>
        {currentStep === 1 && (
          <form onSubmit={methods.handleSubmit(handleNextStep)}>
            <JobDetailsSection 
              isCustomTemplate={isCustomTemplate}
            />
            {renderStepButtons()}
          </form>
        )}
        
        {currentStep === 2 && (
          <form onSubmit={methods.handleSubmit(handleNextStep)}>
            <ContactInfoSection 
              onPhotoUpload={handlePhotoUpload}
              maxPhotos={maxPhotos}
            />
            {renderStepButtons()}
          </form>
        )}
        
        {currentStep === 3 && (
          <ReviewAndPaymentSection
            formData={formData}
            photoUploads={photoUploads}
            onBack={handleBackToFormStep}
            onSubmit={handleFinalSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </FormProvider>
    </div>
  );
};

export default EnhancedJobForm;
