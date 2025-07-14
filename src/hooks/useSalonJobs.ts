import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface SalonJob {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  location?: string;
  requirements?: string;
  compensation_details?: string;
  compensation_type?: string;
  status: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
  // Additional fields from jobs table
  image_url?: string;
  image_urls?: string[];
  contact_info?: any;
  metadata?: any;
  payment_status?: string;
  photos?: string[];
  pricing_tier?: string;
  vietnamese_description?: string;
  vietnamese_title?: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  applicant_id: string;
  cover_letter?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useSalonJobs = () => {
  const [jobs, setJobs] = useState<SalonJob[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { currentSalon } = useSalon();
  const { user } = useAuth();

  // Fetch jobs
  const fetchJobs = async () => {
    if (!currentSalon?.id || !user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch jobs'));
    } finally {
      setLoading(false);
    }
  };

  // Fetch applications for all jobs
  const fetchApplications = async () => {
    if (!user?.id) return;

    try {
      // Get job IDs for this user
      const { data: userJobs, error: jobsError } = await supabase
        .from('jobs')
        .select('id')
        .eq('user_id', user.id);

      if (jobsError) throw jobsError;
      
      if (!userJobs?.length) {
        setApplications([]);
        return;
      }

      const jobIds = userJobs.map(job => job.id);

      const { data, error } = await supabase
        .from('job_applications')
        .select('*')
        .in('job_id', jobIds)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
    }
  };

  // Create new job
  const createJob = async (jobData: {
    title: string;
    description?: string;
    job_type: string;
    location?: string;
    requirements?: string;
    compensation_details?: string;
  }) => {
    if (!currentSalon?.id || !user?.id) {
      toast.error('No salon selected or user not authenticated');
      return false;
    }

    try {
      const { error } = await supabase
        .from('jobs')
        .insert({
          ...jobData,
          user_id: user.id,
          status: 'active',
          category: 'beauty', // Default category
        });

      if (error) throw error;
      
      await fetchJobs(); // Refresh the list
      toast.success('Job posted successfully!');
      return true;
    } catch (err) {
      console.error('Error creating job:', err);
      toast.error('Failed to post job');
      return false;
    }
  };

  // Update job
  const updateJob = async (jobId: string, updates: Partial<SalonJob>) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update(updates)
        .eq('id', jobId);

      if (error) throw error;
      
      await fetchJobs(); // Refresh the list
      toast.success('Job updated successfully!');
      return true;
    } catch (err) {
      console.error('Error updating job:', err);
      toast.error('Failed to update job');
      return false;
    }
  };

  // Delete job
  const deleteJob = async (jobId: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ status: 'deleted' })
        .eq('id', jobId);

      if (error) throw error;
      
      await fetchJobs(); // Refresh the list
      toast.success('Job deleted successfully');
      return true;
    } catch (err) {
      console.error('Error deleting job:', err);
      toast.error('Failed to delete job');
      return false;
    }
  };

  // Update application status
  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', applicationId);

      if (error) throw error;
      
      await fetchApplications(); // Refresh the list
      toast.success(`Application marked as ${status}`);
      return true;
    } catch (err) {
      console.error('Error updating application:', err);
      toast.error('Failed to update application');
      return false;
    }
  };

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, [currentSalon?.id, user?.id]);

  return {
    jobs,
    applications,
    loading,
    error,
    createJob,
    updateJob,
    deleteJob,
    updateApplicationStatus,
    refetch: () => {
      fetchJobs();
      fetchApplications();
    }
  };
};