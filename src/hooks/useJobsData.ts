
import { useState, useEffect, useMemo } from 'react';
import { Job } from '@/types/job';
import { supabaseBypass } from '@/types/supabase-bypass';
import { sortJobsByTierAndDate } from '@/utils/jobSorting';
import { deduplicateJobs } from '@/utils/jobDeduplication';

export const useJobsData = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    console.log('🔍 [JOBS-DATA] Starting to fetch jobs from Supabase...');
    console.log('🔍 [JOBS-DATA] Supabase client configured:', !!supabaseBypass);
    
    try {
      setLoading(true);
      setError(null);
      
      const { data: jobsData, error: fetchError, count } = await supabaseBypass
        .from('jobs')
        .select('*', { count: 'exact' })
        .eq('status' as any, 'active')
        .gte('expires_at' as any, new Date().toISOString())
        .order('created_at' as any, { ascending: false });
        
      // LOG ALL ACTIVE JOBS FOR DEBUGGING
      console.log('🔍 [JOBS-DATA] ACTIVE JOBS QUERY RESULTS:');
      if (jobsData && jobsData.length > 0) {
        jobsData.forEach((job: any, index: number) => {
          console.log(`📋 [JOBS-DATA] Job ${index + 1}:`, {
            id: job?.id,
            title: job?.title,
            status: job?.status,
            pricing_tier: job?.pricing_tier,
            created_at: job?.created_at,
            user_id: job?.user_id
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

      const transformedJobs: Job[] = (jobsData || []).map((job: any) => {
        console.log('🔍 [JOBS-DATA] Transforming job:', {
          id: job?.id,
          title: job?.title,
          vietnamese_title: job?.vietnamese_title,
          vietnamese_description: job?.vietnamese_description,
          user_id: job?.user_id,
          status: job?.status,
          created_at: job?.created_at
        });
        
        return {
          id: job?.id || '',
          title: job?.title || 'Job Title',
          company: job?.title || 'Company Name',
          location: job?.location || '',
          created_at: job?.created_at || new Date().toISOString(),
          description: job?.description || '',
          compensation_type: job?.compensation_type || '',
          compensation_details: job?.compensation_details || '',
          contact_info: typeof job?.contact_info === 'object' && job?.contact_info ? job?.contact_info as any : {},
          user_id: job?.user_id || '',
          status: job?.status || 'active',
          expires_at: job?.expires_at || '',
          requirements: job?.requirements || '',
          pricing_tier: job?.pricing_tier || 'free',
          category: job?.category || "Other",
          // FIXED: Include Vietnamese fields for nail jobs
          vietnamese_title: job?.vietnamese_title || null,
          vietnamese_description: job?.vietnamese_description || null,
          // Safe image handling - only set if actually exists
          imageUrl: job?.image_url || null,
          image_url: job?.image_url || null,
          image: job?.image_url || null // For backward compatibility
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
    
    // Guard against insecure contexts (iOS PWA/in-app browsers)
    const isSecureForWebSocket = typeof window !== 'undefined' && 
                                window.isSecureContext && 
                                'WebSocket' in window;
    
    const isStandalone = typeof window !== 'undefined' && 
                        (window.matchMedia('(display-mode: standalone)').matches || 
                         (window.navigator as any).standalone);
    
    // Skip realtime in insecure contexts to prevent crashes
    if (!isSecureForWebSocket || isStandalone) {
      console.log('🚫 [JOBS-DATA] Skipping realtime subscriptions (insecure context or PWA)');
      
      // Set up HTTP polling fallback for updates
      const interval = setInterval(() => {
        console.log('🔄 [JOBS-DATA] HTTP fallback refresh');
        fetchJobs();
      }, 60 * 1000); // Poll every 60 seconds instead of realtime
      
      return () => {
        clearInterval(interval);
      };
    }

    try {
      // Set up real-time subscription for instant job updates
      const channel = supabaseBypass
        .channel('jobs-realtime-updates')
        .on(
          'postgres_changes',
          {
            event: '*', // Listen to all changes (INSERT, UPDATE, DELETE)
            schema: 'public',
            table: 'jobs'
          },
          (payload) => {
            console.log('🚀 [JOBS-DATA] Real-time job update received:', payload);
            fetchJobs(); // Refresh jobs when any change occurs
          }
        )
        .subscribe();

      // Set up aggressive refresh for near-instant visibility (30 seconds)
      const interval = setInterval(() => {
        console.log('🔄 [JOBS-DATA] Fast refresh for instant visibility');
        fetchJobs();
      }, 30 * 1000); // Refresh every 30 seconds
      
      console.log('✅ [JOBS-DATA] Realtime subscriptions established');
      
      return () => {
        clearInterval(interval);
        supabaseBypass.removeChannel(channel);
      };
    } catch (error) {
      console.warn('⚠️ [JOBS-DATA] Failed to establish realtime subscriptions:', error);
      
      // Fallback to HTTP polling
      const interval = setInterval(() => {
        console.log('🔄 [JOBS-DATA] Error fallback refresh');
        fetchJobs();
      }, 60 * 1000);
      
      return () => {
        clearInterval(interval);
      };
    }
  }, []);

  console.log('🔍 [JOBS-DATA] Hook returning:', {
    jobsCount: jobs.length,
    loading,
    error,
    hasJobs: jobs.length > 0
  });

  // Apply deduplication and tier sorting to jobs before returning
  const processedJobs = useMemo(() => {
    if (!jobs || !Array.isArray(jobs)) return [];
    
    console.log('🎯 [JOBS-DATA] Applying deduplication and tier sorting to all jobs');
    const deduplicatedJobs = deduplicateJobs(jobs);
    return sortJobsByTierAndDate(deduplicatedJobs);
  }, [jobs]);

  return {
    jobs: processedJobs,
    loading,
    error,
    refreshJobs
  };
};
