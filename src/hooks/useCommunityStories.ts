
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from 'sonner';

export interface CommunityStory {
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
  const [isFetching, setIsFetching] = useState(true);
  const { user, isSignedIn } = useAuth();
  const { uploadImage, isUploading } = useImageUpload();

  const fetchStories = async () => {
    try {
      setIsFetching(true);
      console.log('Fetching community stories...');
      
      const { data, error } = await supabase
        .from('community_stories')
        .select(`
          *,
          user:user_id (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching stories:', error);
        toast.error('Failed to load stories');
        return;
      }

      console.log('Fetched stories:', data);
      setStories(data || []);
    } catch (error) {
      console.error('Error in fetchStories:', error);
      toast.error('Failed to load stories');
    } finally {
      setIsFetching(false);
    }
  };

  const addStory = async (content: string, imageFile?: File): Promise<boolean> => {
    if (!isSignedIn || !user) {
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
    console.log('Adding new story:', { content: content.substring(0, 50), hasImage: !!imageFile });

    try {
      let imageUrl: string | undefined = undefined;

      // Upload image if provided
      if (imageFile) {
        console.log('Uploading image...');
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          toast.error('Failed to upload image');
          setIsLoading(false);
          return false;
        }
        console.log('Image uploaded successfully:', imageUrl);
      }

      // Insert the story
      console.log('Inserting story into database...');
      const { data, error } = await supabase
        .from('community_stories')
        .insert({
          content: content.trim(),
          image_url: imageUrl,
          user_id: user.id,
          likes: 0
        })
        .select(`
          *,
          user:user_id (
            full_name,
            avatar_url
          )
        `)
        .single();

      if (error) {
        console.error('Error adding story:', error);
        toast.error('Failed to share your story. Please try again.');
        return false;
      }

      console.log('Story added successfully:', data);
      
      // Add to local state immediately for instant feedback
      setStories(prev => [data, ...prev]);
      
      // Clear the form
      setNewStory('');
      
      toast.success('Your story has been shared!');
      return true;

    } catch (error) {
      console.error('Unexpected error adding story:', error);
      toast.error('An unexpected error occurred. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateStory = async (id: string, content: string): Promise<boolean> => {
    if (!isSignedIn || !user) {
      toast.error('Please sign in to edit stories');
      return false;
    }

    try {
      const { error } = await supabase
        .from('community_stories')
        .update({ content: content.trim() })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating story:', error);
        toast.error('Failed to update story');
        return false;
      }

      // Update local state
      setStories(prev => prev.map(story => 
        story.id === id ? { ...story, content: content.trim() } : story
      ));

      toast.success('Story updated successfully!');
      return true;
    } catch (error) {
      console.error('Error updating story:', error);
      toast.error('Failed to update story');
      return false;
    }
  };

  const deleteStory = async (id: string): Promise<boolean> => {
    if (!isSignedIn || !user) {
      toast.error('Please sign in to delete stories');
      return false;
    }

    try {
      const { error } = await supabase
        .from('community_stories')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting story:', error);
        toast.error('Failed to delete story');
        return false;
      }

      // Update local state
      setStories(prev => prev.filter(story => story.id !== id));
      
      toast.success('Story deleted successfully!');
      return true;
    } catch (error) {
      console.error('Error deleting story:', error);
      toast.error('Failed to delete story');
      return false;
    }
  };

  useEffect(() => {
    fetchStories();

    // Set up real-time subscription
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
          fetchStories(); // Refetch to get updated data with user info
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
    isLoading: isLoading || isUploading,
    isFetching,
    refetch: fetchStories
  };
};
