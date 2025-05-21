
import React, { useState } from 'react';
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

// Import sections
import UploadSection from '../sections/UploadSection';
import PricingSection from '../sections/PricingSection';
import JobTemplateSelector from './JobTemplateSelector';
import IndustrySpecialtiesSection from '../sections/IndustrySpecialtiesSection';
import { JobTemplateType } from '@/utils/jobs/jobTemplates';
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
      industryType: 'nails',
      ...defaultValues, // Override with any provided defaultValues
    },
  });

  const [step, setStep] = useState(1);
  const [uploads, setUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<JobTemplateType | null>(null);
  const navigate = useNavigate();

  const handleNext = () => {
    // Get the current step validation status
    let isValid = false;
    
    if (step === 1) {
      // Template selection step - no validation needed
      setStep(step + 1);
      onStepChange(step + 1);
      return;
    }
    
    if (step === 2) {
      // Only validate the fields in Industry Specialties section
      // Since this is mostly checkboxes, we can just proceed
      setStep(step + 1);
      onStepChange(step + 1);
      return;
    }
    
    if (step === 3) {
      // Validate contact info and job details
      form.trigger(['salonName', 'contactEmail', 'title', 'description', 'location', 'jobType'])
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

  const handleTemplateSelect = (template: JobFormValues, templateType: JobTemplateType) => {
    // When a template is selected, update the form with the template values
    form.reset({
      ...template,
      // Always preserve the salon name from the current form if it exists
      salonName: form.getValues('salonName') || template.salonName,
      // Set the industryType based on the template
      industryType: templateType
    });
    setSelectedTemplate(templateType);
    // Move to the next step
    handleNext();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Step 1: Job Template Selection */}
        {step === 1 && (
          <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
        )}

        {/* Step 2: Industry Specialties */}
        {step === 2 && (
          <IndustrySpecialtiesSection 
            control={form.control} 
            industry={form.getValues('industryType') || selectedTemplate || 'nails'} 
          />
        )}

        {/* Step 3: Contact Info & Job Details */}
        {step === 3 && (
          <div className="space-y-8">
            <ContactInfoSection form={form} />
            <JobDetailsSection form={form} />
            <RequirementsSection control={form.control} />
            <UploadSection uploads={uploads} setUploads={setUploads} maxPhotos={maxPhotos} />
          </div>
        )}

        {/* Step 4: Pricing */}
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
            <Button type="button" onClick={handleNext} className="ml-auto">
              Next
            </Button>
          ) : (
            <Button type="submit" disabled={!pricingOptions} className="ml-auto">
              Submit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default EnhancedJobForm;
