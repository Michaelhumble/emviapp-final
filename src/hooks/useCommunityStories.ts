
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useImageUpload } from './useImageUpload';

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
  const [isLoading, setIsLoading] = useState(false);
  const [newStory, setNewStory] = useState('');
  const { user } = useAuth();
  const { uploadImage, isUploading } = useImageUpload();

  // Fetch community stories only
  const fetchStories = async () => {
    try {
      console.log('Fetching community stories...');
      const { data, error } = await supabase
        .from('community_stories')
        .select(`
          *,
          users:user_id (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching stories:', error);
        throw error;
      }
      
      console.log('Fetched stories:', data);
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching community stories:', error);
      toast.error('Failed to load community stories');
    }
  };

  // Add a new community story with file upload support
  const addStory = async (content: string, imageFile?: File) => {
    console.log('addStory called with:', { content, imageFile, user: user?.id });
    
    if (!user) {
      console.error('No user found when trying to add story');
      toast.error('Please sign in to share your story');
      return false;
    }

    if (!content.trim()) {
      console.error('Empty content provided');
      toast.error('Story content cannot be empty');
      return false;
    }

    // Client-side validation to ensure community-appropriate content
    if (content.toLowerCase().includes('hiring') || 
        content.toLowerCase().includes('job opening') ||
        content.toLowerCase().includes('salon for sale') ||
        content.toLowerCase().includes('apply now')) {
      toast.error('This community is designed for sharing inspiring stories only. To post jobs or list salons, please visit the Jobs or Salons page.');
      return false;
    }

    setIsLoading(true);
    
    try {
      let imageUrl = null;
      
      // Upload image if provided
      if (imageFile) {
        console.log('Uploading image:', imageFile.name);
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          console.error('Image upload failed');
          setIsLoading(false);
          return false;
        }
        console.log('Image uploaded successfully:', imageUrl);
      }

      console.log('Inserting story into database...');
      const { data, error } = await supabase
        .from('community_stories')
        .insert({
          user_id: user.id,
          content: content.trim(),
          image_url: imageUrl
        })
        .select()
        .single();

      if (error) {
        console.error('Database error:', error);
        // Handle specific RLS policy violations
        if (error.message.includes('row-level security')) {
          toast.error('This community is designed for sharing inspiring stories only. To post jobs or list salons, please visit the Jobs or Salons page.');
        } else {
          toast.error(`Failed to share story: ${error.message}`);
        }
        return false;
      }

      console.log('Story inserted successfully:', data);
      setNewStory('');
      toast.success('Story shared successfully!');
      await fetchStories(); // Refresh stories
      return true;
    } catch (error) {
      console.error('Error adding story:', error);
      toast.error('Failed to share story. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Set up real-time subscription for stories
  useEffect(() => {
    fetchStories();

    const channel = supabase
      .channel('community-stories-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_stories'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          fetchStories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    stories,
    isLoading: isLoading || isUploading,
    newStory,
    setNewStory,
    addStory
  };
};
