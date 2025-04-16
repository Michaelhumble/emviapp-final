
import { motion } from "framer-motion";
import { format, isSameDay } from "date-fns";
import { Booking } from "@/components/dashboard/artist/types/ArtistDashboardTypes";

interface DayColumnProps {
  day: Date;
  bookings: Booking[];
  isToday: boolean;
}

export const DayColumn = ({ day, bookings, isToday }: DayColumnProps) => {
  return (
    <div className="flex-1 min-w-[240px] md:min-w-[200px]">
      <div 
        className={`text-center p-3 font-playfair ${
          isToday 
            ? 'bg-gradient-to-br from-primary/5 to-primary/10 text-primary' 
            : 'bg-gradient-to-br from-gray-50 to-gray-100/50'
        }`}
      >
        <div className="text-sm uppercase tracking-wide">
          {format(day, 'EEEE')}
        </div>
        <div className="text-2xl font-medium">
          {format(day, 'd')}
        </div>
      </div>
      
      <div className="p-2 min-h-[300px] space-y-2 overflow-y-auto">
        {bookings.length === 0 ? (
          <div className="h-full flex items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">No bookings</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div 
                className={`
                  p-3 rounded-lg border shadow-sm hover:shadow-md transition-all
                  ${booking.status === 'accepted' 
                    ? 'bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200' 
                    : booking.status === 'pending'
                      ? 'bg-gradient-to-br from-amber-50 to-amber-100/50 border-amber-200'
                      : 'bg-gradient-to-br from-red-50 to-red-100/50 border-red-200'
                  }
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">
                      {booking.service_name || "Service"}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                      {booking.client_name || "Client"}
                    </div>
                    <div className="text-sm font-medium mt-1">
                      {booking.time_requested}
                    </div>
                  </div>
                  <div 
                    className={`w-2 h-2 rounded-full mt-1 ${
                      booking.status === 'accepted' 
                        ? 'bg-emerald-500' 
                        : booking.status === 'pending'
                          ? 'bg-amber-500'
                          : 'bg-red-500'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
