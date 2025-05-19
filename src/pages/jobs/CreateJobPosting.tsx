
import React, { useState } from 'react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import JobForm from '@/components/posting/job/JobForm';
import { ReviewAndPaymentSection } from '@/components/posting/sections/ReviewAndPaymentSection';
import { JobPostingProvider, useJobPosting } from '@/context/JobPostingContext';
import JobPostingDebugPanel from '@/components/debug/JobPostingDebugPanel';
import { useFeatureFlag } from '@/utils/featureFlags/jobPostingFlags';

// Internal component that uses the context
const JobPostingWithContext: React.FC = () => {
  const { 
    jobData, 
    photoUploads, 
    currentStep, 
    updateJobData, 
    setPhotoUploads, 
    setStep,
    ui
  } = useJobPosting();
  
  // Handle form submission
  const handleFormSubmit = (data: JobFormValues, uploads?: File[]) => {
    updateJobData(data);
    if (uploads) setPhotoUploads(uploads);
    setStep('review');
  };
  
  // Handle back navigation
  const handleBack = () => {
    setStep('details');
  };
  
  // Handle final submission
  const handleSubmit = () => {
    setStep('payment');
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      {currentStep === 'details' && (
        <>
          <h1 className="text-2xl font-bold mb-6">Create Job Posting</h1>
          <JobForm
            onSubmit={handleFormSubmit}
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            initialValues={jobData}
            useContextAPI={true}
          />
        </>
      )}
      
      {currentStep === 'review' && (
        <ReviewAndPaymentSection 
          useContextAPI={true}
        />
      )}
      
      {/* Always render the debug panel */}
      <JobPostingDebugPanel />
    </div>
  );
};

// Legacy flow component for fallback
const LegacyJobPosting: React.FC = () => {
  const [jobData, setJobData] = useState<JobFormValues | null>(null);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [currentStep, setCurrentStep] = useState<'details' | 'review'>('details');
  
  // Handle form submission
  const handleFormSubmit = (data: JobFormValues, uploads?: File[]) => {
    setJobData(data);
    if (uploads) setPhotoUploads(uploads);
    setCurrentStep('review');
  };
  
  // Handle back navigation
  const handleBack = () => {
    setCurrentStep('details');
  };
  
  // Handle final submission
  const handleSubmit = () => {
    // Legacy payment flow
    console.log('Legacy payment flow initiated');
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      {currentStep === 'details' && (
        <>
          <h1 className="text-2xl font-bold mb-6">Create Job Posting (Legacy)</h1>
          <JobForm
            onSubmit={handleFormSubmit}
            photoUploads={photoUploads}
            setPhotoUploads={setPhotoUploads}
            initialValues={jobData || {}}
            useContextAPI={false}
          />
        </>
      )}
      
      {currentStep === 'review' && (
        <ReviewAndPaymentSection 
          formData={jobData}
          photoUploads={photoUploads}
          onBack={handleBack}
          onSubmit={handleSubmit}
          useContextAPI={false}
        />
      )}
    </div>
  );
};

// Wrapper component that decides which flow to use
const CreateJobPosting: React.FC = () => {
  // Check if we should use legacy flow
  const isLegacyFlow = useFeatureFlag('useJobPostingLegacyFlow') || 
                       (typeof window !== 'undefined' && 
                        window.location.search.includes('useLegacyFlow=true'));
  
  // Provide a fallback mechanism in case of errors
  const [contextError, setContextError] = useState<boolean>(false);
  
  if (isLegacyFlow || contextError) {
    return <LegacyJobPosting />;
  }
  
  try {
    return (
      <JobPostingProvider>
        <JobPostingWithContext />
      </JobPostingProvider>
    );
  } catch (error) {
    console.error("Failed to render with Context, falling back to legacy:", error);
    setContextError(true);
    return <LegacyJobPosting />;
  }
};

export default CreateJobPosting;
