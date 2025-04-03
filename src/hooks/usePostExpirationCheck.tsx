
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

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
          .select('id, is_expired')
          .in('id', postIds);
        
        if (error) throw error;
        
        const expirationMap: PostExpiration = {};
        data?.forEach(post => {
          expirationMap[post.id] = post.is_expired;
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
