
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
  user?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export const useCommunityStories = () => {
  const [stories, setStories] = useState<CommunityStory[]>([]);
  const [newStory, setNewStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingStory, setEditingStory] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const { user } = useAuth();
  const { uploadImage } = useImageUpload();

  // Fetch stories from Supabase
  const fetchStories = async () => {
    try {
      console.log('Fetching community stories...');
      
      const { data: storiesData, error } = await supabase
        .from('community_stories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching stories:', error);
        return;
      }

      if (!storiesData) {
        console.log('No stories found');
        setStories([]);
        return;
      }

      // Get unique user IDs
      const userIds = [...new Set(storiesData.map(story => story.user_id))];
      
      // Fetch user data
      const { data: usersData, error: usersError } = await supabase
        .from('users')
        .select('id, full_name, avatar_url')
        .in('id', userIds);

      if (usersError) {
        console.error('Error fetching user data:', usersError);
      }

      // Create user lookup map
      const userMap = new Map();
      if (usersData) {
        usersData.forEach(user => {
          userMap.set(user.id, user);
        });
      }

      // Merge stories with user data
      const storiesWithUsers = storiesData.map(story => ({
        ...story,
        user: userMap.get(story.user_id) || null
      }));

      console.log('Stories with users loaded:', storiesWithUsers.length);
      setStories(storiesWithUsers);
    } catch (error) {
      console.error('Error in fetchStories:', error);
    }
  };

  // Add new story
  const addStory = async (content: string, imageFile?: File): Promise<boolean> => {
    if (!user) {
      console.error('User not authenticated');
      toast.error('Please sign in to share your story');
      return false;
    }

    if (!content.trim()) {
      console.error('Story content is empty');
      toast.error('Please write your story before sharing');
      return false;
    }

    setIsLoading(true);
    
    try {
      console.log('Adding new story:', { content: content.substring(0, 50), hasImage: !!imageFile });
      
      let imageUrl = null;
      
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

      // Insert story into database
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
        .select()
        .single();

      if (error) {
        console.error('Error inserting story:', error);
        toast.error('Failed to share your story. Please try again.');
        return false;
      }

      console.log('Story added successfully:', data);
      
      // Clear the form
      setNewStory('');
      
      // Refresh stories to show the new one
      await fetchStories();
      
      toast.success('Your story has been shared!');
      return true;
    } catch (error) {
      console.error('Error in addStory:', error);
      toast.error('An error occurred while sharing your story');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update story
  const updateStory = async (storyId: string, newContent: string): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to edit stories');
      return false;
    }

    if (!newContent.trim()) {
      toast.error('Story content cannot be empty');
      return false;
    }

    try {
      console.log('Updating story:', storyId);
      
      const { error } = await supabase
        .from('community_stories')
        .update({ content: newContent.trim() })
        .eq('id', storyId)
        .eq('user_id', user.id); // Ensure user can only edit their own stories

      if (error) {
        console.error('Error updating story:', error);
        toast.error('Failed to update story');
        return false;
      }

      // Refresh stories
      await fetchStories();
      
      // Clear editing state
      setEditingStory(null);
      setEditContent('');
      
      toast.success('Story updated successfully!');
      return true;
    } catch (error) {
      console.error('Error in updateStory:', error);
      toast.error('An error occurred while updating your story');
      return false;
    }
  };

  // Delete story
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
        toast.error('Failed to delete story');
        return false;
      }

      // Refresh stories
      await fetchStories();
      
      toast.success('Story deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error in deleteStory:', error);
      toast.error('An error occurred while deleting your story');
      return false;
    }
  };

  // Start editing
  const startEditing = (storyId: string, currentContent: string) => {
    setEditingStory(storyId);
    setEditContent(currentContent);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingStory(null);
    setEditContent('');
  };

  // Set up real-time subscription
  useEffect(() => {
    fetchStories();

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
          fetchStories(); // Refresh stories when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    stories,
    newStory,
    setNewStory,
    addStory,
    updateStory,
    deleteStory,
    isLoading,
    editingStory,
    editContent,
    setEditContent,
    startEditing,
    cancelEditing
  };
};
