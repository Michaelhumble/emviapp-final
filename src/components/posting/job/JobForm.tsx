
import React, { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import IndustrySpecialtiesSection from '../sections/IndustrySpecialtiesSection';
import { PricingOptions } from '@/utils/posting/types';
import { getJobTemplate } from '@/utils/templates/jobTemplates';

interface JobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  onStepChange: (step: number) => void;
  maxPhotos?: number;
  defaultValues?: Partial<JobFormValues>;
  initialIndustryType?: string;
}

const JobForm: React.FC<JobFormProps> = ({
  onSubmit,
  onStepChange,
  maxPhotos = 5,
  defaultValues = {},
  initialIndustryType
}) => {
  const [step, setStep] = useState(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPricingOption, setSelectedPricingOption] = useState<PricingOptions>({
    selectedPricingTier: 'premium',
    durationMonths: 1,
    autoRenew: false,
    isFirstPost: true,
  });

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: defaultValues,
    mode: 'onBlur',
  });

  const { watch, setValue, getValues } = form;
  
  // Watch for industry type changes to load templates
  const industryType = watch('industryType');
  
  useEffect(() => {
    if (industryType && industryType !== '') {
      const templateValues = getJobTemplate(industryType);
      
      // Only apply template values if they exist and fields are empty or default
      Object.entries(templateValues).forEach(([key, value]) => {
        // Skip if it's the industryType itself to avoid circular updates
        if (key === 'industryType') return;
        
        // Only set values that are not already set (except for booleans which should be applied)
        const currentValue = getValues(key as keyof JobFormValues);
        if (
          value !== undefined && 
          (currentValue === '' || 
           currentValue === undefined || 
           typeof value === 'boolean')
        ) {
          setValue(key as keyof JobFormValues, value as any, { shouldValidate: false });
        }
      });
      
      // Move to next step automatically when template is selected
      if (step === 1) {
        handleNextStep();
      }
    }
  }, [industryType, setValue, getValues]);

  const handleNextStep = useCallback(() => {
    const newStep = step + 1;
    setStep(newStep);
    onStepChange(newStep);
  }, [step, onStepChange]);

  const handlePreviousStep = useCallback(() => {
    const newStep = step - 1;
    setStep(newStep);
    onStepChange(newStep);
  }, [step, onStepChange]);

  const handleFormSubmit = async (data: JobFormValues) => {
    setIsSubmitting(true);
    try {
      const success = await onSubmit(data, photoUploads, selectedPricingOption);
      if (success) {
        form.reset();
        setPhotoUploads([]);
      }
    } catch (error) {
      console.error('Error submitting job form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the appropriate step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <IndustrySpecialtiesSection 
            control={form.control} 
            industry={initialIndustryType} 
          />
        );
      case 2:
        // Next steps would go here
        return <div>Step 2 Content</div>;
      case 3:
        // Final review would go here
        return <div>Review & Submit</div>;
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        {renderStepContent()}

        <div className="flex justify-between pt-6 border-t border-gray-200">
          {step > 1 ? (
            <Button 
              type="button" 
              variant="outline" 
              onClick={handlePreviousStep}
            >
              Previous
            </Button>
          ) : (
            <div /> // Empty div for spacing
          )}
          
          {step < 3 ? (
            <Button 
              type="button" 
              onClick={handleNextStep}
            >
              Next
            </Button>
          ) : (
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating Job...' : 'Create Job'}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default JobForm;
