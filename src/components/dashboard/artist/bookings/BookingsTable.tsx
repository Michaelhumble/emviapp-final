
import React from "react";
import { 
  Table, TableBody, TableCaption 
} from "@/components/ui/table";
import { Booking } from "@/components/dashboard/artist/types/ArtistDashboardTypes";
import BookingTableHeader from "./BookingTableHeader";
import BookingTableRow from "./BookingTableRow";
import { useTranslation } from "@/hooks/useTranslation";
import { Clock } from "lucide-react";

interface BookingsTableProps {
  bookings: Booking[];
  loading: boolean;
  handleAccept: (bookingId: string) => Promise<void>;
  handleDecline: (bookingId: string) => Promise<void>;
}

const BookingsTable = ({ 
  bookings, 
  loading, 
  handleAccept, 
  handleDecline 
}: BookingsTableProps) => {
  const { t } = useTranslation();
  
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin h-8 w-8 border-2 border-primary rounded-full border-t-transparent mx-auto mb-4"></div>
        <p className="text-gray-500">{t("Loading bookings...")}</p>
      </div>
    );
  }
  
  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md bg-gray-50">
        <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">
          {t("No bookings found")}
        </h3>
        <p className="text-gray-500 max-w-md mx-auto">
          {t("When clients book your services, they will appear here.")}
        </p>
      </div>
    );
  }
  
  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border">
          <BookingTableHeader />
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => (
              <BookingTableRow 
                key={booking.id}
                booking={booking}
                handleAccept={handleAccept}
                handleDecline={handleDecline}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BookingsTable;
