
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';

const ArtistTestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b167?w=80",
      rating: 5,
      date: "2 days ago",
      text: "Absolutely amazing work! My nails have never looked better. The attention to detail is incredible and the design lasted weeks without chipping. Sarah is truly an artist!",
      service: "Gel Manicure + Art"
    },
    {
      id: 2,
      name: "Jessica Miller",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80",
      rating: 5,
      date: "1 week ago",
      text: "Professional, friendly, and very talented. I've received so many compliments on my nails. The salon is clean and the experience was relaxing. Highly recommend!",
      service: "Premium Pedicure"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80",
      rating: 5,
      date: "3 days ago",
      text: "I'm obsessed with my new set! The color matching was perfect and the application was flawless. This is definitely my new go-to nail artist. Worth every penny!",
      service: "Full Set Acrylics"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Client Love</h2>
          <p className="text-gray-600 font-inter">What your clients are saying</p>
        </div>
        
        <div className="hidden lg:flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </motion.button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <div className="flex items-start gap-4 mb-4">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-inter font-semibold text-gray-900">
                    {testimonials[currentIndex].name}
                  </h3>
                  <span className="text-sm text-gray-500 font-inter">
                    {testimonials[currentIndex].date}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonials[currentIndex].rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 font-inter">
                    {testimonials[currentIndex].service}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 font-inter leading-relaxed mb-4">
              "{testimonials[currentIndex].text}"
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 px-3 py-1 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors border border-pink-100"
                >
                  <Heart className="h-4 w-4" />
                  <span className="text-sm font-inter">Thank</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="text-sm font-inter">Share</span>
                </motion.button>
              </div>
              
              <div className="flex gap-1">
                {testimonials.map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentIndex ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile swipe indicators */}
      <div className="lg:hidden mt-4 flex justify-center">
        <div className="text-sm text-gray-500 font-inter">
          Swipe to see more reviews →
        </div>
      </div>
    </div>
  );
};

export default ArtistTestimonialCarousel;
