
import React from "react";
import BookingStatusFilter from "../BookingStatusFilter";
import BookingDateFilter from "../BookingDateFilter";
import { BookingStatus, DateRange } from "../types";

interface BookingFiltersProps {
  statusFilter: BookingStatus;
  onStatusFilterChange: (status: BookingStatus) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

const BookingFilters: React.FC<BookingFiltersProps> = ({
  statusFilter,
  onStatusFilterChange,
  dateRange,
  onDateRangeChange
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <BookingStatusFilter 
        value={statusFilter} 
        onChange={onStatusFilterChange} 
      />
      <BookingDateFilter 
        dateRange={dateRange} 
        onChange={onDateRangeChange} 
      />
    </div>
  );
};

export default BookingFilters;
