
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import JobPricingTable from './JobPricingTable';
import PricingConfirmationModal from './PricingConfirmationModal';

interface JobPostingFlowProps {
  jobFormData: any;
  onBack: () => void;
}

type FlowStep = 'pricing' | 'confirmation' | 'processing';

const JobPostingFlow: React.FC<JobPostingFlowProps> = ({ jobFormData, onBack }) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('pricing');
  const [selectedPricing, setSelectedPricing] = useState<{
    tier: string;
    finalPrice: number;
    durationMonths: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePricingSelect = (tier: string, finalPrice: number, durationMonths: number) => {
    console.log('Pricing selected:', { tier, finalPrice, durationMonths });
    
    // For Diamond tier, force 12-month duration and $999.99 pricing - NO OTHER OPTIONS
    if (tier === 'diamond') {
      setSelectedPricing({ tier, finalPrice: 999.99, durationMonths: 12 });
    } else {
      setSelectedPricing({ tier, finalPrice, durationMonths });
    }
    
    // For free tier, skip confirmation
    if (tier === 'free') {
      proceedToPayment(tier, finalPrice, durationMonths);
    } else {
      setShowConfirmation(true);
    }
  };

  const proceedToPayment = async (tier: string, finalPrice: number, durationMonths: number) => {
    setShowConfirmation(false);
    setIsProcessing(true);

    try {
      if (!user) {
        toast.error('Please log in to continue');
        navigate('/login');
        return;
      }

      // For Diamond tier, enforce fixed pricing and duration - NO EXCEPTIONS
      if (tier === 'diamond') {
        finalPrice = 999.99;
        durationMonths = 12;
      }

      // For free tier, create job posting directly without payment
      if (finalPrice === 0) {
        console.log('Creating free job post with data:', jobFormData);
        
        const { data, error } = await supabase.functions.invoke('create-free-post', {
          body: {
            postType: 'job',
            postDetails: {
              ...jobFormData,
              pricing_tier: tier,
              status: 'active',
              expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
            },
            pricingOptions: {
              selectedPricingTier: tier,
              isFirstPost: true
            },
            idempotencyKey: `free-job-${user.id}-${Date.now()}`
          }
        });

        if (error) {
          console.error('Free job creation error:', error);
          toast.error('Failed to create free job posting');
          setIsProcessing(false);
          return;
        }

        console.log('Free job created successfully:', data);
        toast.success('Free job posting created successfully!');
        navigate('/post-success?free=true');
        return;
      }

      // Create Stripe checkout session for paid plans
      const { data, error } = await supabase.functions.invoke('create-job-checkout', {
        body: {
          tier,
          finalPrice,
          durationMonths,
          jobData: jobFormData
        }
      });

      if (error) {
        console.error('Stripe checkout error:', error);
        toast.error('Failed to create payment session');
        setIsProcessing(false);
        return;
      }

      if (data?.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        toast.error('No checkout URL received');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment processing failed');
      setIsProcessing(false);
    }
  };

  const handleConfirmPayment = () => {
    if (selectedPricing) {
      proceedToPayment(
        selectedPricing.tier,
        selectedPricing.finalPrice,
        selectedPricing.durationMonths
      );
    }
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 flex items-center justify-center">
        <div className="text-center bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Processing your request...</p>
          <p className="text-sm text-gray-500 mt-2">This will only take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            ← Back to Job Details
          </button>
        </div>
        
        <JobPricingTable
          onPricingSelect={handlePricingSelect}
          jobData={jobFormData}
        />

        {/* Pricing Confirmation Modal */}
        <PricingConfirmationModal
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          selectedTier={selectedPricing?.tier || ''}
          finalPrice={selectedPricing?.finalPrice || 0}
          durationMonths={selectedPricing?.durationMonths || 1}
          onConfirmPayment={handleConfirmPayment}
        />
      </div>
    </div>
  );
};

export default JobPostingFlow;
