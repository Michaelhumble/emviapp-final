
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import ContactInfoSection from '../sections/ContactInfoSection';
import JobDetailsSection from '../sections/JobDetailsSection';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { JobTemplateType } from '@/utils/jobs/jobTemplates';

// Import sections
import UploadSection from '../sections/UploadSection';
import PricingSection from '../sections/PricingSection';
import JobTemplateSelector from './JobTemplateSelector';
import SpecialtiesRequirementsSection from '../sections/SpecialtiesRequirementsSection';
import { PricingOptions } from '@/utils/posting/types';
import { ProgressBar } from './ProgressBar';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
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
      requirements: [],
      specialties: [],
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      salary_range: '',
      experience_level: '',
      ...defaultFormValues, // Override with any provided defaultValues
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
      // Specialties & Requirements step
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
      // Success handled in the parent component
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
      // Ensure requirements and specialties are arrays
      requirements: Array.isArray(template.requirements) ? template.requirements : [],
      specialties: Array.isArray(template.specialties) ? template.specialties : [],
    });
    setSelectedTemplate(templateType);
    // Move to the next step in guided mode, or stay on the same page in express mode
    if (!expressMode) {
      handleNext();
    }
  };

  // In express mode, we render all sections at once
  if (expressMode) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium mb-4">Step 1: Choose a Template</h2>
            <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium mb-4">Step 2: Specialties & Requirements</h2>
            <SpecialtiesRequirementsSection 
              control={form.control} 
              industry={selectedTemplate || 'custom'} 
            />
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium mb-4">Step 3: Job Details</h2>
            <div className="space-y-6">
              <ContactInfoSection form={form} />
              <JobDetailsSection form={form} />
              <UploadSection uploads={uploads} setUploads={setUploads} maxPhotos={maxPhotos} />
            </div>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-medium mb-4">Step 4: Pricing & Publish</h2>
            <PricingSection onPricingChange={handlePricingOptionsChange} />
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={!pricingOptions} className="ml-auto">
              Publish Job Post
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  // Standard step-by-step wizard mode
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        {/* Progress bar for step tracking */}
        <ProgressBar currentStep={step} totalSteps={4} />
        
        {/* Step 1: Job Template Selection */}
        {step === 1 && (
          <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />
        )}

        {/* Step 2: Specialties & Requirements */}
        {step === 2 && (
          <SpecialtiesRequirementsSection 
            control={form.control} 
            industry={selectedTemplate || 'custom'} 
          />
        )}

        {/* Step 3: Contact Info & Job Details */}
        {step === 3 && (
          <div className="space-y-8">
            <ContactInfoSection form={form} />
            <JobDetailsSection form={form} />
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
