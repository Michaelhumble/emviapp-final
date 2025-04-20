
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calendar,
  Clock, 
  CheckCircle,
  ChevronRight
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface Booking {
  id: string;
  date_requested: string;
  time_requested: string;
  status: string;
  note: string;
  sender: {
    id: string;
    full_name: string;
    avatar_url: string;
  };
  service: {
    id: string;
    title: string;
    price: number;
  };
}

interface UpcomingAppointmentListProps {
  bookings: Booking[];
  loading: boolean;
  limit?: number;
}

const UpcomingAppointmentList = ({ 
  bookings, 
  loading,
  limit = 3
}: UpcomingAppointmentListProps) => {
  const navigate = useNavigate();
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      return format(parseISO(dateStr), "MMM d, yyyy");
    } catch (error) {
      return dateStr;
    }
  };
  
  const handleMarkComplete = async (e: React.MouseEvent, bookingId: string) => {
    e.stopPropagation();
    
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "completed" })
        .eq("id", bookingId);
      
      if (error) throw error;
      
      toast.success("Booking marked as completed!");
    } catch (error) {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking status");
    }
  };
  
  const handleViewBooking = (bookingId: string) => {
    navigate(`/bookings/${bookingId}`);
  };
  
  // Filter and limit the bookings to show
  const displayBookings = bookings
    .filter(b => b.status !== "completed" && b.status !== "cancelled")
    .slice(0, limit);
  
  return (
    <>
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-20 w-full rounded-md" />
          ))}
        </div>
      ) : displayBookings.length === 0 ? (
        <div className="text-center py-8 bg-muted/20 rounded-lg">
          <Calendar className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <h3 className="text-lg font-medium">No upcoming appointments</h3>
          <p className="text-muted-foreground mt-1">
            You're all caught up!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayBookings.map(booking => (
            <Card 
              key={booking.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleViewBooking(booking.id)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{booking.service?.title || "Service"}</h3>
                      <p className="text-sm text-muted-foreground">
                        {booking.sender?.full_name || "Client"}
                      </p>
                    </div>
                    <Badge variant={booking.status === "pending" ? "outline" : "default"}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {formatDate(booking.date_requested)}
                    </div>
                    {booking.time_requested && (
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {booking.time_requested}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center pt-1">
                    {booking.status === "accepted" && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-green-600 border-green-200 hover:bg-green-50"
                        onClick={(e) => handleMarkComplete(e, booking.id)}
                      >
                        <CheckCircle className="h-3.5 w-3.5 mr-1" />
                        Mark Complete
                      </Button>
                    )}
                    {booking.status === "pending" && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewBooking(booking.id);
                        }}
                      >
                        Respond
                      </Button>
                    )}
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};

export default UpcomingAppointmentList;
