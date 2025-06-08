
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Star, Share, MessageSquare } from 'lucide-react';
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
      text: "Absolutely OBSESSED with my nails! The attention to detail is incredible. Already booked my next appointment! This artist is pure magic! 💕",
      service: "Luxury Gel Manicure",
      date: "2 days ago",
      likes: 24,
      verified: true
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      avatar: "/lovable-uploads/63331551-d921-46f4-98dc-8404b611ddd3.png",
      rating: 5,
      text: "This artist transformed my nails into works of art! I've never felt more confident. The whole experience was so relaxing and professional. Worth every penny!",
      service: "Nail Art Design",
      date: "1 week ago",
      likes: 18,
      verified: true
    },
    {
      id: 3,
      name: "Jessica Kim",
      avatar: "/lovable-uploads/b13a3b43-f6e1-4746-9992-03f6e8fac6bf.png",
      rating: 5,
      text: "WOW! I keep staring at my nails. Everyone at work is asking where I got them done. You have a client for life! The best investment I've made for myself. ✨",
      service: "French Manicure",
      date: "3 days ago",
      likes: 31,
      verified: true
    },
    {
      id: 4,
      name: "Lisa Wang",
      avatar: "/lovable-uploads/b4f117ee-b209-43be-8e30-ecbf1d025c93.png",
      rating: 5,
      text: "I'm blown away by the quality and creativity! This artist truly understands what luxury means. My nails look like they belong in a magazine!",
      service: "Premium Nail Extensions",
      date: "5 days ago",
      likes: 27,
      verified: true
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
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="h-5 w-5 lg:h-6 lg:w-6 text-pink-400" />
          <h3 className="text-lg lg:text-xl font-bold text-white">Client Love</h3>
          <span className="text-2xl">💕</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="h-8 w-8 p-0 rounded-full bg-white/10 border-white/20 hover:bg-white/20 text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="h-8 w-8 p-0 rounded-full bg-white/10 border-white/20 hover:bg-white/20 text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="border-0 shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="p-4 lg:p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-pink-300/50"
                  />
                  {current.verified && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xs">✓</span>
                    </motion.div>
                  )}
                </div>
                <div>
                  <div className="font-bold text-white flex items-center gap-2">
                    {current.name}
                    {current.verified && <span className="text-blue-400 text-sm">Verified</span>}
                  </div>
                  <div className="text-sm text-gray-300">{current.service}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400">{current.date}</div>
            </div>

            {/* Rating */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-1 mb-4"
            >
              {[...Array(current.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, rotate: -180 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Star className="h-4 w-4 lg:h-5 lg:w-5 fill-yellow-400 text-yellow-400" />
                </motion.div>
              ))}
            </motion.div>

            {/* Testimonial Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-white leading-relaxed mb-6 text-sm lg:text-base"
            >
              "{current.text}"
            </motion.p>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-sm text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <Heart className="h-4 w-4" />
                  {current.likes}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Share className="h-4 w-4" />
                  Share
                </motion.button>
              </div>
              
              <div className="flex gap-1">
                {testimonials.map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{
                      scale: index === currentIndex ? 1.2 : 1,
                      opacity: index === currentIndex ? 1 : 0.4
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? 'bg-pink-400' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Social Proof */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <div className="text-sm text-purple-200 font-medium">
          🌟 <span className="text-white">127 five-star reviews this month!</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Artists with great reviews get 5x more bookings ✨
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ArtistTestimonialCarousel;
