
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingFilters as BookingFiltersType } from "@/hooks/useBookingFilters";
import BookingFilters from "../../bookings/BookingFilters";
import { useFilteredBookings } from "@/hooks/useFilteredBookings";
import { useTranslation } from "@/hooks/useTranslation";
import { useCustomerBookings } from "@/hooks/useCustomerBookings";
import CustomerBookingsTable from "./CustomerBookingsTable";
import CustomerBookingNotes from "./CustomerBookingNotes";

/**
 * CustomerBookingsSection - Main component for displaying customer bookings
 * This component has been refactored from a larger file into smaller components
 */
const CustomerBookingsSection = () => {
  const { t } = useTranslation();
  const { bookings, loading, serviceTypes } = useCustomerBookings();
  
  const [filters, setFilters] = useState<BookingFiltersType>({
    status: 'all',
    dateFilter: 'all',
    dateRange: { from: undefined, to: undefined },
    clientType: 'all',
    serviceType: 'all',
    search: '',
    serviceTypes: []
  });
  
  // Apply filters to bookings
  const filteredBookings = useFilteredBookings(bookings, filters);
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle>{t({
          english: "My Bookings",
          vietnamese: "Lịch Hẹn Của Tôi"
        })}</CardTitle>
      </CardHeader>
      
      <CardContent>
        {/* Booking Filters */}
        <div className="mb-4">
          <BookingFilters 
            serviceTypes={serviceTypes}
            onFilterChange={setFilters}
          />
        </div>
        
        {/* Bookings Table */}
        <CustomerBookingsTable 
          bookings={filteredBookings} 
          loading={loading} 
        />
        
        {/* Notes from bookings */}
        <CustomerBookingNotes bookings={filteredBookings} />
      </CardContent>
    </Card>
  );
};

export default CustomerBookingsSection;
