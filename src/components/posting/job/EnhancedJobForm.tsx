
import React from 'react';
import { JobForm } from './JobForm';
import { JobFormValues } from './jobFormSchema';
import JobPostingHeader from '../JobPostingHeader';
import { Separator } from '@/components/ui/separator';

interface EnhancedJobFormProps {
  onSubmit: (values: JobFormValues) => void;
  photoUploads: File[];
  setPhotoUploads: (files: File[]) => void;
  isSubmitting: boolean;
}

export const EnhancedJobForm: React.FC<EnhancedJobFormProps> = ({ 
  onSubmit, 
  photoUploads, 
  setPhotoUploads, 
  isSubmitting 
}) => {
  return (
    <div className="space-y-8">
      <JobPostingHeader />
      
      <Separator className="my-8" />
      
      <JobForm 
        onSubmit={onSubmit}
        photoUploads={photoUploads}
        setPhotoUploads={setPhotoUploads}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
