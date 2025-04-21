
import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Clock } from "lucide-react";
import { format } from "date-fns";
import { CustomerBooking } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Props = {
  booking: CustomerBooking;
  isUpcoming?: boolean;
};

const CustomerBookingCard: React.FC<Props> = ({ booking, isUpcoming }) => {
  const [cancelling, setCancelling] = useState(false);

  const handleCancel = async () => {
    if (!window.confirm("Cancel this booking?")) return;
    setCancelling(true);
    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", booking.id);

    if (error) {
      toast.error("Could not cancel booking.");
    } else {
      toast.success("Booking cancelled!");
      // Optionally: Update UI or refetch bookings via parent/hook.
    }
    setCancelling(false);
  };

  return (
    <Card className="rounded-lg border shadow-sm px-4 py-3 flex flex-col gap-2">
      <CardContent className="p-0 flex-1">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-base flex-1 truncate">
            {booking.service?.title || "Booking"}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
              booking.status === "completed"
                ? "bg-green-100 text-green-600"
                : booking.status === "cancelled"
                ? "bg-red-100 text-red-600"
                : booking.status === "confirmed"
                ? "bg-blue-100 text-blue-600"
                : booking.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-50 text-gray-600"
            }`}
          >
            {booking.status?.replace("-", " ") || "Pending"}
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1 text-primary font-medium">
          <span>{booking.artist?.full_name || "Artist/Salon"}</span>
        </div>
        <div className="flex flex-wrap gap-2 text-gray-500 items-center text-[15px]">
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
        {booking.note && (
          <div className="text-xs text-gray-400 mt-2 truncate">{booking.note}</div>
        )}
      </CardContent>
      {isUpcoming && booking.status !== "cancelled" && (
        <CardFooter className="px-0 pt-2">
          <Button
            variant="outline"
            className="w-full border-red-400 text-red-600 hover:bg-red-50"
            size="sm"
            onClick={handleCancel}
            disabled={cancelling}
          >
            {cancelling ? "Cancelling..." : "Cancel Appointment"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CustomerBookingCard;
