
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';

export interface SalonInsights {
  total_bookings: number;
  bookings_this_month: number;
  profile_views_week: number;
  total_post_views: number;
  repeat_client_rate: number;
}

// Define an interface for raw data to help with type safety
interface SalonInsightsRaw {
  total_bookings: number | null;
  bookings_this_month: number | null;
  profile_views_week: number | null;
  total_post_views: number | null;
  repeat_client_rate: number | null;
}

export const useSalonInsights = () => {
  const { currentSalon } = useSalon();
  const [insights, setInsights] = useState<SalonInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSalonInsights = async () => {
      if (!currentSalon?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Get salon staff IDs
        const { data: staffData } = await supabase
          .from('salon_staff')
          .select('id')
          .eq('salon_id', currentSalon.id);
        
        const staffIds = staffData ? staffData.map(staff => staff.id) : [];
        
        // Create a default insights object
        const rawInsights: SalonInsightsRaw = {
          total_bookings: 0,
          bookings_this_month: 0,
          profile_views_week: 0,
          total_post_views: 0,
          repeat_client_rate: 0
        };
        
        if (staffIds.length > 0) {
          // Get total bookings
          const { data: totalBookingsData } = await supabase
            .from('bookings')
            .select('id', { count: 'exact' })
            .in('recipient_id', staffIds);
          
          rawInsights.total_bookings = totalBookingsData?.length || 0;
          
          // Get bookings this month
          const firstDayOfMonth = new Date();
          firstDayOfMonth.setDate(1);
          firstDayOfMonth.setHours(0, 0, 0, 0);
          
          const { data: monthlyBookingsData } = await supabase
            .from('bookings')
            .select('id')
            .in('recipient_id', staffIds)
            .gte('created_at', firstDayOfMonth.toISOString());
          
          rawInsights.bookings_this_month = monthlyBookingsData?.length || 0;
          
          // Get profile views this week
          const firstDayOfWeek = new Date();
          firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
          firstDayOfWeek.setHours(0, 0, 0, 0);
          
          const { data: profileViewsData } = await supabase
            .from('profile_views')
            .select('id')
            .in('artist_id', staffIds)
            .gte('viewed_at', firstDayOfWeek.toISOString());
          
          rawInsights.profile_views_week = profileViewsData?.length || 0;
          
          // Get total post views (just counting posts for now)
          const { data: postsData } = await supabase
            .from('posts')
            .select('id')
            .eq('user_id', currentSalon.owner_id || '');
          
          rawInsights.total_post_views = postsData?.length || 0;
          
          // Calculate repeat client rate
          if (rawInsights.total_bookings > 0) {
            const { data: repeatClientsData } = await supabase
              .from('bookings')
              .select('sender_id, count(*)')
              .in('recipient_id', staffIds)
              .group('sender_id')
              .having('count(*) > 1');
            
            const repeatClients = repeatClientsData?.length || 0;
            rawInsights.repeat_client_rate = Math.round((repeatClients / rawInsights.total_bookings) * 100);
          }
        }
        
        // Process and normalize the data
        const typedData: SalonInsights = {
          total_bookings: Number(rawInsights.total_bookings || 0),
          bookings_this_month: Number(rawInsights.bookings_this_month || 0),
          profile_views_week: Number(rawInsights.profile_views_week || 0),
          total_post_views: Number(rawInsights.total_post_views || 0),
          repeat_client_rate: Number(rawInsights.repeat_client_rate || 0)
        };
        
        setInsights(typedData);
      } catch (err) {
        console.error('Error fetching salon insights:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch insights'));
        
        // Provide fallback data even on error
        const fallbackInsights: SalonInsights = {
          total_bookings: 0,
          bookings_this_month: 0,
          profile_views_week: 0,
          total_post_views: 0,
          repeat_client_rate: 0
        };
        
        setInsights(fallbackInsights);
      } finally {
        setLoading(false);
      }
    };

    fetchSalonInsights();
  }, [currentSalon?.id]);

  return { insights, loading, error };
};
