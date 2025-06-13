
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

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching community stories:', error);
    }
  };

  // Add a new community story with file upload support
  const addStory = async (content: string, imageFile?: File) => {
    if (!user) {
      toast.error('Please sign in to share your story');
      return false;
    }

    if (!content.trim()) {
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
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          // Upload failed, but we already showed an error message
          setIsLoading(false);
          return false;
        }
      }

      const { error } = await supabase
        .from('community_stories')
        .insert({
          user_id: user.id,
          content: content.trim(),
          image_url: imageUrl
        });

      if (error) {
        // Handle specific RLS policy violations
        if (error.message.includes('row-level security')) {
          toast.error('This community is designed for sharing inspiring stories only. To post jobs or list salons, please visit the Jobs or Salons page.');
        } else {
          throw error;
        }
        return false;
      }

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
        () => {
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
