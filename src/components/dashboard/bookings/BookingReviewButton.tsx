
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageSquare } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useCanReview } from "@/hooks/reviews/useCanReview";
import { useReviews } from "@/hooks/reviews/useReviews";
import ReviewForm from "@/components/reviews/ReviewForm";
import { Booking } from "@/components/dashboard/artist/types/ArtistDashboardTypes";

interface BookingReviewButtonProps {
  booking: Booking;
  onSuccess?: () => void;
}

const BookingReviewButton = ({ booking, onSuccess }: BookingReviewButtonProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { canReview } = useCanReview(booking.id);
  const { submitReview } = useReviews();

  if (!canReview) return null;

  const handleSubmitReview = async (rating: number, comment: string) => {
    setIsSubmitting(true);
    try {
      const success = await submitReview(
        booking.id,
        booking.recipient_id,
        rating,
        comment
      );
      
      if (success) {
        setIsOpen(false);
        if (onSuccess) {
          onSuccess();
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        variant="outline"
        className="flex items-center gap-1"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare className="h-3 w-3" />
        {t({
          english: "Leave Review",
          vietnamese: "Viết đánh giá"
        })}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t({
                english: "Rate Your Experience",
                vietnamese: "Đánh giá trải nghiệm của bạn"
              })}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <ReviewForm 
              onSubmit={handleSubmitReview}
              isSubmitting={isSubmitting}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BookingReviewButton;
