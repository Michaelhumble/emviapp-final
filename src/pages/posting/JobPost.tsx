
import React, { useState } from 'react';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import PostWizardLayout from '@/components/posting/PostWizardLayout';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import EnhancedJobForm from '@/components/posting/job/EnhancedJobForm';
import { PricingOptions } from '@/utils/posting/types';
import confetti from 'canvas-confetti';

const JobPost: React.FC = () => {
  const navigate = useNavigate();
  const [expressMode, setExpressMode] = useState<boolean>(true);
  
  const handleSubmit = (data: JobFormValues, photos: File[], pricingOptions: PricingOptions) => {
    console.log('Form submitted:', data);
    console.log('Photos:', photos);
    console.log('Pricing:', pricingOptions);
    
    // Trigger confetti effect on successful submission
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    
    toast.success('Job posting created successfully!');
    navigate('/dashboard');
  };
  
  const handleToggleExpressMode = () => {
    setExpressMode(!expressMode);
  };
  
  return (
    <PostWizardLayout 
      currentStep={1} 
      totalSteps={5}
      expressMode={expressMode}
      onToggleExpressMode={handleToggleExpressMode}
    >
      <EnhancedJobForm onSubmit={handleSubmit} />
    </PostWizardLayout>
  );
};

export default JobPost;
