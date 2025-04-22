
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { useArtistBookings } from "../hooks/useArtistBookings";
import { Booking } from "../types/ArtistDashboardTypes";
import { AppointmentCard } from "./AppointmentCard";
import { EmptyAppointments } from "./EmptyAppointments";

export const AppointmentsSection = () => {
  const { bookings = [], loading } = useArtistBookings();
  
  const upcomingAppointments = bookings.filter(booking => 
    booking.status === 'accepted' || booking.status === 'pending'
  );

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl font-serif">
          <CalendarDays className="h-5 w-5 text-primary" />
          Your Appointments
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-lg" />
            ))}
          </div>
        ) : upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        ) : (
          <EmptyAppointments />
        )}
      </CardContent>
    </Card>
  );
};
