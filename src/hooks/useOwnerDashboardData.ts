
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

export interface DashboardStats {
  totalRevenue: number;
  newCustomers: number;
  totalBookings: number;
  averageRating: number;
}

export interface BookingAnalytics {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  periodComparison: {
    percentChange: number;
    previousPeriodBookings: number;
  };
}

export interface StaffMember {
  id: string;
  full_name: string;
  role: string;
  avatar_url: string;
  booking_count: number;
  total_revenue: number;
  average_booking: number;
  commission_rate: number;
}

export interface JobData {
  id: string;
  title: string;
  location: string;
  status: string;
  applicationCount: number;
  created_at: string;
}

export interface SalonListing {
  id: string;
  salon_name: string;
  city: string;
  state: string;
  asking_price: number;
  status: string;
  is_featured: boolean;
  created_at: string;
  photos: Array<{
    id: string;
    photo_url: string;
  }>;
}

export interface SalonData {
  id: string;
  name: string;
  location: string;
  staffCount: number;
  isActive: boolean;
}

export interface CreditTransaction {
  id: string;
  action: string;
  date: Date;
  creditsUsed: number;
  result: string;
}

export function useOwnerDashboardData() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    newCustomers: 0,
    totalBookings: 0,
    averageRating: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [dateRangeFilter, setDateRangeFilter] = useState('week');
  
  // Mock data for salon owner dashboard to resolve TypeScript errors
  const [salons, setSalons] = useState<SalonData[]>([]);
  const [currentSalon, setCurrentSalon] = useState<SalonData | null>(null);
  const [jobs, setJobs] = useState<JobData[]>([]);
  const [listings, setListings] = useState<SalonListing[]>([]);
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [bookingAnalytics, setBookingAnalytics] = useState<BookingAnalytics>({
    totalBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    periodComparison: {
      percentChange: 0,
      previousPeriodBookings: 0,
    }
  });
  const [creditTransactions, setCreditTransactions] = useState<CreditTransaction[]>([]);

  useEffect(() => {
    if (user) {
      fetchDashboardData(dateRangeFilter); // Default period
    } else {
      setIsLoading(false);
    }
  }, [user, dateRangeFilter]);

  const getDateRange = (period: string) => {
    let start = new Date();
    const end = new Date();

    switch (period) {
      case 'week':
        start.setDate(start.getDate() - 7);
        break;
      case 'month':
        start.setMonth(start.getMonth() - 1);
        break;
      case 'year':
        start.setFullYear(start.getFullYear() - 1);
        break;
      default:
        start.setDate(start.getDate() - 7); // Default to week
    }

    return { start, end };
  };

  const fetchDashboardData = async (period: string) => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const { start, end } = getDateRange(period);

      // Fetch total revenue from bookings table by joining with services
      const { data: bookingsWithServices, error: revenueError } = await supabase
        .from('bookings')
        .select(`
          id,
          services:service_id (
            price
          )
        `)
        .eq('recipient_id', user.id)
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());

      if (revenueError) throw new Error(revenueError.message);

      // Calculate total revenue from the services prices
      const totalRevenue = bookingsWithServices?.reduce((sum, booking) => {
        return sum + (booking.services?.price || 0);
      }, 0) || 0;

      // Fetch new customers
      const { data: customerData, error: customerError } = await supabase
        .from('users')
        .select('id')
        .eq('role', 'customer')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());

      if (customerError) throw new Error(customerError.message);

      const newCustomers = customerData?.length || 0;

      // Fetch total bookings
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .select('id')
        .eq('recipient_id', user.id)
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());

      if (bookingError) throw new Error(bookingError.message);

      const totalBookings = bookingData?.length || 0;

      // Fetch average rating (this is a placeholder, you'll need to adapt it to your data structure)
      const averageRating = 4.5; // Replace with actual data fetching

      // Set the dashboard statistics
      setStats({
        totalRevenue,
        newCustomers,
        totalBookings,
        averageRating,
      });
      
      // Fetch salon data
      await fetchSalonData(user.id);
      
      // Fetch booking analytics
      await fetchBookingAnalytics(start, end, user.id);
      
      // Fetch staff data
      await fetchStaffData(user.id);
      
      // Fetch jobs and listings
      await fetchJobsAndListings(user.id);
      
      // Fetch credit transactions
      await fetchCreditTransactions(user.id);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Mock implementation of additional data fetching methods
  const fetchSalonData = async (userId: string) => {
    // Mock implementation
    setSalons([{
      id: '1',
      name: 'My Salon',
      location: 'New York, NY',
      staffCount: 5,
      isActive: true
    }]);
    setCurrentSalon({
      id: '1',
      name: 'My Salon',
      location: 'New York, NY',
      staffCount: 5,
      isActive: true
    });
  };
  
  const fetchBookingAnalytics = async (start: Date, end: Date, userId: string) => {
    // Mock implementation
    setBookingAnalytics({
      totalBookings: stats.totalBookings,
      completedBookings: Math.floor(stats.totalBookings * 0.7),
      cancelledBookings: Math.floor(stats.totalBookings * 0.1),
      pendingBookings: Math.floor(stats.totalBookings * 0.2),
      totalRevenue: stats.totalRevenue,
      periodComparison: {
        percentChange: 12.5,
        previousPeriodBookings: Math.floor(stats.totalBookings * 0.8)
      }
    });
  };
  
  const fetchStaffData = async (userId: string) => {
    // Mock implementation
    setStaff([
      {
        id: '1',
        full_name: 'Jane Smith',
        role: 'Nail Technician',
        avatar_url: '',
        booking_count: 24,
        total_revenue: 2400,
        average_booking: 100,
        commission_rate: 60
      },
      {
        id: '2',
        full_name: 'Bob Johnson',
        role: 'Hair Stylist',
        avatar_url: '',
        booking_count: 18,
        total_revenue: 1800,
        average_booking: 100,
        commission_rate: 60
      }
    ]);
  };
  
  const fetchJobsAndListings = async (userId: string) => {
    // Mock implementation
    setJobs([
      {
        id: '1',
        title: 'Nail Technician',
        location: 'New York, NY',
        status: 'active',
        applicationCount: 5,
        created_at: new Date().toISOString()
      }
    ]);
    
    setListings([
      {
        id: '1',
        salon_name: 'Beauty Salon For Sale',
        city: 'Los Angeles',
        state: 'CA',
        asking_price: 150000,
        status: 'active',
        is_featured: true,
        created_at: new Date().toISOString(),
        photos: [
          {
            id: '1',
            photo_url: ''
          }
        ]
      }
    ]);
  };
  
  const fetchCreditTransactions = async (userId: string) => {
    // Mock implementation
    setCreditTransactions([
      {
        id: '1',
        action: 'Purchase Premium Listing',
        date: new Date(),
        creditsUsed: 50,
        result: 'Success'
      },
      {
        id: '2',
        action: 'Boost Job Posting',
        date: new Date(Date.now() - 86400000), // Yesterday
        creditsUsed: 25,
        result: 'Success'
      }
    ]);
  };
  
  const selectSalon = (salonId: string) => {
    const selected = salons.find(salon => salon.id === salonId) || null;
    setCurrentSalon(selected);
  };
  
  const refetchAllData = () => {
    fetchDashboardData(dateRangeFilter);
  };

  return {
    stats,
    isLoading,
    error,
    fetchDashboardData,
    salons,
    currentSalon,
    jobs,
    listings,
    staff,
    bookingAnalytics,
    creditTransactions,
    selectSalon,
    refetchAllData,
    dateRangeFilter,
    setDateRangeFilter
  };
}
