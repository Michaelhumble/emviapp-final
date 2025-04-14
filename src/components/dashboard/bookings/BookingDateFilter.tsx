
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DateRange, DateFilter } from '@/hooks/useBookingFilters';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

type DateFilterOption = {
  value: DateFilter;
  label: string;
};

const dateFilterOptions: DateFilterOption[] = [
  { value: 'all', label: 'All Dates' },
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'this-week', label: 'This Week' },
  { value: 'next-week', label: 'Next Week' },
  { value: 'this-month', label: 'This Month' },
  { value: 'custom', label: 'Custom Range' },
];

interface BookingDateFilterProps {
  dateFilter: DateFilter;
  dateRange: DateRange | null;
  onDateFilterChange: (filter: DateFilter) => void;
  onDateRangeChange: (range: DateRange | null) => void;
}

const BookingDateFilter = ({
  dateFilter,
  dateRange,
  onDateFilterChange,
  onDateRangeChange,
}: BookingDateFilterProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateFilterChange = (filter: DateFilter) => {
    onDateFilterChange(filter);
    if (filter !== 'custom') {
      // Reset date range when switching away from custom
      onDateRangeChange(null);
    } else {
      // Set a default date range for custom option
      const today = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      onDateRangeChange({ from: today, to: nextWeek });
      setIsCalendarOpen(true);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {dateFilterOptions.map((option) => (
          <Button
            key={option.value}
            variant={dateFilter === option.value ? 'default' : 'outline'}
            size="sm"
            className={dateFilter === option.value ? 'bg-primary' : ''}
            onClick={() => handleDateFilterChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {dateFilter === 'custom' && (
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start text-left">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, 'LLL dd, y')} -{' '}
                    {format(dateRange.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(dateRange.from, 'LLL dd, y')
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange as any}
              onSelect={(range) => onDateRangeChange(range)}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default BookingDateFilter;
