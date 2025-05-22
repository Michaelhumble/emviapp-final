
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePostPayment } from '@/hooks/usePostPayment';
import { JobPostPricing } from './JobPostPricing';
import { JobDetailsSubmission } from '@/types/job';
import { PricingOptions } from '@/utils/posting/types';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import PostWizardLayout from '@/components/layout/PostWizardLayout';
import { calculatePricing } from '@/utils/posting/pricing';
import { PaymentSummary } from '@/components/posting/PaymentSummary';
import ReviewAndPaymentSection from '@/components/posting/sections/ReviewAndPaymentSection';

// Define the posting steps for a clearer workflow
enum PostingStep {
  JOB_DETAILS = 0,
  PRICING = 1,
  PAYMENT_REVIEW = 2,
  PROCESSING = 3
}

interface JobPostWrapperProps {
  jobDetails: JobDetailsSubmission;
  onBack: () => void;
}

export const JobPostWrapper: React.FC<JobPostWrapperProps> = ({ 
  jobDetails, 
  onBack 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { initiatePayment, isLoading } = usePostPayment();
  
  // Track the current step in the posting process
  const [currentStep, setCurrentStep] = useState<PostingStep>(PostingStep.PRICING);
  const [isFirstPost, setIsFirstPost] = useState<boolean>(true);
  const [selectedOptions, setSelectedOptions] = useState<PricingOptions | null>(null);
  const [priceData, setPriceData] = useState<any>(null);
  
  // We'd fetch the user's post count from API to determine if it's their first post
  // For now, we'll just assume it's their first post
  
  const handleSelectPlan = (options: PricingOptions) => {
    setSelectedOptions(options);
    
    // Calculate pricing data
    const pricingData = calculatePricing(
      options.selectedPricingTier,
      options.durationMonths,
      options.autoRenew || false,
      isFirstPost,
      options.isNationwide || false
    );
    
    setPriceData({
      basePrice: pricingData.originalPrice / options.durationMonths,
      originalPrice: pricingData.originalPrice,
      finalPrice: pricingData.finalPrice,
      discountAmount: pricingData.originalPrice - pricingData.finalPrice,
      discountPercentage: pricingData.discountPercentage
    });
    
    // Move to payment review step
    setCurrentStep(PostingStep.PAYMENT_REVIEW);
  };

  const handleGoBack = () => {
    if (currentStep === PostingStep.PRICING) {
      // Go back to job details
      onBack();
    } else if (currentStep === PostingStep.PAYMENT_REVIEW) {
      // Go back to pricing
      setCurrentStep(PostingStep.PRICING);
    }
  };
  
  const handleProceedToPayment = async () => {
    if (!user) {
      toast.error("You need to be logged in to post a job");
      navigate('/login', { state: { from: location } });
      return;
    }
    
    if (!selectedOptions) {
      toast.error("Please select a plan first");
      return;
    }
    
    // Move to the processing step
    setCurrentStep(PostingStep.PROCESSING);
    
    try {
      const result = await initiatePayment('job', jobDetails, selectedOptions);
      
      if (result.waitlisted) {
        navigate('/dashboard');
        return;
      }
      
      // If it's a free post or payment was successful, the redirect will happen in the initiatePayment function
      // Otherwise, we should return to the pricing step
      if (!result.success) {
        setCurrentStep(PostingStep.PAYMENT_REVIEW);
        toast.error("There was an issue with your payment. Please try again.");
      }
      
    } catch (error) {
      console.error("Error in job post payment process:", error);
      setCurrentStep(PostingStep.PAYMENT_REVIEW);
      toast.error("There was an error processing your request. Please try again later.");
    }
  };
  
  // Calculate total steps based on the enum
  const totalSteps = Object.keys(PostingStep).length / 2; // Division by 2 because enums have both key/value pairs
  
  return (
    <PostWizardLayout
      currentStep={currentStep + 1} // Add 1 to make it 1-indexed for display
      totalSteps={totalSteps}
    >
      {currentStep === PostingStep.PRICING && (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold">Select Your Plan</h2>
          <p className="text-gray-600">Choose a pricing plan that fits your needs</p>
          
          <JobPostPricing
            onContinue={handleSelectPlan}
            isFirstPost={isFirstPost}
          />
          
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleGoBack}>
              Back to Details
            </Button>
          </div>
        </div>
      )}
      
      {currentStep === PostingStep.PAYMENT_REVIEW && selectedOptions && priceData && (
        <ReviewAndPaymentSection
          priceData={priceData}
          durationMonths={selectedOptions.durationMonths}
          autoRenew={selectedOptions.autoRenew || false}
          onAutoRenewChange={(checked) => {
            if (selectedOptions) {
              const updatedOptions = {
                ...selectedOptions,
                autoRenew: checked
              };
              setSelectedOptions(updatedOptions);
              
              // Recalculate pricing
              const updatedPricing = calculatePricing(
                updatedOptions.selectedPricingTier,
                updatedOptions.durationMonths,
                checked,
                isFirstPost,
                updatedOptions.isNationwide || false
              );
              
              setPriceData({
                basePrice: updatedPricing.originalPrice / updatedOptions.durationMonths,
                originalPrice: updatedPricing.originalPrice,
                finalPrice: updatedPricing.finalPrice,
                discountAmount: updatedPricing.originalPrice - updatedPricing.finalPrice,
                discountPercentage: updatedPricing.discountPercentage
              });
            }
          }}
          onProceedToPayment={handleProceedToPayment}
          isProcessing={isLoading}
        />
      )}
      
      {currentStep === PostingStep.PROCESSING && (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <h2 className="text-xl font-medium">Processing your job post</h2>
          <p className="text-muted-foreground">Please wait while we prepare your listing...</p>
        </div>
      )}
    </PostWizardLayout>
  );
};

export default JobPostWrapper;
