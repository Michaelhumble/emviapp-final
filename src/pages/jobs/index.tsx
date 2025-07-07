
import React, { useState, useEffect } from 'react';
import { useJobsData } from '@/hooks/useJobsData';
import UnifiedJobFeed from '@/components/jobs/UnifiedJobFeed';
import JobPostCTA from './JobPostCTA';
import { Job } from '@/types/job';

const JobsPage = () => {
  const { jobs, loading, error, refreshJobs } = useJobsData();
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);

  // Real-time refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshJobs();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshJobs]);

  const handleRenew = async (job: Job) => {
    setIsRenewing(true);
    setRenewalJobId(job.id);
    
    try {
      // Placeholder renewal logic
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Job renewal failed:', error);
    } finally {
      setIsRenewing(false);
      setRenewalJobId(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading opportunities...</p>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Beauty Industry Opportunities</h1>
        <p className="text-gray-600">
          Discover your next career opportunity in the beauty industry
        </p>
        <div className="text-sm text-gray-500 mt-2">
          <span>{jobs.length} active opportunities available</span>
          {jobs.length > 0 && (
            <span className="ml-4">
              Updated {new Date().toLocaleTimeString()}
            </span>
          )}
        </div>
      </div>

      {/* Job Post CTA */}
      <JobPostCTA />

      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs available</h3>
            <p className="text-gray-500 mb-4">Be the first to post an opportunity!</p>
            <button 
              onClick={() => window.location.href = '/post-job-free'}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Post First Job
            </button>
          </div>
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
