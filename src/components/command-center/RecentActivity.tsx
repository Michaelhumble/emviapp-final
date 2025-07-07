
import { Loader2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookingWithDetails } from "../types/ArtistDashboardTypes";
import { useNewArtistStatus } from "@/hooks/useNewArtistStatus";
import { useJobsData } from "@/hooks/useJobsData";

interface RecentActivityProps {
  bookings: BookingWithDetails[];
  isLoading: boolean;
}

// Demo bookings for new artists
const demoBookings = [
  {
    id: "demo-1",
    service_name: "Gel Manicure",
    appointment_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    price: 45,
    client_name: "Sample Client"
  },
  {
    id: "demo-2",
    service_name: "Full Set Acrylics",
    appointment_time: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    price: 65,
    client_name: "Sample Client"
  }
];

const RecentActivity = ({ bookings, isLoading }: RecentActivityProps) => {
  const isNewArtist = useNewArtistStatus();
  const { jobs } = useJobsData();
  
  // Use demo bookings for new artists, otherwise use real bookings
  const displayBookings = isNewArtist ? demoBookings as any[] : bookings;

  // Show recent jobs instead of salon-specific data since salon_id doesn't exist
  const recentJobs = jobs?.slice(0, 3) || [];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Your latest bookings and recent job postings
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[200px]">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="space-y-4">
            {/* Show bookings first */}
            {displayBookings && displayBookings.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Bookings</h4>
                {displayBookings.map((booking) => (
                  <div key={booking.id} className="flex items-center mb-2">
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
            )}
            
            {/* Show recent jobs */}
            {recentJobs.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Recent Job Posts</h4>
                {recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center mb-2">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {job.title || "Job Posting"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {job.location} • {job.category}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {displayBookings.length === 0 && recentJobs.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground/50 mb-2" />
                <p className="text-muted-foreground mb-1">No recent activity</p>
                <p className="text-xs text-muted-foreground/70">
                  {isNewArtist ? 
                    "Complete your profile to start accepting bookings" : 
                    "Activity will appear here when you have bookings or job posts"}
                </p>
              </div>
            )}
            
            {isNewArtist && displayBookings.length > 0 && (
              <p className="text-xs text-center mt-4 text-muted-foreground italic">
                Example data shown
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
