
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "./StarRating";
import { useTranslation } from "@/hooks/useTranslation";

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => Promise<void>;
  isSubmitting?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    await onSubmit(rating, comment);
    setRating(0);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">
          {t({
            english: "Your Rating",
            vietnamese: "Đánh giá của bạn"
          })}
        </label>
        <div className="flex items-center">
          <StarRating 
            rating={rating} 
            size="lg" 
            interactive 
            onChange={setRating} 
          />
          {rating > 0 && (
            <span className="ml-2 text-sm text-muted-foreground">
              ({rating}/5)
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium">
          {t({
            english: "Your Review (optional)",
            vietnamese: "Nhận xét của bạn (không bắt buộc)"
          })}
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={t({
            english: "Share your experience...",
            vietnamese: "Chia sẻ trải nghiệm của bạn..."
          })}
          className="resize-none"
          rows={4}
        />
      </div>

      <Button 
        type="submit" 
        disabled={rating === 0 || isSubmitting}
        className="w-full"
      >
        {isSubmitting ? (
          <div className="h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin mx-auto" />
        ) : t({
          english: "Submit Review",
          vietnamese: "Gửi đánh giá"
        })}
      </Button>
    </form>
  );
};

export default ReviewForm;
