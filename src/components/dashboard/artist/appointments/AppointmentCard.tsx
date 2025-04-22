
import { format } from "date-fns";
import { CalendarDays, Clock, User } from "lucide-react";
import { Booking } from "../types/ArtistDashboardTypes";
import { Badge } from "@/components/ui/badge";

interface AppointmentCardProps {
  appointment: Booking;
}

export const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'accepted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-4 rounded-lg border border-gray-100 hover:border-primary/20 transition-colors bg-white">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <h4 className="font-medium">{appointment.client_name || 'Client'}</h4>
        </div>
        <Badge 
          variant="outline" 
          className={`${getStatusColor(appointment.status)}`}
        >
          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
        </Badge>
      </div>
      
      <div className="mt-2 space-y-1">
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5 mr-1.5" />
          {appointment.date_requested && format(new Date(appointment.date_requested), 'MMM d, yyyy')}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          {appointment.time_requested}
        </div>
        
        {appointment.service_name && (
          <div className="text-sm font-medium text-primary">
            {appointment.service_name}
          </div>
        )}
      </div>
    </div>
  );
};
