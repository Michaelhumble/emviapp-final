
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useJobsData } from '@/hooks/useJobsData';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import UnifiedJobFeed from '@/components/jobs/UnifiedJobFeed';
import { Helmet } from 'react-helmet';
import { useTranslation } from '@/hooks/useTranslation';
import { supabase } from '@/integrations/supabase/client';
import { useJobRenewal } from '@/hooks/useJobRenewal';
import { Job } from '@/types/job';

const JobsPage = () => {
  const { jobs, loading, error, refreshJobs } = useJobsData();
  const { isVietnamese } = useTranslation();
  const [autoRefreshCount, setAutoRefreshCount] = useState(0);
  
  // Use the job renewal hook for renewal functionality
  const { renewJob, isRenewing, renewalJobId } = useJobRenewal({
    onSuccess: () => {
      console.log('🔄 [JOBS-PAGE] Job renewed successfully, refreshing jobs list');
      refreshJobs();
    }
  });

  // Handle job renewal
  const handleRenewJob = async (job: Job) => {
    console.log('🔄 [JOBS-PAGE] Renewing job:', job.id);
    await renewJob(job.id);
  };

  // Auto-refresh every 30 seconds to catch new jobs
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 [JOBS-PAGE] Auto-refresh triggered');
      refreshJobs();
      setAutoRefreshCount(prev => prev + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshJobs]);

  // Real-time subscription to jobs table
  useEffect(() => {
    console.log('📡 [JOBS-PAGE] Setting up real-time subscription...');
    
    const channel = supabase
      .channel('jobs-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jobs',
          filter: 'status=eq.active'
        },
        (payload) => {
          console.log('⚡ [JOBS-PAGE] Real-time update received:', payload);
          refreshJobs(); // Refresh jobs when changes occur
        }
      )
      .subscribe((status) => {
        console.log('📡 [JOBS-PAGE] Subscription status:', status);
      });

    return () => {
      console.log('📡 [JOBS-PAGE] Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [refreshJobs]);

  console.log('🎉 [JOBS-PAGE] Rendering jobs page with', jobs.length, 'jobs');

  if (loading) {
    console.log('⏳ [JOBS-PAGE] Showing loading state...');
    return (
      <Layout>
        <Helmet>
          <title>
            {isVietnamese ? "Đang tải việc làm..." : "Loading Jobs..."}
          </title>
        </Helmet>
        <JobLoadingState />
      </Layout>
    );
  }

  if (error) {
    console.error('❌ [JOBS-PAGE] Error state:', error);
    return (
      <Layout>
        <Helmet>
          <title>
            {isVietnamese ? "Lỗi tải việc làm" : "Error Loading Jobs"}
          </title>
        </Helmet>
        <div className="container mx-auto py-8 px-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              {isVietnamese ? "Không thể tải việc làm" : "Failed to Load Jobs"}
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={refreshJobs}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              {isVietnamese ? "Thử lại" : "Try Again"}
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (jobs.length === 0) {
    console.log('📭 [JOBS-PAGE] No jobs found, showing empty state');
    return (
      <Layout>
        <Helmet>
          <title>
            {isVietnamese ? "Không có việc làm" : "No Jobs Available"}
          </title>
        </Helmet>
        <JobEmptyState />
      </Layout>
    );
  }

  return (
    <Layout>
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
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isVietnamese ? "Việc Làm Ngành Làm Đẹp" : "Beauty Industry Jobs"}
            </h1>
            <p className="text-gray-600">
              {isVietnamese 
                ? `Tìm thấy ${jobs.length} cơ hội việc làm` 
                : `Found ${jobs.length} job opportunities`}
            </p>
            {autoRefreshCount > 0 && (
              <p className="text-sm text-gray-500">
                Auto-refreshed {autoRefreshCount} times - Real-time updates active
              </p>
            )}
          </div>
          
          <UnifiedJobFeed 
            jobs={jobs}
            onRenew={handleRenewJob}
            isRenewing={isRenewing}
            renewalJobId={renewalJobId}
          />
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;
