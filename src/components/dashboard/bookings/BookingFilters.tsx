
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRange } from "react-day-picker";
import { Label } from "@/components/ui/label";
import { Search, Calendar } from "lucide-react";
import { BookingFilters } from "@/hooks/useBookingFilters";
import BookingStatusFilter from "./BookingStatusFilter";
import BookingDateFilter from "./BookingDateFilter";

interface BookingFiltersProps {
  serviceTypes?: string[];
  onFilterChange: (filters: BookingFilters) => void;
}

const BookingFilterPanel = ({ serviceTypes = [], onFilterChange }: BookingFiltersProps) => {
  const [filters, setFilters] = useState<BookingFilters>({
    status: 'all',
    dateFilter: 'all',
    dateRange: { from: undefined, to: undefined },
    clientType: 'all',
    serviceType: 'all',
    search: '',
    serviceTypes: serviceTypes || []
  });
  
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);
  
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setFilters({
      ...filters,
      dateRange: range || { from: undefined, to: undefined },
      dateFilter: range ? 'custom' : 'all'
    });
  };
  
  const handleStatusChange = (status: string) => {
    setFilters({
      ...filters,
      status
    });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      search: e.target.value
    });
  };
  
  const handleServiceTypeChange = (serviceType: string) => {
    setFilters({
      ...filters,
      serviceType
    });
  };
  
  const handleDateFilterChange = (dateFilter: string) => {
    let newDateRange = { from: undefined, to: undefined };
    const today = new Date();
    
    if (dateFilter === 'today') {
      newDateRange = { from: today, to: today };
    } else if (dateFilter === 'tomorrow') {
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      newDateRange = { from: tomorrow, to: tomorrow };
    } else if (dateFilter === 'thisWeek') {
      const startOfWeek = new Date();
      startOfWeek.setDate(today.getDate() - today.getDay());
      const endOfWeek = new Date();
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      newDateRange = { from: startOfWeek, to: endOfWeek };
    }
    
    setFilters({
      ...filters,
      dateFilter,
      dateRange: newDateRange
    });
  };
  
  const handleReset = () => {
    setFilters({
      status: 'all',
      dateFilter: 'all',
      dateRange: { from: undefined, to: undefined },
      clientType: 'all',
      serviceType: 'all',
      search: '',
      serviceTypes
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search clients or services..."
            className="pl-9"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="whitespace-nowrap"
        >
          Reset Filters
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <BookingStatusFilter
          value={filters.status as any}
          onChange={handleStatusChange}
        />
        
        <div className="flex items-center space-x-2">
          <Label className="text-sm font-medium whitespace-nowrap">Date:</Label>
          <Select
            value={filters.dateFilter}
            onValueChange={handleDateFilterChange}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All dates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="thisWeek">This week</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {filters.dateFilter === 'custom' && (
          <BookingDateFilter
            dateRange={filters.dateRange}
            onChange={handleDateRangeChange}
          />
        )}
        
        {serviceTypes.length > 0 && (
          <div className="flex items-center space-x-2">
            <Label className="text-sm font-medium whitespace-nowrap">Service:</Label>
            <Select
              value={filters.serviceType}
              onValueChange={handleServiceTypeChange}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All services</SelectItem>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingFilterPanel;
