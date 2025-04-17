
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
        
        // Use a raw query approach to avoid type issues with the materialized view
        const { data, error: queryError } = await supabase
          .rpc('get_salon_insights', { salon_id: currentSalon.id })
          .single();

        if (queryError) {
          // Fallback to direct query with type casting if RPC function is not available
          const { data: viewData, error: viewError } = await supabase
            .from('salon_insights')
            .select('*')
            .eq('id', currentSalon.id)
            .single();
            
          if (viewError) throw viewError;
          
          if (viewData) {
            const typedData: SalonInsights = {
              total_bookings: Number(viewData.total_bookings || 0),
              bookings_this_month: Number(viewData.bookings_this_month || 0),
              profile_views_week: Number(viewData.profile_views_week || 0),
              total_post_views: Number(viewData.total_post_views || 0),
              repeat_client_rate: Number(viewData.repeat_client_rate || 0)
            };
            
            setInsights(typedData);
          }
        } else if (data) {
          // Handle response from RPC function
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
      } finally {
        setLoading(false);
      }
    };

    fetchSalonInsights();
  }, [currentSalon?.id]);

  return { insights, loading, error };
};
