
import { useState, useEffect } from 'react';
import { supabaseBypass } from "@/types/supabase-bypass";
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface Contest {
  id: string;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  max_entries?: number;
  status: string;
}

export const useContests = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const fetchActiveContests = async () => {
    try {
      const { data, error } = await supabaseBypass
        .from('contests')
        .select('*')
        .eq('status', 'active' as any)
        .gte('end_date', new Date().toISOString());

      if (error) throw error;
      setContests((data || []) as any);
    } catch (error) {
      console.error('Error fetching contests:', error);
    }
  };

  const enterContest = async (contestId: string, entryData: any = {}) => {
    if (!user) {
      toast.error('Please sign in to enter contests');
      return false;
    }

    setIsLoading(true);
    
    try {
      // Check if user already entered
      const { data: existingEntry } = await supabaseBypass
        .from('contest_entries')
        .select('id')
        .eq('contest_id', contestId as any)
        .eq('user_id', user.id as any)
        .single();

      if (existingEntry) {
        toast.error('You have already entered this contest');
        return false;
      }

      // Check contest capacity
      const contest = contests.find(c => c.id === contestId);
      if (contest?.max_entries) {
        const { count } = await supabaseBypass
          .from('contest_entries')
          .select('id', { count: 'exact' })
          .eq('contest_id', contestId as any);

        if (count && count >= contest.max_entries) {
          toast.error('Contest is full');
          return false;
        }
      }

      const { error } = await supabaseBypass
        .from('contest_entries')
        .insert({
          contest_id: contestId,
          user_id: user.id,
          entry_data: entryData
        } as any);

      if (error) throw error;

      toast.success('Successfully entered contest!');
      return true;
    } catch (error) {
      console.error('Error entering contest:', error);
      toast.error('Failed to enter contest. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveContests();
  }, []);

  return {
    contests,
    enterContest,
    isLoading,
    fetchActiveContests
  };
};
