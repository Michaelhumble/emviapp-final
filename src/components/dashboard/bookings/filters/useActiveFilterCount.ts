
import { useEffect, useState } from 'react';
import { BookingFilters } from '@/hooks/useBookingFilters';

export const useActiveFilterCount = (filters: BookingFilters) => {
  const [activeFilterCount, setActiveFilterCount] = useState(0);
  
  useEffect(() => {
    // Count active filters (excluding 'all' selections and empty search)
    const count = [
      filters.status !== 'all' ? 1 : 0,
      filters.dateFilter !== 'all' ? 1 : 0,
      filters.clientType !== 'all' ? 1 : 0,
      filters.serviceType !== 'all' ? 1 : 0,
      filters.search.trim() !== '' ? 1 : 0
    ].reduce((a, b) => a + b, 0);
    
    setActiveFilterCount(count);
  }, [filters]);
  
  return activeFilterCount;
};
