
import React, { useState } from 'react';
import { JobFormValues } from './jobFormSchema';
import JobForm from './JobForm';
import { useJobPosting } from '@/context/JobPostingContext';
import { ReviewAndPaymentSection } from '@/components/posting/sections/ReviewAndPaymentSection';
import { useFeatureFlag } from '@/utils/featureFlags/useFeatureFlag';
import { logJobPostingEvent } from '@/utils/telemetry/jobPostingEvents';

interface EnhancedJobFormProps {
  onSubmit: (formData: JobFormValues, photoUploads: File[], pricingOptions: any) => void;
  isSubmitting?: boolean;
  initialValues?: JobFormValues;
}

/**
 * Enhanced job form that handles the complete job posting flow with multiple steps
 */
const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  isSubmitting = false,
  initialValues
}) => {
  // Use context if available, otherwise use local state
  const isContextAvailable = useFeatureFlag('useJobPostingContext');
  const [currentStep, setCurrentStep] = useState<'details' | 'review'>('details');
  const [formData, setFormData] = useState<JobFormValues>(initialValues || {});
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  
  // Try to access context
  let jobPostingContext;
  let usingContext = false;
  try {
    jobPostingContext = useJobPosting();
    usingContext = isContextAvailable && !!jobPostingContext;
  } catch (error) {
    console.error("Error accessing job posting context:", error);
  }
  
  // Use context values if available, otherwise use local state
  const effectiveStep = usingContext ? jobPostingContext.currentStep : currentStep;
  const effectiveFormData = usingContext ? jobPostingContext.jobData : formData;
  const effectivePhotoUploads = usingContext ? jobPostingContext.photoUploads : photoUploads;
  const effectivePricingOptions = usingContext ? jobPostingContext.pricingOptions : { 
    selectedPricingTier: 'standard',
    durationMonths: 1,
    autoRenew: false,
    isFirstPost: true,
    isNationwide: false
  };
  
  // Handle form submission for the details step
  const handleDetailsSubmit = (data: JobFormValues, uploads?: File[]) => {
    logJobPostingEvent('EDIT', 'Job form details submitted', { data });
    
    if (usingContext) {
      jobPostingContext.updateJobData(data);
      if (uploads) jobPostingContext.setPhotoUploads(uploads);
      jobPostingContext.setStep('review');
    } else {
      setFormData(data);
      if (uploads) setPhotoUploads(uploads);
      setCurrentStep('review');
    }
  };
  
  // Handle back navigation
  const handleBack = () => {
    if (usingContext) {
      jobPostingContext.setStep('details');
    } else {
      setCurrentStep('details');
    }
  };
  
  // Handle final submission
  const handleSubmitFinal = () => {
    // Use the context or local state to get the data
    const submissionData = usingContext ? jobPostingContext.jobData : formData;
    const uploads = usingContext ? jobPostingContext.photoUploads : photoUploads;
    const pricing = usingContext ? jobPostingContext.pricingOptions : effectivePricingOptions;
    
    // Call the onSubmit prop with all the data
    onSubmit(submissionData, uploads, pricing);
  };
  
  return (
    <div className="space-y-6">
      {effectiveStep === 'details' && (
        <JobForm
          onSubmit={handleDetailsSubmit}
          photoUploads={effectivePhotoUploads}
          setPhotoUploads={setPhotoUploads}
          initialValues={effectiveFormData}
          useContextAPI={usingContext}
        />
      )}
      
      {effectiveStep === 'review' && (
        <ReviewAndPaymentSection
          formData={effectiveFormData}
          photoUploads={effectivePhotoUploads}
          onBack={handleBack}
          onSubmit={handleSubmitFinal}
          isSubmitting={isSubmitting}
          pricingOptions={effectivePricingOptions}
          useContextAPI={usingContext}
        />
      )}
    </div>
  );
};

export default EnhancedJobForm;
