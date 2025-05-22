
import React, { useState } from 'react';
import { JobDetailsSubmission } from '@/types/job';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface JobPostWrapperProps {
  jobDetails: JobDetailsSubmission;
  onBack: () => void;
}

export const JobPostWrapper: React.FC<JobPostWrapperProps> = ({ jobDetails, onBack }) => {
  // Validate job details one more time to ensure all required fields are present
  const validateDetails = (): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (!jobDetails.title || jobDetails.title.trim() === '') 
      errors.push('Job title is required');
      
    if (!jobDetails.description || jobDetails.description.trim() === '') 
      errors.push('Job description is required');
      
    if (!jobDetails.location || jobDetails.location.trim() === '') 
      errors.push('Location is required');
      
    if ((!jobDetails.company && !jobDetails.salonName) || 
        ((jobDetails.company?.trim() === '') && (jobDetails.salonName?.trim() === ''))) {
      errors.push('Salon name is required');
    }
    
    if (!jobDetails.jobType) 
      errors.push('Job type is required');
    
    // Check contact info
    if (!jobDetails.contact_info) {
      errors.push('Contact information is required');
    } else {
      if (!jobDetails.contact_info.owner_name || jobDetails.contact_info.owner_name.trim() === '') 
        errors.push('Contact name is required');
        
      if (!jobDetails.contact_info.phone || jobDetails.contact_info.phone.trim() === '') 
        errors.push('Contact phone is required');
        
      if (!jobDetails.contact_info.email || jobDetails.contact_info.email.trim() === '') 
        errors.push('Contact email is required');
    }
    
    return { 
      valid: errors.length === 0,
      errors 
    };
  };

  // Run validation immediately
  const [validationResult] = useState(validateDetails());
  
  // If validation fails, show error toast
  React.useEffect(() => {
    if (!validationResult.valid) {
      toast.error("Please go back and fix the following errors:\n" + validationResult.errors.join("\n"));
    }
  }, [validationResult]);

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

        {!validationResult.valid ? (
          <div className="bg-red-50 p-4 rounded-md border border-red-200 mb-4">
            <h3 className="text-red-700 font-medium">Invalid job details</h3>
            <p className="text-sm text-red-600 mb-2">
              Please go back and ensure all required fields are filled out correctly.
            </p>
            <ul className="list-disc pl-5 text-sm text-red-600">
              {validationResult.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">{jobDetails.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{jobDetails.salonName || jobDetails.company} • {jobDetails.location}</p>
              <p className="whitespace-pre-wrap">{jobDetails.description}</p>
            </div>
            
            {/* Job details summary would continue here */}
          </div>
        )}
      </div>
    </div>
  );
};
