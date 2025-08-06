import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Star, 
  Heart, 
  ThumbsUp, 
  Camera, 
  Gift,
  Award,
  Sparkles,
  Check
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface BookingReviewFlowProps {
  booking: {
    id: string;
    providerName: string;
    providerAvatar?: string;
    serviceName: string;
    date: string;
    time: string;
    price: number;
  };
  onReviewSubmit: (reviewData: any) => void;
  onClose: () => void;
}

const BookingReviewFlow: React.FC<BookingReviewFlowProps> = ({
  booking,
  onReviewSubmit,
  onClose
}) => {
  const [step, setStep] = useState(0);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const reviewTags = [
    'Professional', 'On Time', 'Great Results', 'Clean Space', 
    'Friendly', 'Skilled', 'Relaxing', 'Attention to Detail',
    'Good Value', 'Would Recommend', 'Exceeded Expectations'
  ];

  const steps = [
    'Rate Your Experience',
    'Write Review',
    'Add Tags & Submit'
  ];

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('Please provide a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        bookingId: booking.id,
        rating,
        reviewText,
        tags: selectedTags,
        submittedAt: new Date().toISOString()
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Trigger celebration for high ratings
      if (rating >= 4) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EC4899', '#8B5CF6', '#F59E0B', '#10B981']
        });
      }

      onReviewSubmit(reviewData);
      toast.success('Thank you for your review! You earned 10 credits.');
      
      // Move to completion step
      setStep(3);
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">How was your experience?</h3>
              <p className="text-gray-600">Rate your service with {booking.providerName}</p>
            </div>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= (hoverRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>

            {rating > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <p className="text-lg font-medium">
                  {rating === 5 && '⭐ Excellent!'}
                  {rating === 4 && '👍 Great!'}
                  {rating === 3 && '👌 Good!'}
                  {rating === 2 && '😐 Okay'}
                  {rating === 1 && '😔 Poor'}
                </p>
                
                <Button onClick={() => setStep(1)} className="px-8">
                  Continue
                </Button>
              </motion.div>
            )}
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Tell us more</h3>
              <p className="text-gray-600">Help others by sharing your experience</p>
            </div>

            <div className="flex justify-center">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 ${
                      star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <Textarea
              placeholder="What did you like about your experience? How was the service quality, professionalism, and overall experience?"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="min-h-[120px]"
            />

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button onClick={() => setStep(2)} className="flex-1">
                Continue
              </Button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Add some tags</h3>
              <p className="text-gray-600">Select what describes your experience best</p>
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
              {reviewTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-purple-700 mb-2">
                <Gift className="h-5 w-5" />
                <span className="font-medium">Earn Rewards!</span>
              </div>
              <p className="text-sm text-purple-600">
                Complete your review to earn 10 EmviApp credits and help the community!
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 bg-purple-600 hover:bg-purple-700"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
            >
              <Check className="w-10 h-10 text-green-600" />
            </motion.div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">Your review has been submitted successfully</p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-700">Rewards Earned!</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">10 EmviApp Credits</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Community Helper Badge</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={onClose} className="w-full">
                Continue to Dashboard
              </Button>
              <Button variant="outline" className="w-full">
                Book Another Service
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Booking Summary */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={booking.providerAvatar} />
              <AvatarFallback>{booking.providerName.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h4 className="font-medium">{booking.providerName}</h4>
              <p className="text-sm text-gray-600">{booking.serviceName}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{booking.date}</span>
                <span>•</span>
                <span>{booking.time}</span>
                <span>•</span>
                <span>${booking.price}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      {step < 3 && (
        <div className="flex items-center gap-2 mb-6">
          {steps.map((stepName, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${index <= step 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
                }
              `}>
                {index < step ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`
                  flex-1 h-1 mx-2
                  ${index < step ? 'bg-purple-600' : 'bg-gray-200'}
                `} />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingReviewFlow;