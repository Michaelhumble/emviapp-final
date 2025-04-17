
import { format } from "date-fns";
import { Booking } from "../types/ArtistDashboardTypes";

interface DayColumnProps {
  day: Date;
  bookings: Booking[];
  isToday: boolean;
}

// Map status to color classes
const statusColors = {
  pending: "bg-amber-100 border-amber-200 text-amber-800",
  accepted: "bg-emerald-100 border-emerald-200 text-emerald-800",
  completed: "bg-blue-100 border-blue-200 text-blue-800",
  declined: "bg-red-100 border-red-200 text-red-800",
  cancelled: "bg-gray-100 border-gray-200 text-gray-500"
};

export const DayColumn = ({ day, bookings, isToday }: DayColumnProps) => {
  // Get day-specific background based on whether it's today
  const dayHeaderClass = isToday
    ? "bg-primary/10 text-primary font-medium"
    : "bg-muted/30 text-muted-foreground"; 

  return (
    <div className="flex-1 min-w-[120px]">
      {/* Day header */}
      <div className={`p-2 text-center rounded-t-md ${dayHeaderClass}`}>
        <div className="text-xs uppercase">{format(day, "EEE")}</div>
        <div className="text-xl">{format(day, "d")}</div>
      </div>
      
      {/* Bookings container */}
      <div className={`h-[400px] border-x border-b rounded-b-md p-1 overflow-y-auto ${
        isToday ? "border-primary/20" : "border-muted-foreground/10"
      }`}>
        {bookings.length > 0 ? (
          <div className="space-y-1">
            {bookings.map((booking) => {
              const colorClass = statusColors[booking.status] || statusColors.pending;
              
              return (
                <div 
                  key={booking.id} 
                  className={`p-2 rounded-md border text-xs leading-normal hover:shadow-sm transition-shadow cursor-pointer ${colorClass}`}
                >
                  <div className="font-medium">{booking.time_requested}</div>
                  <div className="truncate">{booking.client_name || "Client"}</div>
                  <div className="truncate">{booking.service_name || "Service"}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-xs text-muted-foreground py-4">No bookings</p>
          </div>
        )}
      </div>
    </div>
  );
};
