
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { CalendarDays, Clock, User } from "lucide-react";
import { Booking } from "../hooks/useArtistBookings";
import { Badge } from "@/components/ui/badge";

interface AppointmentCardProps {
  appointment: Booking;
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  // Get status color based on appointment status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "accepted":
        return "bg-green-50 text-green-700 border-green-200";
      case "declined":
        return "bg-red-50 text-red-700 border-red-200";
      case "completed":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Format date for display
  const formattedDate = appointment.date_requested || "No date specified";
  const timeAgo = appointment.created_at 
    ? formatDistanceToNow(new Date(appointment.created_at), { addSuffix: true })
    : "Recently";

  return (
    <div className={`p-4 rounded-lg border ${appointment.status === 'accepted' ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">{appointment.client_name}</h3>
            <p className="text-sm text-gray-500">{appointment.service_name}</p>
          </div>
        </div>
        <Badge className={getStatusColor(appointment.status)}>
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </Badge>
      </div>
      
      <div className="mt-3 flex flex-wrap gap-y-2 gap-x-4 text-sm">
        <div className="flex items-center text-gray-600">
          <CalendarDays className="h-4 w-4 mr-1.5" />
          {formattedDate}
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-1.5" />
          {appointment.time_requested || "No time specified"}
        </div>
      </div>
      
      {appointment.note && (
        <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded border border-gray-100">
          <p className="italic">"{appointment.note}"</p>
        </div>
      )}
      
      <div className="mt-3 text-xs text-gray-500">
        Requested {timeAgo}
      </div>
    </div>
  );
};
