
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

// Type definitions for the dashboard data
export type SalonData = {
  id: string;
  salon_name: string;
  location?: string;
  logo_url?: string;
  created_at: string;
};

export type JobData = {
  id: string;
  title: string;
  location?: string;
  created_at: string;
  status: string;
  applicationCount?: number;
};

export type SalonListing = {
  id: string;
  salon_name: string;
  city: string;
  state: string;
  asking_price: number;
  created_at: string;
  status: string;
  is_featured: boolean;
  photos?: { id: string; photo_url: string }[];
};

export type StaffMember = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  specialty?: string;
  avatar_url?: string;
  commission_rate?: number;
  booking_count: number;
  total_revenue: number;
  average_booking: number;
};

export type BookingAnalytics = {
  totalBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  periodComparison: {
    percentChange: number;
    previousPeriodBookings: number;
  };
};

export type CreditTransaction = {
  id: string;
  action: string;
  date: Date;
  creditsUsed: number;
  result: string;
};

export type OwnerDashboardData = {
  salons: SalonData[];
  currentSalon: SalonData | null;
  jobs: JobData[];
  listings: SalonListing[];
  staff: StaffMember[];
  bookingAnalytics: BookingAnalytics;
  creditTransactions: CreditTransaction[];
  isLoading: boolean;
  error: Error | null;
  selectSalon: (salonId: string) => void;
  refetchAllData: () => Promise<void>;
  dateRangeFilter: string;
  setDateRangeFilter: (range: string) => void;
};

// Define date range options
type DateRangeOption = "last7Days" | "last30Days" | "thisMonth" | "lastMonth" | "thisYear";

// Custom hook for the Salon Owner Dashboard data
export function useOwnerDashboardData(): OwnerDashboardData {
  const { user } = useAuth();
  const [currentSalonId, setCurrentSalonId] = useState<string | null>(null);
  const [dateRangeFilter, setDateRangeFilter] = useState<string>("last30Days");

  // Function to get date range based on selected filter
  const getDateRange = (rangeOption: string): { start: Date; end: Date } => {
    const endDate = new Date();
    let startDate = new Date();
    
    switch (rangeOption) {
      case "last7Days":
        startDate.setDate(endDate.getDate() - 7);
        break;
      case "last30Days":
        startDate.setDate(endDate.getDate() - 30);
        break;
      case "thisMonth":
        startDate = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
        break;
      case "lastMonth":
        startDate = new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1);
        endDate.setDate(0); // Last day of previous month
        break;
      case "thisYear":
        startDate = new Date(endDate.getFullYear(), 0, 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 30); // Default to last 30 days
    }
    
    return { start: startDate, end: endDate };
  };

  // Query to fetch salons
  const salonsQuery = useQuery({
    queryKey: ["owner-salons", user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from("salons")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      const salons = data as SalonData[];
      
      // Set current salon if not already set
      if (salons.length > 0 && !currentSalonId) {
        // Try to get the last selected salon from localStorage
        const savedSalonId = localStorage.getItem("selected_salon_id");
        const targetSalon = savedSalonId 
          ? salons.find(s => s.id === savedSalonId) 
          : salons[0];
        
        if (targetSalon) {
          setCurrentSalonId(targetSalon.id);
        }
      }
      
      return salons;
    },
    enabled: !!user?.id,
  });

  // Query to fetch jobs for the current salon
  const jobsQuery = useQuery({
    queryKey: ["salon-jobs", currentSalonId],
    queryFn: async () => {
      if (!currentSalonId) return [];
      
      // Get jobs
      const { data: jobs, error: jobsError } = await supabase
        .from("jobs")
        .select("*")
        .eq("salon_id", currentSalonId)
        .order("created_at", { ascending: false });
        
      if (jobsError) throw jobsError;
      
      // For each job, count applications
      const jobsWithApplications = await Promise.all(
        (jobs || []).map(async (job) => {
          const { count, error: countError } = await supabase
            .from("job_applications")
            .select("*", { count: "exact", head: true })
            .eq("job_id", job.id);
            
          return {
            ...job,
            applicationCount: count || 0
          };
        })
      );
      
      return jobsWithApplications as JobData[];
    },
    enabled: !!currentSalonId,
  });

  // Query to fetch salon listings
  const listingsQuery = useQuery({
    queryKey: ["salon-listings", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("salon_sales")
        .select("*, photos:salon_sale_photos(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      return (data || []) as SalonListing[];
    },
    enabled: !!user?.id,
  });

  // Query to fetch staff for the current salon
  const staffQuery = useQuery({
    queryKey: ["salon-staff", currentSalonId, dateRangeFilter],
    queryFn: async () => {
      if (!currentSalonId) return [];
      
      const { start, end } = getDateRange(dateRangeFilter);
      
      // Get staff members
      const { data: staff, error: staffError } = await supabase
        .from("salon_staff")
        .select("*")
        .eq("salon_id", currentSalonId)
        .eq("status", "active");
        
      if (staffError) throw staffError;
      
      // For each staff member, get booking analytics
      const staffWithAnalytics = await Promise.all(
        (staff || []).map(async (staffMember) => {
          // Find user with matching email
          const { data: userData } = await supabase
            .from("users")
            .select("id")
            .eq("email", staffMember.email)
            .single();
            
          if (!userData?.id) {
            return {
              ...staffMember,
              booking_count: 0,
              total_revenue: 0,
              average_booking: 0
            };
          }
          
          // Get completed bookings in date range
          const { data: bookings } = await supabase
            .from("completed_bookings")
            .select("service_price")
            .eq("artist_id", userData.id)
            .eq("salon_id", currentSalonId)
            .gte("completed_at", start.toISOString())
            .lte("completed_at", end.toISOString());
            
          const booking_count = bookings?.length || 0;
          const total_revenue = bookings?.reduce((sum, booking) => sum + Number(booking.service_price), 0) || 0;
          const average_booking = booking_count > 0 ? total_revenue / booking_count : 0;
          
          return {
            ...staffMember,
            booking_count,
            total_revenue,
            average_booking
          };
        })
      );
      
      return staffWithAnalytics as StaffMember[];
    },
    enabled: !!currentSalonId,
  });

  // Query to fetch booking analytics
  const bookingAnalyticsQuery = useQuery({
    queryKey: ["booking-analytics", currentSalonId, dateRangeFilter],
    queryFn: async () => {
      if (!currentSalonId) {
        return {
          totalBookings: 0,
          completedBookings: 0,
          cancelledBookings: 0,
          pendingBookings: 0,
          totalRevenue: 0,
          periodComparison: {
            percentChange: 0,
            previousPeriodBookings: 0
          }
        };
      }
      
      const { start, end } = getDateRange(dateRangeFilter);
      
      // Calculate previous period
      const periodLength = end.getTime() - start.getTime();
      const previousStart = new Date(start.getTime() - periodLength);
      const previousEnd = new Date(end.getTime() - periodLength);
      
      // Get completed bookings for current period
      const { data: currentCompletedBookings, error: completedError } = await supabase
        .from("completed_bookings")
        .select("service_price")
        .eq("salon_id", currentSalonId)
        .gte("completed_at", start.toISOString())
        .lte("completed_at", end.toISOString());
        
      if (completedError) throw completedError;
      
      // Get completed bookings for previous period
      const { data: previousBookings } = await supabase
        .from("completed_bookings")
        .select("id")
        .eq("salon_id", currentSalonId)
        .gte("completed_at", previousStart.toISOString())
        .lte("completed_at", previousEnd.toISOString());
        
      // Get booking statistics
      const { data: bookingStats, error: statsError } = await supabase
        .from("bookings")
        .select("id, status")
        .eq("recipient_id", currentSalonId)
        .gte("created_at", start.toISOString())
        .lte("created_at", end.toISOString());
        
      if (statsError) throw statsError;
      
      const totalBookings = bookingStats?.length || 0;
      const pendingBookings = bookingStats?.filter(b => b.status === "pending").length || 0;
      const cancelledBookings = bookingStats?.filter(b => b.status === "cancelled" || b.status === "declined").length || 0;
      const completedBookingsCount = currentCompletedBookings?.length || 0;
      const totalRevenue = currentCompletedBookings?.reduce((sum, booking) => sum + Number(booking.service_price), 0) || 0;
      
      const previousPeriodBookings = previousBookings?.length || 0;
      let percentChange = 0;
      
      if (previousPeriodBookings > 0) {
        percentChange = ((completedBookingsCount - previousPeriodBookings) / previousPeriodBookings) * 100;
      }
      
      return {
        totalBookings,
        completedBookings: completedBookingsCount,
        cancelledBookings,
        pendingBookings,
        totalRevenue,
        periodComparison: {
          percentChange,
          previousPeriodBookings
        }
      };
    },
    enabled: !!currentSalonId,
  });

  // Query to fetch credit transactions
  const creditTransactionsQuery = useQuery({
    queryKey: ["credit-transactions", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      const { data, error } = await supabase
        .from("customer_credits")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
        
      if (error) throw error;
      
      // Transform the data
      return (data || []).map(item => ({
        id: item.id,
        action: item.action_type || "Unknown Action",
        date: new Date(item.created_at),
        creditsUsed: Math.abs(item.value),
        result: item.description || (item.value > 0 ? "Credits earned" : "Credits spent")
      })) as CreditTransaction[];
    },
    enabled: !!user?.id,
  });

  // Combine all data
  const isLoading = 
    salonsQuery.isLoading || 
    jobsQuery.isLoading || 
    listingsQuery.isLoading || 
    staffQuery.isLoading || 
    bookingAnalyticsQuery.isLoading || 
    creditTransactionsQuery.isLoading;
    
  const error = 
    salonsQuery.error || 
    jobsQuery.error || 
    listingsQuery.error || 
    staffQuery.error || 
    bookingAnalyticsQuery.error || 
    creditTransactionsQuery.error;

  // Function to select a salon
  const selectSalon = (salonId: string) => {
    setCurrentSalonId(salonId);
    localStorage.setItem("selected_salon_id", salonId);
  };

  // Function to refetch all data
  const refetchAllData = async () => {
    try {
      await Promise.all([
        salonsQuery.refetch(),
        jobsQuery.refetch(),
        listingsQuery.refetch(),
        staffQuery.refetch(),
        bookingAnalyticsQuery.refetch(),
        creditTransactionsQuery.refetch()
      ]);
      toast.success("Dashboard data refreshed");
    } catch (err) {
      console.error("Error refreshing dashboard data:", err);
      toast.error("Failed to refresh dashboard data");
    }
  };

  // Find current salon object
  const currentSalon = currentSalonId 
    ? salonsQuery.data?.find(salon => salon.id === currentSalonId) || null
    : salonsQuery.data?.[0] || null;

  return {
    salons: salonsQuery.data || [],
    currentSalon,
    jobs: jobsQuery.data || [],
    listings: listingsQuery.data || [],
    staff: staffQuery.data || [],
    bookingAnalytics: bookingAnalyticsQuery.data || {
      totalBookings: 0,
      completedBookings: 0,
      cancelledBookings: 0,
      pendingBookings: 0,
      totalRevenue: 0,
      periodComparison: {
        percentChange: 0,
        previousPeriodBookings: 0
      }
    },
    creditTransactions: creditTransactionsQuery.data || [],
    isLoading,
    error: error as Error | null,
    selectSalon,
    refetchAllData,
    dateRangeFilter,
    setDateRangeFilter
  };
}
