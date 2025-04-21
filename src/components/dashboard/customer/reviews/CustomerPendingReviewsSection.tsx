
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/reviews/StarRating";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// ----- Types -----
interface BookingForReview {
  id: string;
  artist?: {
    full_name: string;
    avatar_url?: string;
  } | null;
  service?: {
    title: string;
  } | null;
  created_at?: string;
  recipient_id?: string;
}

type ReviewInput = {
  rating: number;
  comment: string;
};

const CustomerReviewCard: React.FC<{
  booking: BookingForReview;
  onSubmitted: () => void;
}> = ({ booking, onSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Display artist or service name as heading
  const artistName = booking.artist?.full_name;
  const serviceTitle = booking.service?.title;
  const date = booking.created_at
    ? new Date(booking.created_at).toLocaleDateString()
    : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please select a star rating before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      // Insert review into Supabase
      const { data, error } = await supabase
        .from("reviews")
        .insert({
          booking_id: booking.id,
          artist_id: booking.recipient_id,
          // We'll pass customer_id with Supabase RLS
          rating,
          comment: comment.trim() || null,
        });

      if (error) throw error;

      toast.success("Thank you! Your review was submitted.");
      setRating(0);
      setComment("");
      onSubmitted();
    } catch {
      toast.error("There was an error saving your review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="mb-4 max-w-xl mx-auto shadow-md">
      <CardContent className="py-5">
        <div className="flex items-center gap-3 mb-2">
          {booking.artist?.avatar_url ? (
            <img
              src={booking.artist.avatar_url}
              alt={artistName || ""}
              className="w-10 h-10 rounded-full border object-cover bg-white"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-300" />
          )}
          <div>
            <div className="font-semibold text-base line-clamp-1">{artistName}</div>
            {serviceTitle && (
              <div className="text-sm text-gray-500 truncate">
                {serviceTitle}
              </div>
            )}
            {date && <div className="text-xs text-gray-400">{date}</div>}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3 mt-2">
          <label className="block text-sm font-semibold mb-1">
            How was your recent visit?
          </label>
          <StarRating
            rating={rating}
            size="lg"
            interactive
            onChange={setRating}
            className="mb-1"
          />
          <textarea
            className="w-full rounded border bg-gray-50 px-3 py-2 text-sm"
            placeholder="Optional feedback (e.g. what made your experience special?)"
            value={comment}
            onChange={e => setComment(e.target.value)}
            rows={3}
            maxLength={350}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={submitting || rating < 1}
            size="sm"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const CustomerPendingReviewsSection: React.FC = () => {
  const { user } = useAuth();
  const [pending, setPending] = useState<BookingForReview[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch completed bookings that have not been reviewed
  useEffect(() => {
    async function fetchPendingReviews() {
      if (!user?.id) return;
      setLoading(true);

      // 1. Get completed bookings for this customer
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select(
          `
            id, created_at, status, recipient_id,
            service:service_id (title),
            artist:recipient_id (full_name, avatar_url)
          `
        )
        .eq("sender_id", user.id)
        .eq("status", "completed")
        .order("created_at", { ascending: false })
        .limit(5);

      if (bookingsError || !bookingsData) {
        setPending([]);
        setLoading(false);
        return;
      }

      // 2. Of these bookings, check which don't have a review yet
      // Get reviews for all booking ids (in batches)
      const bookingIds = bookingsData.map(b => b.id);

      let reviewedBookingIds: string[] = [];
      if (bookingIds.length > 0) {
        const { data: reviewData, error: reviewError } = await supabase
          .from("reviews")
          .select("booking_id")
          .in("booking_id", bookingIds);

        if (!reviewError && reviewData) {
          reviewedBookingIds = reviewData.map(r => r.booking_id);
        }
      }

      // Only return bookings with NO review yet
      setPending(
        bookingsData.filter(b => !reviewedBookingIds.includes(b.id))
      );
      setLoading(false);
    }
    fetchPendingReviews();
  }, [user]);

  // When a review is submitted, remove that booking from the UI
  const handleSubmitted = (bookingId: string) => {
    setPending(prev => prev.filter(b => b.id !== bookingId));
  };

  if (!user) return null;

  return (
    <section className="mb-8 animate-fade-in px-2">
      <h2 className="text-xl sm:text-2xl font-bold mb-2">
        Rate Your Experience
      </h2>
      <p className="text-gray-600 mb-3 text-sm">
        Let us know how your last beauty visit went!
      </p>
      {loading ? (
        <div className="text-muted-foreground py-10 text-center text-base">Loading pending reviews…</div>
      ) : pending.length === 0 ? (
        <div className="text-muted-foreground py-8 text-center text-base">
          No pending reviews
        </div>
      ) : (
        pending.map(b => (
          <CustomerReviewCard key={b.id} booking={b} onSubmitted={() => handleSubmitted(b.id)} />
        ))
      )}
    </section>
  );
};

export default CustomerPendingReviewsSection;
