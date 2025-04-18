
import { useTypedQuery } from "@/hooks/useTypedQuery";
import { subDays, format } from "date-fns";
import { useSalon } from "@/context/salon";
import { supabase } from "@/integrations/supabase/client";
import { BookingStatsItem } from "@/types/BookingStatsItem";

type StatsPeriod = '7' | '30' | '90';

// Define a simple interface for the raw appointment data we receive
interface AppointmentData {
  start_time: string;
  status: string;
}

// Define a simplified interface for the query result to avoid deep type instantiation
interface SupabaseQueryResult {
  data: AppointmentData[] | null;
  error: Error | null;
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
    queryFn: async (): Promise<BookingStatsItem[]> => {
      if (!salonId) return [];

      // Use `any` type temporarily to break the deep type instantiation chain
      const result = await supabase
        .from('appointments')
        .select('start_time, status')
        .eq('salon_id', salonId)
        .gte('start_time', formattedStartDate)
        .lte('start_time', formattedEndDate) as unknown as SupabaseQueryResult;
      
      if (result.error) throw result.error;
      if (!result.data) return [];
      
      const statsMap = new Map<string, BookingStatsItem>();
      
      result.data.forEach(booking => {
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
};
