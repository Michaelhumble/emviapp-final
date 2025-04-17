
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
        
        // Directly query using the function we created
        const { data, error: functionError } = await supabase
          .from('salon_insights')
          .select('*')
          .eq('id', currentSalon.id)
          .single();
        
        if (functionError) {
          // If we can't get data from the view, generate default values
          console.warn('Error fetching salon insights:', functionError);
          
          // Set default fallback data
          const defaultInsights: SalonInsights = {
            total_bookings: 0,
            bookings_this_month: 0,
            profile_views_week: 0,
            total_post_views: 0,
            repeat_client_rate: 0
          };
          
          setInsights(defaultInsights);
        } else if (data) {
          // Process and normalize the data
          const typedData: SalonInsights = {
            total_bookings: Number(data.total_bookings || 0),
            bookings_this_month: Number(data.bookings_this_month || 0),
            profile_views_week: Number(data.profile_views_week || 0),
            total_post_views: Number(data.total_post_views || 0),
            repeat_client_rate: Number(data.repeat_client_rate || 0)
          };
          
          setInsights(typedData);
        }
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
