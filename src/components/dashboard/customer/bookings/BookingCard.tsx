
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CustomerBooking } from "./types";
import { format } from "date-fns";
import { ThumbsUp, ThumbsDown, Calendar, Clock, Check, X } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

interface BookingCardProps {
  booking: CustomerBooking;
  type: "upcoming" | "progress" | "past" | "canceled";
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, type }) => {
  const { user } = useAuth();
  const [feedbackExpanded, setFeedbackExpanded] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  // Helper functions to format information
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "Date TBD";
    return format(new Date(dateStr), "EEE, MMM d, yyyy");
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case "confirmed": return "bg-green-100 text-green-600";
      case "completed": return "bg-blue-100 text-blue-600";
      case "cancelled": return "bg-red-100 text-red-600";
      case "pending": return "bg-amber-100 text-amber-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusLabel = () => {
    switch (booking.status) {
      case "confirmed": return "Confirmed";
      case "completed": return "Completed";
      case "cancelled": return "Canceled";
      case "pending": return "Pending";
      default: return booking.status || "Pending";
    }
  };

  const handleCancelBooking = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", booking.id);
        
      if (error) throw error;
      
      toast.success("Booking cancelled successfully");
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      console.error("Error cancelling booking:", err);
      toast.error("Failed to cancel booking. Please try again.");
    }
  };

  const handleFeedbackSubmit = async (rating: "positive" | "negative") => {
    if (!user?.id || !booking.artist?.id) {
      toast.error("Cannot submit feedback at this time");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit review to database
      const { error } = await supabase
        .from("reviews")
        .insert({
          booking_id: booking.id,
          artist_id: booking.artist.id,
          customer_id: user.id,
          rating: rating === "positive" ? 5 : 2,
          comment: feedbackText,
          status: "active"
        });
        
      if (error) throw error;
      
      // Give credits for leaving a review using the award_credits function
      const { error: creditError } = await supabase.rpc(
        "award_credits",
        { 
          p_user_id: user.id, 
          p_action_type: "review", 
          p_value: 5, 
          p_description: `review_${booking.id}`
        }
      );
      
      if (creditError) {
        console.error("Error awarding credits:", creditError);
        // Continue - credits are nice to have but not critical for the review
      }
      
      toast.success("Thank you for your feedback!");
      setHasReviewed(true);
      setFeedbackExpanded(false);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-medium mb-1">
                {booking.service?.title || "Booking"}
              </h3>
              <p className="text-sm text-primary/80 mb-2">
                with {booking.artist?.full_name || "Your stylist"}
              </p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor()}`}>
              {getStatusLabel()}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(booking.date_requested)}</span>
            {booking.time_requested && (
              <>
                <Clock className="h-4 w-4 ml-2" />
                <span>{booking.time_requested}</span>
              </>
            )}
          </div>

          {/* Action buttons based on booking type */}
          <div className="flex flex-wrap gap-2">
            {type === "upcoming" && (
              <>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => window.location.href = `/bookings/${booking.id}`}
                >
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleCancelBooking}
                >
                  Cancel
                </Button>
              </>
            )}
            
            {type === "progress" && (
              <Button 
                variant="default" 
                size="sm"
                onClick={() => window.location.href = `/bookings/${booking.id}`}
              >
                View Details
              </Button>
            )}
            
            {type === "past" && !hasReviewed && (
              <>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => window.location.href = booking.artist?.id 
                    ? `/artists/${booking.artist.id}` 
                    : `/explore/artists`
                  }
                >
                  Book Again
                </Button>
                {!feedbackExpanded && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setFeedbackExpanded(true)}
                  >
                    Leave Feedback
                  </Button>
                )}
              </>
            )}
            
            {type === "canceled" && (
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => window.location.href = booking.artist?.id 
                  ? `/artists/${booking.artist.id}` 
                  : `/explore/artists`
                }
              >
                Reschedule
              </Button>
            )}
          </div>
          
          {/* Feedback section for past bookings */}
          {type === "past" && feedbackExpanded && !hasReviewed && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <h4 className="text-sm font-medium mb-2">How was your experience?</h4>
              <div className="flex gap-4 mb-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                  onClick={() => handleFeedbackSubmit("positive")}
                  disabled={isSubmitting}
                >
                  <ThumbsUp className="h-4 w-4" /> 
                  Great
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex-1 flex items-center justify-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                  onClick={() => handleFeedbackSubmit("negative")}
                  disabled={isSubmitting}
                >
                  <ThumbsDown className="h-4 w-4" /> 
                  Not good
                </Button>
              </div>
              <textarea
                placeholder="Add comments (optional)"
                className="w-full p-2 border border-gray-200 rounded-md text-sm"
                rows={2}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                disabled={isSubmitting}
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setFeedbackExpanded(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => handleFeedbackSubmit(feedbackText.length > 0 ? "positive" : "negative")}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
