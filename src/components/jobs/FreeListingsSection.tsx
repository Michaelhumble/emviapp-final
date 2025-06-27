
import React, { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import JobListingCard from './JobListingCard';
import { useJobQueries } from '@/hooks/jobs/useJobQueries';

interface FreeListingsSectionProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}

const FreeListingsSection: React.FC<FreeListingsSectionProps> = ({ 
  jobs: staticJobs, 
  onViewDetails 
}) => {
  const { fetchJobs, loading } = useJobQueries();
  const [dynamicJobs, setDynamicJobs] = useState<Job[]>([]);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const loadFreeJobs = async () => {
      console.log('🔄 FreeListingsSection: Starting to load free jobs...');
      setFetchError(null);
      
      try {
        console.log('🔍 FreeListingsSection: Calling fetchJobs with filters:', { 
          pricingTier: 'free', 
          status: 'active' 
        });
        
        const jobs = await fetchJobs({ 
          pricingTier: 'free', 
          status: 'active' 
        });
        
        console.log('✅ FreeListingsSection: Fetched free jobs successfully:', {
          jobCount: jobs?.length || 0,
          jobs: jobs
        });
        
        if (jobs && jobs.length > 0) {
          console.log('📋 FreeListingsSection: First job details:', jobs[0]);
          console.log('📋 FreeListingsSection: All job IDs:', jobs.map(job => job.id));
          console.log('📋 FreeListingsSection: All job titles:', jobs.map(job => job.title));
        } else {
          console.warn('⚠️ FreeListingsSection: No free jobs found in database');
        }
        
        setDynamicJobs(jobs || []);
      } catch (error) {
        console.error('❌ FreeListingsSection: Error loading free jobs:', error);
        console.error('❌ FreeListingsSection: Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        setFetchError(error instanceof Error ? error.message : 'Unknown error occurred');
      }
    };

    loadFreeJobs();
  }, [fetchJobs]);

  // Combine static jobs from props with dynamic jobs from database
  const allFreeJobs = [...staticJobs, ...dynamicJobs];
  console.log('📊 FreeListingsSection: Rendering with combined jobs:', {
    staticJobsCount: staticJobs.length,
    dynamicJobsCount: dynamicJobs.length,
    totalJobs: allFreeJobs.length,
    loading,
    fetchError
  });

  if (loading) {
    console.log('⏳ FreeListingsSection: Showing loading state');
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Free Job Listings</h2>
        <div className="text-center py-8">
          <div className="animate-pulse text-gray-500">Loading free jobs...</div>
        </div>
      </div>
    );
  }

  if (fetchError) {
    console.error('❌ FreeListingsSection: Displaying error state:', fetchError);
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Free Job Listings</h2>
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">Error loading free jobs: {fetchError}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="text-blue-500 hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (allFreeJobs.length === 0) {
    console.log('📝 FreeListingsSection: No jobs to display');
    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Free Job Listings</h2>
        <div className="text-center py-8">
          <div className="text-gray-500">No free job listings available at the moment.</div>
        </div>
      </div>
    );
  }

  console.log('✅ FreeListingsSection: Rendering', allFreeJobs.length, 'free jobs');

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Free Job Listings ({allFreeJobs.length})
      </h2>
      
      {fetchError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">Warning: {fetchError}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {allFreeJobs.map((job, index) => {
          console.log('🎯 FreeListingsSection: Rendering job', index + 1, ':', {
            id: job.id,
            title: job.title,
            location: job.location,
            created_at: job.created_at
          });
          
          return (
            <JobListingCard
              key={job.id}
              job={job}
              onViewDetails={() => onViewDetails(job)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FreeListingsSection;
