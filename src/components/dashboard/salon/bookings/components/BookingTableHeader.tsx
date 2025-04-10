
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BookingTableHeader: React.FC = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Client</TableHead>
        <TableHead>Service</TableHead>
        <TableHead className="hidden md:table-cell">Date</TableHead>
        <TableHead className="hidden md:table-cell">Time</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="hidden md:table-cell">Notes</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default BookingTableHeader;
