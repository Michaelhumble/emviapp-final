
// Update JobListingCard component to handle both created_at and createdAt
import React from 'react';
import { Building } from 'lucide-react';
import { Job } from '@/types/job';
import { JobSummary } from './card-sections/JobSummary';
import { useTranslation } from '@/hooks/useTranslation';

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
  const { t } = useTranslation();
  
  // Create a compatibility layer for the date property - explicitly cast to string
  const jobCreatedAt = job.created_at ? String(job.created_at) : '';
  // Create a compatibility layer for salary/compensation
  const jobCompensation = 'salary' in job ? job.salary as string : 
                   job.compensation_details || job.compensation_type || '';
                   
  // Display salon name with fallback
  const displaySalonName = job.salonName || job.company || t({
    english: "Unknown Salon",
    vietnamese: "Tiệm không xác định"
  });
  
  return (
    // Component implementation...
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="p-4">
        <div className="flex items-center mb-1">
          <Building className="h-4 w-4 mr-1.5 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">{displaySalonName}</span>
        </div>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        
        <JobSummary 
          employmentType={job.employment_type} 
          salaryRange={jobCompensation} 
          createdAt={jobCreatedAt} 
        />
        
        <div className="mt-4">
          <button 
            onClick={onViewDetails}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {t({
              english: "View Details",
              vietnamese: "Xem chi tiết"
            })}
          </button>
          
          {isExpired && onRenew && (
            <button
              onClick={onRenew}
              disabled={isRenewing}
              className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {isRenewing ? t({
                english: "Processing...",
                vietnamese: "Đang xử lý..."
              }) : t({
                english: "Renew Listing",
                vietnamese: "Gia hạn tin đăng"
              })}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListingCard;
