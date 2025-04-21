
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Clock } from "lucide-react";
import { format } from "date-fns";
import { CustomerBooking } from "./types";

type BookingCardProps = {
  booking: CustomerBooking;
  mode?: "desktop" | "mobile";
  onView?: (id: string) => void;
  onReschedule?: (id: string) => void;
  onCancel?: (id: string) => void;
};

const statusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "pending":
    case "needs-action":
      return "bg-red-100 text-red-700";
    case "cancelled":
      return "bg-gray-100 text-red-400";
    case "completed":
      return "bg-gray-100 text-gray-500";
    default:
      return "bg-gray-50 text-gray-600";
  }
};

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  mode = "desktop",
  onView,
  onReschedule,
  onCancel,
}) => {
  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onView) onView(booking.id);
  };
  const handleReschedule = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onReschedule) onReschedule(booking.id);
  };
  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onCancel) onCancel(booking.id);
  };
  const isUpcoming =
    booking.status === "pending" || booking.status === "confirmed";
  const canReschedule = isUpcoming;
  const canCancel = isUpcoming;

  return (
    <Card className="w-full rounded-2xl shadow-sm transition group cursor-pointer border border-gray-100">
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-base md:text-lg flex-1">
            {booking.service?.title || "Booking"}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ml-3 ${statusColor(
              booking.status || ""
            )}`}
          >
            {booking.status?.replace("-", " ") || "Pending"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-primary mt-1 text-[15px] font-medium">
          <span>
            {booking.artist?.full_name ||
              booking.artist?.name ||
              "Artist/Salon"}
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-gray-500 items-center text-[15px] mb-0">
          {booking.date_requested && (
            <span className="flex items-center gap-1">
              <CalendarCheck className="h-4 w-4" />
              {format(new Date(booking.date_requested), "MMM d, yyyy")}
            </span>
          )}
          {booking.time_requested && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {booking.time_requested}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-3 px-4 flex gap-3 flex-col xs:flex-row items-stretch xs:items-center">
        <Button
          variant="secondary"
          size={mode === "mobile" ? "lg" : "sm"}
          className="w-full xs:w-auto"
          onClick={handleView}
        >
          View Details
        </Button>
        {canReschedule && (
          <Button
            variant="outline"
            size={mode === "mobile" ? "lg" : "sm"}
            className="w-full xs:w-auto border-blue-400 text-blue-600 hover:bg-blue-50"
            onClick={handleReschedule}
          >
            Reschedule
          </Button>
        )}
        {canCancel && (
          <Button
            variant="outline"
            size={mode === "mobile" ? "lg" : "sm"}
            className="w-full xs:w-auto border-red-400 text-red-600 hover:bg-red-50"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BookingCard;
