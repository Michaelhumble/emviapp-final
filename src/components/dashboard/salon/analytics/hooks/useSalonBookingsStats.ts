
import { useTypedQuery } from "@/hooks/useTypedQuery";
import { subDays, format } from "date-fns";
import { useSalon } from "@/context/salon";
import { supabase } from "@/integrations/supabase/client";
import { BookingStatsItem } from "@/types/BookingStatsItem";

type StatsPeriod = '7' | '30' | '90';

// Define a type for the booking data returned from Supabase
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

  // Break type recursion by using explicit type parameter and return type
  const query = useTypedQuery<BookingStatsItem[]>({
    queryKey: ['salon-booking-stats', salonId, period],
    queryFn: async (): Promise<BookingStatsItem[]> => {
      if (!salonId) return [];

      // Break the type inference chain using type assertion
      const response = await supabase
        .from('appointments')
        .select('start_time, status')
        .eq('salon_id', salonId)
        .gte('start_time', formattedStartDate)
        .lte('start_time', formattedEndDate);
        
      // Simple type assertion to avoid deep inference
      const { data, error } = response as any;

      if (error) throw error;
      
      // Transform the data into BookingStatsItem format
      const statsMap = new Map<string, BookingStatsItem>();
      
      // Use type assertion to break inference chain
      const bookings = data as Array<{start_time: string, status: string}>;
      
      if (bookings && Array.isArray(bookings)) {
        for (const booking of bookings) {
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
        }
      }
      
      return Array.from(statsMap.values());
    },
    enabled: !!salonId
  });

  return query;
};
