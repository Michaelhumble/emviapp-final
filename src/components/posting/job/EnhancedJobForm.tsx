
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues, JobTemplateType } from './jobFormSchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { MobileButton } from '@/components/ui/mobile-button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import JobTemplateSelector from './JobTemplateSelector';
import JobDetailsSection from '../sections/JobDetailsSection';
import ContactInfoSection from '../sections/ContactInfoSection'; 
import RequirementsSection from '../sections/RequirementsSection';
import SpecialtiesSection from '../sections/SpecialtiesSection';
import CompensationSection from '../sections/CompensationSection';
import PhotoUpload from '../sections/PhotoUpload';
import { ProgressBar } from './ProgressBar';
import { PricingOptions } from '@/utils/posting/types';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricing: PricingOptions) => Promise<boolean>;
  onStepChange?: (step: number) => void;
  currentStep?: number;
  maxPhotos?: number;
  defaultFormValues?: Partial<JobFormValues>;
  expressMode?: boolean;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  onStepChange,
  currentStep: externalCurrentStep,
  maxPhotos = 5,
  defaultFormValues = {},
  expressMode = false
}) => {
  const [currentStep, setCurrentStep] = useState(expressMode ? 0 : 1); // Start with template selection in express mode
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: true,
    isFirstPost: true,
  });
  
  // Use external step control if provided
  const activeStep = externalCurrentStep !== undefined ? externalCurrentStep : currentStep;

  // Steps configuration
  const totalSteps = expressMode ? 2 : 4; // Express mode has template selection + form

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      salonName: '',
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      jobType: 'full-time',
      specialties: [],
      requirements: [],
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      compensation_type: 'hourly',
      compensation_details: '',
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      salary_range: '',
      experience_level: '',
      ...defaultFormValues,
    },
  });

  // Template selection handler for step 1 in express mode
  const handleTemplateSelect = (template: JobFormValues, templateType: JobTemplateType) => {
    console.log("Template selected:", templateType);
    form.reset({
      ...template,
      // Preserve any user-entered values that might already exist
      salonName: form.getValues('salonName') || template.salonName,
      contactName: form.getValues('contactName') || template.contactName,
      contactEmail: form.getValues('contactEmail') || template.contactEmail,
      contactPhone: form.getValues('contactPhone') || template.contactPhone,
    });
    
    // Move to the next step after template selection
    if (expressMode) {
      handleNextStep();
    }
  };

  // Handle form submission
  const handleFormSubmit = async (data: JobFormValues) => {
    try {
      setIsSubmitting(true);
      const success = await onSubmit(data, photoUploads, pricingOptions);
      
      if (success) {
        // Success handling is managed by the parent component
        return;
      } else {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  // Navigation handlers
  const handleNextStep = () => {
    const nextStep = activeStep + 1;
    if (nextStep <= totalSteps) {
      setCurrentStep(nextStep);
      if (onStepChange) {
        onStepChange(nextStep);
      }
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousStep = () => {
    const prevStep = activeStep - 1;
    if (prevStep >= 0) { // Allow going back to template selection (step 0) in express mode
      setCurrentStep(prevStep);
      if (onStepChange) {
        onStepChange(prevStep);
      }
      window.scrollTo(0, 0);
    }
  };

  // Express mode with template selection first
  if (expressMode && activeStep === 0) {
    return (
      <div className="space-y-6">
        <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
      </div>
    );
  }

  // Express mode form
  if (expressMode && activeStep === 1) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          {/* Template type validation - Check if a template was selected */}
          {!form.getValues('templateType') && (
            <Card className="p-4 border-red-200 bg-red-50 mb-4">
              <p className="text-red-600">Please select a job template first before continuing.</p>
              <Button 
                type="button" 
                onClick={handlePreviousStep}
                variant="outline" 
                className="mt-2"
              >
                Go Back to Templates
              </Button>
            </Card>
          )}
          
          <Card className="p-6">
            <JobDetailsSection form={form} />
          </Card>
          
          <Separator />
          
          <Card className="p-6">
            <CompensationSection form={form} />
          </Card>
          
          <Separator />
          
          <Card className="p-6">
            <RequirementsSection form={form} />
          </Card>
          
          <Separator />
          
          <Card className="p-6">
            <SpecialtiesSection form={form} />
          </Card>
          
          <Separator />
          
          <Card className="p-6">
            <ContactInfoSection form={form} />
          </Card>
          
          <Separator />
          
          <Card className="p-6">
            <PhotoUpload
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              maxPhotos={maxPhotos}
            />
          </Card>
          
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handlePreviousStep}
            >
              Back to Templates
            </Button>
            
            <MobileButton 
              type="submit" 
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              {isSubmitting ? "Submitting..." : "Preview Job Post"}
            </MobileButton>
          </div>
        </form>
      </Form>
    );
  }

  // Regular step-by-step mode
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <ProgressBar currentStep={activeStep} totalSteps={totalSteps} />
        
        {/* Step 1: Job Details */}
        {activeStep === 1 && (
          <>
            <JobDetailsSection form={form} />
            <div className="flex justify-end">
              <MobileButton
                type="button"
                onClick={handleNextStep}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Continue to Compensation
              </MobileButton>
            </div>
          </>
        )}
        
        {/* Step 2: Compensation & Requirements */}
        {activeStep === 2 && (
          <>
            <CompensationSection form={form} />
            <div className="mt-8">
              <RequirementsSection form={form} />
            </div>
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
              >
                Back
              </Button>
              <MobileButton
                type="button"
                onClick={handleNextStep}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Continue to Specialties
              </MobileButton>
            </div>
          </>
        )}
        
        {/* Step 3: Specialties & Contact */}
        {activeStep === 3 && (
          <>
            <SpecialtiesSection form={form} />
            <div className="mt-8">
              <ContactInfoSection form={form} />
            </div>
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
              >
                Back
              </Button>
              <MobileButton
                type="button"
                onClick={handleNextStep}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Continue to Photos
              </MobileButton>
            </div>
          </>
        )}
        
        {/* Step 4: Photos & Submit */}
        {activeStep === 4 && (
          <>
            <PhotoUpload
              photoUploads={photoUploads}
              setPhotoUploads={setPhotoUploads}
              maxPhotos={maxPhotos}
            />
            <div className="flex justify-between mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handlePreviousStep}
              >
                Back
              </Button>
              <MobileButton
                type="submit"
                disabled={isSubmitting}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Create Job Post"}
              </MobileButton>
            </div>
          </>
        )}
      </form>
    </Form>
  );
};

export default EnhancedJobForm;
