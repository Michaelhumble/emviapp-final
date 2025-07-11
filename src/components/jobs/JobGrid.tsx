
import { useState, useMemo } from "react";
import BilingualJobCard from "@/components/jobs/BilingualJobCard";
import { Job } from "@/types/job";
import { JobDetailModal } from "@/components/jobs/JobDetailModal";
import { sortJobsByTierAndDate } from "@/utils/jobSorting";

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

  // Apply mandatory tier sorting: Diamond > Premium > Gold > Free
  const sortedJobs = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) {
      console.warn('⚠️ [JOB-GRID] Invalid jobs array:', jobs);
      return [];
    }
    
    console.log('🎯 [JOB-GRID] Applying tier sorting to job grid');
    return sortJobsByTierAndDate(jobs);
  }, [jobs]);

  // Add defensive checks
  if (!jobs || !Array.isArray(jobs)) {
    console.warn('⚠️ [JOB-GRID] Invalid jobs array:', jobs);
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Unable to load job listings</p>
      </div>
    );
  }

  const viewJobDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  try {
    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedJobs
            .filter(job => job && job.id) // Filter out invalid jobs
            .map((job) => (
              <BilingualJobCard 
                key={job.id}
                job={job}
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
  } catch (error) {
    console.error('💥 [JOB-GRID] Render error:', error);
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Unable to display job listings</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Refresh Page
        </button>
      </div>
    );
  }
};

export default JobGrid;
