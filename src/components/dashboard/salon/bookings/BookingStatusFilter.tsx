
import React from "react";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { BookingStatus } from "./types";

interface BookingStatusFilterProps {
  value: BookingStatus;
  onChange: (value: BookingStatus) => void;
}

const BookingStatusFilter: React.FC<BookingStatusFilterProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label className="text-sm font-medium whitespace-nowrap">Status:</label>
      <Select
        value={value}
        onValueChange={(val) => onChange(val as BookingStatus)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Bookings</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="accepted">Accepted</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
          <SelectItem value="declined">Declined</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default BookingStatusFilter;
