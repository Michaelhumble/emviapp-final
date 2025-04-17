
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from "date-fns";
import { Transaction } from "./TransactionsTable";
import { toast } from "sonner";

export const useEarningsData = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState({
    weeklyTotal: 0,
    monthlyTotal: 0,
    completedBookings: 0,
    averagePerBooking: 0
  });
  const [chartData, setChartData] = useState<{ date: string; amount: number; }[]>([]);

  useEffect(() => {
    if (user?.id) {
      fetchEarningsData();
    }
  }, [user]);

  const fetchEarningsData = async () => {
    try {
      setIsLoading(true);
      
      const now = new Date();
      const weekStart = startOfWeek(now);
      const weekEnd = endOfWeek(now);
      const monthStart = startOfMonth(now);
      const monthEnd = endOfMonth(now);

      console.log("Fetching earnings data for artist:", user?.id);
      console.log("Date range:", { weekStart, weekEnd, monthStart, monthEnd });

      // First, fetch the completed bookings
      const { data: completedBookings, error } = await supabase
        .from('completed_bookings')
        .select('*, booking_id')
        .eq('artist_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching completed bookings:", error);
        throw error;
      }

      console.log("Completed bookings data:", completedBookings);

      // Get booking IDs for further queries
      const bookingIds = completedBookings?.map(booking => booking.booking_id) || [];
      
      // Fetch booking details to get client info
      const { data: bookingDetails, error: bookingError } = await supabase
        .from('bookings')
        .select('id, sender_id, service_id')
        .in('id', bookingIds.length > 0 ? bookingIds : ['no-bookings']);
        
      if (bookingError) {
        console.error("Error fetching booking details:", bookingError);
        throw bookingError;
      }

      console.log("Booking details:", bookingDetails);
      
      // Get client names
      const userIds = bookingDetails?.map(booking => booking.sender_id) || [];
      const { data: userDetails, error: userError } = await supabase
        .from('users')
        .select('id, full_name')
        .in('id', userIds.length > 0 ? userIds : ['no-users']);
        
      if (userError) {
        console.error("Error fetching user details:", userError);
        throw userError;
      }

      console.log("User details:", userDetails);
      
      // Get service details
      const serviceIds = bookingDetails?.map(booking => booking.service_id).filter(Boolean) || [];
      const { data: serviceDetails, error: serviceError } = await supabase
        .from('services')
        .select('id, title')
        .in('id', serviceIds.length > 0 ? serviceIds : ['no-services']);
        
      if (serviceError) {
        console.error("Error fetching service details:", serviceError);
        throw serviceError;
      }

      console.log("Service details:", serviceDetails);
      
      // Create lookup maps
      const userMap = new Map();
      userDetails?.forEach(user => {
        userMap.set(user.id, user.full_name);
      });
      
      const serviceMap = new Map();
      serviceDetails?.forEach(service => {
        serviceMap.set(service.id, service.title);
      });
      
      const bookingMap = new Map();
      bookingDetails?.forEach(booking => {
        bookingMap.set(booking.id, {
          senderId: booking.sender_id,
          serviceId: booking.service_id
        });
      });

      // Transform the data for display
      const transformedTransactions = completedBookings?.map(booking => {
        const bookingInfo = bookingMap.get(booking.booking_id) || { senderId: null, serviceId: null };
        const clientName = bookingInfo.senderId ? userMap.get(bookingInfo.senderId) || 'Unknown Client' : 'Unknown Client';
        const serviceName = bookingInfo.serviceId ? serviceMap.get(bookingInfo.serviceId) || 'Unknown Service' : 'Unknown Service';
        
        return {
          id: booking.id,
          date: booking.created_at,
          clientName,
          serviceName,
          price: booking.service_price || 0,
          status: booking.paid ? 'paid' as const : 'pending' as const
        };
      }) || [];

      console.log("Transformed transactions:", transformedTransactions);

      // Calculate weekly and monthly totals
      const weeklyBookings = completedBookings?.filter(
        b => new Date(b.created_at) >= weekStart && new Date(b.created_at) <= weekEnd
      ) || [];
      
      const weeklyTotal = weeklyBookings.reduce((sum, b) => sum + (b.commission_earned || 0), 0);
      const monthlyTotal = completedBookings?.reduce((sum, b) => sum + (b.commission_earned || 0), 0) || 0;
      const totalBookings = completedBookings?.length || 0;
      const averagePerBooking = totalBookings > 0 ? monthlyTotal / totalBookings : 0;

      console.log("Earnings stats:", { weeklyTotal, monthlyTotal, totalBookings, averagePerBooking });

      // Prepare chart data
      const dailyEarnings = completedBookings?.reduce((acc, booking) => {
        const date = format(new Date(booking.created_at), 'MMM d');
        acc[date] = (acc[date] || 0) + (booking.commission_earned || 0);
        return acc;
      }, {} as Record<string, number>) || {};

      const chartData = Object.entries(dailyEarnings).map(([date, amount]) => ({
        date,
        amount
      }));

      console.log("Chart data:", chartData);

      setTransactions(transformedTransactions);
      setStats({
        weeklyTotal,
        monthlyTotal,
        completedBookings: totalBookings,
        averagePerBooking
      });
      setChartData(chartData);

    } catch (error) {
      console.error('Error fetching earnings data:', error);
      toast.error('Failed to load earnings data');
    } finally {
      setIsLoading(false);
    }
  };

  const sortTransactions = (key: keyof Transaction) => {
    const sorted = [...transactions].sort((a, b) => {
      if (key === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (key === 'price') {
        return b.price - a.price;
      }
      return 0;
    });
    setTransactions(sorted);
  };

  return {
    isLoading,
    transactions,
    stats,
    chartData,
    sortTransactions
  };
};
