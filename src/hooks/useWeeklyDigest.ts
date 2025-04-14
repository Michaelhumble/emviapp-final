
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/auth';
import { format, parseISO } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useNotificationContext } from '@/context/notification';

export interface WeeklyDigestStats {
  booking_count: number;
  total_revenue: number;
  most_booked_day: string | null;
  start_date?: string;
  end_date?: string;
}

export const useWeeklyDigest = () => {
  const { user, userProfile } = useAuth();
  const [latestDigest, setLatestDigest] = useState<WeeklyDigestStats | null>(null);
  const [loading, setLoading] = useState(false);
  const { notifications } = useNotificationContext();

  // Fetch the latest weekly digest notification
  const fetchLatestDigest = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      // Find the latest weekly summary from notifications
      const weeklyDigests = notifications.filter(n => n.type === 'weekly_summary');
      
      if (weeklyDigests.length > 0) {
        // Sort by creation date (newest first)
        weeklyDigests.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        const latestDigestNotification = weeklyDigests[0];
        
        if (latestDigestNotification.metadata && latestDigestNotification.metadata.stats) {
          const stats = latestDigestNotification.metadata.stats as WeeklyDigestStats;
          
          // Add formatted date range
          if (latestDigestNotification.metadata.start_date && latestDigestNotification.metadata.end_date) {
            const startDate = parseISO(latestDigestNotification.metadata.start_date as string);
            const endDate = parseISO(latestDigestNotification.metadata.end_date as string);
            
            stats.start_date = format(startDate, 'MMM d');
            stats.end_date = format(endDate, 'MMM d, yyyy');
          }
          
          setLatestDigest(stats);
        }
      }
    } catch (error) {
      console.error('Error fetching weekly digest:', error);
    } finally {
      setLoading(false);
    }
  }, [user, notifications]);

  // Manual trigger function (for testing)
  const triggerWeeklyDigest = useCallback(async () => {
    if (!user) return;
    
    try {
      // This would normally be triggered by the scheduled function
      const { error } = await supabase.functions.invoke('send-weekly-digest');
      
      if (error) {
        throw error;
      }
      
      // Refetch after triggering
      setTimeout(() => {
        fetchLatestDigest();
      }, 2000);
      
      return true;
    } catch (error) {
      console.error('Error triggering weekly digest:', error);
      return false;
    }
  }, [user, fetchLatestDigest]);

  // Initialize data when component loads
  useEffect(() => {
    if (user) {
      fetchLatestDigest();
    }
  }, [user, fetchLatestDigest]);

  return {
    latestDigest,
    loading,
    triggerWeeklyDigest,
    refreshDigest: fetchLatestDigest
  };
};
