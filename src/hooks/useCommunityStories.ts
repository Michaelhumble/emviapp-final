
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from 'sonner';

interface CommunityStory {
  id: string;
  content: string;
  image_url?: string;
  likes: number;
  created_at: string;
  user_id: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export const useCommunityStories = () => {
  const [stories, setStories] = useState<CommunityStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newStory, setNewStory] = useState('');
  const { user } = useAuth();
  const { uploadImage } = useImageUpload();

  // Fetch stories from Supabase
  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('community_stories')
        .select(`
          *,
          profiles(
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setStories(data || []);
    } catch (error) {
      console.error('Error fetching stories:', error);
      toast.error('Failed to load community stories');
    }
  };

  // Add a new story
  const addStory = async (content: string, imageFile?: File): Promise<boolean> => {
    if (!user) {
      toast.error('Please sign in to share your story');
      return false;
    }

    if (!content.trim()) {
      toast.error('Please write your story before sharing');
      return false;
    }

    setIsLoading(true);
    
    try {
      console.log('Adding new story:', { content: content.substring(0, 50) + '...', hasImage: !!imageFile });
      
      let imageUrl: string | null = null;
      
      // Upload image if provided
      if (imageFile) {
        console.log('Uploading image...');
        imageUrl = await uploadImage(imageFile);
        if (!imageUrl) {
          console.error('Image upload failed');
          toast.error('Failed to upload image');
          return false;
        }
        console.log('Image uploaded successfully:', imageUrl);
      }

      // Insert story into database
      const { error } = await supabase
        .from('community_stories')
        .insert({
          user_id: user.id,
          content: content.trim(),
          image_url: imageUrl
        });

      if (error) {
        console.error('Database insert error:', error);
        throw error;
      }

      console.log('Story inserted successfully');
      setNewStory('');
      toast.success('Your story has been shared!');
      
      // Refresh stories
      await fetchStories();
      
      return true;
    } catch (error) {
      console.error('Error adding story:', error);
      toast.error('Failed to share your story. Please try again.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Set up real-time subscription for stories
  useEffect(() => {
    fetchStories();

    const channel = supabase
      .channel('stories-changes')
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
    isLoading,
    newStory,
    setNewStory,
    addStory,
    fetchStories
  };
};
