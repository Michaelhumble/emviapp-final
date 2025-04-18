
import { useQuery } from "@tanstack/react-query";
import { subDays, format } from "date-fns";
import { useSalon } from "@/context/salon";
import { supabase } from "@/integrations/supabase/client";
import { BookingStatsItem } from "@/types/BookingStatsItem";

type StatsPeriod = '7' | '30' | '90';

export const useSalonBookingsStats = (period: StatsPeriod = '7') => {
  const { currentSalon } = useSalon();
  const salonId = currentSalon?.id;

  const getStartDate = (period: StatsPeriod) => {
    return subDays(new Date(), parseInt(period, 10));
  };

  const startDate = getStartDate(period);
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(new Date(), 'yyyy-MM-dd');

  return useQuery({
    queryKey: ['salon-booking-stats', salonId, period],
    queryFn: async () => {
      if (!salonId) return [];

      // Fetch the booking data from Supabase using start_time
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('start_time, status')
        .eq('salon_id', salonId)
        .gte('start_time', formattedStartDate)
        .lte('start_time', formattedEndDate);

      if (error) throw error;

      // Transform the data into BookingStatsItem format
      const statsMap = new Map<string, BookingStatsItem>();
      
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
};
