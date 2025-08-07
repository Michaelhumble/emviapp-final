import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Star, Heart, ThumbsUp, ThumbsDown, Camera, Send, Gift, 
  CheckCircle, MessageSquare, TrendingUp, Award, Sparkles,
  AlertTriangle, Flag, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface FeedbackData {
  bookingId: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  serviceName: string;
  appointmentDate: string;
  servicePrice: number;
}

interface FeedbackForm {
  rating: number;
  review: string;
  wouldRecommend: boolean | null;
  serviceQuality: number;
  cleanliness: number;
  punctuality: number;
  valueForMoney: number;
  photos: File[];
  tags: string[];
  reportIssue: boolean;
  issueDescription: string;
}

interface PostBookingFeedbackProps {
  feedbackData: FeedbackData;
  onSubmit: (feedback: FeedbackForm) => void;
  onClose: () => void;
}

const PostBookingFeedback: React.FC<PostBookingFeedbackProps> = ({
  feedbackData,
  onSubmit,
  onClose
}) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackForm>({
    rating: 0,
    review: '',
    wouldRecommend: null,
    serviceQuality: 0,
    cleanliness: 0,
    punctuality: 0,
    valueForMoney: 0,
    photos: [],
    tags: [],
    reportIssue: false,
    issueDescription: ''
  });
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const steps = [
    { title: 'Overall Rating', subtitle: 'How was your experience?' },
    { title: 'Detailed Feedback', subtitle: 'Help others with specific details' },
    { title: 'Photos & Tags', subtitle: 'Share your beautiful results' },
    { title: 'Final Review', subtitle: 'Review and submit your feedback' }
  ];

  const availableTags = [
    'Professional', 'Clean', 'Friendly', 'Quick', 'Relaxing', 'Creative',
    'Gentle', 'Detailed', 'Affordable', 'Luxurious', 'Skilled', 'Punctual'
  ];

  const handleRatingClick = (rating: number) => {
    setFeedback(prev => ({ ...prev, rating }));
  };

  const handleDetailedRating = (category: keyof FeedbackForm, rating: number) => {
    setFeedback(prev => ({ ...prev, [category]: rating }));
  };

  const toggleTag = (tag: string) => {
    setFeedback(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFeedback(prev => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const removePhoto = (index: number) => {
    setFeedback(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Validate required fields
      if (feedback.rating === 0) {
        toast.error('Please provide an overall rating');
        return;
      }

      await onSubmit(feedback);
      
      setShowThankYou(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981']
      });

      // Show reward notification
      toast.success('🎉 Thank you! You earned 50 EmviPoints for your review!');
      
      setTimeout(() => {
        onClose();
      }, 3000);
      
    } catch (error) {
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0:
        return feedback.rating > 0;
      case 1:
        return feedback.wouldRecommend !== null;
      case 2:
        return true; // Photos and tags are optional
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderStarRating = (rating: number, onRate: (rating: number) => void, size = 'lg') => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map(star => (
          <motion.button
            key={star}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onRate(star)}
            className={`${size === 'lg' ? 'w-8 h-8' : 'w-6 h-6'} transition-colors`}
          >
            <Star
              className={`w-full h-full ${
                star <= rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-400 hover:text-yellow-200'
              }`}
            />
          </motion.button>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            {/* Provider Info */}
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Avatar className="h-16 w-16 border-2 border-white/20">
                <AvatarImage src={feedbackData.providerAvatar} alt={feedbackData.providerName} />
                <AvatarFallback className="bg-gradient-to-r from-purple-400 to-pink-500 text-white text-xl">
                  {feedbackData.providerName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-left">
                <h3 className="font-semibold text-white">{feedbackData.providerName}</h3>
                <p className="text-sm text-white/70">{feedbackData.serviceName}</p>
                <p className="text-xs text-white/50">
                  {new Date(feedbackData.appointmentDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Overall Rating */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white">How was your experience?</h4>
              <div className="flex justify-center">
                {renderStarRating(feedback.rating, handleRatingClick)}
              </div>
              {feedback.rating > 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-white/70"
                >
                  {feedback.rating === 5 && "Amazing! 🌟"}
                  {feedback.rating === 4 && "Great! 👍"}
                  {feedback.rating === 3 && "Good 👌"}
                  {feedback.rating === 2 && "Could be better 🤔"}
                  {feedback.rating === 1 && "Needs improvement 😞"}
                </motion.p>
              )}
            </div>

            {/* Quick Review */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/80">
                Tell us more (optional)
              </label>
              <Textarea
                value={feedback.review}
                onChange={(e) => setFeedback(prev => ({ ...prev, review: e.target.value }))}
                placeholder="Share details about your experience..."
                className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                rows={3}
              />
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white text-center">Detailed Ratings</h4>
            
            {/* Recommendation */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-white/80">Would you recommend {feedbackData.providerName}?</p>
              <div className="flex space-x-4">
                <Button
                  variant={feedback.wouldRecommend === true ? 'default' : 'outline'}
                  onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: true }))}
                  className={`flex-1 ${
                    feedback.wouldRecommend === true
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Yes
                </Button>
                <Button
                  variant={feedback.wouldRecommend === false ? 'default' : 'outline'}
                  onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: false }))}
                  className={`flex-1 ${
                    feedback.wouldRecommend === false
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                  }`}
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  No
                </Button>
              </div>
            </div>

            {/* Detailed Ratings */}
            <div className="space-y-4">
              {[
                { key: 'serviceQuality', label: 'Service Quality' },
                { key: 'cleanliness', label: 'Cleanliness' },
                { key: 'punctuality', label: 'Punctuality' },
                { key: 'valueForMoney', label: 'Value for Money' }
              ].map(({ key, label }) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/80">{label}</span>
                    <span className="text-xs text-white/60">
                      {feedback[key as keyof FeedbackForm] as number}/5
                    </span>
                  </div>
                  <div className="flex justify-center">
                    {renderStarRating(
                      feedback[key as keyof FeedbackForm] as number,
                      (rating) => handleDetailedRating(key as keyof FeedbackForm, rating),
                      'sm'
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Report Issue Option */}
            <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-300">Had an issue?</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setFeedback(prev => ({ ...prev, reportIssue: !prev.reportIssue }))}
                className={`${
                  feedback.reportIssue
                    ? 'bg-red-500/20 border-red-400/50 text-red-300'
                    : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                }`}
              >
                <Flag className="h-3 w-3 mr-1" />
                Report Issue
              </Button>
              
              {feedback.reportIssue && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-3"
                >
                  <Textarea
                    value={feedback.issueDescription}
                    onChange={(e) => setFeedback(prev => ({ ...prev, issueDescription: e.target.value }))}
                    placeholder="Please describe the issue..."
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                    rows={2}
                  />
                </motion.div>
              )}
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
            <h4 className="text-lg font-semibold text-white text-center">Photos & Tags</h4>
            
            {/* Photo Upload */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/80">
                Share Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
                <Camera className="h-8 w-8 mx-auto mb-2 text-white/50" />
                <p className="text-sm text-white/60 mb-3">
                  Show off your beautiful results!
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('photo-upload')?.click()}
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Upload Photos
                </Button>
              </div>
              
              {/* Photo Preview */}
              {feedback.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {feedback.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-20 object-cover rounded-lg"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-1 -right-1 w-6 h-6 p-0 bg-red-500 border-red-400 text-white hover:bg-red-600"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-white/80">
                Add Tags (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <Button
                    key={tag}
                    variant={feedback.tags.includes(tag) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleTag(tag)}
                    className={`${
                      feedback.tags.includes(tag)
                        ? 'bg-purple-500 hover:bg-purple-600 text-white'
                        : 'bg-white/10 border-white/30 text-white hover:bg-white/20'
                    }`}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h4 className="text-lg font-semibold text-white text-center">Review Your Feedback</h4>
            
            {/* Summary */}
            <div className="bg-white/10 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70">Overall Rating:</span>
                <div className="flex">
                  {renderStarRating(feedback.rating, () => {}, 'sm')}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-white/70">Would Recommend:</span>
                <Badge className={`${
                  feedback.wouldRecommend
                    ? 'bg-green-500/20 text-green-300 border-green-500/30'
                    : 'bg-red-500/20 text-red-300 border-red-500/30'
                }`}>
                  {feedback.wouldRecommend ? 'Yes' : 'No'}
                </Badge>
              </div>
              
              {feedback.tags.length > 0 && (
                <div>
                  <span className="text-white/70">Tags:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {feedback.tags.map(tag => (
                      <Badge key={tag} className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {feedback.photos.length > 0 && (
                <div>
                  <span className="text-white/70">Photos: {feedback.photos.length} uploaded</span>
                </div>
              )}
              
              {feedback.review && (
                <div>
                  <span className="text-white/70">Review:</span>
                  <p className="text-white text-sm mt-1">{feedback.review}</p>
                </div>
              )}
            </div>

            {/* Reward Preview */}
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="font-medium text-purple-200">Earn Rewards!</p>
                  <p className="text-xs text-purple-300/70">
                    You'll earn 50 EmviPoints for your detailed review
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (showThankYou) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6 py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <CheckCircle className="h-16 w-16 mx-auto text-green-400 mb-4" />
        </motion.div>
        
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
          <p className="text-white/70 mb-4">
            Your feedback helps make EmviApp better for everyone
          </p>
          
          <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="h-5 w-5 text-green-400" />
              <span className="text-green-200 font-medium">+50 EmviPoints earned!</span>
            </div>
          </div>
          
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Your Experience
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-white">
          <MessageSquare className="h-5 w-5 mr-2" />
          Share Your Experience
        </CardTitle>
        
        {/* Step Progress */}
        <div className="flex items-center space-x-2 mt-4">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                index === currentStep
                  ? 'bg-purple-500 text-white'
                  : index < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-white/20 text-white/60'
              }`}>
                {index < currentStep ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-6 h-0.5 ${
                  index < currentStep ? 'bg-green-500' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="text-sm text-white/70 mt-2">
          {steps[currentStep].title} - {steps[currentStep].subtitle}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <AnimatePresence mode="wait">
          <motion.div key={currentStep}>
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-white/20">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Back
          </Button>
          
          {currentStep === steps.length - 1 ? (
            <Button
              onClick={handleSubmit}
              disabled={loading || !canProceedToNext()}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                  />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Review
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={!canProceedToNext()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostBookingFeedback;