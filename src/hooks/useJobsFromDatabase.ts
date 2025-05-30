
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/job';

interface DatabaseJob {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  status: string | null;
  pricing_tier: string | null;
  contact_info: any;
  created_at: string;
  user_id: string | null;
  compensation_details: string | null;
  compensation_type: string | null;
  requirements: string | null;
}

export const useJobsFromDatabase = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        console.log('Fetching active jobs from database...');
        
        const { data, error: fetchError } = await supabase
          .from('jobs')
          .select('*')
          .eq('status', 'active')
          .order('created_at', { ascending: false });

        if (fetchError) {
          console.error('Error fetching jobs:', fetchError);
          setError(fetchError.message);
          return;
        }

        // Transform database jobs to match Job interface
        const transformedJobs: Job[] = (data || []).map((dbJob: DatabaseJob) => ({
          id: dbJob.id,
          title: dbJob.title,
          company: 'Posted via EmviApp', // Default company name for database jobs
          location: dbJob.location || 'Location not specified',
          description: dbJob.description || '',
          created_at: dbJob.created_at,
          salary_range: dbJob.compensation_details || dbJob.compensation_type || 'Contact for details',
          employment_type: 'Full-time', // Default employment type
          pricingTier: dbJob.pricing_tier || 'free',
          contact_info: dbJob.contact_info || {},
          requirements: dbJob.requirements,
          status: dbJob.status || 'active',
          user_id: dbJob.user_id,
          // Add default properties to match Job interface
          experience_level: 'Entry Level',
          is_featured: dbJob.pricing_tier === 'diamond' || dbJob.pricing_tier === 'premium',
          is_vietnamese_listing: false // Database jobs are not Vietnamese protected listings
        }));

        console.log(`Successfully fetched ${transformedJobs.length} active jobs from database`);
        setJobs(transformedJobs);
        setError(null);
      } catch (err) {
        console.error('Unexpected error fetching jobs:', err);
        setError('Failed to load jobs from database');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Group jobs by pricing tier for organized display
  const jobsByTier = {
    diamond: jobs.filter(job => job.pricingTier === 'diamond'),
    premium: jobs.filter(job => job.pricingTier === 'premium'),
    gold: jobs.filter(job => job.pricingTier === 'gold'),
    free: jobs.filter(job => job.pricingTier === 'free' || !job.pricingTier)
  };

  return {
    jobs,
    jobsByTier,
    loading,
    error,
    totalCount: jobs.length
  };
};
