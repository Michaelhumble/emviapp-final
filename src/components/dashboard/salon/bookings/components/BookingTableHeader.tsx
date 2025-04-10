
import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";

interface BookingTableHeaderProps {
  showStaffColumn?: boolean;
}

const BookingTableHeader: React.FC<BookingTableHeaderProps> = ({ 
  showStaffColumn = false 
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Client</TableHead>
        <TableHead>Service</TableHead>
        <TableHead className="hidden md:table-cell">Date</TableHead>
        <TableHead className="hidden md:table-cell">Time</TableHead>
        <TableHead>Status</TableHead>
        {showStaffColumn && <TableHead>Assigned Staff</TableHead>}
        <TableHead className="hidden md:table-cell">Notes</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BookingTableHeader;
