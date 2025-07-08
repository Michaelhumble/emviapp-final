
import React, { useEffect } from 'react';
import { useJobsData } from '@/hooks/useJobsData';
import JobsGrid from '@/components/jobs/JobsGrid';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import { useAuth } from '@/context/auth';
import { Job } from '@/types/job';

const JobsPage = () => {
  const { jobs, loading, error, refreshJobs } = useJobsData();
  const { isSignedIn } = useAuth();

  console.log('📊 [JOBS-PAGE] Rendering jobs page with state:', {
    jobsCount: jobs.length,
    loading,
    error,
    isSignedIn,
    jobsArray: jobs
  });

  useEffect(() => {
    console.log('🔄 [JOBS-PAGE] Jobs data updated in useEffect:', {
      totalJobs: jobs.length,
      jobTitles: jobs.map(j => j.title),
      jobIds: jobs.map(j => j.id),
      fullJobsData: jobs
    });
  }, [jobs]);

  const handleRenew = (job: Job) => {
    console.log('🔄 [JOBS-PAGE] Renew requested for job:', {
      jobId: job.id,
      jobTitle: job.title,
      fullJob: job
    });
    // Renewal logic would go here
  };

  if (loading) {
    console.log('⏳ [JOBS-PAGE] Showing loading state');
    return (
      <div className="container mx-auto px-4 py-8">
        <JobLoadingState />
      </div>
    );
  }

  if (error) {
    console.log('❌ [JOBS-PAGE] Showing error state:', {
      error,
      errorType: typeof error,
      errorMessage: error
    });
    return (
      <div className="container mx-auto px-4 py-8">
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
    );
  }

  console.log('✅ [JOBS-PAGE] Showing jobs grid with data:', {
    jobsCount: jobs.length,
    emptyState: jobs.length === 0,
    jobsToDisplay: jobs
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Latest Job Opportunities</h1>
        <p className="text-gray-600">{jobs.length} jobs available</p>
      </div>

      {jobs.length === 0 ? (
        <>
          {console.log('📭 [JOBS-PAGE] Rendering empty state - no jobs found')}
          <JobEmptyState />
        </>
      ) : (
        <>
          {console.log('📋 [JOBS-PAGE] Rendering jobs grid with jobs:', jobs.map(j => ({ id: j.id, title: j.title })))}
          <JobsGrid
            jobs={jobs}
            expirations={{}}
            onRenew={handleRenew}
            isRenewing={false}
            renewalJobId={null}
          />
        </>
      )}
    </div>
  );
};

export default JobsPage;
