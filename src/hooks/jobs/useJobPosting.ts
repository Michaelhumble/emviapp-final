
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
    console.log('🚀 [JOB-POST] Starting job submission process...');
    console.log('🚀 [JOB-POST] User authenticated:', !!user);
    console.log('🚀 [JOB-POST] User ID:', user?.id);
    console.log('🚀 [JOB-POST] Form data:', formData);
    console.log('🚀 [JOB-POST] Pricing tier:', pricingTier);

    if (!user) {
      const errorMsg = 'User not authenticated - please sign in to post a job';
      console.error('❌ [JOB-POST]', errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    }

    setIsSubmitting(true);

    try {
      // Prepare job data with all required fields
      const jobData = {
        title: formData.title.trim(),
        category: formData.category || 'Other',
        location: formData.location.trim(),
        description: formData.description.trim(),
        compensation_type: formData.compensation_type || '',
        compensation_details: formData.compensation_details || '',
        requirements: formData.requirements || '',
        contact_info: formData.contact_info || {},
        user_id: user.id,
        status: 'active' as const,
        pricing_tier: pricingTier,
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      };

      console.log('📝 [JOB-POST] Prepared job data for insertion:', jobData);
      console.log('📝 [JOB-POST] Required fields check:');
      console.log('  - title:', jobData.title ? '✅' : '❌');
      console.log('  - category:', jobData.category ? '✅' : '❌');
      console.log('  - user_id:', jobData.user_id ? '✅' : '❌');
      console.log('  - status:', jobData.status ? '✅' : '❌');

      // Insert job into Supabase
      console.log('🔄 [JOB-POST] Attempting Supabase insert...');
      const { data, error } = await supabase
        .from('jobs')
        .insert([jobData])
        .select()
        .single();

      if (error) {
        console.error('❌ [JOB-POST] Supabase insert failed:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        let userFriendlyError = 'Failed to post job';
        if (error.message.includes('violates row-level security policy')) {
          userFriendlyError = 'Permission denied. Please ensure you are signed in and try again.';
        } else if (error.message.includes('not-null')) {
          userFriendlyError = 'Missing required information. Please fill all required fields.';
        } else if (error.message.includes('foreign key')) {
          userFriendlyError = 'Invalid reference data. Please refresh and try again.';
        } else {
          userFriendlyError = `Database error: ${error.message}`;
        }
        
        toast.error(userFriendlyError);
        return { success: false, error: error.message };
      }

      if (!data) {
        const errorMsg = 'No data returned from insert operation';
        console.error('❌ [JOB-POST]', errorMsg);
        toast.error('Job posting failed - please try again');
        return { success: false, error: errorMsg };
      }

      console.log('✅ [JOB-POST] Job successfully inserted with ID:', data.id);
      console.log('✅ [JOB-POST] Full inserted job data:', data);

      // Verify the job exists by attempting to fetch it
      console.log('🔍 [JOB-POST] Verifying job exists in database...');
      const { data: verifyData, error: verifyError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', data.id)
        .single();

      if (verifyError) {
        console.error('❌ [JOB-POST] Job verification failed:', verifyError);
        toast.error('Job posted but verification failed - please check your jobs list');
        return { success: false, error: 'Job verification failed' };
      }

      if (!verifyData) {
        console.error('❌ [JOB-POST] Job not found after insert');
        toast.error('Job posting failed - job not found after creation');
        return { success: false, error: 'Job not found after insert' };
      }

      console.log('✅ [JOB-POST] Job verified in database:', verifyData);
      toast.success('Job posted successfully!');

      // Navigate to success page with job ID
      navigate(`/post-success?jobId=${data.id}&type=${pricingTier}`);
      
      return { success: true, data: data };

    } catch (error) {
      console.error('💥 [JOB-POST] Unexpected error during job posting:', error);
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
