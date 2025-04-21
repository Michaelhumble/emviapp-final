
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

  const isMobile =
    typeof window !== "undefined"
      ? window.innerWidth < 768
      : false;

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
      {/* Mobile-optimized "Your Beauty Calendar" section */}
      <div
        className="rounded-3xl overflow-hidden border border-purple-100 shadow-lg mb-4 bg-gradient-to-br from-purple-50 via-pink-50 to-white
          px-1 pt-4 pb-3 sm:px-4 sm:pt-7 sm:pb-5 relative"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between px-2 gap-2">
          <h2 className="flex items-center gap-2 text-lg sm:text-2xl font-playfair font-bold text-emvi-dark whitespace-nowrap">
            <span className="inline-flex items-center justify-center rounded-full bg-white/90 shadow-sm border border-purple-100 p-2 mr-0.5 sm:mr-2">
              <Calendar className="h-6 w-6 text-emvi-accent" />
            </span>
            <span>
              <span className="text-emvi-accent font-extrabold">Your Beauty Calendar</span>
            </span>
          </h2>
        </div>
        <div className="text-gray-600 text-[15px] sm:text-base font-light text-center px-3 pt-2">
          {motivationalSubline}
        </div>
      </div>
      <div className="bg-white/95 rounded-3xl shadow-md border border-purple-100 p-2 sm:p-4 space-y-3">
        <Tabs
          defaultValue="upcoming"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <BookingsTabs
            tabs={tabs}
            value={activeTab}
            onValueChange={handleTabChange}
          />

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
