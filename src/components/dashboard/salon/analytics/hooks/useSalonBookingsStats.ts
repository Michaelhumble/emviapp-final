import { useQuery } from "@tanstack/react-query";
import { subDays, format } from "date-fns";
import { useSalon } from "@/context/salon";
import { supabase } from "@/integrations/supabase/client";
import { BookingStatsItem } from "@/components/dashboard/salon/types";

type StatsPeriod = '7' | '30' | '90';

export const useSalonBookingsStats = (period: StatsPeriod = '7') => {
  const { currentSalon } = useSalon();
  const salonId = currentSalon?.id;

  const getStartDate = (period: StatsPeriod) => {
    const days = parseInt(period, 10);
    return subDays(new Date(), days);
  };

  const startDate = getStartDate(period);
  const formattedStartDate = format(startDate, 'yyyy-MM-dd');
  const formattedEndDate = format(new Date(), 'yyyy-MM-dd');

  // Fix the infinite type instantiation by being more specific with the type
  const { data: bookingStats = [], isLoading, error } = useQuery({
    queryKey: ['salon-booking-stats', salonId, period],
    queryFn: async (): Promise<BookingStatsItem[]> => {
      if (!salonId) return [];

      const { data, error } = await supabase
        .from('salon_bookings')
        .select('date, status, count(*)')
        .eq('salon_id', salonId)
        .gte('date', formattedStartDate)
        .lte('date', formattedEndDate)
        .groupBy('date, status')
        .order('date', { ascending: true });

      if (error) {
        console.error("Error fetching booking stats:", error);
        throw new Error(error.message);
      }

      return data as BookingStatsItem[] || [];
    },
    enabled: !!salonId
  });

  return {
    bookingStats,
    isLoading,
    error,
  };
};
