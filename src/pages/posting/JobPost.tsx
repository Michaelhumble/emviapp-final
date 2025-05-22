
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { toast } from 'sonner';

import PostWizardLayout from '@/components/layout/PostWizardLayout';
import { jobFormSchema, JobFormValues } from '@/components/posting/job/jobFormSchema';
import BasicInfoSection from '@/components/posting/sections/BasicInfoSection';
import LocationSection from '@/components/posting/sections/LocationSection';
import DetailsSection from '@/components/posting/sections/DetailsSection';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import CompensationSection from '@/components/posting/sections/CompensationSection';
import ContactInfoSection from '@/components/posting/sections/ContactInfoSection';
import UploadSection from '@/components/posting/sections/UploadSection';
import ReviewSection from '@/components/posting/sections/ReviewSection';

import useRouter from '@/hooks/useRouter';
import { uploadImage } from '@/utils/uploadImage';

const JobPost: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploads, setUploads] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: '',
      salonName: '',
      description: '',
      location: '',
      jobType: 'full-time',
      experience_level: 'entry',
      weekly_pay: false,
      has_housing: false,
      owner_will_train: false,
      no_supply_deduction: false,
      has_wax_room: false,
      isNationwide: false,
      compensationMin: '',
      compensationMax: '',
    }
  });
  
  const totalSteps = 7; // Basic info, Location, Details, Job details, Compensation, Photos, Review
  
  const nextStep = () => {
    const currentValues = form.getValues();
    console.log('Current form values:', currentValues);
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  
  const handleSubmit = async (formValues: JobFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Simulate uploading photos
      const uploadPromises = uploads.map(file => uploadImage(file));
      const uploadedImageUrls = await Promise.all(uploadPromises);
      
      // Combine form values with uploaded images
      const submission = {
        ...formValues,
        photos: uploadedImageUrls
      };
      
      console.log('Final submission:', submission);
      
      // Success notification
      toast.success('Job posted successfully!');
      
      // Navigate to dashboard
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting job post:', error);
      toast.error('Failed to post job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoSection 
          control={form.control} 
          onNext={nextStep} 
        />;
      case 1:
        return <LocationSection 
          control={form.control} 
          onNext={nextStep}
          onPrevious={prevStep}
        />;
      case 2:
        return <DetailsSection 
          control={form.control} 
          onNext={nextStep}
          onPrevious={prevStep}
        />;
      case 3:
        return <JobDetailsSection 
          control={form.control} 
          onNext={nextStep}
          onPrevious={prevStep}
        />;
      case 4:
        return <CompensationSection 
          control={form.control} 
          onNext={nextStep}
          onPrevious={prevStep}
        />;
      case 5:
        return <UploadSection 
          uploads={uploads}
          setUploads={setUploads}
          onNext={nextStep}
          onPrevious={prevStep}
        />;
      case 6:
        return <ReviewSection 
          formValues={form.getValues()} 
          onNext={() => form.handleSubmit(handleSubmit)()}
          onPrevious={prevStep}
          isLastStep
        />;
      default:
        return null;
    }
  };

  return (
    <PostWizardLayout currentStep={currentStep + 1} totalSteps={totalSteps}>
      <Form {...form}>
        <form onSubmit={(e) => e.preventDefault()}>
          {renderStep()}
        </form>
      </Form>
    </PostWizardLayout>
  );
};

export default JobPost;
