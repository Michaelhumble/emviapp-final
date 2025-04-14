
import { useState, useEffect } from 'react';
import { Booking } from '@/components/dashboard/artist/hooks/useArtistBookings';

export interface DateRange {
  from?: Date;
  to?: Date;
}

export type BookingStatus = 'all' | 'pending' | 'accepted' | 'completed' | 'declined' | 'cancelled';
export type DateFilter = 'all' | 'today' | 'this-week' | 'this-month' | 'custom';
export type ClientType = 'all' | 'new' | 'returning';
export type ServiceTypeFilter = 'all' | string;

export interface BookingFilters {
  status: BookingStatus;
  dateFilter: DateFilter;
  dateRange: DateRange;
  clientType: ClientType;
  serviceType: ServiceTypeFilter;
  search: string;
  serviceTypes: string[];
}

export const useBookingFilters = (initialFilters?: Partial<BookingFilters>) => {
  const [filters, setFilters] = useState<BookingFilters>({
    status: 'all',
    dateFilter: 'all',
    dateRange: { from: undefined, to: undefined },
    clientType: 'all',
    serviceType: 'all',
    search: '',
    serviceTypes: [],
    ...initialFilters,
  });
  
  const updateFilter = <K extends keyof BookingFilters>(
    key: K, 
    value: BookingFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const resetFilters = () => {
    setFilters({
      status: 'all',
      dateFilter: 'all',
      dateRange: { from: undefined, to: undefined },
      clientType: 'all',
      serviceType: 'all',
      search: '',
      serviceTypes: filters.serviceTypes,
    });
  };
  
  return {
    filters,
    updateFilter,
    resetFilters,
    setFilters,
  };
};

export const useFilteredBookings = (
  bookings: Booking[],
  filters: BookingFilters
): Booking[] => {
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookings);
  
  useEffect(() => {
    let result = [...bookings];
    
    // Filter by status
    if (filters.status !== 'all') {
      result = result.filter(booking => booking.status === filters.status);
    }
    
    // Filter by date
    if (filters.dateFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (filters.dateFilter === 'today') {
        result = result.filter(booking => {
          const bookingDate = new Date(booking.date_requested || booking.created_at);
          bookingDate.setHours(0, 0, 0, 0);
          return bookingDate.getTime() === today.getTime();
        });
      } else if (filters.dateFilter === 'this-week') {
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - today.getDay());
        
        result = result.filter(booking => {
          const bookingDate = new Date(booking.date_requested || booking.created_at);
          return bookingDate >= weekStart;
        });
      } else if (filters.dateFilter === 'this-month') {
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        
        result = result.filter(booking => {
          const bookingDate = new Date(booking.date_requested || booking.created_at);
          return bookingDate >= monthStart;
        });
      } else if (filters.dateFilter === 'custom' && (filters.dateRange.from || filters.dateRange.to)) {
        result = result.filter(booking => {
          const bookingDate = new Date(booking.date_requested || booking.created_at);
          
          if (filters.dateRange.from && !filters.dateRange.to) {
            return bookingDate >= filters.dateRange.from;
          } else if (!filters.dateRange.from && filters.dateRange.to) {
            return bookingDate <= filters.dateRange.to;
          } else if (filters.dateRange.from && filters.dateRange.to) {
            return bookingDate >= filters.dateRange.from && bookingDate <= filters.dateRange.to;
          }
          
          return true;
        });
      }
    }
    
    // Filter by service type
    if (filters.serviceType !== 'all') {
      result = result.filter(booking => booking.service_name === filters.serviceType);
    }
    
    // Filter by search term
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(booking => 
        booking.client_name?.toLowerCase().includes(searchLower) ||
        booking.service_name?.toLowerCase().includes(searchLower) ||
        booking.note?.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredBookings(result);
  }, [bookings, filters]);
  
  return filteredBookings;
};
