
import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, User } from "lucide-react";

interface AppointmentProps {
  bookings: any[];
  loading: boolean;
  limit?: number;
}

const UpcomingAppointmentList: React.FC<AppointmentProps> = ({ 
  bookings = [], 
  loading = false,
  limit = 5
}) => {
  const limitedBookings = bookings.slice(0, limit);
  
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (limitedBookings.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        <Calendar className="h-12 w-12 mx-auto mb-2 text-muted-foreground/50" />
        <p>No upcoming appointments</p>
        <p className="text-sm mt-1">Appointments will appear here once clients book with you</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-3">
      {limitedBookings.map((booking, idx) => (
        <Card key={booking.id || idx} className="p-3 flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
            {booking.sender?.avatar_url ? (
              <img 
                src={booking.sender.avatar_url} 
                alt={booking.sender?.full_name || "Client"} 
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <User className="h-6 w-6 text-amber-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="font-medium">{booking.sender?.full_name || "Client"}</div>
            <div className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {booking.date_requested || "No date"} • 
              <Clock className="h-3 w-3 ml-1" />
              {booking.time_requested || "No time"}
            </div>
          </div>
          <div className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">
            {booking.status || "Pending"}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default UpcomingAppointmentList;
