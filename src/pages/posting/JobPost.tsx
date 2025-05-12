
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPostingStats } from '@/utils/posting/types';
import { calculateFinalPrice } from '@/utils/posting/jobPricing';
import { PricingOptions } from '@/types/job';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/auth';
import { usePostPayment } from '@/hooks/usePostPayment';

const JobPost = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [jobDetails, setJobDetails] = useState<JobFormValues | null>(null);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    isFirstPost: false,
    isNationwide: false,
    fastSalePackage: false,
    selectedPricingTier: 'standard',
    durationMonths: 1,
    autoRenew: false,
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userProfile } = useAuth();
  const { initiatePayment, isLoading } = usePostPayment();
  
  // Default user posting stats
  const userPostingStats: UserPostingStats = {
    hasPostedJobs: userProfile?.has_posted_job || false,
    totalPostCount: 0,
    isFirstTimeUser: !userProfile?.has_posted_job,
    referralCredits: 0
  };
  
  // Handle job form submission
  const handleJobFormSubmit = (values: JobFormValues) => {
    console.log('Job form submitted:', values);
    setJobDetails(values);
    
    // Process job posting
    setIsSubmitting(true);
    
    // Calculate the final price
    const basePrice = 19.99;
    let adjustedBasePrice = basePrice;
    
    // Add $5 for nationwide visibility
    if (pricingOptions.isNationwide) {
      adjustedBasePrice += 5;
    }
    
    // Add $5 for fast sale package
    if (pricingOptions.fastSalePackage) {
      adjustedBasePrice += 5;
    }
    
    const priceInfo = calculateFinalPrice(adjustedBasePrice, pricingOptions.durationMonths || 1);
    const finalPrice = typeof priceInfo.finalPrice === 'number' ? priceInfo.finalPrice : 0;
    
    // If the price is greater than 0, redirect to Stripe
    if (finalPrice > 0) {
      initiatePayment('job', values, pricingOptions)
        .then(response => {
          setIsSubmitting(false);
          if (!response?.success) {
            toast({
              title: "Payment error",
              description: "There was an error processing your payment. Please try again.",
              variant: "destructive"
            });
          }
        })
        .catch(error => {
          console.error("Payment initiation error:", error);
          setIsSubmitting(false);
          toast({
            title: "Payment error",
            description: "There was an error processing your payment. Please try again.",
            variant: "destructive"
          });
        });
    } else {
      // For free listings, show success and redirect
      setTimeout(() => {
        toast({
          title: "Job posting created!",
          description: "Your job has been successfully created and is now live.",
        });
        setIsSubmitting(false);
        navigate('/jobs');
      }, 1500);
    }
  };
  
  // Calculate final price - including nationwide and fast sale adjustments
  const basePrice = 19.99;
  let adjustedBasePrice = basePrice;
  
  // Add $5 for nationwide visibility
  if (pricingOptions.isNationwide) {
    adjustedBasePrice += 5;
  }
  
  // Add $5 for fast sale package
  if (pricingOptions.fastSalePackage) {
    adjustedBasePrice += 5;
  }
  
  const priceInfo = calculateFinalPrice(adjustedBasePrice, pricingOptions.durationMonths || 1);
  // Safely extract the finalPrice as a number
  const finalPrice = typeof priceInfo.finalPrice === 'number' ? priceInfo.finalPrice : 0;
  
  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Post a Job</h1>
        <p className="text-gray-600">Find the perfect nail technician for your salon</p>
      </div>
      
      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>
                Enter information about the position you're hiring for
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EnhancedJobForm
                onSubmit={handleJobFormSubmit}
                photoUploads={photoUploads}
                setPhotoUploads={setPhotoUploads}
                isSubmitting={isSubmitting}
                pricingOptions={pricingOptions}
                setPricingOptions={setPricingOptions}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Summary</CardTitle>
              <CardDescription>
                Review your job posting package
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Standard Job Listing</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>
                
                {pricingOptions.isNationwide && (
                  <div className="flex justify-between text-primary">
                    <span>+ Nationwide Visibility</span>
                    <span>$5.00</span>
                  </div>
                )}
                
                {pricingOptions.fastSalePackage && (
                  <div className="flex justify-between text-primary">
                    <span>+ Fast Sale Package</span>
                    <span>$5.00</span>
                  </div>
                )}
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${finalPrice.toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  disabled={isSubmitting || isLoading}
                  onClick={() => jobDetails ? handleJobFormSubmit(jobDetails) : null}
                >
                  {isSubmitting || isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    finalPrice > 0 ? "Continue to Payment" : "Post Job"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobPost;
