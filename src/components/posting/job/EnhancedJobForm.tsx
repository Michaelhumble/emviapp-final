
import React from 'react';
import { JobForm } from './JobForm';
import { JobFormValues } from './jobFormSchema';
import JobPostingHeader from '../JobPostingHeader';
import { Separator } from '@/components/ui/separator';
import PostHeader from '../PostHeader';
import MotivationalFooter from '../MotivationalFooter';

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
      <PostHeader 
        title="Find your next artist — the one who stays, thrives, and grows your salon."
        subtitle="Post smart. We'll guide you every step."
      />
      
      <Separator className="my-8" />
      
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 border">
        <JobForm 
          onSubmit={onSubmit}
          photoUploads={photoUploads}
          setPhotoUploads={setPhotoUploads}
          isSubmitting={isSubmitting}
        />
      </div>
      
      <div className="max-w-3xl mx-auto">
        <MotivationalFooter 
          icon="🫶"
          message="Artists check for new jobs every morning. Make yours the one they remember."
          subMessage="Post now — and let the best artists come to you."
        />
      </div>
    </div>
  );
};

export default EnhancedJobForm;
