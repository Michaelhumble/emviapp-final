
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import PremiumJobPricingCards from './PremiumJobPricingCards';
import { usePostPayment } from '@/hooks/usePostPayment';
import PricingConfirmationModal from './PricingConfirmationModal';
import { toast } from 'sonner';

interface JobPostingFlowProps {
  jobFormData: any;
  onBack: () => void;
}

const JobPostingFlow = ({ jobFormData, onBack }: JobPostingFlowProps) => {
  const navigate = useNavigate();
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { initiatePayment } = usePostPayment();

  console.log('🚀 JobPostingFlow: Initialized with job data:', {
    hasJobData: !!jobFormData,
    jobDataKeys: jobFormData ? Object.keys(jobFormData) : [],
    jobTitle: jobFormData?.title || 'No title',
    jobCategory: jobFormData?.category || 'No category'
  });

  const handleTierSelect = (tier: string) => {
    console.log('🎯 Tier selected:', tier);
    setSelectedTier(tier);
    
    // Force Diamond tier to be $999.99 for 12 months
    if (tier === 'diamond') {
      console.log('💎 Diamond tier selected - forcing 12 month duration');
      setSelectedTier('diamond');
    }

    // Handle free tier immediately
    if (tier === 'free') {
      console.log('🆓 Free tier selected - bypassing confirmation modal');
      handleFreePost();
    } else {
      console.log('💰 Paid tier selected - showing confirmation modal');
      setShowConfirmation(true);
    }
  };

  const handleFreePost = async () => {
    console.log('🆓 Starting free post creation...');
    setIsLoading(true);
    
    try {
      const pricingOptions = {
        selectedPricingTier: 'free' as const,
        durationMonths: 1,
        autoRenew: false,
        isFirstPost: false
      };

      console.log('📋 Free post data being sent:', {
        jobFormData: jobFormData,
        pricingOptions: pricingOptions
      });

      const result = await initiatePayment('job', jobFormData, pricingOptions);
      
      console.log('✅ Free post result:', result);
      
      if (result.success) {
        console.log('🎉 Free post successful, navigating to success page');
        toast.success('Free job posted successfully!');
        navigate('/post-success?type=free');
      } else {
        console.error('❌ Free post failed:', result.error);
        toast.error(result.error || 'Failed to create free job post. Please try again or contact support.');
      }
    } catch (error) {
      console.error('💥 Free post error caught:', error);
      toast.error('An unexpected error occurred. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    console.log('💳 Starting paid post creation...');
    setIsLoading(true);
    setShowConfirmation(false);

    try {
      // Force Diamond tier to 12 months and $999.99
      const durationMonths = selectedTier === 'diamond' ? 12 : 1;
      
      const pricingOptions = {
        selectedPricingTier: selectedTier as any,
        durationMonths,
        autoRenew: false,
        isFirstPost: false
      };

      console.log('📋 Paid post data being sent:', {
        tier: selectedTier,
        jobFormData: jobFormData,
        pricingOptions: pricingOptions
      });

      const result = await initiatePayment('job', jobFormData, pricingOptions);
      
      console.log('✅ Paid post result:', result);
      
      if (result.success && result.checkoutUrl) {
        console.log('🔄 Redirecting to Stripe checkout:', result.checkoutUrl);
        window.location.href = result.checkoutUrl;
      } else if (result.waitlisted) {
        console.log('📋 Added to waitlist');
        toast.info('Added to Diamond tier waitlist', {
          description: 'Our team will contact you soon.'
        });
        navigate('/dashboard');
      } else {
        console.error('❌ Paid post failed:', result.error);
        toast.error(result.error || 'Failed to create job posting. Please try again or contact support.');
      }
    } catch (error) {
      console.error('💥 Paid post error caught:', error);
      toast.error('An unexpected error occurred. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4"
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Job Details
          </Button>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">
                Choose Your Job Posting Plan
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Select the best plan for your job posting needs
              </p>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8">
            {isLoading ? (
              <div className="text-center py-8">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {selectedTier === 'free' ? 'Creating your free job post...' : 'Setting up your payment...'}
                </p>
              </div>
            ) : (
              <PremiumJobPricingCards
                onSelectTier={handleTierSelect}
                selectedTier={selectedTier}
                disabled={isLoading}
              />
            )}
          </CardContent>
        </Card>

        <PricingConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmPayment}
          tier={selectedTier}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default JobPostingFlow;
