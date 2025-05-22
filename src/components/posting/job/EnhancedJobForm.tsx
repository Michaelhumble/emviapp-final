
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues, IndustryType } from './jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import JobTemplateSelector from './JobTemplateSelector';
import JobDetailsSection from '../sections/JobDetailsSection';
import ContactInfoSection from '../sections/ContactInfoSection';
import RequirementsSection from '../sections/RequirementsSection';
import SpecialtiesSection from '../sections/SpecialtiesSection';
import PhotoUpload from '../sections/PhotoUpload';
import PricingSection from '../sections/PricingSection';
import JobSummary from './JobSummary';
import { useToast } from '@/hooks/use-toast';
import { getJobTemplate } from '@/utils/jobs/jobTemplates';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, photos: File[], pricingOptions: PricingOptions) => void;
  defaultValues?: Partial<JobFormValues>;
}

const EnhancedJobForm = ({ onSubmit, defaultValues = {} }: EnhancedJobFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [expressMode, setExpressMode] = useState<boolean>(true);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard',
    durationMonths: 1,
    autoRenew: false,
  });

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      salonName: '',
      title: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      specialties: [],
      requirements: [],
      jobType: 'full-time',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      salary_range: '',
      experience_level: '',
      ...defaultValues,
    },
  });

  const handleTemplateSelect = (template: JobFormValues, templateType: IndustryType) => {
    console.log('Template selected:', templateType);
    form.reset(template);
    setStep(2);
  };

  const handlePricingChange = (options: PricingOptions) => {
    setPricingOptions(options);
  };

  const handleToggleExpressMode = () => {
    setExpressMode(!expressMode);
  };

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (data: JobFormValues) => {
    console.log('Form data submitted:', data);
    console.log('Photos:', photoUploads);
    console.log('Pricing options:', pricingOptions);
    
    toast({
      title: "Success!",
      description: "Your job posting has been created and is now live.",
    });
    
    onSubmit(data, photoUploads, pricingOptions);
  };

  // Define the steps for the form
  const renderStep = () => {
    switch (step) {
      case 1:
        return <JobTemplateSelector onSelect={handleTemplateSelect} />;
      case 2:
        if (expressMode) {
          // Express mode - all sections in one page
          return (
            <div className="space-y-10">
              <JobDetailsSection 
                form={form}
              />
              <RequirementsSection 
                form={form}
              />
              <SpecialtiesSection 
                form={form}
              />
              <ContactInfoSection 
                form={form}
              />
              <PhotoUpload 
                photoUploads={photoUploads} 
                setPhotoUploads={setPhotoUploads} 
                onNext={() => goToStep(3)}
                onPrevious={() => goToStep(1)}
              />
              <PricingSection 
                onPricingChange={handlePricingChange} 
                pricingOptions={pricingOptions} 
                setPricingOptions={setPricingOptions}
              />
              
              <div className="flex justify-between pt-6 border-t">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => goToStep(1)}
                >
                  Back to Templates
                </Button>
                <Button 
                  type="button" 
                  onClick={() => goToStep(3)}
                >
                  Preview Post
                </Button>
              </div>
            </div>
          );
        } else {
          // Step by step mode - job details
          return (
            <JobDetailsSection 
              form={form} 
              onNext={() => goToStep(3)} 
              onPrevious={() => goToStep(1)}
            />
          );
        }
      case 3:
        if (expressMode) {
          // Express mode - preview job post
          return (
            <JobSummary 
              formData={form.getValues()}
              photos={photoUploads}
              pricingOptions={pricingOptions}
              onEdit={() => goToStep(2)}
              onSubmit={handleSubmit}
            />
          );
        } else {
          // Step by step mode - requirements
          return (
            <RequirementsSection 
              form={form} 
              onNext={() => goToStep(4)} 
              onPrevious={() => goToStep(2)}
            />
          );
        }
      case 4:
        // Step by step mode - specialties
        return (
          <SpecialtiesSection 
            form={form} 
            onNext={() => goToStep(5)} 
            onPrevious={() => goToStep(3)}
          />
        );
      case 5:
        // Step by step mode - contact info
        return (
          <ContactInfoSection 
            form={form} 
            onNext={() => goToStep(6)} 
            onPrevious={() => goToStep(4)}
          />
        );
      case 6:
        // Step by step mode - photo upload
        return (
          <PhotoUpload 
            photoUploads={photoUploads} 
            setPhotoUploads={setPhotoUploads} 
            onNext={() => goToStep(7)}
            onPrevious={() => goToStep(5)}
          />
        );
      case 7:
        // Step by step mode - pricing
        return (
          <PricingSection 
            onPricingChange={handlePricingChange} 
            pricingOptions={pricingOptions} 
            setPricingOptions={setPricingOptions}
            onNext={() => goToStep(8)}
            onPrevious={() => goToStep(6)}
          />
        );
      case 8:
        // Step by step mode - preview job post
        return (
          <JobSummary 
            formData={form.getValues()}
            photos={photoUploads}
            pricingOptions={pricingOptions}
            onEdit={() => goToStep(2)}
            onSubmit={handleSubmit}
          />
        );
      default:
        return <JobTemplateSelector onSelect={handleTemplateSelect} />;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {renderStep()}
      </form>
    </Form>
  );
};

export default EnhancedJobForm;
