import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import BookingCard from "./BookingCard";
import { useCustomerBookings } from "@/hooks/useCustomerBookings";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const friendlyEmpty = {
  upcoming: {
    title: "No upcoming bookings yet!",
    body: "Time to treat yourself? Your next beauty experience is just a tap away.",
    cta: "Book Now",
    ctaHref: "/explore/artists",
  },
  past: {
    title: "No past bookings",
    body: "Your completed appointments will appear here.",
    cta: "Find Services",
    ctaHref: "/explore/artists",
  },
  needsAttention: {
    title: "All clear!",
    body: "You’re all set – no bookings need your action right now.",
    cta: "View Artists",
    ctaHref: "/explore/artists",
  },
};

function isNeedsAttention(status: string | undefined) {
  if (!status) return false;
  return (
    status === "pending" || status === "cancelled" || status === "needs-action"
  );
}

export const CustomerBookingsCenter: React.FC = () => {
  const { bookings, loading, error } = useCustomerBookings();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "needs">(
    "upcoming"
  );

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

  function handleViewBooking(id: string) {
    window.location.href = `/bookings/${id}`;
  }

  function handleRescheduleBooking(id: string) {
    window.location.href = `/bookings/${id}/reschedule`;
  }

  function handleCancelBooking(id: string) {
    window.location.href = `/bookings/${id}/cancel`;
  }

  const isMobile = window.innerWidth < 768;

  return (
    <div className="w-full max-w-2xl mx-auto px-0 sm:px-0 md:px-0 pt-2 mb-6">
      <h2 className="font-bold text-[1.4rem] sm:text-2xl mb-3 text-primary flex items-center gap-2">
        <Calendar className="h-6 w-6 text-primary" /> My Bookings
      </h2>
      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={(tab) =>
          setActiveTab(tab as "upcoming" | "past" | "needs")
        }
        className="w-full"
      >
        <TabsList className="mb-2 w-full">
          <TabsTrigger value="upcoming" className="flex-1">
            Upcoming
          </TabsTrigger>
          <TabsTrigger value="needs" className="flex-1">
            Needs Attention
            {needsAttention.length > 0 && (
              <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1">
            Past
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {loading ? (
            <div className="text-center text-gray-400 py-10 animate-pulse">
              Loading your bookings…
            </div>
          ) : upcoming.length === 0 ? (
            <EmptyBookingsSection
              type="upcoming"
              isMobile={isMobile}
            />
          ) : (
            <div className="flex flex-col gap-4">
              {upcoming.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  mode={isMobile ? "mobile" : "desktop"}
                  onView={handleViewBooking}
                  onReschedule={handleRescheduleBooking}
                  onCancel={handleCancelBooking}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="needs">
          {loading ? (
            <div className="text-center text-gray-400 py-10 animate-pulse">
              Loading your bookings…
            </div>
          ) : needsAttention.length === 0 ? (
            <EmptyBookingsSection
              type="needsAttention"
              isMobile={isMobile}
            />
          ) : (
            <div className="flex flex-col gap-4">
              {needsAttention.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  mode={isMobile ? "mobile" : "desktop"}
                  onView={handleViewBooking}
                  onReschedule={
                    booking.status === "pending"
                      ? handleRescheduleBooking
                      : undefined
                  }
                  onCancel={
                    booking.status === "pending"
                      ? handleCancelBooking
                      : undefined
                  }
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="past">
          {loading ? (
            <div className="text-center text-gray-400 py-10 animate-pulse">
              Loading your bookings…
            </div>
          ) : past.length === 0 ? (
            <EmptyBookingsSection type="past" isMobile={isMobile} />
          ) : (
            <div className="flex flex-col gap-4">
              {past.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  mode={isMobile ? "mobile" : "desktop"}
                  onView={handleViewBooking}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const EmptyBookingsSection: React.FC<{ type: keyof typeof friendlyEmpty; isMobile: boolean }> = ({
  type,
  isMobile,
}) => {
  const content = friendlyEmpty[type];
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <Calendar className="h-12 w-12 text-gray-300 mb-1" />
      <h3 className="font-semibold text-lg text-gray-600 mb-1">{content.title}</h3>
      <p className="text-gray-400 mb-3 text-center">{content.body}</p>
      <Button
        asChild
        size={isMobile ? "lg" : "sm"}
        className="w-full max-w-xs"
        variant="secondary"
      >
        <a href={content.ctaHref}>{content.cta}</a>
      </Button>
    </div>
  );
};

export default CustomerBookingsCenter;
