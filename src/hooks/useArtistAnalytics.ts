import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

export interface AnalyticsData {
  profileViews: number;
  totalBookings: number;
  pendingBookings: number;
  completedBookings: number;
  cancelledBookings: number;
}

export function useArtistAnalytics() {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    profileViews: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, [user]);

  const fetchAnalytics = async () => {
    if (!user) return;
    setIsLoading(true);

    try {
      // Get profile views from a view or analytics table instead
      const { data: viewData, error: viewError } = await supabase
        .from('profile_views')
        .select('count')
        .eq('artist_id', user.id)
        .single();

      if (viewError) throw viewError;

      const profileViews = viewData?.count || 0;

      // Fetch booking counts
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select('status, count')
        .eq('recipient_id', user.id)
        .groupBy('status');

      if (bookingError) throw bookingError;

      let totalBookings = 0;
      let pendingBookings = 0;
      let completedBookings = 0;
      let cancelledBookings = 0;

      bookingData.forEach(item => {
        const count = item.count || 0;
        totalBookings += count;

        switch (item.status) {
          case 'pending':
            pendingBookings = count;
            break;
          case 'completed':
            completedBookings = count;
            break;
          case 'cancelled':
            cancelledBookings = count;
            break;
        }
      });

      setAnalytics({
        profileViews,
        totalBookings,
        pendingBookings,
        completedBookings,
        cancelledBookings,
      });
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch analytics'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    analytics,
    isLoading,
    error,
    refreshAnalytics: fetchAnalytics,
  };
}
