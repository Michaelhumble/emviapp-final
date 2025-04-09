
import { useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { BookingFilters as BookingFiltersType } from "@/hooks/useBookingFilters";
import { useBookingFilters } from "@/hooks/useBookingFilters";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BookingFiltersProps {
  serviceTypes: string[];
  onFilterChange: (filters: BookingFiltersType) => void;
}

const BookingFilters = ({ serviceTypes, onFilterChange }: BookingFiltersProps) => {
  const { filters, updateFilter, resetFilters } = useBookingFilters({
    serviceTypes: serviceTypes,
  });
  
  // Update parent component when filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {/* Status Filter */}
        <div>
          <Select
            value={filters.status}
            onValueChange={(value) => updateFilter('status', value as BookingFiltersType['status'])}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Date Filter */}
        <div>
          <Select
            value={filters.dateFilter}
            onValueChange={(value) => updateFilter('dateFilter', value as BookingFiltersType['dateFilter'])}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Dates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Custom Date Range */}
        {filters.dateFilter === 'custom' && (
          <div className="col-span-1 sm:col-span-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.dateRange.from && !filters.dateRange.to && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.from ? (
                    filters.dateRange.to ? (
                      <>
                        {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                        {format(filters.dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(filters.dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    "Select date range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={filters.dateRange}
                  onSelect={(range) => updateFilter('dateRange', range)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
        
        {/* Service Type Filter */}
        {serviceTypes.length > 0 && (
          <div>
            <Select
              value={filters.serviceType}
              onValueChange={(value) => updateFilter('serviceType', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Services</SelectItem>
                {serviceTypes.map((service) => (
                  <SelectItem key={service} value={service}>
                    {service}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Search */}
        <div className="relative sm:col-span-2">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search client name or service..."
            className="pl-8 pr-8"
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
          />
          {filters.search && (
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => updateFilter('search', '')}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {/* Reset Button */}
        <div className="sm:col-span-2 flex justify-end">
          <Button variant="outline" size="sm" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;
