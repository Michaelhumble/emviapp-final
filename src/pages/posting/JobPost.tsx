
import React, { useState } from 'react';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import { JobDetailsSubmission } from '@/types/job';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PRICING_TIERS } from '@/utils/pricing';
import { PaymentOptions } from '@/types/PriceDetails';
import PaymentSummary from '@/components/posting/PaymentSummary';

// Example JobPost component
const JobPost = () => {
  const [jobDetails, setJobDetails] = useState<JobDetailsSubmission>({
    title: '',
    description: '',
    location: '',
    company: '',
  });
  
  const [selectedTierId, setSelectedTierId] = useState<string>('standard');
  const { initiatePayment, isLoading } = usePostPayment();
  
  const handleJobDetailsChange = (details: Partial<JobDetailsSubmission>) => {
    setJobDetails(prevDetails => ({ ...prevDetails, ...details }));
  };

  const selectedTier = PRICING_TIERS.find(tier => tier.id === selectedTierId) || PRICING_TIERS[1]; // Default to standard
  const isFreePlan = selectedTierId === 'free';

  const handleProceedToPayment = async () => {
    try {
      // Validate job details
      if (!jobDetails.title || !jobDetails.description || !jobDetails.location) {
        toast.error("Please complete all required job details");
        return;
      }

      // For free tier, show confirmation and return
      if (isFreePlan) {
        toast.success("Free job posting submitted successfully!");
        return;
      }

      // For paid tiers, use Stripe checkout
      const pricingOptions: PaymentOptions = {
        selectedPricingTier: selectedTierId,
        durationMonths: 1, // Fixed to single month option
        autoRenew: false
      };
      
      const result = await initiatePayment('job', jobDetails, pricingOptions);
      
      if (!result.success) {
        toast.error("Failed to process payment. Please try again.");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error("An error occurred while processing your payment. Please try again.");
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Post a Job</h1>
      
      {/* Job Details Section */}
      <JobDetailsSection 
        details={jobDetails}
        onChange={handleJobDetailsChange}
      />
      
      {/* Simplified Pricing Section */}
      <Card className="p-6 space-y-6">
        <h2 className="text-2xl font-bold">Select a Plan</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {PRICING_TIERS.map(tier => (
            <div
              key={tier.id}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedTierId === tier.id 
                  ? "border-purple-500 bg-purple-50" 
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedTierId(tier.id)}
            >
              <div className="font-bold capitalize">{tier.label}</div>
              <div className="mt-2 font-medium">
                {tier.id === 'free' ? 'Free' : `$${(tier.priceInCents / 100).toFixed(2)}`}
              </div>
            </div>
          ))}
        </div>
        
        {/* Payment Summary */}
        <PaymentSummary
          tier={selectedTier.label}
          priceInCents={selectedTier.priceInCents}
          onProceedToPayment={handleProceedToPayment}
          isFreePlan={isFreePlan}
          isSubmitting={isLoading}
          isDisabled={false}
        />
      </Card>
    </div>
  );
};

export default JobPost;
