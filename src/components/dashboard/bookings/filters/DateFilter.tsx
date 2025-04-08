
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DateFilter as DateFilterType, DateRange } from '@/hooks/useBookingFilters';
import { useTranslation } from '@/hooks/useTranslation';
import { format } from 'date-fns';

interface DateFilterProps {
  dateFilter: DateFilterType;
  dateRange: DateRange;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (isOpen: boolean) => void;
  onDateFilterChange: (value: DateFilterType) => void;
  onDateRangeChange: (range: DateRange) => void;
  options: { value: string; label: string }[];
}

const DateFilter: React.FC<DateFilterProps> = ({
  dateFilter,
  dateRange,
  isCalendarOpen,
  setIsCalendarOpen,
  onDateFilterChange,
  onDateRangeChange,
  options
}) => {
  // Format date range for display
  const formatDateRange = (range: DateRange) => {
    if (!range.from) return options[0].label;
    
    if (!range.to) return format(range.from, 'PPP');
    
    return `${format(range.from, 'PPP')} - ${format(range.to, 'PPP')}`;
  };

  // Handle date filter change
  const handleDateFilterChange = (value: string) => {
    onDateFilterChange(value as DateFilterType);
    
    // Close the calendar if date filter is not custom
    if (value !== 'custom') {
      setIsCalendarOpen(false);
    } else {
      setIsCalendarOpen(true);
    }
  };

  return (
    <>
      <Select value={dateFilter} onValueChange={handleDateFilterChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={options[0].label} />
        </SelectTrigger>
        <SelectContent>
          {options.map(option => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Custom date range picker */}
      {dateFilter === 'custom' && (
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <Calendar className="mr-2 h-4 w-4" />
              {formatDateRange(dateRange)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={{
                from: dateRange.from,
                to: dateRange.to
              }}
              onSelect={(range) => {
                onDateRangeChange({
                  from: range?.from,
                  to: range?.to
                });
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default DateFilter;
