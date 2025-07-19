
import { useState } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
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
      const { error } = await supabaseBypass
        .from('votes')
        .upsert({
          user_id: user.id,
          target_id: targetId,
          target_type: targetType,
          vote_type: voteType
        } as any);

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
      const { data, error } = await supabaseBypass
        .from('votes')
        .select('vote_type')
        .eq('target_id' as any, targetId as any)
        .eq('target_type' as any, targetType as any);

      if (error) throw error;

      const upvotes = (data as any)?.filter((vote: any) => vote.vote_type === 'upvote').length || 0;
      const downvotes = (data as any)?.filter((vote: any) => vote.vote_type === 'downvote').length || 0;

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
