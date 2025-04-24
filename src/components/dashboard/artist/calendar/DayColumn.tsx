
import { motion } from "framer-motion";
import { format, isSameDay } from "date-fns";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Booking } from "@/types/booking";
import { useState } from "react";
import BookingModal from "./BookingModal";

interface DayColumnProps {
  day: Date;
  bookings: Booking[];
  isToday: boolean;
}

export const DayColumn = ({ day, bookings, isToday }: DayColumnProps) => {
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

  const formatTime = (timeString: string) => {
    try {
      if (!timeString) return "";
      // Handle various time formats
      if (timeString.includes('T')) {
        // ISO string format
        return format(new Date(timeString), 'h:mm a');
      }
      return timeString;
    } catch (error) {
      console.error("Error formatting time:", error);
      return timeString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
      case 'accepted':
        return 'border-blue-200 bg-blue-50';
      case 'completed':
        return 'border-green-200 bg-green-50';
      case 'cancelled':
      case 'declined':
        return 'border-gray-200 bg-gray-50';
      case 'pending':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-[140px]">
      <div 
        className={cn(
          "p-2 text-center border-b", 
          isToday ? "bg-purple-100 border-purple-200 font-medium" : "bg-gray-50 border-gray-100"
        )}
      >
        <div className={cn("text-sm", isToday && "text-purple-800")}>
          {format(day, 'EEE')}
        </div>
        <div className={cn("text-lg", isToday && "text-purple-800")}>
          {format(day, 'd')}
        </div>
      </div>
      
      <div className="flex-1 p-2 bg-white border-r border-gray-100 min-h-[400px]">
        <div className="space-y-2">
          {bookings.length === 0 ? (
            <div className="h-full flex items-center justify-center text-sm text-gray-400">
              No appointments
            </div>
          ) : (
            bookings.map((booking) => (
              <motion.div
                key={booking.id}
                whileHover={{ scale: 1.02 }}
                className={cn(
                  "cursor-pointer p-2 rounded border text-sm shadow-sm",
                  getStatusColor(booking.status)
                )}
                onClick={() => setSelectedBooking({
                  id: booking.id,
                  clientName: booking.client_name,
                  serviceId: booking.service_id || "",
                  serviceName: booking.service_name,
                  date: booking.date_requested,
                  time: booking.time_requested,
                  status: booking.status,
                  notes: booking.note
                })}
              >
                <div className="font-medium">{booking.client_name}</div>
                <div className="text-xs">{booking.service_name || 'Service'}</div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTime(booking.time_requested || "")}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
      
      {selectedBooking && (
        <BookingModal
          open={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          existingBooking={selectedBooking}
        />
      )}
    </div>
  );
};
