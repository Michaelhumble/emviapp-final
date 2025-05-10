
import React, { useState } from 'react';
import { JobForm } from '@/components/posting/job/JobForm';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import JobPostOptions from '@/components/posting/job/JobPostOptions';
import { calculateJobPostPrice } from '@/utils/posting/jobPricing';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { usePostPayment } from '@/hooks/usePostPayment';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReviewAndPaymentSection from '@/components/posting/sections/ReviewAndPaymentSection';

const JobPost: React.FC = () => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    isFirstPost: true,
    isHotListing: false,
    autoRenew: true,
    durationMonths: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'form' | 'payment'>('form');
  const [formValues, setFormValues] = useState<JobFormValues | null>(null);
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  
  // Handle form submission
  const handleFormSubmit = async (values: JobFormValues) => {
    setFormValues(values);
    setCurrentStep('payment');
  };

  // Handle final submission with pricing
  const handleCreateCheckoutSession = async () => {
    if (!formValues) return;
    
    setIsSubmitting(true);
    
    try {
      // Check if photos were uploaded (optional)
      if (photoUploads.length === 0) {
        console.log("No photos uploaded");
      }
      
      // Calculate price
      const priceResult = calculateJobPostPrice(pricingOptions);
      console.log("Job post price:", priceResult);
      
      // Destructure finalPrice from the returned price object
      const { finalPrice } = priceResult;
      
      // If finalPrice is greater than 0, proceed to payment
      if (finalPrice > 0) {
        // Navigate to payment page with salon data
        const result = await initiatePayment('job', formValues, pricingOptions);
        
        // Add safeguards for the returned result
        if (result?.success) {
          // Handle successful payment initiation
          if (result && 'redirect' in result && result.redirect) {
            // If there's a redirect URL in the response, follow it
            const redirectUrl = typeof result.redirect === 'string' ? result.redirect : '/payment';
            window.location.href = redirectUrl;
          } else if (result && 'data' in result) {
            // Handle case where there's data but no redirect
            toast.success("Job post submitted successfully!");
            navigate('/dashboard');
          }
        } else {
          // Handle payment initiation failure
          toast.error("Failed to process payment. Please try again.");
        }
      } else {
        // For free listings, skip payment and go directly to success
        toast.success("Your job listing has been posted!");
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error submitting job post:", error);
      toast.error("Failed to submit job post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle changes to pricing options
  const handleUpdatePricing = (options: Partial<PricingOptions>) => {
    setPricingOptions(prev => ({ ...prev, ...options }));
  };
  
  // Handle pricing tier selection
  const handlePricingTierChange = (tier: string) => {
    setPricingOptions(prev => ({ ...prev, selectedPricingTier: tier }));
  };
  
  // Go back to form step
  const handleBackToForm = () => {
    setCurrentStep('form');
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Post a Job</h1>
      <p className="text-gray-600 mb-8">
        Create a detailed job listing to attract qualified candidates
      </p>

      {currentStep === 'form' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <JobForm 
              onSubmit={handleFormSubmit}
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              isSubmitting={isSubmitting}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="p-6">
                <h2 className="text-xl font-medium mb-4">Job Post Options</h2>
                <JobPostOptions
                  pricingOptions={pricingOptions}
                  setPricingOptions={handleUpdatePricing}
                />
                
                <Button 
                  onClick={() => document.querySelector('form')?.requestSubmit()}
                  className="w-full mt-4"
                  disabled={isLoading || isSubmitting}
                >
                  {isLoading || isSubmitting ? "Processing..." : "Continue to Pricing"}
                </Button>
                
                <p className="text-xs text-gray-500 mt-4 text-center">
                  By proceeding, you agree to our Terms of Service
                </p>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <ReviewAndPaymentSection
                postType="job"
                pricingOptions={pricingOptions}
                onPricingChange={handlePricingTierChange}
                onUpdatePricing={handleUpdatePricing}
                onNextStep={handleCreateCheckoutSession}
                onPrevStep={handleBackToForm}
                jobData={formValues}
                isFirstPost={pricingOptions.isFirstPost}
                isSubmitting={isSubmitting}
              />
            </Card>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card className="p-6">
                <h2 className="text-xl font-medium mb-4">Job Post Summary</h2>
                {formValues && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Job Title</h3>
                      <p>{formValues.title}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Job Type</h3>
                      <p className="capitalize">{formValues.jobType.replace('-', ' ')}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500">Location</h3>
                      <p>{formValues.location}</p>
                    </div>
                  </div>
                )}
                <Button 
                  onClick={handleBackToForm}
                  variant="outline" 
                  className="w-full mb-2"
                >
                  Edit Job Details
                </Button>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobPost;
