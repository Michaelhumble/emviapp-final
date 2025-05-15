
import React, { useState } from 'react';
import JobForm from './JobForm';
import { JobFormValues } from './jobFormSchema';
import { toast } from "sonner";

interface EnhancedJobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: React.Dispatch<React.SetStateAction<File[]>>;
  isSubmitting?: boolean;
  defaultValues?: Partial<JobFormValues>;
}

const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting = false,
  defaultValues = {}
}) => {
  const [formData, setFormData] = useState<JobFormValues | null>(null);

  const handleFormSubmit = (values: JobFormValues) => {
    // Form validation is handled by zod through react-hook-form
    // This is where we can add additional validation if needed
    setFormData(values);

    try {
      // Process form submission
      onSubmit(values);
      
      // Success handling is done in the parent component
    } catch (error) {
      console.error("Error submitting job form:", error);
      
      // Show error toast
      toast.error("There was a problem saving your job details. Please try again.");
    }
  };

  const jobFormProps = {
    onSubmit: handleFormSubmit,
    photoUploads,
    setPhotoUploads,
    isSubmitting,
    defaultValues
  };

  return <JobForm {...jobFormProps} />;
};

export default EnhancedJobForm;
