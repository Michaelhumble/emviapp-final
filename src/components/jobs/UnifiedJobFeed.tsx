
import { Job } from "@/types/job";
import JobGrid from "./JobGrid";
import { useState } from "react";

interface UnifiedJobFeedProps {
  jobs: Job[];
  onRenew: (job: Job) => void;
  isRenewing: boolean;
  renewalJobId: string | null;
}

const UnifiedJobFeed = ({ 
  jobs, 
  onRenew, 
  isRenewing,
  renewalJobId 
}: UnifiedJobFeedProps) => {
  const [expirations] = useState<Record<string, boolean>>({});

  console.log('🎨 [DEBUG] UnifiedJobFeed received jobs:', 
    jobs.map(j => ({ 
      id: j.id, 
      title: j.title, 
      pricing_tier: j.pricing_tier,
      status: j.status 
    }))
  );

  console.log('🆓 [DEBUG] UnifiedJobFeed - FREE jobs:', 
    jobs.filter(j => j.pricing_tier === 'free').map(j => ({
      id: j.id,
      title: j.title,
      pricing_tier: j.pricing_tier
    }))
  );

  return (
    <div className="space-y-6">
      <JobGrid
        jobs={jobs}
        expirations={expirations}
        onRenew={onRenew}
        isRenewing={isRenewing}
        renewalJobId={renewalJobId}
      />
    </div>
  );
};

export default UnifiedJobFeed;
