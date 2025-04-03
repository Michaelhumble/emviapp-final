
import { useState } from "react";
import JobListingCard from "@/components/jobs/JobListingCard";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { Job } from "@/types/job";

interface JobsGridProps {
  jobs: Job[];
  expirations: Record<string, boolean>;
  currentUserId?: string;
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
}

const JobsGrid = ({ 
  jobs, 
  expirations, 
  currentUserId, 
  onRenew, 
  isRenewing,
  renewalJobId
}: JobsGridProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const isExpired = (jobId: string) => {
    return expirations[jobId] === true;
  };

  // View detailed job information
  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  // Close job detail modal
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
            isExpired={isExpired(job.id)}
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
