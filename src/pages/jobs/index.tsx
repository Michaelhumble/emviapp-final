
import React, { useState, useEffect } from 'react';
import { useJobsData } from '@/hooks/useJobsData';
import UnifiedJobFeed from '@/components/jobs/UnifiedJobFeed';
import JobPostCTA from './JobPostCTA';
import { Job } from '@/types/job';

const JobsPage = () => {
  const { jobs, loading, error, refreshJobs } = useJobsData();
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);

  // Real-time refresh every 10 seconds to ensure jobs appear
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 [JOBS-PAGE] Auto-refresh triggered');
      refreshJobs();
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [refreshJobs]);

  const handleRenew = async (job: Job) => {
    console.log('🔄 [JOBS-PAGE] Renewing job:', job.id);
    setIsRenewing(true);
    setRenewalJobId(job.id);
    
    try {
      // Placeholder renewal logic
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('✅ [JOBS-PAGE] Job renewed successfully');
    } catch (error) {
      console.error('❌ [JOBS-PAGE] Job renewal failed:', error);
    } finally {
      setIsRenewing(false);
      setRenewalJobId(null);
    }
  };

  console.log('🎉 [JOBS-PAGE] Rendering jobs page with', jobs.length, 'jobs');

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading jobs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h2 className="text-lg font-medium text-red-800 mb-2">Error Loading Jobs</h2>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={refreshJobs}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Beauty Industry Jobs</h1>
        <p className="text-gray-600">
          Find your next opportunity in the beauty industry
        </p>
        <div className="text-sm text-gray-500 mt-2 flex items-center gap-4">
          <span>Showing {jobs.length} active jobs</span>
          <button 
            onClick={refreshJobs}
            className="text-purple-600 hover:text-purple-700 underline"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Job Post CTA */}
      <JobPostCTA />

      {/* Debug info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-bold text-blue-800 mb-2">🔍 Jobs Debug Info</h3>
        <p className="text-sm text-blue-700">
          Total jobs loaded: {jobs.length} | 
          Last refresh: {new Date().toLocaleTimeString()}
        </p>
        {jobs.length > 0 && (
          <details className="mt-2">
            <summary className="cursor-pointer text-blue-600">View job titles</summary>
            <ul className="mt-2 text-xs">
              {jobs.map(job => (
                <li key={job.id} className="text-blue-600">
                  • {job.title} ({job.category}) - {job.pricing_tier}
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No jobs available at the moment.</p>
          <button 
            onClick={refreshJobs}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Refresh Jobs
          </button>
        </div>
      ) : (
        <UnifiedJobFeed
          jobs={jobs}
          onRenew={handleRenew}
          isRenewing={isRenewing}
          renewalJobId={renewalJobId}
        />
      )}
    </div>
  );
};

export default JobsPage;
