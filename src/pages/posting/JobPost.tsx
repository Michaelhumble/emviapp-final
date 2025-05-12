import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { MultiStepForm, Step } from '@/components/ui/multi-step-form';
import JobDetailsSection from '@/components/posting/sections/JobDetailsSection';
import ReviewAndPaymentSection from '@/components/posting/sections/ReviewAndPaymentSection';
import { createJob } from '@/lib/jobs';
import { PricingOptions } from '@/utils/posting/types';
import { DurationOption } from '@/types/pricing';
import { durationOptions } from '@/utils/posting/jobPricing';
import { useAuth } from '@/context/auth';
import { uploadImage } from '@/lib/imageUpload';
import { JobDetailsSubmission } from '@/types/job';

const JobPost: React.FC = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [jobDetails, setJobDetails] = useState<JobDetailsSubmission>({
    title: '',
    description: '',
    location: '',
    compensation_type: '',
    compensation_details: '',
    employment_type: '',
    requirements: [],
    contact_info: {
      owner_name: '',
      phone: '',
      email: '',
      notes: '',
      zalo: '',
    },
    image: '',
    vietnamese_description: '',
    preferred_languages: [],
    benefits: [],
    features: [],
    salon_type: '',
    specialties: [],
    weekly_pay: false,
    has_housing: false,
    has_wax_room: false,
    no_supply_deduction: false,
    owner_will_train: false,
    tip_range: '',
    salary_range: '',
    is_urgent: false,
    user_id: '',
    post_type: '',
  });
  const [pricingTier, setPricingTier] = useState<string>('standard');
  const [pricingOptions, setPricingOptions] = useState<PricingOptions>({ selectedPricingTier: 'standard' });
  const [isFirstPost, setIsFirstPost] = useState(false);
  const { user } = useAuth();

  const updateJobDetails = useCallback((updates: Partial<JobDetailsSubmission>) => {
    setJobDetails(prevDetails => ({ ...prevDetails, ...updates }));
  }, []);

  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      updateJobDetails({ image: imageUrl });
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload image.');
    }
  };

  const handleSubmit = async (options: PricingOptions) => {
    try {
      if (!user) {
        toast.error('You must be logged in to post a job.');
        return;
      }

      const userId = user.id;
      if (!userId) {
        toast.error('User ID is missing. Please log in again.');
        return;
      }

      const jobData = {
        ...jobDetails,
        user_id: userId,
        pricingTier: pricingTier,
      };

      const newJob = await createJob(jobData, options);

      if (newJob) {
        toast.success('Job posted successfully!');
        router.push('/jobs');
      } else {
        toast.error('Failed to create job post.');
      }
    } catch (error) {
      console.error('Job creation error:', error);
      toast.error('An error occurred while creating the job post.');
    }
  };

  // Fix the handlePricingSelect function to accept a PricingOptions object
  const handlePricingSelect = (options: PricingOptions) => {
    // Extract the selected pricing tier from the options
    const tier = options.selectedPricingTier;
    
    // Use the tier (which is a string) for the selection logic
    setPricingTier(tier);
    
    // Also store the complete options object for later use
    setPricingOptions(options);
    
    // Continue with any existing logic that used the tier string
    setActiveStep(3);
  };

  return (
    <MultiStepForm activeStep={activeStep} onStepChange={setActiveStep}>
      <Step label="Job Details">
        <JobDetailsSection
          jobDetails={jobDetails}
          updateJobDetails={updateJobDetails}
          onImageUpload={handleImageUpload}
        />
      </Step>
      <Step label="Review & Payment">
        <ReviewAndPaymentSection
          onSubmit={handleSubmit}
          durationOptions={durationOptions}
          isFirstPost={isFirstPost}
        />
      </Step>
    </MultiStepForm>
  );
};

export default JobPost;
