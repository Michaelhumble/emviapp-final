
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Layout from '@/components/layout/Layout';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import JobTemplateSelector from '@/components/posting/job/JobTemplateSelector';
import { JobTemplateType } from '@/utils/jobs/jobTemplates';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { usePostPayment } from '@/hooks/usePostPayment';
import { JobPostingProvider, useJobPosting, mapToJobDetailsSubmission } from '@/context/JobPostingContext';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { JobPostingDebugPanel } from '@/components/debug/JobPostingDebugPanel';
import { useContextBasedFlow, shouldShowDebugPanel } from '@/utils/featureFlags/jobPostingFlags';
import JobPostingErrorBoundary from '@/components/error-handling/JobPostingErrorBoundary';

// Legacy version of the component to maintain backward compatibility
const LegacyCreateJobPosting = () => {
  const [selectedTemplate, setSelectedTemplate] = React.useState<JobFormValues | null>(null);
  const [selectedTemplateType, setSelectedTemplateType] = React.useState<JobTemplateType | null>(null);
  const [step, setStep] = React.useState<'template' | 'form'>('template');
  const { initiatePayment } = usePostPayment();
  
  const handleTemplateSelect = (template: JobFormValues, templateType: JobTemplateType) => {
    setSelectedTemplate(template);
    setSelectedTemplateType(templateType);
    setStep('form');
    window.scrollTo(0, 0);
  };
  
  const handleFormSubmit = async (data: JobFormValues, uploads: File[], pricingOptions) => {
    try {
      // Using the legacy code path for initiating payment
      console.log('[Legacy] Form submitted:', data);
      
      // Map to job details
      const jobDetails = {
        ...data,
        // Ensure we have all needed fields for backend
        title: data.title || '',
        description: data.description || '',
        location: data.location || '',
        contact_info: {
          email: data.contactEmail || '',
          phone: data.contactPhone || '',
          owner_name: data.contactName || '',
          zalo: data.contactZalo || '',
        },
        vietnamese_description: data.vietnameseDescription || '',
        requirements: data.requirements || [],
        specialties: data.specialties || [],
        weekly_pay: data.weeklyPay || false,
        has_housing: data.hasHousing || false,
        no_supply_deduction: data.noSupplyDeduction || false,
        owner_will_train: data.ownerWillTrain || false,
        is_urgent: data.isUrgent || false,
      };
      
      // Handle payment and job posting through the usePostPayment hook
      const paymentResponse = await initiatePayment('job', jobDetails, pricingOptions);
      
      return paymentResponse.success;
      
    } catch (error) {
      console.error('[Legacy] Error submitting form:', error);
      toast.error('Error creating job post');
      return false;
    }
  };

  return (
    <Card className="bg-white shadow-md rounded-lg p-6">
      {step === 'template' ? (
        <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
      ) : (
        <EnhancedJobForm 
          onSubmit={handleFormSubmit}
          initialTemplate={selectedTemplate || undefined}
          onBack={() => setStep('template')}
          isCustomTemplate={selectedTemplateType === 'custom'}
          maxPhotos={5}
        />
      )}
    </Card>
  );
};

// New version using Context API
const ContextAwareJobPosting = () => {
  const [step, setStep] = React.useState<'template' | 'form'>('template');
  const { 
    jobData,
    photoUploads,
    pricingOptions,
    updateJobData,
    setPhotoUploads,
    validateForm,
    startSubmission,
    submissionSuccess,
    submissionFailure
  } = useJobPosting();
  const { initiatePayment } = usePostPayment();
  
  // Set debug panel visibility on mount
  useEffect(() => {
    // Initialize debug panel based on feature flag
    const showDebug = shouldShowDebugPanel();
    if (showDebug) {
      document.body.classList.add('debug-mode');
    }
  }, []);
  
  const handleTemplateSelect = (template: JobFormValues, templateType: JobTemplateType) => {
    // Update context with template data
    updateJobData(template);
    // Store template type in localStorage for potential recovery
    localStorage.setItem('selectedTemplateType', templateType);
    setStep('form');
    window.scrollTo(0, 0);
  };
  
  const handleFormSubmit = async () => {
    try {
      // Validate the form data
      validateForm();
      
      // Check if job data is valid
      if (!jobData.title || !jobData.location || !jobData.contactEmail || !jobData.description) {
        toast.error('Please fill in all required fields');
        return false;
      }
      
      console.log('[Context] Submitting job post with context data');
      console.log('Job data:', jobData);
      console.log('Pricing options:', pricingOptions);
      console.log('Photo uploads:', photoUploads);
      
      // Start submission process
      startSubmission();
      
      // Map jobData to the format expected by the backend
      const jobDetails = mapToJobDetailsSubmission(jobData);
      
      // Initiate payment using the context data
      const paymentResponse = await initiatePayment('job', jobDetails, pricingOptions);
      
      if (!paymentResponse.success) {
        submissionFailure('Payment failed');
        throw new Error('Payment failed');
      }
      
      submissionSuccess();
      return true;
      
    } catch (error) {
      console.error('[Context] Error submitting form:', error);
      submissionFailure(error.message || 'Error creating job post');
      toast.error('Error creating job post');
      return false;
    }
  };
  
  const handleBack = () => {
    setStep('template');
  };
  
  // Get template type from localStorage if available
  const storedTemplateType = localStorage.getItem('selectedTemplateType') as JobTemplateType | null;
  const isCustomTemplate = storedTemplateType === 'custom';

  return (
    <Card className="bg-white shadow-md rounded-lg p-6 relative">
      {step === 'template' ? (
        <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
      ) : (
        <EnhancedJobForm 
          useContextAPI={true}
          onSubmit={handleFormSubmit}
          onBack={handleBack}
          isCustomTemplate={isCustomTemplate}
          maxPhotos={5}
        />
      )}
      
      {/* Debug panel will be conditionally rendered based on context */}
      <JobPostingDebugPanel />
    </Card>
  );
};

// Main component with provider
const CreateJobPosting = () => {
  // Check feature flag to determine which version to use
  const useContextVersion = useContextBasedFlow();
  
  return (
    <Layout>
      <Helmet>
        <title>Create Job Posting | EmviApp</title>
        <meta 
          name="description" 
          content="Create a new job posting to find qualified beauty professionals for your salon."
        />
      </Helmet>
      <div className="container max-w-4xl mx-auto py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Create Job Posting</h1>
          <p className="text-gray-600">Find your perfect employee</p>
          
          {/* Version indicator for developers */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2 text-xs text-gray-400">
              Using {useContextVersion ? 'Context API' : 'Legacy'} version
              {/* Toggle switch */}
              <button
                className="ml-2 px-2 py-0.5 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 text-xs"
                onClick={() => {
                  const newValue = !useContextVersion;
                  localStorage.setItem('useJobPostingLegacyFlow', newValue ? 'true' : 'false');
                  window.location.reload();
                }}
              >
                Switch to {useContextVersion ? 'Legacy' : 'Context'} Version
              </button>
            </div>
          )}
        </div>
        
        {useContextVersion ? (
          <JobPostingErrorBoundary>
            <JobPostingProvider>
              <ContextAwareJobPosting />
            </JobPostingProvider>
          </JobPostingErrorBoundary>
        ) : (
          <LegacyCreateJobPosting />
        )}
      </div>
    </Layout>
  );
};

export default CreateJobPosting;
