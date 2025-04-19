
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { SalonEarnings, MonthlyStats } from './types';
import { startOfMonth, endOfMonth } from 'date-fns';

export const useEarningsData = () => {
  const { currentSalon } = useSalon();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [monthlyStats, setMonthlyStats] = useState<MonthlyStats>({
    totalEarnings: 0,
    totalBookings: 0,
    artistPerformance: []
  });

  useEffect(() => {
    const fetchEarningsData = async () => {
      if (!currentSalon?.id) return;
      
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .rpc('get_salon_earnings', {
            p_salon_id: currentSalon.id
          });

        if (fetchError) throw fetchError;

        // Current month's data
        const now = new Date();
        const monthStart = startOfMonth(now);
        const monthEnd = endOfMonth(now);
        
        const currentMonthData = (data || []).filter((earning: SalonEarnings) => {
          const date = new Date(earning.month);
          return date >= monthStart && date <= monthEnd;
        });

        const stats: MonthlyStats = {
          totalEarnings: currentMonthData.reduce((sum: number, item: SalonEarnings) => 
            sum + Number(item.total_revenue), 0),
          totalBookings: currentMonthData.reduce((sum: number, item: SalonEarnings) => 
            sum + Number(item.booking_count), 0),
          artistPerformance: currentMonthData
        };

        setMonthlyStats(stats);
      } catch (err: any) {
        console.error('Error fetching earnings data:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEarningsData();
  }, [currentSalon?.id]);

  return { monthlyStats, loading, error };
};
