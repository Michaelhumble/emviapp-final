
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { BookingFilters as BookingFiltersType } from "@/hooks/useBookingFilters";
import { useFilteredBookings } from "@/hooks/useFilteredBookings";
import { useTranslation } from "@/hooks/useTranslation";
import BookingFilters from "../bookings/BookingFilters";
import BookingCountsDisplay from "./bookings/BookingCountsDisplay";
import BookingsTable from "./bookings/BookingsTable";
import BookingNotes from "./bookings/BookingNotes";
import { useArtistBookings, Booking as ArtistBooking } from "./hooks/useArtistBookings";

const ArtistBookingsPanel = () => {
  const { userProfile } = useAuth();
  const { t } = useTranslation();
  const {
    bookings,
    counts,
    loading,
    serviceTypes,
    handleAccept,
    handleDecline
  } = useArtistBookings();
  
  const [filters, setFilters] = useState<BookingFiltersType>({
    status: 'all',
    dateFilter: 'all',
    dateRange: { from: undefined, to: undefined },
    clientType: 'all',
    serviceType: 'all',
    search: '',
    serviceTypes: [] // This is now valid since we added it to the type
  });
  
  // Convert serviceTypes to the expected format for BookingFilters
  const formattedServiceTypes = serviceTypes.map(service => typeof service === 'string' 
    ? service 
    : (service as any).label || service);
  
  // Apply filters to bookings
  const filteredBookings = useFilteredBookings(
    bookings as any[], // Type assertion to avoid incompatible booking types
    filters
  );
  
  return (
    <Card className="overflow-hidden bg-white/85 backdrop-blur-sm shadow-md border-0 mb-8">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b pb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h2 className="text-lg font-serif font-semibold">
            {t({ english: "My Bookings", vietnamese: "Lịch Hẹn Của Tôi" })}
          </h2>
          
          <BookingCountsDisplay counts={counts} />
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        {/* Booking Filters */}
        <div className="mb-4">
          <BookingFilters 
            serviceTypes={formattedServiceTypes} // Now this prop is expected by the component
            onFiltersChange={setFilters}
          />
        </div>
        
        {/* Bookings Table */}
        <BookingsTable 
          bookings={filteredBookings as ArtistBooking[]}
          loading={loading}
          handleAccept={handleAccept}
          handleDecline={handleDecline}
        />
        
        {/* Booking Notes */}
        <BookingNotes bookings={filteredBookings as ArtistBooking[]} />
      </CardContent>
    </Card>
  );
};

export default ArtistBookingsPanel;
