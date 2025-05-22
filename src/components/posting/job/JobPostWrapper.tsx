
import React, { useState, useEffect } from 'react';
import { JobDetailsSubmission } from '@/types/job';
import { PricingOptions } from '@/utils/posting/types';
import JobPostPricing from '@/components/posting/job/JobPostPricing';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import ReviewAndPaymentSection from '@/components/posting/sections/ReviewAndPaymentSection';
import { calculatePricing } from '@/utils/posting/pricing';

interface JobPostWrapperProps {
  jobDetails: JobDetailsSubmission;
  onBack: () => void;
}

// Validate required fields in job details
const validateJobDetails = (details: JobDetailsSubmission): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check required fields
  if (!details.title || details.title.trim() === '') errors.push('Job title is required');
  if (!details.description || details.description.trim() === '') errors.push('Job description is required');
  if (!details.location || details.location.trim() === '') errors.push('Location is required');
  if ((!details.company && !details.salonName) || 
      ((details.company?.trim() === '') && (details.salonName?.trim() === ''))) {
    errors.push('Salon name is required');
  }
  if (!details.jobType) errors.push('Job type is required');
  
  // Check contact info
  if (!details.contact_info) {
    errors.push('Contact information is required');
  } else {
    if (!details.contact_info.owner_name || details.contact_info.owner_name.trim() === '') 
      errors.push('Contact name is required');
    if (!details.contact_info.phone || details.contact_info.phone.trim() === '') 
      errors.push('Contact phone is required');
    if (!details.contact_info.email || details.contact_info.email.trim() === '') 
      errors.push('Contact email is required');
  }
  
  return { 
    valid: errors.length === 0,
    errors 
  };
};

export const JobPostWrapper: React.FC<JobPostWrapperProps> = ({ jobDetails, onBack }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'pricing' | 'payment'>('pricing');
  const [pricingOptions, setPricingOptions] = useState<PricingOptions | null>(null);
  const { initiatePayment, isLoading } = usePostPayment();
  const isFirstPost = true; // This would ideally be determined from user data
  
  // Validate job details when component mounts
  useEffect(() => {
    const { valid, errors } = validateJobDetails(jobDetails);
    if (!valid) {
      toast.error("Please fix the following issues: " + errors.join(", "));
      onBack(); // Return to form if validation fails
    }
  }, [jobDetails, onBack]);

  const handleSelectPricingOptions = (options: PricingOptions) => {
    setPricingOptions(options);
    setStep('payment');
  };

  const handleBackToPricing = () => {
    setStep('pricing');
  };

  const handleProceedToPayment = async () => {
    if (!pricingOptions) {
      toast.error("Please select a pricing option first");
      return;
    }

    // Final validation check before payment
    const { valid, errors } = validateJobDetails(jobDetails);
    if (!valid) {
      toast.error("Please fix the following issues: " + errors.join(", "));
      onBack();
      return;
    }

    try {
      // Calculate pricing for display
      const priceData = calculatePricing(
        pricingOptions.selectedPricingTier,
        pricingOptions.durationMonths,
        pricingOptions.autoRenew,
        isFirstPost,
        pricingOptions.isNationwide
      );

      // If this is a free post (first post or free tier)
      if (priceData.finalPrice === 0) {
        toast.success("Your job post has been submitted!");
        navigate('/dashboard/jobs'); // Redirect to jobs dashboard or confirmation page
        return;
      }

      // Otherwise, initiate payment
      const result = await initiatePayment('job', jobDetails, pricingOptions);
      
      if (result?.waitlisted) {
        toast.info("We've received your Diamond tier request. Our team will contact you shortly.");
        navigate('/dashboard/jobs');
      } else if (!result?.success) {
        toast.error("There was an issue processing your payment. Please try again.");
      }
      // If successful, the initiatePayment function will redirect to Stripe checkout
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("There was an issue processing your request. Please try again.");
    }
  };

  // Calculate pricing data for display in the payment review section
  const getPriceData = () => {
    if (!pricingOptions) return { basePrice: 0, originalPrice: 0, finalPrice: 0, discountAmount: 0, discountPercentage: 0 };
    
    const { finalPrice, originalPrice, discountPercentage } = calculatePricing(
      pricingOptions.selectedPricingTier,
      pricingOptions.durationMonths,
      pricingOptions.autoRenew,
      isFirstPost,
      pricingOptions.isNationwide
    );
    
    return {
      basePrice: originalPrice / pricingOptions.durationMonths,
      originalPrice,
      finalPrice,
      discountAmount: originalPrice - finalPrice,
      discountPercentage
    };
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {step === 'pricing' && (
        <div className="space-y-6">
          <div className="flex items-center">
            <button 
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 mr-4"
            >
              ← Back to Job Details
            </button>
            <h2 className="text-2xl font-semibold">Select a Pricing Plan</h2>
          </div>
          
          <JobPostPricing 
            onContinue={handleSelectPricingOptions} 
            isFirstPost={isFirstPost}
          />
        </div>
      )}
      
      {step === 'payment' && pricingOptions && (
        <div className="space-y-6">
          <div className="flex items-center">
            <button 
              onClick={handleBackToPricing}
              className="text-gray-600 hover:text-gray-900 mr-4"
            >
              ← Back to Plans
            </button>
            <h2 className="text-2xl font-semibold">Review & Payment</h2>
          </div>
          
          <ReviewAndPaymentSection
            priceData={getPriceData()}
            durationMonths={pricingOptions.durationMonths}
            autoRenew={pricingOptions.autoRenew || false}
            onAutoRenewChange={(checked) => {
              setPricingOptions({...pricingOptions, autoRenew: checked});
            }}
            onProceedToPayment={handleProceedToPayment}
            isProcessing={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default JobPostWrapper;
