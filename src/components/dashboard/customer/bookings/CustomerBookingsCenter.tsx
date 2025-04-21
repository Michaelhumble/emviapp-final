
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import BookingsTabs from "./BookingsTabs";
import CustomerBookingsTabContent from "./CustomerBookingsTabContent";
import { useCustomerBookings } from "@/hooks/useCustomerBookings";
import { Calendar } from "lucide-react";
import { isNeedsAttention } from "./utils";

const motivationalSubline =
  "Track your appointments, rewards, and favorite pros — all in one calming space.";

const friendlyEmpty = {
  upcoming: {
    title: "No beauty plans yet? Let’s fix that.",
    body: "Explore top artists, schedule something wonderful, and your beauty story begins here.",
    cta: "Explore Artists",
    ctaHref: "/explore/artists",
  },
  past: {
    title: "No past appointments",
    body: "Your journey is just beginning.",
    cta: "Get Started",
    ctaHref: "/explore/artists",
  },
  needsAttention: {
    title: "Everything’s on track!",
    body: "No bookings need your attention right now.",
    cta: "View Artists",
    ctaHref: "/explore/artists",
  },
  canceled: {
    title: "No canceled appointments",
    body: "Your schedule is clear. Time to book something fun!",
    cta: "Browse Artists",
    ctaHref: "/explore/artists",
  }
};

export const CustomerBookingsCenter: React.FC = () => {
  const { bookings, loading, error } = useCustomerBookings();
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "past" | "needs" | "canceled"
  >("upcoming");

  // Tab logic
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

  // Updated tabs with calm, modern accent
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

  // Ensures we only allow valid tab state changes
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

  // Helper to detect truly empty bookings for this user
  const allEmpty =
    bookings.length === 0 ||
    (upcoming.length === 0 &&
      needsAttention.length === 0 &&
      past.length === 0 &&
      canceled.length === 0);

  // Customized empty state for the default (Upcoming) tab — soft and inviting
  const EmptyBookingsState = () => (
    <div className="flex flex-col items-center justify-center py-14 px-4 gap-3 bg-gradient-to-tr from-purple-50 via-indigo-50 to-pink-50 rounded-2xl border border-purple-100 shadow-md">
      <Calendar className="h-12 w-12 text-purple-200 mb-4" />
      <h3 className="font-serif text-2xl font-semibold text-emvi-dark text-center mb-1">
        💅 No beauty plans yet? Let’s fix that.
      </h3>
      <p className="text-gray-500 mb-4 text-center max-w-md">{friendlyEmpty.upcoming.body}</p>
      <button
        className="rounded-full px-8 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-xl hover:bg-purple-600 transition text-base"
        onClick={() => (window.location.href = friendlyEmpty.upcoming.ctaHref)}
      >
        {friendlyEmpty.upcoming.cta}
      </button>
    </div>
  );

  return (
    <section className="w-full max-w-3xl mx-auto">
      <div className="mb-1 flex flex-col items-center sm:items-start sm:flex-row gap-2 sm:gap-3">
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-emvi-dark flex items-center gap-2">
          <Calendar className="h-7 w-7 text-purple-500" />
          Your Beauty Calendar
        </h2>
      </div>
      <div className="mb-6 mt-1 text-base sm:text-lg text-gray-600 font-light text-center sm:text-left">
        {motivationalSubline}
      </div>
      <div className="bg-white rounded-2xl shadow-lg border border-purple-50 p-6 pt-5 space-y-4">
        <Tabs
          defaultValue="upcoming"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <BookingsTabs tabs={tabs} value={activeTab} onValueChange={handleTabChange} />

          <TabsContent value="upcoming" className="mt-6">
            {upcoming.length === 0 ? (
              <EmptyBookingsState />
            ) : (
              <CustomerBookingsTabContent
                bookings={upcoming}
                loading={loading}
                emptyType="upcoming"
                isMobile={isMobile}
                cardType="upcoming"
                onView={handleViewBooking}
                onReschedule={handleRescheduleBooking}
                onCancel={handleCancelBooking}
              />
            )}
          </TabsContent>
          <TabsContent value="needs" className="mt-6">
            <CustomerBookingsTabContent
              bookings={needsAttention}
              loading={loading}
              emptyType="needsAttention"
              isMobile={isMobile}
              cardType="upcoming"
              onView={handleViewBooking}
              onReschedule={handleRescheduleBooking}
              onCancel={handleCancelBooking}
            />
          </TabsContent>
          <TabsContent value="past" className="mt-6">
            <CustomerBookingsTabContent
              bookings={past}
              loading={loading}
              emptyType="past"
              isMobile={isMobile}
              cardType="past"
              onView={handleViewBooking}
              onReschedule={handleRescheduleBooking}
            />
          </TabsContent>
          <TabsContent value="canceled" className="mt-6">
            <CustomerBookingsTabContent
              bookings={canceled}
              loading={loading}
              emptyType="canceled"
              isMobile={isMobile}
              cardType="canceled"
              onView={handleViewBooking}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default CustomerBookingsCenter;
