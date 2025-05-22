import React from 'react';
import { JobDetailsSubmission } from '@/types/job';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface JobPostWrapperProps {
  jobDetails: JobDetailsSubmission;
  onBack: () => void;
}

export const JobPostWrapper: React.FC<JobPostWrapperProps> = ({ jobDetails, onBack }) => {
  // Validate job details one more time to ensure all required fields are present
  const validateDetails = (): boolean => {
    if (!jobDetails.title || !jobDetails.description || !jobDetails.location || 
        !jobDetails.salonName || !jobDetails.jobType || 
        !jobDetails.contact_info?.owner_name || 
        !jobDetails.contact_info?.phone ||
        !jobDetails.contact_info?.email) {
      return false;
    }
    return true;
  };

  // This is a dummy component for testing validation - actual implementation would continue the posting flow
  const isValid = validateDetails();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="mb-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-1 text-gray-600 mb-4">
            <ArrowLeft size={16} /> Back to details
          </Button>

          <h2 className="text-2xl font-semibold">Review Job Details</h2>
          <p className="text-gray-600">This is step 2 of the job posting process.</p>
        </div>

        {!isValid ? (
          <div className="bg-red-50 p-4 rounded-md border border-red-200 mb-4">
            <h3 className="text-red-700 font-medium">Invalid job details</h3>
            <p className="text-sm text-red-600">
              Please go back and ensure all required fields are filled out correctly.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">{jobDetails.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{jobDetails.salonName} • {jobDetails.location}</p>
              <p className="whitespace-pre-wrap">{jobDetails.description}</p>
            </div>
            
            {/* Job details summary would continue here */}
          </div>
        )}
      </div>
    </div>
  );
};
