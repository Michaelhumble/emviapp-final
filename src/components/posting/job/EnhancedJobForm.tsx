import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import JobForm from './JobForm';
import { PricingOptions } from '@/utils/posting/types';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowLeft, ArrowRight, PenLine, DollarSign, Image, CheckCircle } from 'lucide-react';
import { MobileButton } from '@/components/ui/mobile-button';
import PhotoUpload from '../sections/PhotoUpload';
import PricingSection from '../sections/PricingSection';
import RequirementsSection from '../sections/RequirementsSection';
import SpecialtiesSection from '../sections/SpecialtiesSection';
import ContactInfoSection from '../sections/ContactInfoSection';
import JobDetailsSection from '../sections/JobDetailsSection';

interface EnhancedJobFormProps {
  onSubmit: (formData: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  onStepChange: (step: number) => void;
  maxPhotos?: number;
  defaultFormValues?: Partial<JobFormValues>;
  expressMode?: boolean;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({
  onSubmit,
  onStepChange,
  maxPhotos = 5,
  defaultFormValues = {},
  expressMode = false,
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    tier: 'standard',
    duration: 30,
    featured: false,
  });

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      ...defaultFormValues
    }
  });
  
  // Determine if form is ready to submit
  const isFormValid = () => {
    if (expressMode) {
      // In express mode, we require all fields to be valid
      return Object.keys(form.formState.errors).length === 0;
    }
    
    // In regular mode, we validate per step
    switch (step) {
      case 1:
        return !form.formState.errors.title && !form.formState.errors.description && !form.formState.errors.location;
      case 2:
        return !form.formState.errors.specialties && !form.formState.errors.jobType;
      case 3:
        return !form.formState.errors.contactName && !form.formState.errors.contactEmail;
      default:
        return true;
    }
  };
  
  const handleContinue = async (e?: React.FormEvent) => {
    e?.preventDefault();
    
    // If we're in express mode, submit the whole form
    if (expressMode) {
      await handleFinalSubmit();
      return;
    }
    
    // In regular mode, advance to the next step
    if (step < 4) {
      setStep(step + 1);
      onStepChange(step + 1);
    } else {
      await handleFinalSubmit();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      onStepChange(step - 1);
    }
  };
  
  const handleFinalSubmit = async () => {
    try {
      setSubmitting(true);
      // Get all form values
      const formValues = form.getValues();
      
      // Submit the form to parent component
      const success = await onSubmit(formValues, photoUploads, pricingOptions);
      
      if (success && !expressMode) {
        // In regular mode, advance to the last step after successful submission
        setStep(4);
        onStepChange(4);
      }
      
      return success;
    } catch (error) {
      console.error('Error submitting job form:', error);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  // Change the tab UI based on express mode
  if (expressMode) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 mb-6 border border-purple-100">
          <h2 className="text-lg font-medium text-purple-900">Express Posting Mode</h2>
          <p className="text-sm text-purple-700">
            Complete all fields below to preview your job post. All fields available on one page for speed.
          </p>
        </div>
        
        <JobForm
          onSubmit={async (data) => {
            const success = await onSubmit(data, photoUploads, pricingOptions);
            return success;
          }}
          defaultValues={defaultFormValues}
        />
        
        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => onStepChange(1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Guided Mode
          </Button>
          
          <MobileButton
            type="button"
            onClick={() => form.handleSubmit(handleContinue)()}
            disabled={submitting || Object.keys(form.formState.errors).length > 0}
            className="bg-gradient-to-r from-primary to-indigo-600 text-white font-medium"
          >
            {submitting ? 'Processing...' : (
              <>
                <PenLine className="h-4 w-4" /> Preview Job Post
              </>
            )}
          </MobileButton>
        </div>
      </div>
    );
  }

  // Regular step-by-step wizard UI
  return (
    <div className="space-y-6">
      <Tabs value={`step-${step}`} className="w-full">
        <TabsList className="grid grid-cols-4 h-auto mb-6">
          <TabsTrigger value="step-1" className={`data-[state=active]:border-b-2 data-[state=active]:border-primary py-2 text-sm`}>
            Job Details
          </TabsTrigger>
          <TabsTrigger value="step-2" className={`data-[state=active]:border-b-2 data-[state=active]:border-primary py-2 text-sm`}>
            Specialties
          </TabsTrigger>
          <TabsTrigger value="step-3" className={`data-[state=active]:border-b-2 data-[state=active]:border-primary py-2 text-sm`}>
            Contact
          </TabsTrigger>
          <TabsTrigger value="step-4" className={`data-[state=active]:border-b-2 data-[state=active]:border-primary py-2 text-sm`}>
            Review
          </TabsTrigger>
        </TabsList>
        
        {/* Content for each step */}
        <TabsContent value={`step-${step}`} className="space-y-4">
          {step === 1 && (
            <Card className="p-4 border-none shadow-none">
              <JobForm
                onSubmit={async (data) => {
                  const success = await onSubmit(data, photoUploads, pricingOptions);
                  return success;
                }}
                defaultValues={defaultFormValues}
              />
            </Card>
          )}
          
          {step === 2 && (
            <Card className="p-4 border-none shadow-none">
              <SpecialtiesSection form={form} />
              <RequirementsSection form={form} />
            </Card>
          )}
          
          {step === 3 && (
            <Card className="p-4 border-none shadow-none">
              <ContactInfoSection form={form} />
            </Card>
          )}
          
          {step === 4 && (
            <Card className="p-4 border-none shadow-none">
              <PricingSection 
                pricingOptions={pricingOptions}
                setPricingOptions={setPricingOptions}
              />
              <PhotoUpload 
                maxPhotos={maxPhotos}
                photoUploads={photoUploads}
                setPhotoUploads={setPhotoUploads}
              />
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
        >
          Back
        </Button>
        
        <Button
          type="button"
          onClick={() => form.handleSubmit(handleContinue)()}
          disabled={submitting || !isFormValid()}
        >
          {step === 4 ? (submitting ? 'Submitting...' : 'Submit') : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default EnhancedJobForm;
