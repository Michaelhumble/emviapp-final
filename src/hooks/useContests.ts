
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export const useContests = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const enterContest = async (contestId: string, metadata?: Record<string, any>) => {
    if (!user) {
      toast.error('Please sign in to enter contests');
      return false;
    }

    setIsLoading(true);
    
    try {
      // For demo purposes, we'll just show a success message
      // In a real app, you'd have a contests table and handle entries
      toast.success('Contest entry submitted! Good luck!');
      return true;
    } catch (error) {
      console.error('Error entering contest:', error);
      toast.error('Failed to enter contest. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    enterContest,
    isLoading
  };
};
