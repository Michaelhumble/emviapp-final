
import React, { useState } from 'react';
import { Search, Calendar, X, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  BookingFilters as BookingFiltersType,
  BookingStatus,
  ClientType,
  DateFilter,
  DateRange,
  useBookingFilters,
  ServiceTypeFilter
} from '@/hooks/useBookingFilters';
import { useTranslation } from '@/hooks/useTranslation';
import { format } from 'date-fns';

export interface BookingFiltersProps {
  onFilterChange?: (filters: BookingFiltersType) => void;
  initialFilters?: Partial<BookingFiltersType>;
  serviceTypes?: ServiceTypeFilter[];
  className?: string;
}

const BookingFilters: React.FC<BookingFiltersProps> = ({
  onFilterChange,
  initialFilters,
  serviceTypes = [],
  className = '',
}) => {
  const { t } = useTranslation();
  const {
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
  } = useBookingFilters({
    onFilterChange,
    initialFilters: { ...initialFilters, serviceTypes }
  });
  
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  // Set service types whenever they change
  React.useEffect(() => {
    setServiceTypes(serviceTypes);
  }, [serviceTypes, setServiceTypes]);
  
  // Format date range for display
  const formatDateRange = (range: DateRange) => {
    if (!range.from) return t({
      english: 'Select range',
      vietnamese: 'Chọn khoảng'
    });
    
    if (!range.to) return format(range.from, 'PPP');
    
    return `${format(range.from, 'PPP')} - ${format(range.to, 'PPP')}`;
  };
  
  // Handle status change
  const handleStatusChange = (value: string) => {
    updateStatus(value as BookingStatus);
  };
  
  // Handle date filter change
  const handleDateFilterChange = (value: string) => {
    updateDateFilter(value as DateFilter);
    
    // Close the calendar if date filter is not custom
    if (value !== 'custom') {
      setIsCalendarOpen(false);
    } else {
      setIsCalendarOpen(true);
    }
  };
  
  // Handle client type change
  const handleClientTypeChange = (value: string) => {
    updateClientType(value as ClientType);
  };
  
  // Handle service type change
  const handleServiceTypeChange = (value: string) => {
    updateServiceType(value);
  };
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearch(e.target.value);
  };
  
  // Count active filters (excluding 'all' selections and empty search)
  const activeFilterCount = [
    filters.status !== 'all' ? 1 : 0,
    filters.dateFilter !== 'all' ? 1 : 0,
    filters.clientType !== 'all' ? 1 : 0,
    filters.serviceType !== 'all' ? 1 : 0,
    filters.search.trim() !== '' ? 1 : 0
  ].reduce((a, b) => a + b, 0);
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Status filter */}
        <Select value={filters.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t({
              english: "Status",
              vietnamese: "Trạng Thái"
            })} />
          </SelectTrigger>
          <SelectContent>
            {getStatusOptions().map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Date filter */}
        <Select value={filters.dateFilter} onValueChange={handleDateFilterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t({
              english: "Date",
              vietnamese: "Ngày"
            })} />
          </SelectTrigger>
          <SelectContent>
            {getDateFilterOptions().map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Custom date range picker */}
        {filters.dateFilter === 'custom' && (
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <Calendar className="mr-2 h-4 w-4" />
                {formatDateRange(filters.dateRange)}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={filters.dateRange.from}
                selected={{
                  from: filters.dateRange.from,
                  to: filters.dateRange.to
                }}
                onSelect={(range) => {
                  updateDateRange({
                    from: range?.from,
                    to: range?.to
                  });
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        )}
        
        {/* Client type filter */}
        <Select value={filters.clientType} onValueChange={handleClientTypeChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t({
              english: "Client Type",
              vietnamese: "Loại Khách Hàng"
            })} />
          </SelectTrigger>
          <SelectContent>
            {getClientTypeOptions().map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Service type filter */}
        {getServiceTypeOptions().length > 1 && (
          <Select value={filters.serviceType} onValueChange={handleServiceTypeChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t({
                english: "Service Type",
                vietnamese: "Loại Dịch Vụ"
              })} />
            </SelectTrigger>
            <SelectContent>
              {getServiceTypeOptions().map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
      
      {/* Search input */}
      <div className="flex space-x-2">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder={t({
              english: "Search by name or notes...",
              vietnamese: "Tìm kiếm theo tên hoặc ghi chú..."
            })}
            className="pl-9"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        
        {/* Reset filters button */}
        {activeFilterCount > 0 && (
          <Button
            variant="outline"
            size="icon"
            onClick={resetFilters}
            title={t({
              english: "Clear all filters",
              vietnamese: "Xóa tất cả bộ lọc"
            })}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Active filter count badge */}
      {activeFilterCount > 0 && (
        <div className="flex items-center text-sm text-gray-500">
          <Filter className="mr-1 h-4 w-4" />
          {t(
            {
              english: `${activeFilterCount} active ${activeFilterCount === 1 ? 'filter' : 'filters'}`,
              vietnamese: `${activeFilterCount} bộ lọc đang hoạt động`
            }
          )}
        </div>
      )}
    </div>
  );
};

export default BookingFilters;
