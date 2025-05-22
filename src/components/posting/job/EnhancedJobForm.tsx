
import React, { useState } from 'react';
import { jobFormSchema, JobFormValues } from './jobFormSchema';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import JobForm from './JobForm';
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

  // Make sure we don't pass any unexpected properties
  const cleanDefaultValues: Partial<JobFormValues> = {
    salonName: defaultValues.salonName || '',
    title: defaultValues.title || '',
    description: defaultValues.description || '',
    vietnameseDescription: defaultValues.vietnameseDescription || '',
    location: defaultValues.location || '',
    contactEmail: defaultValues.contactEmail || '',
    contactName: defaultValues.contactName || '',
    contactPhone: defaultValues.contactPhone || '',
    industryType: defaultValues.industryType || initialIndustryType || '',
    jobType: defaultValues.jobType || '',
    compensation_type: defaultValues.compensation_type || '',
    compensation_details: defaultValues.compensation_details || '',
    weekly_pay: defaultValues.weekly_pay || '',
    has_housing: defaultValues.has_housing || false,
    has_wax_room: defaultValues.has_wax_room || false,
    owner_will_train: defaultValues.owner_will_train || false,
    no_supply_deduction: defaultValues.no_supply_deduction || false,
    specialties: defaultValues.specialties || [],
  };

  return (
    <JobForm 
      onSubmit={onSubmit}
      onStepChange={handleStepChange}
      maxPhotos={maxPhotos}
      defaultValues={cleanDefaultValues}
      initialIndustryType={initialIndustryType}
    />
  );
};

export default EnhancedJobForm;
