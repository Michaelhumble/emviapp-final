
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { usePostPayment } from '@/hooks/usePostPayment';
import PremiumJobPricingCards from './PremiumJobPricingCards';
import PricingConfirmationModal from './PricingConfirmationModal';
import { toast } from 'sonner';

interface JobPostingFlowProps {
  jobData: any;
  isEditMode?: boolean;
  onEditModeChange?: (enabled: boolean) => void;
}

const JobPostingFlow: React.FC<JobPostingFlowProps> = ({ 
  jobData, 
  isEditMode = false, 
  onEditModeChange 
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleJobPost } = useJobPosting();
  const { initiatePayment } = usePostPayment();
  
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log('🔍 JobPostingFlow - Component rendered with jobData:', jobData);
  console.log('🔍 JobPostingFlow - User authenticated:', !!user);

  const handlePricingSelect = async (tier: string, finalPrice: number, durationMonths: number) => {
    console.log('🔍 JobPostingFlow - handlePricingSelect called with:', { tier, finalPrice, durationMonths });
    
    if (!user) {
      console.error('❌ JobPostingFlow - User not authenticated');
      toast.error('Please sign in to post a job');
      navigate('/sign-in');
      return;
    }

    setSelectedTier(tier);
    
    if (tier === 'free') {
      console.log('🔍 JobPostingFlow - Processing free job post');
      setIsLoading(true);
      
      try {
        console.log('🔍 JobPostingFlow - Calling handleJobPost for free tier');
        const result = await handleJobPost({
          ...jobData,
          pricing_tier: 'free'
        });
        
        console.log('🔍 JobPostingFlow - Free job post result:', result);
        
        if (result.success) {
          console.log('✅ JobPostingFlow - Free job posted successfully');
          toast.success('Job posted successfully!');
          navigate('/post-success?type=free');
        } else {
          console.error('❌ JobPostingFlow - Free job post failed:', result.error);
          toast.error(result.error || 'Failed to post job');
        }
      } catch (error) {
        console.error('❌ JobPostingFlow - Exception in free job posting:', error);
        toast.error('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log('🔍 JobPostingFlow - Opening pricing confirmation modal for paid tier');
      setShowPricingModal(true);
    }
  };

  const handleConfirmPaidPosting = async () => {
    console.log('🔍 JobPostingFlow - handleConfirmPaidPosting called for tier:', selectedTier);
    
    if (!user) {
      console.error('❌ JobPostingFlow - User not authenticated for paid posting');
      return;
    }

    setIsLoading(true);
    setShowPricingModal(false);

    try {
      console.log('🔍 JobPostingFlow - Calling initiatePayment for paid job');
      const paymentResult = await initiatePayment('job', jobData, {
        selectedPricingTier: selectedTier as any,
        durationMonths: 1,
        autoRenew: false,
        isFirstPost: true
      });
      
      console.log('🔍 JobPostingFlow - Payment initiation result:', paymentResult);
    } catch (error) {
      console.error('❌ JobPostingFlow - Exception in paid job posting:', error);
      toast.error('Failed to process payment');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditMode) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Job Post</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Edit mode is enabled. Complete your job details first.</p>
          <Button 
            onClick={() => onEditModeChange?.(false)} 
            className="mt-4"
          >
            Continue to Pricing
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PremiumJobPricingCards 
        onPricingSelect={handlePricingSelect}
        jobData={jobData}
        disabled={isLoading}
      />

      <PricingConfirmationModal
        open={showPricingModal}
        onOpenChange={setShowPricingModal}
        onConfirm={handleConfirmPaidPosting}
        tier={selectedTier}
        isLoading={isLoading}
      />
    </div>
  );
};

export default JobPostingFlow;
