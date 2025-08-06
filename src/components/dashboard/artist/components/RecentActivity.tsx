
import { Loader2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookingWithDetails } from "../types/ArtistDashboardTypes";
import { useNewArtistStatus } from "@/hooks/useNewArtistStatus";

interface RecentActivityProps {
  bookings: BookingWithDetails[];
  isLoading: boolean;
}

const RecentActivity = ({ bookings, isLoading }: RecentActivityProps) => {
  const isNewArtist = useNewArtistStatus();
  
  // Always use real bookings from Supabase
  const displayBookings = bookings || [];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Your latest bookings and client interactions
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : displayBookings && displayBookings.length > 0 ? (
          <div className="space-y-4">
            {displayBookings.map((booking) => (
              <div key={booking.id} className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {booking.service_name || "Nail Service"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(booking.appointment_time || "").toLocaleString()}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  ${booking.price || 0}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground/50 mb-2" />
            <p className="text-muted-foreground mb-1">No bookings yet</p>
            <p className="text-xs text-muted-foreground/70">
              {isNewArtist ? 
                "Complete your profile to start accepting bookings" : 
                "Bookings will appear here when clients book with you"}
            </p>
          </div>
        )}
        
        {isNewArtist && (
          <p className="text-xs text-center mt-4 text-muted-foreground italic">
            Example data shown
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
