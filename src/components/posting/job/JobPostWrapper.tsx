import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePostPayment } from '@/hooks/usePostPayment';
import { JobPostPricing } from './JobPostPricing';
import { JobDetailsSubmission } from '@/types/job';
import { PricingOptions } from '@/utils/posting/types';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

// Define the posting steps for a clearer workflow
enum PostingStep {
  JOB_DETAILS = 0,
  PRICING = 1,
  PROCESSING = 2
}

interface JobPostWrapperProps {
  jobDetails: JobDetailsSubmission;
  onBack: () => void;
}

export const JobPostWrapper: React.FC<JobPostWrapperProps> = ({ 
  jobDetails, 
  onBack 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { initiatePayment, isLoading } = usePostPayment();
  
  // Track the current step in the posting process
  const [currentStep, setCurrentStep] = useState<PostingStep>(PostingStep.PRICING);
  const [isFirstPost, setIsFirstPost] = useState<boolean>(true);
  
  // We'd fetch the user's post count from API to determine if it's their first post
  // For now, we'll just assume it's their first post
  
  const handleSelectPlan = async (options: PricingOptions) => {
    if (!user) {
      toast.error("You need to be logged in to post a job");
      navigate('/login', { state: { from: location } });
      return;
    }
    
    // Move to the processing step
    setCurrentStep(PostingStep.PROCESSING);
    
    try {
      const result = await initiatePayment('job', jobDetails, options);
      
      if (result.waitlisted) {
        navigate('/dashboard');
        return;
      }
      
      // If it's a free post or payment was successful, the redirect will happen in the initiatePayment function
      // Otherwise, we should return to the pricing step
      if (!result.success) {
        setCurrentStep(PostingStep.PRICING);
        toast.error("There was an issue with your payment. Please try again.");
      }
      
    } catch (error) {
      console.error("Error in job post payment process:", error);
      setCurrentStep(PostingStep.PRICING);
      toast.error("There was an error processing your request. Please try again later.");
    }
  };

  const handleGoBack = () => {
    if (currentStep === PostingStep.PRICING) {
      // Go back to job details
      onBack();
    } else {
      // If in processing or any other step, go back to pricing
      setCurrentStep(PostingStep.PRICING);
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Post Your Job</h1>
        {isLoading && (
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing...</span>
          </div>
        )}
      </div>
      
      {currentStep === PostingStep.PRICING && (
        <>
          <JobPostPricing
            onContinue={handleSelectPlan}
            isFirstPost={isFirstPost}
          />
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleGoBack}>
              Back to Details
            </Button>
          </div>
        </>
      )}
      
      {currentStep === PostingStep.PROCESSING && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <h2 className="text-xl font-medium">Processing your job post</h2>
          <p className="text-muted-foreground">Please wait while we prepare your listing...</p>
        </div>
      )}
    </div>
  );
};

export default JobPostWrapper;
