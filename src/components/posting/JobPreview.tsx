
import React from 'react';
import { Card } from '@/components/ui/card';
import { JobDetailsSubmission } from '@/types/job';
import JobPostPreview from '@/components/posting/job/JobPostPreview';

interface JobPreviewProps {
  jobDetails: JobDetailsSubmission;
}

export const JobPreview: React.FC<JobPreviewProps> = ({ jobDetails }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Job Preview</h2>
      <JobPostPreview jobDetails={jobDetails} />
    </Card>
  );
};
