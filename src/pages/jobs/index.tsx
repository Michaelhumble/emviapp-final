
import React, { useEffect, useState } from 'react';
import { useJobsData } from '@/hooks/useJobsData';
import JobsGrid from '@/components/jobs/JobsGrid';
import { Helmet } from 'react-helmet';
import { useTranslation } from '@/hooks/useTranslation';

const JobsPage = () => {
  const { isVietnamese } = useTranslation();
  const { jobs, loading, error, refetch } = useJobsData();
  const [expirations, setExpirations] = useState<Record<string, boolean>>({});

  console.log('📋 [JOBS-PAGE] Component rendered:', {
    jobsCount: jobs.length,
    loading,
    error: error?.message,
    jobs: jobs.map(j => ({ id: j.id, title: j.title, status: j.status, pricing_tier: j.pricing_tier }))
  });

  // Handle renewal functionality
  const handleRenew = async (job: any) => {
    console.log('🔄 [JOBS-PAGE] Renewing job:', job.id);
    // Renewal logic would go here
  };

  // Refresh jobs periodically to catch any missed real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 [JOBS-PAGE] Periodic refresh triggered');
      refetch();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [refetch]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>{isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp"}</title>
        </Helmet>
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">
              {isVietnamese ? "Đang tải việc làm..." : "Loading jobs from database..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('❌ [JOBS-PAGE] Error loading jobs:', error);
    return (
      <div className="container mx-auto px-4 py-8">
        <Helmet>
          <title>{isVietnamese ? "Lỗi - Việc Làm | EmviApp" : "Error - Jobs | EmviApp"}</title>
        </Helmet>
        <div className="flex justify-center items-center min-h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">
              {isVietnamese ? "Không thể tải việc làm" : "Failed to load jobs"}
            </p>
            <button 
              onClick={() => refetch()}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              {isVietnamese ? "Thử lại" : "Try Again"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>
          {isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp"}
        </title>
        <meta 
          name="description" 
          content={isVietnamese 
            ? "Duyệt cơ hội việc làm trong ngành làm đẹp. Tìm vị trí dành cho kỹ thuật viên nail, thợ làm tóc, chuyên viên thẩm mỹ, và nhiều hơn nữa."
            : "Browse job opportunities in the beauty industry. Find positions for nail technicians, hair stylists, estheticians, and more."
          }
        />
      </Helmet>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isVietnamese ? "Việc Làm Ngành Làm Đẹp" : "Beauty Industry Jobs"}
        </h1>
        <p className="text-gray-600">
          {isVietnamese 
            ? `Tìm thấy ${jobs.length} cơ hội việc làm`
            : `Found ${jobs.length} job opportunities`
          }
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h-4a2 2 0 002-2zm0 0V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 002 2h-4a2 2 0 002-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {isVietnamese ? "Chưa có việc làm nào" : "No jobs available"}
          </h3>
          <p className="text-gray-500">
            {isVietnamese 
              ? "Hãy quay lại sau để xem những cơ hội việc làm mới."
              : "Check back later for new job opportunities."}
          </p>
        </div>
      ) : (
        <JobsGrid
          jobs={jobs}
          expirations={expirations}
          onRenew={handleRenew}
          isRenewing={false}
          renewalJobId={null}
        />
      )}
    </div>
  );
};

export default JobsPage;
