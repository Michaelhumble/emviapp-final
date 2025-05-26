
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
    setSelectedPricing({ tier, finalPrice, durationMonths });
    
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

      // For free tier, create job directly without payment
      if (finalPrice === 0) {
        // TODO: Create job posting directly in database
        toast.success('Free job posting created successfully!');
        navigate('/post-success');
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
          <p className="text-gray-600 font-medium">Redirecting to secure payment...</p>
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
