
import { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

export const useJobsData = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [renewalJobId, setActiveRenewalJobId] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      console.log('🔍 [JOBS-DATA] Fetching jobs from Supabase database...');
      
      // Fetch ALL active jobs (not just user's own jobs)
      const { data: supabaseJobs, error: supabaseError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active') // Only fetch active jobs
        .order('created_at', { ascending: false });

      console.log('🔍 [JOBS-DATA] Database query result:', {
        success: !supabaseError,
        count: supabaseJobs?.length || 0,
        error: supabaseError?.message
      });

      if (supabaseError) {
        console.error('❌ [JOBS-DATA] Error fetching jobs from Supabase:', supabaseError);
        throw supabaseError;
      }

      console.log('✅ [JOBS-DATA] Active jobs from database:', {
        count: supabaseJobs?.length || 0,
        jobs: supabaseJobs?.map(j => ({ 
          id: j.id, 
          title: j.title, 
          status: j.status, 
          pricing_tier: j.pricing_tier,
          created_at: j.created_at
        }))
      });
      
      // Transform Supabase jobs to match Job interface
      const transformedSupabaseJobs: Job[] = (supabaseJobs || []).map(job => ({
        id: job.id,
        title: job.title || 'Job Title',
        category: job.category || "Other",
        created_at: job.created_at || new Date().toISOString(),
        company: job.title || 'Company',
        location: job.location || '',
        description: job.description || '',
        compensation_type: job.compensation_type || '',
        compensation_details: job.compensation_details || '',
        contact_info: typeof job.contact_info === 'object' && job.contact_info ? job.contact_info as any : {},
        user_id: job.user_id || '',
        status: job.status || 'active',
        expires_at: job.expires_at || '',
        requirements: job.requirements || '',
        pricing_tier: job.pricing_tier || 'free'
      }));

      console.log('🎯 [JOBS-DATA] Transformed jobs for UI:', {
        total: transformedSupabaseJobs.length,
        free: transformedSupabaseJobs.filter(j => j.pricing_tier === 'free').length,
        paid: transformedSupabaseJobs.filter(j => j.pricing_tier !== 'free').length
      });

      setJobs(transformedSupabaseJobs);
      setError(null);
    } catch (err) {
      console.error('💥 [JOBS-DATA] Error in fetchJobs:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const createJob = async (jobData: any) => {
    try {
      const jobToInsert = {
        ...jobData,
        category: jobData.category || "Other",
        status: 'active'
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert([jobToInsert])
        .select()
        .single();

      if (error) throw error;

      // Refresh the jobs list after creating
      await fetchJobs();
      
      return { data, error: null };
    } catch (error) {
      console.error('Error creating job:', error);
      return { data: null, error };
    }
  };

  const refetch = fetchJobs;

  useEffect(() => {
    fetchJobs();
  }, []);

  // Set up real-time subscription for job changes
  useEffect(() => {
    console.log('🔄 [JOBS-DATA] Setting up real-time subscription');
    
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
          console.log('🔄 [JOBS-DATA] Real-time job change:', {
            eventType: payload.eventType,
            table: payload.table,
            jobId: payload.new && typeof payload.new === 'object' && 'id' in payload.new ? payload.new.id : 
                   payload.old && typeof payload.old === 'object' && 'id' in payload.old ? payload.old.id : 'unknown',
            newStatus: payload.new && typeof payload.new === 'object' && 'status' in payload.new ? payload.new.status : undefined,
            oldStatus: payload.old && typeof payload.old === 'object' && 'status' in payload.old ? payload.old.status : undefined
          });
          // Refetch jobs when there's a change
          fetchJobs();
        }
      )
      .subscribe();

    return () => {
      console.log('🔄 [JOBS-DATA] Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    jobs,
    loading,
    error,
    renewalJobId,
    setActiveRenewalJobId,
    refetch,
    createJob
  };
};
