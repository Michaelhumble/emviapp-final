
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { startOfWeek, endOfWeek, format, subWeeks } from 'date-fns';
import { BookingStatsItem } from '@/components/dashboard/salon/types';

export function useSalonBookingsStats(numWeeks = 8) {
  const [stats, setStats] = useState<BookingStatsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentSalon } = useSalon();

  useEffect(() => {
    if (!currentSalon?.id) return;

    const fetchStats = async () => {
      setLoading(true);
      setError(null);

      try {
        const currentDate = new Date();
        const weekStats: BookingStatsItem[] = [];

        // Fetch for each of the past N weeks
        for (let i = 0; i < numWeeks; i++) {
          const weekStart = startOfWeek(subWeeks(currentDate, i));
          const weekEnd = endOfWeek(weekStart);
          
          // Fixed type instantiation issue by explicitly typing the response
          const { data, error } = await supabase
            .from('bookings')
            .select('created_at', { count: 'exact' });

          if (error) throw error;

          weekStats.push({
            week: format(weekStart, 'MMM d'),
            count: data?.length || 0
          });
        }

        // Reverse so earliest week is first
        setStats(weekStats.reverse());
      } catch (err) {
        console.error('Error fetching booking stats:', err);
        setError(err instanceof Error ? err.message : 'Failed to load booking statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentSalon?.id, numWeeks]);

  return { stats, loading, error };
}
