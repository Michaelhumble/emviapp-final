
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';
import JobsGrid from '@/components/jobs/JobsGrid';
import JobLoadingState from '@/components/jobs/JobLoadingState';
import JobEmptyState from '@/components/jobs/JobEmptyState';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📋 [JOBS-PAGE] Fetching jobs from Supabase...');

      // Fetch jobs using public Supabase API
      const { data, error: fetchError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('❌ [JOBS-PAGE] Fetch error:', fetchError);
        console.error('❌ [JOBS-PAGE] Error details:', {
          message: fetchError.message,
          code: fetchError.code,
          details: fetchError.details,
          hint: fetchError.hint
        });
        setError(`Failed to load jobs: ${fetchError.message}`);
        return;
      }

      console.log('📊 [JOBS-PAGE] Raw data from Supabase:', data);
      console.log('📊 [JOBS-PAGE] Jobs count:', data?.length || 0);

      if (!data) {
        console.warn('⚠️ [JOBS-PAGE] No data returned from Supabase');
        setJobs([]);
        return;
      }

      // Transform database data to Job interface
      const transformedJobs: Job[] = data.map(job => {
        console.log('🔄 [JOBS-PAGE] Transforming job:', job.id, job.title);
        
        return {
          id: job.id,
          title: job.title || 'Untitled Job',
          category: job.category || 'Other',
          location: job.location || '',
          description: job.description || '',
          user_id: job.user_id || '',
          status: job.status || 'active',
          created_at: job.created_at || new Date().toISOString(),
          compensation_type: job.compensation_type || '',
          compensation_details: job.compensation_details || '',
          requirements: job.requirements || '',
          pricing_tier: job.pricing_tier || 'free',
          contact_info: typeof job.contact_info === 'object' && job.contact_info ? 
            job.contact_info as Job['contact_info'] : {},
          // Legacy compatibility fields
          role: job.title || 'Job Role',
          company: job.title || 'Company Name',
          posted_at: job.created_at || new Date().toISOString(),
        };
      });

      console.log('✅ [JOBS-PAGE] Transformed jobs:', transformedJobs.length);
      setJobs(transformedJobs);

    } catch (error) {
      console.error('💥 [JOBS-PAGE] Unexpected error:', error);
      setError('An unexpected error occurred while loading jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('🚀 [JOBS-PAGE] Component mounted, fetching jobs...');
    fetchJobs();

    // Set up real-time subscription for job changes
    console.log('⚡ [JOBS-PAGE] Setting up real-time subscription...');
    const channel = supabase
      .channel('jobs-changes')
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
          console.log('🔄 [JOBS-PAGE] Refreshing jobs due to real-time update...');
          fetchJobs(); // Refresh jobs when changes occur
        }
      )
      .subscribe();

    return () => {
      console.log('🧹 [JOBS-PAGE] Cleaning up real-time subscription...');
      supabase.removeChannel(channel);
    };
  }, []);

  // Auto-refresh every 30 seconds to catch new posts
  useEffect(() => {
    console.log('⏰ [JOBS-PAGE] Setting up auto-refresh timer...');
    const interval = setInterval(() => {
      console.log('🔄 [JOBS-PAGE] Auto-refresh triggered');
      fetchJobs();
    }, 30000);

    return () => {
      console.log('🧹 [JOBS-PAGE] Cleaning up auto-refresh timer...');
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    console.log('⏳ [JOBS-PAGE] Showing loading state...');
    return <JobLoadingState />;
  }

  if (error) {
    console.log('❌ [JOBS-PAGE] Showing error state:', error);
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchJobs} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (jobs.length === 0) {
    console.log('📭 [JOBS-PAGE] No jobs found, showing empty state...');
    return (
      <div className="container mx-auto py-8">
        <JobEmptyState onClearFilters={fetchJobs} />
      </div>
    );
  }

  console.log('🎉 [JOBS-PAGE] Rendering jobs page with', jobs.length, 'jobs');

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold mb-2">Available Jobs</h1>
          <p className="text-gray-600">
            {jobs.length} active job{jobs.length !== 1 ? 's' : ''} available
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={fetchJobs} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          
          <Link to="/post-job-free">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Post Job
            </Button>
          </Link>
        </div>
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
