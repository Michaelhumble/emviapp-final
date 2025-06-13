
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export const useApplications = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const submitApplication = async (
    applicationType: string, 
    targetId?: string, 
    applicationData: any = {}
  ) => {
    if (!user) {
      toast.error('Please sign in to submit applications');
      return false;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('applications')
        .insert({
          user_id: user.id,
          application_type: applicationType,
          target_id: targetId,
          application_data: applicationData
        });

      if (error) throw error;

      toast.success('Application submitted successfully!');
      return true;
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getApplicationStatus = async (applicationType: string, targetId?: string) => {
    if (!user) return null;

    try {
      const query = supabase
        .from('applications')
        .select('status, submitted_at')
        .eq('user_id', user.id)
        .eq('application_type', applicationType);

      if (targetId) {
        query.eq('target_id', targetId);
      }

      const { data, error } = await query.single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error fetching application status:', error);
      return null;
    }
  };

  return {
    submitApplication,
    getApplicationStatus,
    isLoading
  };
};
