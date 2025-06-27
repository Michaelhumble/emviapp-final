
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { JobFormData } from '@/types/job';
import { toast } from 'sonner';

export const useJobMutations = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createJob = async (jobData: JobFormData, pricingTier: string = 'free') => {
    if (!user?.id) {
      toast.error('You must be logged in to post a job');
      return false;
    }

    setLoading(true);
    try {
      const jobPayload = {
        title: jobData.title,
        location: jobData.location,
        description: jobData.description || '',
        compensation_type: jobData.compensation_type || 'hourly',
        compensation_details: jobData.compensation_details || '',
        employment_type: jobData.employment_type || 'full-time',
        contact_info: jobData.contact_info || {},
        pricing_tier: pricingTier,
        status: 'active',
        user_id: user.id,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      const { error } = await supabase
        .from('jobs')
        .insert(jobPayload);

      if (error) throw error;

      toast.success('Job posted successfully!');
      return true;
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Failed to post job. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (jobId: string, jobData: Partial<JobFormData>) => {
    if (!user?.id) {
      toast.error('You must be logged in to update a job');
      return false;
    }

    setLoading(true);
    try {
      const updatePayload = {
        title: jobData.title,
        location: jobData.location,
        description: jobData.description,
        compensation_type: jobData.compensation_type,
        compensation_details: jobData.compensation_details,
        employment_type: jobData.employment_type,
        contact_info: jobData.contact_info || {},
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('jobs')
        .update(updatePayload)
        .eq('id', jobId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Job updated successfully!');
      return true;
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!user?.id) {
      toast.error('You must be logged in to delete a job');
      return false;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId)
        .eq('user_id', user.id);

      if (error) throw error;

      toast.success('Job deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error deleting job:', error);
      toast.error('Failed to delete job. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    createJob,
    updateJob,
    deleteJob,
    loading
  };
};
