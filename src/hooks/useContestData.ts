import { useState, useEffect } from 'react';
import { supabaseBypass } from "@/types/supabase-bypass";
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface Contest {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  emoji: string | null;
  prize: string | null;
  start_date: string;
  end_date: string;
  status: string;
  participant_count: number;
  created_at: string;
}

interface ContestEntry {
  id: string;
  challenge_id: string;
  post_id: string;
  user_id: string;
  votes_count: number;
  is_winner: boolean;
  submitted_at: string;
  community_posts?: {
    id: string;
    content: string;
    image_urls: string[] | null;
    user_id: string;
  };
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

export const useContestData = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [activeContest, setActiveContest] = useState<Contest | null>(null);
  const [contestEntries, setContestEntries] = useState<ContestEntry[]>([]);
  const [userEntries, setUserEntries] = useState<ContestEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Fetch active contests
  const fetchContests = async () => {
    try {
      const { data, error } = await supabaseBypass
        .from('challenges')
        .select('*')
        .eq('status', 'active' as any)
        .gte('end_date', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setContests((data || []) as any);
      
      // Set the first active contest as the current active one
      if (data && data.length > 0) {
        setActiveContest(data[0] as any);
      }
    } catch (error) {
      console.error('Error fetching contests:', error);
    }
  };

  // Fetch contest entries
  const fetchContestEntries = async (contestId: string) => {
    try {
      const { data, error } = await supabaseBypass
        .from('challenge_entries')
        .select('*')
        .eq('challenge_id', contestId as any)
        .order('votes_count', { ascending: false });

      if (error) throw error;

      // Fetch related post and profile data
      if (data && data.length > 0) {
        const postIds = (data as any[]).map((entry: any) => entry.post_id);
        const userIds = (data as any[]).map((entry: any) => entry.user_id);

        const { data: postsData } = await supabaseBypass
          .from('community_posts')
          .select('id, content, image_urls, user_id')
          .in('id', postIds as any);

        const { data: profilesData } = await supabaseBypass
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds as any);

        const postsMap = postsData?.reduce((acc, post) => {
          acc[post.id] = post;
          return acc;
        }, {} as Record<string, any>) || {};

        const profilesMap = profilesData?.reduce((acc, profile) => {
          acc[profile.id] = profile;
          return acc;
        }, {} as Record<string, any>) || {};

        const entriesWithData = (data as any[]).map((entry: any) => ({
          ...entry,
          community_posts: postsMap[entry.post_id] || null,
          profiles: profilesMap[entry.user_id] || null
        }));

        setContestEntries(entriesWithData as any);
      } else {
        setContestEntries([]);
      }
    } catch (error) {
      console.error('Error fetching contest entries:', error);
    }
  };

  // Fetch user's contest entries
  const fetchUserEntries = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabaseBypass
        .from('challenge_entries')
        .select('*')
        .eq('user_id', user.id as any)
        .order('submitted_at', { ascending: false });

      if (error) throw error;
      setUserEntries((data || []) as any);
    } catch (error) {
      console.error('Error fetching user entries:', error);
    }
  };

  // Submit contest entry
  const submitContestEntry = async (contestId: string, postId: string) => {
    if (!user) {
      toast.error('Please sign in to enter contests');
      return false;
    }

    try {
      setIsLoading(true);

      // Check if user already entered this contest
      const { data: existingEntry } = await supabaseBypass
        .from('challenge_entries')
        .select('id')
        .eq('challenge_id', contestId as any)
        .eq('user_id', user.id as any)
        .single();

      if (existingEntry) {
        toast.error('You have already entered this contest');
        return false;
      }

      const { data, error } = await supabaseBypass
        .from('challenge_entries')
        .insert({
          challenge_id: contestId,
          post_id: postId,
          user_id: user.id
        } as any)
        .select();

      if (error) throw error;

      // Create activity entry
      await supabaseBypass
        .from('user_activity')
        .insert({
          user_id: user.id,
          activity_type: 'contest_entered',
          activity_data: {
            contest_id: contestId,
            post_id: postId
          }
        } as any);

      toast.success('Contest entry submitted successfully!');
      
      // Refresh data
      await fetchContestEntries(contestId);
      await fetchUserEntries();
      
      return true;
    } catch (error: any) {
      console.error('Error submitting contest entry:', error);
      toast.error('Failed to submit entry: ' + error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Vote for contest entry
  const voteForEntry = async (entryId: string) => {
    if (!user) {
      toast.error('Please sign in to vote');
      return;
    }

    try {
      // Check if already voted
      const { data: existingVote } = await supabaseBypass
        .from('challenge_votes')
        .select('id')
        .eq('entry_id', entryId as any)
        .eq('user_id', user.id as any)
        .single();

      if (existingVote) {
        // Remove vote
        await supabaseBypass
          .from('challenge_votes')
          .delete()
          .eq('entry_id', entryId as any)
          .eq('user_id', user.id as any);
      } else {
        // Add vote
        await supabaseBypass
          .from('challenge_votes')
          .insert({
            entry_id: entryId,
            user_id: user.id
          } as any);
      }

      // Refresh contest entries if we have an active contest
      if (activeContest) {
        await fetchContestEntries(activeContest.id);
      }
    } catch (error: any) {
      console.error('Error voting:', error);
      toast.error('Failed to vote');
    }
  };

  // Get time until contest ends
  const getTimeUntilEnd = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffMs = end.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'Contest ended';
    
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  // Set up real-time subscriptions
  useEffect(() => {
    fetchContests();
    fetchUserEntries();

    const contestsSubscription = supabaseBypass
      .channel('challenges_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'challenges'
        },
        () => {
          fetchContests();
        }
      )
      .subscribe();

    const entriesSubscription = supabaseBypass
      .channel('challenge_entries_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'challenge_entries'
        },
        () => {
          if (activeContest) {
            fetchContestEntries(activeContest.id);
          }
          fetchUserEntries();
        }
      )
      .subscribe();

    const votesSubscription = supabaseBypass
      .channel('challenge_votes_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'challenge_votes'
        },
        () => {
          if (activeContest) {
            fetchContestEntries(activeContest.id);
          }
        }
      )
      .subscribe();

    return () => {
      supabaseBypass.removeChannel(contestsSubscription);
      supabaseBypass.removeChannel(entriesSubscription);
      supabaseBypass.removeChannel(votesSubscription);
    };
  }, []);

  // Fetch entries when active contest changes
  useEffect(() => {
    if (activeContest) {
      fetchContestEntries(activeContest.id);
    }
  }, [activeContest]);

  return {
    contests,
    activeContest,
    contestEntries,
    userEntries,
    isLoading,
    submitContestEntry,
    voteForEntry,
    getTimeUntilEnd,
    setActiveContest,
    fetchContests,
    fetchContestEntries,
    fetchUserEntries
  };
};