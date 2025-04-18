
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { startOfWeek, endOfWeek, format, subWeeks } from 'date-fns';

// Define clear interfaces to prevent excessive type instantiation
export interface ChartBookingData {
  weekLabel: string;
  count: number;
}

export interface BookingsStats {
  total: number;
  pending: number;
  accepted: number;
  completed: number;
  cancelled: number;
  chartData: ChartBookingData[];
}

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
        .select('status')
        .eq('salon_id', salonId)
        .then(result => {
          // Count bookings by status
          const counts = {
            total: 0,
            pending: 0,
            accepted: 0,
            completed: 0,
            cancelled: 0
          };
          
          if (result.data) {
            counts.total = result.data.length;
            result.data.forEach(booking => {
              if (booking.status === 'pending') counts.pending++;
              else if (booking.status === 'accepted') counts.accepted++;
              else if (booking.status === 'completed') counts.completed++;
              else if (booking.status === 'cancelled') counts.cancelled++;
            });
          }
          
          return { data: counts, error: result.error };
        });
        
      if (statusError) throw statusError;
      
      // Get weekly data for the chart (last 12 weeks)
      const chartData: ChartBookingData[] = [];
      let currentDate = new Date();
      
      for (let i = 0; i < 12; i++) {
        const weekStart = startOfWeek(subWeeks(currentDate, i));
        const weekEnd = endOfWeek(weekStart);
        
        const { count, error: countError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: false })
          .eq('salon_id', salonId)
          .gte('created_at', weekStart.toISOString())
          .lt('created_at', weekEnd.toISOString());
          
        if (countError) throw countError;
          
        chartData.unshift({
          weekLabel: format(weekStart, 'MMM d'),
          count: count || 0
        });
      }
      
      return {
        total: statusCounts?.total || 0,
        pending: statusCounts?.pending || 0,
        accepted: statusCounts?.accepted || 0,
        completed: statusCounts?.completed || 0,
        cancelled: statusCounts?.cancelled || 0,
        chartData
      };
    },
    enabled: !!salonId
  });
  
  return { stats, isLoading, error };
};
