
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import JobPostingErrorBoundary from '@/components/error-handling/JobPostingErrorBoundary';
import { toast } from 'sonner';
import { logJobPostingEvent } from '@/utils/telemetry/jobPostingEvents';
import { JobPostingProvider } from '@/context/JobPostingContext';
import { supabase } from '@/integrations/supabase/client';

interface JobPostProps {
  isEdit?: boolean;
  jobId?: string;
}

// Mock function to submit job post (would typically be an API call)
const submitJobPost = async (formData: JobFormValues): Promise<{success: boolean; message: string}> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  try {
    // Log the submission attempt
    logJobPostingEvent('SUBMIT', 'Job post submission', { formData });
    
    // In a real implementation, this would be an API call to submit the job post
    // For now, we'll just simulate a successful submission
    return { 
      success: true, 
      message: 'Job post created successfully!'
    };
  } catch (error) {
    // Log the error
    logJobPostingEvent('PAYMENT_ERROR', 'Job post submission failed', { error });
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

const JobPost: React.FC<JobPostProps> = ({ isEdit = false, jobId }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleFormSubmit = async (
    formData: JobFormValues, 
    photoUploads: File[],
    pricingOptions: any
  ) => {
    setIsSubmitting(true);
    
    try {
      // Convert JobFormValues to backend format if needed
      const normalizedFormData = {
        ...formData,
        // Map any snake_case ↔ camelCase differences as needed
        vietnamese_description: formData.vietnameseDescription,
        employment_type: formData.jobType
      };
      
      // Submit the job post
      const result = await submitJobPost(normalizedFormData as any);
      
      if (result.success) {
        // Show success toast
        toast.success('Job post created successfully!', {
          description: 'Your job post has been published.'
        });
        
        // Redirect to success page or dashboard
        navigate('/dashboard');
      } else {
        // Show error toast
        toast.error('Failed to create job post', {
          description: result.message
        });
      }
    } catch (error) {
      console.error('Error submitting job post:', error);
      
      toast.error('Failed to create job post', {
        description: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <JobPostingErrorBoundary>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">
          {isEdit ? 'Edit Job Posting' : 'Create New Job Posting'}
        </h1>
        
        <JobPostingProvider>
          <EnhancedJobForm
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
          />
        </JobPostingProvider>
      </div>
    </JobPostingErrorBoundary>
  );
};

export default JobPost;
