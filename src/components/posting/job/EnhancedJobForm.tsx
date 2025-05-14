
import React, { useState } from 'react';
import JobForm from './JobForm';
import { JobFormValues } from './jobFormSchema';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [formData, setFormData] = useState<JobFormValues | null>(null);

  const handleFormSubmit = (values: JobFormValues) => {
    // Form validation is handled by zod through react-hook-form
    // This is where we can add additional validation if needed
    setFormData(values);

    try {
      // Process form submission
      onSubmit(values);
      
      // Show success toast - this will be shown by the parent component now
      // so we don't need to duplicate the toast notification
    } catch (error) {
      console.error("Error submitting job form:", error);
      
      // Show error toast
      toast({
        title: "Error submitting form",
        description: "There was a problem saving your job details. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <JobForm
      onSubmit={handleFormSubmit}
      photoUploads={photoUploads}
      setPhotoUploads={setPhotoUploads}
      isSubmitting={isSubmitting}
      defaultValues={defaultValues}
    />
  );
};

export default EnhancedJobForm;
