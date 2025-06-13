
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export const useVoting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const submitVote = async (targetId: string, targetType: string, voteType: string = 'upvote') => {
    if (!user) {
      toast.error('Please sign in to vote');
      return false;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('votes')
        .upsert({
          user_id: user.id,
          target_id: targetId,
          target_type: targetType,
          vote_type: voteType
        });

      if (error) throw error;

      toast.success('Vote recorded successfully!');
      return true;
    } catch (error) {
      console.error('Error submitting vote:', error);
      toast.error('Failed to record vote. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getVoteCount = async (targetId: string, targetType: string) => {
    try {
      const { data, error } = await supabase
        .from('votes')
        .select('vote_type')
        .eq('target_id', targetId)
        .eq('target_type', targetType);

      if (error) throw error;

      const upvotes = data?.filter(vote => vote.vote_type === 'upvote').length || 0;
      const downvotes = data?.filter(vote => vote.vote_type === 'downvote').length || 0;

      return { upvotes, downvotes, total: upvotes + downvotes };
    } catch (error) {
      console.error('Error fetching vote count:', error);
      return { upvotes: 0, downvotes: 0, total: 0 };
    }
  };

  return {
    submitVote,
    getVoteCount,
    isLoading
  };
};
