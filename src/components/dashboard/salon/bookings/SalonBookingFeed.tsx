
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, User, Scissors, Calendar, 
  CheckCircle2, AlertCircle, Clock3
} from "lucide-react";

// All booking data comes from real-time Supabase queries

type BookingStatus = "all" | "today" | "upcoming" | "completed";

const SalonBookingFeed = () => {
  const [filterStatus, setFilterStatus] = useState<BookingStatus>("today");
  
  // Format duration to display nicely
  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} hr`;
    }
    
    return `${hours} hr ${remainingMinutes} min`;
  };
  
  // Get status badge component
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Confirmed</Badge>;
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">{status}</Badge>;
    }
  };
  
  // For now, show empty state - real bookings will be loaded from Supabase
  const filteredBookings: any[] = [];
  
  return (
    <Card className="mt-8">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Bookings Overview</CardTitle>
        </div>
        <Tabs value={filterStatus} onValueChange={(value) => setFilterStatus(value as BookingStatus)}>
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-[400px] overflow-y-auto p-1">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="mx-auto h-8 w-8 mb-2 text-muted-foreground/60" />
              <p>No bookings found</p>
            </div>
          ) : (
            filteredBookings.map(booking => (
              <Card key={booking.id} className="overflow-hidden border border-muted">
                <div className="flex flex-col md:flex-row">
                  {/* Time section */}
                  <div className="bg-muted/20 p-4 flex flex-row md:flex-col items-center justify-center md:min-w-[100px] md:w-[100px] border-b md:border-b-0 md:border-r border-muted">
                    <Clock className="h-4 w-4 mb-0 md:mb-2 mr-2 md:mr-0 text-muted-foreground" />
                    <div className="text-center font-medium">{booking.time}</div>
                  </div>
                  
                  {/* Booking details */}
                  <div className="flex-1 p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">{booking.customerName}</span>
                        </div>
                        <div className="flex items-center mt-1 text-sm">
                          <Scissors className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{booking.serviceName}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:gap-1">
                        {getStatusBadge(booking.status)}
                        <div className="text-sm text-muted-foreground">
                          {formatDuration(booking.duration)}
                        </div>
                      </div>
                    </div>
                    
                    {booking.technician && (
                      <div className="mt-2 pt-2 border-t border-muted flex items-center">
                        <div className="text-sm text-muted-foreground flex items-center">
                          <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mr-2"></span>
                          Assigned to: <span className="font-medium ml-1">{booking.technician}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonBookingFeed;
