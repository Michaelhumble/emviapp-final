
import React, { useEffect } from 'react';
import { useJobsData } from '@/hooks/useJobsData';
import JobsGrid from '@/components/jobs/JobsGrid';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const JobsPage = () => {
  const { jobs, loading, error, refreshJobs, totalJobs } = useJobsData();

  useEffect(() => {
    console.log('📋 [JOBS-PAGE] Rendering with', totalJobs, 'active jobs from Supabase');
    console.log('📋 [JOBS-PAGE] Jobs data:', jobs.map(j => ({
      id: j.id,
      title: j.title,
      status: j.status,
      pricing_tier: j.pricing_tier,
      created_at: j.created_at
    })));
  }, [jobs, totalJobs]);

  // Auto-refresh jobs every 30 seconds to catch new posts
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 [JOBS-PAGE] Auto-refreshing jobs...');
      refreshJobs();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshJobs]);

  // Refresh jobs when the component mounts or when returning from posting
  useEffect(() => {
    console.log('🔄 [JOBS-PAGE] Initial jobs refresh on mount');
    refreshJobs();
  }, []);

  if (loading) {
    return <JobLoadingState />;
  }

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading jobs: {error}</p>
          <Button onClick={refreshJobs} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <JobEmptyState onClearFilters={() => refreshJobs()} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Available Jobs</h1>
          <p className="text-gray-600">
            {totalJobs} active job{totalJobs !== 1 ? 's' : ''} available
          </p>
        </div>
        
        <Button onClick={refreshJobs} variant="outline" size="sm">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>
      
      <JobsGrid 
        jobs={jobs}
        expirations={{}}
        onRenew={() => {}}
        isRenewing={false}
        renewalJobId={null}
      />
    </div>
  );
};

export default JobsPage;
