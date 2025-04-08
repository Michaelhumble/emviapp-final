
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import StarRating from "./StarRating";
import { useReviews } from "@/hooks/reviews/useReviews";
import { useCanReview } from "@/hooks/reviews/useCanReview";
import { useReviewFormatter } from "@/hooks/reviews/useReviewFormatter";
import { useTranslation } from "@/hooks/useTranslation";
import { AlertCircle } from "lucide-react";

interface ReviewsSectionProps {
  artistId: string;
  salonId?: string;
  bookingId?: string;
}

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ artistId, salonId, bookingId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState("recent");
  const { t } = useTranslation();
  const { reviews, loading, ratingData, submitReview, reportReview } = useReviews(artistId, salonId);
  const { canReview, refreshCanReview } = useCanReview(bookingId);
  const { getReviewsLabel, getNoReviewsLabel } = useReviewFormatter();

  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!bookingId) return;
    
    setIsSubmitting(true);
    try {
      await submitReview(bookingId, artistId, rating, comment, salonId);
      refreshCanReview();
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredReviews = [...reviews].sort((a, b) => {
    if (filter === "recent") {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else if (filter === "highest") {
      return b.rating - a.rating;
    } else if (filter === "lowest") {
      return a.rating - b.rating;
    } else if (filter === "with_comments") {
      return a.comment ? -1 : b.comment ? 1 : 0;
    }
    return 0;
  });

  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <CardTitle>
              {t({
                english: "Reviews",
                vietnamese: "Đánh giá"
              })}
            </CardTitle>
            <div className="flex items-center mt-2 md:mt-0">
              {ratingData.average_rating > 0 && (
                <>
                  <div className="flex items-center">
                    <StarRating rating={ratingData.average_rating} showEmpty={false} />
                    <span className="ml-2 font-medium">{ratingData.average_rating.toFixed(1)}</span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                </>
              )}
              <span className="text-sm text-muted-foreground">
                {getReviewsLabel(ratingData.review_count)}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {canReview && (
            <div className="mb-6 border-b pb-6">
              <h3 className="text-lg font-medium mb-3">
                {t({
                  english: "Leave a Review",
                  vietnamese: "Đánh giá dịch vụ"
                })}
              </h3>
              <ReviewForm onSubmit={handleSubmitReview} isSubmitting={isSubmitting} />
            </div>
          )}

          {reviews.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">
                  {t({
                    english: "Client Reviews",
                    vietnamese: "Đánh giá từ khách hàng"
                  })}
                </h3>
                <Tabs value={filter} onValueChange={setFilter} className="w-[200px]">
                  <TabsList>
                    <TabsTrigger value="recent">
                      {t({
                        english: "Recent",
                        vietnamese: "Mới nhất"
                      })}
                    </TabsTrigger>
                    <TabsTrigger value="highest">
                      {t({
                        english: "Top",
                        vietnamese: "Cao nhất"
                      })}
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div className="space-y-4">
                {filteredReviews.map((review) => (
                  <ReviewCard 
                    key={review.id} 
                    review={review} 
                    onReport={reportReview} 
                  />
                ))}
              </div>
            </>
          ) : (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {loading ? t({
                  english: "Loading reviews...",
                  vietnamese: "Đang tải đánh giá..."
                }) : getNoReviewsLabel()}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewsSection;
