import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Star, MessageSquare, Flag, Download, TrendingUp, 
  BarChart3, Users, Award, Shield, AlertTriangle
} from 'lucide-react';
import { useSalonDashboard } from '@/hooks/useSalonDashboard';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface SalonReviewsManagerProps {
  salonId?: string;
}

const SalonReviewsManager: React.FC<SalonReviewsManagerProps> = ({ salonId }) => {
  const { reviews, stats, respondToReview, flagReview, loading } = useSalonDashboard(salonId);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [responseText, setResponseText] = useState('');
  const [flagReason, setFlagReason] = useState('');
  const [isResponding, setIsResponding] = useState(false);
  const [isFlagging, setIsFlagging] = useState(false);

  const handleRespond = async () => {
    if (!selectedReview || !responseText.trim()) return;

    setIsResponding(true);
    const success = await respondToReview(selectedReview.id, responseText);
    
    if (success) {
      setResponseText('');
      setSelectedReview(null);
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    setIsResponding(false);
  };

  const handleFlag = async () => {
    if (!selectedReview || !flagReason.trim()) return;

    setIsFlagging(true);
    const success = await flagReview(selectedReview.id, flagReason);
    
    if (success) {
      setFlagReason('');
      setSelectedReview(null);
    }
    setIsFlagging(false);
  };

  const handleExportReviews = () => {
    const reviewData = reviews.map(review => ({
      date: new Date(review.created_at).toLocaleDateString(),
      customer: review.customer?.full_name || 'Anonymous',
      rating: review.rating,
      review: review.review_text,
      response: review.response_text || 'No response'
    }));

    const csvContent = [
      ['Date', 'Customer', 'Rating', 'Review', 'Response'].join(','),
      ...reviewData.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'salon-reviews.csv';
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Reviews exported successfully!');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-yellow-500 rounded-lg">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-900">{stats.averageRating}</p>
                <p className="text-sm text-yellow-700">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-900">{stats.totalReviews}</p>
                <p className="text-sm text-blue-700">Total Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-500 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-900">92%</p>
                <p className="text-sm text-green-700">Positive Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-100">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500 rounded-lg">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-900">4.9</p>
                <p className="text-sm text-purple-700">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button 
          onClick={handleExportReviews}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Reviews
        </Button>
        <Button variant="outline">
          <BarChart3 className="h-4 w-4 mr-2" />
          Analytics Report
        </Button>
      </div>

      {/* Reviews List */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            Customer Reviews & Reputation Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 border rounded-lg bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                      {review.customer?.full_name?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.customer?.full_name || 'Anonymous Customer'}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {review.flagged && (
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Flagged
                      </Badge>
                    )}
                    <Badge className={`
                      ${review.rating >= 4 ? 'bg-green-100 text-green-800 border-green-300' : ''}
                      ${review.rating === 3 ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : ''}
                      ${review.rating <= 2 ? 'bg-red-100 text-red-800 border-red-300' : ''}
                    `}>
                      {review.rating} Star{review.rating !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>

                <p className="text-gray-700 mb-3">{review.review_text}</p>

                {review.response_text ? (
                  <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Your Response</span>
                      <span className="text-sm text-blue-600">
                        {new Date(review.responded_at!).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-blue-800">{review.response_text}</p>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          onClick={() => setSelectedReview(review)}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Respond
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Respond to Review</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600 mb-2">Original Review:</p>
                            <p className="font-medium">{review.review_text}</p>
                          </div>
                          <Textarea
                            placeholder="Write your professional response..."
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            rows={4}
                          />
                          <div className="flex gap-2">
                            <Button 
                              onClick={handleRespond}
                              disabled={isResponding || !responseText.trim()}
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                            >
                              {isResponding ? 'Posting...' : 'Post Response'}
                            </Button>
                            <Button variant="outline" onClick={() => setSelectedReview(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    {review.rating <= 2 && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedReview(review)}
                            className="border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <Flag className="h-4 w-4 mr-2" />
                            Flag for Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Shield className="h-5 w-5 text-red-600" />
                              Report Review for Admin Review
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                              <p className="text-sm text-red-800 mb-2">Flagging this review will:</p>
                              <ul className="text-sm text-red-700 list-disc list-inside space-y-1">
                                <li>Alert our moderation team</li>
                                <li>Hide the review temporarily during investigation</li>
                                <li>Start a dispute resolution process</li>
                              </ul>
                            </div>
                            <Textarea
                              placeholder="Explain why this review should be investigated..."
                              value={flagReason}
                              onChange={(e) => setFlagReason(e.target.value)}
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <Button 
                                onClick={handleFlag}
                                disabled={isFlagging || !flagReason.trim()}
                                variant="destructive"
                              >
                                {isFlagging ? 'Flagging...' : 'Flag Review'}
                              </Button>
                              <Button variant="outline" onClick={() => setSelectedReview(null)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Star className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
              <p>Start building your reputation by encouraging customers to leave reviews!</p>
              <Button className="mt-4" variant="outline">
                Learn Review Strategies
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalonReviewsManager;