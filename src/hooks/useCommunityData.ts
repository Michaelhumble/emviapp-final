import { useState, useEffect } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  image_urls: string[] | null;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  profiles?: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
  };
}

interface UserActivity {
  id: string;
  user_id: string;
  activity_type: string;
  activity_data: any;
  created_at: string;
  is_featured: boolean;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  };
}

interface LeaderboardUser {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  community_points: number;
  total_posts: number;
  total_likes_received: number;
  total_shares: number;
  creator_status: string;
}

export const useCommunityData = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Fetch community posts
  const fetchPosts = async () => {
    try {
      const { data, error } = await supabaseBypass
        .from('community_posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      // Fetch profiles separately and merge
      if (data && data.length > 0) {
        const userIds = [...new Set((data as any).map((post: any) => post?.user_id))];
        const { data: profilesData } = await supabaseBypass
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds as any);

        const profilesMap = (profilesData as any)?.reduce((acc: any, profile: any) => {
          acc[profile?.id] = profile;
          return acc;
        }, {} as Record<string, any>) || {};

        const postsWithProfiles = (data as any).map((post: any) => ({
          ...post,
          profiles: profilesMap[post?.user_id] || null
        }));

        setPosts(postsWithProfiles);
      } else {
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load community posts');
    }
  };

  // Fetch user activities
  const fetchActivities = async () => {
    try {
      const { data, error } = await supabaseBypass
        .from('user_activity')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Fetch profiles separately and merge
      if (data && data.length > 0) {
        const userIds = [...new Set((data as any).map((activity: any) => activity?.user_id))];
        const { data: profilesData } = await supabaseBypass
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds as any);

        const profilesMap = (profilesData as any)?.reduce((acc: any, profile: any) => {
          acc[profile?.id] = profile;
          return acc;
        }, {} as Record<string, any>) || {};

        const activitiesWithProfiles = (data as any).map((activity: any) => ({
          ...activity,
          profiles: profilesMap[activity?.user_id] || null
        }));

        setActivities(activitiesWithProfiles);
      } else {
        setActivities([]);
      }
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabaseBypass
        .from('profiles')
        .select('id, full_name, avatar_url, community_points, total_posts, total_likes_received, total_shares, creator_status')
        .gt('community_points', 0)
        .order('community_points', { ascending: false })
        .limit(10);

      if (error) throw error;
      setLeaderboard((data as any) || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  // Create new post
  const createPost = async (content: string, imageUrls: string[] = [], tags: string[] = []) => {
    if (!user) {
      toast.error('Please sign in to create a post');
      return false;
    }

    try {
      setIsLoading(true);
      
      const { data, error } = await supabaseBypass
        .from('community_posts')
        .insert({
          user_id: user.id,
          content,
          image_urls: imageUrls.length > 0 ? imageUrls : null,
          tags: tags.length > 0 ? tags : null
        } as any)
        .select();

      if (error) throw error;
      
      toast.success('Post created successfully!');
      await fetchPosts(); // Refresh posts
      return true;
    } catch (error: any) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post: ' + error.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Like/unlike post
  const toggleLike = async (postId: string) => {
    if (!user) {
      toast.error('Please sign in to like posts');
      return;
    }

    try {
      // Check if already liked
      const { data: existingLike } = await supabaseBypass
        .from('community_post_likes')
        .select('id')
        .eq('post_id', postId as any)
        .eq('user_id', user.id as any)
        .single();

      if (existingLike) {
        // Unlike
        await supabaseBypass
          .from('community_post_likes')
          .delete()
          .eq('post_id', postId as any)
          .eq('user_id', user.id as any);
      } else {
        // Like
        await supabaseBypass
          .from('community_post_likes')
          .insert({
            post_id: postId,
            user_id: user.id
          } as any);
      }

      // Refresh posts to get updated like count
      await fetchPosts();
    } catch (error: any) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  // Track share
  const trackShare = async (contentType: string, contentId?: string, platform: string = 'other') => {
    if (!user) return;

    try {
      const pointsAwarded = contentType === 'post' ? 3 : contentType === 'profile' ? 5 : 2;
      
      await supabaseBypass
        .from('shares_tracking')
        .insert({
          user_id: user.id,
          shared_content_type: contentType,
          shared_content_id: contentId,
          platform,
          points_awarded: pointsAwarded
        } as any);

      toast.success(`You earned ${pointsAwarded} points for sharing!`);
    } catch (error: any) {
      console.error('Error tracking share:', error);
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    // Initial data fetch
    fetchPosts();
    fetchActivities();
    fetchLeaderboard();

    // Real-time subscriptions
    const postsSubscription = supabaseBypass
      .channel('community_posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_posts'
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    const activitySubscription = supabaseBypass
      .channel('user_activity_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_activity'
        },
        () => {
          fetchActivities();
        }
      )
      .subscribe();

    const likesSubscription = supabaseBypass
      .channel('community_post_likes_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_post_likes'
        },
        () => {
          fetchPosts(); // Refresh posts to get updated like counts
        }
      )
      .subscribe();

    return () => {
      supabaseBypass.removeChannel(postsSubscription);
      supabaseBypass.removeChannel(activitySubscription);
      supabaseBypass.removeChannel(likesSubscription);
    };
  }, []);

  return {
    posts,
    activities,
    leaderboard,
    isLoading,
    createPost,
    toggleLike,
    trackShare,
    fetchPosts,
    fetchActivities,
    fetchLeaderboard
  };
};