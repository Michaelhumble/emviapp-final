
import React from "react";
import { useCustomerBookingHistory } from "@/hooks/useCustomerBookingHistory";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck, CalendarX, Clock, MapPin, Check, X as XIcon } from "lucide-react";
import { format } from "date-fns";

const statusStyles: { [key: string]: { label: string; icon: React.ReactNode; color: string } } = {
  completed: {
    label: "Completed",
    icon: <Check className="inline h-4 w-4 text-emerald-500 mr-1 mb-0.5" />,
    color: "bg-emerald-50 text-emerald-600"
  },
  cancelled: {
    label: "Cancelled",
    icon: <XIcon className="inline h-4 w-4 text-red-500 mr-1 mb-0.5" />,
    color: "bg-red-50 text-red-600"
  },
  ["no-show"]: {
    label: "No-show",
    icon: <CalendarX className="inline h-4 w-4 text-gray-400 mr-1 mb-0.5" />,
    color: "bg-gray-50 text-gray-700"
  }
};

const BookingHistory = () => {
  const { bookings, loading, error, refetch } = useCustomerBookingHistory();

  // Mobile: single column, web: 2 columns
  const isMobile = window.innerWidth < 768;

  if (loading) {
    return (
      <div className="py-12 flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="py-10 text-center text-red-400">
        Could not load booking history. <Button size="sm" variant="outline" onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }
  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 text-gray-400">
        <CalendarCheck className="w-12 h-12 mb-4 opacity-20" />
        <p className="text-lg font-medium mb-3">No booking history yet.</p>
        <p className="text-sm mb-5">Book your first appointment today!</p>
        <Button asChild>
          <a href="/artists" className="w-auto">Find an Artist</a>
        </Button>
      </div>
    );
  }
  return (
    <div
      className={`
        w-full mt-5
        grid gap-6
        ${isMobile ? "grid-cols-1" : "md:grid-cols-2"}
      `}
    >
      {bookings.map((booking) => {
        const serviceName = booking.service?.title || "Service";
        const artistName = booking.artist?.full_name || "Artist";
        const salonName = booking.artist?.salon_name || "";
        const dateStr = booking.date_requested
          ? format(new Date(booking.date_requested), "MMM d, yyyy")
          : "";
        const timeStr = booking.time_requested || "";
        const status =
          booking.status === "completed"
            ? "completed"
            : booking.status === "cancelled"
              ? "cancelled"
              : "no-show";
        return (
          <Card
            className={`
              flex flex-col justify-between shadow-md transition hover:shadow-lg
              ${isMobile ? "rounded-lg" : "rounded-2xl"}
              bg-white
              py-4 px-5
              min-h-[170px]
              md:min-h-[130px]
            `}
            key={booking.id}
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3 justify-between">
                <h3 className="font-semibold text-base md:text-lg flex-1 line-clamp-1">{serviceName}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1 ${statusStyles[status].color}`}>
                  {statusStyles[status].icon}
                  {statusStyles[status].label}
                </span>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <MapPin className="h-4 w-4" />
                {artistName}
                {salonName ? <span className="ml-1 text-xs text-gray-400">({salonName})</span> : null}
              </p>
              <div className="flex gap-4 items-center text-xs text-gray-500 mt-2">
                <span className="flex items-center gap-1">
                  <CalendarCheck className="h-4 w-4" />
                  {dateStr}
                </span>
                {timeStr && (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {timeStr}
                  </span>
                )}
              </div>
              {booking.note && (
                <div className="text-xs text-gray-400 mt-2 truncate">{booking.note}</div>
              )}
            </div>
            {/* Show "Book Again" only if artist is active and not cancelled/no-show */}
            {status === "completed" && booking.artist?.id && (
              <div className="mt-3 flex">
                <Button asChild variant="outline" size="sm" className="w-full min-h-[44px] text-sm">
                  <a href={`/artists/${booking.artist.id}`}>Book Again</a>
                </Button>
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default BookingHistory;
