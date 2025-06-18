
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
  users?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export const useCommunityStories = () => {
  const [stories, setStories] = useState<CommunityStory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newStory, setNewStory] = useState('');
  const { user, isSignedIn } = useAuth();
  const { uploadImage, isUploading } = useImageUpload();

  // Fetch community stories only
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

  // Add a new community story with file upload support
  const addStory = async (content: string, imageFile?: File): Promise<boolean> => {
    console.log('addStory called with:', { 
      content: content.substring(0, 50) + '...', 
      imageFile: !!imageFile, 
      userId: user?.id,
      isSignedIn 
    });
    
    if (!isSignedIn || !user) {
      console.error('User not authenticated');
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
      toast.error('This community is designed for sharing inspiring stories only. To post jobs or list salons, please visit the appropriate sections.');
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
          toast.error('Failed to upload image');
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
        console.error('Database error:', error);
        toast.error(`Failed to share story: ${error.message}`);
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
      toast.success('Story shared successfully!');
      
      // Refresh stories to ensure consistency
      setTimeout(() => {
        fetchStories();
      }, 1000);
      
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
