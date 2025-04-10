
import { useState, useEffect } from 'react';
import { BookingStatus, DateRange, Booking } from '../types';
import { startOfDay, endOfDay, addDays, isAfter, isBefore } from 'date-fns';

export const useBookingFilters = (bookings: Booking[]) => {
  // Filter states
  const [statusFilter, setStatusFilter] = useState<BookingStatus>("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: startOfDay(new Date()),
    to: endOfDay(addDays(new Date(), 30)),
  });
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    const applyFilters = () => {
      let result = [...bookings];
      
      if (statusFilter !== "all") {
        result = result.filter(booking => booking.status === statusFilter);
      }
      
      if (dateRange.from || dateRange.to) {
        result = result.filter(booking => {
          if (!booking.date) return false;
          
          const bookingDate = startOfDay(booking.date);
          
          const afterFrom = !dateRange.from || isAfter(bookingDate, startOfDay(dateRange.from)) || 
            bookingDate.getTime() === startOfDay(dateRange.from).getTime();
            
          const beforeTo = !dateRange.to || isBefore(bookingDate, endOfDay(dateRange.to)) || 
            bookingDate.getTime() === startOfDay(dateRange.to).getTime();
          
          return afterFrom && beforeTo;
        });
      }
      
      setFilteredBookings(result);
    };
    
    applyFilters();
  }, [bookings, statusFilter, dateRange]);
  
  const resetFilters = () => {
    setStatusFilter("all");
    setDateRange({
      from: startOfDay(new Date()),
      to: endOfDay(addDays(new Date(), 30)),
    });
  };
  
  return {
    statusFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
    filteredBookings,
    resetFilters
  };
};
