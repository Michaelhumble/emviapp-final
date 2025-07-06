
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

export const useJobsData = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchJobs = async () => {
    try {
      console.log('🔍 [JOBS-DATA] ===================');
      console.log('🔍 [JOBS-DATA] Starting job fetch...');
      
      // EXACT QUERY: Fetch ALL active jobs regardless of pricing_tier
      const { data: jobsData, error: fetchError } = await supabase
        .from('jobs')
        .select(`
          id,
          title,
          category,
          location,
          description,
          compensation_type,
          compensation_details,
          contact_info,
          user_id,
          status,
          expires_at,
          requirements,
          pricing_tier,
          created_at
        `)
        .eq('status', 'active')  // ONLY filter by status = 'active'
        .order('created_at', { ascending: false });

      console.log('🔍 [JOBS-DATA] Supabase query executed');
      console.log('🔍 [JOBS-DATA] Raw Supabase response:', { 
        dataCount: jobsData?.length || 0, 
        fetchError,
        rawData: jobsData 
      });

      if (fetchError) {
        console.error('❌ [JOBS-DATA] Supabase fetch error:', fetchError);
        throw fetchError;
      }

      if (!jobsData) {
        console.log('⚠️ [JOBS-DATA] No jobs data returned from Supabase');
        setJobs([]);
        return;
      }

      console.log('📊 [JOBS-DATA] Database rows retrieved:', jobsData.length);
      jobsData.forEach((job, index) => {
        console.log(`📝 [JOBS-DATA] Job ${index + 1}:`, {
          id: job.id,
          title: job.title,
          status: job.status,
          pricing_tier: job.pricing_tier,
          user_id: job.user_id,
          created_at: job.created_at,
          contact_info_type: typeof job.contact_info,
          contact_info_value: job.contact_info
        });
      });

      // Transform to Job interface with proper contact_info handling
      const transformedJobs: Job[] = jobsData.map((job, index) => {
        console.log(`🔄 [JOBS-DATA] Transforming job ${index + 1} (${job.id})...`);
        
        // Safely handle contact_info conversion
        let contactInfo = {};
        if (job.contact_info) {
          if (typeof job.contact_info === 'object' && job.contact_info !== null) {
            contactInfo = job.contact_info as any;
            console.log(`✅ [JOBS-DATA] Job ${index + 1} contact_info is object:`, contactInfo);
          } else if (typeof job.contact_info === 'string') {
            try {
              contactInfo = JSON.parse(job.contact_info);
              console.log(`✅ [JOBS-DATA] Job ${index + 1} contact_info parsed from string:`, contactInfo);
            } catch (parseError) {
              console.warn(`⚠️ [JOBS-DATA] Job ${index + 1} contact_info JSON parse failed:`, parseError);
              contactInfo = {};
            }
          }
        } else {
          console.log(`⚠️ [JOBS-DATA] Job ${index + 1} has no contact_info`);
        }

        const transformedJob = {
          id: job.id,
          title: job.title || 'Untitled Job',
          category: job.category || 'Other',
          location: job.location || '',
          description: job.description || '',
          compensation_type: job.compensation_type || '',
          compensation_details: job.compensation_details || '',
          contact_info: contactInfo,
          user_id: job.user_id || '',
          status: job.status || 'active',
          expires_at: job.expires_at || '',
          requirements: job.requirements || '',
          pricing_tier: job.pricing_tier || 'free',
          created_at: job.created_at || new Date().toISOString()
        };

        console.log(`✅ [JOBS-DATA] Job ${index + 1} transformed:`, transformedJob);
        return transformedJob;
      });

      setJobs(transformedJobs);
      console.log('🎯 [JOBS-DATA] Final transformed jobs set in state:', transformedJobs.length);
      console.log('🎯 [JOBS-DATA] Jobs by pricing tier:', {
        free: transformedJobs.filter(j => j.pricing_tier === 'free').length,
        premium: transformedJobs.filter(j => j.pricing_tier === 'premium').length,
        gold: transformedJobs.filter(j => j.pricing_tier === 'gold').length,
        diamond: transformedJobs.filter(j => j.pricing_tier === 'diamond').length
      });

    } catch (err) {
      console.error('💥 [JOBS-DATA] Error in fetchJobs:', err);
      setError(err as Error);
    } finally {
      setLoading(false);
      console.log('🔍 [JOBS-DATA] =================== END');
    }
  };

  const refetch = () => {
    console.log('🔄 [JOBS-DATA] Manual refetch triggered');
    setLoading(true);
    setError(null);
    fetchJobs();
  };

  useEffect(() => {
    console.log('🚀 [JOBS-DATA] Hook initialized, fetching jobs...');
    fetchJobs();

    // Set up real-time subscription for immediate updates
    const channel = supabase
      .channel('jobs-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'jobs'
        },
        (payload) => {
          console.log('⚡ [JOBS-DATA] Real-time INSERT detected:', payload);
          // Only refetch if the new job is active
          if (payload.new && payload.new.status === 'active') {
            console.log('⚡ [JOBS-DATA] New active job detected, refetching...');
            fetchJobs();
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'jobs'
        },
        (payload) => {
          console.log('⚡ [JOBS-DATA] Real-time UPDATE detected:', payload);
          // Refetch on status changes or other updates
          if (payload.new && (payload.new.status === 'active' || payload.old?.status !== payload.new.status)) {
            console.log('⚡ [JOBS-DATA] Job status change detected, refetching...');
            fetchJobs();
          }
        }
      )
      .subscribe();

    console.log('🔗 [JOBS-DATA] Real-time subscription established');

    return () => {
      console.log('🔌 [JOBS-DATA] Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    jobs,
    loading,
    error,
    refetch
  };
};
