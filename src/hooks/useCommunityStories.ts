import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useImageUpload } from './useImageUpload';
import { toast } from 'sonner';

interface CommunityStory {
  id: string;
  content: string;
  image_url?: string;
  likes: number;
  created_at: string;
  user_id: string;
  users?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export const useCommunityStories = () => {
  const [stories, setStories] = useState<CommunityStory[]>([]);
  const [newStory, setNewStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { uploadImage } = useImageUpload();

  const fetchStories = async () => {
    try {
      console.log('Fetching community stories...');
      
      // First try to get stories with user data using a left join approach
      const { data, error } = await supabase
        .from('community_stories')
        .select(`
          id,
          content,
          image_url,
          likes,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching stories:', error);
        throw error;
      }
      
      // If we have stories, fetch user data separately
      if (data && data.length > 0) {
        const userIds = [...new Set(data.map(story => story.user_id))];
        
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, full_name, avatar_url')
          .in('id', userIds);
          
        if (userError) {
          console.warn('Could not fetch user data:', userError);
          // Continue without user data
          setStories(data.map(story => ({ ...story, users: undefined })));
        } else {
          // Merge user data with stories
          const storiesWithUsers = data.map(story => {
            const userInfo = userData?.find(u => u.id === story.user_id);
            return {
              ...story,
              users: userInfo ? {
                full_name: userInfo.full_name,
                avatar_url: userInfo.avatar_url
              } : undefined
            };
          });
          setStories(storiesWithUsers);
        }
      } else {
        setStories([]);
      }
      
      console.log('Fetched stories:', data?.length || 0);
    } catch (error) {
      console.error('Error fetching community stories:', error);
      toast.error('Failed to load community stories');
      setStories([]); // Set empty array on error so UI doesn't break
    }
  };

  useEffect(() => {
    fetchStories();

    // Set up real-time subscription for new stories
    const channel = supabase
      .channel('community_stories_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'community_stories'
        },
        () => {
          console.log('New story added, refetching...');
          fetchStories();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'community_stories'
        },
        () => {
          console.log('Story updated, refetching...');
          fetchStories();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'community_stories'
        },
        () => {
          console.log('Story deleted, refetching...');
          fetchStories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addStory = async (content: string, imageFile?: File): Promise<boolean> => {
    if (!user) {
      console.error('User not authenticated');
      toast.error('Please sign in to share your story');
      return false;
    }

    setIsLoading(true);
    
    try {
      let imageUrl: string | null = null;
      
      // Upload image if provided
      if (imageFile) {
        console.log('Uploading image...');
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          toast.error('Failed to upload image. Please try again.');
          setIsLoading(false);
          return false;
        }
        console.log('Image uploaded successfully:', imageUrl);
      }

      console.log('Inserting story into database...');
      const { data, error } = await supabase
        .from('community_stories')
        .insert([
          {
            content: content.trim(),
            image_url: imageUrl,
            user_id: user.id,
            likes: 0
          }
        ])
        .select(`
          id,
          content,
          image_url,
          likes,
          created_at,
          user_id
        `)
        .single();

      if (error) {
        console.error('Error inserting story:', error);
        toast.error('Failed to share your story. Please try again.');
        setIsLoading(false);
        return false;
      }

      console.log('Story inserted successfully:', data);
      
      // Add the new story to the beginning of the stories array for immediate display
      // Include user data from current user
      if (data) {
        const newStoryWithUser = {
          ...data,
          users: {
            full_name: user.user_metadata?.full_name || user.email || 'Community Member',
            avatar_url: user.user_metadata?.avatar_url || null
          }
        };
        setStories(prev => [newStoryWithUser, ...prev]);
      }
      
      setNewStory('');
      toast.success('Your story has been shared!');
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Error in addStory:', error);
      toast.error('An unexpected error occurred. Please try again.');
      setIsLoading(false);
      return false;
    }
  };

  const updateStory = async (storyId: string, content: string): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to edit stories');
      return false;
    }

    try {
      console.log('Updating story:', storyId);
      const { error } = await supabase
        .from('community_stories')
        .update({ content: content.trim() })
        .eq('id', storyId)
        .eq('user_id', user.id); // Ensure user can only edit their own stories

      if (error) {
        console.error('Error updating story:', error);
        toast.error('Failed to update your story. Please try again.');
        return false;
      }

      // Update local state
      setStories(prev => prev.map(story => 
        story.id === storyId 
          ? { ...story, content: content.trim() }
          : story
      ));

      toast.success('Story updated successfully!');
      return true;
    } catch (error) {
      console.error('Error in updateStory:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return false;
    }
  };

  const deleteStory = async (storyId: string): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to delete stories');
      return false;
    }

    try {
      console.log('Deleting story:', storyId);
      const { error } = await supabase
        .from('community_stories')
        .delete()
        .eq('id', storyId)
        .eq('user_id', user.id); // Ensure user can only delete their own stories

      if (error) {
        console.error('Error deleting story:', error);
        toast.error('Failed to delete your story. Please try again.');
        return false;
      }

      // Remove from local state
      setStories(prev => prev.filter(story => story.id !== storyId));

      toast.success('Story deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error in deleteStory:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return false;
    }
  };

  return {
    stories,
    newStory,
    setNewStory,
    addStory,
    updateStory,
    deleteStory,
    isLoading
  };
};
