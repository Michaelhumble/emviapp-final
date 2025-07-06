
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
  
  console.log('📋 [JOBS-PAGE] ===================');
  console.log('📋 [JOBS-PAGE] Component rendered with state:', {
    jobsCount: jobs.length,
    loading,
    hasError: !!error,
    errorMessage: error?.message,
    isSubmitting
  });

  console.log('📋 [JOBS-PAGE] Detailed jobs data:');
  jobs.forEach((job, index) => {
    console.log(`📝 [JOBS-PAGE] Job ${index + 1}:`, {
      id: job.id,
      title: job.title,
      status: job.status,
      pricing_tier: job.pricing_tier,
      created_at: job.created_at,
      user_id: job.user_id,
      category: job.category,
      location: job.location
    });
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

  // Debug current URL and search params
  useEffect(() => {
    console.log('🌐 [JOBS-PAGE] Current URL:', window.location.href);
    console.log('🌐 [JOBS-PAGE] Search params:', window.location.search);
    console.log('🌐 [JOBS-PAGE] Pathname:', window.location.pathname);
    
    // Check if coming from success page
    if (window.location.pathname.includes('success') || window.location.search.includes('session_id')) {
      console.log('✅ [JOBS-PAGE] Detected return from payment success, forcing refetch...');
      setTimeout(() => {
        refetch();
      }, 2000); // Wait 2 seconds for webhook processing
    }
  }, [refetch]);

  if (loading) {
    console.log('⏳ [JOBS-PAGE] Showing loading state');
    return <JobLoadingState />;
  }

  if (error) {
    console.error('❌ [JOBS-PAGE] Showing error state:', error);
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
          <div className="mt-4 p-4 bg-red-50 rounded text-left">
            <strong>Debug Info:</strong>
            <pre className="text-xs mt-2">{error.message}</pre>
          </div>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    console.log('📭 [JOBS-PAGE] No jobs found, showing empty state');
    return <JobEmptyState onClearFilters={() => {}} />;
  }

  const handleRenew = (job: any) => {
    console.log('🔄 [JOBS-PAGE] Renew job requested:', job.id);
    // Job renewal logic would go here
  };

  console.log('✅ [JOBS-PAGE] Rendering jobs feed with', jobs.length, 'jobs');
  console.log('📋 [JOBS-PAGE] =================== END');

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

      {/* Debug Panel - Remove this in production */}
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">🔧 Debug Panel (Remove in Production)</h3>
        <div className="text-sm text-yellow-700">
          <p><strong>Jobs Count:</strong> {jobs.length}</p>
          <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
          <p><strong>Error:</strong> {error ? error.message : 'None'}</p>
          <p><strong>URL:</strong> {window.location.href}</p>
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">Raw Jobs Data</summary>
            <pre className="mt-2 p-2 bg-white rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(jobs, null, 2)}
            </pre>
          </details>
        </div>
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
