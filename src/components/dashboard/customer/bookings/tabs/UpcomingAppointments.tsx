
import React from "react";
import { Calendar } from "lucide-react";
import CustomerBookingsTabContent from "../CustomerBookingsTabContent";

interface UpcomingAppointmentsProps {
  show: boolean;
  bookings: any[];
  loading: boolean;
  isMobile: boolean;
  onView: (id: string) => void;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
}

const friendlyEmpty = {
  title: "No beauty plans yet? Let’s fix that.",
  body: "Explore top artists, schedule something wonderful, and your beauty story begins here.",
  cta: "Explore Artists",
  ctaHref: "/explore/artists",
};

export default function UpcomingAppointments({
  show,
  bookings,
  loading,
  isMobile,
  onView,
  onReschedule,
  onCancel
}: UpcomingAppointmentsProps) {
  if (!show) return null;

  return (
    <div className="mt-6">
      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-14 px-4 gap-3 bg-gradient-to-tr from-purple-50 via-indigo-50 to-pink-50 rounded-2xl border border-purple-100 shadow-md">
          <Calendar className="h-12 w-12 text-purple-200 mb-4" />
          <h3 className="font-serif text-2xl font-semibold text-emvi-dark text-center mb-1">
            💅 {friendlyEmpty.title}
          </h3>
          <p className="text-gray-500 mb-4 text-center max-w-md">{friendlyEmpty.body}</p>
          <button
            className="rounded-full px-8 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-xl hover:bg-purple-600 transition text-base"
            onClick={() => (window.location.href = friendlyEmpty.ctaHref)}
          >
            {friendlyEmpty.cta}
          </button>
        </div>
      ) : (
        <CustomerBookingsTabContent
          bookings={bookings}
          loading={loading}
          emptyType="upcoming"
          isMobile={isMobile}
          cardType="upcoming"
          onView={onView}
          onReschedule={onReschedule}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}
