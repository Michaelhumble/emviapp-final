
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
        const { data: staffData, error: staffError } = await supabase
          .from('salon_staff')
          .select('id')
          .eq('salon_id', currentSalon.id);
        
        if (staffError) throw staffError;
        
        const staffIds = staffData ? staffData.map(staff => staff.id) : [];
        
        // Create a default insights object
        const rawData = {
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
          
          rawData.total_bookings = totalBookingsData?.length || 0;
          
          // Get bookings this month
          const firstDayOfMonth = new Date();
          firstDayOfMonth.setDate(1);
          firstDayOfMonth.setHours(0, 0, 0, 0);
          
          const { data: monthlyBookingsData } = await supabase
            .from('bookings')
            .select('id')
            .in('recipient_id', staffIds)
            .gte('created_at', firstDayOfMonth.toISOString());
          
          rawData.bookings_this_month = monthlyBookingsData?.length || 0;
          
          // Get profile views this week
          const firstDayOfWeek = new Date();
          firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());
          firstDayOfWeek.setHours(0, 0, 0, 0);
          
          const { data: profileViewsData } = await supabase
            .from('salon_views')
            .select('id')
            .eq('salon_id', currentSalon.id)
            .gte('viewed_at', firstDayOfWeek.toISOString());
          
          rawData.profile_views_week = profileViewsData?.length || 0;
          
          // Calculate repeat client rate
          if (rawData.total_bookings > 0) {
            const { data: bookingData } = await supabase
              .from('bookings')
              .select('sender_id')
              .in('recipient_id', staffIds);

            const clientCounts = {};
            bookingData?.forEach(booking => {
              if (booking.sender_id) {
                clientCounts[booking.sender_id] = (clientCounts[booking.sender_id] || 0) + 1;
              }
            });
            
            const repeatClients = Object.values(clientCounts).filter(count => count > 1).length;
            const uniqueClients = Object.keys(clientCounts).length || 1;
            rawData.repeat_client_rate = Math.round((repeatClients / uniqueClients) * 100);
          }
        }
        
        setInsights(rawData);
      } catch (err) {
        console.error('Error fetching salon insights:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch insights'));
      } finally {
        setLoading(false);
      }
    };

    fetchSalonInsights();
  }, [currentSalon?.id]);

  return { insights, loading, error };
};
