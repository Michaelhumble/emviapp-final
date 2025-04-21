
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { CustomerBooking } from "./types";
import { format } from "date-fns";

interface NextAppointmentCardProps {
  booking: CustomerBooking;
  className?: string;
}

const NextAppointmentCard: React.FC<NextAppointmentCardProps> = ({ booking, className = "" }) => {
  const formattedDate = booking.date_requested 
    ? format(new Date(booking.date_requested), "EEEE, MMMM d, yyyy")
    : "Date to be confirmed";
    
  const serviceName = booking.service?.title || "Service";
  const artistName = booking.artist?.full_name || "Your stylist";

  return (
    <Card className={`bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 ${className}`}>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Your next appointment</h3>
            <p className="text-primary font-medium mb-2">
              {serviceName} with {artistName}
            </p>
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
              {booking.time_requested && (
                <>
                  <Clock className="h-4 w-4 ml-3" />
                  <span>{booking.time_requested}</span>
                </>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => window.location.href = `/bookings/${booking.id}`}
              className="transition-all hover:shadow-md"
            >
              View Details
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.location.href = `/bookings/${booking.id}/reschedule`}
              className="transition-all hover:shadow-md"
            >
              Change
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextAppointmentCard;
