
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';

const ArtistTestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/60?img=1",
      rating: 5,
      text: "Absolutely incredible work! Maria transformed my nails into works of art. The attention to detail is unmatched and the experience was so relaxing. I've received countless compliments!",
      service: "Premium Manicure + Art",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Emily Chen",
      avatar: "https://i.pravatar.cc/60?img=2",
      rating: 5,
      text: "I'm obsessed with my new nails! The gel extensions look so natural and the design exceeded my expectations. Maria is truly talented and professional.",
      service: "Gel Extensions",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Jessica Rodriguez",
      avatar: "https://i.pravatar.cc/60?img=3",
      rating: 5,
      text: "Best nail artist in LA! The pedicure was heavenly and my nails have never looked better. Already booked my next appointment!",
      service: "Pedicure Deluxe",
      date: "3 days ago"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-3 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-xl border border-rose-500/30"
          >
            <Star className="h-6 w-6 text-rose-400" />
          </motion.div>
          <div>
            <h2 className="text-xl font-bold text-white">Client Love</h2>
            <p className="text-sm text-gray-400">Recent reviews</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-white" />
          </motion.button>
        </div>
      </div>

      <div className="relative h-48 lg:h-56 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full">
              <div className="flex items-start gap-4 mb-4">
                <motion.img
                  src={currentTestimonial.avatar}
                  alt={currentTestimonial.name}
                  className="w-12 h-12 rounded-full border-2 border-white/20"
                  whileHover={{ scale: 1.1 }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-white">{currentTestimonial.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{currentTestimonial.service}</p>
                  <p className="text-xs text-gray-500">{currentTestimonial.date}</p>
                </div>
              </div>
              
              <blockquote className="text-gray-300 text-sm leading-relaxed mb-4">
                "{currentTestimonial.text}"
              </blockquote>
              
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-pink-500/20 border border-pink-500/30 rounded-lg text-pink-400 text-sm hover:bg-pink-500/30 transition-colors"
                >
                  <Heart className="h-3 w-3" />
                  <span>Thank</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 text-sm hover:bg-blue-500/30 transition-colors"
                >
                  <Share2 className="h-3 w-3" />
                  <span>Share</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            animate={{
              scale: index === currentIndex ? 1.2 : 1,
              opacity: index === currentIndex ? 1 : 0.5
            }}
            transition={{ duration: 0.3 }}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ArtistTestimonialCarousel;
