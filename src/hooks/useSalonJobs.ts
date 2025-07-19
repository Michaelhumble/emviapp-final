import { useState, useEffect } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
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
    if (!user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabaseBypass
        .from('jobs')
        .select('*')
        .eq('user_id' as any, user.id)
        .eq('status' as any, 'active')
        .order('created_at' as any, { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      }
      setJobs((data as any) || []);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch jobs'));
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  // Fetch applications for all jobs
  const fetchApplications = async () => {
    if (!user?.id) return;

    try {
      // Get job IDs for this user
      const { data: userJobs, error: jobsError } = await supabaseBypass
        .from('jobs')
        .select('id')
        .eq('user_id' as any, user.id);

      if (jobsError) throw jobsError;
      
      if (!(userJobs as any)?.length) {
        setApplications([]);
        return;
      }

      const jobIds = (userJobs as any).map((job: any) => job.id);

      const { data, error } = await supabaseBypass
        .from('job_applications')
        .select('*')
        .in('job_id' as any, jobIds)
        .order('created_at' as any, { ascending: false });

      if (error) throw error;
      setApplications((data as any) || []);
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
      const { error } = await supabaseBypass
        .from('jobs')
        .insert({
          ...jobData,
          user_id: user.id,
          status: 'active',
          category: 'beauty', // Default category
        } as any);

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
      const { error } = await supabaseBypass
        .from('jobs')
        .update(updates as any)
        .eq('id' as any, jobId);

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
    if (!confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
      return false;
    }

    try {
      const { error } = await supabaseBypass
        .from('jobs')
        .delete()
        .eq('id' as any, jobId)
        .eq('user_id' as any, user?.id); // Security check

      if (error) {
        console.error('Error deleting job:', error);
        throw error;
      }
      
      await fetchJobs(); // Refresh the list
      toast.success('Job deleted successfully');
      return true;
    } catch (err) {
      console.error('Error deleting job:', err);
      toast.error('Failed to delete job. Please try again.');
      return false;
    }
  };

  // Update application status
  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabaseBypass
        .from('job_applications')
        .update({ status } as any)
        .eq('id' as any, applicationId);

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