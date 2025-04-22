
import { format, parseISO } from "date-fns";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Booking } from "../hooks/useArtistBookings";

interface AppointmentCardProps {
  appointment: Booking;
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  // Format date for display
  const dateFormatted = appointment.date_requested 
    ? format(new Date(appointment.date_requested), "EEEE, MMMM d, yyyy")
    : "Date not specified";
  
  // Status to color mapping
  const statusColors = {
    pending: "bg-amber-100 text-amber-800 border-amber-200",
    accepted: "bg-emerald-100 text-emerald-800 border-emerald-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
    declined: "bg-red-100 text-red-800 border-red-200",
    cancelled: "bg-gray-100 text-gray-500 border-gray-200"
  };
  
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row justify-between">
        <div>
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-medium">{appointment.service_name}</h3>
            <Badge 
              variant="outline" 
              className={`ml-2 ${statusColors[appointment.status]} border`}
            >
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <CalendarIcon className="h-4 w-4 mr-2" />
            {dateFormatted}
          </div>
          
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <Clock className="h-4 w-4 mr-2" />
            {appointment.time_requested || "Time not specified"}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-2" />
            {appointment.client_name}
          </div>
        </div>
      </div>
    </div>
  );
};
