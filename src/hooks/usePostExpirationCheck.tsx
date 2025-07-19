
import { useState, useEffect } from 'react';
import { supabaseBypass } from "@/types/supabase-bypass";
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
        // Use jobs table directly since we removed the view
        const { data, error } = await supabaseBypass
          .from('jobs')
          .select('id, created_at')
          .in('id' as any, postIds as any);
        
        if (error) throw error;
        
        const expirationMap: PostExpiration = {};
        (data as any)?.forEach((post: any) => {
          // Determine if it's been 30+ days since post creation
          const createdAt = new Date(post?.created_at);
          const now = new Date();
          const daysSinceCreation = differenceInDays(now, createdAt);
          expirationMap[post?.id] = daysSinceCreation >= 30;
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
