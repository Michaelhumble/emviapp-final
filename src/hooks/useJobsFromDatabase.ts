
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

interface DatabaseJob {
  id: string;
  title: string;
  description: string;
  location: string;
  pricing_tier: string;
  status: string;
  contact_info: any;
  created_at: string;
  user_id: string;
  compensation_details: string;
  requirements: string;
  expires_at: string;
}

export const useJobsFromDatabase = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        console.log('Fetching jobs from database...');
        
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching jobs:', error);
          setError(error.message);
          return;
        }

        console.log('Fetched jobs:', data);

        // Transform database jobs to Job type
        const transformedJobs: Job[] = data.map((dbJob: DatabaseJob) => ({
          id: dbJob.id,
          title: dbJob.title,
          company: dbJob.contact_info?.company || 'Company Name',
          location: dbJob.location,
          created_at: dbJob.created_at,
          description: dbJob.description,
          image: '', // Will be handled by ImageWithFallback
          price: dbJob.compensation_details || '',
          status: dbJob.status as 'active' | 'expired',
          type: 'job',
          role: dbJob.title,
          compensation_details: dbJob.compensation_details,
          requirements: dbJob.requirements,
          pricing_tier: dbJob.pricing_tier,
          contact_info: dbJob.contact_info,
          expires_at: dbJob.expires_at,
          user_id: dbJob.user_id
        }));

        setJobs(transformedJobs);
      } catch (err) {
        console.error('Error in fetchJobs:', err);
        setError('Failed to load jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return { jobs, loading, error };
};
