
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

export const useRealJobs = () => {
  const [realJobs, setRealJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRealJobs = async () => {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching real jobs:', error);
          setError(error);
        } else {
          // Transform database jobs to match our Job type
          const transformedJobs: Job[] = (data || []).map(job => ({
            id: job.id,
            title: job.title || '',
            company: job.company || '',
            location: job.location || '',
            description: job.description || '',
            created_at: job.created_at,
            salary_range: job.salary_range || job.compensation_details,
            employment_type: job.employment_type,
            contact_info: job.contact_info || {
              phone: job.phone,
              email: job.email,
              owner_name: job.owner_name
            },
            requirements: job.requirements || [],
            benefits: job.benefits || [],
            specialties: job.specialties || [],
            pricing_tier: job.pricing_tier,
            is_featured: job.is_featured || false,
            status: job.status,
            expires_at: job.expires_at
          }));
          
          setRealJobs(transformedJobs);
          console.log(`Fetched ${transformedJobs.length} real jobs from database`);
        }
      } catch (err) {
        console.error('Error in fetchRealJobs:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchRealJobs();

    // Set up real-time subscription for new jobs
    const channel = supabase
      .channel('jobs-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'jobs'
        },
        () => {
          // Refetch jobs when changes occur
          fetchRealJobs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { realJobs, loading, error };
};
