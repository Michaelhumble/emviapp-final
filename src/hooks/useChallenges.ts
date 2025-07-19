import { useState, useEffect } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  prize: string;
  emoji: string;
  start_date: string;
  end_date: string;
  status: string;
  participant_count: number;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface ChallengeEntry {
  id: string;
  challenge_id: string;
  user_id: string;
  post_id: string;
  submitted_at: string;
  votes_count: number;
  is_winner: boolean;
  post?: {
    content: string;
    image_urls: string[];
    user_id: string;
  };
}

export const useChallenges = () => {
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [entries, setEntries] = useState<ChallengeEntry[]>([]);
  const [winners, setWinners] = useState<ChallengeEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEntry, setUserEntry] = useState<ChallengeEntry | null>(null);
  const { user, isSignedIn } = useAuth();

  // Fetch current active challenge
  const fetchCurrentChallenge = async () => {
    try {
      const { data, error } = await supabaseBypass
        .from('challenges')
        .select('*')
        .eq('status', 'active' as any)
        .gte('end_date', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setCurrentChallenge(data as any);
    } catch (error) {
      console.error('Error fetching current challenge:', error);
    }
  };

  // Fetch challenge entries
  const fetchChallengeEntries = async (challengeId: string) => {
    try {
      const { data, error } = await supabaseBypass
        .from('challenge_entries')
        .select(`
          *,
          post:community_posts(
            content,
            image_urls,
            user_id
          )
        `)
        .eq('challenge_id', challengeId as any)
        .order('votes_count', { ascending: false });

      if (error) throw error;
      setEntries((data as any) || []);
    } catch (error) {
      console.error('Error fetching challenge entries:', error);
    }
  };

  // Fetch previous winners
  const fetchWinners = async () => {
    try {
      const { data, error } = await supabaseBypass
        .from('challenge_entries')
        .select(`
          *,
          post:community_posts(
            content,
            image_urls,
            user_id
          ),
          challenge:challenges(title, prize)
        `)
        .eq('is_winner', true as any)
        .order('submitted_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setWinners((data as any) || []);
    } catch (error) {
      console.error('Error fetching winners:', error);
    }
  };

  // Check if user has submitted entry
  const fetchUserEntry = async (challengeId: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabaseBypass
        .from('challenge_entries')
        .select('*')
        .eq('challenge_id', challengeId as any)
        .eq('user_id', user.id as any)
        .maybeSingle();

      if (error) throw error;
      setUserEntry(data as any);
    } catch (error) {
      console.error('Error fetching user entry:', error);
    }
  };

  // Submit entry to challenge
  const submitEntry = async (postId: string) => {
    if (!user || !currentChallenge) {
      toast.error('Please sign in to enter challenge');
      return false;
    }

    try {
      const { error } = await supabaseBypass
        .from('challenge_entries')
        .insert({
          challenge_id: currentChallenge.id,
          user_id: user.id,
          post_id: postId
        } as any);

      if (error) throw error;
      
      toast.success('Successfully entered the challenge!');
      await fetchUserEntry(currentChallenge.id);
      await fetchChallengeEntries(currentChallenge.id);
      return true;
    } catch (error) {
      console.error('Error submitting entry:', error);
      toast.error('Failed to enter challenge');
      return false;
    }
  };

  // Vote for an entry
  const voteForEntry = async (entryId: string) => {
    if (!user) {
      toast.error('Please sign in to vote');
      return false;
    }

    try {
      // Check if user already voted
      const { data: existingVote } = await supabaseBypass
        .from('challenge_votes')
        .select('id')
        .eq('entry_id', entryId as any)
        .eq('user_id', user.id as any)
        .maybeSingle();

      if (existingVote) {
        // Remove vote
        const { error } = await supabaseBypass
          .from('challenge_votes')
          .delete()
          .eq('id', (existingVote as any).id as any);

        if (error) throw error;
        toast.success('Vote removed');
      } else {
        // Add vote
        const { error } = await supabaseBypass
          .from('challenge_votes')
          .insert({
            entry_id: entryId,
            user_id: user.id
          } as any);

        if (error) throw error;
        toast.success('Vote added!');
      }

      // Refresh entries to update vote counts
      if (currentChallenge) {
        await fetchChallengeEntries(currentChallenge.id);
      }
      return true;
    } catch (error) {
      console.error('Error voting:', error);
      toast.error('Failed to vote');
      return false;
    }
  };

  // Get time remaining for challenge
  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return '0 days';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    return `${hours} hour${hours > 1 ? 's' : ''}`;
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchCurrentChallenge();
      await fetchWinners();
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  useEffect(() => {
    if (currentChallenge) {
      fetchChallengeEntries(currentChallenge.id);
      if (user) {
        fetchUserEntry(currentChallenge.id);
      }
    }
  }, [currentChallenge, user]);

  return {
    currentChallenge,
    entries,
    winners,
    userEntry,
    isLoading,
    submitEntry,
    voteForEntry,
    getTimeRemaining,
    fetchChallengeEntries
  };
};