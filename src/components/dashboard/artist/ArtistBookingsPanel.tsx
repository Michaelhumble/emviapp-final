
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { BookingFilters as BookingFiltersType } from "@/hooks/useBookingFilters";
import { useFilteredBookings } from "@/hooks/useFilteredBookings";
import { useTranslation } from "@/hooks/useTranslation";
import BookingFilters from "../bookings/BookingFilters";
import BookingCountsDisplay from "./bookings/BookingCountsDisplay";
import BookingsTable from "./bookings/BookingsTable";
import BookingNotes from "./bookings/BookingNotes";
import { useArtistBookings } from "@/hooks/useArtistBookings";
import { format } from "date-fns";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ArtistBookingsPanel = () => {
  const { userProfile } = useAuth();
  const { t } = useTranslation();
  const {
    bookings,
    counts,
    loading,
    serviceTypes,
    handleAccept,
    handleDecline,
    refreshBookings
  } = useArtistBookings();
  
  const [filters, setFilters] = useState<BookingFiltersType>({
    status: 'all',
    dateFilter: 'all',
    dateRange: { from: undefined, to: undefined },
    clientType: 'all',
    serviceType: 'all',
    search: '',
    serviceTypes: []
  });
  
  // Ensure counts has all the required properties for BookingCountsDisplay
  const displayCounts = {
    pending: counts.pending,
    accepted: counts.accepted || 0, // Provide default values if undefined
    completed: counts.completed || 0,
    total: counts.total || 0,
    upcoming: counts.upcoming || 0
  };
  
  // Refresh bookings when component mounts
  useEffect(() => {
    refreshBookings();
  }, [refreshBookings]);
  
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
    <Card className="overflow-hidden bg-white/95 backdrop-blur-sm shadow-md">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b pb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <h2 className="text-lg font-serif font-semibold">
            {t({ english: "My Bookings", vietnamese: "Lịch Hẹn Của Tôi" })}
          </h2>
          
          <BookingCountsDisplay counts={displayCounts} />
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        {/* Booking Filters */}
        <div className="mb-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {loading ? (
          // Skeleton loading state
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-1/4" />
                  <Skeleton className="h-6 w-1/6" />
                </div>
                <div className="mt-2 flex items-center">
                  <Skeleton className="h-4 w-1/3 mr-2" />
                  <Skeleton className="h-4 w-1/5" />
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Skeleton className="h-9 w-20" />
                  <Skeleton className="h-9 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredBookings.length > 0 ? (
          // Booking list
          <div className="space-y-4">
            {filteredBookings.map((booking: any) => (
              <Card key={booking.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <div className="font-medium flex items-center mb-2 md:mb-0">
                      <span className="mr-2">{booking.client_name}</span>
                      <Badge variant={
                        booking.status === 'pending' ? 'outline' : 
                        booking.status === 'accepted' ? 'secondary' : 
                        booking.status === 'completed' ? 'default' : 'destructive'
                      }>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {booking.date_requested ? format(new Date(booking.date_requested), 'MMM dd, yyyy') : 'No date'}
                      <span className="mx-1">•</span>
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {booking.time_requested || 'No time'}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <span className="font-medium text-primary mr-2">Service:</span>
                    {booking.service_name || 'General service'}
                  </div>
                  
                  {booking.note && (
                    <div className="mb-4 p-3 bg-muted/50 rounded-md text-sm">
                      <p className="text-muted-foreground">{booking.note}</p>
                    </div>
                  )}
                  
                  {booking.status === 'pending' && (
                    <div className="flex justify-end space-x-3">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-200 text-red-600 hover:bg-red-50" 
                        onClick={() => handleDecline(booking.id)}
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleAccept(booking.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground/60 mb-4" />
            <h3 className="text-lg font-medium mb-2">No bookings found</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any bookings that match your filters.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setFilters({
                  status: 'all',
                  dateFilter: 'all',
                  dateRange: { from: undefined, to: undefined },
                  clientType: 'all',
                  serviceType: 'all',
                  search: '',
                  serviceTypes: []
                });
                refreshBookings();
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ArtistBookingsPanel;
