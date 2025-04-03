
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { differenceInDays } from 'date-fns';

interface PostExpiration {
  [postId: string]: boolean;
}

export const usePostExpirationCheck = (postIds: string[]) => {
  const [expirations, setExpirations] = useState<PostExpiration>({});
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!postIds.length) {
      setIsLoading(false);
      return;
    }
    
    const fetchExpirationData = async () => {
      try {
        const { data, error } = await supabase
          .from('post_status_view')
          .select('id, is_expired, created_at')
          .in('id', postIds);
        
        if (error) throw error;
        
        const expirationMap: PostExpiration = {};
        data?.forEach(post => {
          // Determine if it's been 30+ days since post creation
          const createdAt = new Date(post.created_at);
          const now = new Date();
          const daysSinceCreation = differenceInDays(now, createdAt);
          expirationMap[post.id] = daysSinceCreation >= 30;
        });
        
        setExpirations(expirationMap);
      } catch (error) {
        console.error('Error fetching post expiration data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExpirationData();
  }, [postIds]);
  
  return { expirations, isLoading };
};
