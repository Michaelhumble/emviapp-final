import React from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCustomerReviews } from '@/hooks/useCustomerReviews';
import { Review } from '@/types/reviews';

interface ReviewsSectionProps {
  showTitle?: boolean;
  maxReviews?: number;
}

export default function ReviewsSection({ showTitle = true, maxReviews }: ReviewsSectionProps) {
  const { reviews, loading } = useCustomerReviews();

  const displayReviews = maxReviews ? reviews.slice(0, maxReviews) : reviews;

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-lg border-white/20">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3">
                <div className="h-12 w-12 bg-white/20 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-white/20 rounded w-3/4" />
                  <div className="h-3 bg-white/20 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
      {showTitle && (
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              Your Reviews
            </div>
            {reviews.length > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span>{averageRating.toFixed(1)} avg</span>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {reviews.length} reviews
                </Badge>
              </div>
            )}
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent className={showTitle ? 'pt-0' : 'pt-6'}>
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="h-12 w-12 mx-auto text-white/40 mb-4" />
            <p className="text-white/60">No reviews yet</p>
            <p className="text-sm text-white/40 mt-1">
              Complete bookings to start reviewing your experiences
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayReviews.map((review, index) => (
              <ReviewItem key={review.id} review={review} index={index} />
            ))}
            
            {maxReviews && reviews.length > maxReviews && (
              <div className="text-center pt-4">
                <p className="text-white/60 text-sm">
                  +{reviews.length - maxReviews} more reviews
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ReviewItem({ review, index }: { review: Review; index: number }) {
  const targetName = (review as any).artist?.full_name || (review as any).salon?.salon_name || 'Unknown';
  const targetAvatar = (review as any).artist?.avatar_url;
  const targetType = review.artist_id ? 'artist' : 'salon';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex gap-3 p-3 bg-white/5 rounded-lg"
    >
      <Avatar className="h-10 w-10 border-2 border-white/20">
        <AvatarImage src={targetAvatar} alt={targetName} />
        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
          {targetName.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium text-white">{targetName}</h4>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-3 w-3 ${
                  star <= review.rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <Badge 
            variant="outline" 
            className="text-xs border-white/30 text-white/70"
          >
            {targetType}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-white/60">
            <Calendar className="h-3 w-3" />
            {new Date(review.created_at || '').toLocaleDateString()}
          </div>
        </div>
        
        {review.comment && (
          <p className="text-sm text-white/80 mt-2">{review.comment}</p>
        )}
      </div>
    </motion.div>
  );
}