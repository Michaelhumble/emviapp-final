import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArtistBookings } from "@/hooks/artist/useArtistBookings";
import { Calendar, ListCheck, Plus } from "lucide-react";
import AddBookingModal from "./AddBookingModal";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

const BookingsTab = () => {
  const { bookings, loading, error, refresh } = useArtistBookings();
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <Card className="border-purple-100">
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 flex flex-col md:flex-row md:items-center md:justify-between">
        <CardTitle className="text-lg flex items-center gap-2">
          <ListCheck className="h-5 w-5 text-purple-500" />
          View All Bookings
        </CardTitle>
        <button
          className="ml-0 md:ml-4 flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition"
          onClick={() => setShowModal(true)}
          type="button"
        >
          <Plus className="h-4 w-4" />
          Add Booking
        </button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[480px] overflow-y-auto px-6 py-4">
          {loading ? (
            <div className="space-y-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-full h-20 bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="flex flex-col h-full items-center justify-center p-12 text-gray-500">
              {error}
            </div>
          ) : bookings.length === 0 ? (
            <div className="flex flex-col h-full items-center justify-center p-12 text-gray-500">
              <Calendar className="h-10 w-10 mb-2" />
              You have no bookings yet. Promote your profile to get your first client!
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {bookings.map((b) => (
                <li
                  key={b.id}
                  className="rounded-lg bg-white/90 border border-gray-100 p-4 flex flex-col md:flex-row md:items-center md:justify-between shadow-sm"
                >
                  <div>
                    <div className="font-medium text-base text-gray-900">{b.client_name || "Client"}</div>
                    <div className="text-sm text-gray-600">{b.service_type || "-"}</div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-6 mt-2 md:mt-0">
                    <div className="flex items-center text-sm text-gray-500 mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {b.appointment_date
                          ? new Date(b.appointment_date).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mr-4">
                      <span>
                        {b.appointment_time ? b.appointment_time : "-"}
                      </span>
                    </div>
                    <span
                      className={`inline-block min-w-24 text-center px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(
                        b.status
                      )} ml-2`}
                    >
                      {b.status ? b.status.charAt(0).toUpperCase() + b.status.slice(1) : ""}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CardContent>
      <AddBookingModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onBookingAdded={refresh}
        supabase={supabase}
        user={user}
      />
    </Card>
  );
};

export default BookingsTab;
