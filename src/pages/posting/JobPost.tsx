
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
    
    // Simulate API call with timeout
    setTimeout(() => {
      toast({
        title: "Job posting created!",
        description: "Your job has been successfully created and is now live.",
      });
      setIsSubmitting(false);
      
      // Navigate to success page or job details
      navigate('/jobs');
    }, 1500);
  };
  
  // Calculate final price - passing both required arguments: basePrice and durationMonths
  const priceInfo = calculateFinalPrice(19.99, pricingOptions.durationMonths || 1);
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
                  <span>${(19.99).toFixed(2)}</span>
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
                  disabled={isSubmitting}
                  onClick={() => handleJobFormSubmit(jobDetails as JobFormValues)}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Continue to Payment"
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
