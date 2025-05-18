
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { PricingOptions } from '@/utils/posting/types';
import { usePostPayment } from '@/hooks/usePostPayment';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import { FormProvider, useForm } from 'react-hook-form';
import { uploadImage } from '@/utils/uploadImage';

const JobPost = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const { handleJobPost } = useJobPosting();
  const { initiatePayment, isLoading } = usePostPayment();
  const formMethods = useForm();

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async (formData: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => {
    // Validate required fields one more time
    if (!formData.title || !formData.description || !formData.location || !formData.contactEmail) {
      toast.error("Please complete all required fields before submitting");
      return false;
    }

    // Ensure requirements and specialties are arrays
    const safeRequirements = Array.isArray(formData.requirements) ? formData.requirements : [];
    const safeSpecialties = Array.isArray(formData.specialties) ? formData.specialties : [];

    try {
      console.log('Form submitted with price tier:', pricingOptions.selectedPricingTier);
      
      // Handle photo upload if any
      let imageUrl = '';
      if (photoUploads.length > 0) {
        try {
          imageUrl = await uploadImage(photoUploads[0]);
          console.log('Image uploaded successfully:', imageUrl);
        } catch (uploadError) {
          console.error('Error uploading photo:', uploadError);
          // Continue with job post even if image upload fails
        }
      }

      // Prepare job details for submission
      const jobDetails = {
        title: formData.title,
        description: formData.description,
        vietnamese_description: formData.vietnameseDescription,
        location: formData.location,
        employment_type: formData.jobType,
        compensation_details: formData.compensation_details,
        salary_range: formData.salary_range,
        experience_level: formData.experience_level,
        contact_info: {
          email: formData.contactEmail,
          owner_name: formData.contactName,
          phone: formData.contactPhone
        },
        specialties: safeSpecialties,
        requirements: safeRequirements,
        post_type: 'job',
        image: imageUrl, // Add the image URL
      };
      
      // For free tier, process directly without payment
      if (pricingOptions.selectedPricingTier === 'free') {
        const success = await handleJobPost(jobDetails);
        
        if (success) {
          toast.success("Your job post has been created successfully!");
          navigate('/jobs');
          return true;
        } else {
          toast.error("Failed to create job post");
          return false;
        }
      } else {
        // For paid tiers, initiate payment
        const result = await initiatePayment('job', jobDetails, pricingOptions);
        return result?.success || false;
      }
    } catch (error) {
      console.error('Error submitting job post:', error);
      toast.error("Error creating job post");
      return false;
    }
  };

  return (
    <FormProvider {...formMethods}>
      <PostWizardLayout currentStep={currentStep} totalSteps={3}>
        <Helmet>
          <title>Post a Job | EmviApp</title>
          <meta 
            name="description" 
            content="Find qualified candidates for your salon position quickly with EmviApp job listings."
          />
        </Helmet>
        
        <EnhancedJobForm 
          onSubmit={handleSubmit}
          onStepChange={handleStepChange}
        />
      </PostWizardLayout>
    </FormProvider>
  );
};

export default JobPost;
