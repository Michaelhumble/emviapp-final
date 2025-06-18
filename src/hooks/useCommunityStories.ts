
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useImageUpload } from './useImageUpload';

interface CommunityStory {
  id: string;
  content: string;
  image_url?: string;
  likes: number;
  created_at: string;
  user_id: string;
  author?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export const useCommunityStories = () => {
  const [stories, setStories] = useState<CommunityStory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newStory, setNewStory] = useState('');
  const { user } = useAuth();
  const { uploadImage } = useImageUpload();

  const fetchStories = async () => {
    try {
      console.log('Fetching community stories...');
      
      // First get all stories
      const { data: storiesData, error: storiesError } = await supabase
        .from('community_stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (storiesError) {
        console.error('Error fetching stories:', storiesError);
        return;
      }

      if (!storiesData || storiesData.length === 0) {
        console.log('No stories found');
        setStories([]);
        return;
      }

      // Get unique user IDs
      const userIds = [...new Set(storiesData.map(story => story.user_id))];
      
      // Fetch user data for all unique user IDs
      let usersData: any[] = [];
      if (userIds.length > 0) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, full_name, avatar_url')
          .in('id', userIds);

        if (userError) {
          console.error('Error fetching user data:', userError);
        } else {
          usersData = userData || [];
        }
      }

      // Merge stories with user data
      const storiesWithUsers = storiesData.map(story => ({
        ...story,
        author: usersData.find(user => user.id === story.user_id) || {
          full_name: 'Anonymous User',
          avatar_url: null
        }
      }));

      console.log('Stories fetched successfully:', storiesWithUsers.length);
      setStories(storiesWithUsers);
    } catch (error) {
      console.error('Unexpected error fetching stories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addStory = async (content: string, imageFile?: File): Promise<boolean> => {
    if (!user || !content.trim()) {
      console.error('Cannot add story: missing user or content');
      return false;
    }

    try {
      console.log('Adding new story...');
      let imageUrl: string | null = null;

      // Upload image if provided
      if (imageFile) {
        console.log('Uploading image...');
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          console.error('Failed to upload image');
          return false;
        }
        console.log('Image uploaded successfully:', imageUrl);
      }

      // Insert the story
      const { data, error } = await supabase
        .from('community_stories')
        .insert([
          {
            user_id: user.id,
            content: content.trim(),
            image_url: imageUrl,
            likes: 0
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Error inserting story:', error);
        return false;
      }

      console.log('Story added successfully:', data);
      
      // Clear the form
      setNewStory('');
      
      // Refresh stories to show the new one
      await fetchStories();
      
      return true;
    } catch (error) {
      console.error('Unexpected error adding story:', error);
      return false;
    }
  };

  const updateStory = async (storyId: string, newContent: string): Promise<boolean> => {
    if (!user || !newContent.trim()) {
      console.error('Cannot update story: missing user or content');
      return false;
    }

    try {
      console.log('Updating story:', storyId);
      
      const { error } = await supabase
        .from('community_stories')
        .update({ content: newContent.trim() })
        .eq('id', storyId)
        .eq('user_id', user.id); // Ensure only the owner can update

      if (error) {
        console.error('Error updating story:', error);
        return false;
      }

      console.log('Story updated successfully');
      
      // Refresh stories to show the updated content
      await fetchStories();
      
      return true;
    } catch (error) {
      console.error('Unexpected error updating story:', error);
      return false;
    }
  };

  const deleteStory = async (storyId: string): Promise<boolean> => {
    if (!user) {
      console.error('Cannot delete story: no user');
      return false;
    }

    try {
      console.log('Deleting story:', storyId);
      
      const { error } = await supabase
        .from('community_stories')
        .delete()
        .eq('id', storyId)
        .eq('user_id', user.id); // Ensure only the owner can delete

      if (error) {
        console.error('Error deleting story:', error);
        return false;
      }

      console.log('Story deleted successfully');
      
      // Refresh stories to remove the deleted one
      await fetchStories();
      
      return true;
    } catch (error) {
      console.error('Unexpected error deleting story:', error);
      return false;
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchStories();
  }, []);

  // Set up real-time subscription
  useEffect(() => {
    console.log('Setting up real-time subscription for community stories');
    
    const channel = supabase
      .channel('community_stories_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_stories'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          // Refresh stories when there are changes
          fetchStories();
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    stories,
    isLoading,
    newStory,
    setNewStory,
    addStory,
    updateStory,
    deleteStory,
    refreshStories: fetchStories
  };
};
