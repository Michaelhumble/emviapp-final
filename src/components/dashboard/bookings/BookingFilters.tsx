
import React, { useState } from 'react';
import { BookingFilters as BookingFiltersType, ServiceTypeFilter } from '@/hooks/useBookingFilters';
import { useTranslation } from '@/hooks/useTranslation';
import StatusFilter from './filters/StatusFilter';
import DateFilter from './filters/DateFilter';
import ClientTypeFilter from './filters/ClientTypeFilter';
import ServiceTypeFilter from './filters/ServiceTypeFilter';
import SearchFilter from './filters/SearchFilter';
import ActiveFilterIndicator from './filters/ActiveFilterIndicator';
import { useActiveFilterCount } from './filters/useActiveFilterCount';

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
    if (serviceTypes.length > 0) {
      setServiceTypes(serviceTypes);
    }
  }, [serviceTypes]);
  
  // Get active filter count
  const activeFilterCount = useActiveFilterCount(filters);
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Status filter */}
        <StatusFilter 
          status={filters.status} 
          onChange={updateStatus} 
          options={getStatusOptions()} 
        />
        
        {/* Date filter */}
        <DateFilter 
          dateFilter={filters.dateFilter}
          dateRange={filters.dateRange}
          isCalendarOpen={isCalendarOpen}
          setIsCalendarOpen={setIsCalendarOpen}
          onDateFilterChange={updateDateFilter}
          onDateRangeChange={updateDateRange}
          options={getDateFilterOptions()}
        />
        
        {/* Client type filter */}
        <ClientTypeFilter 
          clientType={filters.clientType} 
          onChange={updateClientType} 
          options={getClientTypeOptions()} 
        />
        
        {/* Service type filter */}
        {getServiceTypeOptions().length > 1 && (
          <ServiceTypeFilter 
            serviceType={filters.serviceType} 
            onChange={updateServiceType} 
            options={getServiceTypeOptions()} 
          />
        )}
      </div>
      
      {/* Search input */}
      <SearchFilter 
        search={filters.search}
        onChange={updateSearch}
        onResetFilters={resetFilters}
        activeFilterCount={activeFilterCount}
      />
      
      {/* Active filter count badge */}
      <ActiveFilterIndicator activeFilterCount={activeFilterCount} />
    </div>
  );
};

export default BookingFilters;

function setServiceTypes(serviceTypes: ServiceTypeFilter[]) {
  // This is intentionally left blank as it will be provided by useBookingFilters
}
