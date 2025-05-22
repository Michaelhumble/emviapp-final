
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
  const [isFirstPost, setIsFirstPost] = useState<boolean>(true);
  
  // We'd fetch the user's post count from API to determine if it's their first post
  // For now, we'll just assume it's their first post
  
  const handleSelectPlan = async (options: PricingOptions) => {
    if (!user) {
      toast.error("You need to be logged in to post a job");
      navigate('/login', { state: { from: location } });
      return;
    }
    
    try {
      const result = await initiatePayment('job', jobDetails, options);
      
      if (result.waitlisted) {
        navigate('/dashboard');
      }
      
      // If it's a free post, the redirect will happen in the initiatePayment function
    } catch (error) {
      console.error("Error in job post payment process:", error);
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
      
      <JobPostPricing
        onContinue={handleSelectPlan}
        isFirstPost={isFirstPost}
      />
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back to Details
        </Button>
      </div>
    </div>
  );
};

export default JobPostWrapper;
