
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSafeQuery } from "@/hooks/useSafeQuery";
import { useSalonContext } from "@/context/salon";
import { subDays } from "date-fns";

export interface ServiceData {
  id: string;
  name: string;
  count: number;
}

export interface ServicesStatsData {
  topServices: ServiceData[];
}

export function useSalonServicesStats(timeRange: "30days" | "60days" | "90days") {
  const { currentSalonId } = useSalonContext();
  const daysToGoBack = timeRange === "30days" ? 30 : timeRange === "60days" ? 60 : 90;

  const fetchServicesStats = async (): Promise<ServicesStatsData> => {
    if (!currentSalonId) {
      throw new Error("No salon selected");
    }

    const today = new Date();
    const startDate = subDays(today, daysToGoBack);
    
    // Get bookings with service information
    const { data: bookingsData, error: bookingsError } = await supabase
      .from('bookings')
      .select('service_id')
      .eq('salon_id', currentSalonId)
      .gte('created_at', startDate.toISOString());
      
    if (bookingsError) throw bookingsError;
    
    if (!bookingsData || bookingsData.length === 0) {
      return { topServices: [] };
    }
    
    // Count bookings per service
    const serviceBookingCounts = new Map<string, number>();
    const serviceIds = new Set<string>();
    
    bookingsData.forEach(booking => {
      if (!booking.service_id) return;
      
      const serviceId = booking.service_id;
      serviceIds.add(serviceId);
      const currentCount = serviceBookingCounts.get(serviceId) || 0;
      serviceBookingCounts.set(serviceId, currentCount + 1);
    });
    
    // Get service names
    const { data: servicesData, error: servicesError } = await supabase
      .from('salon_services')
      .select('id, name')
      .in('id', Array.from(serviceIds));
      
    if (servicesError) throw servicesError;
    
    // Create service data for chart
    const serviceNameMap = new Map();
    servicesData?.forEach(service => {
      serviceNameMap.set(service.id, service.name);
    });
    
    const topServices = Array.from(serviceBookingCounts.entries())
      .map(([serviceId, count]) => ({
        id: serviceId,
        name: serviceNameMap.get(serviceId) || 'Unknown Service',
        count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Only show top 10 services
    
    return { topServices };
  };

  return useSafeQuery<ServicesStatsData>({
    queryKey: ['salon-services-stats', currentSalonId, timeRange],
    queryFn: fetchServicesStats,
    enabled: !!currentSalonId,
    fallbackData: { topServices: [] },
    context: 'salon-services-stats',
  });
}
