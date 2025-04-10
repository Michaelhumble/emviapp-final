
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBookings } from "./hooks/useBookings";
import { useBookingFilters } from "./hooks/useBookingFilters";
import BookingTable from "./components/BookingTable";
import EmptyBookingState from "./EmptyBookingState";
import BookingFilters from "./components/BookingFilters";
import BookingLoadingState from "./components/BookingLoadingState";
import BookingErrorState from "./components/BookingErrorState";

const SalonBookingManager = () => {
  const { bookings, loading, error, refresh, updateBookingStatus } = useBookings();
  const [activeView, setActiveView] = React.useState<"list" | "calendar">("list");
  
  const {
    statusFilter,
    setStatusFilter,
    dateRange,
    setDateRange,
    filteredBookings,
    resetFilters
  } = useBookingFilters(bookings);
  
  return (
    <Card className="border-blue-100">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg flex items-center">
          <Calendar className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
          Booking Manager
        </CardTitle>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={refresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 flex-shrink-0 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-6">
          <BookingFilters 
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          
          <Tabs 
            value={activeView} 
            onValueChange={(v) => setActiveView(v as "list" | "calendar")}
            className="mt-2"
          >
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar" disabled>Calendar View (Coming Soon)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list">
              {error ? (
                <BookingErrorState error={error} onRetry={refresh} />
              ) : loading ? (
                <BookingLoadingState />
              ) : filteredBookings.length === 0 ? (
                <EmptyBookingState
                  message="No bookings match your filters"
                  showReset={true}
                  onReset={resetFilters}
                />
              ) : (
                <BookingTable 
                  bookings={filteredBookings} 
                  onStatusUpdate={updateBookingStatus} 
                />
              )}
            </TabsContent>
            
            <TabsContent value="calendar">
              <div className="py-12 text-center">
                <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4 flex-shrink-0" />
                <h3 className="text-lg font-medium mb-2">Calendar View Coming Soon</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  We're working on a calendar view that will help you visualize your bookings more effectively.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonBookingManager;
