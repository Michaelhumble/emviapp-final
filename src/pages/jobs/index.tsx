
import React, { useState, useEffect } from 'react';
import { useJobsData } from '@/hooks/useJobsData';
import UnifiedJobFeed from '@/components/jobs/UnifiedJobFeed';
import { Job } from '@/types/job';

const JobsPage = () => {
  const { jobs, loading, error, refreshJobs } = useJobsData();
  const [isRenewing, setIsRenewing] = useState(false);
  const [renewalJobId, setRenewalJobId] = useState<string | null>(null);

  // Real-time subscription for instant updates
  useEffect(() => {
    console.log('📡 [JOBS-PAGE] Setting up real-time subscription...');
    
    import('@/integrations/supabase/client').then(({ supabase }) => {
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
            console.log('⚡ [JOBS-PAGE] Real-time job update:', payload);
            
            // Refresh jobs data when any job changes
            setTimeout(() => {
              console.log('🔄 [JOBS-PAGE] Refreshing jobs due to real-time update...');
              refreshJobs();
            }, 100); // Small delay to ensure data consistency
          }
        )
        .subscribe((status) => {
          console.log('📡 [JOBS-PAGE] Subscription status:', status);
        });

      // Cleanup subscription on unmount
      return () => {
        console.log('📡 [JOBS-PAGE] Cleaning up real-time subscription');
        supabase.removeChannel(channel);
      };
    });
  }, [refreshJobs]);

  // Auto-refresh every 30 seconds as backup
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 [JOBS-PAGE] Auto-refresh triggered');
      refreshJobs();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshJobs]);

  const handleRenew = async (job: Job) => {
    console.log('🔄 [JOBS-PAGE] Renewing job:', job.id);
    setIsRenewing(true);
    setRenewalJobId(job.id);
    
    try {
      // Placeholder renewal logic
      // In a real app, this would make an API call to renew/boost the job
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
        <div className="text-sm text-gray-500 mt-2">
          Showing {jobs.length} active jobs
        </div>
      </div>

      <UnifiedJobFeed
        jobs={jobs}
        onRenew={handleRenew}
        isRenewing={isRenewing}
        renewalJobId={renewalJobId}
      />
    </div>
  );
};

export default JobsPage;
