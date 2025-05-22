
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues, JobTemplateType } from '@/components/posting/job/jobFormSchema';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import ContactInfoSection from '@/components/posting/sections/ContactInfoSection';
import JobTemplateSelector from '@/components/posting/job/JobTemplateSelector';
import { MobileButton } from '@/components/ui/mobile-button';
import SpecialtiesRequirementsSection from '@/components/posting/sections/SpecialtiesRequirementsSection';
import PhotoUpload from '@/components/posting/sections/PhotoUpload';
import JobPreview from '@/components/posting/JobPreview';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { getJobTemplate } from '@/utils/jobs/jobTemplates';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { toast } from 'sonner';

// Define the possible steps in the job posting process
type JobPostStep = 'template' | 'details' | 'specialties' | 'contact' | 'photos' | 'preview' | 'payment';

const JobPost = () => {
  // Define state variables
  const [step, setStep] = useState<JobPostStep>('template');
  const [photoUploads, setPhotoUploads] = useState<File[]>([]);
  const [expressMode, setExpressMode] = useState<boolean>(true);
  
  const { handleJobPost } = useJobPosting();
  const navigate = useNavigate();

  // Initialize form with zod resolver
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      salonName: '',
      description: '',
      location: '',
      jobType: 'full-time',
      compensation_type: 'hourly',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      owner_will_train: false,
      no_supply_deduction: false,
      requirements: [],
      specialties: [],
    },
  });

  // Navigation functions between steps
  const goToNextStep = () => {
    switch (step) {
      case 'template': setStep('details'); break;
      case 'details': setStep('specialties'); break;
      case 'specialties': setStep('contact'); break;
      case 'contact': setStep('photos'); break;
      case 'photos': setStep('preview'); break;
      case 'preview': setStep('payment'); break;
      default: break;
    }
  };

  const goToPreviousStep = () => {
    switch (step) {
      case 'details': setStep('template'); break;
      case 'specialties': setStep('details'); break;
      case 'contact': setStep('specialties'); break;
      case 'photos': setStep('contact'); break;
      case 'preview': setStep('photos'); break;
      case 'payment': setStep('preview'); break;
      default: break;
    }
  };

  const handleFormSubmit = async (data: JobFormValues) => {
    console.log('Form submitted with data:', data);

    try {
      const success = await handleJobPost({
        ...data,
        // Add any additional fields needed for job post
        user_id: 'user_123', // Replace with actual user ID from auth context
        status: 'active',
        created_at: new Date().toISOString(),
      });

      if (success) {
        toast.success('Job posted successfully!');
        navigate('/dashboard');
      } else {
        toast.error('Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast.error('Error posting job');
    }
  };

  // Handle template selection
  const handleTemplateSelect = (template: JobFormValues, templateType: JobTemplateType) => {
    form.reset({
      ...template,
      industry: templateType,
    });
    goToNextStep();
  };

  // Get the current step based on the state
  const renderCurrentStep = () => {
    switch (step) {
      case 'template':
        return <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />;
      case 'details':
        return <JobDetailsSection form={form} onNext={goToNextStep} onPrevious={goToPreviousStep} expressMode={expressMode} />;
      case 'specialties':
        return <SpecialtiesRequirementsSection form={form} onNext={goToNextStep} onPrevious={goToPreviousStep} expressMode={expressMode} />;
      case 'contact':
        return <ContactInfoSection form={form} onNext={goToNextStep} onPrevious={goToPreviousStep} />;
      case 'photos':
        return <PhotoUpload photoUploads={photoUploads} setPhotoUploads={setPhotoUploads} />;
      case 'preview':
        return <JobPreview formData={form.getValues()} photoUploads={photoUploads} onEdit={(section) => {
          switch (section) {
            case 'details': setStep('details'); break;
            case 'specialties': setStep('specialties'); break;
            case 'contact': setStep('contact'); break;
            case 'photos': setStep('photos'); break;
            default: break;
          }
        }} />;
      default:
        return <JobTemplateSelector onTemplateSelect={handleTemplateSelect} />;
    }
  };

  // Toggle between express and guided modes
  const toggleExpressMode = () => {
    setExpressMode(!expressMode);
  };

  // Define the current step number and total steps for the progress bar
  const getCurrentStepNumber = () => {
    switch (step) {
      case 'template': return 1;
      case 'details': return 2;
      case 'specialties': return 3;
      case 'contact': return 4;
      case 'photos': return 5;
      case 'preview': return 6;
      case 'payment': return 7;
      default: return 1;
    }
  };

  const totalSteps = 7;

  return (
    <PostWizardLayout 
      currentStep={getCurrentStepNumber()} 
      totalSteps={totalSteps}
      expressMode={expressMode}
      onToggleExpressMode={toggleExpressMode}
    >
      <FormProvider {...form}>
        {renderCurrentStep()}
        
        {/* Navigation buttons for express mode */}
        {expressMode && step !== 'template' && step !== 'preview' && (
          <div className="flex justify-between mt-6">
            <Button variant="outline" type="button" onClick={goToPreviousStep}>
              Previous
            </Button>
            <Button type="button" onClick={goToNextStep}>
              Next
            </Button>
          </div>
        )}
        
        {/* Submit button for preview step */}
        {step === 'preview' && (
          <div className="flex justify-center mt-8">
            <MobileButton onClick={form.handleSubmit(handleFormSubmit)} className="bg-primary hover:bg-primary/90">
              Publish Job
            </MobileButton>
          </div>
        )}
      </FormProvider>
    </PostWizardLayout>
  );
};

export default JobPost;
