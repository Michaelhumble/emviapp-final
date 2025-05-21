import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import ContactInfoSection from '../sections/ContactInfoSection';
import JobDetailsSection from '../sections/JobDetailsSection';
import RequirementsSection from '../sections/RequirementsSection';
import UploadSection from '../sections/UploadSection';
import PricingSection from '../sections/PricingSection';
import { usePricing } from '@/context/pricing/PricingContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: any) => Promise<boolean>;
  onStepChange: (step: number) => void;
  maxPhotos?: number;
  defaultValues?: Partial<JobFormValues>; // Make sure defaultValues is defined in the props
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  onStepChange, 
  maxPhotos = 5,
  defaultValues = {} // Default to empty object if not provided
}) => {
  console.log("EnhancedJobForm rendering with defaultValues:", defaultValues);
  
  // Initialize the form with default values including salonName
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
      salonName: '', // Initialize salonName field
      contactEmail: '',
      contactName: '',
      contactPhone: '',
      ...defaultValues, // Override with any provided defaultValues
    },
  });

  // Log the form state for debugging
  React.useEffect(() => {
    console.log("Form initialized with values:", form.getValues());
    // Check registration of salonName field
    console.log("salonName field: ", form.getValues('salonName'));
  }, [form]);

  const [step, setStep] = React.useState(1);
  const [uploads, setUploads] = React.useState<File[]>([]);
  const { pricingOptions } = usePricing();
  const navigate = useNavigate();

  const handleNext = () => {
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

    const success = await onSubmit(data, uploads, pricingOptions);
    if (success) {
      toast.success('Job post created successfully!');
      navigate('/dashboard');
    } else {
      toast.error('Failed to create job post.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <div className="bg-yellow-50 p-3 border border-yellow-200 rounded mb-4">
          <p>Debug: EnhancedJobForm is rendering. Form values: {JSON.stringify(form.getValues())}</p>
        </div>
        
        {/* Check if we're on step 1 (contact info) */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Information Section:</h3>
            <ContactInfoSection form={form} />
          </div>
        )}

        {/* Step 2: Job Details */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Job Details Section:</h3>
            <JobDetailsSection form={form} />
          </div>
        )}

        {/* Step 3: Requirements and Uploads */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Requirements and Media:</h3>
            <RequirementsSection form={form} />
            <UploadSection uploads={uploads} setUploads={setUploads} maxPhotos={maxPhotos} />
          </div>
        )}

        {/* Step 4: Pricing - Conditionally render only if step is 4 */}
        {step === 4 && (
          <div>
            <h3 className="text-xl font-bold mb-4">Select Pricing Options:</h3>
            <PricingSection />
          </div>
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
