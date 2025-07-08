
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

  // Add defensive checks
  if (!jobs || !Array.isArray(jobs)) {
    console.warn('⚠️ [UNIFIED-FEED] Invalid jobs array:', jobs);
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No jobs available at the moment.</p>
      </div>
    );
  }

  console.log('🎨 [UNIFIED-FEED] Rendering with jobs:', 
    jobs.map(j => ({ 
      id: j.id, 
      title: j.title, 
      pricing_tier: j.pricing_tier,
      status: j.status 
    }))
  );

  console.log('🆓 [UNIFIED-FEED] FREE jobs to display:', 
    jobs.filter(j => j.pricing_tier === 'free').map(j => ({
      id: j.id,
      title: j.title,
      pricing_tier: j.pricing_tier
    }))
  );

  if (jobs.length === 0) {
    console.log('⚠️ [UNIFIED-FEED] No jobs to display');
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No jobs available at the moment.</p>
      </div>
    );
  }

  try {
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
  } catch (error) {
    console.error('💥 [UNIFIED-FEED] Render error:', error);
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Unable to display job feed</p>
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

export default UnifiedJobFeed;
