
import { supabase } from "@/integrations/supabase/client";
import { useSafeQuery } from "@/hooks/useSafeQuery";
import { useSalon } from "@/context/salon";
import { format, subDays, startOfWeek, endOfWeek, eachWeekOfInterval } from "date-fns";

export interface WeeklyBookingData {
  weekLabel: string;
  weekStart: string;
  weekEnd: string;
  count: number;
}

export interface BookingsStatsData {
  totalBookings: number;
  bookingsByWeek: WeeklyBookingData[];
}

export function useSalonBookingsStats(timeRange: "30days" | "60days" | "90days") {
  const { currentSalonId } = useSalon();
  const daysToGoBack = timeRange === "30days" ? 30 : timeRange === "60days" ? 60 : 90;

  const fetchBookingStats = async (): Promise<BookingsStatsData> => {
    if (!currentSalonId) {
      throw new Error("No salon selected");
    }

    const today = new Date();
    const startDate = subDays(today, daysToGoBack);
    
    // Get total bookings for the period
    const { data: totalData, error: totalError } = await supabase
      .from('bookings')
      .select('id', { count: 'exact' })
      .eq('salon_id', currentSalonId)
      .gte('created_at', startDate.toISOString());
      
    if (totalError) throw totalError;
    
    // Get weeks
    const weeks = eachWeekOfInterval(
      { start: startDate, end: today },
      { weekStartsOn: 1 } // Week starts on Monday
    );
    
    // Create weekly data structure
    let weeklyData: WeeklyBookingData[] = [];
    
    for (const weekStart of weeks) {
      const weekStartDate = startOfWeek(weekStart, { weekStartsOn: 1 });
      const weekEndDate = endOfWeek(weekStart, { weekStartsOn: 1 });
      
      const { data, error } = await supabase
        .from('bookings')
        .select('id', { count: 'exact' })
        .eq('salon_id', currentSalonId)
        .gte('created_at', weekStartDate.toISOString())
        .lte('created_at', weekEndDate.toISOString());
        
      if (error) throw error;
      
      weeklyData.push({
        weekLabel: `${format(weekStartDate, 'MMM d')} - ${format(weekEndDate, 'MMM d')}`,
        weekStart: weekStartDate.toISOString(),
        weekEnd: weekEndDate.toISOString(),
        count: data?.length || 0
      });
    }
    
    return {
      totalBookings: totalData?.length || 0,
      bookingsByWeek: weeklyData
    };
  };

  return useSafeQuery<BookingsStatsData>({
    queryKey: ['salon-bookings-stats', currentSalonId, timeRange],
    queryFn: fetchBookingStats,
    enabled: !!currentSalonId,
    fallbackData: { totalBookings: 0, bookingsByWeek: [] },
    context: 'salon-bookings-stats',
  });
}
