import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import BookingsTabs from "./BookingsTabs";
import { useCustomerBookings } from "@/hooks/useCustomerBookings";
import { Calendar } from "lucide-react";
import { isNeedsAttention } from "./utils";
// Import new subcomponents
import UpcomingAppointments from "./tabs/UpcomingAppointments";
import NeedsAttention from "./tabs/NeedsAttention";
import PastAppointments from "./tabs/PastAppointments";
import CancelledAppointments from "./tabs/CancelledAppointments";

const motivationalSubline =
  "Track your appointments, rewards, and favorite pros — all in one calming space.";

export const CustomerBookingsCenter: React.FC = () => {
  const { bookings, loading, error } = useCustomerBookings();
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "past" | "needs" | "canceled"
  >("upcoming");

  const now = new Date();

  const upcoming = bookings
    .filter(
      (b) =>
        (b.status === "pending" || b.status === "confirmed") &&
        (!b.date_requested ||
          new Date(b.date_requested) >= new Date(new Date().toDateString()))
    )
    .sort((a, b) => {
      if (a.date_requested && b.date_requested) {
        return (
          new Date(a.date_requested).getTime() -
          new Date(b.date_requested).getTime()
        );
      }
      return 0;
    });

  const past = bookings
    .filter((b) => b.status === "completed")
    .sort((a, b) => {
      if (a.date_requested && b.date_requested) {
        return (
          new Date(b.date_requested).getTime() -
          new Date(a.date_requested).getTime()
        );
      }
      return 0;
    });

  const needsAttention = bookings
    .filter((b) => isNeedsAttention(b.status))
    .sort((a, b) => {
      if (a.status === "pending") return -1;
      if (b.status === "pending") return 1;
      return 0;
    });

  const canceled = bookings
    .filter((b) => b.status === "cancelled")
    .sort((a, b) => {
      if (a.date_requested && b.date_requested) {
        return (
          new Date(b.date_requested).getTime() -
          new Date(a.date_requested).getTime()
        );
      }
      return 0;
    });

  function handleViewBooking(id: string) {
    window.location.href = `/bookings/${id}`;
  }

  function handleRescheduleBooking(id: string) {
    window.location.href = `/bookings/${id}/reschedule`;
  }

  function handleCancelBooking(id: string) {
    window.location.href = `/bookings/${id}/cancel`;
  }

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const tabs = [
    {
      value: "upcoming",
      label: "Upcoming",
      count: upcoming.length,
    },
    {
      value: "needs",
      label: "Needs Attention",
      count: needsAttention.length,
      hasAttention: needsAttention.length > 0,
    },
    {
      value: "past",
      label: "Past",
      count: past.length,
    },
    {
      value: "canceled",
      label: "Canceled",
      count: canceled.length,
    },
  ];

  const handleTabChange = (value: string) => {
    if (
      value === "upcoming" ||
      value === "past" ||
      value === "needs" ||
      value === "canceled"
    ) {
      setActiveTab(value);
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto">
      {/* Mobile card with rounded header and accent color */}
      <div className="rounded-3xl overflow-hidden bg-gradient-to-tr from-purple-50 via-white to-pink-50 border border-purple-100 shadow-lg mb-4">
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-4 sm:py-5 gap-1 bg-white/70 backdrop-blur-sm">
          <h2 className="font-playfair font-bold flex items-center gap-1.5 text-xl sm:text-2xl text-emvi-dark">
            <span className="hidden sm:inline">
              <Calendar className="h-6 w-6 text-purple-500" />
            </span>
            <span>Your Beauty Calendar</span>
          </h2>
        </div>
        <div className="text-gray-600 text-sm sm:text-base font-light text-center px-3 pb-4">
          {motivationalSubline}
        </div>
      </div>
      <div className="bg-white/90 rounded-3xl shadow-md border border-purple-100 p-2 sm:p-4 space-y-3">
        <Tabs
          defaultValue="upcoming"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          {/* Tabs in mobile chips style */}
          <BookingsTabs tabs={tabs} value={activeTab} onValueChange={handleTabChange} />

          {/* Responsive tab contents */}
          <div className="mt-3 px-1 sm:px-2">
            <UpcomingAppointments
              show={activeTab === "upcoming"}
              bookings={upcoming}
              loading={loading}
              isMobile={isMobile}
              onView={handleViewBooking}
              onReschedule={handleRescheduleBooking}
              onCancel={handleCancelBooking}
            />
            <NeedsAttention
              show={activeTab === "needs"}
              bookings={needsAttention}
              loading={loading}
              isMobile={isMobile}
              onView={handleViewBooking}
              onReschedule={handleRescheduleBooking}
              onCancel={handleCancelBooking}
            />
            <PastAppointments
              show={activeTab === "past"}
              bookings={past}
              loading={loading}
              isMobile={isMobile}
              onView={handleViewBooking}
              onReschedule={handleRescheduleBooking}
            />
            <CancelledAppointments
              show={activeTab === "canceled"}
              bookings={canceled}
              loading={loading}
              isMobile={isMobile}
              onView={handleViewBooking}
            />
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export default CustomerBookingsCenter;
