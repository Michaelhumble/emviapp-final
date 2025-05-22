
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues, IndustryType } from '@/components/posting/job/jobFormSchema';
import { Form } from '@/components/ui/form';
import JobTemplateSelector from '@/components/posting/job/JobTemplateSelector';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import ContactInfoSection from '@/components/posting/sections/ContactInfoSection';
import RequirementsSection from '@/components/posting/sections/RequirementsSection';
import SpecialtiesSection from '@/components/posting/sections/SpecialtiesSection';
import IndustrySpecialtiesSection from '@/components/posting/sections/IndustrySpecialtiesSection';
import PhotoUpload from '@/components/posting/sections/PhotoUpload';
import PricingSection from '@/components/posting/sections/PricingSection';
import JobSummary from '@/components/posting/JobSummary';
import PostWizardLayout from '@/components/layout/PostWizardLayout';
import { Button } from '@/components/ui/button';
import { PricingOptions, JobPricingTier } from '@/utils/posting/types';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const JobPost: React.FC = () => {
  const [step, setStep] = useState(1);
  const [showTemplateSelector, setShowTemplateSelector] = useState(true);
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({
    selectedPricingTier: 'standard' as JobPricingTier,
    durationMonths: 1,
    autoRenew: false,
  });

  const navigate = useNavigate();
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      salonName: '',
      description: '',
      vietnameseDescription: '',
      location: '',
      jobType: 'full-time',
      compensation_type: 'hourly',
      compensation_details: '',
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      specialties: [],
      requirements: [],
    }
  });
  
  const handleTemplateSelect = (template: JobFormValues, templateType: IndustryType) => {
    form.reset(template);
    setShowTemplateSelector(false);
  };
  
  const totalSteps = 7;
  
  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    } else {
      setShowTemplateSelector(true);
    }
  };
  
  const onPricingChange = (options: PricingOptions) => {
    setPricingOptions(options);
  };
  
  const handleSubmit = (data: JobFormValues) => {
    console.log('Form submitted:', data);
    console.log('Photos:', photoUploads);
    console.log('Pricing:', pricingOptions);
    
    toast.success('Job posting created successfully!');
    navigate('/dashboard');
  };
  
  if (showTemplateSelector) {
    return (
      <PostWizardLayout currentStep={1} totalSteps={totalSteps}>
        <JobTemplateSelector onSelect={handleTemplateSelect} />
      </PostWizardLayout>
    );
  }
  
  return (
    <PostWizardLayout currentStep={step} totalSteps={totalSteps}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {step === 1 && (
            <JobDetailsSection 
              form={form} 
              onNext={handleNext} 
              onPrevious={() => setShowTemplateSelector(true)} 
            />
          )}
          
          {step === 2 && (
            <ContactInfoSection 
              form={form} 
              onNext={handleNext} 
              onPrevious={handlePrevious} 
            />
          )}
          
          {step === 3 && (
            <RequirementsSection 
              form={form} 
              onNext={handleNext} 
              onPrevious={handlePrevious} 
            />
          )}
          
          {step === 4 && (
            <SpecialtiesSection 
              form={form} 
              onNext={handleNext} 
              onPrevious={handlePrevious} 
            />
          )}
          
          {step === 5 && (
            <IndustrySpecialtiesSection 
              form={form} 
              onNext={handleNext} 
              onPrevious={handlePrevious} 
            />
          )}
          
          {step === 6 && (
            <PhotoUpload 
              photoUploads={photoUploads} 
              setPhotoUploads={setPhotoUploads} 
              maxPhotos={5} 
            />
          )}
          
          {step === 6 && (
            <div className="flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handlePrevious}
              >
                Previous
              </Button>
              <Button 
                type="button"
                onClick={handleNext}
              >
                Next
              </Button>
            </div>
          )}
          
          {step === 7 && (
            <div className="space-y-8">
              <PricingSection 
                onPricingChange={onPricingChange} 
                pricingOptions={pricingOptions} 
                setPricingOptions={setPricingOptions} 
              />
              
              <JobSummary 
                formValues={form.getValues()} 
                photos={photoUploads} 
              />
              
              <div className="flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handlePrevious}
                >
                  Previous
                </Button>
                <Button type="submit">
                  Submit
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </PostWizardLayout>
  );
};

export default JobPost;
