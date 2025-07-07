
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
    console.log('📋 [JOBS-PAGE] Component rendered with state:', {
      jobsCount: totalJobs,
      loading,
      hasError: !!error,
      errorMessage: error
    });

    if (jobs.length > 0) {
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
    }
  }, [jobs, loading, error, totalJobs]);

  // Show loading state
  if (loading) {
    console.log('⏳ [JOBS-PAGE] Showing loading state');
    return <JobLoadingState />;
  }

  // Show error state
  if (error) {
    console.log('❌ [JOBS-PAGE] Showing error state:', error);
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

  // Show empty state
  if (jobs.length === 0) {
    console.log('📭 [JOBS-PAGE] Showing empty state');
    return (
      <div className="container mx-auto py-8">
        <JobEmptyState onClearFilters={() => refreshJobs()} />
      </div>
    );
  }

  console.log('✅ [JOBS-PAGE] Rendering jobs grid with', jobs.length, 'jobs');

  return (
    <div className="container mx-auto py-8">
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
