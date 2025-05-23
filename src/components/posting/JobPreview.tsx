
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface JobPreviewProps {
  jobData: any;
}

const JobPreview: React.FC<JobPreviewProps> = ({ jobData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">{jobData?.title || 'Job Title'}</h3>
            <p className="text-gray-600">{jobData?.company || 'Company Name'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{jobData?.location || 'Location'}</p>
          </div>
          <div>
            <p className="text-sm">{jobData?.description || 'Job description will appear here...'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPreview;
