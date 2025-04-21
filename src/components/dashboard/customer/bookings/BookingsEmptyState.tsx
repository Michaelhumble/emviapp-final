
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles } from "lucide-react";

export type EmptyType = "upcoming" | "past" | "needsAttention" | "canceled";

const friendlyEmpty = {
  upcoming: {
    title: "No upcoming bookings yet",
    body: "You deserve a moment of peace — book your next beauty session now.",
    cta: "Book Now",
    ctaHref: "/explore/artists",
    icon: <Calendar className="h-12 w-12 text-purple-200" />,
  },
  past: {
    title: "You haven't had any appointments yet",
    body: "Your beauty story is about to begin. Save your favorite moments here.",
    cta: "Explore Services",
    ctaHref: "/explore/artists",
    icon: <Calendar className="h-12 w-12 text-purple-200" />,
  },
  needsAttention: {
    title: "All good here!",
    body: "You're all set – no bookings need your attention right now.",
    cta: "View Artists",
    ctaHref: "/explore/artists",
    icon: <Sparkles className="h-12 w-12 text-purple-200" />,
  },
  canceled: {
    title: "No canceled appointments",
    body: "Your schedule is clear. We're here when you're ready to book again.",
    cta: "Browse Services",
    ctaHref: "/explore/artists",
    icon: <Calendar className="h-12 w-12 text-purple-200" />,
  }
};

const BookingsEmptyState: React.FC<{ type: EmptyType; isMobile: boolean }> = ({
  type,
  isMobile,
}) => {
  const content = friendlyEmpty[type];
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 gap-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
      {content.icon}
      <h3 className="font-serif font-semibold text-xl text-gray-700 mt-2 text-center">{content.title}</h3>
      <p className="text-gray-500 mb-4 text-center max-w-md">{content.body}</p>
      <Button
        asChild
        size={isMobile ? "lg" : "default"}
        className="rounded-full px-8 bg-purple-600 hover:bg-purple-700 shadow-sm"
      >
        <a href={content.ctaHref}>{content.cta}</a>
      </Button>
    </div>
  );
};

export default BookingsEmptyState;
