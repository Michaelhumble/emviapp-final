
import { useState } from "react";
import BilingualJobCard from "@/components/jobs/BilingualJobCard";
import { Job } from "@/types/job";
import JobDetailModal from "@/components/jobs/JobDetailModal";
import { isJobExpired } from "@/utils/jobs/jobListingFormatter";

interface JobGridProps {
  jobs: Job[];
  expirations: Record<string, boolean>;
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
}

const JobGrid = ({ 
  jobs, 
  expirations, 
  onRenew, 
  isRenewing,
  renewalJobId
}: JobGridProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const checkExpiration = (job: Job): boolean => {
    // First check the expirations record if available
    if (expirations && expirations[job.id] !== undefined) {
      return expirations[job.id];
    }
    
    // Then use our utility function
    return isJobExpired(job);
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
          <BilingualJobCard 
            key={job.id}
            job={job}
            isExpired={checkExpiration(job)}
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

export default JobGrid;
