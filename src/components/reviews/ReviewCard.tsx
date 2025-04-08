
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import StarRating from "./StarRating";
import { Review } from "@/types/reviews";
import { useReviewFormatter } from "@/hooks/reviews/useReviewFormatter";
import { useTranslation } from "@/hooks/useTranslation";
import { Flag } from "lucide-react";

interface ReviewCardProps {
  review: Review;
  userName?: string;
  onReport?: (reviewId: string) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, userName, onReport }) => {
  const { formatTimeAgo, getVerifiedClientLabel } = useReviewFormatter();
  const { t } = useTranslation();

  const displayName = userName || getVerifiedClientLabel();
  const nameInitial = displayName.charAt(0).toUpperCase();
  const timeAgo = formatTimeAgo(review.created_at);

  const handleReport = () => {
    if (onReport) {
      onReport(review.id);
    }
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarFallback>{nameInitial}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{displayName}</p>
                <div className="flex items-center space-x-2 mb-2">
                  <StarRating rating={review.rating} size="sm" showEmpty={false} />
                  <span className="text-xs text-muted-foreground">{timeAgo}</span>
                </div>
              </div>
            </div>
            {review.comment && (
              <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-3 pb-3 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs text-muted-foreground"
          onClick={handleReport}
        >
          <Flag className="h-3 w-3 mr-1" />
          {t({
            english: "Report",
            vietnamese: "Báo cáo"
          })}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ReviewCard;
