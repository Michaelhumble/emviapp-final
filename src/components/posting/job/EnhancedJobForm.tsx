
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import ContactInfoSection from '../sections/ContactInfoSection';
import JobDetailsSection from '../sections/JobDetailsSection';
import RequirementsSection from '../sections/RequirementsSection';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Import sections that were missing
import UploadSection from '../sections/UploadSection';
import PricingSection from '../sections/PricingSection';
import { PricingOptions } from '@/utils/posting/types';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  onStepChange: (step: number) => void;
  maxPhotos?: number;
  defaultValues?: Partial<JobFormValues>;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  onStepChange, 
  maxPhotos = 5,
  defaultValues = {}
}) => {
  // Initialize the form with default values including salonName
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      salonName: '',
      title: '',
      description: '',
      location: '',
      contactEmail: '',
      contactName: '',
      contactPhone: '',
      ...defaultValues, // Override with any provided defaultValues
    },
  });

  const [step, setStep] = React.useState(1);
  const [uploads, setUploads] = React.useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = React.useState<PricingOptions | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    // Get the current step validation status
    let isValid = false;
    
    if (step === 1) {
      // Only validate the fields in Contact Info section
      form.trigger(['salonName', 'contactEmail', 'contactName', 'contactPhone'])
        .then(valid => {
          if (valid) {
            setStep(step + 1);
            onStepChange(step + 1);
          }
        });
      return;
    }
    
    if (step === 2) {
      // Only validate the fields in Job Details section
      form.trigger(['title', 'description', 'location', 'jobType', 'compensation_type'])
        .then(valid => {
          if (valid) {
            setStep(step + 1);
            onStepChange(step + 1);
          }
        });
      return;
    }
    
    // Default case - just go to next step
    setStep(step + 1);
    onStepChange(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
    onStepChange(step - 1);
  };

  const handleFormSubmit = async (data: JobFormValues) => {
    console.log('Submitting form with data:', data);
    console.log('Current uploads:', uploads);
    console.log('Pricing options at submit:', pricingOptions);

    if (!pricingOptions) {
      toast.error('Please select pricing options');
      return;
    }

    const success = await onSubmit(data, uploads, pricingOptions);
    if (success) {
      toast.success('Job post created successfully!');
      navigate('/dashboard');
    } else {
      toast.error('Failed to create job post.');
    }
  };

  const handlePricingOptionsChange = (options: PricingOptions) => {
    setPricingOptions(options);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Step 1: Contact Info */}
        {step === 1 && (
          <ContactInfoSection form={form} />
        )}

        {/* Step 2: Job Details */}
        {step === 2 && (
          <JobDetailsSection form={form} />
        )}

        {/* Step 3: Requirements and Uploads */}
        {step === 3 && (
          <div className="space-y-8">
            <RequirementsSection control={form.control} />
            <UploadSection uploads={uploads} setUploads={setUploads} maxPhotos={maxPhotos} />
          </div>
        )}

        {/* Step 4: Pricing - Conditionally render only if step is 4 */}
        {step === 4 && (
          <PricingSection onPricingChange={handlePricingOptionsChange} />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          {step > 1 && (
            <Button type="button" variant="secondary" onClick={handlePrev}>
              Previous
            </Button>
          )}

          {step < 4 ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={!pricingOptions}>
              Submit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default EnhancedJobForm;
