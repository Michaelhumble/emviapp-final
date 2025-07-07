
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
    console.log('📋 [JOBS-PAGE] Rendering with', totalJobs, 'jobs from Supabase');
  }, [jobs, loading, error, totalJobs]);

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
