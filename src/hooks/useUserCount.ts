import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useUserCount = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const { data, error } = await supabase.rpc('get_user_count');
        
        if (error) {
          throw error;
        }
        
        setUserCount(data as any);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user count');
        console.error('Error fetching user count:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCount();

    // Set up real-time subscription for user count updates
    const subscription = supabase
      .channel('user_count_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'profiles' 
        }, 
        () => {
          fetchUserCount();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { userCount, loading, error };
};