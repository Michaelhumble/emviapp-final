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

    // Safe fallback: refresh user count periodically instead of risky WebSocket subscriptions
    // This prevents iOS PWA crashes from WebSocket connection issues
    const refreshInterval = setInterval(fetchUserCount, 2 * 60 * 1000); // Every 2 minutes

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return { userCount, loading, error };
};