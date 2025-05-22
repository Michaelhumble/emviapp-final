
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import { Card } from '@/components/ui/card';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { useNavigate } from 'react-router-dom';
import { usePostPayment } from '@/hooks/usePostPayment';
import { toast } from 'sonner';
import { PricingOptions } from '@/utils/posting/types';
import ConfettiExplosion from '@/components/ui/ConfettiExplosion';

const JobPost = () => {
  const navigate = useNavigate();
  const { initiatePayment, isLoading } = usePostPayment();
  const [currentStep, setCurrentStep] = useState(1);
  const [expressMode, setExpressMode] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (formData: JobFormValues, photoUploads: File[], pricingOptions: PricingOptions) => {
    try {
      console.log('Form submitted with data:', formData);
      console.log('Salon name in data:', formData.salonName);
      console.log('Pricing options:', pricingOptions);
      
      // Convert form data to the expected format for the API
      const jobDetails = {
        title: formData.title,
        description: formData.description,
        vietnamese_description: formData.vietnameseDescription,
        location: formData.location,
        employment_type: formData.jobType, 
        compensation_type: formData.compensation_type,
        compensation_details: formData.compensation_details,
        weekly_pay: formData.weekly_pay,
        has_housing: formData.has_housing,
        has_wax_room: formData.has_wax_room,
        owner_will_train: formData.owner_will_train,
        no_supply_deduction: formData.no_supply_deduction,
        salary_range: formData.salary_range,
        experience_level: formData.experience_level,
        salonName: formData.salonName,
        contact_info: {
          owner_name: formData.contactName,
          phone: formData.contactPhone,
          email: formData.contactEmail,
        },
        post_type: 'job'
      };
      
      // Initiate payment with our consolidated hook
      const result = await initiatePayment('job', jobDetails, pricingOptions);
      
      if (result.success) {
        setShowConfetti(true);
        toast.success('Job post created successfully!');
        
        // Add a slight delay before navigating to give users a moment to see the success message
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
        
        return true;
      } else {
        toast.error('Error processing your job posting. Please try again.');
        return false;
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error creating job post');
      return false;
    }
  };

  const handleStepChange = (step: number) => {
    console.log(`Changing step to ${step}`);
    setCurrentStep(step);
  };

  const handleToggleExpressMode = () => {
    setExpressMode(!expressMode);
  };

  // Define default values for the form, ensuring salonName is included
  const defaultFormValues: Partial<JobFormValues> = {
    salonName: '',
    contactEmail: '',
    contactName: '',
    contactPhone: '',
    salary_range: '',
    experience_level: ''
  };

  return (
    <PostWizardLayout 
      currentStep={currentStep} 
      totalSteps={4} 
      expressMode={expressMode} 
      onToggleExpressMode={handleToggleExpressMode}
    >
      <Helmet>
        <title>Create Job Listing | EmviApp</title>
        <meta 
          name="description" 
          content="Create a job posting on EmviApp to find qualified beauty professionals."
        />
      </Helmet>

      <Card className="bg-white shadow-md rounded-lg p-6">
        <EnhancedJobForm 
          onSubmit={handleSubmit}
          onStepChange={handleStepChange}
          maxPhotos={5}
          defaultFormValues={defaultFormValues}
          expressMode={expressMode}
        />
      </Card>
      
      {/* Celebration confetti effect on successful job post */}
      {showConfetti && <ConfettiExplosion duration={3000} particleCount={100} />}
    </PostWizardLayout>
  );
};

export default JobPost;
