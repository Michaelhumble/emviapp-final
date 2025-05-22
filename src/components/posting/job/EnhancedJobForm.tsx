
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import ContactInfoSection from '../sections/ContactInfoSection';
import JobDetailsSection from '../sections/JobDetailsSection';
import RequirementsSection from '../sections/RequirementsSection';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import JobForm from './JobForm';

// Import sections
import UploadSection from '../sections/UploadSection';
import PricingSection from '../sections/PricingSection';
import IndustrySpecialtiesSection from '../sections/IndustrySpecialtiesSection';
import { PricingOptions } from '@/utils/posting/types';

interface EnhancedJobFormProps {
  onSubmit: (data: JobFormValues, uploads: File[], pricingOptions: PricingOptions) => Promise<boolean>;
  onStepChange: (step: number) => void;
  maxPhotos?: number;
  defaultValues?: Partial<JobFormValues>;
  initialIndustryType?: string;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  onStepChange, 
  maxPhotos = 5,
  defaultValues = {},
  initialIndustryType
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Handle step change
  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    onStepChange(step);
  };

  return (
    <JobForm 
      onSubmit={onSubmit}
      onStepChange={handleStepChange}
      maxPhotos={maxPhotos}
      defaultValues={defaultValues}
      initialIndustryType={initialIndustryType}
    />
  );
};

export default EnhancedJobForm;
