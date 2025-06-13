
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface CommunityStory {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  likes: number;
  created_at: string;
  user_name?: string;
}

export interface CommunityComment {
  id: string;
  story_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user_name?: string;
}

export const useCommunityStories = () => {
  const [stories, setStories] = useState<CommunityStory[]>([]);
  const [comments, setComments] = useState<{ [storyId: string]: CommunityComment[] }>({});
  const [loading, setLoading] = useState(true);
  const { user, userProfile } = useAuth();

  // Fetch stories from database
  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('community_stories')
        .select(`
          id,
          user_id,
          content,
          image_url,
          likes,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get user names for stories
      const storiesWithNames = await Promise.all(
        (data || []).map(async (story) => {
          const { data: userData } = await supabase
            .from('users')
            .select('full_name')
            .eq('id', story.user_id)
            .single();
          
          return {
            ...story,
            user_name: userData?.full_name || 'Anonymous User'
          };
        })
      );

      setStories(storiesWithNames);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast.error('Failed to load community stories');
    } finally {
      setLoading(false);
    }
  };

  // Fetch comments for all stories
  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('community_comments')
        .select(`
          id,
          story_id,
          user_id,
          content,
          created_at
        `)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Get user names for comments
      const commentsWithNames = await Promise.all(
        (data || []).map(async (comment) => {
          const { data: userData } = await supabase
            .from('users')
            .select('full_name')
            .eq('id', comment.user_id)
            .single();
          
          return {
            ...comment,
            user_name: userData?.full_name || 'Anonymous User'
          };
        })
      );

      // Group comments by story_id
      const groupedComments = commentsWithNames.reduce((acc, comment) => {
        if (!acc[comment.story_id]) {
          acc[comment.story_id] = [];
        }
        acc[comment.story_id].push(comment);
        return acc;
      }, {} as { [storyId: string]: CommunityComment[] });

      setComments(groupedComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Add new story
  const addStory = async (content: string, imageUrl?: string) => {
    if (!user) {
      toast.error('Please sign in to share your story');
      return false;
    }

    try {
      const { error } = await supabase
        .from('community_stories')
        .insert({
          user_id: user.id,
          content,
          image_url: imageUrl,
        });

      if (error) throw error;

      toast.success('Your story has been shared!');
      return true;
    } catch (error) {
      console.error('Error adding story:', error);
      toast.error('Failed to share your story');
      return false;
    }
  };

  // Add comment to story
  const addComment = async (storyId: string, content: string) => {
    if (!user) {
      toast.error('Please sign in to comment');
      return false;
    }

    try {
      const { error } = await supabase
        .from('community_comments')
        .insert({
          story_id: storyId,
          user_id: user.id,
          content,
        });

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      return false;
    }
  };

  // Like a story
  const likeStory = async (storyId: string) => {
    if (!user) {
      toast.error('Please sign in to like stories');
      return;
    }

    try {
      const story = stories.find(s => s.id === storyId);
      if (!story) return;

      const { error } = await supabase
        .from('community_stories')
        .update({ likes: story.likes + 1 })
        .eq('id', storyId);

      if (error) throw error;
    } catch (error) {
      console.error('Error liking story:', error);
      toast.error('Failed to like story');
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    fetchStories();
    fetchComments();

    // Real-time subscription for stories
    const storiesSubscription = supabase
      .channel('community_stories_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_stories'
        },
        () => {
          fetchStories();
        }
      )
      .subscribe();

    // Real-time subscription for comments
    const commentsSubscription = supabase
      .channel('community_comments_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_comments'
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(storiesSubscription);
      supabase.removeChannel(commentsSubscription);
    };
  }, []);

  return {
    stories,
    comments,
    loading,
    addStory,
    addComment,
    likeStory,
    isAuthenticated: !!user
  };
};
