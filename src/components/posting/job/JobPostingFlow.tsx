
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { usePostPayment } from '@/hooks/usePostPayment';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { usePricing } from '@/context/pricing/PricingProvider';
import JobPricingTable from './JobPricingTable';
import { toast } from 'sonner';

interface JobPostingFlowProps {
  jobFormData: any;
  onBack: () => void;
}

const JobPostingFlow: React.FC<JobPostingFlowProps> = ({ 
  jobFormData,
  onBack 
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { initiatePayment } = usePostPayment();
  const { handleFreeJobPost } = useJobPosting();
  const { priceData } = usePricing();

  const handlePricingSelect = async (tier: string, finalPrice: number, durationMonths: number) => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      console.log('🎯 Job Posting Flow - Pricing selected:', { tier, finalPrice, durationMonths });
      
      // Prepare complete job data with user_id
      const completeJobData = {
        ...jobFormData,
        pricing_tier: tier,
        status: 'active',
        // Ensure user_id is always set from auth context
        user_id: jobFormData.user_id
      };

      if (finalPrice === 0) {
        // FREE PATH - Direct Supabase save
        console.log('🆓 Processing free job posting');
        const jobId = await handleFreeJobPost(completeJobData);
        
        if (jobId) {
          // Redirect to success page for free posts
          window.location.href = `/post-success?free=true&jobId=${jobId}`;
        } else {
          toast.error('Failed to create free job posting');
        }
      } else {
        // PAID PATH - Stripe checkout
        console.log('💳 Processing paid job posting');
        
        const pricingOptions = {
          selectedPricingTier: tier as any,
          durationMonths,
          autoRenew: false,
          isFirstPost: false
        };

        const success = await initiatePayment('job', completeJobData, pricingOptions);
        
        if (!success) {
          toast.error('Failed to initiate payment');
        }
        // If successful, user will be redirected to Stripe checkout
      }
    } catch (error) {
      console.error('Job posting error:', error);
      toast.error('Failed to process job posting');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
            disabled={isSubmitting}
          >
            <ArrowLeft size={16} />
            Back to Job Details
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Choose Your Job Posting Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <JobPricingTable 
              onPricingSelect={handlePricingSelect}
              jobData={jobFormData}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobPostingFlow;
