
import React, { useState } from 'react';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import { JobDetailsSubmission } from '@/types/job';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Example JobPost component
const JobPost = () => {
  const [jobDetails, setJobDetails] = useState<JobDetailsSubmission>({
    title: '',
    description: '',
    location: '',
    company: '',
  });
  
  const [selectedPriceTier, setSelectedPriceTier] = useState<string>('standard');
  const { initiatePayment, isLoading } = usePostPayment();
  
  const handleJobDetailsChange = (details: Partial<JobDetailsSubmission>) => {
    setJobDetails(prevDetails => ({ ...prevDetails, ...details }));
  };
  
  const getPriceInCents = (tier: string): number => {
    switch(tier) {
      case 'free': return 0;
      case 'standard': return 999; // $9.99
      case 'premium': return 1999; // $19.99
      case 'gold': return 2999; // $29.99
      default: return 999;
    }
  };

  const handleProceedToPayment = async () => {
    try {
      // Validate job details
      if (!jobDetails.title || !jobDetails.description || !jobDetails.location) {
        toast.error("Please complete all required job details");
        return;
      }

      // For free tier, show confirmation and return
      if (selectedPriceTier === 'free') {
        toast.success("Free job posting submitted successfully!");
        return;
      }

      // For paid tiers, use Stripe checkout
      const pricingOptions = {
        selectedPricingTier: selectedPriceTier,
        durationMonths: 1, // Simplified to single month option
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
          {['free', 'standard', 'premium', 'gold'].map(tier => (
            <div
              key={tier}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedPriceTier === tier 
                  ? "border-purple-500 bg-purple-50" 
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedPriceTier(tier)}
            >
              <div className="font-bold capitalize">{tier}</div>
              <div className="mt-2 font-medium">
                {tier === 'free' ? 'Free' : `$${(getPriceInCents(tier) / 100).toFixed(2)}`}
              </div>
            </div>
          ))}
        </div>
        
        {/* Payment Button */}
        <div className="pt-6 border-t mt-6">
          <Button 
            onClick={handleProceedToPayment}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Processing...' : selectedPriceTier === 'free' ? 'Post Job' : 'Proceed to Payment'}
          </Button>
          
          <p className="text-sm text-gray-500 text-center mt-4">
            By posting a job, you agree to our terms and conditions.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default JobPost;
