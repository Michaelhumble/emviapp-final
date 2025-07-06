
import React, { useEffect } from 'react';
import { useJobsData } from '@/hooks/useJobsData';
import { useJobPosting } from '@/hooks/jobs/useJobPosting';
import UnifiedJobFeed from '@/components/jobs/UnifiedJobFeed';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import { useTranslation } from '@/hooks/useTranslation';

const JobsPage = () => {
  const { jobs, loading, error, refetch } = useJobsData();
  const { isSubmitting } = useJobPosting();
  const { isVietnamese } = useTranslation();
  
  console.log('📋 [JOBS-PAGE] Component rendered:', {
    jobsCount: jobs.length,
    loading,
    error: { _type: typeof error, value: error?.toString() || 'undefined' },
    jobs: jobs.map(j => ({
      id: j.id,
      title: j.title,
      status: j.status,
      pricing_tier: j.pricing_tier,
      created_at: j.created_at,
      user_id: j.user_id
    }))
  });

  // Force refresh when returning from job posting
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('🔄 [JOBS-PAGE] Page became visible, refreshing jobs...');
        refetch();
      }
    };

    const handleFocus = () => {
      console.log('🔄 [JOBS-PAGE] Page focused, refreshing jobs...');
      refetch();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [refetch]);

  if (loading) {
    return <JobLoadingState message="Loading jobs..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">
            {isVietnamese ? 'Lỗi tải công việc' : 'Error Loading Jobs'}
          </h2>
          <p className="text-gray-600 mb-4">
            {isVietnamese ? 'Không thể tải danh sách công việc' : 'Unable to load job listings'}
          </p>
          <button 
            onClick={refetch}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isVietnamese ? 'Thử lại' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return <JobEmptyState />;
  }

  const handleRenew = (job: any) => {
    console.log('🔄 [JOBS-PAGE] Renew job requested:', job.id);
    // Job renewal logic would go here
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {isVietnamese ? 'Cơ Hội Việc Làm' : 'Job Opportunities'}
        </h1>
        <p className="text-gray-600">
          {isVietnamese 
            ? `Tìm thấy ${jobs.length} cơ hội việc làm trong ngành làm đẹp`
            : `Found ${jobs.length} job opportunities in the beauty industry`
          }
        </p>
      </div>

      <UnifiedJobFeed
        jobs={jobs}
        onRenew={handleRenew}
        isRenewing={isSubmitting}
        renewalJobId={null}
      />
    </div>
  );
};

export default JobsPage;
