
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { isSameDay, isAfter, isBefore, addDays } from "date-fns";

export type BookingStatus = 'all' | 'pending' | 'accepted' | 'completed' | 'cancelled' | 'declined';
export type ClientType = 'all' | 'new' | 'returning';
export type DateFilter = 'all' | 'today' | 'tomorrow' | 'thisWeek' | 'custom';

export interface BookingFilters {
  status: BookingStatus;
  dateFilter: DateFilter;
  dateRange: DateRange;
  clientType: ClientType;
  serviceType: string;
  search: string;
  serviceTypes: string[];
}

export const useBookingFilters = (initialBookings: any[] = []) => {
  const [statusFilter, setStatusFilter] = useState<BookingStatus>("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const resetFilters = () => {
    setStatusFilter("all");
    setDateRange({ from: undefined, to: undefined });
    setSearchTerm("");
  };

  const filteredBookings = initialBookings.filter((booking) => {
    // Status filter
    if (statusFilter !== "all" && booking.status !== statusFilter) {
      return false;
    }

    // Date range filter
    if (dateRange.from && booking.date) {
      const bookingDate = new Date(booking.date);
      
      if (dateRange.to) {
        // If both from and to dates are set, check if booking date is in range
        if (
          !isAfter(bookingDate, addDays(dateRange.from, -1)) ||
          !isBefore(bookingDate, addDays(dateRange.to, 1))
        ) {
          return false;
        }
      } else {
        // If only from date is set, check if booking date is after from date
        if (!isSameDay(bookingDate, dateRange.from)) {
          return false;
        }
      }
    }

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const clientNameMatch = booking.clientName?.toLowerCase().includes(searchLower);
      const serviceNameMatch = booking.serviceName?.toLowerCase().includes(searchLower);
      const notesMatch = booking.notes?.toLowerCase().includes(searchLower);
      
      if (!clientNameMatch && !serviceNameMatch && !notesMatch) {
        return false;
      }
    }

    return true;
  });

  return {
    statusFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
    searchTerm,
    setSearchTerm,
    filteredBookings,
    resetFilters,
  };
};
