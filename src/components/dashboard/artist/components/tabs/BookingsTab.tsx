
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArtistBookings } from "@/hooks/useArtistBookings";
import BookingsTable from "../../bookings/BookingsTable";
import { Calendar } from "lucide-react";

const BookingsTab = () => {
  const {
    bookings,
    loading,
    handleAccept,
    handleDecline
  } = useArtistBookings();

  return (
    <Card className="border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-500" />
          Booking Requests
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <BookingsTable
          bookings={bookings}
          loading={loading}
          handleAccept={handleAccept}
          handleDecline={handleDecline}
        />
      </CardContent>
    </Card>
  );
};

export default BookingsTab;
