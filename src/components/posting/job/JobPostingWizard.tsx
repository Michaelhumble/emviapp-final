
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
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

  // Validate required fields before allowing progression
  const validateRequiredFields = (data: JobFormValues): boolean => {
    const requiredFields = [
      'salonName',
      'title', 
      'location',
      'contactName',
      'contactPhone',
      'contactEmail'
    ];

    for (const field of requiredFields) {
      const value = data[field as keyof JobFormValues];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return false;
      }
    }
    return true;
  };

  const handleFormSubmit = (data: JobFormValues) => {
    // Validate all required fields are filled
    if (!validateRequiredFields(data)) {
      toast.error('Please fill in all required fields before proceeding', {
        description: 'Salon Name, Job Title, Location, Contact Name, Phone, and Email are required'
      });
      return;
    }

    console.log('Form data validated, proceeding to pricing:', data);
    setJobData(data);
    setCurrentStep('pricing');
  };

  const handlePricingSubmit = async (pricingOptions: PricingOptions) => {
    if (!jobData) {
      toast.error('Job data is missing. Please go back and fill out the form.');
      return;
    }

    console.log('Processing payment with options:', pricingOptions);
    
    try {
      const result = await initiatePayment('job', jobData, pricingOptions);
      
      if (result.success) {
        console.log('Payment initiated successfully');
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

  const goBackToForm = () => {
    setCurrentStep('form');
  };

  const getStepNumber = (step: WizardStep) => {
    switch (step) {
      case 'form': return 1;
      case 'pricing': return 2;
      default: return 1;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Post a Job
          </CardTitle>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <div className={`flex items-center space-x-2 ${currentStep === 'form' ? 'text-blue-600' : 'text-green-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'form' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-green-600 text-white'
              }`}>
                {currentStep === 'form' ? '1' : <Check className="w-4 h-4" />}
              </div>
              <span className="font-medium">Job Details & Contact</span>
            </div>
            
            <ArrowRight className="text-gray-400" />
            
            <div className={`flex items-center space-x-2 ${currentStep === 'pricing' ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep === 'pricing' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="font-medium">Pricing & Payment</span>
            </div>
            
            <ArrowRight className="text-gray-400" />
            
            <div className="flex items-center space-x-2 text-gray-400">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200">
                3
              </div>
              <span className="font-medium">Success</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {currentStep === 'form' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Step 1: Job Details & Contact Information</h3>
                <p className="text-gray-600 text-sm">
                  Please fill in all required fields. All fields marked with * are mandatory.
                </p>
              </div>
              <JobForm onSubmit={handleFormSubmit} />
            </div>
          )}
          
          {currentStep === 'pricing' && (
            <div>
              <div className="mb-6">
                <Button
                  variant="outline"
                  onClick={goBackToForm}
                  className="flex items-center gap-2"
                  disabled={isLoading}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Job Details
                </Button>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Step 2: Choose Your Pricing Plan</h3>
                <p className="text-gray-600 text-sm">
                  Select the plan that best fits your hiring needs. Payment will be processed securely through Stripe.
                </p>
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
