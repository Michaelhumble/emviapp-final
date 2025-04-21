
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export type EmptyType = "upcoming" | "past" | "needsAttention";

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
    body: "You're all set – no bookings need your action right now.",
    cta: "View Artists",
    ctaHref: "/explore/artists",
  },
};

const BookingsEmptyState: React.FC<{ type: EmptyType; isMobile: boolean }> = ({
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

export default BookingsEmptyState;
