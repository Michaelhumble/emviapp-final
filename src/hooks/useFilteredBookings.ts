
import { useState, useEffect } from 'react';
import { 
  startOfDay, 
  endOfDay, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  isWithinInterval, 
  parseISO 
} from 'date-fns';
import { BookingFilters } from './useBookingFilters';
import { Booking } from '@/components/dashboard/artist/types/ArtistDashboardTypes';

/**
 * Filter bookings by status criteria
 */
const filterByStatus = (bookings: Booking[], status: string): Booking[] => {
  if (status === 'all') return bookings;
  return bookings.filter(booking => booking.status === status);
};

/**
 * Get date range based on date filter type
 */
const getDateRange = (dateFilter: string, dateRangeFrom?: Date, dateRangeTo?: Date): { start: Date, end: Date } => {
  const now = new Date();
  
  switch (dateFilter) {
    case 'today':
      return {
        start: startOfDay(now),
        end: endOfDay(now)
      };
    case 'this_week':
      return {
        start: startOfWeek(now, { weekStartsOn: 1 }),
        end: endOfWeek(now, { weekStartsOn: 1 })
      };
    case 'this_month':
      return {
        start: startOfMonth(now),
        end: endOfMonth(now)
      };
    case 'custom':
      if (dateRangeFrom && dateRangeTo) {
        return {
          start: startOfDay(dateRangeFrom),
          end: endOfDay(dateRangeTo)
        };
      }
      // Fall through to default if incomplete custom range
    default:
      return {
        start: new Date(0), // Minimum date
        end: new Date(8640000000000000) // Maximum date
      };
  }
};

/**
 * Filter bookings by date criteria
 */
const filterByDate = (bookings: Booking[], dateFilter: string, dateRangeFrom?: Date, dateRangeTo?: Date): Booking[] => {
  if (dateFilter === 'all') return bookings;
  
  const { start, end } = getDateRange(dateFilter, dateRangeFrom, dateRangeTo);
  
  return bookings.filter(booking => {
    try {
      const bookingDate = parseISO(booking.date_requested);
      return isWithinInterval(bookingDate, { start, end });
    } catch (e) {
      console.error('Error parsing booking date:', e);
      return true; // Keep bookings with invalid dates
    }
  });
};

/**
 * Calculate customer booking counts to determine if new or returning
 */
const calculateCustomerBookingCounts = (bookings: Booking[]): Record<string, number> => {
  return bookings.reduce((counts, booking) => {
    counts[booking.sender_id] = (counts[booking.sender_id] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
};

/**
 * Filter bookings by client type (new or returning)
 */
const filterByClientType = (bookings: Booking[], clientType: string, customerBookingCounts: Record<string, number>): Booking[] => {
  if (clientType === 'all') return bookings;
  
  if (clientType === 'new') {
    return bookings.filter(booking => customerBookingCounts[booking.sender_id] === 1);
  } else if (clientType === 'returning') {
    return bookings.filter(booking => customerBookingCounts[booking.sender_id] > 1);
  }
  
  return bookings;
};

/**
 * Filter bookings by service type
 */
const filterByServiceType = (bookings: Booking[], serviceType: string): Booking[] => {
  if (serviceType === 'all') return bookings;
  return bookings.filter(booking => booking.service_id === serviceType);
};

/**
 * Filter bookings by search term across multiple fields
 */
const filterBySearchTerm = (bookings: Booking[], searchTerm: string): Booking[] => {
  if (!searchTerm.trim()) return bookings;
  
  const term = searchTerm.toLowerCase().trim();
  
  return bookings.filter(booking => {
    // Search by customer name
    const customerNameMatch = booking.customer_name?.toLowerCase().includes(term);
    // Search by service name
    const serviceNameMatch = booking.service_name?.toLowerCase().includes(term);
    // Search by note
    const noteMatch = booking.note?.toLowerCase().includes(term);
    // Search by artist name if available
    const artistNameMatch = booking.artist_name?.toLowerCase().includes(term);
    
    return customerNameMatch || serviceNameMatch || noteMatch || artistNameMatch;
  });
};

/**
 * Hook that filters bookings based on the provided filters
 */
export const useFilteredBookings = (
  bookings: Booking[],
  filters: BookingFilters
) => {
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookings);
  
  useEffect(() => {
    // Start with all bookings
    let result = [...bookings];
    
    // Apply each filter sequentially
    result = filterByStatus(result, filters.status);
    
    result = filterByDate(
      result, 
      filters.dateFilter, 
      filters.dateRange.from, 
      filters.dateRange.to
    );
    
    // Calculate customer booking counts once
    const customerBookingCounts = calculateCustomerBookingCounts(bookings);
    
    result = filterByClientType(result, filters.clientType, customerBookingCounts);
    result = filterByServiceType(result, filters.serviceType);
    result = filterBySearchTerm(result, filters.search);
    
    setFilteredBookings(result);
  }, [bookings, filters]);
  
  return filteredBookings;
};
