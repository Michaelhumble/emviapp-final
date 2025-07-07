
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import type { JobDetailsSubmission } from '@/types/job';

export const useJobPosting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const submitFreeJob = async (jobData: JobDetailsSubmission): Promise<{ success: boolean; jobId?: string; error?: string }> => {
    console.log('🚀 [FREE-JOB] Starting free job submission...');
    console.log('🚀 [FREE-JOB] User:', user?.id);
    console.log('🚀 [FREE-JOB] Job data:', jobData);

    if (!user) {
      const error = 'User not authenticated';
      console.error('❌ [FREE-JOB] Error:', error);
      toast.error('Please sign in to post a job');
      return { success: false, error };
    }

    setIsSubmitting(true);

    try {
      // Prepare the job data for Supabase insert
      const supabaseJobData = {
        title: jobData.title || 'Untitled Job',
        category: jobData.category || 'Other',
        location: jobData.location || '',
        description: jobData.description || '',
        compensation_type: jobData.compensation_type || '',
        compensation_details: jobData.compensation_details || '',
        requirements: jobData.requirements || '',
        user_id: user.id, // Critical: Set the user_id
        status: 'active',
        pricing_tier: 'free',
        contact_info: jobData.contact_info || {},
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      };

      console.log('📤 [FREE-JOB] Prepared Supabase data:', supabaseJobData);

      // Direct insert to Supabase
      const { data: insertedJob, error: insertError } = await supabase
        .from('jobs')
        .insert([supabaseJobData])
        .select()
        .single();

      if (insertError) {
        console.error('❌ [FREE-JOB] Supabase insert error:', insertError);
        console.error('❌ [FREE-JOB] Error details:', {
          code: insertError.code,
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint
        });
        
        toast.error(`Failed to post job: ${insertError.message}`);
        return { success: false, error: insertError.message };
      }

      if (!insertedJob) {
        const error = 'No job data returned from insert';
        console.error('❌ [FREE-JOB] Error:', error);
        toast.error('Failed to create job record');
        return { success: false, error };
      }

      console.log('✅ [FREE-JOB] Job successfully inserted:', insertedJob);
      toast.success('Job posted successfully!');
      
      return { success: true, jobId: insertedJob.id };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('💥 [FREE-JOB] Unexpected error:', error);
      toast.error(`Failed to post job: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitPaidJob = async (jobData: JobDetailsSubmission): Promise<{ success: boolean; jobId?: string; error?: string }> => {
    console.log('💳 [PAID-JOB] Starting paid job submission...');
    
    if (!user) {
      const error = 'User not authenticated';
      console.error('❌ [PAID-JOB] Error:', error);
      toast.error('Please sign in to post a job');
      return { success: false, error };
    }

    setIsSubmitting(true);

    try {
      // First, insert the job as draft status
      const supabaseJobData = {
        title: jobData.title || 'Untitled Job',
        category: jobData.category || 'Other',
        location: jobData.location || '',
        description: jobData.description || '',
        compensation_type: jobData.compensation_type || '',
        compensation_details: jobData.compensation_details || '',
        requirements: jobData.requirements || '',
        user_id: user.id,
        status: 'draft', // Start as draft for paid jobs
        pricing_tier: 'premium',
        contact_info: jobData.contact_info || {},
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };

      console.log('📤 [PAID-JOB] Inserting draft job:', supabaseJobData);

      const { data: draftJob, error: insertError } = await supabase
        .from('jobs')
        .insert([supabaseJobData])
        .select()
        .single();

      if (insertError) {
        console.error('❌ [PAID-JOB] Draft insert error:', insertError);
        toast.error(`Failed to create job draft: ${insertError.message}`);
        return { success: false, error: insertError.message };
      }

      console.log('✅ [PAID-JOB] Draft job created:', draftJob);

      // TODO: Proceed with Stripe payment flow
      // For now, just return success with the draft job ID
      return { success: true, jobId: draftJob.id };

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('💥 [PAID-JOB] Unexpected error:', error);
      toast.error(`Failed to post job: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitFreeJob,
    submitPaidJob,
    isSubmitting
  };
};
