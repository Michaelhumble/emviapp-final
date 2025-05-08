
import { useState } from "react";
import BilingualJobCard from "@/components/jobs/BilingualJobCard";
import { Job } from "@/types/job";
import JobDetailModal from "@/components/jobs/JobDetailModal";

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

  const viewJobDetails = (job: Job) => {
    console.log("Opening job details for:", job.title);
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
            onViewDetails={() => viewJobDetails(job)} 
            onRenew={() => onRenew(job)}
            isRenewing={isRenewing && renewalJobId === job.id}
          />
        ))}
      </div>
      
      <JobDetailModal
        job={selectedJob}
        isOpen={selectedJob !== null}
        onClose={closeJobDetails}
      />
    </>
  );
};

export default JobGrid;
