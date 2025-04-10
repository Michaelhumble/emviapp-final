
import React from "react";
import { 
  Table, TableBody, TableCaption 
} from "@/components/ui/table";
import { Booking } from "../types";
import BookingTableHeader from "./BookingTableHeader";
import BookingTableRow from "./BookingTableRow";

interface BookingTableProps {
  bookings: Booking[];
  onStatusUpdate: (bookingId: string, newStatus: string) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings, onStatusUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>List of all your bookings</TableCaption>
        <BookingTableHeader />
        <TableBody>
          {bookings.map((booking) => (
            <BookingTableRow 
              key={booking.id}
              booking={booking} 
              onStatusUpdate={onStatusUpdate}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;
