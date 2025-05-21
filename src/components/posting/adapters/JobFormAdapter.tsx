
import React from 'react';
import JobForm from '@/components/posting/job/JobForm';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';

/**
 * JobFormAdapter - Adapts interfaces between EnhancedJobForm and JobForm
 * 
 * PROTECTED COMPONENT: This adapter exists to protect the locked Post a Job flow
 * from accidental changes. Do not modify the core JobForm component - instead,
 * update this adapter to match JobForm's interface requirements.
 */

// Locally define the props that JobForm expects, without importing from the locked file
interface LocalJobFormProps {
  onSubmit: (data: JobFormValues, uploads?: File[]) => void;
  isLoading?: boolean;
  onBack?: () => void;
  initialTemplate?: JobFormValues;
  isCustomTemplate?: boolean;
}

// Define the props that our adapter expects
interface JobFormAdapterProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => void;
  isLoading?: boolean;
  onBack?: () => void;
  initialTemplate?: JobFormValues;
  isCustomTemplate?: boolean;
  photoUploads?: File[];
  maxPhotos?: number;
  onStepChange?: (step: number) => void;
}

const JobFormAdapter: React.FC<JobFormAdapterProps> = ({
  photoUploads,
  maxPhotos,
  onStepChange,
  onSubmit,
  ...validJobFormProps
}) => {
  // Handle the translation of onSubmit prop to match JobForm's expectations
  const handleSubmit = (data: JobFormValues, uploads?: File[]) => {
    // Ensure we have a proper uploads array
    const processedUploads = uploads || [];
    
    // Create default pricing options when not provided explicitly
    const defaultPricingOptions: PricingOptions = {
      selectedPricingTier: 'premium',
      durationMonths: 1,
      autoRenew: true,
      isFirstPost: true,
      isNationwide: false
    };
    
    // Forward to the original onSubmit with all expected parameters
    onSubmit(data, processedUploads, defaultPricingOptions);
  };

  // Forward only the props that JobForm actually accepts
  return <JobForm 
    {...validJobFormProps}
    onSubmit={handleSubmit}
  />;
};

export default JobFormAdapter;
