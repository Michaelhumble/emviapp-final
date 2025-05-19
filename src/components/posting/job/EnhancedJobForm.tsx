import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/useTranslation';
import { usePricing } from '@/context/pricing/PricingProvider';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import ContactInfoSection from '@/components/posting/sections/ContactInfoSection';
import { ReviewAndPaymentSection } from '@/components/posting/sections/ReviewAndPaymentSection';
import StepIndicator from '@/components/posting/StepIndicator';
import { PricingOptions } from '@/utils/posting/types';
import { PhotoUploadSection } from '@/components/posting/sections/PhotoUploadSection';
import { PricingProvider } from '@/context/pricing/PricingProvider';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions, exactUiPrice?: number) => Promise<boolean>;
  onStepChange?: (step: number) => void;
  initialTemplate?: JobFormValues;
  onBack?: () => void;
  isCustomTemplate?: boolean;
  maxPhotos?: number;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  onStepChange,
  initialTemplate,
  onBack,
  isCustomTemplate = false,
  maxPhotos = 5,
}) => {
  // Create default form values that match the expected types
  const defaultFormValues: JobFormValues = {
    title: initialTemplate?.title || '',
    description: initialTemplate?.description || '',
    vietnameseDescription: initialTemplate?.vietnameseDescription || '',
    location: initialTemplate?.location || '',
    jobType: initialTemplate?.jobType || 'full-time', // Fix: Changed from "Full-time" to "full-time" to match enum
    compensation_type: initialTemplate?.compensation_type || 'hourly',
    compensation_details: initialTemplate?.compensation_details || '',
    weekly_pay: initialTemplate?.weekly_pay || false,
    has_housing: initialTemplate?.has_housing || false,
    has_wax_room: initialTemplate?.has_wax_room || false,
    owner_will_train: initialTemplate?.owner_will_train || false,
    no_supply_deduction: initialTemplate?.no_supply_deduction || false,
    contactName: initialTemplate?.contactName || '',
    contactPhone: initialTemplate?.contactPhone || '',
    contactEmail: initialTemplate?.contactEmail || '',
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultFormValues,
    mode: 'onChange',
  });

  // Update parent component when step changes
  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStep);
    }
  }, [currentStep, onStepChange]);

  // Handle photo uploads
  const handlePhotoUpload = (files: File[]) => {
    // Limit to max photos
    const newPhotos = [...photoUploads, ...files].slice(0, maxPhotos);
    setPhotoUploads(newPhotos);
  };

  const removePhoto = (index: number) => {
    setPhotoUploads(photoUploads.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleFormSubmit = async (exactUiPrice: number) => {
    try {
      setIsSubmitting(true);
      const formData = form.getValues();
      
      // Get pricing options from context
      const { pricingOptions } = usePricing();
      
      // Submit the form data, photos, and pricing options
      const success = await onSubmit(formData, photoUploads, pricingOptions, exactUiPrice);
      
      if (!success) {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  // Navigation between steps
  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    } else if (onBack) {
      onBack();
    }
  };

  // Set default pricing options if we're outside a PricingProvider
  // This is to prevent the "usePricing must be used within a PricingProvider" error
  const [hasPricingProvider, setHasPricingProvider] = useState(true);
  
  let pricingContextValue;
  try {
    pricingContextValue = usePricing();
  } catch (e) {
    setHasPricingProvider(false);
  }

  // Render content based on step
  let content;
  
  if (currentStep === 1) {
    content = (
      <div className="space-y-6">
        <StepIndicator 
          currentStep={currentStep} 
          steps={[
            { number: 1, label: t({english: 'Job Details', vietnamese: 'Chi tiết công việc'}) },
            { number: 2, label: t({english: 'Photos & Contact', vietnamese: 'Hình ảnh & Liên hệ'}) },
            { number: 3, label: t({english: 'Review & Pay', vietnamese: 'Xem lại & Thanh toán'}) },
          ]} 
        />
        
        <JobDetailsSection 
          form={form} 
          onNext={goToNextStep} 
          onBack={onBack}
          isCustomTemplate={isCustomTemplate}
        />
      </div>
    );
  } else if (currentStep === 2) {
    content = (
      <div className="space-y-6">
        <StepIndicator 
          currentStep={currentStep} 
          steps={[
            { number: 1, label: t({english: 'Job Details', vietnamese: 'Chi tiết công việc'}) },
            { number: 2, label: t({english: 'Photos & Contact', vietnamese: 'Hình ảnh & Liên hệ'}) },
            { number: 3, label: t({english: 'Review & Pay', vietnamese: 'Xem lại & Thanh toán'}) },
          ]} 
        />
        
        <div className="space-y-8">
          <PhotoUploadSection
            photos={photoUploads}
            onPhotoUpload={handlePhotoUpload}
            onPhotoRemove={removePhoto}
            maxPhotos={maxPhotos}
          />
          
          <ContactInfoSection 
            form={form} 
            onNext={goToNextStep} 
            onBack={goToPreviousStep}
          />
        </div>
      </div>
    );
  } else if (currentStep === 3) {
    content = (
      <div className="space-y-6">
        <StepIndicator 
          currentStep={currentStep} 
          steps={[
            { number: 1, label: t({english: 'Job Details', vietnamese: 'Chi tiết công việc'}) },
            { number: 2, label: t({english: 'Photos & Contact', vietnamese: 'Hình ảnh & Liên hệ'}) },
            { number: 3, label: t({english: 'Review & Pay', vietnamese: 'Xem lại & Thanh toán'}) },
          ]} 
        />
        
        <ReviewAndPaymentSection
          formData={form.getValues()}
          photoUploads={photoUploads}
          onBack={goToPreviousStep}
          onSubmit={handleFormSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    );
  }
  
  // Wrap in PricingProvider if needed as fallback
  if (!hasPricingProvider) {
    // Default pricing options to prevent errors
    const defaultPricingOptions: PricingOptions = {
      selectedPricingTier: 'premium',
      durationMonths: 1,
      autoRenew: true,
      isFirstPost: true,
      isNationwide: false
    };
    
    return (
      <PricingProvider initialOptions={defaultPricingOptions}>
        {content}
      </PricingProvider>
    );
  }
  
  return content;
};

export default EnhancedJobForm;
