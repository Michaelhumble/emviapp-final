
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export type BookingViewType = 'day' | 'week' | 'month';

export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  service_id: string | null;
  status: string;
  date_requested: string | null;
  time_requested: string | null;
  note: string | null;
  created_at: string;
  service_title?: string;
  service_price?: number;
  client_name?: string;
}

export interface BookingFilters {
  status?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export function useArtistBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [viewType, setViewType] = useState<BookingViewType>('week');
  const [filters, setFilters] = useState<BookingFilters>({});
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      setIsLoading(false);
    }
  }, [user, viewType, filters, selectedDate]);

  const fetchBookings = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      // First, fetch the bookings
      let query = supabase
        .from('bookings')
        .select('*')
        .eq('recipient_id', user.id);

      // Apply status filter if provided
      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      // Apply date filters based on the view type and selected date
      if (filters.dateRange) {
        query = query
          .gte('date_requested', filters.dateRange.start.toISOString().split('T')[0])
          .lte('date_requested', filters.dateRange.end.toISOString().split('T')[0]);
      } else {
        // If no custom date range, use viewType to determine range
        const { start, end } = getDateRangeFromViewType(viewType, selectedDate);
        query = query
          .gte('date_requested', start.toISOString().split('T')[0])
          .lte('date_requested', end.toISOString().split('T')[0]);
      }

      // Order by date and time
      query = query.order('date_requested', { ascending: true });

      const { data: bookingsData, error: bookingsError } = await query;

      if (bookingsError) throw new Error(bookingsError.message);

      // Process bookings to include service and client information
      const processedBookings: Booking[] = [];
      
      for (const booking of bookingsData || []) {
        // Fetch service details if service_id is available
        let serviceTitle = 'Unknown Service';
        let servicePrice = 0;
        
        if (booking.service_id) {
          const { data: serviceData, error: serviceError } = await supabase
            .from('services')
            .select('title, price')
            .eq('id', booking.service_id)
            .single();
            
          if (!serviceError && serviceData) {
            serviceTitle = serviceData.title;
            servicePrice = serviceData.price;
          }
        }
        
        // Fetch client name if sender_id is available
        let clientName = 'Unknown Client';
        
        if (booking.sender_id) {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('full_name')
            .eq('id', booking.sender_id)
            .single();
            
          if (!userError && userData) {
            clientName = userData.full_name;
          }
        }
        
        // Create the processed booking with all information
        processedBookings.push({
          ...booking,
          service_title: serviceTitle,
          service_price: servicePrice,
          client_name: clientName
        });
      }

      setBookings(processedBookings);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch bookings'));
      toast.error('Failed to load your bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const getDateRangeFromViewType = (viewType: BookingViewType, baseDate: Date): { start: Date, end: Date } => {
    const start = new Date(baseDate);
    const end = new Date(baseDate);

    switch (viewType) {
      case 'day':
        // Just the selected day
        return { start, end };
      
      case 'week':
        // Start from Sunday of the current week
        const day = start.getDay();
        start.setDate(start.getDate() - day);
        
        // End on Saturday
        end.setDate(start.getDate() + 6);
        return { start, end };
      
      case 'month':
        // Start from the 1st day of the month
        start.setDate(1);
        
        // End on the last day of the month
        end.setMonth(end.getMonth() + 1);
        end.setDate(0);
        return { start, end };
        
      default:
        return { start, end };
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId)
        .eq('recipient_id', user.id);

      if (error) throw new Error(error.message);

      // Update local state
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId ? { ...booking, status } : booking
      ));
      
      toast.success(`Booking ${status}`);
      return true;
    } catch (err) {
      console.error(`Error updating booking status:`, err);
      toast.error('Failed to update booking');
      return false;
    }
  };

  return {
    bookings,
    isLoading,
    error,
    viewType,
    setViewType,
    filters,
    setFilters,
    selectedDate,
    setSelectedDate,
    fetchBookings,
    updateBookingStatus,
  };
}
