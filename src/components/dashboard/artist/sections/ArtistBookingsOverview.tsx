
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { useArtistUpcomingBookings } from "@/hooks/artist/useArtistUpcomingBookings";

// Status badge styling
const statusBadgeStyle = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-emerald-100 text-emerald-700 border-none";
    case "accepted":
      return "bg-emerald-100 text-emerald-700 border-none";
    case "pending":
      return "bg-amber-100 text-amber-700 border-none";
    default:
      return "bg-gray-100 text-gray-700 border-none";
  }
};

const ArtistBookingsOverview = () => {
  const { bookings, loading, error } = useArtistUpcomingBookings();
  const previewBookings = bookings.slice(0, 5);

  return (
    <section className="max-w-4xl mx-auto w-full">
      <Card className="border-0 shadow-none bg-white/70">
        <CardHeader className="pb-1 bg-gradient-to-r from-[#E5DEFF] via-[#fff] to-[#F1F0FB] rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-playfair font-semibold text-[#1A1F2C]">
              My Bookings Overview
            </CardTitle>
            <Button
              variant="ghost"
              className="text-emvi-accent font-medium px-3 py-1 hover:bg-emvi-offwhite/70 transition rounded-md"
              tabIndex={-1}
              aria-label="View All Bookings"
            >
              View All Bookings
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-3 pb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {loading ? (
              [1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="rounded-xl bg-gradient-to-br from-[#f7f6fd] to-white shadow-[0_2px_12px_0_rgba(146,120,202,0.08)] p-4 min-h-[148px] animate-pulse"
                />
              ))
            ) : error ? (
              <div className="col-span-3 text-center py-8 text-gray-500">{error}</div>
            ) : previewBookings.length === 0 ? (
              <div className="col-span-3 text-center py-8 text-gray-500">
                No appointments yet. Start promoting your services to attract clients!
              </div>
            ) : (
              previewBookings.map((booking) => (
                <motion.div
                  key={booking.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group transition-all"
                >
                  <div className="rounded-xl bg-gradient-to-br from-[#f7f6fd] to-white shadow-[0_2px_12px_0_rgba(146,120,202,0.08)] p-4 flex flex-col gap-3 cursor-pointer min-h-[148px]">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-[#7E69AB]" />
                      <span className="font-medium text-[#1A1F2C] font-playfair text-base truncate">
                        {booking.client_name || "Client"}
                      </span>
                      <Badge
                        variant="outline"
                        className={`${statusBadgeStyle(booking.status)} ml-auto px-2 py-0.5 rounded-full text-xs font-medium shadow backdrop-blur-sm`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-4 mt-1">
                      <CalendarDays className="h-3.5 w-3.5 mr-1 text-[#bfa9ee]" />
                      <span>
                        {booking.appointment_date
                          ? new Date(booking.appointment_date).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 gap-4">
                      <Clock className="h-3.5 w-3.5 mr-1 text-[#bfa9ee]" />
                      <span>{booking.appointment_time || "-"}</span>
                    </div>
                    <div className="flex items-center text-sm text-emvi-accent font-semibold mt-0">
                      {booking.service_type || "-"}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ArtistBookingsOverview;

