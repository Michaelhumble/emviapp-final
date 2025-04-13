
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { BookingStatus, DateFilter, DateRange, useBookingFilters } from '@/hooks/useBookingFilters';
import BookingStatusFilter from './BookingStatusFilter';
import BookingDateFilter from './BookingDateFilter';

interface BookingFiltersProps {
  onFiltersChange?: (filters: any) => void;
  serviceTypes?: string[]; // Add serviceTypes as an optional prop
}

const BookingFilters = ({ onFiltersChange, serviceTypes = [] }: BookingFiltersProps) => {
  const { filters, updateFilter, resetFilters } = useBookingFilters();

  const handleStatusChange = (status: BookingStatus) => {
    updateFilter('status', status);
    if (onFiltersChange) onFiltersChange({ ...filters, status });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value;
    updateFilter('search', search);
    if (onFiltersChange) onFiltersChange({ ...filters, search });
  };

  const handleDateFilterChange = (dateFilter: DateFilter) => {
    updateFilter('dateFilter', dateFilter);
    if (onFiltersChange) onFiltersChange({ ...filters, dateFilter });
  };

  const handleDateRangeChange = (dateRange: DateRange | null) => {
    updateFilter('dateRange', dateRange);
    if (onFiltersChange) onFiltersChange({ ...filters, dateRange });
  };

  const handleResetFilters = () => {
    resetFilters();
    if (onFiltersChange) onFiltersChange({
      status: 'all',
      clientType: 'all',
      serviceType: 'all',
      search: '',
      dateFilter: 'all',
      dateRange: null,
      serviceTypes: [],
    });
  };

  const hasActiveFilters = 
    filters.status !== 'all' ||
    filters.clientType !== 'all' ||
    filters.serviceType !== 'all' ||
    filters.search !== '' ||
    filters.dateFilter !== 'all';

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg border">
      <h3 className="font-medium text-lg">Booking Filters</h3>
      
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search client, service..."
          className="pl-8"
          value={filters.search}
          onChange={handleSearchChange}
        />
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Status</h4>
        <BookingStatusFilter
          value={filters.status}
          onChange={handleStatusChange}
        />
      </div>
      
      <div>
        <h4 className="font-medium mb-2">Date</h4>
        <BookingDateFilter
          dateFilter={filters.dateFilter}
          dateRange={filters.dateRange}
          onDateFilterChange={handleDateFilterChange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      
      {hasActiveFilters && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-muted-foreground" 
          onClick={handleResetFilters}
        >
          <X className="h-4 w-4 mr-1" />
          Reset Filters
        </Button>
      )}
    </div>
  );
};

export default BookingFilters;
