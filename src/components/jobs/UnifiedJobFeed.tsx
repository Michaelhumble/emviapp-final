
import { Job } from "@/types/job";
import { useState } from "react";
import { JobDetailModal } from "./JobDetailModal";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import UnifiedResponsiveJobsLayout from "./UnifiedResponsiveJobsLayout";

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
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsDetailModalOpen(true);
  };

  const handleEditJob = (job: Job) => {
    // Only allow editing if user owns the job
    if (user && user.id === job.user_id) {
      navigate(`/jobs/edit/${job.id}`);
    }
  };

  const handleCloseModal = () => {
    setIsDetailModalOpen(false);
    setSelectedJob(null);
  };

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
      <div className="w-full">
        {/* Unified Responsive Layout - Same design across ALL devices */}
        <UnifiedResponsiveJobsLayout
          jobs={jobs}
          onRenew={onRenew}
          isRenewing={isRenewing}
          renewalJobId={renewalJobId}
          onViewDetails={handleViewDetails}
          onEditJob={handleEditJob}
        />

        {/* Job Detail Modal - Universal */}
        {selectedJob && (
          <JobDetailModal
            job={selectedJob}
            isOpen={isDetailModalOpen}
            onClose={handleCloseModal}
          />
        )}
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
