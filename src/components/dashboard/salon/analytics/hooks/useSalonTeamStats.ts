
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSafeQuery } from "@/hooks/useSafeQuery";
import { useSalonContext } from "@/context/salon";
import { subDays } from "date-fns";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatarUrl: string | null;
  bookingsCount: number;
  revenue: number;
}

export interface TeamStatsData {
  teamMembers: TeamMember[];
}

export function useSalonTeamStats(timeRange: "30days" | "60days" | "90days") {
  const { currentSalonId } = useSalonContext();
  const daysToGoBack = timeRange === "30days" ? 30 : timeRange === "60days" ? 60 : 90;

  const fetchTeamStats = async (): Promise<TeamStatsData> => {
    if (!currentSalonId) {
      throw new Error("No salon selected");
    }

    const today = new Date();
    const startDate = subDays(today, daysToGoBack);
    
    // Get salon staff
    const { data: staffData, error: staffError } = await supabase
      .from('salon_staff')
      .select('id, full_name, role, avatar_url')
      .eq('salon_id', currentSalonId)
      .eq('status', 'active');
      
    if (staffError) throw staffError;
    
    if (!staffData || staffData.length === 0) {
      return { teamMembers: [] };
    }
    
    // For each staff member, get their bookings and revenue
    const teamMembersWithStats = await Promise.all(
      staffData.map(async staff => {
        // Get bookings count
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('id, service_id')
          .eq('recipient_id', staff.id)
          .eq('status', 'completed')
          .gte('created_at', startDate.toISOString());
          
        if (bookingsError) throw bookingsError;
        
        // Calculate total revenue
        let totalRevenue = 0;
        
        if (bookingsData && bookingsData.length > 0) {
          // Get service prices for the bookings
          const serviceIds = bookingsData.map(booking => booking.service_id).filter(Boolean);
          
          if (serviceIds.length > 0) {
            const { data: servicesData, error: servicesError } = await supabase
              .from('salon_services')
              .select('id, price')
              .in('id', serviceIds);
              
            if (servicesError) throw servicesError;
            
            // Create a map of service id to price
            const servicePrices = new Map();
            servicesData?.forEach(service => {
              servicePrices.set(service.id, service.price);
            });
            
            // Calculate revenue
            bookingsData.forEach(booking => {
              if (booking.service_id && servicePrices.has(booking.service_id)) {
                totalRevenue += servicePrices.get(booking.service_id) || 0;
              }
            });
          }
        }
        
        return {
          id: staff.id,
          name: staff.full_name,
          role: staff.role || 'Team Member',
          avatarUrl: staff.avatar_url,
          bookingsCount: bookingsData?.length || 0,
          revenue: totalRevenue
        };
      })
    );
    
    // Sort by bookings count (descending)
    teamMembersWithStats.sort((a, b) => b.bookingsCount - a.bookingsCount);
    
    return {
      teamMembers: teamMembersWithStats
    };
  };

  return useSafeQuery<TeamStatsData>({
    queryKey: ['salon-team-stats', currentSalonId, timeRange],
    queryFn: fetchTeamStats,
    enabled: !!currentSalonId,
    fallbackData: { teamMembers: [] },
    context: 'salon-team-stats',
  });
}
