
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { CustomerBooking } from "./types";
import { format } from "date-fns";

interface MissedAppointmentCardProps {
  booking: CustomerBooking;
  className?: string;
}

const MissedAppointmentCard: React.FC<MissedAppointmentCardProps> = ({ booking, className = "" }) => {
  const formattedDate = booking.date_requested 
    ? format(new Date(booking.date_requested), "MMMM d, yyyy")
    : "Recently";
    
  const serviceName = booking.service?.title || "appointment";
  const artistName = booking.artist?.full_name || "your stylist";

  return (
    <Card className={`bg-red-50 border-red-100 ${className}`}>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              Missed appointment
            </h3>
            <p className="text-gray-700 mb-1">
              You seem to have missed your {serviceName} with {artistName} on {formattedDate}.
            </p>
            <p className="text-sm text-gray-500">
              Want to schedule a new appointment?
            </p>
          </div>
          <div>
            <Button 
              size="sm"
              onClick={() => {
                // Artist profile URL or service booking page
                window.location.href = booking.artist?.id 
                  ? `/artists/${booking.artist.id}`
                  : `/explore/artists`;
              }}
              className="transition-all hover:shadow-md"
            >
              Reschedule
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MissedAppointmentCard;
