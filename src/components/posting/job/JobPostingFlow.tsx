
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
    console.log('💰 [DEBUG] Pricing selected:', { tier, finalPrice, durationMonths });
    console.log('💰 [DEBUG] Job form data for pricing:', JSON.stringify(jobFormData, null, 2));
    
    // For Diamond tier, force 12-month duration and $999.99 pricing - NO OTHER OPTIONS
    if (tier === 'diamond') {
      setSelectedPricing({ tier, finalPrice: 999.99, durationMonths: 12 });
    } else {
      setSelectedPricing({ tier, finalPrice, durationMonths });
    }
    
    // For free tier, skip confirmation
    if (tier === 'free') {
      console.log('🆓 [DEBUG] Free tier selected, proceeding directly to payment processing');
      proceedToPayment(tier, finalPrice, durationMonths);
    } else {
      console.log('💰 [DEBUG] Paid tier selected, showing confirmation modal');
      setShowConfirmation(true);
    }
  };

  const proceedToPayment = async (tier: string, finalPrice: number, durationMonths: number) => {
    console.log('💳 [DEBUG] proceedToPayment called with:', { tier, finalPrice, durationMonths });
    console.log('💳 [DEBUG] Job data being processed:', JSON.stringify(jobFormData, null, 2));
    
    setShowConfirmation(false);
    setIsProcessing(true);

    try {
      if (!user) {
        console.error('💳 [DEBUG] No user found, redirecting to login');
        toast.error('Please log in to continue');
        navigate('/login');
        return;
      }

      console.log('💳 [DEBUG] User authenticated:', user.id);

      // For Diamond tier, enforce fixed pricing and duration - NO EXCEPTIONS
      if (tier === 'diamond') {
        finalPrice = 999.99;
        durationMonths = 12;
        console.log('💎 [DEBUG] Diamond tier - enforcing fixed pricing');
      }

      // For free tier, create job posting directly without payment
      if (finalPrice === 0) {
        console.log('🆓 [DEBUG] Free job - navigating directly to success page');
        toast.success('Free job posting created successfully!');
        navigate('/post-success');
        return;
      }

      // Create Stripe checkout session for paid plans
      console.log('💰 [DEBUG] Creating Stripe checkout session for paid plan');
      const { data, error } = await supabase.functions.invoke('create-job-checkout', {
        body: {
          tier,
          finalPrice,
          durationMonths,
          jobData: jobFormData
        }
      });

      console.log('💰 [DEBUG] Stripe checkout response:', { data, error });

      if (error) {
        console.error('💰 [DEBUG] Stripe checkout error:', error);
        toast.error('Failed to create payment session');
        setIsProcessing(false);
        return;
      }

      if (data?.url) {
        console.log('💰 [DEBUG] Redirecting to Stripe checkout:', data.url);
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        console.error('💰 [DEBUG] No checkout URL received in response');
        toast.error('No checkout URL received');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('💥 [DEBUG] Payment error:', error);
      console.error('💥 [DEBUG] Error stack trace:', error instanceof Error ? error.stack : 'No stack trace');
      toast.error('Payment processing failed');
      setIsProcessing(false);
    }
  };

  const handleConfirmPayment = () => {
    console.log('✅ [DEBUG] Payment confirmed, proceeding...');
    if (selectedPricing) {
      proceedToPayment(
        selectedPricing.tier,
        selectedPricing.finalPrice,
        selectedPricing.durationMonths
      );
    }
  };

  if (isProcessing) {
    console.log('⏳ [DEBUG] Showing processing screen');
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

