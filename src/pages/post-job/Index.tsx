
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import JobPostForm from '@/components/posting/JobPostForm';
import JobPostPaymentFlow from '@/components/posting/JobPostPaymentFlow';
import { JobDetailsSubmission } from '@/types/job';
import { Card } from '@/components/ui/card';

// Create a job posting wizard with steps
const PostJobPage: React.FC = () => {
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [jobData, setJobData] = useState<JobDetailsSubmission | null>(null);

  const handleJobFormSubmit = (formData: JobDetailsSubmission) => {
    console.log("Job form data:", formData);
    setJobData(formData);
    setStep('payment');
  };

  const handleBackToForm = () => {
    setStep('form');
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {step === 'form' ? 'Post a Job' : 'Choose Your Listing Plan'}
        </h1>

        <Card className="p-6">
          {step === 'form' ? (
            <JobPostForm onSubmit={handleJobFormSubmit} />
          ) : (
            jobData && <JobPostPaymentFlow 
              jobData={jobData} 
              onBack={handleBackToForm}
            />
          )}
        </Card>
      </div>
    </Layout>
  );
};

export default PostJobPage;
