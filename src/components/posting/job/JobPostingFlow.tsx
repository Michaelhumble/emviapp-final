
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import JobPricingTable from './JobPricingTable';

interface JobPostingFlowProps {
  jobFormData: any;
  onBack: () => void;
}

type FlowStep = 'pricing' | 'payment' | 'processing';

const JobPostingFlow: React.FC<JobPostingFlowProps> = ({ jobFormData, onBack }) => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('pricing');
  const [selectedPricing, setSelectedPricing] = useState<{
    tier: string;
    finalPrice: number;
    durationMonths: number;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePricingSelect = async (tier: string, finalPrice: number, durationMonths: number) => {
    console.log('Pricing selected:', { tier, finalPrice, durationMonths });
    setSelectedPricing({ tier, finalPrice, durationMonths });
    setIsProcessing(true);

    try {
      if (!user) {
        toast.error('Please log in to continue');
        navigate('/login');
        return;
      }

      // Create Stripe checkout session
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

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Job Details
          </button>
        </div>
        
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Posting Plan</h1>
          <p className="text-gray-600">Select the plan that best fits your hiring needs</p>
        </div>
        
        <JobPricingTable
          onPricingSelect={handlePricingSelect}
          jobData={jobFormData}
        />
      </div>
    </div>
  );
};

export default JobPostingFlow;
