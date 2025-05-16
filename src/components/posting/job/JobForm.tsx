
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { JobFormValues, jobFormSchema } from './jobFormSchema';
import { useTranslation } from '@/hooks/useTranslation';
import JobDetailsSection from '../sections/JobDetailsSection';
import CompensationSection from '../sections/CompensationSection';
import ContactInformationSection from '../sections/ContactInformationSection';
import { Job } from '@/types/job';

interface JobFormProps {
  onSubmit: (values: any) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting: boolean;
  initialValues?: JobFormValues;
}

export const JobForm: React.FC<JobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting,
  initialValues
}) => {
  const { t } = useTranslation();
  
  const [formState, setFormState] = useState({
    jobDetails: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      location: initialValues?.location || '',
      requirements: initialValues?.requirements || [],
      specialties: [],
      weekly_pay: false,
      has_housing: false,
      has_wax_room: false,
      no_supply_deduction: false,
      owner_will_train: false,
    },
    compensation: {
      employment_type: initialValues?.jobType || 'full-time',
      compensation_type: '',
      compensation_details: initialValues?.salary_range || '',
      salary_range: initialValues?.salary_range || '',
      tip_range: '',
      experience_level: initialValues?.experience_level || 'experienced',
    },
    contact_info: {
      owner_name: '',
      phone: '',
      email: initialValues?.contactEmail || '',
      notes: '',
      zalo: '',
    },
  });
  
  const handleJobDetailsChange = (jobDetails: any) => {
    setFormState(prev => ({ ...prev, jobDetails }));
  };
  
  const handleCompensationChange = (compensation: any) => {
    setFormState(prev => ({ ...prev, compensation }));
  };
  
  const handleContactInfoChange = (contact_info: Job['contact_info']) => {
    setFormState(prev => ({ ...prev, contact_info }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Merge form sections into a single object for submission
    const formData = {
      ...formState.jobDetails,
      ...formState.compensation,
      contact_info: formState.contact_info,
    };
    
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <div className="space-y-12">
        {/* Job Details Section */}
        <JobDetailsSection 
          jobDetails={formState.jobDetails}
          onChange={handleJobDetailsChange}
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
        />
        
        {/* Compensation Section */}
        <CompensationSection 
          compensation={formState.compensation}
          onChange={handleCompensationChange}
        />
        
        {/* Contact Information Section */}
        <ContactInformationSection 
          contactInfo={formState.contact_info}
          onChange={handleContactInfoChange}
        />
      </div>
      
      <div className="flex justify-end pt-8 border-t border-border">
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="min-w-[150px]"
        >
          {isSubmitting ? t('Submitting...') : t('Continue')}
        </Button>
      </div>
    </form>
  );
};
