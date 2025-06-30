
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { toast } from 'sonner';

interface JobPostingFlowProps {
  jobData: any;
  pricingTier: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

const JobPostingFlow: React.FC<JobPostingFlowProps> = ({
  jobData,
  pricingTier,
  onSuccess,
  onError
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleJobPost } = useJobPosting();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    console.log('🔄 [DEBUG] JobPostingFlow handleSubmit called');
    console.log('🔄 [DEBUG] Job data:', jobData);
    console.log('🔄 [DEBUG] Pricing tier:', pricingTier);
    
    setIsSubmitting(true);
    
    try {
      const jobPayload = {
        ...jobData,
        pricing_tier: pricingTier
      };
      
      console.log('📤 [DEBUG] Sending job payload:', JSON.stringify(jobPayload, null, 2));
      
      const result = await handleJobPost(jobPayload);
      
      console.log('📥 [DEBUG] Job post result:', result);
      
      if (result.success) {
        console.log('✅ [DEBUG] Job posted successfully, redirecting to success page');
        
        if (onSuccess) {
          onSuccess();
        }
        
        // For free jobs, redirect to success page with job details
        if (pricingTier === 'free' && result.data) {
          navigate(`/post-success?jobId=${result.data.id}&jobTitle=${encodeURIComponent(result.data.title)}&planType=Free`);
        } else {
          navigate('/post-success');
        }
      } else {
        console.error('❌ [DEBUG] Job posting failed:', result.error);
        const errorMessage = result.error || 'Failed to post job';
        toast.error(errorMessage);
        
        if (onError) {
          onError(errorMessage);
        }
      }
    } catch (error) {
      console.error('💥 [DEBUG] Unexpected error in JobPostingFlow:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      toast.error(errorMessage);
      
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-colors"
      >
        {isSubmitting ? 'Posting...' : `Post for ${pricingTier === 'free' ? 'Free' : 'Payment'}`}
      </button>
    </div>
  );
};

export default JobPostingFlow;
