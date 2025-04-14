
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { startOfWeek, endOfWeek, format, subWeeks } from "date-fns";

export type EarningPeriod = {
  startDate: Date;
  endDate: Date;
  earnings: number;
  bookingCount: number;
  isPaid: boolean;
};

export type ArtistEarningsSummary = {
  currentWeekEarnings: number;
  currentWeekBookings: number;
  totalPendingPayment: number;
  recentEarnings: EarningPeriod[];
};

export const useArtistEarnings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<ArtistEarningsSummary>({
    currentWeekEarnings: 0,
    currentWeekBookings: 0,
    totalPendingPayment: 0,
    recentEarnings: []
  });

  const fetchEarningsData = useCallback(async () => {
    if (!user?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Current week range
      const currentStart = startOfWeek(new Date());
      const currentEnd = endOfWeek(new Date());
      
      // Fetch current week earnings
      const { data: currentWeekData, error: currentWeekError } = await supabase
        .from('completed_bookings')
        .select(`
          id,
          booking_id,
          service_price,
          commission_rate,
          commission_earned,
          paid,
          completed_at
        `)
        .eq('artist_id', user.id)
        .gte('completed_at', currentStart.toISOString())
        .lte('completed_at', currentEnd.toISOString());
      
      if (currentWeekError) throw currentWeekError;
      
      // Fetch pending payments (all unpaid bookings)
      const { data: pendingData, error: pendingError } = await supabase
        .from('completed_bookings')
        .select('commission_earned')
        .eq('artist_id', user.id)
        .eq('paid', false);
      
      if (pendingError) throw pendingError;
      
      // Fetch recent earnings (last 4 weeks)
      const recentWeeks: EarningPeriod[] = [];
      
      // Generate last 4 weeks data
      for (let i = 0; i < 4; i++) {
        const weekStart = startOfWeek(subWeeks(new Date(), i));
        const weekEnd = endOfWeek(subWeeks(new Date(), i));
        
        const { data: weekData, error: weekError } = await supabase
          .from('completed_bookings')
          .select(`
            id,
            booking_id,
            commission_earned,
            paid,
            completed_at
          `)
          .eq('artist_id', user.id)
          .gte('completed_at', weekStart.toISOString())
          .lte('completed_at', weekEnd.toISOString());
        
        if (weekError) throw weekError;
        
        const weekEarnings = weekData.reduce((sum, booking) => sum + parseFloat(booking.commission_earned), 0);
        const isPaid = weekData.length > 0 && weekData.every(booking => booking.paid);
        
        recentWeeks.push({
          startDate: weekStart,
          endDate: weekEnd,
          earnings: weekEarnings,
          bookingCount: weekData.length,
          isPaid
        });
      }
      
      // Calculate totals
      const currentWeekEarnings = currentWeekData.reduce((sum, booking) => sum + parseFloat(booking.commission_earned), 0);
      const totalPendingPayment = pendingData.reduce((sum, booking) => sum + parseFloat(booking.commission_earned), 0);
      
      setSummary({
        currentWeekEarnings,
        currentWeekBookings: currentWeekData.length,
        totalPendingPayment,
        recentEarnings: recentWeeks
      });
    } catch (err) {
      console.error("Error fetching artist earnings:", err);
      setError("Failed to load earnings data");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  // Fetch data on mount and when user changes
  useEffect(() => {
    if (user?.id) {
      fetchEarningsData();
    }
  }, [user?.id, fetchEarningsData]);

  return {
    loading,
    error,
    summary,
    refreshData: fetchEarningsData
  };
};
