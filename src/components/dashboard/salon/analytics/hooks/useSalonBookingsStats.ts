
import { useQuery } from "@tanstack/react-query";
import { subDays, format } from "date-fns";
import { useSalon } from "@/context/salon";
import { supabase } from "@/integrations/supabase/client";
import { BookingStatsItem } from "@/types/BookingStatsItem";
import { useTypedQuery } from "@/hooks/useTypedQuery";

type StatsPeriod = '7' | '30' | '90';

// Define the raw database response type
type BookingStatsDbRecord = {
  date: string;
  status: string; 
  count: string;
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

  return useTypedQuery<BookingStatsItem[]>({
    queryKey: ['salon-booking-stats', salonId, period],
    queryFn: async () => {
      if (!salonId) return [];

      // Fetch the booking data from Supabase
      // Use a simpler approach without .group() to avoid type errors
      const { data, error } = await supabase
        .from('bookings')
        .select('date, status')
        .eq('salon_id', salonId)
        .gte('date', formattedStartDate)
        .lte('date', formattedEndDate)
        .order('date', { ascending: true });

      if (error) throw error;

      // Transform the data into BookingStatsItem format
      const statsMap = new Map<string, BookingStatsItem>();
      
      // Process data if it exists
      if (data && Array.isArray(data)) {
        // Create a map of dates with initialized stats
        for (const record of data) {
          const dateStr = record.date as string;
          
          if (!statsMap.has(dateStr)) {
            statsMap.set(dateStr, {
              date: dateStr,
              totalBookings: 0,
              completed: 0,
              canceled: 0
            });
          }
          
          const item = statsMap.get(dateStr)!;
          
          // Update the stats based on the status
          item.totalBookings += 1;
          
          if (record.status === 'completed') {
            item.completed += 1;
          } else if (record.status === 'cancelled') {
            item.canceled += 1;
          }
        }
      }
      
      return Array.from(statsMap.values());
    },
    enabled: !!salonId
  });
};
