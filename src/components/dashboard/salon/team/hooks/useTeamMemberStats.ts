
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfWeek, endOfWeek } from "date-fns";

export interface TeamMemberStats {
  bookingsCount: number;
  totalEarnings: number;
}

export const useTeamMemberStats = (memberId: string | undefined) => {
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Start from Monday
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });

  return useQuery({
    queryKey: ['teamMemberStats', memberId, weekStart],
    queryFn: async (): Promise<TeamMemberStats> => {
      if (!memberId) return { bookingsCount: 0, totalEarnings: 0 };

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          service:service_id (
            price
          )
        `)
        .eq('recipient_id', memberId)
        .eq('status', 'completed')
        .gte('date_requested', weekStart.toISOString())
        .lte('date_requested', weekEnd.toISOString());

      if (error) throw error;

      const bookingsCount = data?.length || 0;
      const totalEarnings = data?.reduce((sum, booking) => {
        return sum + (booking.service?.price || 0);
      }, 0) || 0;

      return {
        bookingsCount,
        totalEarnings
      };
    },
    enabled: !!memberId
  });
};
