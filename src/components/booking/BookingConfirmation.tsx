
import { Button } from "@/components/ui/button";
import { Check, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function BookingConfirmation({ profile, bookingDetails, onClose }) {
  return (
    <div className="py-6">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <Check className="h-6 w-6 text-green-600" />
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-2">
          Booking Request Sent!
        </h3>
        
        <p className="text-sm text-gray-500 mb-6">
          {profile.full_name} will review your request and confirm your appointment soon.
        </p>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span>
              {format(new Date(bookingDetails.date_requested), "PPP")} at{" "}
              {bookingDetails.time_requested}
            </span>
          </div>
        </div>

        <Button
          onClick={onClose}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          Done
        </Button>
      </div>
    </div>
  );
}
