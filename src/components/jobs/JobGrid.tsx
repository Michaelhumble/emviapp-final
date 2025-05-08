
import { useState } from "react";
import BilingualJobCard from "@/components/jobs/BilingualJobCard";
import { Job } from "@/types/job";
import JobDetailModal from "@/components/jobs/JobDetailModal";

interface JobGridProps {
  jobs: Job[];
  expirations?: Record<string, boolean>;
  onRenew?: (job: Job) => void;
  isRenewing?: boolean;
  renewalJobId?: string | null;
  onViewDetails?: (job: Job) => void;
}

const JobGrid = ({ 
  jobs, 
  expirations = {}, 
  onRenew, 
  isRenewing = false,
  renewalJobId = null,
  onViewDetails
}: JobGridProps) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const viewJobDetails = (job: Job) => {
    if (onViewDetails) {
      onViewDetails(job);
    } else {
      setSelectedJob(job);
    }
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
            onViewDetails={() => viewJobDetails(job)} 
            onRenew={onRenew ? () => onRenew(job) : undefined}
            isRenewing={isRenewing && renewalJobId === job.id}
            variant={expirations[job.id] ? "expired" : "standard"}
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
