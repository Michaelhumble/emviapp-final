
import { useQuery } from "@tanstack/react-query";
import { subDays, format } from "date-fns";
import { useSalon } from "@/context/salon";
import { supabase } from "@/integrations/supabase/client";
import { BookingStatsItem } from "@/types/BookingStatsItem";

type StatsPeriod = '7' | '30' | '90';

// Define a simple type that matches the exact structure we get from Supabase
type RawAppointment = {
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
      
      // Use a generic Promise type to avoid TypeScript's deep type inference
      const fetchData = async (): Promise<RawAppointment[]> => {
        // Execute the query without type propagation
        const { data, error } = await supabase
          .from('appointments')
          .select('start_time, status')
          .eq('salon_id', salonId)
          .gte('start_time', formattedStartDate)
          .lte('start_time', formattedEndDate);
          
        if (error) throw error;
        return (data || []) as RawAppointment[];
      };
      
      // Get the raw data
      const appointments = await fetchData();
      
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
