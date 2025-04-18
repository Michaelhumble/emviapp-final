
import { useQuery } from "@tanstack/react-query";
import { subDays, format } from "date-fns";
import { useSalon } from "@/context/salon";
import { supabase } from "@/integrations/supabase/client";
import { BookingStatsItem } from "@/types/BookingStatsItem";

type StatsPeriod = '7' | '30' | '90';

// Simple interface that just defines what we need
interface AppointmentData {
  start_time: string;
  status: string;
}

export const useSalonBookingsStats = (period: StatsPeriod = '7') => {
  const { currentSalon } = useSalon();
  const salonId = currentSalon?.id;

  const getStartDate = (period: StatsPeriod) => {
    return subDays(new Date(), parseInt(period, 10));
  };

  const startDate = getStartDate(period);
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(new Date(), 'yyyy-MM-dd');

  const queryResult = useQuery({
    queryKey: ['salon-booking-stats', salonId, period],
    queryFn: async () => {
      if (!salonId) return [] as BookingStatsItem[];
      
      try {
        // Use a simple approach without complex type inference
        const response = await supabase
          .from('appointments')
          .select('start_time, status')
          .eq('salon_id', salonId)
          .gte('start_time', formattedStartDate)
          .lte('start_time', formattedEndDate);
          
        if (response.error) throw response.error;
        
        // Cast to our simple interface after the fact
        const appointments = (response.data || []) as AppointmentData[];
        
        // Process the data into our stats format
        const statsMap = new Map<string, BookingStatsItem>();

        appointments.forEach(booking => {
          const dateStr = format(new Date(booking.start_time), 'yyyy-MM-dd');

          if (!statsMap.has(dateStr)) {
            statsMap.set(dateStr, {
              date: dateStr,
              totalBookings: 0,
              completed: 0,
              canceled: 0
            });
          }

          const item = statsMap.get(dateStr)!;
          item.totalBookings += 1;

          if (booking.status === 'completed') {
            item.completed += 1;
          } else if (booking.status === 'cancelled') {
            item.canceled += 1;
          }
        });

        return Array.from(statsMap.values());
      } catch (error) {
        console.error("Error fetching booking stats:", error);
        return [];
      }
    },
    enabled: !!salonId
  });
  
  return {
    data: queryResult.data || [],
    isLoading: queryResult.isLoading,
    error: queryResult.error,
    refetch: queryResult.refetch,
    isFetching: queryResult.isFetching
  };
};
