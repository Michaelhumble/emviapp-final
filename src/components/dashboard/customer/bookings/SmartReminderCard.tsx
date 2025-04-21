
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { CustomerBooking } from "./types";
import { formatDistanceToNow } from "date-fns";

interface SmartReminderCardProps {
  lastService: CustomerBooking;
  className?: string;
}

const SmartReminderCard: React.FC<SmartReminderCardProps> = ({ lastService, className = "" }) => {
  const timeAgo = lastService.date_requested 
    ? formatDistanceToNow(new Date(lastService.date_requested), { addSuffix: true })
    : "a while ago";
    
  const serviceName = lastService.service?.title || "service";
  const artistName = lastService.artist?.full_name || "your stylist";

  return (
    <Card className={`bg-amber-50 border-amber-100 ${className}`}>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <h3 className="text-base font-medium text-gray-800 mb-1">Time for a refresh?</h3>
            <p className="text-gray-700 mb-1">
              Your last {serviceName} with {artistName} was {timeAgo}.
            </p>
            <p className="text-sm text-gray-500">
              Our clients typically book this service every 4-6 weeks.
            </p>
          </div>
          <div>
            <Button 
              variant="default" 
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 text-white transition-all hover:shadow-md"
              onClick={() => {
                // Direct to artist profile or booking page
                window.location.href = lastService.artist?.id 
                  ? `/artists/${lastService.artist.id}`
                  : `/explore/artists`;
              }}
            >
              Book Again
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartReminderCard;
