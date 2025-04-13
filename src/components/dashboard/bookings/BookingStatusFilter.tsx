
import React from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BookingStatus } from "@/components/dashboard/salon/bookings/types";

interface BookingStatusFilterProps {
  value: BookingStatus;
  onChange: (value: string) => void;
}

const BookingStatusFilter: React.FC<BookingStatusFilterProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Label className="text-sm font-medium whitespace-nowrap">Status:</Label>
      <Select 
        value={value} 
        onValueChange={onChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All bookings</SelectItem>
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
