
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/layout/Layout';
import JobPostCTA from './JobPostCTA';
import JobsGrid from '@/components/jobs/JobsGrid';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import { useJobsData } from '@/hooks/useJobsData';
import { useTranslation } from '@/hooks/useTranslation';
import { Job } from '@/types/job';

const JobsPage = () => {
  const { t, isVietnamese } = useTranslation();
  const { jobs, loading, error, refreshJobs } = useJobsData();
  const [expirations, setExpirations] = useState<Record<string, boolean>>({});
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    console.log('🔄 [JOBS-PAGE] Setting up auto-refresh interval');
    const interval = setInterval(() => {
      console.log('🔄 [JOBS-PAGE] Auto-refresh triggered');
      refreshJobs();
    }, 30000);

    return () => {
      console.log('🔄 [JOBS-PAGE] Cleaning up auto-refresh interval');
      clearInterval(interval);
    };
  }, [refreshJobs]);

  // Log jobs data whenever it changes
  useEffect(() => {
    console.log('🎉 [JOBS-PAGE] Jobs data updated:');
    console.log('🎉 [JOBS-PAGE] - Jobs count:', jobs.length);
    console.log('🎉 [JOBS-PAGE] - Loading:', loading);
    console.log('🎉 [JOBS-PAGE] - Error:', error);
    console.log('🎉 [JOBS-PAGE] - Jobs array:', jobs);
    
    // Log each job individually for better debugging
    jobs.forEach((job, index) => {
      console.log(`🎉 [JOBS-PAGE] Job ${index + 1}:`, {
        id: job.id,
        title: job.title,
        category: job.category,
        location: job.location,
        pricing_tier: job.pricing_tier,
        status: job.status,
        created_at: job.created_at
      });
    });
  }, [jobs, loading, error]);

  const handleRenew = async (job: Job) => {
    console.log('🔄 [JOBS-PAGE] Renew job requested:', job.id);
    setIsRenewing(true);
    setRenewalJobId(job.id);
    
    // Simulate renewal process
    setTimeout(() => {
      console.log('✅ [JOBS-PAGE] Job renewal completed for:', job.id);
      setIsRenewing(false);
      setRenewalJobId(null);
      refreshJobs();
    }, 2000);
  };

  const checkExpiration = (job: Job): boolean => {
    if (!job.expires_at) return false;
    const isExpired = new Date(job.expires_at) < new Date();
    console.log(`⏰ [JOBS-PAGE] Checking expiration for job ${job.id}:`, {
      expires_at: job.expires_at,
      isExpired,
      now: new Date().toISOString()
    });
    return isExpired;
  };

  console.log('🎨 [JOBS-PAGE] Rendering jobs page with state:');
  console.log('🎨 [JOBS-PAGE] - Jobs count:', jobs.length);
  console.log('🎨 [JOBS-PAGE] - Loading:', loading);
  console.log('🎨 [JOBS-PAGE] - Error:', error);

  if (loading) {
    console.log('⏳ [JOBS-PAGE] Showing loading state...');
    return (
      <Layout>
        <Helmet>
          <title>{isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp"}</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <JobPostCTA />
            <JobLoadingState />
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    console.error('❌ [JOBS-PAGE] Showing error state:', error);
    return (
      <Layout>
        <Helmet>
          <title>{isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp"}</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <JobPostCTA />
            <div className="text-center py-8">
              <p className="text-red-600">Error loading jobs: {error}</p>
              <button
                onClick={refreshJobs}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Try Again
              </button>
            </div>
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
          <title>{isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp"}</title>
        </Helmet>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <JobPostCTA />
            <JobEmptyState />
          </div>
        </div>
      </Layout>
    );
  }

  console.log('🎉 [JOBS-PAGE] Rendering jobs page with', jobs.length, 'jobs');

  return (
    <Layout>
      <Helmet>
        <title>{isVietnamese ? "Việc Làm Ngành Làm Đẹp | EmviApp" : "Beauty Industry Jobs | EmviApp"}</title>
        <meta 
          name="description" 
          content={isVietnamese 
            ? "Duyệt cơ hội việc làm trong ngành làm đẹp. Tìm vị trí dành cho kỹ thuật viên nail, thợ làm tóc, chuyên viên thẩm mỹ, và nhiều hơn nữa."
            : "Browse job opportunities in the beauty industry. Find positions for nail technicians, hair stylists, estheticians, and more."
          }
        />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <JobPostCTA />
          
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isVietnamese ? "Việc Làm Mới Nhất" : "Latest Job Opportunities"}
            </h1>
            <p className="text-gray-600">
              {isVietnamese 
                ? `${jobs.length} việc làm có sẵn` 
                : `${jobs.length} jobs available`
              }
            </p>
          </div>

          <JobsGrid
            jobs={jobs}
            expirations={expirations}
            onRenew={handleRenew}
            isRenewing={isRenewing}
            renewalJobId={renewalJobId}
            checkExpiration={checkExpiration}
          />
        </div>
      </div>
    </Layout>
  );
};

export default JobsPage;
