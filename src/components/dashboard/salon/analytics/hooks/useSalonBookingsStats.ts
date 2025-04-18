
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { BookingsStats } from '@/types/salon';
import { startOfWeek, endOfWeek, format, subWeeks } from 'date-fns';

export const useSalonBookingsStats = (salonId?: string) => {
  const {
    data: stats,
    isLoading,
    error
  } = useQuery({
    queryKey: ['salon-booking-stats', salonId],
    queryFn: async (): Promise<BookingsStats> => {
      if (!salonId) throw new Error('No salon ID provided');
      
      // Get booking counts by status
      const { data: statusCounts, error: statusError } = await supabase
        .from('bookings')
        .select('status, count')
        .eq('salon_id', salonId)
        .count();
        
      if (statusError) throw statusError;
      
      // Get weekly data for the chart (last 12 weeks)
      const chartData = [];
      let currentDate = new Date();
      
      for (let i = 0; i < 12; i++) {
        const weekStart = startOfWeek(subWeeks(currentDate, i));
        const weekEnd = endOfWeek(weekStart);
        
        const { count } = await supabase
          .from('bookings')
          .select('*', { count: 'exact' })
          .eq('salon_id', salonId)
          .gte('created_at', weekStart.toISOString())
          .lt('created_at', weekEnd.toISOString());
          
        chartData.unshift({
          weekLabel: format(weekStart, 'MMM d'),
          count: count || 0
        });
      }
      
      return {
        total: statusCounts?.reduce((sum, item) => sum + (item.count || 0), 0) || 0,
        pending: statusCounts?.find(s => s.status === 'pending')?.count || 0,
        accepted: statusCounts?.find(s => s.status === 'accepted')?.count || 0,
        completed: statusCounts?.find(s => s.status === 'completed')?.count || 0,
        cancelled: statusCounts?.find(s => s.status === 'cancelled')?.count || 0,
        chartData
      };
    },
    enabled: !!salonId
  });
  
  return { stats, isLoading, error };
};
