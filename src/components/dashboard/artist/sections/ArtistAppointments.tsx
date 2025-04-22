
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Loader, X, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useArtistUpcomingBookings } from "@/hooks/artist/useArtistUpcomingBookings";

const statusStyles: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-900",
  accepted: "bg-emerald-100 text-emerald-800",
  confirmed: "bg-blue-100 text-blue-800",
  declined: "bg-red-100 text-red-800",
  completed: "bg-gray-100 text-gray-700",
  cancelled: "bg-gray-50 text-gray-400",
};

const statusIcon = (status: string) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4 mr-1" />;
    case "accepted":
      return <Check className="h-4 w-4 mr-1" />;
    case "confirmed":
      return <Check className="h-4 w-4 mr-1" />;
    case "declined":
      return <X className="h-4 w-4 mr-1" />;
    case "completed":
      return <Check className="h-4 w-4 mr-1" />;
    case "cancelled":
      return <X className="h-4 w-4 mr-1" />;
    default:
      return <Clock className="h-4 w-4 mr-1" />;
  }
};

function formatDate(date: string | null | undefined) {
  if (!date) return "-";
  try {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return date;
  }
}

export default function ArtistAppointments() {
  const { bookings, loading, error } = useArtistUpcomingBookings();

  return (
    <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-3 flex flex-row items-center justify-between bg-gradient-to-r from-[#F1F0FB] to-[#E5DEFF] rounded-t-lg">
        <CardTitle className="text-lg font-medium text-emvi-dark flex items-center gap-2 font-serif">
          <Calendar className="h-5 w-5 text-primary" />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {loading ? (
          <div className="flex flex-col gap-3 px-6 py-10 sm:px-8 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex gap-4 items-center rounded-xl bg-gray-100/60 py-4 px-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#E5DEFF] to-[#F1F0FB]" />
                <div className="flex-1 space-y-2">
                  <div className="w-3/5 h-3.5 bg-gray-200 rounded" />
                  <div className="w-2/5 h-3 bg-gray-200 rounded" />
                </div>
                <div className="h-6 w-16 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="py-14 text-center flex flex-col items-center gap-3">
            <Loader className="h-7 w-7 text-gray-400 mb-2 animate-spin" />
            <p className="text-gray-500">{error}</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-3 xs:px-8 gap-3 rounded-xl bg-gradient-to-br from-purple-50/60 to-white/90 animate-fade-in">
            <Calendar className="h-10 w-10 text-purple-400 mb-2" />
            <h3 className="font-serif text-xl font-semibold text-emvi-dark text-center mb-1">
              No upcoming appointments yet.
            </h3>
            <p className="text-gray-500 mb-3 text-center max-w-sm">
              Share your booking link to start filling your calendar!
            </p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-gray-100">
            <AnimatePresence initial={false}>
              {bookings.map((b) => (
                <motion.div
                  key={b.id}
                  className="flex flex-col xs:flex-row xs:items-center py-5 px-4 gap-2 bg-transparent hover:bg-[#F8F8FC] transition rounded-none xs:rounded-xl"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex-1 flex flex-row items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-50 to-[#F1F0FB] flex items-center justify-center text-xl font-semibold text-[#7961BA]">
                      {b.client_name?.charAt(0) || "?"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-md truncate text-emvi-dark">
                        {b.client_name || "Client"}
                      </div>
                      <div className="text-xs flex gap-2 text-gray-500 mt-0.5">
                        {b.service_type && (
                          <span className="line-clamp-1">{b.service_type}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col xs:items-end gap-1 pr-2">
                    <div className="flex gap-1 text-sm font-medium">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                      {formatDate(b.appointment_date)}
                    </div>
                    <div className="flex gap-1 items-center text-xs font-medium text-emvi-accent">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      {b.appointment_time ?? "-"}
                    </div>
                    <span className={`mt-0.5 inline-flex items-center px-2 py-1 rounded-full text-xs shadow font-playfair ${statusStyles[b.status] || "bg-gray-100 text-gray-700"}`}>
                      {statusIcon(b.status)}
                      {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

