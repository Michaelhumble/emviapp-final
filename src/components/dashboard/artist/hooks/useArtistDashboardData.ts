
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardStats, BookingWithDetails, EarningsData, MonthlyEarning } from "../types/ArtistDashboardTypes";
import { useAuth } from "@/context/auth";

export function useArtistDashboardData(activeTab = "overview") {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    booking_count: 0,
    completed_services: 0,
    total_earnings: 0,
    average_rating: 0,
    referral_count: 0,
    repeat_client_percentage: 0
  });
  const [recentBookings, setRecentBookings] = useState<BookingWithDetails[]>([]);
  const [earningsData, setEarningsData] = useState<EarningsData>({
    monthly_earnings: [],
    total_earnings: 0,
    pending_payouts: 0
  });
  
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);
  const [isLoadingEarnings, setIsLoadingEarnings] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch dashboard stats
  useEffect(() => {
    if (!user) return;
    
    const fetchDashboardStats = async () => {
      setIsLoadingStats(true);
      try {
        // Fetch basic stats directly instead of using RPC
        const { data: bookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('recipient_id', user.id);
          
        const { data: completedBookings, error: completedError } = await supabase
          .from('bookings')
          .select('*')
          .eq('recipient_id', user.id)
          .eq('status', 'completed');
          
        const { data: reviewsData, error: reviewsError } = await supabase
          .from('reviews')
          .select('rating')
          .eq('artist_id', user.id);
          
        const { data: referrals, error: referralsError } = await supabase
          .from('referrals')
          .select('*')
          .eq('referrer_id', user.id);
          
        if (bookingsError || completedError || reviewsError || referralsError) {
          throw new Error("Error fetching dashboard stats");
        }
        
        // Calculate average rating
        const avgRating = reviewsData && reviewsData.length > 0
          ? reviewsData.reduce((sum, review) => sum + (review.rating || 0), 0) / reviewsData.length
          : 0;
          
        // Set stats with the data we've gathered
        setStats({
          booking_count: bookings?.length || 0,
          completed_services: completedBookings?.length || 0,
          total_earnings: (completedBookings?.length || 0) * 100, // Mock calculation
          average_rating: avgRating,
          referral_count: referrals?.length || 0,
          repeat_client_percentage: 25 // Mock data
        });
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoadingStats(false);
      }
    };

    fetchDashboardStats();
  }, [user]);

  // Fetch recent bookings
  useEffect(() => {
    if (!user || activeTab !== "overview") return;
    
    const fetchRecentBookings = async () => {
      setIsLoadingBookings(true);
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('recipient_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
          
        if (error) throw error;
        
        // Transform the data to match the expected structure
        const bookingsWithDetails = data?.map(booking => ({
          id: booking.id,
          sender_id: booking.sender_id,
          recipient_id: booking.recipient_id,
          service_id: booking.service_id,
          service_name: "Nail Service", // Mock data
          date_requested: booking.date_requested,
          time_requested: booking.time_requested,
          appointment_time: booking.date_requested + ' ' + booking.time_requested,
          status: booking.status,
          created_at: booking.created_at,
          price: 85, // Mock price
          note: booking.note
        })) || [];
        
        setRecentBookings(bookingsWithDetails);
      } catch (err) {
        console.error("Recent bookings fetch error:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoadingBookings(false);
      }
    };

    fetchRecentBookings();
  }, [user, activeTab]);

  // Fetch earnings data
  useEffect(() => {
    if (!user || activeTab !== "earnings") return;
    
    const fetchEarningsData = async () => {
      setIsLoadingEarnings(true);
      try {
        // For mock data, we'll generate the past 6 months
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
        const mockMonthlyEarnings: MonthlyEarning[] = months.map((month, index) => ({
          month,
          amount: Math.floor(Math.random() * 2000) + 500
        }));
        
        const totalEarnings = mockMonthlyEarnings.reduce((sum, month) => sum + month.amount, 0);
        
        setEarningsData({
          monthly_earnings: mockMonthlyEarnings,
          total_earnings: totalEarnings,
          pending_payouts: Math.floor(Math.random() * 800) + 200
        });
      } catch (err) {
        console.error("Earnings data fetch error:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoadingEarnings(false);
      }
    };

    fetchEarningsData();
  }, [user, activeTab]);

  return { 
    stats, 
    isLoadingStats, 
    recentBookings, 
    isLoadingBookings, 
    earningsData, 
    isLoadingEarnings, 
    error 
  };
}
