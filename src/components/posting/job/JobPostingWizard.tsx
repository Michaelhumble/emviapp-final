
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { JobFormValues } from './jobFormSchema';
import { usePostPayment } from '@/hooks/usePostPayment';
import { PricingOptions } from '@/utils/posting/types';
import JobTemplates from './JobTemplates';
import JobPricingStep from './JobPricingStep';

// Import existing components
import JobDetailsSection from './JobDetailsSection';
import JobRequirementsSection from './JobRequirementsSection';
import JobDescriptionSection from './JobDescriptionSection';
import JobContactSection from './JobContactSection';

const JobPostingWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<JobFormValues>>({});
  const [selectedPricingOptions, setSelectedPricingOptions] = useState<PricingOptions | null>(null);
  const { initiatePayment, isLoading } = usePostPayment();

  const steps = [
    'Template Selection',
    'Job Details',
    'Requirements',
    'Description',
    'Contact Info',
    'Photos',
    'Pricing',
    'Payment'
  ];

  const handleTemplateSelect = (templateData: Partial<JobFormValues>) => {
    setFormData(templateData);
    setCurrentStep(1);
  };

  const handleFormUpdate = (data: Partial<JobFormValues>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePricingSelect = (pricingOptions: PricingOptions) => {
    setSelectedPricingOptions(pricingOptions);
    setCurrentStep(7); // Move to payment step
  };

  const handlePayment = async () => {
    if (!selectedPricingOptions) return;
    
    try {
      await initiatePayment('job', formData, selectedPricingOptions);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <JobTemplates onTemplateSelect={handleTemplateSelect} />;
      
      case 1:
        return (
          <JobDetailsSection
            formData={formData}
            onUpdate={handleFormUpdate}
          />
        );
      
      case 2:
        return (
          <JobRequirementsSection
            formData={formData}
            onUpdate={handleFormUpdate}
          />
        );
      
      case 3:
        return (
          <JobDescriptionSection
            formData={formData}
            onUpdate={handleFormUpdate}
          />
        );
      
      case 4:
        return (
          <JobContactSection
            formData={formData}
            onUpdate={handleFormUpdate}
          />
        );
      
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Photos (Optional)</h3>
            <p className="text-gray-600">Add photos to make your job listing more attractive</p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500">Photo upload coming soon</p>
            </div>
          </div>
        );
      
      case 6:
        return (
          <JobPricingStep
            formData={formData}
            onPricingSelect={handlePricingSelect}
            isLoading={isLoading}
          />
        );
      
      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Complete Payment</h3>
            {selectedPricingOptions && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-medium">Selected Plan: {selectedPricingOptions.selectedPricingTier}</p>
                <p className="text-sm text-gray-600">Duration: {selectedPricingOptions.durationMonths} months</p>
              </div>
            )}
            <Button 
              onClick={handlePayment}
              disabled={isLoading || !selectedPricingOptions}
              className="w-full"
            >
              {isLoading ? 'Processing...' : 'Complete Payment'}
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Post a Job</CardTitle>
          
          {/* Progress indicator */}
          <div className="flex items-center space-x-2 mt-4">
            {steps.map((step, index) => (
              <React.Fragment key={step}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    index <= currentStep
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-8 ${
                      index < currentStep ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
          
          <p className="text-sm text-gray-600 mt-2">
            Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
          </p>
        </CardHeader>
        
        <CardContent>
          {renderStepContent()}
          
          {/* Navigation buttons */}
          {currentStep > 0 && currentStep < 7 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPostingWizard;
