
import React from "react";
import { 
  Table, TableBody, TableCaption 
} from "@/components/ui/table";
import { Booking } from "../types";
import BookingTableHeader from "./BookingTableHeader";
import BookingTableRow from "./BookingTableRow";

interface BookingTableProps {
  bookings: Booking[];
  staffMembers: Array<{id: string, name: string}>;
  onStatusUpdate: (bookingId: string, newStatus: string) => void;
  onStaffAssign: (bookingId: string, staffId: string) => void;
  onBookingUpdate: (bookingId: string, updates: {
    date?: Date,
    time?: string,
    notes?: string
  }) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({ 
  bookings, 
  staffMembers,
  onStatusUpdate,
  onStaffAssign,
  onBookingUpdate
}) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>List of all your bookings</TableCaption>
        <BookingTableHeader showStaffColumn={true} />
        <TableBody>
          {bookings.map((booking) => (
            <BookingTableRow 
              key={booking.id}
              booking={booking}
              staffMembers={staffMembers}
              onStatusUpdate={onStatusUpdate}
              onStaffAssign={onStaffAssign}
              onBookingUpdate={onBookingUpdate}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;
