
import React, { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Check, X, AlertCircle, Clock, Calendar, Edit,
  User, Users 
} from "lucide-react";
import { format } from "date-fns";
import { Booking } from "../types";
import BookingStatusBadge from "./BookingStatusBadge";
import BookingNoteTooltip from "./BookingNoteTooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { EditBookingModal } from "./EditBookingModal";

interface BookingTableRowProps {
  booking: Booking;
  staffMembers: Array<{id: string, name: string}>;
  onStatusUpdate: (bookingId: string, newStatus: string) => void;
  onStaffAssign: (bookingId: string, staffId: string) => void;
  onBookingUpdate: (bookingId: string, updates: {
    date?: Date,
    time?: string,
    notes?: string
  }) => void;
}

const BookingTableRow: React.FC<BookingTableRowProps> = ({ 
  booking, 
  staffMembers, 
  onStatusUpdate, 
  onStaffAssign,
  onBookingUpdate 
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  
  const formatDate = (date: Date | null) => {
    if (!date) return "N/A";
    return format(date, "MMM d, yyyy");
  };

  const handleStaffAssign = (staffId: string) => {
    onStaffAssign(booking.id, staffId);
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
      <TableCell>
        {booking.assignedStaffName ? (
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1 text-blue-500" />
            <span className="text-sm">{booking.assignedStaffName}</span>
          </div>
        ) : (
          <Select onValueChange={handleStaffAssign}>
            <SelectTrigger className="h-8 w-full">
              <SelectValue placeholder="Assign staff" />
            </SelectTrigger>
            <SelectContent>
              {staffMembers.map(staff => (
                <SelectItem key={staff.id} value={staff.id}>
                  {staff.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <BookingNoteTooltip notes={booking.notes} />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8">
                Actions
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Manage Booking</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              {/* Edit */}
              <DropdownMenuItem onClick={() => setShowEditModal(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit Details
              </DropdownMenuItem>
              
              {/* Assign Staff */}
              {!booking.assignedStaffName && (
                <DropdownMenuItem>
                  <Users className="h-4 w-4 mr-2" />
                  <Select onValueChange={handleStaffAssign}>
                    <SelectTrigger className="border-0 p-0 h-auto">
                      <SelectValue placeholder="Assign Staff" />
                    </SelectTrigger>
                    <SelectContent>
                      {staffMembers.map(staff => (
                        <SelectItem key={staff.id} value={staff.id}>
                          {staff.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </DropdownMenuItem>
              )}
              
              <DropdownMenuSeparator />
              
              {/* Status Updates */}
              {(booking.status === "pending") && (
                <DropdownMenuItem onClick={() => onStatusUpdate(booking.id, "accepted")}>
                  <Check className="h-4 w-4 mr-2 text-blue-500" />
                  Accept Booking
                </DropdownMenuItem>
              )}
              
              {(booking.status === "accepted" || booking.status === "pending") && (
                <DropdownMenuItem onClick={() => onStatusUpdate(booking.id, "completed")}>
                  <Check className="h-4 w-4 mr-2 text-green-500" />
                  Mark Completed
                </DropdownMenuItem>
              )}
              
              {(booking.status === "accepted" || booking.status === "pending") && (
                <DropdownMenuItem onClick={() => onStatusUpdate(booking.id, "cancelled")}>
                  <X className="h-4 w-4 mr-2 text-red-500" />
                  Cancel Booking
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
      
      {/* Edit Booking Modal */}
      {showEditModal && (
        <EditBookingModal
          booking={booking}
          onClose={() => setShowEditModal(false)}
          onSave={(updates) => {
            onBookingUpdate(booking.id, updates);
            setShowEditModal(false);
          }}
        />
      )}
    </TableRow>
  );
};

export default BookingTableRow;
