
import JobsByIndustrySection from "./JobsByIndustrySection";
import { Job } from "@/types/job";

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
  return (
    <JobsByIndustrySection
      jobs={jobs}
      expirations={expirations}
      currentUserId={currentUserId}
      onRenew={onRenew}
      isRenewing={isRenewing}
      renewalJobId={renewalJobId}
      onDelete={onDelete}
      checkExpiration={checkExpiration}
    />
  );
};

export default JobsGrid;
