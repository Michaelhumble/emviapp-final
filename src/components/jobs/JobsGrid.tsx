
import { useState } from "react";
import JobListingCard from "@/components/jobs/JobListingCard";
import { JobDetailModal } from "@/components/jobs/JobDetailModal";
import { Job } from "@/types/job";
import { differenceInDays } from 'date-fns';

export interface JobsGridProps {
  jobs: Job[];
  expirations: Record<string, boolean>;
  currentUserId?: string;
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
  onDelete?: (jobId: string) => void;
  checkExpiration?: (job: Job) => boolean;
}

const JobsGrid = ({ 
  jobs, 
  expirations, 
  currentUserId, 
  onRenew, 
  isRenewing,
  renewalJobId,
  onDelete,
  checkExpiration
}: JobsGridProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const isExpired = (job: Job): boolean => {
    if (checkExpiration) {
      return checkExpiration(job);
    }
    
    if (job.status === 'expired') {
      return true;
    }
    
    if (expirations && expirations[job.id] !== undefined) {
      return expirations[job.id];
    }
    
    const createdDate = new Date(job.created_at);
    const now = new Date();
    return differenceInDays(now, createdDate) >= 30;
  };

  const isOwner = (job: Job): boolean => {
    return currentUserId === job.user_id;
  };

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobs.map((job) => (
          <JobListingCard 
            key={job.id}
            job={job}
            isExpired={isExpired(job)}
            currentUserId={currentUserId}
            onViewDetails={() => viewJobDetails(job)} 
            onRenew={() => onRenew(job)}
            onDelete={onDelete && isOwner(job) ? () => onDelete(job.id) : undefined}
            isRenewing={isRenewing && renewalJobId === job.id}
            showOwnerActions={isOwner(job)}
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
