
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSafeQuery } from "@/hooks/useSafeQuery";
import { useSalonContext } from "@/context/salon";
import { subDays } from "date-fns";

export interface RepeatClientRateData {
  totalClientCount: number;
  repeatClientCount: number;
  repeatRate: number;
}

export function useSalonRepeatClientRate(timeRange: "30days" | "60days" | "90days") {
  const { currentSalonId } = useSalonContext();
  const daysToGoBack = timeRange === "30days" ? 30 : timeRange === "60days" ? 60 : 90;

  const fetchRepeatClientRate = async (): Promise<RepeatClientRateData> => {
    if (!currentSalonId) {
      throw new Error("No salon selected");
    }

    const today = new Date();
    const startDate = subDays(today, daysToGoBack);
    
    // Get all client IDs with completed bookings in the time range
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('bookings')
      .select('sender_id, status')
      .eq('salon_id', currentSalonId)
      .eq('status', 'completed')
      .gte('created_at', startDate.toISOString());
      
    if (bookingsError) throw bookingsError;
    
    if (!bookingsData || bookingsData.length === 0) {
      return {
        totalClientCount: 0,
        repeatClientCount: 0,
        repeatRate: 0
      };
    }
    
    // Count bookings per client
    const clientBookingCounts = new Map<string, number>();
    
    bookingsData.forEach(booking => {
      if (!booking.sender_id) return;
      
      const clientId = booking.sender_id;
      const currentCount = clientBookingCounts.get(clientId) || 0;
      clientBookingCounts.set(clientId, currentCount + 1);
    });
    
    // Calculate stats
    const totalClients = clientBookingCounts.size;
    const repeatClients = Array.from(clientBookingCounts.values()).filter(count => count > 1).length;
    const repeatRate = totalClients > 0 ? Math.round((repeatClients / totalClients) * 100) : 0;
    
    return {
      totalClientCount: totalClients,
      repeatClientCount: repeatClients,
      repeatRate
    };
  };

  return useSafeQuery<RepeatClientRateData>({
    queryKey: ['salon-repeat-client-rate', currentSalonId, timeRange],
    queryFn: fetchRepeatClientRate,
    enabled: !!currentSalonId,
    fallbackData: { totalClientCount: 0, repeatClientCount: 0, repeatRate: 0 },
    context: 'salon-repeat-client-rate',
  });
}
