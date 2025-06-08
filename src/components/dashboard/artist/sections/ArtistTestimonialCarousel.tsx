
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Star, Share } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ArtistTestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "/lovable-uploads/749e5584-caa4-4229-84a2-93589c7455c2.png",
      rating: 5,
      text: "Absolutely OBSESSED with my nails! The attention to detail is incredible. Already booked my next appointment! 💕",
      service: "Gel Manicure",
      date: "2 days ago",
      likes: 12
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      avatar: "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png",
      rating: 5,
      text: "This artist is pure magic! My nails have never looked this good. The whole experience was so relaxing and professional.",
      service: "Nail Art Design",
      date: "1 week ago",
      likes: 8
    },
    {
      id: 3,
      name: "Jessica Kim",
      avatar: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
      rating: 5,
      text: "WOW! I keep staring at my nails. Everyone at work is asking where I got them done. You have a client for life! ✨",
      service: "French Manicure",
      date: "3 days ago",
      likes: 15
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between px-2">
        <h3 className="text-lg font-bold text-gray-800">Client Love 💕</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="h-8 w-8 p-0 rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="h-8 w-8 p-0 rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-12 h-12 rounded-full border-2 border-pink-200"
                />
                <div>
                  <div className="font-semibold text-gray-800">{current.name}</div>
                  <div className="text-sm text-gray-600">{current.service}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500">{current.date}</div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-700 leading-relaxed mb-4">
              "{current.text}"
            </p>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 text-sm text-pink-600 hover:text-pink-700"
                >
                  <Heart className="h-4 w-4" />
                  {current.likes}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                  <Share className="h-4 w-4" />
                  Share
                </motion.button>
              </div>
              
              <div className="flex gap-1">
                {testimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-pink-500' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

export default ArtistTestimonialCarousel;
