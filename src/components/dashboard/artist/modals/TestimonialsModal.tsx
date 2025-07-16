import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Star, Quote, Calendar, MessageSquare, Filter, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialsModalProps {
  open: boolean;
  onClose: () => void;
}

const TestimonialsModal = ({ open, onClose }: TestimonialsModalProps) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showReplyForm, setShowReplyForm] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Mock testimonials data - replace with real data
  const testimonials = [
    {
      id: '1',
      name: "Alex Parker",
      rating: 5,
      text: "Absolutely incredible work! The attention to detail is unmatched. My nails have never looked better. The studio is clean, professional, and the atmosphere is so relaxing.",
      service: "Nail Art",
      date: "2024-01-15",
      replied: false,
      verified: true
    },
    {
      id: '2',
      name: "Jordan Kim",
      rating: 5,
      text: "Professional service and amazing results. Will definitely be coming back! The booking process was smooth and the artist was so talented.",
      service: "Manicure",
      date: "2024-01-12",
      replied: true,
      verified: true
    },
    {
      id: '3',
      name: "Sam Chen",
      rating: 4,
      text: "Great experience overall. The nail art was beautiful and lasted for weeks. The only minor issue was the wait time, but it was worth it!",
      service: "Gel Manicure",
      date: "2024-01-10",
      replied: false,
      verified: true
    },
    {
      id: '4',
      name: "Taylor Johnson",
      rating: 5,
      text: "Best nail artist in the city! The custom design exceeded my expectations. The consultation was thorough and the final result was stunning.",
      service: "Custom Design",
      date: "2024-01-08",
      replied: true,
      verified: true
    }
  ];

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesFilter = filter === 'all' || 
      (filter === 'pending' && !testimonial.replied) ||
      (filter === '5-star' && testimonial.rating === 5);
    
    const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleReply = (testimonialId: string) => {
    if (replyText.trim()) {
      // Here you would send the reply to your backend
      console.log('Reply to', testimonialId, ':', replyText);
      setReplyText('');
      setShowReplyForm(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-purple-600" />
            Client Testimonials & Reviews
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Stats Header */}
          <div className="grid grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">4.9</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">247</div>
                <div className="text-sm text-muted-foreground">Total Reviews</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">94%</div>
                <div className="text-sm text-muted-foreground">Positive</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">18</div>
                <div className="text-sm text-muted-foreground">Pending Reply</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All Reviews
              </Button>
              <Button
                variant={filter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('pending')}
              >
                <MessageSquare className="h-4 w-4 mr-1" />
                Pending Reply
              </Button>
              <Button
                variant={filter === '5-star' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('5-star')}
              >
                <Star className="h-4 w-4 mr-1" />
                5-Star
              </Button>
            </div>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Reviews List */}
          <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
            <AnimatePresence>
              {filteredTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`${!testimonial.replied ? 'ring-2 ring-orange-200' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-semibold">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold flex items-center gap-2">
                              {testimonial.name}
                              {testimonial.verified && (
                                <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  Verified
                                </div>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="h-3 w-3" />
                              {new Date(testimonial.date).toLocaleDateString()}
                              • {testimonial.service}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <Quote className="h-4 w-4 text-muted-foreground mb-2" />
                        <p className="text-gray-700 italic">{testimonial.text}</p>
                      </div>

                      {/* Reply Section */}
                      {!testimonial.replied && (
                        <div className="border-t pt-4">
                          {showReplyForm === testimonial.id ? (
                            <div className="space-y-3">
                              <Textarea
                                placeholder="Write a thoughtful reply to this review..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                rows={3}
                              />
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleReply(testimonial.id)}
                                  disabled={!replyText.trim()}
                                >
                                  Send Reply
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setShowReplyForm(null)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setShowReplyForm(testimonial.id)}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Reply to Review
                            </Button>
                          )}
                        </div>
                      )}

                      {testimonial.replied && (
                        <div className="border-t pt-4">
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <MessageSquare className="h-4 w-4" />
                            You replied to this review
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialsModal;