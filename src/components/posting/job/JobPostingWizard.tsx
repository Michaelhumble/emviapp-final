
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BasicJobDetailsForm from './BasicJobDetailsForm';

interface BasicJobFormData {
  salonName: string;
  jobTitle: string;
  location: string;
  employmentType: 'full-time' | 'part-time' | 'contract' | 'temporary';
  compensationType: 'hourly' | 'weekly' | 'monthly';
  salary: string;
}

const JobPostingWizard = () => {
  const [jobData, setJobData] = useState<BasicJobFormData | null>(null);

  const handleJobDetailsSubmit = (data: BasicJobFormData) => {
    setJobData(data);
    console.log('Job details submitted:', data);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-serif">Post a Job</CardTitle>
          <p className="text-sm text-muted-foreground">Create your job posting</p>
        </CardHeader>
        
        <CardContent>
          {!jobData ? (
            <BasicJobDetailsForm onSubmit={handleJobDetailsSubmit} />
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Job Details Submitted Successfully!</h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <p><strong>Salon:</strong> {jobData.salonName}</p>
                <p><strong>Job Title:</strong> {jobData.jobTitle}</p>
                <p><strong>Location:</strong> {jobData.location}</p>
                <p><strong>Employment Type:</strong> {jobData.employmentType}</p>
                <p><strong>Compensation Type:</strong> {jobData.compensationType}</p>
                <p><strong>Salary:</strong> {jobData.salary}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default JobPostingWizard;
