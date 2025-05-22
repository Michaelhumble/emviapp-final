
import React from 'react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import PostWizardLayout from '@/components/layout/PostWizardLayout';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { PricingOptions } from '@/utils/posting/types';

const JobPost: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSubmit = (data: JobFormValues, photos: File[], pricingOptions: PricingOptions) => {
    console.log('Form submitted:', data);
    console.log('Photos:', photos);
    console.log('Pricing:', pricingOptions);
    
    toast.success('Job posting created successfully!');
    navigate('/dashboard');
  };
  
  return (
    <PostWizardLayout currentStep={1} totalSteps={5}>
      <EnhancedJobForm onSubmit={handleSubmit} />
    </PostWizardLayout>
  );
};

export default JobPost;
