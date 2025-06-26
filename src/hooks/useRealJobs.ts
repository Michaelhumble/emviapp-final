
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
          const transformedJobs: Job[] = (data || []).map(job => {
            // Safely parse contact_info if it's a JSON object
            let contactInfo = {
              phone: '',
              email: '',
              owner_name: ''
            };
            
            if (job.contact_info && typeof job.contact_info === 'object') {
              const contact = job.contact_info as any;
              contactInfo = {
                phone: contact.phone || '',
                email: contact.email || '',
                owner_name: contact.owner_name || ''
              };
            }

            return {
              id: job.id,
              title: job.title || '',
              company: job.title || '', // Use title as company if no separate company field
              location: job.location || '',
              description: job.description || '',
              created_at: job.created_at,
              salary_range: job.compensation_details || '',
              employment_type: job.compensation_type || '',
              contact_info: contactInfo,
              requirements: job.requirements ? [job.requirements] : [],
              benefits: [], // Default empty array since not in DB schema
              specialties: [], // Default empty array since not in DB schema
              pricing_tier: job.pricing_tier,
              is_featured: false, // Default false since not in DB schema
              status: job.status,
              expires_at: job.expires_at,
              user_id: job.user_id
            };
          });
          
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
