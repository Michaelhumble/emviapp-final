
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { JobFormData } from '@/types/job';
import { toast } from 'sonner';

export const useJobMutations = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const createJob = async (jobData: JobFormData, pricingTier: string = 'free') => {
    console.log('🔥 createJob called with:', { jobData, pricingTier, userId: user?.id });
    
    if (!user?.id) {
      console.error('❌ No user ID found');
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

      console.log('📤 Attempting to insert job with payload:', JSON.stringify(jobPayload, null, 2));

      const { data, error } = await supabase
        .from('jobs')
        .insert(jobPayload)
        .select();

      if (error) {
        console.error('❌ Supabase insert error:', error);
        console.error('❌ Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      console.log('✅ Job created successfully:', data);
      console.log('✅ Inserted job data:', JSON.stringify(data, null, 2));
      toast.success('Job posted successfully!');
      return true;
    } catch (error) {
      console.error('❌ Error creating job:', error);
      console.error('❌ Full error object:', JSON.stringify(error, null, 2));
      toast.error('Failed to post job. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateJob = async (jobId: string, jobData: Partial<JobFormData>) => {
    console.log('🔄 updateJob called with:', { jobId, jobData, userId: user?.id });
    
    if (!user?.id) {
      console.error('❌ No user ID found for update');
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

      console.log('📤 Attempting to update job with payload:', JSON.stringify(updatePayload, null, 2));

      const { error } = await supabase
        .from('jobs')
        .update(updatePayload)
        .eq('id', jobId)
        .eq('user_id', user.id);

      if (error) {
        console.error('❌ Supabase update error:', error);
        throw error;
      }

      console.log('✅ Job updated successfully');
      toast.success('Job updated successfully!');
      return true;
    } catch (error) {
      console.error('❌ Error updating job:', error);
      toast.error('Failed to update job. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (jobId: string) => {
    console.log('🗑️ deleteJob called with:', { jobId, userId: user?.id });
    
    if (!user?.id) {
      console.error('❌ No user ID found for delete');
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

      if (error) {
        console.error('❌ Supabase delete error:', error);
        throw error;
      }

      console.log('✅ Job deleted successfully');
      toast.success('Job deleted successfully!');
      return true;
    } catch (error) {
      console.error('❌ Error deleting job:', error);
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
