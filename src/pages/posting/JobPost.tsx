
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

const JobPost: React.FC = () => {
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    isFirstPost: true,
    isHotListing: false // Add missing field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  
  // Handle form submission
  const handleFormSubmit = async (values: JobFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Check if photos were uploaded (optional)
      if (photoUploads.length === 0) {
        console.log("No photos uploaded");
      }
      
      // Calculate price
      const price = calculateJobPostPrice(pricingOptions);
      console.log("Job post price:", price);
      
      // If price is greater than 0, proceed to payment
      if (price > 0) {
        // Navigate to payment page with salon data
        const result = await initiatePayment('job', values, pricingOptions);
        
        // Add safeguards for the returned result
        if (result?.success) {
          // Handle successful payment initiation
          if (result.hasOwnProperty('redirect') && result.redirect) {
            // If there's a redirect URL in the response, follow it
            window.location.href = typeof result.redirect === 'string' ? result.redirect : '/payment';
          }
          
          // Handle case where there's data but no redirect
          if (result.hasOwnProperty('data')) {
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
  const handleUpdatePricing = (options: PricingOptions) => {
    setPricingOptions(options);
  };

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-2">Post a Job</h1>
      <p className="text-gray-600 mb-8">
        Create a detailed job listing to attract qualified candidates
      </p>

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
                {isLoading || isSubmitting ? "Processing..." : "Post Job"}
              </Button>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                By proceeding, you agree to our Terms of Service
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
