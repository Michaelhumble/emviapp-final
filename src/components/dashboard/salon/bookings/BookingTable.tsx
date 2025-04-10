
import React from "react";
import { 
  Table, TableHeader, TableBody, TableHead, 
  TableRow, TableCell, TableCaption 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, AlertCircle, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Booking, BookingStatus } from "./types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BookingTableProps {
  bookings: Booking[];
  onStatusUpdate: (bookingId: string, newStatus: BookingStatus) => void;
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings, onStatusUpdate }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "accepted":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Accepted</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      case "cancelled":
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Cancelled</Badge>;
      case "declined":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Declined</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">{status}</Badge>;
    }
  };
  
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return format(date, "MMM d, yyyy");
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>List of all your bookings</TableCaption>
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
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell className="font-medium">
                {booking.clientName}
                <div className="md:hidden text-xs mt-1 text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(booking.date)}
                  </div>
                  <div className="flex items-center mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {booking.time || "No time specified"}
                  </div>
                </div>
              </TableCell>
              <TableCell>{booking.serviceName}</TableCell>
              <TableCell className="hidden md:table-cell">{formatDate(booking.date)}</TableCell>
              <TableCell className="hidden md:table-cell">{booking.time || "No time specified"}</TableCell>
              <TableCell>{getStatusBadge(booking.status)}</TableCell>
              <TableCell className="hidden md:table-cell">
                {booking.notes ? (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-sm text-blue-600 cursor-help underline underline-offset-4">
                          View note
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-sm">{booking.notes}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <span className="text-sm text-gray-400">No notes</span>
                )}
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
                      <Check className="h-4 w-4 mr-1" />
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
                      <X className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Cancel</span>
                    </Button>
                  )}
                  
                  {booking.status === "completed" && (
                    <span className="text-sm text-green-600 flex items-center">
                      <Check className="h-4 w-4 mr-1" />
                      Completed
                    </span>
                  )}
                  
                  {booking.status === "cancelled" && (
                    <span className="text-sm text-gray-500 flex items-center">
                      <X className="h-4 w-4 mr-1" />
                      Cancelled
                    </span>
                  )}
                  
                  {booking.status === "declined" && (
                    <span className="text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Declined
                    </span>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;
