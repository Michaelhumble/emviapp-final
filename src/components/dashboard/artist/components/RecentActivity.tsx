
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookingWithDetails } from "../types/ArtistDashboardTypes";

interface RecentActivityProps {
  bookings: BookingWithDetails[];
  isLoading: boolean;
}

const RecentActivity = ({ bookings, isLoading }: RecentActivityProps) => {
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
        ) : bookings && bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
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
          <div className="text-center py-8 text-muted-foreground">
            No recent bookings found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
