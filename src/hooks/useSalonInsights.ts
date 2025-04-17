
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
        
        // Use a generic query approach since salon_insights is a materialized view
        const { data, error: queryError } = await supabase
          .from('salon_insights')
          .select('*')
          .eq('id', currentSalon.id)
          .single();

        if (queryError) throw queryError;

        // Type guard to ensure data matches our expected interface
        if (data) {
          const typedData: SalonInsights = {
            total_bookings: data.total_bookings || 0,
            bookings_this_month: data.bookings_this_month || 0,
            profile_views_week: data.profile_views_week || 0,
            total_post_views: data.total_post_views || 0,
            repeat_client_rate: data.repeat_client_rate || 0
          };
          
          setInsights(typedData);
        }
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
