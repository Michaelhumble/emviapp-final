import { useState, useEffect } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface CommunityPost {
  id: string;
  user_id: string;
  content: string;
  image_urls: string[];
  video_url?: string;
  post_type: string;
  tags: string[];
  likes_count: number;
  comments_count: number;
  shares_count: number;
  is_featured: boolean;
  is_trending: boolean;
  category: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
  user_has_liked?: boolean;
}

export interface CreatePostData {
  content: string;
  post_type: string;
  image_urls?: string[];
  video_url?: string;
  category?: string;
  tags?: string[];
}

export const useCommunityPosts = () => {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user } = useAuth();

  const fetchPosts = async (filter?: string, searchQuery?: string) => {
    try {
      setIsRefreshing(true);
      
      let query = supabaseBypass
        .from('community_posts')
        .select(`
          *
        `)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filter && filter !== 'all') {
        if (filter === 'trending') {
          query = query.eq('is_trending', true as any);
        } else {
          query = query.eq('category', filter as any);
        }
      }

      // Apply search
      if (searchQuery) {
        query = query.ilike('content', `%${searchQuery}%`);
      }

      const { data, error } = await query.limit(20);

      if (error) throw error;

      // Check which posts the current user has liked
      let postsWithLikes = (data as any) || [];
      if (user && data) {
        const postIds = (data as any).map((post: any) => post?.id);
        const { data: likes } = await supabaseBypass
          .from('community_post_likes')
          .select('post_id')
          .eq('user_id', user.id as any)
          .in('post_id', postIds as any);

        const likedPostIds = new Set((likes as any)?.map((like: any) => like?.post_id) || []);
        
        postsWithLikes = (data as any).map((post: any) => ({
          ...post,
          user_has_liked: likedPostIds.has(post?.id)
        }));
      }

      setPosts(postsWithLikes as any);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setIsRefreshing(false);
    }
  };

  const createPost = async (postData: CreatePostData) => {
    console.log('🔍 useCommunityPosts.createPost called - user:', user);
    
    if (!user) {
      console.log('❌ useCommunityPosts: No user found, showing error');
      toast.error('Please sign in to post');
      return false;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabaseBypass
        .from('community_posts')
        .insert({
          user_id: user.id,
          ...postData
        } as any)
        .select()
        .single();

      if (error) throw error;

      // Refresh posts to show the new one
      await fetchPosts();
      return data;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (postId: string, postData: Partial<CreatePostData>) => {
    if (!user) {
      toast.error('Please sign in to edit posts');
      return false;
    }

    setIsLoading(true);
    try {
      const { error } = await supabaseBypass
        .from('community_posts')
        .update({
          ...postData,
          updated_at: new Date().toISOString()
        } as any)
        .eq('id', postId as any)
        .eq('user_id', user.id as any); // Ensure user can only edit their own posts

      if (error) throw error;

      // Refresh posts to show the updated one
      await fetchPosts();
      return true;
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLike = async (postId: string) => {
    if (!user) {
      toast.error('Please sign in to like posts');
      return;
    }

    try {
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

        // Decrease likes count
        await supabaseBypass.rpc('decrement_post_likes', { post_id: postId });

        // Update local state
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, likes_count: post.likes_count - 1, user_has_liked: false }
            : post
        ));
      } else {
        // Like
        await supabaseBypass
          .from('community_post_likes')
          .insert({ post_id: postId, user_id: user.id } as any);

        // Increase likes count
        await supabaseBypass.rpc('increment_post_likes', { post_id: postId });

        // Update local state
        setPosts(prev => prev.map(post => 
          post.id === postId 
            ? { ...post, likes_count: post.likes_count + 1, user_has_liked: true }
            : post
        ));
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchPosts();

    const channel = supabaseBypass
      .channel('community-posts-changes')
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

    return () => {
      supabaseBypass.removeChannel(channel);
    };
  }, []);

  return {
    posts,
    isLoading,
    isRefreshing,
    fetchPosts,
    createPost,
    updatePost,
    toggleLike
  };
};