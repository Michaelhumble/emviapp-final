
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CheckCircle, Clock, XCircle, AlertCircle, Calendar } from "lucide-react";
import { Booking } from "../types/ArtistDashboardTypes";
import { useTranslation } from "@/hooks/useTranslation";

interface BookingTableRowProps {
  booking: Booking;
  handleAccept: (bookingId: string) => Promise<void>;
  handleDecline: (bookingId: string) => Promise<void>;
}

// Utility function to get initials from a name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Format date utility
const formatDate = (dateString?: string) => {
  if (!dateString) return "Flexible";
  try {
    return format(new Date(dateString), 'MMM d, yyyy');
  } catch (error) {
    return dateString;
  }
};

// Get status badge styling
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'accepted':
      return 'bg-green-100 text-green-800';
    case 'declined':
      return 'bg-red-100 text-red-800';
    case 'completed':
      return 'bg-blue-100 text-blue-800';
    case 'cancelled':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Get status icon
const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-3 w-3" />;
    case 'accepted':
      return <CheckCircle className="h-3 w-3" />;
    case 'declined':
      return <XCircle className="h-3 w-3" />;
    case 'completed':
      return <CheckCircle className="h-3 w-3" />;
    case 'cancelled':
      return <AlertCircle className="h-3 w-3" />;
    default:
      return <Clock className="h-3 w-3" />;
  }
};

const BookingTableRow = ({ booking, handleAccept, handleDecline }: BookingTableRowProps) => {
  const { isVietnamese } = useTranslation();
  
  const acceptText = isVietnamese ? "Chấp nhận" : "Accept";
  const declineText = isVietnamese ? "Từ chối" : "Decline";
  const viewDetailsText = isVietnamese ? "Xem chi tiết" : "View Details";
  
  return (
    <tr key={booking.id} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={booking.client_avatar || ""} />
            <AvatarFallback>{getInitials(booking.client_name || "")}</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium text-gray-900">
              {booking.client_name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{booking.service_name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatDate(booking.date_requested)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{booking.time_requested || "Flexible"}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(booking.status)}`}>
          {getStatusIcon(booking.status)}
          <span className="ml-1 capitalize">{booking.status}</span>
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {booking.status === 'pending' && (
          <div className="flex space-x-2">
            <Button 
              onClick={() => handleAccept(booking.id)} 
              size="sm" 
              variant="default"
            >
              {acceptText}
            </Button>
            <Button 
              onClick={() => handleDecline(booking.id)} 
              size="sm" 
              variant="outline" 
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              {declineText}
            </Button>
          </div>
        )}
        
        {booking.status === 'accepted' && (
          <Button size="sm" variant="outline">
            {viewDetailsText}
          </Button>
        )}
      </td>
    </tr>
  );
};

export default BookingTableRow;
