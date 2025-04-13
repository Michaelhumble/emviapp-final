
import { useState } from 'react';

export type BookingStatus = 'all' | 'pending' | 'accepted' | 'completed' | 'cancelled' | 'declined';
export type ClientType = 'all' | 'new' | 'returning';
export type ServiceType = 'all' | string;
export type DateFilter = 'all' | 'today' | 'tomorrow' | 'this-week' | 'next-week' | 'this-month' | 'custom';

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

export interface BookingFilters {
  status: BookingStatus;
  clientType: ClientType;
  serviceType: ServiceType;
  search: string;
  dateFilter: DateFilter;
  dateRange: DateRange | null;
  serviceTypes?: string[]; // Added serviceTypes as an optional property
}

export const useBookingFilters = () => {
  const [filters, setFilters] = useState<BookingFilters>({
    status: 'all',
    clientType: 'all',
    serviceType: 'all',
    search: '',
    dateFilter: 'all',
    dateRange: null,
    serviceTypes: [] // Initialize with empty array
  });

  const updateFilter = <K extends keyof BookingFilters>(
    filterName: K,
    value: BookingFilters[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: 'all',
      clientType: 'all',
      serviceType: 'all',
      search: '',
      dateFilter: 'all',
      dateRange: null,
      serviceTypes: []
    });
  };

  return {
    filters,
    updateFilter,
    resetFilters,
  };
};
