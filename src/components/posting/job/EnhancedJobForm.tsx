import React, { useState } from 'react';
import { JobFormValues, jobFormSchema } from '@/components/posting/job/jobFormSchema';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import ContactInfoSection from '@/components/posting/sections/ContactInfoSection';
import PricingCards from '@/components/posting/PricingCards';
import ReviewAndPaymentSection from '@/components/posting/sections/ReviewAndPaymentSection';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { usePricing } from '@/context/pricing/PricingProvider';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import PhotoUploadSection from '@/components/posting/sections/PhotoUploadSection';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  initialTemplate?: JobFormValues;
  onBack?: () => void;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  initialTemplate,
  onBack,
  isCustomTemplate = false,
  maxPhotos = 5,
  onStepChange
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const { pricingOptions } = usePricing();
  const methods = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialTemplate,
    mode: 'onChange'
  });
  const { handleSubmit, trigger } = methods;

  const totalSteps = 4;

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep(currentStep + 1);
      onStepChange?.(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    onStepChange?.(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handlePhotoUpload = (files: File[]) => {
    setSelectedPhotos(files);
  };

  const submitForm = () => {
    handleSubmit(async (data) => {
      await onSubmit(data, selectedPhotos, pricingOptions);
    })();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(async (data) => {
          await onSubmit(data, selectedPhotos, pricingOptions);
        })}>
        <Card className="mb-4">
          {currentStep === 1 && (
            <JobDetailsSection nextStep={nextStep} isCustomTemplate={isCustomTemplate} />
          )}
          {currentStep === 2 && (
            <ContactInfoSection prevStep={prevStep} nextStep={nextStep} />
          )}
          {currentStep === 3 && (
            <PhotoUploadSection
              onPhotoUpload={handlePhotoUpload}
              prevStep={prevStep}
              nextStep={nextStep}
              maxPhotos={maxPhotos}
            />
          )}
          {currentStep === 4 && (
            <ReviewAndPaymentSection
              onSubmit={submitForm}
              isSubmitting={false}
              selectedPhotos={selectedPhotos}
            />
          )}
        </Card>

        {currentStep !== 4 && (
          <div className="flex justify-between mt-4">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={onBack || prevStep}>
                {currentStep === 1 ? 'Back' : 'Previous'}
              </Button>
            ) : (
              <Button variant="outline" onClick={onBack}>
                Back to Templates
              </Button>
            )}
            {currentStep < totalSteps - 1 && (
              <Button onClick={nextStep}>Next</Button>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default EnhancedJobForm;
