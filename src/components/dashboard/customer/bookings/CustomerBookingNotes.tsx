import { format, parseISO } from "date-fns";
import { Booking } from "@/components/dashboard/artist/types/ArtistDashboardTypes";
import { useTranslation } from "@/hooks/useTranslation";

interface CustomerBookingNotesProps {
  bookings: Booking[];
}

const CustomerBookingNotes = ({ bookings }: CustomerBookingNotesProps) => {
  const { t } = useTranslation();
  
  const formatDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), "MMM dd, yyyy");
    } catch (error) {
      return dateStr;
    }
  };
  
  // Filter bookings with notes and take the first 3
  const bookingsWithNotes = bookings
    .filter(b => b.note)
    .slice(0, 3);

  if (bookingsWithNotes.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-6">
      <h3 className="font-medium mb-2">{t({
        english: "Your Notes",
        vietnamese: "Ghi Chú Của Bạn"
      })}</h3>
      <div className="space-y-3">
        {bookingsWithNotes.map(b => (
          <div key={`note-${b.id}`} className="p-3 bg-gray-50 rounded-md">
            <div className="font-medium text-sm">
              {b.artist_name || "Artist"} - {formatDate(b.date_requested)}
            </div>
            <div className="text-gray-600 text-sm mt-1">{b.note}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerBookingNotes;
