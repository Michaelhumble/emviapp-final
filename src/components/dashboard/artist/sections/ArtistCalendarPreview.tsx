import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ExternalLink, Clock, UserPlus, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import ComingSoonModal from "@/components/common/ComingSoonModal";
import { useArtistUpcomingBookings } from "@/hooks/useArtistUpcomingBookings";
import BookClientModal from "./BookClientModal";

const statusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-blue-100 text-blue-700";
    case "accepted":
      return "bg-emerald-100 text-emerald-700";
    case "pending":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const ArtistCalendarPreview = () => {
  const { bookings, loading, error } = useArtistUpcomingBookings();
  const [modalOpen, setModalOpen] = useState(false);
  const [clientModalOpen, setClientModalOpen] = useState(false);

  const handleMockBooking = (newBooking: any) => {
    // Now just a UI callback - data is saved in Supabase via the modal
    console.log("Booking created:", newBooking);
  };

  return (
    <Card className="border-gray-100 shadow-sm bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-2xl">
      <ComingSoonModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        featureName="Manage Appointments"
      />
      <BookClientModal
        open={clientModalOpen}
        onClose={() => setClientModalOpen(false)}
        onBook={handleMockBooking}
      />
      <CardHeader className="pb-3 flex flex-row items-center justify-between bg-gradient-to-r from-white via-purple-50 to-pink-50 rounded-t-2xl">
        <CardTitle className="text-lg font-medium text-gray-900 flex items-center font-playfair">
          <CalendarDays className="h-5 w-5 mr-2 text-emvi-accent" />
          Upcoming Appointments
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center font-semibold bg-gradient-to-r from-emvi-accent/80 to-pink-400/80 text-white hover:scale-105 transition-transform shadow"
            onClick={() => setClientModalOpen(true)}
          >
            <UserPlus className="h-4 w-4 mr-1" />
            Book Client
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link
              to="/dashboard/artist/booking-calendar"
              className="flex items-center px-2 font-medium text-emvi-accent"
            >
              Manage Appointments
              <ExternalLink className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loading ? (
              <div className="col-span-3 flex justify-center items-center py-16">
                <Loader className="h-8 w-8 animate-spin text-emvi-accent" />
              </div>
            ) : error ? (
              <div className="col-span-3 text-center py-8 text-gray-500">
                <p className="mb-2">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : bookings.length === 0 ? (
              <div className="col-span-3 text-center py-8 text-gray-500">
                No appointments yet. Start promoting your services to attract clients or book a client directly!
              </div>
            ) : (
              bookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  className={`p-4 rounded-lg border border-opacity-40 ${statusBadge(booking.status)} bg-white/80 shadow`}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-900 font-playfair">
                        {booking.client_name || "Client"}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{booking.service_type || "Service"}</p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadge(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </div>
                  </div>
                  <div className="flex items-center mt-3 text-sm text-gray-600">
                    <CalendarDays className="h-4 w-4 mr-1.5 text-gray-400" />
                    <span>
                      {booking.appointment_date || booking.date_requested
                        ? new Date(booking.appointment_date || booking.date_requested).toLocaleDateString()
                        : "-"}
                    </span>
                    <Clock className="h-4 w-4 ml-3 mr-1.5 text-gray-400" />
                    <span>{booking.appointment_time || booking.time_requested || "-"}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistCalendarPreview;
