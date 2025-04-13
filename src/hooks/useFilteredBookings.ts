
import { useMemo } from "react";
import { BookingFilters } from "./useBookingFilters";
import { isSameDay, isAfter, isBefore, addDays, startOfDay, endOfDay, addWeeks } from "date-fns";

/**
 * Filters an array of bookings based on the provided filters
 */
export const useFilteredBookings = (
  bookings: any[], 
  filters: BookingFilters
) => {
  return useMemo(() => {
    return bookings.filter(booking => {
      // Filter by status
      if (filters.status !== 'all' && booking.status !== filters.status) {
        return false;
      }

      // Filter by service type
      if (filters.serviceType !== 'all' && booking.serviceName !== filters.serviceType) {
        return false;
      }

      // Filter by date
      if (filters.dateFilter !== 'all') {
        const bookingDate = booking.date instanceof Date 
          ? booking.date 
          : booking.date ? new Date(booking.date) : null;
        
        if (!bookingDate) return false;

        const today = startOfDay(new Date());
        
        if (filters.dateFilter === 'today' && !isSameDay(bookingDate, today)) {
          return false;
        }
        
        if (filters.dateFilter === 'tomorrow') {
          const tomorrow = addDays(today, 1);
          if (!isSameDay(bookingDate, tomorrow)) return false;
        }
        
        if (filters.dateFilter === 'thisWeek') {
          const weekLater = addWeeks(today, 1);
          if (!isAfter(bookingDate, addDays(today, -1)) || !isBefore(bookingDate, weekLater)) {
            return false;
          }
        }
        
        if (filters.dateFilter === 'custom' && filters.dateRange.from) {
          const fromDate = startOfDay(filters.dateRange.from);
          
          if (filters.dateRange.to) {
            const toDate = endOfDay(filters.dateRange.to);
            if (!isAfter(bookingDate, addDays(fromDate, -1)) || !isBefore(bookingDate, addDays(toDate, 1))) {
              return false;
            }
          } else {
            if (!isSameDay(bookingDate, fromDate)) {
              return false;
            }
          }
        }
      }

      // Filter by search term
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        
        // Search in client name
        const clientNameMatch = 
          booking.clientName?.toLowerCase().includes(searchLower) ||
          booking.clientPhone?.toLowerCase().includes(searchLower) ||
          booking.clientEmail?.toLowerCase().includes(searchLower);
        
        // Search in service name
        const serviceMatch = booking.serviceName?.toLowerCase().includes(searchLower);
        
        // Search in notes
        const notesMatch = booking.notes?.toLowerCase().includes(searchLower);
        
        // Return false if no matches
        if (!clientNameMatch && !serviceMatch && !notesMatch) {
          return false;
        }
      }

      // If all filters pass, include this booking
      return true;
    });
  }, [bookings, filters]);
};
