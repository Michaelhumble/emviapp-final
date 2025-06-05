
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCustomerDashboard } from "@/hooks/useCustomerDashboard";
import { ArrowRight, User } from "lucide-react";
import { toast } from "sonner";

type BookAgainCardProps = {
  id: string;
  artistName?: string;
  artistAvatar?: string | null;
  serviceTitle?: string;
  completedAt?: string;
  onBookAgain: () => void;
};

const BookAgainCard: React.FC<BookAgainCardProps> = ({
  id,
  artistName,
  artistAvatar,
  serviceTitle,
  completedAt,
  onBookAgain,
}) => (
  <Card className="min-w-[240px] max-w-xs snap-start relative group hover:shadow-lg transition-shadow" style={{ minHeight: 200 }}>
    <div className="flex items-center gap-2 px-5 pt-3">
      {artistAvatar
        ? <img src={artistAvatar} alt="" className="w-10 h-10 rounded-full object-cover border bg-white" />
        : <User className="h-9 w-9 text-gray-200" aria-label="Avatar" />}
      <span className="font-medium text-sm truncate">{artistName}</span>
    </div>
    <CardContent className="pt-2 pb-4">
      <div className="mb-1 text-xs text-gray-500">Last booked service</div>
      <div className="font-semibold text-base mb-2 truncate">{serviceTitle}</div>
      {completedAt && (
        <div className="mb-2 text-xs text-gray-400">Completed: {new Date(completedAt).toLocaleDateString()}</div>
      )}
      <Button
        variant="outline"
        size="sm"
        className="w-full rounded font-medium mt-1 h-11 min-h-[44px]"
        onClick={onBookAgain}
        tabIndex={0}
      >
        Book Again <ArrowRight className="ml-1 h-4 w-4" />
      </Button>
    </CardContent>
  </Card>
);

const BookAgainSection: React.FC = () => {
  const { bookings } = useCustomerDashboard();

  const completed = Array.isArray(bookings)
    ? bookings
        .filter(b => b.status === "completed" && b.service && b.artist)
        .sort((a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime()
        )
        .slice(0, 5)
    : [];

  if (!completed.length) return null;

  const handleBookAgain = (booking: typeof completed[0]) => {
    toast.info("Booking flow coming soon!");
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section className="mb-6 md:mb-8 animate-fade-in">
      <h2 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2" style={{ fontSize: 'clamp(1.125rem, 4vw, 1.4rem)' }}>
        Book Again
      </h2>
      <p className="text-gray-600 mb-3 text-sm font-medium flex items-center gap-2">
        Quick rebook with your favorite artists and services
      </p>
      <div className={
        isMobile
          ? "flex gap-4 overflow-x-auto snap-x scroll-px-4 pb-2 pt-1 w-full"
          : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      }>
        {completed.map((booking) => (
          <BookAgainCard
            key={booking.id}
            id={booking.id}
            artistName={booking.artist?.full_name}
            artistAvatar={booking.artist?.avatar_url}
            serviceTitle={booking.service?.title}
            completedAt={booking.created_at}
            onBookAgain={() => handleBookAgain(booking)}
          />
        ))}
      </div>
    </section>
  );
};

export default BookAgainSection;
