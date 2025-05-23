
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface JobPostPreviewProps {
  jobData: any;
}

const JobPostPreview: React.FC<JobPostPreviewProps> = ({ jobData }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Job Post Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold">{jobData?.title || 'Job Title'}</h3>
            <p className="text-gray-600">{jobData?.company || 'Company Name'}</p>
          </div>
          <div className="text-sm text-gray-500">
            <p>{jobData?.location || 'Location'}</p>
            <p>{jobData?.employmentType || 'Employment Type'}</p>
          </div>
          <div>
            <p className="text-sm">{jobData?.description || 'Job description will appear here...'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPostPreview;
