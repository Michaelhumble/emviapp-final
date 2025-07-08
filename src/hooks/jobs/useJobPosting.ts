
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useNavigate } from 'react-router-dom';

export interface JobFormData {
  title: string;
  category: string;
  location: string;
  description: string;
  compensation_type: string;
  compensation_details: string;
  requirements: string;
  contact_info: {
    owner_name?: string;
    phone?: string;
    email?: string;
    notes?: string;
  };
}

export const useJobPosting = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const submitJob = async (jobData: JobFormData) => {
    console.log('🚀 [JOB-POSTING] Starting job submission with data:', jobData);
    
    if (!user) {
      const errorMsg = 'User not authenticated';
      console.error('❌ [JOB-POSTING] Error:', errorMsg);
      setError(errorMsg);
      return false;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare the job payload for Supabase
      const jobPayload = {
        title: jobData.title,
        category: jobData.category,
        location: jobData.location,
        description: jobData.description,
        compensation_type: jobData.compensation_type,
        compensation_details: jobData.compensation_details,
        requirements: jobData.requirements,
        contact_info: jobData.contact_info,
        user_id: user.id, // Required for RLS
        status: 'active',
        pricing_tier: 'free'
      };

      console.log('📤 [JOB-POSTING] Submitting to Supabase with payload:', jobPayload);

      const { data, error: insertError } = await supabase
        .from('jobs')
        .insert([jobPayload])
        .select()
        .single();

      console.log('📊 [JOB-POSTING] Supabase response - data:', data);
      console.log('📊 [JOB-POSTING] Supabase response - error:', insertError);

      if (insertError) {
        console.error('❌ [JOB-POSTING] Supabase insert error:', insertError);
        setError(`Failed to post job: ${insertError.message}`);
        return false;
      }

      if (data) {
        console.log('✅ [JOB-POSTING] Job posted successfully:', data);
        // Navigate to jobs page to show the new job
        navigate('/jobs');
        return true;
      }

      return false;
    } catch (err) {
      console.error('💥 [JOB-POSTING] Unexpected error:', err);
      setError(`An unexpected error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitJob,
    isSubmitting,
    error,
    clearError: () => setError(null)
  };
};
