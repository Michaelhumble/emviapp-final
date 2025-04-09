
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth";
import { useReviews } from "@/hooks/reviews/useReviews";
import { Star, MessageSquare, AlertTriangle, ThumbsUp, Calendar, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Review } from "@/types/reviews";

interface ReviewsSectionProps {
  artistId?: string;
  salonId?: string;
}

const StarRating = ({ rating, setRating, readonly = false }: { 
  rating: number; 
  setRating?: (rating: number) => void;
  readonly?: boolean;
}) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating && setRating(star)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer'} p-1`}
        >
          <Star
            className={`h-5 w-5 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const ReviewsSection: React.FC<ReviewsSectionProps> = ({ artistId, salonId }) => {
  const { user } = useAuth();
  const { reviews, loading, ratingData, submitReview, reportReview } = useReviews(artistId, salonId);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<string | null>(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitReview = async () => {
    if (!user || !artistId) return;
    
    setIsSubmitting(true);
    try {
      // In a real implementation, we would pass the booking ID
      // For now, we'll use a placeholder
      const success = await submitReview(
        "placeholder-booking-id", 
        artistId, 
        newReview.rating, 
        newReview.comment,
        salonId
      );
      
      if (success) {
        setIsWriteReviewOpen(false);
        setNewReview({ rating: 5, comment: "" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReportReview = async () => {
    if (!selectedReview) return;
    
    await reportReview(selectedReview);
    setIsReportDialogOpen(false);
    setSelectedReview(null);
  };

  const renderReviews = (reviewList: Review[]) => {
    if (reviewList.length === 0) {
      return (
        <div className="text-center py-8">
          <MessageSquare className="h-10 w-10 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No reviews yet</p>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {reviewList.map((review) => (
          <div key={review.id} className="border rounded-lg p-4 relative">
            <div className="flex justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback>{review.customer_name?.[0] || "C"}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{review.customer_name || "Client"}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5 mr-1 inline" />
                    <span>
                      {review.created_at 
                        ? format(new Date(review.created_at), 'MMM d, yyyy') 
                        : 'Recent'}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <StarRating rating={review.rating} readonly />
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-gray-700">{review.comment}</p>
            </div>
            
            {review.artist_response && (
              <div className="mt-4 bg-gray-50 rounded-md p-3">
                <p className="text-sm font-medium">Response from artist:</p>
                <p className="text-sm text-gray-600 mt-1">{review.artist_response}</p>
              </div>
            )}
            
            <div className="mt-3 flex justify-end text-sm text-gray-500">
              {user && !review.reported && (
                <button 
                  className="text-xs text-gray-400 hover:text-gray-600 flex items-center"
                  onClick={() => {
                    setSelectedReview(review.id);
                    setIsReportDialogOpen(true);
                  }}
                >
                  <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                  Report
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-serif">Reviews & Ratings</CardTitle>
            <CardDescription>
              {loading ? (
                <span>Loading ratings...</span>
              ) : (
                <span>
                  <span className="font-medium">{ratingData.average_rating.toFixed(1)}</span>/5 ·{" "}
                  <span className="text-muted-foreground">
                    Based on {ratingData.review_count} review{ratingData.review_count !== 1 ? "s" : ""}
                  </span>
                </span>
              )}
            </CardDescription>
          </div>
          
          {user && artistId && (
            <Button 
              variant="outline" 
              onClick={() => setIsWriteReviewOpen(true)}
              className="flex items-center gap-1.5"
            >
              <Star className="h-4 w-4" />
              Write a Review
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start space-x-4">
                <div className="rounded-full bg-gray-200 h-10 w-10 animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Reviews</TabsTrigger>
              <TabsTrigger value="positive">Positive</TabsTrigger>
              <TabsTrigger value="negative">Critical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {renderReviews(reviews)}
            </TabsContent>
            
            <TabsContent value="positive">
              {renderReviews(reviews.filter(review => review.rating >= 4))}
            </TabsContent>
            
            <TabsContent value="negative">
              {renderReviews(reviews.filter(review => review.rating <= 3))}
            </TabsContent>
          </Tabs>
        )}
      </CardContent>

      {/* Write Review Dialog */}
      <Dialog open={isWriteReviewOpen} onOpenChange={setIsWriteReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-center mb-2">
              <StarRating 
                rating={newReview.rating} 
                setRating={(rating) => setNewReview({...newReview, rating})} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="review-comment">Your review</Label>
              <Textarea 
                id="review-comment"
                placeholder="Share your experience..."
                rows={5}
                value={newReview.comment}
                onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsWriteReviewOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitReview}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Review Dialog */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Review</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-muted-foreground mb-4">
              Are you sure you want to report this review? Our team will review it for inappropriate content or violations of our community guidelines.
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="report-reason">Reason for reporting (optional)</Label>
              <Textarea 
                id="report-reason"
                placeholder="Tell us why you're reporting this review..."
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsReportDialogOpen(false);
                setSelectedReview(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleReportReview}
            >
              Report Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ReviewsSection;
