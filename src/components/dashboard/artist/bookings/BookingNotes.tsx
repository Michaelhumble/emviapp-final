
import { Booking } from "@/components/dashboard/artist/hooks/useArtistBookings";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AlertTriangle, ChevronDown } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react";

interface BookingNotesProps {
  bookings: Booking[];
}

const BookingNotes = ({ bookings }: BookingNotesProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Filter bookings with notes - ensure we check if note exists and is not empty
  const bookingsWithNotes = bookings.filter(booking => booking.note && booking.note.trim() !== '');
  
  if (bookingsWithNotes.length === 0) {
    return null;
  }
  
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mt-4 border rounded-md overflow-hidden"
    >
      <CollapsibleTrigger className="flex w-full items-center justify-between p-3 bg-yellow-50 hover:bg-yellow-100 transition-colors">
        <div className="flex items-center">
          <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
          <span className="font-medium">
            {bookingsWithNotes.length} {bookingsWithNotes.length > 1 ? t("bookings with special notes") : t("booking with special notes")}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="divide-y">
          {bookingsWithNotes.map((booking) => (
            <div key={booking.id} className="p-3">
              <div className="flex justify-between mb-1">
                <div className="font-medium">{booking.client_name}</div>
                <div className="text-sm text-gray-500">
                  {booking.date_requested || "No date specified"}
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium mr-1">{t("Service:")} </span>
                {booking.service_name}
              </div>
              <div className="mt-2 bg-gray-50 p-2 rounded-md text-sm">
                <span className="font-medium mr-1">{t("Note:")} </span>
                {booking.note}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default BookingNotes;
