
import React from 'react';
import { JobFormProps } from '@/components/posting/job/JobForm';
import JobForm from '@/components/posting/job/JobForm';

/**
 * JobFormAdapter - Adapts interfaces between EnhancedJobForm and JobForm
 * This component exists solely to handle prop mismatches without modifying 
 * the locked job form components
 */
interface JobFormAdapterProps extends JobFormProps {
  photoUploads?: File[];
  maxPhotos?: number;
  // Add any other props that might be passed but aren't in JobFormProps
}

const JobFormAdapter: React.FC<JobFormAdapterProps> = ({
  photoUploads,
  maxPhotos,
  ...validJobFormProps
}) => {
  // Forward only the props that JobForm actually accepts
  return <JobForm {...validJobFormProps} />;
};

export default JobFormAdapter;
