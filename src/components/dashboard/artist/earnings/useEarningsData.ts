
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth, format } from "date-fns";
import { Transaction } from "./TransactionsTable";

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

      // First, fetch the completed bookings
      const { data: completedBookings, error } = await supabase
        .from('completed_bookings')
        .select('*, booking_id')
        .eq('artist_id', user?.id)
        .gte('created_at', monthStart.toISOString())
        .lte('created_at', monthEnd.toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Now fetch related booking data to get client names
      const bookingIds = completedBookings.map(booking => booking.booking_id);
      
      // Fetch booking details for client names
      const { data: bookingDetails, error: bookingError } = await supabase
        .from('bookings')
        .select(`
          id,
          sender_id,
          service_id,
          users:sender_id(full_name),
          services:service_id(title)
        `)
        .in('id', bookingIds);
        
      if (bookingError) throw bookingError;

      // Create a map for easy lookup
      const bookingMap = new Map();
      bookingDetails?.forEach(booking => {
        bookingMap.set(booking.id, {
          clientName: booking.users?.full_name || 'Unknown',
          serviceName: booking.services?.title || 'Unknown Service'
        });
      });

      // Transform data for transactions
      const transformedTransactions = completedBookings.map(booking => {
        const bookingInfo = bookingMap.get(booking.booking_id) || { 
          clientName: 'Unknown', 
          serviceName: 'Unknown Service' 
        };
        
        return {
          id: booking.id,
          date: booking.created_at,
          clientName: bookingInfo.clientName,
          serviceName: bookingInfo.serviceName,
          price: booking.service_price || 0,
          status: booking.paid ? 'paid' as const : 'pending' as const
        };
      });

      // Calculate stats
      const weeklyBookings = completedBookings.filter(
        b => new Date(b.created_at) >= weekStart && new Date(b.created_at) <= weekEnd
      );
      
      const weeklyTotal = weeklyBookings.reduce((sum, b) => sum + (b.commission_earned || 0), 0);
      const monthlyTotal = completedBookings.reduce((sum, b) => sum + (b.commission_earned || 0), 0);
      const totalBookings = completedBookings.length;
      const averagePerBooking = totalBookings > 0 ? monthlyTotal / totalBookings : 0;

      // Prepare chart data
      const dailyEarnings = completedBookings.reduce((acc, booking) => {
        const date = format(new Date(booking.created_at), 'MMM d');
        acc[date] = (acc[date] || 0) + (booking.commission_earned || 0);
        return acc;
      }, {} as Record<string, number>);

      const chartData = Object.entries(dailyEarnings).map(([date, amount]) => ({
        date,
        amount
      }));

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
