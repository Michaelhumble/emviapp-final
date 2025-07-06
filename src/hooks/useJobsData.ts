
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
      console.log('🔍 Fetching jobs from Supabase database only...');
      
      // Fetch ONLY active jobs from Supabase database
      const { data: supabaseJobs, error: supabaseError } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active') // Only fetch active jobs
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('❌ Error fetching jobs from Supabase:', supabaseError);
        throw supabaseError;
      }

      console.log('✅ Fetched active jobs from database:', supabaseJobs?.length || 0, 'jobs');
      console.log('📋 Jobs details:', supabaseJobs?.map(j => ({ 
        id: j.id, 
        title: j.title, 
        status: j.status, 
        pricing_tier: j.pricing_tier 
      })));
      
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

      console.log('🎯 Transformed jobs with pricing tiers:', 
        transformedSupabaseJobs.map(j => ({ title: j.title, pricing_tier: j.pricing_tier, status: j.status }))
      );

      setJobs(transformedSupabaseJobs);
    } catch (err) {
      console.error('💥 Error in fetchJobs:', err);
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
