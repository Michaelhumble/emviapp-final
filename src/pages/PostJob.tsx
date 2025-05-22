
import React, { useState } from 'react';
import { JobPostWrapper } from '@/components/posting/job/JobPostWrapper';
import JobDetailsForm from '@/components/posting/job/JobDetailsForm';
import { JobDetailsSubmission } from '@/types/job';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// This is the main job posting page component
const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobDetails, setJobDetails] = useState<JobDetailsSubmission | null>(null);
  const [step, setStep] = useState(0);
  
  // Handle form submission
  const handleJobDetailsSubmitted = (details: JobDetailsSubmission) => {
    // Validate required fields before proceeding
    if (!details.title || !details.description || !details.location || 
        !details.company || !details.jobType) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    // Set job details and proceed to next step
    setJobDetails(details);
    setStep(1); // Move to pricing step
    
    // Log successful form submission
    console.log("Job details submitted successfully:", details);
  };
  
  // Go back to details form
  const handleBackToDetails = () => {
    setStep(0);
  };
  
  // If not logged in, show login prompt
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">Post a Job</h1>
          <p>Please log in to post a job listing.</p>
          <Button onClick={() => navigate('/login', { state: { returnTo: '/post-job' } })}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {step === 0 && (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <JobDetailsForm onSubmit={handleJobDetailsSubmitted} />
        </div>
      )}
      
      {step === 1 && jobDetails && (
        <JobPostWrapper 
          jobDetails={jobDetails} 
          onBack={handleBackToDetails}
        />
      )}
    </div>
  );
};

export default PostJob;
