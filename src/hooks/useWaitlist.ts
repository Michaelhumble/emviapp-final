
import { useState } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
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
      const { error } = await supabaseBypass
        .from('waitlists')
        .upsert({
          user_id: user.id,
          waitlist_type: waitlistType,
          metadata: metadata
        } as any);

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
      const { data, error } = await supabaseBypass
        .from('waitlists')
        .select('status, joined_at')
        .eq('user_id' as any, user.id as any)
        .eq('waitlist_type' as any, waitlistType as any)
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
