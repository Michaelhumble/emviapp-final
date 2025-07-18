import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabaseBypass } from '@/types/supabase-bypass';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId?: string;
  targetId: string;
  targetType: 'artist' | 'salon';
  targetName: string;
  onReviewSubmitted?: () => void;
}

export default function ReviewModal({
  isOpen,
  onClose,
  bookingId,
  targetId,
  targetType,
  targetName,
  onReviewSubmitted
}: ReviewModalProps) {
  const { user } = useAuth();
  const [stars, setStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!user?.id || stars === 0) {
      toast.error('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabaseBypass
        .from('reviews')
        .insert({
          customer_id: user.id,
          booking_id: bookingId,
          [targetType === 'artist' ? 'artist_id' : 'salon_id']: targetId,
          rating: stars,
          comment: reviewText.trim() || null
        } as any);

      if (error) throw error;

      // Trigger confetti celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF69B4', '#8A2BE2', '#00FF7F']
      });

      toast.success('🌟 Review submitted! You earned 20 EmviPoints!');
      
      // Reset form
      setStars(0);
      setReviewText('');
      onClose();
      
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setStars(0);
    setReviewText('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-purple-50 to-pink-50 border-0">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-gray-800">
            Rate Your Experience
          </DialogTitle>
          <p className="text-center text-gray-600 text-sm">
            How was your experience with {targetName}?
          </p>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Star Rating */}
          <div className="text-center">
            <div className="flex justify-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onMouseEnter={() => setHoverStars(star)}
                  onMouseLeave={() => setHoverStars(0)}
                  onClick={() => setStars(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoverStars || stars)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              {stars === 0 && 'Select a rating'}
              {stars === 1 && 'Poor'}
              {stars === 2 && 'Fair'}
              {stars === 3 && 'Good'}
              {stars === 4 && 'Very Good'}
              {stars === 5 && 'Excellent'}
            </p>
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Share your experience (optional)
            </label>
            <Textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Tell others about your experience..."
              className="resize-none border-purple-200 focus:border-purple-400 focus:ring-purple-400"
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-gray-500 mt-1">
              {reviewText.length}/500 characters
            </p>
          </div>

          {/* Reward Info */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg text-center"
          >
            <p className="text-sm font-medium text-purple-800">
              🎁 Earn 20 EmviPoints for your review!
            </p>
          </motion.div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={stars === 0 || isSubmitting}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                Submitting...
              </div>
            ) : (
              'Submit Review'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}