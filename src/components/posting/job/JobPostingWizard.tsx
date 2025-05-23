
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import JobForm from './JobForm';
import JobPricingStep from './JobPricingStep';
import { JobFormValues } from './jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';

type WizardStep = 'form' | 'pricing';

const JobPostingWizard = () => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('form');
  const [jobData, setJobData] = useState<JobFormValues | null>(null);
  const { initiatePayment, isLoading } = usePostPayment();

  const handleFormSubmit = (data: JobFormValues) => {
    setJobData(data);
    setCurrentStep('pricing');
  };

  const handlePricingSubmit = async (pricingOptions: PricingOptions) => {
    if (!jobData) {
      toast.error('Job data is missing. Please go back and fill out the form.');
      return;
    }

    try {
      const result = await initiatePayment('job', jobData, pricingOptions);
      
      if (result.success) {
        // Payment initiated successfully, user will be redirected to Stripe
        // After payment, they'll be redirected to /post-success
      } else if (result.waitlisted) {
        // Diamond tier waitlist case
        toast.info('You have been added to the Diamond tier waitlist.');
      } else {
        toast.error('Failed to initiate payment. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred during payment. Please try again.');
    }
  };

  const goBack = () => {
    if (currentStep === 'pricing') {
      setCurrentStep('form');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Post a Job
          </CardTitle>
          <div className="flex items-center justify-center space-x-4 mt-4">
            <div className={`flex items-center space-x-2 ${currentStep === 'form' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'form' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span>Job Details</span>
            </div>
            <ArrowRight className="text-gray-400" />
            <div className={`flex items-center space-x-2 ${currentStep === 'pricing' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'pricing' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span>Pricing & Payment</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentStep === 'form' && (
            <JobForm onSubmit={handleFormSubmit} />
          )}
          
          {currentStep === 'pricing' && (
            <div>
              <div className="mb-6">
                <Button
                  variant="outline"
                  onClick={goBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Job Details
                </Button>
              </div>
              <JobPricingStep
                onSubmit={handlePricingSubmit}
                isLoading={isLoading}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPostingWizard;
