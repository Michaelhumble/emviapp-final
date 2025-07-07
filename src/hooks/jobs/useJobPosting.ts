
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface JobFormData {
  title: string;
  category: string;
  location: string;
  description: string;
  compensation_type: string;
  compensation_details: string;
  requirements: string;
  contact_info: {
    email?: string;
    phone?: string;
    website?: string;
  };
}

export const useJobPosting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const submitJob = async (formData: JobFormData, pricingTier: 'free' | 'premium' = 'free') => {
    if (!user) {
      console.error('❌ [JOB-POST] User not authenticated');
      toast.error('Please sign in to post a job');
      return { success: false, error: 'User not authenticated' };
    }

    setIsSubmitting(true);
    console.log('🚀 [JOB-POST] Starting job submission...', {
      user_id: user.id,
      pricing_tier: pricingTier,
      formData
    });

    try {
      // Prepare job data for Supabase insert
      const jobData = {
        title: formData.title.trim(),
        category: formData.category || 'Other',
        location: formData.location.trim(),
        description: formData.description.trim(),
        compensation_type: formData.compensation_type,
        compensation_details: formData.compensation_details,
        requirements: formData.requirements,
        contact_info: formData.contact_info || {},
        user_id: user.id,
        status: 'active' as const,
        pricing_tier: pricingTier,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      };

      console.log('📝 [JOB-POST] Inserting job data into Supabase:', jobData);

      // Insert job into Supabase
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (error) {
        console.error('❌ [JOB-POST] Supabase insert failed:', {
          error: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        // Show specific error message based on error type
        let errorMessage = 'Failed to post job';
        if (error.message.includes('violates row-level security policy')) {
          errorMessage = 'Permission denied. Please sign in and try again.';
        } else if (error.message.includes('not-null violation')) {
          errorMessage = 'Missing required information. Please fill all required fields.';
        } else {
          errorMessage = `Database error: ${error.message}`;
        }
        
        toast.error(errorMessage);
        return { success: false, error: error.message };
      }

      if (!data) {
        console.error('❌ [JOB-POST] No data returned from insert');
        toast.error('Job posting failed - no data returned');
        return { success: false, error: 'No data returned from insert' };
      }

      console.log('✅ [JOB-POST] Job successfully inserted:', data);

      // Verify the job exists in the database
      const { data: verifyData, error: verifyError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', data.id)
        .single();

      if (verifyError || !verifyData) {
        console.error('❌ [JOB-POST] Job verification failed:', verifyError);
        toast.error('Job posted but verification failed');
        return { success: false, error: 'Job verification failed' };
      }

      console.log('✅ [JOB-POST] Job verified in database:', verifyData);
      toast.success('Job posted successfully!');

      // Navigate to success page with job ID
      navigate(`/post-success?jobId=${data.id}&type=${pricingTier}`);
      
      return { success: true, data: data };

    } catch (error) {
      console.error('💥 [JOB-POST] Unexpected error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to post job: ${errorMessage}`);
      return { success: false, error: errorMessage };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitJob,
    isSubmitting
  };
};
