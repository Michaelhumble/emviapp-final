
import { useState, useEffect, useMemo } from 'react';
import { Job } from '@/types/job';
import { supabase } from '@/integrations/supabase/client';
import { sortJobsByTierAndDate } from '@/utils/jobSorting';

export const useJobsData = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    console.log('🔍 [JOBS-DATA] Starting to fetch jobs from Supabase...');
    console.log('🔍 [JOBS-DATA] Supabase client configured:', !!supabase);
    
    try {
      setLoading(true);
      setError(null);
      
      const { data: jobsData, error: fetchError, count } = await supabase
        .from('jobs')
        .select('*', { count: 'exact' })
        .eq('status', 'active')
        .gte('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });
        
      // LOG ALL ACTIVE JOBS FOR DEBUGGING
      console.log('🔍 [JOBS-DATA] ACTIVE JOBS QUERY RESULTS:');
      if (jobsData && jobsData.length > 0) {
        jobsData.forEach((job, index) => {
          console.log(`📋 [JOBS-DATA] Job ${index + 1}:`, {
            id: job.id,
            title: job.title,
            status: job.status,
            pricing_tier: job.pricing_tier,
            created_at: job.created_at,
            user_id: job.user_id
          });
        });
      } else {
        console.log('⚠️ [JOBS-DATA] NO ACTIVE JOBS FOUND IN DATABASE');
      }

      console.log('🔍 [JOBS-DATA] Raw Supabase response:', {
        data: jobsData,
        error: fetchError,
        count,
        dataLength: jobsData?.length || 0
      });

      if (fetchError) {
        console.error('💥 [JOBS-DATA] Supabase fetch error:', fetchError);
        throw fetchError;
      }

      const transformedJobs: Job[] = (jobsData || []).map(job => {
        console.log('🔍 [JOBS-DATA] Transforming job:', {
          id: job.id,
          title: job.title,
          vietnamese_title: job.vietnamese_title,
          vietnamese_description: job.vietnamese_description,
          user_id: job.user_id,
          status: job.status,
          created_at: job.created_at
        });
        
        return {
          id: job.id,
          title: job.title || 'Job Title',
          company: job.title || 'Company Name',
          location: job.location || '',
          created_at: job.created_at || new Date().toISOString(),
          description: job.description || '',
          compensation_type: job.compensation_type || '',
          compensation_details: job.compensation_details || '',
          contact_info: typeof job.contact_info === 'object' && job.contact_info ? job.contact_info as any : {},
          user_id: job.user_id || '',
          status: job.status || 'active',
          expires_at: job.expires_at || '',
          requirements: job.requirements || '',
          pricing_tier: job.pricing_tier || 'free',
          category: job.category || "Other",
          // FIXED: Include Vietnamese fields for nail jobs
          vietnamese_title: job.vietnamese_title || null,
          vietnamese_description: job.vietnamese_description || null,
          // Safe image handling - only set if actually exists
          imageUrl: job.image_url || null,
          image_url: job.image_url || null,
          image: job.image_url || null // For backward compatibility
        };
      });

      console.log('✅ [JOBS-DATA] Successfully transformed jobs:', {
        totalJobs: transformedJobs.length,
        jobIds: transformedJobs.map(j => j.id),
        jobTitles: transformedJobs.map(j => j.title)
      });

      setJobs(transformedJobs);
    } catch (err) {
      console.error('💥 [JOBS-DATA] Error in fetchJobs:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
      console.log('🔍 [JOBS-DATA] Fetch completed, loading set to false');
    }
  };

  const refreshJobs = async () => {
    console.log('🔄 [JOBS-DATA] Refresh jobs called');
    await fetchJobs();
  };

  useEffect(() => {
    console.log('🔍 [JOBS-DATA] useEffect triggered, calling fetchJobs');
    fetchJobs();
  }, []);

  console.log('🔍 [JOBS-DATA] Hook returning:', {
    jobsCount: jobs.length,
    loading,
    error,
    hasJobs: jobs.length > 0
  });

  // Apply mandatory tier sorting to jobs before returning
  const sortedJobs = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return [];
    
    console.log('🎯 [JOBS-DATA] Applying final tier sorting to all jobs');
    return sortJobsByTierAndDate(jobs);
  }, [jobs]);

  return {
    jobs: sortedJobs,
    loading,
    error,
    refreshJobs
  };
};
