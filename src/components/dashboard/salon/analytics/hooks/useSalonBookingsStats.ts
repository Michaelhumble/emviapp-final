
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

  return useQuery<BookingStatsItem[]>({
    queryKey: ['salon-booking-stats', salonId, period],
    queryFn: async () => {
      if (!salonId) return [];

      // Fetch the booking data from Supabase
      const { data, error } = await supabase
        .from('bookings')
        .select('date, status, count(*)')
        .eq('salon_id', salonId)
        .gte('date', formattedStartDate)
        .lte('date', formattedEndDate)
        .order('date', { ascending: true });

      if (error) throw error;

      // Transform the data into BookingStatsItem format
      const statsMap = new Map<string, BookingStatsItem>();
      
      // Initialize the map with all dates in the range
      for (const d of data || []) {
        if (!statsMap.has(d.date)) {
          statsMap.set(d.date, {
            date: d.date,
            totalBookings: 0,
            completed: 0,
            canceled: 0
          });
        }
        
        const item = statsMap.get(d.date)!;
        const count = parseInt(d.count, 10);
        
        // Update the stats based on the status
        item.totalBookings += count;
        
        if (d.status === 'completed') {
          item.completed += count;
        } else if (d.status === 'cancelled') {
          item.canceled += count;
        }
      }
      
      return Array.from(statsMap.values());
    },
    enabled: !!salonId
  });
};
