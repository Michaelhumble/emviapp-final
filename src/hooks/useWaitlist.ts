
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export const useWaitlist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const joinWaitlist = async (waitlistType: string, metadata: any = {}) => {
    if (!user) {
      toast.error('Please sign in to join waitlists');
      return false;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('waitlists')
        .upsert({
          user_id: user.id,
          waitlist_type: waitlistType,
          metadata: metadata
        });

      if (error) throw error;

      toast.success('Successfully joined waitlist!');
      return true;
    } catch (error) {
      console.error('Error joining waitlist:', error);
      toast.error('Failed to join waitlist. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getWaitlistStatus = async (waitlistType: string) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('waitlists')
        .select('status, joined_at')
        .eq('user_id', user.id)
        .eq('waitlist_type', waitlistType)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (error) {
      console.error('Error fetching waitlist status:', error);
      return null;
    }
  };

  return {
    joinWaitlist,
    getWaitlistStatus,
    isLoading
  };
};
