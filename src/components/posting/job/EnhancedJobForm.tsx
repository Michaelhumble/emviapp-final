
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import ContactInfoSection from '@/components/posting/sections/ContactInfoSection';
import PhotoUploadSection from '@/components/posting/sections/PhotoUploadSection';
import { ReviewAndPaymentSection } from '@/components/posting/sections/ReviewAndPaymentSection';
import StepIndicator from '@/components/posting/StepIndicator';
import { PricingOptions } from '@/utils/posting/types';
import { usePricing } from '@/context/pricing/PricingProvider';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions, exactUiPrice?: number) => Promise<boolean>;
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
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { pricingOptions, setPricingOptions, priceData } = usePricing();
  
  const totalSteps = 4; // Define the total number of steps
  
  // Form steps configuration
  const steps = [
    { number: 1, label: "Job Details" },
    { number: 2, label: "Contact Info" },
    { number: 3, label: "Photos" },
    { number: 4, label: "Review & Publish" },
  ];

  // Initialize form with default values or template values
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: initialTemplate || {
      title: "",
      jobType: "full-time",
      location: "",
      description: "",
      vietnameseDescription: "",
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      compensation_type: "hourly",
      compensation_details: "",
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
    }
  });

  const goToStep = (step: number) => {
    if (step >= 1 && step <= steps.length) {
      setCurrentStep(step);
      if (onStepChange) {
        onStepChange(step);
      }
    }
  };

  const handleNext = () => goToStep(currentStep + 1);
  const handleBack = () => goToStep(currentStep - 1);
  
  const handlePhotoUploadsChange = (photos: File[]) => {
    setPhotoUploads(photos);
  };

  const handleReviewAndSubmit = async (formData: JobFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Calculate the final price as shown in the UI
      const exactUiPrice = calculateFinalPrice();
      
      // Call the parent's onSubmit with the form data and pricing options
      const success = await onSubmit(formData, photoUploads, pricingOptions, exactUiPrice);
      
      if (success) {
        toast.success("Job posting submitted successfully!");
        return true;
      } else {
        toast.error("There was an issue submitting your job post. Please try again.");
        return false;
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An unexpected error occurred. Please try again later.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to calculate final price based on pricing options
  const calculateFinalPrice = () => {
    return priceData.finalPrice;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleReviewAndSubmit)} className="space-y-6">
        {/* Step indicator */}
        <StepIndicator 
          currentStep={currentStep} 
          totalSteps={totalSteps} 
          steps={steps} 
        />
        
        {/* Different sections based on current step */}
        {currentStep === 1 && (
          <JobDetailsSection 
            form={form} 
            onNext={handleNext} 
            onBack={onBack}
            isCustomTemplate={isCustomTemplate}
          />
        )}
        
        {currentStep === 2 && (
          <ContactInfoSection 
            form={form} 
            onNext={handleNext} 
            onBack={handleBack}
            isCustomTemplate={isCustomTemplate}
          />
        )}
        
        {currentStep === 3 && (
          <PhotoUploadSection
            form={form}
            onNext={handleNext}
            onBack={handleBack}
            onPhotoUploadsChange={handlePhotoUploadsChange}
            maxPhotos={maxPhotos}
            isSubmitting={isSubmitting}
            photoUploads={photoUploads}
            isCustomTemplate={isCustomTemplate}
          />
        )}
        
        {currentStep === 4 && (
          <ReviewAndPaymentSection 
            formData={form.getValues()}
            photoUploads={photoUploads}
            onBack={handleBack}
            onSubmit={handleReviewAndSubmit}
            isSubmitting={isSubmitting}
          />
        )}
      </form>
    </Form>
  );
};

export default EnhancedJobForm;
