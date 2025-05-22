
import React, { useState } from 'react';
import { JobPostWrapper } from '@/components/posting/job/JobPostWrapper';
import JobDetailsForm from '@/components/posting/job/JobDetailsForm';
import { JobDetailsSubmission } from '@/types/job';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

// This is the main job posting page component
const PostJob = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobDetails, setJobDetails] = useState<JobDetailsSubmission | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  
  // Validate job details to ensure all required fields are present
  const validateJobDetails = (details: JobDetailsSubmission): string[] => {
    const errors: string[] = [];
    
    // Check required fields
    if (!details.title || details.title.trim() === '') errors.push('Job title is required');
    if (!details.description || details.description.trim() === '') errors.push('Job description is required');
    if (!details.location || details.location.trim() === '') errors.push('Location is required');
    if ((!details.company && !details.salonName) || 
        ((details.company?.trim() === '') && (details.salonName?.trim() === ''))) {
      errors.push('Salon name is required');
    }
    if (!details.jobType) errors.push('Job type is required');
    
    // Check contact info
    if (!details.contact_info) {
      errors.push('Contact information is required');
    } else {
      if (!details.contact_info.owner_name || details.contact_info.owner_name.trim() === '') 
        errors.push('Contact name is required');
      if (!details.contact_info.phone || details.contact_info.phone.trim() === '') 
        errors.push('Contact phone is required');
      if (!details.contact_info.email || details.contact_info.email.trim() === '') 
        errors.push('Contact email is required');
    }
    
    return errors;
  };
  
  // Handle form submission
  const handleJobDetailsSubmitted = (details: JobDetailsSubmission) => {
    // Validate job details
    const errors = validateJobDetails(details);
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      toast.error("Please fill out all required fields");
      return;
    }
    
    // Clear any previous errors
    setValidationErrors([]);
    
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
          <h1 className="text-3xl font-semibold mb-6">Create a Job Posting</h1>
          
          {/* Display validation errors if any */}
          {validationErrors.length > 0 && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-red-800">
                  Please fix the following errors:
                </p>
                <ul className="mt-1 text-xs text-red-700 list-disc list-inside">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          <JobDetailsForm 
            onSubmit={handleJobDetailsSubmitted}
            initialValues={jobDetails || undefined}
          />
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
