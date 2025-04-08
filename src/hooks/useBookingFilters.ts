
import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { debounce } from 'lodash';

// Filter status types
export type BookingStatus = 'all' | 'pending' | 'accepted' | 'declined' | 'completed';
export type DateFilter = 'all' | 'today' | 'this_week' | 'this_month' | 'custom';
export type ClientType = 'all' | 'new' | 'returning';

// Service type interface
export interface ServiceTypeFilter {
  id: string;
  label: string;
}

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

// Filter options interface
export interface BookingFilters {
  status: BookingStatus;
  dateFilter: DateFilter;
  dateRange: DateRange;
  clientType: ClientType;
  serviceType: string;
  search: string;
  serviceTypes: ServiceTypeFilter[];
}

export interface UseBookingFiltersProps {
  onFilterChange?: (filters: BookingFilters) => void;
  initialFilters?: Partial<BookingFilters>;
  saveToLocalStorage?: boolean;
  localStorageKey?: string;
}

export const useBookingFilters = ({
  onFilterChange,
  initialFilters,
  saveToLocalStorage = true,
  localStorageKey = 'emvi_booking_filters'
}: UseBookingFiltersProps = {}) => {
  const { t } = useTranslation();
  
  // Initialize filters, possibly from localStorage
  const getInitialFilters = (): BookingFilters => {
    if (saveToLocalStorage) {
      try {
        const savedFilters = localStorage.getItem(localStorageKey);
        if (savedFilters) {
          const parsed = JSON.parse(savedFilters);
          
          // Convert date strings back to Date objects if they exist
          if (parsed.dateRange?.from) {
            parsed.dateRange.from = new Date(parsed.dateRange.from);
          }
          if (parsed.dateRange?.to) {
            parsed.dateRange.to = new Date(parsed.dateRange.to);
          }
          
          return {
            ...getDefaultFilters(),
            ...parsed,
            ...initialFilters
          };
        }
      } catch (error) {
        console.error('Error loading filters from localStorage:', error);
      }
    }
    
    return {
      ...getDefaultFilters(),
      ...initialFilters
    };
  };
  
  // Default filters
  const getDefaultFilters = (): BookingFilters => ({
    status: 'all',
    dateFilter: 'all',
    dateRange: { from: undefined, to: undefined },
    clientType: 'all',
    serviceType: 'all',
    search: '',
    serviceTypes: []
  });
  
  const [filters, setFilters] = useState<BookingFilters>(getInitialFilters());
  
  // Save filters to localStorage when they change
  useEffect(() => {
    if (saveToLocalStorage) {
      try {
        localStorage.setItem(localStorageKey, JSON.stringify(filters));
      } catch (error) {
        console.error('Error saving filters to localStorage:', error);
      }
    }
    
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, saveToLocalStorage, localStorageKey, onFilterChange]);
  
  // Create a debounced search updater
  const debouncedSearchChange = useCallback(
    debounce((value: string) => {
      setFilters(prev => ({ ...prev, search: value }));
    }, 300),
    []
  );
  
  // Update filter methods
  const updateStatus = (status: BookingStatus) => {
    setFilters(prev => ({ ...prev, status }));
  };
  
  const updateDateFilter = (dateFilter: DateFilter) => {
    setFilters(prev => ({ ...prev, dateFilter }));
  };
  
  const updateDateRange = (dateRange: DateRange) => {
    setFilters(prev => ({ ...prev, dateRange }));
  };
  
  const updateClientType = (clientType: ClientType) => {
    setFilters(prev => ({ ...prev, clientType }));
  };
  
  const updateServiceType = (serviceType: string) => {
    setFilters(prev => ({ ...prev, serviceType }));
  };
  
  const updateSearch = (search: string) => {
    debouncedSearchChange(search);
  };
  
  // Explicitly export the setServiceTypes function
  const setServiceTypes = (serviceTypes: ServiceTypeFilter[]) => {
    setFilters(prev => ({ ...prev, serviceTypes }));
  };
  
  const resetFilters = () => {
    setFilters(getDefaultFilters());
  };
  
  // Get translated status labels
  const getStatusOptions = () => [
    { value: 'all', label: t({ english: 'All Statuses', vietnamese: 'Tất Cả Trạng Thái' }) },
    { value: 'pending', label: t({ english: 'Pending', vietnamese: 'Đang Chờ' }) },
    { value: 'accepted', label: t({ english: 'Confirmed', vietnamese: 'Đã Xác Nhận' }) },
    { value: 'declined', label: t({ english: 'Declined', vietnamese: 'Đã Từ Chối' }) },
    { value: 'completed', label: t({ english: 'Completed', vietnamese: 'Đã Hoàn Thành' }) }
  ];
  
  // Get translated date filter options
  const getDateFilterOptions = () => [
    { value: 'all', label: t({ english: 'All Dates', vietnamese: 'Tất Cả Ngày' }) },
    { value: 'today', label: t({ english: 'Today', vietnamese: 'Hôm Nay' }) },
    { value: 'this_week', label: t({ english: 'This Week', vietnamese: 'Tuần Này' }) },
    { value: 'this_month', label: t({ english: 'This Month', vietnamese: 'Tháng Này' }) },
    { value: 'custom', label: t({ english: 'Custom Range', vietnamese: 'Tùy Chỉnh' }) }
  ];
  
  // Get translated client type options
  const getClientTypeOptions = () => [
    { value: 'all', label: t({ english: 'All Clients', vietnamese: 'Tất Cả Khách Hàng' }) },
    { value: 'new', label: t({ english: 'New Clients', vietnamese: 'Khách Hàng Mới' }) },
    { value: 'returning', label: t({ english: 'Returning Clients', vietnamese: 'Khách Hàng Quay Lại' }) }
  ];
  
  // Get service type options (including the translated "All Services")
  const getServiceTypeOptions = () => [
    { value: 'all', label: t({ english: 'All Services', vietnamese: 'Tất Cả Dịch Vụ' }) },
    ...filters.serviceTypes.map(type => ({
      value: type.id,
      label: type.label
    }))
  ];
  
  return {
    filters,
    updateStatus,
    updateDateFilter,
    updateDateRange,
    updateClientType,
    updateServiceType,
    updateSearch,
    resetFilters,
    setServiceTypes,
    getStatusOptions,
    getDateFilterOptions,
    getClientTypeOptions,
    getServiceTypeOptions
  };
};
