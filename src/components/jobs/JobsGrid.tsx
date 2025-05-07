
import { useState } from "react";
import JobListingCard from "@/components/jobs/JobListingCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { Job } from "@/types/job";
import { differenceInDays } from 'date-fns';

export interface JobsGridProps {
  jobs: Job[];
  expirations: Record<string, boolean>;
  currentUserId?: string;
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
  checkExpiration?: (job: Job) => boolean; // Optional custom expiration checker
}

const JobsGrid = ({ 
  jobs, 
  expirations, 
  currentUserId, 
  onRenew, 
  isRenewing,
  renewalJobId,
  checkExpiration
}: JobsGridProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const isExpired = (job: Job): boolean => {
    // Use custom checker if provided
    if (checkExpiration) {
      return checkExpiration(job);
    }
    
    // If the job is already marked as expired in the database
    if (job.status === 'expired') {
      return true;
    }
    
    // Check if it's in our expirations record
    if (expirations && expirations[job.id] !== undefined) {
      return expirations[job.id];
    }
    
    // Default 30-day expiration logic
    const createdDate = new Date(job.created_at);
    const now = new Date();
    return differenceInDays(now, createdDate) >= 30;
  };

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobListingCard 
            key={job.id}
            job={job}
            isExpired={isExpired(job)}
            currentUserId={currentUserId}
            onViewDetails={() => viewJobDetails(job)} 
            onRenew={() => onRenew(job)}
            isRenewing={isRenewing && renewalJobId === job.id}
          />
        ))}
      </div>
      
      {selectedJob && (
        <JobDetailModal
          job={selectedJob}
          isOpen={!!selectedJob}
          onClose={closeJobDetails}
        />
      )}
    </>
  );
};

export default JobsGrid;
