
import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X, AlertCircle, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Booking } from "../types";
import BookingStatusBadge from "./BookingStatusBadge";
import BookingNoteTooltip from "./BookingNoteTooltip";

interface BookingTableRowProps {
  booking: Booking;
  onStatusUpdate: (bookingId: string, newStatus: string) => void;
}

const BookingTableRow: React.FC<BookingTableRowProps> = ({ booking, onStatusUpdate }) => {
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return format(date, "MMM d, yyyy");
  };

  return (
    <TableRow key={booking.id}>
      <TableCell className="font-medium">
        {booking.clientName}
        <div className="md:hidden text-xs mt-1 text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
            {formatDate(booking.date)}
          </div>
          <div className="flex items-center mt-1">
            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
            {booking.time || "No time specified"}
          </div>
        </div>
      </TableCell>
      <TableCell>{booking.serviceName}</TableCell>
      <TableCell className="hidden md:table-cell">{formatDate(booking.date)}</TableCell>
      <TableCell className="hidden md:table-cell">{booking.time || "No time specified"}</TableCell>
      <TableCell><BookingStatusBadge status={booking.status} /></TableCell>
      <TableCell className="hidden md:table-cell">
        <BookingNoteTooltip notes={booking.notes} />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-2">
          {(booking.status === "accepted" || booking.status === "pending") && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 border-green-200 hover:bg-green-50 hover:text-green-700"
              onClick={() => onStatusUpdate(booking.id, "completed")}
            >
              <Check className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="hidden sm:inline">Complete</span>
            </Button>
          )}
          
          {(booking.status === "accepted" || booking.status === "pending") && (
            <Button
              size="sm"
              variant="outline"
              className="h-8 border-red-200 hover:bg-red-50 hover:text-red-700"
              onClick={() => onStatusUpdate(booking.id, "cancelled")}
            >
              <X className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="hidden sm:inline">Cancel</span>
            </Button>
          )}
          
          {booking.status === "completed" && (
            <span className="text-sm text-green-600 flex items-center">
              <Check className="h-4 w-4 mr-1 flex-shrink-0" />
              Completed
            </span>
          )}
          
          {booking.status === "cancelled" && (
            <span className="text-sm text-gray-500 flex items-center">
              <X className="h-4 w-4 mr-1 flex-shrink-0" />
              Cancelled
            </span>
          )}
          
          {booking.status === "declined" && (
            <span className="text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1 flex-shrink-0" />
              Declined
            </span>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};

export default BookingTableRow;
