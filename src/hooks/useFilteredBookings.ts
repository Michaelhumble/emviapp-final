
import { useState, useEffect } from 'react';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';
import { BookingFilters } from './useBookingFilters';
import { Booking } from '@/components/dashboard/artist/types/ArtistDashboardTypes';

export const useFilteredBookings = (
  bookings: Booking[],
  filters: BookingFilters
) => {
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookings);
  
  useEffect(() => {
    let result = [...bookings];
    
    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(booking => booking.status === filters.status);
    }
    
    // Filter by date
    if (filters.dateFilter !== 'all') {
      const now = new Date();
      let startDate: Date;
      let endDate: Date;
      
      switch (filters.dateFilter) {
        case 'today':
          startDate = startOfDay(now);
          endDate = endOfDay(now);
          break;
        case 'this_week':
          startDate = startOfWeek(now, { weekStartsOn: 1 });
          endDate = endOfWeek(now, { weekStartsOn: 1 });
          break;
        case 'this_month':
          startDate = startOfMonth(now);
          endDate = endOfMonth(now);
          break;
        case 'custom':
          if (filters.dateRange.from && filters.dateRange.to) {
            startDate = startOfDay(filters.dateRange.from);
            endDate = endOfDay(filters.dateRange.to);
          } else {
            // Skip date filtering if custom range is incomplete
            startDate = new Date(0);
            endDate = new Date(8640000000000000); // Max date
          }
          break;
        default:
          startDate = new Date(0);
          endDate = new Date(8640000000000000); // Max date
      }
      
      result = result.filter(booking => {
        try {
          const bookingDate = parseISO(booking.date_requested);
          return isWithinInterval(bookingDate, { start: startDate, end: endDate });
        } catch (e) {
          // In case of parsing errors, keep the booking
          return true;
        }
      });
    }
    
    // Filter by client type
    if (filters.clientType !== 'all') {
      // This requires a way to determine if a client is new or returning
      // For now, we'll just check if this is their first booking in the list
      const customerBookingCounts = bookings.reduce((counts, booking) => {
        counts[booking.sender_id] = (counts[booking.sender_id] || 0) + 1;
        return counts;
      }, {} as Record<string, number>);
      
      if (filters.clientType === 'new') {
        result = result.filter(booking => customerBookingCounts[booking.sender_id] === 1);
      } else if (filters.clientType === 'returning') {
        result = result.filter(booking => customerBookingCounts[booking.sender_id] > 1);
      }
    }
    
    // Filter by service type
    if (filters.serviceType !== 'all') {
      result = result.filter(booking => booking.service_id === filters.serviceType);
    }
    
    // Filter by search term
    if (filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase().trim();
      result = result.filter(booking => {
        // Search by customer name
        const customerNameMatch = booking.customer_name?.toLowerCase().includes(searchTerm);
        // Search by service name
        const serviceNameMatch = booking.service_name?.toLowerCase().includes(searchTerm);
        // Search by note
        const noteMatch = booking.note?.toLowerCase().includes(searchTerm);
        // Search by artist name if available
        const artistNameMatch = booking.artist_name?.toLowerCase().includes(searchTerm);
        
        return customerNameMatch || serviceNameMatch || noteMatch || artistNameMatch;
      });
    }
    
    setFilteredBookings(result);
  }, [bookings, filters]);
  
  return filteredBookings;
};
