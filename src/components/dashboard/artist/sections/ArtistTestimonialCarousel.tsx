
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    rating: 5,
    text: "Absolutely AMAZING! Best manicure I've ever had. My nails look perfect! 💅✨",
    service: "Gel Manicure",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    likes: 24
  },
  {
    id: 2,
    name: "Jessica L.",
    rating: 5,
    text: "WOW! The attention to detail is incredible. I'm booking again next week! 🔥",
    service: "Nail Art",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    likes: 18
  },
  {
    id: 3,
    name: "Maria R.",
    rating: 5,
    text: "Professional, clean, and the results speak for themselves! Highly recommend! ⭐",
    service: "Pedicure",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
    likes: 31
  }
];

const ArtistTestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleShare = (testimonial: typeof testimonials[0]) => {
    const shareText = `"${testimonial.text}" - ${testimonial.name} ⭐⭐⭐⭐⭐`;
    navigator.clipboard.writeText(shareText);
    // Could open social share dialog here
  };

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Client Love 💕</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrent((prev) => prev === 0 ? testimonials.length - 1 : prev - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrent((prev) => (prev + 1) % testimonials.length)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="relative h-48">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div className="h-full bg-white/80 rounded-xl p-4 border border-orange-100">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-200"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonials[current].name}</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">{testimonials[current].service}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  {testimonials[current].text}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Heart className="h-3 w-3 text-red-400" />
                    <span>{testimonials[current].likes} likes</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(testimonials[current])}
                    className="text-xs"
                  >
                    <Share2 className="h-3 w-3 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                current === index ? 'bg-orange-400 w-6' : 'bg-orange-200'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtistTestimonialCarousel;
