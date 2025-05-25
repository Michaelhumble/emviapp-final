
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { useStripe } from '@/hooks/useStripe';
import { toast } from 'sonner';
import JobPricingTable from './JobPricingTable';
import StripeCheckout from '@/components/payments/StripeCheckout';

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
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isLoading } = useStripe();

  const handlePricingSelect = (tier: string, finalPrice: number, durationMonths: number) => {
    setSelectedPricing({ tier, finalPrice, durationMonths });
    setCurrentStep('payment');
  };

  const handlePaymentSuccess = () => {
    // Create job posting record and redirect to success page
    const jobId = Math.random().toString(36).substr(2, 9); // Generate temporary ID
    toast.success('Job posted successfully!');
    navigate(`/post-success?id=${jobId}`);
  };

  const handlePaymentError = () => {
    toast.error('Payment failed. Please try again.');
    setCurrentStep('pricing');
  };

  if (currentStep === 'pricing') {
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
          
          <JobPricingTable
            onPricingSelect={handlePricingSelect}
            jobData={jobFormData}
          />
        </div>
      </div>
    );
  }

  if (currentStep === 'payment' && selectedPricing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 max-w-2xl">
          <div className="mb-6">
            <button
              onClick={() => setCurrentStep('pricing')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Back to Pricing
            </button>
          </div>
          
          <div className="bg-white rounded-lg border p-6 space-y-6">
            <h2 className="text-2xl font-bold">Complete Your Payment</h2>
            
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-medium capitalize">{selectedPricing.tier}</span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">{selectedPricing.durationMonths} month(s)</span>
              </div>
              <div className="flex justify-between">
                <span>Job Title:</span>
                <span className="font-medium">{jobFormData?.title || 'Job Posting'}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg">${selectedPricing.finalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <StripeCheckout
              amount={selectedPricing.finalPrice}
              productName={`${selectedPricing.tier.charAt(0).toUpperCase() + selectedPricing.tier.slice(1)} Job Posting`}
              buttonText={`Pay $${selectedPricing.finalPrice.toFixed(2)}`}
              onSuccess={handlePaymentSuccess}
              mode="payment"
            />
            
            <p className="text-xs text-gray-500 text-center">
              Your payment is secure and processed by Stripe. You can cancel anytime.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing your payment...</p>
      </div>
    </div>
  );
};

export default JobPostingFlow;
