
// Update JobListingCard component to handle both created_at and createdAt
import React from 'react';
import { Job } from '@/types/job';
import { JobSummary } from './card-sections/JobSummary';

interface JobListingCardProps {
  job: Job;
  isExpired?: boolean;
  onViewDetails: () => void;
  onRenew?: () => void;
  isRenewing?: boolean;
  currentUserId?: string; // Added to match props being passed
}

const JobListingCard: React.FC<JobListingCardProps> = ({
  job,
  isExpired,
  onViewDetails,
  onRenew,
  isRenewing,
  currentUserId, // Added to match props being passed
}) => {
  // Create a compatibility layer for the date property
  const jobCreatedAt = job.created_at || job.createdAt;
  // Create a compatibility layer for salary
  const jobSalary = 'salary' in job ? job.salary : 
                   job.compensation_details || job.compensation_range || '';
  
  return (
    // Component implementation...
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4">
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-gray-600">{job.company}</p>
        
        <JobSummary 
          employmentType={job.employment_type} 
          salaryRange={jobSalary} 
          createdAt={jobCreatedAt} 
        />
        
        <div className="mt-4">
          <button 
            onClick={onViewDetails}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            View Details
          </button>
          
          {isExpired && onRenew && (
            <button
              onClick={onRenew}
              disabled={isRenewing}
              className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {isRenewing ? 'Processing...' : 'Renew Listing'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingCard;
