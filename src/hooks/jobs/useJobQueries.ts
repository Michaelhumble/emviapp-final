
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

export const useJobQueries = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (filters?: { pricingTier?: string; status?: string; userId?: string }) => {
    console.log('🔍 fetchJobs called with filters:', filters);
    setLoading(true);
    try {
      let query = supabase.from('jobs').select('*');

      if (filters?.pricingTier) {
        console.log('🏷️ Adding pricing_tier filter:', filters.pricingTier);
        query = query.eq('pricing_tier', filters.pricingTier);
      }
      if (filters?.status) {
        console.log('📊 Adding status filter:', filters.status);
        query = query.eq('status', filters.status);
      }
      if (filters?.userId) {
        console.log('👤 Adding user_id filter:', filters.userId);
        query = query.eq('user_id', filters.userId);
      }

      console.log('📡 Executing Supabase query...');
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Supabase query error:', error);
        console.error('❌ Query error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('📦 Raw data from Supabase:', data);
      console.log('📊 Data count:', data?.length || 0);

      // Transform the data to match our Job interface
      const transformedJobs = (data || []).map(job => {
        console.log('🔄 Transforming job:', job.id, job.title);
        return {
          ...job,
          contact_info: typeof job.contact_info === 'object' && job.contact_info !== null 
            ? job.contact_info as { [key: string]: any; owner_name?: string; phone?: string; email?: string; notes?: string; zalo?: string; }
            : {}
        } as Job;
      });

      console.log('✅ Transformed jobs:', transformedJobs);
      console.log('✅ Jobs with pricing_tier "free":', transformedJobs.filter(job => job.pricing_tier === 'free'));
      
      setJobs(transformedJobs);
      return transformedJobs;
    } catch (error) {
      console.error('❌ Error fetching jobs:', error);
      console.error('❌ Full fetch error:', JSON.stringify(error, null, 2));
      return [];
    } finally {
      setLoading(false);
    }
  };

  const fetchJobById = async (jobId: string): Promise<Job | null> => {
    console.log('🔍 fetchJobById called with ID:', jobId);
    try {
      console.log('📡 Executing single job query...');
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error) {
        console.error('❌ Error fetching job by ID:', error);
        console.error('❌ Single job error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
      
      console.log('📦 Job data fetched:', data);
      
      // Transform the data to match our Job interface
      const transformedJob = {
        ...data,
        contact_info: typeof data.contact_info === 'object' && data.contact_info !== null 
          ? data.contact_info as { [key: string]: any; owner_name?: string; phone?: string; email?: string; notes?: string; zalo?: string; }
          : {}
      } as Job;

      console.log('✅ Transformed single job:', transformedJob);
      return transformedJob;
    } catch (error) {
      console.error('❌ Error fetching job by ID:', error);
      return null;
    }
  };

  return {
    jobs,
    loading,
    fetchJobs,
    fetchJobById
  };
};
