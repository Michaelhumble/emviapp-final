
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSalon } from "@/context/salon/SalonContext";
import { useAuth } from "@/context/auth";
import { format, startOfWeek, endOfWeek } from "date-fns";

export type TeamEarnings = {
  artistId: string;
  artistName: string;
  bookingCount: number;
  totalRevenue: number;
  totalEarnings: number;
  commissionRate: number;
  isPaid: boolean;
};

export type EarningsSummary = {
  weeklyEarnings: TeamEarnings[];
  totalOwed: number;
  totalRevenue: number;
  totalBookings: number;
};

export const useSalonPayroll = () => {
  const { currentSalon } = useSalon();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<EarningsSummary>({
    weeklyEarnings: [],
    totalOwed: 0,
    totalRevenue: 0,
    totalBookings: 0
  });

  const fetchPayrollData = useCallback(async () => {
    if (!currentSalon?.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const startDate = startOfWeek(new Date());
      const endDate = endOfWeek(new Date());
      
      // Fetch completed bookings for the current salon
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('completed_bookings')
        .select(`
          id,
          booking_id,
          artist_id,
          service_price,
          commission_rate,
          commission_earned,
          paid,
          completed_at
        `)
        .eq('salon_id', currentSalon.id)
        .gte('completed_at', startDate.toISOString())
        .lte('completed_at', endDate.toISOString())
        .order('completed_at', { ascending: false });
      
      if (bookingsError) throw bookingsError;
      
      // Get artist details for context
      const artistIds = [...new Set(bookingsData.map(booking => booking.artist_id))];
      
      const { data: artistsData, error: artistsError } = await supabase
        .from('salon_staff')
        .select('id, full_name, email, commission_rate')
        .eq('salon_id', currentSalon.id)
        .in('email', artistIds.map(id => `user-${id.replace(/-/g, '')}@example.com`)); // This is a placeholder, in a real app we would join with users table
      
      if (artistsError) throw artistsError;
      
      // Fetch user details for artist names
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, full_name')
        .in('id', artistIds);
      
      if (userError) throw userError;
      
      // Map user data
      const userMap = new Map();
      userData.forEach(user => {
        userMap.set(user.id, user.full_name);
      });
      
      // Process the earnings data by artist
      const artistEarnings = new Map<string, TeamEarnings>();
      
      bookingsData.forEach(booking => {
        const artistId = booking.artist_id;
        const artistName = userMap.get(artistId) || "Unknown Artist";
        
        if (!artistEarnings.has(artistId)) {
          artistEarnings.set(artistId, {
            artistId,
            artistName,
            bookingCount: 0,
            totalRevenue: 0,
            totalEarnings: 0,
            commissionRate: booking.commission_rate,
            isPaid: booking.paid
          });
        }
        
        const current = artistEarnings.get(artistId)!;
        current.bookingCount += 1;
        current.totalRevenue += parseFloat(String(booking.service_price));
        current.totalEarnings += parseFloat(String(booking.commission_earned));
      });
      
      // Convert map to array
      const weeklyEarnings = Array.from(artistEarnings.values());
      
      // Calculate totals
      const totalOwed = weeklyEarnings.reduce((sum, artist) => sum + artist.totalEarnings, 0);
      const totalRevenue = weeklyEarnings.reduce((sum, artist) => sum + artist.totalRevenue, 0);
      const totalBookings = weeklyEarnings.reduce((sum, artist) => sum + artist.bookingCount, 0);
      
      setSummary({
        weeklyEarnings,
        totalOwed,
        totalRevenue,
        totalBookings
      });
    } catch (err) {
      console.error("Error fetching payroll data:", err);
      setError("Failed to load payroll data");
    } finally {
      setLoading(false);
    }
  }, [currentSalon?.id]);

  // Fetch data on mount and when salon changes
  useEffect(() => {
    if (currentSalon?.id) {
      fetchPayrollData();
    }
  }, [currentSalon?.id, fetchPayrollData]);

  const markAsPaid = async (artistId: string) => {
    if (!currentSalon?.id) return false;
    
    try {
      const { error } = await supabase
        .from('completed_bookings')
        .update({ paid: true, payment_date: new Date().toISOString() })
        .eq('salon_id', currentSalon.id)
        .eq('artist_id', artistId)
        .eq('paid', false);
      
      if (error) throw error;
      
      // Refresh data after marking as paid
      await fetchPayrollData();
      return true;
    } catch (err) {
      console.error("Error marking payments as paid:", err);
      return false;
    }
  };

  const generateCsv = (): string => {
    // Header row
    let csv = "Artist Name,Booking Count,Total Revenue,Commission Rate,Total Earnings,Status\n";
    
    // Data rows
    summary.weeklyEarnings.forEach(artist => {
      csv += `"${artist.artistName}",${artist.bookingCount},$${artist.totalRevenue.toFixed(2)},${artist.commissionRate}%,$${artist.totalEarnings.toFixed(2)},${artist.isPaid ? 'Paid' : 'Unpaid'}\n`;
    });
    
    // Summary row
    csv += `\n"TOTAL",${summary.totalBookings},$${summary.totalRevenue.toFixed(2)},-,$${summary.totalOwed.toFixed(2)},-\n`;
    
    return csv;
  };

  return {
    loading,
    error,
    summary,
    refreshData: fetchPayrollData,
    markAsPaid,
    generateCsv
  };
};
