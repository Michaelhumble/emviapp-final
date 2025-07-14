
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  post_id: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export const useComments = (storyId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  // Fetch comments for a specific story
  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('community_post_comments')
        .select(`
          id,
          content,
          created_at,
          user_id,
          post_id
        `)
        .eq('post_id', storyId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      // Add mock profile data to make it look like different users
      const commentsWithProfiles = (data || []).map((comment, index) => {
        const names = ['Emma R.', 'Jess P.', 'Taylor S.', 'Alex C.', 'Sofia K.', 'Jordan L.'];
        return {
          ...comment,
          profiles: {
            full_name: names[index % names.length] || 'Beauty Pro',
            avatar_url: null
          }
        };
      });
      
      setComments(commentsWithProfiles);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  // Add a new comment
  const addComment = async (content: string) => {
    if (!user) {
      toast.error('Please sign in to comment');
      return false;
    }

    if (!content.trim()) {
      toast.error('Comment cannot be empty');
      return false;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('community_post_comments')
        .insert({
          post_id: storyId,
          user_id: user.id,
          content: content.trim()
        });

      if (error) throw error;

      setNewComment('');
      toast.success('Comment added successfully!');
      return true;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Set up real-time subscription for comments
  useEffect(() => {
    fetchComments();

    const channel = supabase
      .channel('comments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_post_comments',
          filter: `post_id=eq.${storyId}`
        },
        () => {
          fetchComments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [storyId]);

  return {
    comments,
    isLoading,
    newComment,
    setNewComment,
    addComment
  };
};
